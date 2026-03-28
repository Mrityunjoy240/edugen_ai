import { createClient } from "@/lib/supabase/server"
import { chatCompletion, ChatMessage } from "@/lib/groq"

export async function POST(request: Request) {
  try {
    const { query, userId, courseId } = await request.json()

    if (!query || !userId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Fetch user's notes and course content for context
    let contextNotes: any[] = []
    let courseChapters: any[] = []
    let ncertContent: any[] = []

    // Get user's notes (optionally filtered by course)
    try {
      let notesQuery = supabase
        .from("notes")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(10)
      
      if (courseId) {
        notesQuery = notesQuery.eq("course_id", courseId)
      }
      
      const { data: notes } = await notesQuery
      if (notes && notes.length > 0) {
        contextNotes = notes
      }
    } catch (err) {
      console.warn("Error fetching notes:", err)
    }

    // Get course chapters if courseId provided
    if (courseId) {
      try {
        const { data: chapters } = await supabase
          .from("chapters")
          .select("*")
          .eq("course_id", courseId)
          .order("chapter_number")
        
        if (chapters) {
          courseChapters = chapters
        }
      } catch (err) {
        console.warn("Error fetching chapters:", err)
      }
    }

    // Get relevant NCERT content
    try {
      const queryLower = query.toLowerCase()
      const { data: ncert } = await supabase
        .from("ncert_content")
        .select("*")
        .limit(5)
      
      if (ncert && ncert.length > 0) {
        ncertContent = ncert.filter((c: any) =>
          c.subject.toLowerCase().includes(queryLower) ||
          c.chapter_title.toLowerCase().includes(queryLower) ||
          c.content?.toLowerCase().includes(queryLower)
        ).slice(0, 3)

        if (ncertContent.length === 0) {
          ncertContent = ncert.slice(0, 2)
        }
      }
    } catch (err) {
      console.warn("Error fetching NCERT content:", err)
    }

    // Build context string
    let context = ""

    if (courseChapters.length > 0) {
      context += "Course Chapters:\n"
      courseChapters.forEach((ch: any, i: number) => {
        context += `${i + 1}. ${ch.title}\n`
      })
      context += "\n"
    }

    if (contextNotes.length > 0) {
      context += "User's Study Notes:\n"
      contextNotes.forEach((note: any, i: number) => {
        context += `[${note.title}]\n${note.content.substring(0, 300)}...\n\n`
      })
    }

    if (ncertContent.length > 0) {
      context += "Reference Material:\n"
      ncertContent.forEach((content: any) => {
        context += `[${content.subject} - ${content.chapter_title}]\n${content.content?.substring(0, 200)}...\n\n`
      })
    }

    // Build system prompt
    const systemPrompt = `You are EduGen AI, an expert AI tutor specializing in helping students learn effectively.

Your expertise includes:
- Physics, Chemistry, Mathematics (NCERT curriculum for Class 11-12)
- Programming (Python, JavaScript, SQL, Data Structures & Algorithms)
- Web Development (React, Node.js, databases)
- Machine Learning and Data Science

Guidelines:
1. Be friendly, encouraging, and patient
2. Use simple language appropriate for the student's level
3. Break down complex topics into smaller, digestible parts
4. Use examples, analogies, and step-by-step explanations
5. For math/science: show formulas and problem-solving steps
6. For programming: provide code with clear explanations
7. Always ask if they need clarification
8. Suggest practice problems when appropriate

You have access to the student's uploaded notes and course materials. Use them to provide personalized help.`

    const messages: ChatMessage[] = [
      { role: "system", content: systemPrompt },
    ]

    if (context) {
      messages.push({
        role: "system",
        content: `Here is relevant context from the student's learning materials:\n\n${context}`
      })
    }

    messages.push({ role: "user", content: query })

    const response = await chatCompletion(messages)

    return Response.json({
      response,
      sources: {
        notes: contextNotes,
        chapters: courseChapters,
        ncert: ncertContent,
      },
    })
  } catch (error: any) {
    console.error("Chat error:", error)
    return Response.json(
      { error: error.message || "Failed to process chat" },
      { status: 500 }
    )
  }
}
