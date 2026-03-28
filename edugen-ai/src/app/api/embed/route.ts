import { createClient } from "@/lib/supabase/server"
import { getEmbeddings } from "@/lib/embeddings"

export async function POST(request: Request) {
  try {
    const { text, userId, title, content, subject, topic, courseId } = await request.json()

    if (!text || !userId || !title || !content) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    let embedding: number[] | null = null

    try {
      embedding = await getEmbeddings(text)
    } catch (embedError) {
      console.warn("Embedding generation skipped:", embedError)
    }

    const supabase = await createClient()
    
    const noteData: any = {
      user_id: userId,
      title,
      content,
      subject: subject || null,
      topic: topic || null,
      course_id: courseId || null,
    }

    if (embedding) {
      noteData.embedding = embedding
    }

    const { error } = await supabase.from("notes").insert(noteData)

    if (error) {
      console.error("Database error:", error)
      return Response.json(
        { error: `Database error: ${error.message}` },
        { status: 500 }
      )
    }

    return Response.json({ 
      success: true, 
      message: "Note saved successfully",
      hasEmbedding: !!embedding
    })
  } catch (error: any) {
    console.error("Embed error:", error)
    return Response.json(
      { error: error.message || "Failed to process note" },
      { status: 500 }
    )
  }
}
