import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardContent } from "@/components/DashboardContent"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .eq("created_by", user.id)
    .order("created_at", { ascending: false })

  const { data: progress } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", user.id)

  return (
    <DashboardContent
      user={user}
      profile={profile}
      courses={courses || []}
      progress={progress || []}
    />
  )
}
