"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { mockQuizQuestions } from "@/data/mockData"
import { CheckCircle, XCircle, Brain, ArrowRight, RotateCcw } from "lucide-react"

type Difficulty = "easy" | "medium" | "hard"

export default function QuizPage() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy")
  const [qIndex, setQIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [total, setTotal] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [finished, setFinished] = useState(false)

  const questions = mockQuizQuestions[difficulty]
  const current = questions[qIndex]

  const handleAnswer = useCallback((idx: number) => {
    if (selected !== null) return
    setSelected(idx)
    setShowResult(true)
    setTotal((t) => t + 1)
    if (idx === current.answer) {
      setScore((s) => s + 1)
    }
  }, [selected, current])

  const nextQuestion = () => {
    const correct = selected === current.answer
    let newDiff = difficulty
    if (correct) {
      newDiff = difficulty === "easy" ? "medium" : difficulty === "medium" ? "hard" : "hard"
    } else {
      newDiff = difficulty === "hard" ? "medium" : difficulty === "medium" ? "easy" : "easy"
    }
    setDifficulty(newDiff)
    const nextQuestions = mockQuizQuestions[newDiff]
    const nextIdx = Math.floor(Math.random() * nextQuestions.length)
    
    if (total >= 9) {
      setFinished(true)
    } else {
      setQIndex(nextIdx)
      setSelected(null)
      setShowResult(false)
    }
  }

  const restart = () => {
    setDifficulty("easy")
    setQIndex(0)
    setScore(0)
    setTotal(0)
    setSelected(null)
    setShowResult(false)
    setFinished(false)
  }

  if (finished) {
    return (
      <div className="max-w-xl mx-auto text-center py-16">
        <Brain className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-foreground mb-2">Quiz Complete!</h1>
        <p className="text-xl text-muted-foreground mb-6">
          You scored <span className="text-primary font-bold">{score}</span> out of {total}
        </p>
        <div className="bg-card rounded-xl p-6 border border-border mb-6">
          <p className="text-foreground">
            {score >= 7 ? "Excellent! You're mastering these concepts." :
             score >= 4 ? "Good job! Keep practicing to improve." :
             "Keep going! Review the material and try again."}
          </p>
        </div>
        <Button onClick={restart} className="bg-primary text-primary-foreground gap-2">
          <RotateCcw className="h-4 w-4" /> Try Again
        </Button>
      </div>
    )
  }

  const diffLabel: Record<Difficulty, string> = { easy: "Easy", medium: "Medium", hard: "Hard" }
  const diffColor: Record<Difficulty, string> = { easy: "bg-success/10 text-success", medium: "bg-warning/10 text-warning", hard: "bg-destructive/10 text-destructive" }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" /> Adaptive Quiz
        </h1>
        <div className="flex items-center gap-3">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${diffColor[difficulty]}`}>{diffLabel[difficulty]}</span>
          <span className="text-sm text-muted-foreground">Score: {score}/{total}</span>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-6 mb-4">
        <p className="text-sm text-muted-foreground mb-2">Question {total + 1} of 10</p>
        <h2 className="text-lg font-semibold text-foreground mb-6">{current.q}</h2>
        <div className="space-y-3">
          {current.options.map((opt, idx) => {
            let style = "border-border hover:border-primary/50 hover:bg-accent"
            if (showResult) {
              if (idx === current.answer) style = "border-success bg-success/10"
              else if (idx === selected) style = "border-destructive bg-destructive/10"
              else style = "border-border opacity-50"
            }
            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${style}`}
              >
                <span className="text-foreground">{opt}</span>
              </button>
            )
          })}
        </div>
      </div>

      {showResult && (
        <div className={`rounded-xl p-4 mb-4 flex items-start gap-3 ${selected === current.answer ? "bg-success/10" : "bg-destructive/10"}`}>
          {selected === current.answer ? (
            <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
          ) : (
            <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
          )}
          <p className="text-sm text-foreground">
            {selected === current.answer
              ? "Correct! Great job. The next question will be harder."
              : `Incorrect. The correct answer is "${current.options[current.answer]}". The next question will be easier.`}
          </p>
        </div>
      )}

      {showResult && (
        <Button onClick={nextQuestion} className="bg-primary text-primary-foreground gap-2 w-full">
          Next Question <ArrowRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
