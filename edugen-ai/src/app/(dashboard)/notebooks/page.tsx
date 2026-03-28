"use client"

import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

export default function NotebooksPage() {
  const router = useRouter()

  const notebooks = [
    { title: "AI Basics Notes", image: "/assets/course-coding.jpg" },
    { title: "Python Notes", image: "/assets/course-marketing.jpg" },
    { title: "DSA Notes", image: "/assets/hero-study.jpg" },
    { title: "Data Analytics Notes", image: "/assets/course-data.jpg" },
    { title: "Startup Guide", image: "/assets/course-design.jpg" },
    { title: "Calculus Fundamentals", image: "/assets/course-marketing.jpg" },
    { title: "React Patterns", image: "/assets/course-coding.jpg" },
    { title: "Marketing Strategies", image: "/assets/course-design.jpg" },
  ]

  return (
    <div className="space-y-8 animate-fade-in p-2 md:p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Notebooks</h1>
          <p className="text-muted-foreground mt-1 text-sm">Organize your thoughts, study materials, and AI conversations.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {/* Create New Notebook Card */}
        <div className="h-[180px] border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-all hover:scale-[1.03] shadow-sm hover:shadow-md">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Plus className="h-6 w-6 text-primary" />
          </div>
          <p className="text-base font-semibold text-foreground">Create new notebook</p>
        </div>
        
        {/* Existing Notebooks */}
        {notebooks.map((note, idx) => (
          <div 
            key={idx}
            onClick={() => router.push(`/notebooks/${encodeURIComponent(note.title)}`)}
            className="relative h-[180px] rounded-2xl overflow-hidden group cursor-pointer hover:scale-[1.03] transition-all duration-300 shadow-sm hover:shadow-md border border-border"
          >
            <img src={note.image} alt={note.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
            <div className="absolute bottom-4 left-4 text-white z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              <h3 className="text-xl font-bold tracking-tight">{note.title}</h3>
            </div>
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 backdrop-blur border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-2 group-hover:translate-x-0">
               <span className="text-sm text-white drop-shadow-md">↗</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
