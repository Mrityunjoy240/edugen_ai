import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { GraduationCap, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default async function MyLearningPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: progress } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", user.id)
    .order("last_accessed_at", { ascending: false })

  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .is("is_published", true)

  const subjectColors: Record<string, string> = {
    Physics: "bg-blue-50 text-blue-600",
    Chemistry: "bg-green-50 text-green-600",
    Mathematics: "bg-purple-50 text-purple-600",
    Biology: "bg-emerald-50 text-emerald-600",
    Python: "bg-yellow-50 text-yellow-600",
    JavaScript: "bg-orange-50 text-orange-600",
    SQL: "bg-cyan-50 text-cyan-600",
    DSA: "bg-rose-50 text-rose-600",
    React: "bg-sky-50 text-sky-600",
    Design: "bg-pink-50 text-pink-600",
  }

  // Filter to only in-progress courses
  const inProgressCourses = progress?.filter(p => p.status !== "completed") || []
  const completedCourses = progress?.filter(p => p.status === "completed") || []

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-2">
        <GraduationCap className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">My Learning</h1>
      </div>

      {/* In Progress Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">In Progress</h2>
        {inProgressCourses.length > 0 ? (
          <div className="space-y-4">
            {inProgressCourses.map((p) => {
              const course = courses?.find(c => c.id === p.course_id)
              if (!course) return null
              const color = subjectColors[course.subject] || "bg-muted text-muted-foreground"

              return (
                <Link key={p.id} href={`/dashboard/workspace/${course.id}`}>
                  <Card className="card-hover cursor-pointer">
                    <CardContent className="p-5 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center font-bold text-lg`}>
                          {course.subject.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold">{course.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {course.subject}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {course.total_chapters} chapters
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="w-48">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium text-primary">{p.progress_percentage}%</span>
                          </div>
                          <Progress value={p.progress_percentage} className="h-2" />
                        </div>
                        <Button size="sm" variant="outline" className="gap-1">
                          Continue
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <GraduationCap className="h-12 w-12 mx-auto mb-4 text-muted-foreground/40" />
              <h3 className="font-semibold mb-2">No courses in progress</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Start learning a new course to track your progress here
              </p>
              <Link href="/dashboard/courses">
                <Button>Browse Courses</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Completed Section */}
      {completedCourses.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Completed</h2>
          <div className="space-y-4">
            {completedCourses.map((p) => {
              const course = courses?.find(c => c.id === p.course_id)
              if (!course) return null
              const color = subjectColors[course.subject] || "bg-muted text-muted-foreground"

              return (
                <Link key={p.id} href={`/dashboard/workspace/${course.id}`}>
                  <Card className="card-hover cursor-pointer opacity-75 hover:opacity-100">
                    <CardContent className="p-5 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}>
                          <span className="font-bold text-lg text-white">✓</span>
                        </div>
                        <div>
                          <h3 className="font-semibold line-through text-muted-foreground">
                            {course.title}
                          </h3>
                          <Badge variant="outline" className="mt-1">
                            Completed
                          </Badge>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" className="gap-1">
                        Review
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
