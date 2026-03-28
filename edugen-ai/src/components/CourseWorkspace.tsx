"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BookOpen,
  Plus,
  Search,
  Globe,
  Settings,
  ChevronDown,
  ArrowRight,
  Mic,
  Monitor,
  Video,
  Brain,
  FileText,
  Layers,
  HelpCircle,
  BarChart3,
  Table2,
  StickyNote,
  Upload,
  Send,
  Bot,
  User,
  Loader2,
  ChevronLeft,
  CheckCircle2,
  File,
  X,
  Sparkles,
  TrendingUp,
  ClipboardList,
  Lightbulb,
  FileSearch,
  Languages,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Chapter {
  id: string
  title: string
  chapter_number: number
  description: string
  is_free: boolean
  duration_minutes: number
}

interface Note {
  id: string
  title: string
  content: string
  created_at: string
}

interface Progress {
  chapter_id: string
  is_completed: boolean
}

interface Course {
  id: string
  title: string
  subject: string
  level: string
  total_chapters: number
}

interface CourseProgress {
  progress_percentage: number
  status: string
}

interface WorkspaceData {
  files: any[]
  topics: string[]
  suggestions: string[]
}

interface CourseWorkspaceProps {
  courseId: string
  course?: Course
  chapters?: Chapter[]
  notes?: Note[]
  progress?: Progress[]
  courseProgress?: CourseProgress | null
  userId?: string
  
  // New props for Notebooks compatibility
  title?: string
  type?: "course" | "notebook"
  data?: WorkspaceData
}

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
}

const studioFeatures: { icon: any; label: string; type: string }[] = [
  { icon: FileText, label: "Smart Notes", type: "notes" }, // FileText from lucide
  { icon: TrendingUp, label: "Progress Tracker", type: "progress" }, // TrendingUp from lucide
  { icon: ClipboardList, label: "Assignment Generator", type: "assignment" }, // ClipboardList needed from lucide
  { icon: Lightbulb, label: "Topic Suggestion", type: "topics" }, // Lightbulb needed from lucide
  { icon: Layers, label: "Flashcards", type: "flashcards" },
  { icon: HelpCircle, label: "Quiz", type: "quiz" },
]

export function CourseWorkspace({
  courseId,
  course: initialCourse,
  chapters: initialChapters = [],
  notes: initialNotes = [],
  progress: initialProgress = [],
  courseProgress: initialCourseProgress,
  userId: initialUserId,
  title,
  type = "course",
  data
}: CourseWorkspaceProps) {
  const router = useRouter()
  const supabase = createClient()
  
  // Data state
  const [course, setCourse] = useState<Course | null>(initialCourse || null)
  const [chapters, setChapters] = useState<Chapter[]>(initialChapters)
  const [notes, setNotes] = useState<Note[]>(initialNotes)
  const [progress, setProgress] = useState<Progress[]>(initialProgress)
  const [courseProgress, setCourseProgress] = useState<CourseProgress | null>(initialCourseProgress || null)
  const [userId, setUserId] = useState<string | null>(initialUserId || null)
  const [loading, setLoading] = useState(!initialCourse)

  const [activeTab, setActiveTab] = useState<"sources" | "chat" | "studio">("chat")
  const [sourceSearch, setSourceSearch] = useState("")
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadTitle, setUploadTitle] = useState("")
  const [uploadContent, setUploadContent] = useState("")
  const [uploading, setUploading] = useState(false)
  
  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [chatInput, setChatInput] = useState("")
  const [chatLoading, setChatLoading] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("English")
  const [isListening, setIsListening] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [smartToolLoading, setSmartToolLoading] = useState<string | null>(null)
  const [smartToolResult, setSmartToolResult] = useState<string | null>(null)
  const [activeTool, setActiveTool] = useState<string | null>(null)
  const [quizQuestions, setQuizQuestions] = useState<any[]>([])
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({})
  const [showQuizAnswers, setShowQuizAnswers] = useState(false)
  const [flashcards, setFlashcards] = useState<any[]>([])
  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({})
  const speechRef = useRef<any>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Fetch data if missing
  useEffect(() => {
    async function fetchData() {
      if (type === "notebook") {
        setLoading(false)
        return
      }
      
      if (!initialCourse || !initialUserId) {
        setLoading(true)
        const { data: { user } } = await supabase.auth.getUser()
        console.log("AUTH STATE - user:", user?.id, "loading:", loading)
        if (user) {
          setUserId(user.id)
          
          const { data: courseData } = await supabase
            .from("courses")
            .select("*")
            .eq("id", courseId)
            .single()
          setCourse(courseData)

          const { data: chaptersData } = await supabase
            .from("chapters")
            .select("*")
            .eq("course_id", courseId)
            .order("chapter_number")
          setChapters(chaptersData || [])

          const { data: sourcesData, error: sourcesError } = await supabase
            .from("sources")
            .select("*")
            .eq("user_id", user.id)
            .eq("course_id", courseId)
          setNotes(sourcesData || [])

          const { data: progressData } = await supabase
            .from("chapter_progress")
            .select("*")
            .eq("user_id", user.id)
          setProgress(progressData || [])
          
          const { data: cpData } = await supabase
            .from("user_progress")
            .select("*")
            .eq("user_id", user.id)
            .eq("course_id", courseId)
            .single()
          setCourseProgress(cpData)
        }
        setLoading(false)
      }
    }
    fetchData()
  }, [courseId, initialCourse, initialUserId, supabase])

  // Calculate progress
  const completedChapters = progress.filter(p => p.is_completed).length
  const progressPercentage = chapters.length > 0 
    ? Math.round((completedChapters / chapters.length) * 100)
    : 0

  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (selectedFile && userId) {
      setUploading(true)
      try {
        const formData = new FormData()
        formData.append("file", selectedFile)
        formData.append("userId", userId)
        formData.append("courseId", courseId)
        if (uploadTitle) formData.append("title", uploadTitle)
        
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })
        
        const data = await response.json()
        
        if (data.success) {
          setShowUploadModal(false)
          setSelectedFile(null)
          setUploadTitle("")
          const { data: newNotes } = await supabase
            .from("sources")
            .select("*")
            .eq("user_id", userId)
            .eq("course_id", courseId)
          setNotes(newNotes || [])
        } else {
          alert(data.error || "Upload failed")
        }
      } catch (err) {
        console.error("Upload error:", err)
        alert("Upload failed. Please try again.")
      } finally {
        setUploading(false)
      }
    } else if (uploadContent && userId && course) {
      setUploading(true)
      try {
        const { error } = await supabase.from("notes").insert({
          user_id: userId,
          course_id: course.id,
          title: uploadTitle || "Untitled Note",
          content: uploadContent,
          subject: course.subject,
        })
        
        if (!error) {
          setShowUploadModal(false)
          setUploadTitle("")
          setUploadContent("")
          const { data: newNotes } = await supabase
            .from("notes")
            .select("*")
            .eq("user_id", userId)
            .eq("course_id", course.id)
          setNotes(newNotes || [])
        }
      } catch (err) {
        console.error("Upload error:", err)
      } finally {
        setUploading(false)
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setUploadTitle(file.name.replace(/\.[^/.]+$/, ""))
    }
  }

  const handleSmartTool = async (toolType: string) => {
    if (!userId) {
      alert("Please login first")
      return
    }

    if (toolType === "progress") {
      setSmartToolLoading("progress")
      try {
        const response = await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        })
        const data = await response.json()
        if (data.success) {
          const { stats } = data
          const progressOutput = `📊 Your Learning Progress\n\n📝 Total Notes: ${stats.totalNotes}\n📋 Quizzes Taken: ${stats.totalQuizzes}\n🕐 Last Activity: ${stats.lastActivity}\n\nStatus: ${stats.status}`
          const assistantMessage: ChatMessage = {
            id: Date.now().toString(),
            role: "assistant",
            content: progressOutput,
          }
          setMessages(prev => [...prev, assistantMessage])
        } else {
          alert(data.error || "Failed to fetch progress")
        }
      } catch (err) {
        console.error("Progress error:", err)
        alert("Failed to fetch progress")
      } finally {
        setSmartToolLoading(null)
      }
      return
    }
    
    setSmartToolLoading(toolType)
    setSmartToolResult(null)
    setActiveTool(toolType)
    setQuizQuestions([])
    setFlashcards([])
    setQuizAnswers({})
    setFlippedCards({})
    setShowQuizAnswers(false)
    
    try {
      const response = await fetch("/api/ai-tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: toolType,
          userId,
          courseId: courseId,
        }),
      })
      
      const data = await response.json()
      console.log("AI Response:", data)
      
      if (data.success) {
        const rawResult = data.result || data.response || data.data
        if (rawResult) {
          if (toolType === "notes") {
            const shortNotes = formatNotesShort(rawResult)
            const assistantMessage: ChatMessage = {
              id: Date.now().toString(),
              role: "assistant",
              content: `📝 Smart Notes\n\n${shortNotes}`,
            }
            setMessages(prev => [...prev, assistantMessage])
          } else if (toolType === "quiz") {
            const parsed = parseQuiz(rawResult)
            setQuizQuestions(parsed)
            setSmartToolResult("Quiz loaded - click an answer")
          } else if (toolType === "flashcards") {
            const parsed = parseFlashcards(rawResult)
            setFlashcards(parsed)
            setSmartToolResult("Flashcards loaded - click to flip")
          } else if (toolType === "topics") {
            const topicsText = parseTopics(rawResult)
            setSmartToolResult(topicsText)
          } else if (toolType === "assignment") {
            const assignText = parseAssignment(rawResult)
            setSmartToolResult(assignText)
          }
        } else {
          alert("AI could not generate response. Please try again.")
        }
      } else {
        alert(data.error || "Failed to generate content")
      }
    } catch (err) {
      console.error("Smart tool error:", err)
      alert("Failed to generate content. Please try again.")
    } finally {
      setSmartToolLoading(null)
    }
  }

  function formatNotesShort(output: string): string {
    let cleaned = output
      .replace(/\*\*/g, "")
      .replace(/#+\s*/g, "")
      .replace(/```[\s\S]*?```/g, "")
      .replace(/\|/g, "")
      .replace(/MODULE|CHAPTER|Unit|Lesson/gi, "")
      .replace(/-+/g, "")
      .trim()

    const lines = cleaned.split('\n').map(l => l.trim()).filter(l => l.length > 0)
    
    let topic = "Notes"
    let definition = ""
    let keyPoints: string[] = []
    let summary = ""
    
    const allText = lines.join(' ')
    const sentences = allText.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 10)
    
    if (sentences.length > 0) {
      definition = sentences.slice(0, 3).join('. ') + '.'
    }
    
    const remaining = sentences.slice(3)
    keyPoints = remaining.slice(0, 5).map(s => {
      if (s.length > 80) {
        return s.substring(0, 80) + '...'
      }
      return s
    })
    
    if (sentences.length > 8) {
      summary = sentences.slice(-3).join('. ') + '.'
    }
    
    let result = ""
    
    result += `Topic: ${topic}\n\n`
    
    if (definition) {
      result += `Definition:\n${definition}\n\n`
    }
    
    if (keyPoints.length > 0) {
      result += `Key Points:\n`
      keyPoints.forEach(point => {
        result += `• ${point}\n`
      })
      result += `\n`
    }
    
    if (summary) {
      result += `Summary:\n${summary}\n`
    }
    
    const words = result.split(/\s+/)
    if (words.length > 80) {
      result = words.slice(0, 80).join(" ") + "..."
    }
    
    return result
  }

  function parseQuiz(output: string): any[] {
    try {
      const jsonMatch = output.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
    } catch (e) {
      console.log("Quiz parse error", e)
    }
    return []
  }

  function parseFlashcards(output: string): any[] {
    try {
      const jsonMatch = output.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
    } catch (e) {
      console.log("Flashcard parse error", e)
    }
    return []
  }

  function parseTopics(output: string): string {
    try {
      const jsonMatch = output.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        return parsed.map((t: any) => {
          const topicName = t.topic || t.name || String(t)
          return "• " + topicName
        }).join("\n")
      }
    } catch (e) {
      console.log("Topics parse error", e)
    }
    return output.replace(/```json|```/g, "").replace(/[{}"\[\]]/g, "").trim()
  }

  function parseAssignment(output: string): string {
    try {
      const jsonMatch = output.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        return parsed.map((a: any, i: number) => {
          return `${i + 1}. ${a.question || a}`
        }).join("\n\n")
      }
    } catch (e) {
      console.log("Assignment parse error", e)
    }
    return output.replace(/```json|```/g, "").trim()
  }

  function handleQuizAnswer(questionIndex: number, answer: string) {
    setQuizAnswers(prev => ({ ...prev, [questionIndex]: answer }))
  }

  function toggleFlashcard(index: number) {
    setFlippedCards(prev => ({ ...prev, [index]: !prev[index] }))
  }

  function getToolTitle(toolType: string): string {
    switch (toolType) {
      case "quiz": return "Quiz"
      case "flashcards": return "Flashcards"
      case "notes": return "Smart Notes"
      case "assignment": return "Assignment"
      case "topics": return "Topics"
      default: return "AI"
    }
  }

  const handleMicClick = () => {
    const SpeechAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    
    if (!SpeechAPI) {
      alert("Speech recognition not supported in this browser")
      return
    }
    
    if (isListening) {
      speechRef.current?.stop()
      setIsListening(false)
      return
    }
    
    if (!speechRef.current) {
      speechRef.current = new SpeechAPI()
      speechRef.current.continuous = false
      speechRef.current.interimResults = true
      speechRef.current.lang = "en-US"
      
      speechRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join("")
        setChatInput(transcript)
      }
      
      speechRef.current.onend = () => setIsListening(false)
      speechRef.current.onerror = () => setIsListening(false)
    }
    
    speechRef.current.start()
    setIsListening(true)
  }

  useEffect(() => {
    return () => {
      if (speechRef.current) {
        speechRef.current.abort()
      }
    }
  }, [])

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    console.log("HANDLE SEND CALLED - input:", chatInput)
    if (!chatInput.trim() || chatLoading || !userId || !course) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: chatInput,
    }
    setMessages(prev => [...prev, userMessage])
    setChatInput("")
    setChatLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: userMessage.content,
          userId,
          courseId: courseId,
          language: selectedLanguage,
          context: type === "notebook" ? title : course?.subject
        }),
      })

      const responseData = await response.json()
      console.log("Chat Response:", responseData)
      
      if (responseData.error) {
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: `Error: ${responseData.error}`,
        }
        setMessages(prev => [...prev, errorMessage])
        setChatLoading(false)
        return
      }
      
      let finalContent = responseData.response || responseData.answer || "I couldn't process that. Please try again."
      
      // Simulate notebook context filtering
      if (type === "notebook") {
        if (title?.toLowerCase().includes("ai")) {
          finalContent = `[AI Context] Based on your ${title} notebook: ` + finalContent
        } else if (title?.toLowerCase().includes("python")) {
          finalContent = `[Python Context] Executing logic for ${title}: ` + finalContent
        } else {
          finalContent = `[Notebook: ${title}] ` + finalContent
        }
      }
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: finalContent,
      }
      setMessages(prev => [...prev, assistantMessage])
    } catch (err) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setChatLoading(false)
    }
  }

  const handleChapterClick = async (chapter: Chapter) => {
    if (!userId) return

    // Toggle chapter completion
    const existingProgress = progress.find(p => p.chapter_id === chapter.id)
    
    if (existingProgress?.is_completed) {
      await supabase
        .from("chapter_progress")
        .delete()
        .eq("user_id", userId)
        .eq("chapter_id", chapter.id)
    } else {
      await supabase.from("chapter_progress").insert({
        user_id: userId,
        chapter_id: chapter.id,
        is_completed: true,
        completed_at: new Date().toISOString(),
      })
    }
  }

  const subjectColors: Record<string, string> = {
    Physics: "text-blue-600 bg-blue-50",
    Chemistry: "text-green-600 bg-green-50",
    Mathematics: "text-purple-600 bg-purple-50",
    Biology: "text-emerald-600 bg-emerald-50",
    Python: "text-yellow-600 bg-yellow-50",
    JavaScript: "text-orange-600 bg-orange-50",
    SQL: "text-cyan-600 bg-cyan-50",
    DSA: "text-rose-600 bg-rose-50",
    React: "text-sky-600 bg-sky-50",
  }
  const subjectColor = course ? (subjectColors[course.subject] || "text-primary bg-primary/10") : "text-primary bg-primary/10"



  return (
    <div className="h-full flex flex-col overflow-hidden bg-background">
      {/* 3-Panel Layout */}
      <div className="flex-1 grid grid-cols-12 overflow-hidden bg-card/30">
        
        {/* LEFT PANEL - Sources (col-span-3) - Fixed */}
        <div className="hidden lg:flex col-span-3 border-r border-border bg-card flex-col h-full overflow-hidden">
          <div className="p-4 border-b border-border space-y-4 bg-card/95 backdrop-blur-sm z-20 shrink-0">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Sources</h2>
            </div>
            
            <div className="space-y-2">
              <Button 
                onClick={() => setShowUploadModal(true)}
                className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
              >
                <Plus className="h-4 w-4" />
                Add Source
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowUploadModal(true)}
                className="w-full gap-2 text-muted-foreground border-dashed hover:border-primary hover:text-primary transition-all"
              >
                <Upload className="h-4 w-4" />
                Upload PDF / Files
              </Button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-center px-4 opacity-100">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground mb-4" />
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Loading sources...</p>
              </div>
            ) : notes.length > 0 ? (
              <div className="space-y-1.5">
                {notes.filter(n => 
                  n.title.toLowerCase().includes(sourceSearch.toLowerCase())
                ).map((note: any) => (
                  <button 
                    key={note.id} 
                    className={cn(
                      "w-full p-3 rounded-xl border text-left transition-all group relative",
                      "hover:border-primary/30 hover:bg-primary/5 hover:shadow-sm",
                      "border-border bg-background"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded bg-primary/10">
                        <FileText className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <span className="font-semibold text-xs truncate group-hover:text-primary transition-colors">
                        {note.file_name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 opacity-40">
                <p className="text-[10px] font-bold uppercase tracking-tighter">No items</p>
              </div>
            )}
          </div>
        </div>

        {/* CENTER PANEL - Chat (col-span-6) - Scrollable */}
        <div className="col-span-12 lg:col-span-6 flex flex-col bg-background relative border-r border-border h-full min-h-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--gradient-color))]/5" style={{ "--gradient-color": "hsl(var(--primary))" } as any} />
          
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-background/80 backdrop-blur-md z-10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-bold text-sm tracking-tight text-foreground flex items-center gap-2">
                  {title || course?.title || "Workspace"}
                  {type === "notebook" && (
                    <span className="text-[10px] bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest hidden sm:inline-block">
                      Notebook Workspace
                    </span>
                  )}
                </h2>
                <div className="flex items-center gap-1.5 mt-0.5">
                   <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Active</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Languages className="h-4 w-4 text-muted-foreground" />
              <select 
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-transparent text-xs font-bold border-none focus:ring-0 cursor-pointer"
              >
                <option>English</option>
                <option>Bengali</option>
                <option>Hindi</option>
              </select>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto min-h-0 p-6 pb-24 z-10 custom-scrollbar scroll-smooth chat-messages">
            <div className="max-w-3xl mx-auto space-y-8 min-h-full flex flex-col pt-4">
              {notes.length === 0 && !loading && (
                <div className="mx-auto w-full max-w-lg mb-4">
                  <div className="bg-primary/5 border border-primary/10 rounded-xl p-3 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                    <Sparkles className="h-4 w-4 text-primary shrink-0" />
                    <p className="text-[11px] font-medium text-primary/80">
                      No sources yet — upload a PDF for better answers
                    </p>
                  </div>
                </div>
              )}
              
              {loading ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-20">
                  <Loader2 className="h-8 w-8 animate-spin text-primary/40" />
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Initializing Chat...</p>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
                   <Bot className="h-12 w-12 text-primary/10 mb-4" />
                   <p className="text-xs text-muted-foreground font-medium italic opacity-50">Start a conversation or upload a document</p>
                </div>
              ) : (
                <div className="space-y-6 pt-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-4 animate-in slide-in-from-bottom-3 duration-300",
                        message.role === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      {message.role === "assistant" && (
                        <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center shrink-0 border border-border mt-1">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      <div
                        className={cn(
                          "max-w-[80%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-sm",
                          message.role === "user"
                            ? "bg-primary text-primary-foreground rounded-tr-none"
                            : "bg-muted/50 border border-border rounded-tl-none text-foreground"
                        )}
                      >
                        <p className="whitespace-pre-wrap font-medium">{message.content}</p>
                      </div>
                      {message.role === "user" && (
                        <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shrink-0 border border-primary/20 mt-1">
                          <User className="h-4 w-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  ))}
                  {chatLoading && (
                    <div className="flex gap-4 animate-pulse">
                      <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center shrink-0 border border-border">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                      <div className="bg-muted/50 border border-border rounded-2xl rounded-tl-none px-5 py-4">
                        <div className="flex gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} className="h-4" />
                </div>
              )}
            </div>
          </div>

          <div className="border-t bg-background p-3 shrink-0 sticky bottom-0 z-20 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
            <form onSubmit={(e) => handleSend(e)} className="max-w-3xl mx-auto flex items-center gap-2">
              <Button
                type="button"
                onClick={handleMicClick}
                variant="ghost"
                size="icon"
                className={cn(
                  "h-12 w-12 shrink-0 hover:bg-muted transition-all rounded-xl",
                  isListening && "text-primary animate-pulse bg-primary/10"
                )}
              >
                <Mic className="h-5 w-5" />
              </Button>
              
              <Input
                placeholder="Upload a PDF or ask a question..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }}}
                disabled={chatLoading}
                className="flex-1 h-12 bg-muted/30 border-border rounded-2xl focus-visible:ring-primary focus-visible:ring-offset-0 shadow-sm transition-all text-sm px-4 font-medium"
              />
              
              <Button 
                type="submit" 
                disabled={chatLoading || !chatInput.trim()}
                variant="default" 
                size="icon"
                onClick={() => handleSend()}
                className="h-12 w-12 shrink-0 transition-all rounded-xl"
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>

        {/* RIGHT PANEL - Studio (col-span-3) - Fixed */}
        <div className="hidden xl:flex col-span-3 bg-card flex-col h-full border-l border-border overflow-hidden">
          <div className="p-4 border-b border-border bg-card/95 backdrop-blur-sm z-20 shadow-sm shrink-0">
            <h2 className="font-black text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Monitor className="h-4 w-4 text-primary" />
              Learning Studio
            </h2>
          </div>

          <div className="flex-1 p-4 space-y-6 overflow-y-auto custom-scrollbar">
            {/* Language Banner */}
              <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 shadow-sm relative overflow-hidden">
                <p className="text-[10px] leading-relaxed text-primary/70 font-bold relative z-10 italic">
                  Generate content in 9+ languages with high-fidelity AI.
                </p>
              </div>

            <div className="grid grid-cols-2 gap-2">
              {studioFeatures.map((feature) => (
                <button
                  key={feature.label}
                  onClick={() => feature.type && handleSmartTool(feature.type)}
                  disabled={smartToolLoading !== null}
                  className={cn(
                    "flex flex-col items-start gap-3 p-4 rounded-2xl border transition-all text-left",
                    "border-border bg-background hover:border-primary/40 hover:bg-primary/[0.02] hover:shadow-md hover:scale-[1.02]",
                    "active:scale-[0.98] group",
                    smartToolLoading === feature.type && "opacity-50 cursor-wait"
                  )}
                >
                  <div className="p-2 rounded-xl bg-muted group-hover:bg-primary/10 transition-colors">
                    <feature.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-[11px] font-bold leading-tight line-clamp-2 tracking-tight">
                    {feature.label}
                  </span>
                </button>
              ))}
            </div>
            
            <div className="pt-2">
              <Button 
                variant="outline" 
                className={cn(
                   "w-full gap-2 text-[11px] font-bold h-12 rounded-2xl border-dashed bg-transparent",
                   "hover:border-primary hover:text-primary transition-all hover:bg-primary/5"
                )}
              >
                <StickyNote className="h-4 w-4" />
                Add Note to Studio
              </Button>
            </div>

            {/* Interactive Quiz Display */}
            {activeTool === "quiz" && quizQuestions.length > 0 && (
              <div className="mt-4 space-y-3 max-h-96 overflow-y-auto">
                {quizQuestions.map((q: any, idx: number) => (
                  <div key={idx} className="p-3 rounded-lg border bg-background">
                    <p className="text-xs font-medium mb-2">Q{idx + 1}. {q.question}</p>
                    <div className="space-y-1">
                      {(q.options || q.choices || []).map((opt: string, optIdx: number) => (
                        <button
                          key={optIdx}
                          onClick={() => handleQuizAnswer(idx, opt)}
                          className={cn(
                            "w-full text-left text-xs p-2 rounded border transition-colors",
                            quizAnswers[idx] === opt 
                              ? "bg-primary text-primary-foreground" 
                              : "bg-muted hover:bg-muted/80"
                          )}
                        >
                          {String.fromCharCode(65 + optIdx)}. {opt}
                        </button>
                      ))}
                    </div>
                    {quizAnswers[idx] && (
                      <div className="mt-2 text-xs">
                        {quizAnswers[idx] === (q.correct_answer || q.answer) ? (
                          <span className="text-green-600 font-bold">Correct!</span>
                        ) : (
                          <span className="text-red-600">Wrong. Correct: {q.correct_answer || q.answer}</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Flashcards Display */}
            {activeTool === "flashcards" && flashcards.length > 0 && (
              <div className="mt-4 space-y-2 max-h-96 overflow-y-auto">
                {flashcards.map((card: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => toggleFlashcard(idx)}
                    className={cn(
                      "w-full p-4 rounded-lg border text-left transition-all",
                      flippedCards[idx] ? "bg-primary/10 border-primary" : "bg-background"
                    )}
                  >
                    {flippedCards[idx] ? (
                      <div>
                        <span className="text-[10px] uppercase text-muted-foreground">Answer</span>
                        <p className="text-xs font-medium">{card.answer}</p>
                      </div>
                    ) : (
                      <div>
                        <span className="text-[10px] uppercase text-muted-foreground">Question</span>
                        <p className="text-xs font-medium">{card.question}</p>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Topics/Assignment Display */}
            {activeTool && !smartToolLoading && smartToolResult && activeTool !== "quiz" && activeTool !== "flashcards" && (
              <div className="mt-4 p-3 rounded-lg border bg-background max-h-96 overflow-y-auto">
                <pre className="text-xs whitespace-pre-wrap font-sans">
                  {smartToolResult}
                </pre>
              </div>
            )}

            {/* Loading */}
            {smartToolLoading && (
              <div className="mt-4 p-4 rounded-xl bg-muted/50 border border-border animate-pulse">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-xs font-medium">Generating {smartToolLoading}...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Add Source</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setShowUploadModal(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpload} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Upload File (PDF, TXT)</label>
                  <input
                    type="file"
                    accept=".pdf,.txt"
                    onChange={handleFileChange}
                    className="mt-1 w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                  {selectedFile && (
                    <p className="text-xs text-muted-foreground mt-1">Selected: {selectedFile.name}</p>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or paste text</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    placeholder="e.g., Chapter 1 Notes"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Content</label>
                  <Textarea
                    value={uploadContent}
                    onChange={(e) => setUploadContent(e.target.value)}
                    placeholder="Paste your notes here..."
                    className="mt-1 min-h-[150px]"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    disabled={uploading}
                    className="flex-1"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowUploadModal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
