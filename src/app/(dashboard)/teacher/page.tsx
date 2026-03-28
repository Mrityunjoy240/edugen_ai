"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { mockLessonPlan } from "@/data/mockData"
import { BookOpen, Sparkles, FileText } from "lucide-react"

export default function TeacherSupportPage() {
  const [plan, setPlan] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const generate = () => {
    setLoading(true)
    setTimeout(() => {
      setPlan(mockLessonPlan)
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground flex items-center gap-2 mb-6">
        <BookOpen className="h-6 w-6 text-primary" /> Teacher Support
      </h1>
      <div className="bg-card rounded-xl border border-border p-6 text-center mb-6">
        <FileText className="h-12 w-12 text-primary mx-auto mb-3" />
        <h2 className="text-lg font-semibold text-foreground mb-2">AI Lesson Plan Generator</h2>
        <p className="text-muted-foreground text-sm mb-4">Generate a detailed lesson plan with objectives, activities, and assessments.</p>
        <Button onClick={generate} disabled={loading} className="bg-primary text-primary-foreground gap-2">
          <Sparkles className="h-4 w-4" />
          {loading ? "Generating..." : "Generate Lesson Plan"}
        </Button>
      </div>
      {plan && (
        <div className="bg-card rounded-xl border border-border p-6">
          <pre className="whitespace-pre-wrap text-sm text-foreground font-sans leading-relaxed">{plan}</pre>
        </div>
      )}
    </div>
  )
}
