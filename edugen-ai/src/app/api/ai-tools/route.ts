import { createClient } from "@/lib/supabase/server"
import { chatCompletion, ChatMessage } from "@/lib/groq"
import { getEmbeddings } from "@/lib/embeddings"

export async function POST(request: Request) {
  try {
    const { type, userId, courseId } = await request.json()

    if (!type || !userId) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = await createClient()

    let userNotes: any[] = []
    
    if (courseId) {
      const { data: notes } = await supabase
        .from("notes")
        .select("*")
        .eq("user_id", userId)
        .eq("course_id", courseId)
        .limit(10)
      userNotes = notes || []
    }

    if (userNotes.length === 0) {
      const { data: notes } = await supabase
        .from("notes")
        .select("*")
        .eq("user_id", userId)
        .limit(10)
      userNotes = notes || []
    }

    const content = userNotes.map(n => n.content).join("\n\n") || "No content available"

    let systemPrompt = ""

    switch (type) {
      case "quiz":
        systemPrompt = `You are an expert quiz generator. Generate 5 multiple choice questions from the provided content. Each question should have 4 options (A, B, C, D) and indicate the correct answer. Format the output as JSON array.`
        break
      case "flashcards":
        systemPrompt = `You are an expert at creating flashcards. Generate 10 question-answer pairs from the content. Format as JSON array with "question" and "answer" fields.`
        break
      case "notes":
        systemPrompt = `Generate study notes in plain text only. Use exactly this structure with a blank line between each section:

Topic: [topic name]

Definition:
[2 to 3 sentence definition]

Key Points:
1. [full sentence]
2. [full sentence]
3. [full sentence]
4. [full sentence]

Summary:
[2 to 3 sentence summary]

Never use asterisks, hashtags, bullet symbols, or bold markdown. Maximum 250 words.`
        break
      case "assignment":
        systemPrompt = `You are an expert assignment generator. Generate 3-5 descriptive assignment questions from the content. Include a mix of short answer and long answer questions.`
        break
      case "topics":
        systemPrompt = `You are an expert at extracting key topics. List the main topics and subtopics from the content. Return as JSON array with "topic" and "subtopics" fields.`
        break
      default:
        return Response.json({ error: "Invalid tool type" }, { status: 400 })
    }

    const messages: ChatMessage[] = [
      { role: "system", content: systemPrompt },
      { role: "user", content: `Content:\n${content}` }
    ]

    const result = await chatCompletion(messages)

    return Response.json({
      success: true,
      type,
      result,
      sourcesCount: userNotes.length
    })
  } catch (error: any) {
    console.error("AI tools error:", error)
    return Response.json(
      { error: error.message || "Failed to generate content" },
      { status: 500 }
    )
  }
}
