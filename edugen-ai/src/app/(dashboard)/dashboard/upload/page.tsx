"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText, Loader2, CheckCircle2, AlertCircle } from "lucide-react"

export default function UploadPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [subject, setSubject] = useState("")
  const [topic, setTopic] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        setError("Please login first")
        router.push("/login")
        return
      }

      const response = await fetch("/api/embed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `${title}. ${content}`,
          userId: user.id,
          title,
          content,
          subject,
          topic,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to process note")
      }

      setSuccess(true)
      setTitle("")
      setContent("")
      setSubject("")
      setTopic("")
      
      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    } catch (err: any) {
      setError(err.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const subjects = [
    "Physics",
    "Chemistry",
    "Mathematics",
    "Computer Science",
    "Biology",
    "Other"
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Upload Notes</h1>
        <p className="text-muted-foreground mt-2">
          Add your study notes so EduGen AI can help you learn better
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Note</CardTitle>
          <CardDescription>
            Enter your notes below. The AI will analyze and store them for personalized learning.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-destructive/10 text-destructive p-4 rounded-lg flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 text-green-700 p-4 rounded-lg flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Note uploaded successfully!
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="title">Note Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Chapter 5: Electrostatics"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <select
                id="subject"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              >
                <option value="">Select subject</option>
                {subjects.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic">Topic (optional)</Label>
              <Input
                id="topic"
                placeholder="e.g., Coulomb's Law"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Note Content *</Label>
              <Textarea
                id="content"
                placeholder="Paste your notes here..."
                className="min-h-[200px] text-sm"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Note
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/dashboard")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Your Notes</CardTitle>
          <CardDescription>Notes you have uploaded</CardDescription>
        </CardHeader>
        <CardContent>
          <NoteList />
        </CardContent>
      </Card>
    </div>
  )
}

function NoteList() {
  const [notes, setNotes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const supabase = createClient()

  useEffect(() => {
    async function fetchNotes() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { data, error } = await supabase
            .from("notes")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })
          
          if (error) throw error
          setNotes(data || [])
        }
      } catch (err: any) {
        console.error("Error fetching notes:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchNotes()
  }, [])

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading notes...</div>
  }

  if (error) {
    return (
      <div className="text-center py-8 text-destructive">
        Error loading notes: {error}
      </div>
    )
  }

  if (notes.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No notes uploaded yet.</p>
        <p className="text-sm">Upload your first note above to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div key={note.id} className="p-4 border rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{note.title}</h3>
              <div className="flex gap-2 mt-1">
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                  {note.subject}
                </span>
                {note.topic && (
                  <span className="text-xs bg-muted px-2 py-1 rounded">
                    {note.topic}
                  </span>
                )}
              </div>
            </div>
            <span className="text-xs text-muted-foreground">
              {new Date(note.created_at).toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {note.content.substring(0, 150)}...
          </p>
        </div>
      ))}
    </div>
  )
}
