import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { BookOpen, ArrowRight, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default async function CoursesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .eq("is_published", true)
    .order("subject")

  const { data: progress } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", user.id)

  const subjectColors: Record<string, { bg: string; border: string; text: string }> = {
    Physics: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-600" },
    Chemistry: { bg: "bg-green-50", border: "border-green-200", text: "text-green-600" },
    Mathematics: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-600" },
    Biology: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-600" },
    Python: { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-600" },
    JavaScript: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-600" },
    SQL: { bg: "bg-cyan-50", border: "border-cyan-200", text: "text-cyan-600" },
    DSA: { bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-600" },
    React: { bg: "bg-sky-50", border: "border-sky-200", text: "text-sky-600" },
    Design: { bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-600" },
  }

  // Group courses by level
  const highSchoolCourses = courses?.filter(c => c.level === "high_school") || []
  const collegeCourses = courses?.filter(c => c.level === "college") || []

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-2">
        <BookOpen className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">All Courses</h1>
      </div>

      {/* High School Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">High School (NCERT)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {highSchoolCourses.map((course) => {
            const courseProgress = progress?.find(p => p.course_id === course.id)
            const progressValue = courseProgress?.progress_percentage || 0
            const color = subjectColors[course.subject] || { bg: "bg-muted", border: "border-border", text: "text-muted-foreground" }

            return (
              <Link key={course.id} href={`/dashboard/workspace/${course.id}`}>
                <Card className="card-hover cursor-pointer overflow-hidden">
                  <div className={`h-2 ${color.bg}`} />
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className={`${color.bg} ${color.text} border-0`}>
                        {course.subject}
                      </Badge>
                      <Badge variant="secondary">
                        {course.level === "high_school" ? "NCERT" : "College"}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    {progressValue > 0 && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium text-primary">{progressValue}%</span>
                        </div>
                        <Progress value={progressValue} className="h-2" />
                      </div>
                    )}
                    <Button className="w-full gap-1" size="sm">
                      <span>{progressValue > 0 ? "Continue" : "Start"} Learning</span>
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      {/* College Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">College & Professional</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {collegeCourses.map((course) => {
            const courseProgress = progress?.find(p => p.course_id === course.id)
            const progressValue = courseProgress?.progress_percentage || 0
            const color = subjectColors[course.subject] || { bg: "bg-muted", border: "border-border", text: "text-muted-foreground" }

            return (
              <Link key={course.id} href={`/dashboard/workspace/${course.id}`}>
                <Card className="card-hover cursor-pointer overflow-hidden">
                  <div className={`h-2 ${color.bg}`} />
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className={`${color.bg} ${color.text} border-0`}>
                        {course.subject}
                      </Badge>
                      <Badge variant="secondary">
                        {course.category}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    {progressValue > 0 && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium text-primary">{progressValue}%</span>
                        </div>
                        <Progress value={progressValue} className="h-2" />
                      </div>
                    )}
                    <Button className="w-full gap-1" size="sm">
                      <span>{progressValue > 0 ? "Continue" : "Start"} Learning</span>
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
