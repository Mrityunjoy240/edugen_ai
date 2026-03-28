"use client"

import { Play, ArrowRight, BookOpen, Clock, Award, TrendingUp, Sparkles } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
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
  const router = useRouter()
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
      <div className="hero-gradient rounded-2xl overflow-hidden flex flex-col md:flex-row items-center">
        <div className="flex-1 p-6 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-3">
            Welcome Back, Continue<br />Your Personalized Learning
          </h1>
          <p className="text-muted-foreground mb-6 max-w-md">
            AI tracks your progress, suggests next lessons, and builds your career roadmap.
          </p>
          {courses && courses.length > 0 ? (
            <Button 
              onClick={() => router.push(`/course-workspace/${courses[0].id}`)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-6"
            >
              <Play className="h-4 w-4" />
              Resume Learning
            </Button>
          ) : (
            <Button 
              onClick={() => router.push("/notebooks")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-6"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Notebook
            </Button>
          )}
        </div>
        <div className="md:w-[400px] p-4">
          <img
            src="/assets/hero-study.jpg"
            alt="Study workspace"
            className="rounded-xl object-cover w-full h-48 md:h-64"
            width={768}
            height={512}
          />
        </div>
      </div>

      {/* Create Smart Notebook Card */}
      <Card className="border-primary/20 bg-primary/5 shadow-sm">
        <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Create Smart Notebook</h3>
              <p className="text-muted-foreground">Upload notes, get AI summaries, quizzes & learning insights</p>
            </div>
          </div>
          <Link href="/notebooks">
            <Button size="lg" className="whitespace-nowrap bg-primary hover:bg-primary/90">
              Create Notebook
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Stats Grid (Hidden per instructions) */}
      {/* 
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        ... (Stats components were here)
      </div> 
      */}

      {/* Notebooks / Recommended for You */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Recommended for You</h2>
          <Link href="/notebooks" className="text-primary text-sm font-medium flex items-center gap-1 hover:underline">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-6 pt-2 px-1 custom-scrollbar">
          {/* Create New Notebook Card */}
          <div className="min-w-[260px] h-[180px] border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-all hover:scale-[1.02] shadow-sm hover:shadow-md">
            <div className="text-3xl text-muted-foreground mb-2 opacity-60">+</div>
            <p className="text-sm font-semibold text-muted-foreground">Create new notebook</p>
          </div>

          {/* Suggested Notebooks */}
          {[
            { title: "AI Basics Notes", image: "/assets/course-coding.jpg" },
            { title: "Python Notes", image: "/assets/course-marketing.jpg" },
            { title: "DSA Notes", image: "/assets/hero-study.jpg" },
            { title: "Data Analytics Notes", image: "/assets/course-data.jpg" },
            { title: "Startup Guide", image: "/assets/course-design.jpg" }
          ].map((note, i) => (
            <div 
              key={i}
              onClick={() => router.push(`/notebooks/${encodeURIComponent(note.title)}`)}
              className="relative min-w-[240px] h-[160px] rounded-xl overflow-hidden group cursor-pointer hover:scale-[1.03] transition-all duration-300 shadow-sm hover:shadow-md shrink-0 border border-border"
            >
              <img src={note.image} alt={note.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
              <div className="absolute bottom-3 left-3 text-white z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                <h3 className="text-md font-semibold tracking-tight">{note.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
