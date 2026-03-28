"use client"

import { Play, ArrowRight, BookOpen, Clock, Award, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface Course {
  id: string
  title: string
  subject: string
  level: string
  total_chapters: number
}

interface Progress {
  course_id: string
  progress_percentage: number
  status: string
  last_accessed_at: string
}

interface Profile {
  full_name: string
  role: string
}

interface DashboardContentProps {
  user: any
  profile: Profile | null
  courses: Course[]
  progress: Progress[]
}

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
  "Machine Learning": { bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-600" },
  "Web Dev": { bg: "bg-teal-50", border: "border-teal-200", text: "text-teal-600" },
}

const defaultColor = { bg: "bg-muted", border: "border-border", text: "text-muted-foreground" }

export function DashboardContent({ user, profile, courses, progress }: DashboardContentProps) {
  const userName = profile?.full_name || user?.email?.split("@")[0] || "Student"
  const firstName = userName.split(" ")[0]

  // Get last accessed course
  const lastProgress = progress.sort((a, b) => 
    new Date(b.last_accessed_at).getTime() - new Date(a.last_accessed_at).getTime()
  )[0]

  const lastCourse = lastProgress 
    ? courses.find(c => c.id === lastProgress.course_id)
    : null

  // Calculate stats
  const enrolledCourses = progress.length
  const completedCourses = progress.filter(p => p.status === "completed").length
  const avgProgress = enrolledCourses > 0 
    ? Math.round(progress.reduce((sum, p) => sum + p.progress_percentage, 0) / enrolledCourses)
    : 0

  // Group courses by subject
  const coursesBySubject = courses.reduce((acc, course) => {
    if (!acc[course.subject]) {
      acc[course.subject] = []
    }
    acc[course.subject].push(course)
    return acc
  }, {} as Record<string, Course[]>)

  // Get subjects with progress
  const subjectsWithProgress = Object.entries(coursesBySubject).map(([subject, subjectCourses]) => {
    const subjectProgress = progress.filter(p => 
      subjectCourses.some(c => c.id === p.course_id)
    )
    const avgSubjectProgress = subjectProgress.length > 0
      ? Math.round(subjectProgress.reduce((sum, p) => sum + p.progress_percentage, 0) / subjectProgress.length)
      : 0
    const inProgress = subjectProgress.filter(p => p.status === "in_progress").length
    
    return {
      subject,
      courses: subjectCourses,
      progress: avgSubjectProgress,
      inProgress,
      totalCourses: subjectCourses.length
    }
  }).filter(s => s.inProgress > 0 || s.progress > 0)

  // If no progress yet, show all subjects
  const displaySubjects = subjectsWithProgress.length > 0 ? subjectsWithProgress : 
    Object.entries(coursesBySubject).slice(0, 4).map(([subject, subjectCourses]) => ({
      subject,
      courses: subjectCourses,
      progress: 0,
      inProgress: 0,
      totalCourses: subjectCourses.length
    }))

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Banner */}
      <div className="hero-gradient rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex-1 p-6 md:p-10">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-3">
              Welcome Back, {firstName}
            </h1>
            <p className="text-lg text-muted-foreground mb-4 max-w-md">
              Continue your personalized learning journey
            </p>
            {lastCourse ? (
              <Link href={`/dashboard/workspace/${lastCourse.id}`}>
                <Button className="gap-2 px-6">
                  <Play className="h-4 w-4" />
                  Resume Learning
                </Button>
              </Link>
            ) : (
              <Link href="/dashboard/courses">
                <Button className="gap-2 px-6">
                  <BookOpen className="h-4 w-4" />
                  Start Learning
                </Button>
              </Link>
            )}
          </div>
          <div className="md:w-[400px] p-4">
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {avgProgress || 0}%
              </div>
              <p className="text-sm text-muted-foreground">Overall Progress</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-3">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold">{enrolledCourses || courses.length}</div>
            <p className="text-sm text-muted-foreground">Courses Available</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-success/10 mx-auto mb-3">
              <Clock className="h-6 w-6 text-success" />
            </div>
            <div className="text-2xl font-bold">42h</div>
            <p className="text-sm text-muted-foreground">Hours Learned</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-warning/10 mx-auto mb-3">
              <Award className="h-6 w-6 text-warning" />
            </div>
            <div className="text-2xl font-bold">{completedCourses}</div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-3">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold">{avgProgress || 0}%</div>
            <p className="text-sm text-muted-foreground">Avg Score</p>
          </CardContent>
        </Card>
      </div>

      {/* Your Subjects */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Your Subjects</h2>
          <Link href="/dashboard/courses" className="text-primary text-sm font-medium flex items-center gap-1 hover:underline">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displaySubjects.map(({ subject, courses: subjectCourses, progress: subProgress }) => {
            const color = subjectColors[subject] || defaultColor
            
            return (
              <Link key={subject} href={`/dashboard/workspace/${subjectCourses[0].id}`}>
                <Card className={`card-hover cursor-pointer ${color.bg} border ${color.border}`}>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className={`font-semibold ${color.text}`}>{subject}</h3>
                      <span className="text-2xl font-bold text-foreground">{subProgress}%</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {subjectCourses.length} {subjectCourses.length === 1 ? "course" : "courses"}
                    </p>
                    <Progress value={subProgress} className="h-2" />
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Recent Courses */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Continue Learning</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {courses.slice(0, 4).map((course) => {
            const courseProgress = progress.find(p => p.course_id === course.id)
            const progressValue = courseProgress?.progress_percentage || 0
            const color = subjectColors[course.subject] || defaultColor
            
            return (
              <Link key={course.id} href={`/dashboard/workspace/${course.id}`}>
                <Card className="card-hover cursor-pointer overflow-hidden">
                  <div className={`h-2 ${color.bg}`} />
                  <CardContent className="p-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${color.bg} ${color.text}`}>
                      {course.level === "high_school" ? "High School" : "College"}
                    </span>
                    <h3 className="font-semibold mt-3 mb-2 line-clamp-2">{course.title}</h3>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{course.total_chapters} chapters</span>
                      <span className="font-medium text-primary">{progressValue}%</span>
                    </div>
                    <Progress value={progressValue} className="h-1.5 mt-2" />
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
