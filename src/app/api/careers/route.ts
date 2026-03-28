import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const { data: careers } = await supabase
      .from("careers")
      .select("*")
      .order("title")

    return Response.json({ careers })
  } catch (error) {
    console.error("Careers fetch error:", error)
    return Response.json(
      { error: "Failed to fetch careers" },
      { status: 500 }
    )
  }
}
