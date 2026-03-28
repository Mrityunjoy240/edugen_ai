"use client"

import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { CheckCircle, XCircle, Brain, ArrowRight, RotateCcw, BookOpen, PlayCircle, Loader2 } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"

// Task 1: Create Course-Based Question Bank
const questionBank: Record<string, any[]> = {
  "Python for Beginners": [
    {
      question: "Which Python keyword is used to define a function?",
      options: ["function", "func", "def", "define"],
      answer: "def"
    },
    {
      question: "What is the correct way to create a list in Python?",
      options: ["list = (1, 2)", "list = [1, 2]", "list = {1, 2}", "list = <1, 2>"],
      answer: "[1, 2]"
    }
  ],
  "Data Science Fundamentals": [
    {
      question: "What is Data Science?",
      options: ["Study of data", "Cooking method", "Sports training", "None"],
      answer: "Study of data"
    },
    {
      question: "Which library is used in Python for data analysis?",
      options: ["Pandas", "React", "Node", "HTML"],
      answer: "Pandas"
    }
  ],
  "AI Basics": [
    {
      question: "What is AI?",
      options: ["Artificial Intelligence", "Auto Internet", "Advanced Input", "None"],
      answer: "Artificial Intelligence"
    },
    {
      question: "What is the Turing Test designed to determine?",
      options: ["Speed", "Intelligence", "Memory", "Storage"],
      answer: "Intelligence"
    }
  ],
  "DSA": [
    {
      question: "What is a stack?",
      options: ["LIFO structure", "FIFO structure", "Tree", "Graph"],
      answer: "LIFO structure"
    },
    {
      question: "What is the time complexity of searching in a Hash Table (Average case)?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
      answer: "O(1)"
    }
  ],
  "UI/UX Design Mastery": [
    {
      question: "What does UI stand for?",
      options: ["User Interface", "User Internal", "User Input", "Universal Interface"],
      answer: "User Interface"
    },
    {
      question: "Which tool is commonly used for UI design?",
      options: ["Excel", "Figma", "VS Code", "VLC"],
      answer: "Figma"
    }
  ],
  "Digital Marketing 101": [
    {
      question: "What does SEO stand for?",
      options: ["Search Engine Optimization", "Social Engine Order", "Sales Entry Office", "None"],
      answer: "Search Engine Optimization"
    }
  ]
}

export default function QuizPage() {
  const supabase = createClient()
  const [dbCourses, setDbCourses] = useState<any[]>([])
  const [selectedCourse, setSelectedCourse] = useState<string>("")
  const [questions, setQuestions] = useState<any[]>([])
  const [isStarted, setIsStarted] = useState(false)
  const [qIndex, setQIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [finished, setFinished] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Fetch real courses from Supabase
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data, error } = await supabase.from("courses").select("*").eq("is_published", true)
        if (error) throw error
        setDbCourses(data || [])
      } catch (err) {
        console.error("Error fetching courses:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  useEffect(() => {
    if (selectedCourse) {
      const course = dbCourses.find(c => c.id === selectedCourse || c.title === selectedCourse)
      const courseTitle = course ? course.title : selectedCourse
      setQuestions(questionBank[courseTitle] || [])
      restart()
    }
  }, [selectedCourse, dbCourses])

  const saveResults = async (finalScore: number, finalTotal: number) => {
    setSaving(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const courseObj = dbCourses.find(c => c.title === selectedCourse || c.id === selectedCourse)

      await supabase.from("assessments").insert({
        user_id: user.id,
        course_id: courseObj?.id,
        type: "quiz",
        score: finalScore,
        total_questions: finalTotal,
        results: {
          course_title: selectedCourse,
          completed_at: new Date().toISOString()
        }
      })
    } catch (err) {
      console.error("Error saving results:", err)
    } finally {
      setSaving(false)
    }
  }

  const current = questions[qIndex]

  const handleAnswer = useCallback((idx: number) => {
    if (selected !== null || !current) return
    setSelected(idx)
    setShowResult(true)
    setTotal((t) => t + 1)
    
    // Check answer based on string comparison (Task 1 structure)
    if (current.options[idx] === current.answer) {
      setScore((s) => s + 1)
    }
  }, [selected, current])

  const nextQuestion = async () => {
    if (total >= questions.length || qIndex >= questions.length - 1) {
      setFinished(true)
      await saveResults(score, total)
    } else {
      setQIndex(prev => prev + 1)
      setSelected(null)
      setShowResult(false)
    }
  }

  const restart = () => {
    setQIndex(0)
    setScore(0)
    setTotal(0)
    setSelected(null)
    setShowResult(false)
    setFinished(false)
    setIsStarted(false)
  }

  const startQuiz = () => {
    if (questions.length > 0) {
      setIsStarted(true)
    }
  }

  if (finished) {
    return (
      <div className="max-w-xl mx-auto text-center py-16 animate-fade-in">
        <Brain className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-foreground mb-2">Quiz Complete!</h1>
        <p className="text-xl text-muted-foreground mb-6">
          You scored <span className="text-primary font-bold">{score}</span> out of {total}
        </p>
        <div className="bg-card rounded-xl p-6 border border-border mb-6">
          <p className="text-foreground">
            {score === total ? "Perfect! You've mastered this course." :
             score >= total / 2 ? "Good job! Keep practicing to improve." :
             "Keep going! Review the material and try again."}
          </p>
        </div>
        <Button onClick={restart} className="bg-primary text-primary-foreground gap-2">
          <RotateCcw className="h-4 w-4" /> Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in pb-10">
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" /> Course Quiz
          </h1>
          {isStarted && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground font-medium">Score: {score}/{total}</span>
            </div>
          )}
        </div>

        {/* Task 5: Fix Dropdown Handler */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-muted-foreground">Select Course</label>
          <Select value={selectedCourse} onValueChange={setSelectedCourse} disabled={loading}>
            <SelectTrigger className="w-full bg-card h-12">
              <SelectValue placeholder={loading ? "Loading courses..." : "Select a course to begin the quiz"} />
            </SelectTrigger>
            <SelectContent>
              {dbCourses.map((course) => (
                <SelectItem key={course.id} value={course.title}>
                  {course.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isStarted && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground font-medium">
              <span>Progress</span>
              <span>Question {qIndex + 1} of {questions.length}</span>
            </div>
            <Progress value={((qIndex + 1) / questions.length) * 100} className="h-2" />
          </div>
        )}
      </div>

      {!selectedCourse ? (
        /* Task 7: Empty State */
        <Card className="border-dashed border-2 bg-muted/30">
          <CardContent className="p-10 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
            <p className="text-muted-foreground font-medium">Select a course from the dropdown to begin your quiz.</p>
          </CardContent>
        </Card>
      ) : !isStarted ? (
        /* Task 6: Start Button */
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <PlayCircle className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold">{selectedCourse}</h3>
              <p className="text-muted-foreground">{questions.length} Questions Available</p>
            </div>
            <Button onClick={startQuiz} className="bg-primary hover:bg-primary/90 gap-2 px-8 h-12 text-lg shadow-lg shadow-primary/20">
              Start Quiz
            </Button>
          </CardContent>
        </Card>
      ) : (
        /* Quiz Active State */
        <div className="space-y-4">
          <Card className="bg-card rounded-xl border border-border shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-2">Question {qIndex + 1} of {questions.length}</p>
              <h2 className="text-lg font-semibold text-foreground mb-6 leading-snug">{current.question}</h2>
              <div className="space-y-3">
                {current.options.map((opt: string, idx: number) => {
                  let style = "border-border hover:border-primary/50 hover:bg-accent/50"
                  if (showResult) {
                    if (opt === current.answer) style = "border-emerald-500 bg-emerald-500/10"
                    else if (idx === selected) style = "border-rose-500 bg-rose-500/10"
                    else style = "border-border opacity-50"
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      disabled={showResult}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${style}`}
                    >
                      <span className="text-foreground font-medium">{opt}</span>
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {showResult && (
            <div className={`rounded-xl p-4 flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${current.options[selected!] === current.answer ? "bg-emerald-500/10" : "bg-rose-500/10"}`}>
              {current.options[selected!] === current.answer ? (
                <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
              )}
              <p className="text-sm text-foreground font-medium">
                {current.options[selected!] === current.answer
                  ? "Correct! Well done."
                  : `Incorrect. The correct answer is "${current.answer}".`}
              </p>
            </div>
          )}

          {showResult && (
            <Button 
              onClick={nextQuestion} 
              disabled={saving}
              className="bg-primary text-primary-foreground gap-2 w-full h-12 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
            >
              {saving ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Saving Results...
                </>
              ) : (
                <>
                  {qIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"} <ArrowRight className="h-5 w-5" />
                </>
              )}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
