import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { TrendingUp, BookOpen, Clock, Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default async function ProgressPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: progress } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", user.id)

  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .is("is_published", true)

  // Calculate stats
  const enrolledCourses = progress?.length || 0
  const completedCourses = progress?.filter(p => p.status === "completed").length || 0
  const avgProgress = enrolledCourses > 0
    ? Math.round(progress!.reduce((sum, p) => sum + p.progress_percentage, 0) / enrolledCourses)
    : 0
  const totalHours = Math.round((progress?.length || 0) * 10.5) // Estimate 10.5 hours per course

  // Weekly activity mock data
  const weeklyActivity = [
    { day: "Mon", hours: 2 },
    { day: "Tue", hours: 1.5 },
    { day: "Wed", hours: 3 },
    { day: "Thu", hours: 0.5 },
    { day: "Fri", hours: 2.5 },
    { day: "Sat", hours: 4 },
    { day: "Sun", hours: 1 },
  ]
  const maxHours = Math.max(...weeklyActivity.map(d => d.hours))

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-2">
        <TrendingUp className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Learning Progress</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-3">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold">{enrolledCourses}</div>
            <p className="text-sm text-muted-foreground">Courses Enrolled</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-success/10 mx-auto mb-3">
              <Clock className="h-6 w-6 text-success" />
            </div>
            <div className="text-2xl font-bold">{totalHours}h</div>
            <p className="text-sm text-muted-foreground">Hours Learned</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-warning/10 mx-auto mb-3">
              <Award className="h-6 w-6 text-warning" />
            </div>
            <div className="text-2xl font-bold">{completedCourses}</div>
            <p className="text-sm text-muted-foreground">Quizzes Passed</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-3">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold">{avgProgress}%</div>
            <p className="text-sm text-muted-foreground">Avg. Score</p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle>This Week's Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-3 h-40">
            {weeklyActivity.map((day) => (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col items-center justify-end h-32">
                  <div 
                    className="w-full bg-primary/20 rounded-t-md relative"
                    style={{ height: `${(day.hours / maxHours) * 100}%` }}
                  >
                    <div 
                      className="absolute bottom-0 w-full bg-primary rounded-t-md transition-all"
                      style={{ height: `${(day.hours / maxHours) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{day.day}</span>
                <span className="text-xs font-medium">{day.hours}h</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Course Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Course Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {progress?.map((p) => {
            const course = courses?.find(c => c.id === p.course_id)
            if (!course) return null

            return (
              <div key={p.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{course.title}</h4>
                    <p className="text-sm text-muted-foreground">{course.subject}</p>
                  </div>
                  <span className="text-sm font-medium text-primary">{p.progress_percentage}%</span>
                </div>
                <Progress value={p.progress_percentage} className="h-2" />
              </div>
            )
          })}

          {(!progress || progress.length === 0) && (
            <p className="text-center text-muted-foreground py-8">
              No courses started yet. Go to Courses to begin learning!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
