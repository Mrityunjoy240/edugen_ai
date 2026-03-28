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

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const userId = formData.get("userId") as string
    const courseId = formData.get("courseId") as string | null
    const title = formData.get("title") as string || file?.name || "Untitled"

    if (!file || !userId) {
      return Response.json(
        { error: "Missing file or user ID" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    let textContent = ""
    const fileType = file.name.split(".").pop()?.toLowerCase()

    if (fileType === "txt") {
      textContent = buffer.toString("utf-8")
    } else if (fileType === "pdf") {
      try {
        textContent = await extractTextFromPDF(buffer)
      } catch (pdfError) {
        console.error("PDF parsing error:", pdfError)
        return Response.json(
          { error: "Failed to parse PDF file" },
          { status: 422 }
        )
      }
    } else {
      return Response.json(
        { error: "Unsupported file type. Use PDF, TXT" },
        { status: 400 }
      )
    }

    if (!textContent.trim()) {
      return Response.json(
        { error: "No text content found in file" },
        { status: 422 }
      )
    }

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("documents")
      .upload(`${userId}/${Date.now()}_${file.name}`, file)

    if (uploadError) {
      console.warn("Storage upload failed:", uploadError)
    }

    const filePath = uploadData?.path || null

    const chunks = splitIntoChunks(textContent, 1000)
    const embeddings = await Promise.all(
      chunks.map(chunk => getEmbeddings(chunk).catch(() => null))
    )

    const notesToInsert = chunks.map((chunk, index) => ({
      user_id: userId,
      course_id: courseId || null,
      title: `${title} (Part ${index + 1})`,
      content: chunk,
      subject: null,
      topic: null,
      embedding: embeddings[index],
      file_path: filePath,
    }))

    if (notesToInsert.length > 0) {
      const { error: insertError } = await supabase
        .from("notes")
        .insert(notesToInsert)

      if (insertError) {
        console.error("Database insert error:", insertError)
        return Response.json(
          { error: `Failed to save notes: ${insertError.message}` },
          { status: 500 }
        )
      }
    }

    return Response.json({
      success: true,
      message: `Uploaded and processed ${chunks.length} chunks`,
      chunksCount: chunks.length,
      filePath,
    })
  } catch (error: any) {
    console.error("Upload error:", error)
    return Response.json(
      { error: error.message || "Upload failed" },
      { status: 500 }
    )
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
