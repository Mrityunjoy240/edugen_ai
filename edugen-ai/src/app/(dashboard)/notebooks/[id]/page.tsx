"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { CourseWorkspace } from "@/components/CourseWorkspace"
import { createClient } from "@/lib/supabase/client"
import { Loader2 } from "lucide-react"

export default function NotebookPage() {
  const params = useParams()
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [notebook, setNotebook] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchNotebook() {
      const notebookId = params?.id as string
      
      if (!notebookId) {
        setError("No notebook ID provided")
        setLoading(false)
        return
      }

      const { data, error: fetchError } = await supabase
        .from("courses")
        .select("*")
        .eq("id", notebookId)
        .single()

      if (fetchError || !data) {
        console.error("Notebook fetch error:", fetchError)
        setError("Notebook not found")
        setLoading(false)
        return
      }

      setNotebook(data)
      setLoading(false)
    }

    fetchNotebook()
  }, [params?.id, supabase])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !notebook) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">{error || "Notebook not found"}</p>
      </div>
    )
  }

  return (
    <CourseWorkspace
      courseId={notebook.id}
      title={notebook.title}
      type="notebook"
    />
  )
}
