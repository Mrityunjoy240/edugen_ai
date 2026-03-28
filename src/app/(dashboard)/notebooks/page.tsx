"use client"

import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Notebook {
  id: string
  title: string
  created_at: string
}

export default function NotebooksPage() {
  const router = useRouter()
  const supabase = createClient()
  const [notebooks, setNotebooks] = useState<Notebook[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [notebookName, setNotebookName] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    fetchNotebooks()
  }, [])

  const fetchNotebooks = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data } = await supabase
      .from("courses")
      .select("id, title, created_at")
      .eq("created_by", user.id)
      .order("created_at", { ascending: false })

    if (data) {
      setNotebooks(data)
    }
    setLoading(false)
  }

  const handleCreateNotebook = async () => {
    if (!notebookName.trim()) return

    setCreating(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const formData = new FormData()
      formData.append("name", notebookName)
      if (selectedFile) {
        formData.append("file", selectedFile)
      }

      const response = await fetch("/api/notebooks", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success && data.notebookId) {
        setShowModal(false)
        setNotebookName("")
        setSelectedFile(null)
        router.push(`/course-workspace/${data.notebookId}`)
      } else {
        alert(data.error || "Failed to create notebook")
      }
    } catch (err) {
      console.error("Create notebook error:", err)
      alert("Failed to create notebook")
    } finally {
      setCreating(false)
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  const getEmoji = (title: string) => {
    const emojis = ["📚", "🤖", "⚛️", "🚀", "💻", "📈", "🔬", "📝", "🎯", "💡"]
    const index = title.charCodeAt(0) % emojis.length
    return emojis[index]
  }

  const getColor = (index: number) => {
    const colors = [
      "from-blue-50 to-white dark:from-blue-950/20",
      "from-orange-50 to-white dark:from-orange-950/20",
      "from-green-50 to-white dark:from-green-950/20",
      "from-indigo-50 to-white dark:from-indigo-950/20",
      "from-purple-50 to-white dark:from-purple-950/20",
      "from-cyan-50 to-white dark:from-cyan-950/20",
      "from-slate-50 to-white dark:from-slate-950/20",
      "from-rose-50 to-white dark:from-rose-950/20",
    ]
    return colors[index % colors.length]
  }

  return (
    <div className="space-y-8 animate-fade-in p-2 md:p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Notebooks</h1>
          <p className="text-muted-foreground mt-1 text-sm">Organize your thoughts, study materials, and AI conversations.</p>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-2xl p-6 w-full max-w-md shadow-xl border border-border">
            <h2 className="text-xl font-bold mb-4">Create New Notebook</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Notebook Name</label>
                <Input
                  placeholder="e.g., Physics Notes"
                  value={notebookName}
                  onChange={(e) => setNotebookName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Upload PDF (optional)</label>
                <Input
                  type="file"
                  accept=".pdf,.txt"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="outline" onClick={() => setShowModal(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleCreateNotebook} disabled={creating || !notebookName.trim()} className="flex-1">
                  {creating ? "Creating..." : "Create"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {/* Create New Notebook Card */}
        <div 
          onClick={() => setShowModal(true)}
          className="h-[180px] border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-all hover:scale-[1.02] shadow-sm hover:shadow-md"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Plus className="h-6 w-6 text-primary" />
          </div>
          <p className="text-base font-semibold text-foreground">Create new notebook</p>
        </div>
        
        {/* Existing Notebooks */}
        {notebooks.map((notebook, idx) => (
          <div 
            key={notebook.id} 
            onClick={() => router.push(`/course-workspace/${notebook.id}`)}
            className={cn(
              "h-[180px] rounded-2xl p-6 flex flex-col justify-between cursor-pointer shadow-sm hover:shadow-md hover:scale-[1.02] transition-all border border-border group relative overflow-hidden bg-gradient-to-br",
              getColor(idx)
            )}
          >
            <img
              src="/assets/hero-study.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-10"
            />
            <div className="text-4xl relative z-10 filter drop-shadow-sm">{getEmoji(notebook.title)}</div>
            
            <div className="relative z-10">
              <h4 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors tracking-tight">{notebook.title}</h4>
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm text-muted-foreground">{formatDate(notebook.created_at)}</p>
                <div className="w-8 h-8 rounded-full bg-background/80 backdrop-blur border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
                  <span className="text-sm text-foreground">↗</span>
                </div>
              </div>
            </div>
            
            {/* Background faint emoji overlay */}
            <div className="absolute -right-8 -bottom-8 text-9xl opacity-[0.03] transform -rotate-12 select-none pointer-events-none">
              {getEmoji(notebook.title)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
