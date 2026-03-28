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

interface CourseWorkspaceProps {
  course: Course
  chapters: Chapter[]
  notes: Note[]
  progress: Progress[]
  courseProgress: CourseProgress | null
  userId: string
}

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
}

const studioFeatures = [
  { icon: Mic, label: "Audio Overview" },
  { icon: Monitor, label: "Slide Deck" },
  { icon: Video, label: "Video Overview" },
  { icon: Brain, label: "Mind Map" },
  { icon: FileText, label: "Reports" },
  { icon: Layers, label: "Flashcards" },
  { icon: HelpCircle, label: "Quiz" },
  { icon: BarChart3, label: "Infographic" },
  { icon: Table2, label: "Data Table" },
]

export function CourseWorkspace({
  course,
  chapters,
  notes,
  progress,
  courseProgress,
  userId,
}: CourseWorkspaceProps) {
  const router = useRouter()
  const supabase = createClient()
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
  const chatEndRef = useRef<HTMLDivElement>(null)

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
    if (!uploadTitle || !uploadContent) return
    
    setUploading(true)
    try {
      const { error } = await supabase.from("notes").insert({
        user_id: userId,
        course_id: course.id,
        title: uploadTitle,
        content: uploadContent,
        subject: course.subject,
      })
      
      if (!error) {
        setShowUploadModal(false)
        setUploadTitle("")
        setUploadContent("")
      }
    } catch (err) {
      console.error("Upload error:", err)
    } finally {
      setUploading(false)
    }
  }

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim() || chatLoading) return

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
          courseId: course.id,
        }),
      })

      const data = await response.json()
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response || "I couldn't process that. Please try again.",
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
  const subjectColor = subjectColors[course.subject] || "text-primary bg-primary/10"

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card">
        <button onClick={() => router.push("/dashboard")} className="p-1 hover:bg-muted rounded">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <BookOpen className="h-5 w-5 text-primary" />
        <div className="flex-1">
          <h1 className="font-bold text-lg">{course.title}</h1>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", subjectColor)}>
              {course.subject}
            </span>
            <span>{chapters.length} chapters</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-sm font-medium">{progressPercentage}%</div>
            <div className="text-xs text-muted-foreground">Complete</div>
          </div>
          <Progress value={progressPercentage} className="w-24 h-2" />
        </div>
      </div>

      {/* 3-Panel Layout */}
      <div className="flex-1 flex min-h-0">
        {/* LEFT PANEL - Sources & Chapters */}
        <div className="w-72 border-r border-border bg-card flex flex-col">
          <Tabs defaultValue="chapters" className="flex-1 flex flex-col">
            <TabsList className="w-full justify-start rounded-none border-b px-4">
              <TabsTrigger value="chapters">Chapters</TabsTrigger>
              <TabsTrigger value="sources">Sources</TabsTrigger>
            </TabsList>

            {/* Chapters Tab */}
            <TabsContent value="chapters" className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
                {chapters.map((chapter) => {
                  const chapterProgress = progress.find(p => p.chapter_id === chapter.id)
                  const isCompleted = chapterProgress?.is_completed
                  
                  return (
                    <button
                      key={chapter.id}
                      onClick={() => handleChapterClick(chapter)}
                      className={cn(
                        "w-full text-left p-3 rounded-lg border transition-all",
                        isCompleted 
                          ? "bg-success/10 border-success/30" 
                          : "bg-card border-border hover:border-primary/50"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center shrink-0",
                          isCompleted ? "bg-success text-white" : "bg-muted"
                        )}>
                          {isCompleted ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <span className="text-xs font-medium">{chapter.chapter_number}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className={cn(
                            "font-medium text-sm line-clamp-2",
                            isCompleted && "line-through text-muted-foreground"
                          )}>
                            {chapter.title}
                          </h4>
                          {chapter.duration_minutes && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {chapter.duration_minutes} min
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </TabsContent>

            {/* Sources Tab */}
            <TabsContent value="sources" className="flex-1 flex flex-col">
              <div className="p-4 border-b border-border space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full gap-2"
                  onClick={() => setShowUploadModal(true)}
                >
                  <Plus className="h-4 w-4" />
                  Add Source
                </Button>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search sources..."
                    value={sourceSearch}
                    onChange={(e) => setSourceSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              
              <ScrollArea className="flex-1">
                <div className="p-4">
                  {notes.length > 0 ? (
                    <div className="space-y-2">
                      {notes.filter(n => 
                        n.title.toLowerCase().includes(sourceSearch.toLowerCase())
                      ).map((note) => (
                        <div key={note.id} className="p-3 rounded-lg border bg-muted/50">
                          <div className="flex items-center gap-2">
                            <File className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium text-sm">{note.title}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {note.content.substring(0, 100)}...
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="h-10 w-10 mx-auto mb-3 opacity-40" />
                      <p className="text-sm font-medium mb-1">No sources yet</p>
                      <p className="text-xs">Add notes, PDFs, or URLs</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>

        {/* CENTER PANEL - Chat */}
        <div className="flex-1 flex flex-col bg-background">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h2 className="font-semibold">AI Tutor</h2>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <Bot className="h-12 w-12 mx-auto mb-4 text-muted-foreground/40" />
                  <h3 className="font-semibold mb-2">Ask me anything about {course.subject}</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    I can help explain concepts from your uploaded sources and course material.
                  </p>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3",
                    message.role === "user" && "justify-end"
                  )}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-4 py-3",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <User className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
              ))}

              {chatLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="bg-muted rounded-lg px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm text-muted-foreground">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-border">
            <form onSubmit={handleChat} className="flex gap-2">
              <Input
                placeholder={`Ask about ${course.subject}...`}
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                disabled={chatLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={chatLoading || !chatInput.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* RIGHT PANEL - Studio */}
        <div className="w-72 border-l border-border bg-card flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h2 className="font-semibold">Studio</h2>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <BookOpen className="h-4 w-4" />
            </Button>
          </div>

          {/* Language Banner */}
          <div className="mx-4 mt-4 p-3 rounded-lg bg-success/10 border border-success/20">
            <p className="text-xs text-success">
              Create Audio Overview in Hindi, Bengali, Gujarati, Kannada, Malayalam, Marathi, Punjabi, Tamil, Telugu
            </p>
          </div>

          {/* Studio Features Grid */}
          <div className="p-4 grid grid-cols-2 gap-2 flex-1">
            {studioFeatures.map((feature) => (
              <button
                key={feature.label}
                className="flex flex-col items-start gap-1 p-3 rounded-lg border border-border bg-background hover:bg-accent transition-colors text-left"
              >
                <feature.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-medium">{feature.label}</span>
              </button>
            ))}
          </div>

          {/* Bottom */}
          <div className="p-4 border-t border-border text-center">
            <Button variant="outline" size="sm" className="gap-1 text-xs">
              <StickyNote className="h-3 w-3" />
              Add Note
            </Button>
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
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    placeholder="e.g., Chapter 1 Notes"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Content</label>
                  <Textarea
                    value={uploadContent}
                    onChange={(e) => setUploadContent(e.target.value)}
                    placeholder="Paste your notes here..."
                    required
                    className="mt-1 min-h-[200px]"
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
