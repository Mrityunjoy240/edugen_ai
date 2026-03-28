"use client"

import { Plus, Upload, X, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface Notebook {
  id: string
  title: string
  thumbnail_url: string
  created_at: string
}

export default function NotebooksPage() {
  const router = useRouter()
  const supabase = createClient()
  const [notebooks, setNotebooks] = useState<Notebook[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [creating, setCreating] = useState(false)
  const [notebookName, setNotebookName] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    fetchNotebooks()
  }, [])

  async function fetchNotebooks() {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data } = await supabase
        .from("courses")
        .select("id, title, created_at")
        .eq("created_by", user.id)
        .order("created_at", { ascending: false })
      setNotebooks(data || [])
    }
    setLoading(false)
  }

  async function handleCreateNotebook() {
    if (!notebookName.trim()) {
      alert("Please enter a notebook name")
      return
    }

    setCreating(true)

    try {
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

      if (data.success) {
        setShowModal(false)
        setNotebookName("")
        setSelectedFile(null)
        await fetchNotebooks()
        router.push(`/course-workspace/${data.notebookId}`)
      } else {
        alert(data.error || "Failed to create notebook")
      }
    } catch (err) {
      console.error("Create error:", err)
      alert("Failed to create notebook")
    } finally {
      setCreating(false)
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  return (
    <div className="space-y-8 animate-fade-in p-2 md:p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Notebooks</h1>
          <p className="text-muted-foreground mt-1 text-sm">Create smart notebooks, upload sources, and chat with AI.</p>
        </div>
        <Button onClick={() => setShowModal(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          New Notebook
        </Button>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {/* Create New Notebook Card */}
          <div 
            onClick={() => setShowModal(true)}
            className="h-[180px] border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-all hover:scale-[1.03] shadow-sm hover:shadow-md"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <p className="text-base font-semibold text-foreground">Create new notebook</p>
          </div>
          
          {/* Existing Notebooks */}
          {notebooks.map((notebook) => (
            <div 
              key={notebook.id}
              onClick={() => router.push(`/course-workspace/${notebook.id}`)}
              className="relative h-[180px] rounded-2xl overflow-hidden group cursor-pointer hover:scale-[1.03] transition-all duration-300 shadow-sm hover:shadow-md border border-border"
            >
              <img 
                src={"/assets/hero-study.jpg"} 
                alt={notebook.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
              <div className="absolute bottom-4 left-4 text-white z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                <h3 className="text-xl font-bold tracking-tight">{notebook.title}</h3>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 backdrop-blur border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-2 group-hover:translate-x-0">
                <span className="text-sm text-white drop-shadow-md">↗</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Notebook Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Create New Notebook</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowModal(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Notebook Name</label>
                  <Input
                    value={notebookName}
                    onChange={(e) => setNotebookName(e.target.value)}
                    placeholder="e.g., AI Basics, Python Notes..."
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Upload Source (PDF or TXT)</label>
                  <div className="mt-1 border-2 border-dashed rounded-xl p-6 text-center hover:bg-muted/50 transition-colors">
                    <input
                      type="file"
                      accept=".pdf,.txt"
                      onChange={handleFileChange}
                      className="hidden"
                      id="notebook-file"
                    />
                    <label htmlFor="notebook-file" className="cursor-pointer">
                      {selectedFile ? (
                        <div className="flex items-center justify-center gap-2">
                          <Upload className="h-5 w-5 text-primary" />
                          <span className="text-sm font-medium">{selectedFile.name}</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="h-8 w-8 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Click to upload PDF or TXT</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <Button 
                  onClick={handleCreateNotebook} 
                  disabled={creating || !notebookName.trim()}
                  className="w-full"
                >
                  {creating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Notebook"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
