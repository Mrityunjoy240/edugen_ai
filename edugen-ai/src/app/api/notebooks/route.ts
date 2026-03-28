import { createClient } from "@/lib/supabase/server"
import { getEmbeddings } from "@/lib/embeddings"
import parsePDF from "pdf-parse-fixed"

async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    const data = await parsePDF(buffer)
    return data.text
  } catch (error) {
    console.error("PDF extraction error:", error)
    throw error
  }
}

function splitIntoChunks(text: string, chunkSize: number): string[] {
  const chunks: string[] = []
  const sentences = text.split(/(?<=[.!?])\s+/)
  let currentChunk = ""

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length > chunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk.trim())
      currentChunk = sentence
    } else {
      currentChunk += " " + sentence
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim())
  }

  return chunks
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const notebookName = formData.get("name") as string || formData.get("title") as string
    const file = formData.get("file") as File | null

    if (!notebookName) {
      return Response.json({ error: "Notebook name required" }, { status: 400 })
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return Response.json({ error: "Not authenticated" }, { status: 401 })
    }

    const userId = user.id

    // Create the notebook (course) first
    const { data: notebook, error: notebookError } = await supabase
      .from("courses")
      .insert({
        title: notebookName,
        description: "Personal notebook",
        subject: "General",
        created_by: userId
      })
      .select()
      .single()

    if (notebookError) {
      console.error("Notebook creation error:", notebookError)
      return Response.json({ error: "Failed to create notebook" }, { status: 500 })
    }

    let filePath: string | null = null
    let textContent = ""

    // If file uploaded, process it
    if (file) {
      // Upload to storage
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const fileType = file.name.split(".").pop()?.toLowerCase()
      
      if (fileType === "txt") {
        textContent = buffer.toString("utf-8")
      } else if (fileType === "pdf") {
        try {
          textContent = await extractTextFromPDF(buffer)
        } catch (e) {
          console.error("PDF parse error:", e)
        }
      }

      const { data: uploadData } = await supabase.storage
        .from("documents")
        .upload(`${user.id}/${notebook.id}/${file.name}`, file)

      if (uploadData) {
        filePath = uploadData.path
      }

      // Save source
      const { data: sourceRecord } = await supabase
        .from("sources")
        .insert({
          user_id: user.id,
          course_id: notebook.id,
          file_name: file.name,
          file_path: filePath,
          file_type: fileType,
          title: file.name.replace(/\.[^/.]+$/, ""),
        })
        .select()
        .single()

      const sourceId = sourceRecord?.id

      // Process chunks and embeddings
      if (textContent) {
        const chunks = splitIntoChunks(textContent, 1000)
        const embeddings = await Promise.all(
          chunks.map(chunk => getEmbeddings(chunk).catch(() => null))
        )

        const notesToInsert = chunks.map((chunk, index) => ({
          user_id: user.id,
          course_id: notebook.id,
          source_id: sourceId,
          title: index === 0 ? file.name.replace(/\.[^/.]+$/, "") : `${file.name.replace(/\.[^/.]+$/, "")} (Part ${index + 1})`,
          content: chunk,
          subject: null,
          topic: null,
          embedding: embeddings[index],
          file_path: filePath,
          chunk_index: index,
        }))

        if (notesToInsert.length > 0) {
          await supabase.from("notes").insert(notesToInsert)
        }
      }
    }

    return Response.json({
      success: true,
      notebookId: notebook.id,
      message: "Notebook created successfully"
    })
  } catch (error: any) {
    console.error("Notebook creation error:", error)
    return Response.json({ error: error.message || "Failed to create notebook" }, { status: 500 })
  }
}
