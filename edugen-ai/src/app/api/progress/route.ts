import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return Response.json({ error: "Missing user ID" }, { status: 400 })
    }

    const supabase = await createClient()

    const { data: notes } = await supabase
      .from("notes")
      .select("id, created_at")
      .eq("user_id", userId)

    const { data: assessments } = await supabase
      .from("assessments")
      .select("id, created_at")
      .eq("user_id", userId)

    const { data: latestActivity } = await supabase
      .from("notes")
      .select("created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(1)

    const totalNotes = notes?.length || 0
    const totalQuizzes = assessments?.length || 0
    const lastActivity = latestActivity?.[0]?.created_at 
      ? new Date(latestActivity[0].created_at).toLocaleDateString()
      : "No activity yet"

    const stats = {
      totalNotes,
      totalQuizzes,
      lastActivity,
      status: totalNotes > 0 ? "Active" : "Getting Started"
    }

    return Response.json({
      success: true,
      stats
    })
  } catch (error: any) {
    console.error("Progress error:", error)
    return Response.json(
      { error: error.message || "Failed to fetch progress" },
      { status: 500 }
    )
  }
}
