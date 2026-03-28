import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import { CourseWorkspace } from "@/components/CourseWorkspace"

interface WorkspacePageProps {
  params: Promise<{ id: string }>
}

export default async function WorkspacePage({ params }: WorkspacePageProps) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: course } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single()

  if (!course) {
    notFound()
  }

  const { data: chapters } = await supabase
    .from("chapters")
    .select("*")
    .eq("course_id", id)
    .order("chapter_number")

  const { data: notes } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", user.id)
    .eq("course_id", id)

  const { data: progress } = await supabase
    .from("chapter_progress")
    .select("*")
    .eq("user_id", user.id)

  const { data: courseProgress } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", user.id)
    .eq("course_id", id)
    .single()

  return (
    <CourseWorkspace
      course={course}
      chapters={chapters || []}
      notes={notes || []}
      progress={progress || []}
      courseProgress={courseProgress}
      userId={user.id}
    />
  )
}
