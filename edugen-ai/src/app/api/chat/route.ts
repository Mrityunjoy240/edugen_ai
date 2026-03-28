import { createClient } from "@/lib/supabase/server"
import { chatCompletion, ChatMessage } from "@/lib/groq"
import { getEmbeddings } from "@/lib/embeddings"

export async function POST(request: Request) {
  try {
    const { query, userId, courseId } = await request.json()

    if (!query || !userId) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = await createClient()
    
    // 1. Generate embedding for the user query
    let queryEmbedding: number[] | null = null
    try {
      queryEmbedding = await getEmbeddings(query)
    } catch (err) {
      console.error("Embedding generation failed:", err)
    }

    let contextNotes: any[] = []
    let ncertContent: any[] = []

    // 2. Perform Vector Similarity Search
    if (queryEmbedding) {
      // Search user notes
      const { data: matchedNotes } = await supabase.rpc("match_notes", {
        query_embedding: queryEmbedding,
        match_threshold: 0.5,
        match_count: 5,
        user_id: userId
      })
      if (matchedNotes) contextNotes = matchedNotes

      // Search NCERT content
      const { data: matchedNcert } = await supabase.rpc("match_ncert_content", {
        query_embedding: queryEmbedding,
        match_threshold: 0.5,
        match_count: 3
      })
      if (matchedNcert) ncertContent = matchedNcert
    }

    // Build context string
    let context = ""
    if (contextNotes.length > 0) {
      context += "Relevant sections from Student's Notes:\n"
      contextNotes.forEach((note: any) => {
        context += `[Note: ${note.title}]\n${note.content}\n\n`
      })
    }

    if (ncertContent.length > 0) {
      context += "Relevant sections from NCERT Reference Material:\n"
      ncertContent.forEach((content: any) => {
        context += `[Subject: ${content.subject} - ${content.chapter_title}]\n${content.content}\n\n`
      })
    }

    const systemPrompt = `You are EduGen AI, an expert AI tutor. Use the provided context to answer questions accurately. If the context doesn't contain the answer, use your general knowledge but prioritize context. Be encouraging and break down complex steps. Detect the language of the user message and always respond in the same language. Never use asterisks, hashtags, or markdown formatting. Keep responses under 200 words. Never repeat the same sentence.`

    const messages: ChatMessage[] = [
      { role: "system", content: systemPrompt },
      { role: "system", content: context ? `Context:\n${context}` : "No specific context found. Answer from general knowledge." },
      { role: "user", content: query }
    ]

    const response = await chatCompletion(messages)

    return Response.json({
      response,
      sources: { notes: contextNotes, ncert: ncertContent }
    })
  } catch (error: any) {
    console.error("Chat error:", error)
    return Response.json({ error: "Failed to process chat" }, { status: 500 })
  }
}
