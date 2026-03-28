"use client"

import { useParams } from "next/navigation"
import { CourseWorkspace } from "@/components/CourseWorkspace"

const notebookDataMap: Record<string, any> = {
  "AI Basics": {
    title: "AI Basics",
    topics: ["Machine Learning", "Neural Networks", "NLP"],
    suggestions: [
      "Explain backpropagation",
      "What is a neural network?",
      "Summarize the intro concepts"
    ],
    files: ["ai_intro.pdf", "dl_basics.pdf"]
  },
  "Python": {
    title: "Python Notebook",
    topics: ["Loops", "Functions", "Decorators"],
    suggestions: [
      "Explain list comprehension",
      "What is a decorator?",
      "How do generators work?"
    ],
    files: ["python_cheatsheet.pdf"]
  },
  "Physics Notes": {
    title: "Physics Notes",
    topics: ["Kinematics", "Thermodynamics"],
    suggestions: [
      "Solve motion problem",
      "What are Newton's Laws?",
      "Explain entropy"
    ],
    files: ["kinematics_formulas.pdf"]
  }
}

export default function NotebookPage() {
  const params = useParams()
  const idValue = params?.id ? decodeURIComponent(params.id as string) : ""
  
  // Find matched notebook or fallback
  const data = notebookDataMap[idValue] || {
    title: idValue || "Untitled Notebook",
    topics: ["General Knowledge"],
    suggestions: ["Summarize my notes", "Help me organize"],
    files: []
  }

  return (
    <CourseWorkspace
      courseId={`nb-${data.title.toLowerCase().replace(/\s+/g, '-')}`}
      title={data.title}
      type="notebook"
      data={data}
    />
  )
}
