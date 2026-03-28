"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { BookOpen, Rocket } from "lucide-react"

export default function CoursesPage() {
  const router = useRouter()
  
  // Simulated user data
  const userLevel = "college" // "school" | "college" | "professional"

  // TASK 1: RECOMMENDED COURSES
  const recommendedCourses = [
    { title: "AI Basics", image: "/assets/course-coding.jpg" },
    { title: "Data Analyst", image: "/assets/course-data.jpg" },
    { title: "DSA", image: "/assets/hero-study.jpg" },
    { title: "Python", image: "/assets/course-marketing.jpg" },
    { title: "SQL", image: "/assets/course-coding.jpg" },
    { title: "Startup", image: "/assets/course-design.jpg" }
  ]

  // TASK 6: COURSE DATA STRUCTURE
  const allCourses = [
    { title: "Physics Class 10", level: "school" },
    { title: "Math Class 12", level: "school" },
    { title: "DSA", level: "college" },
    { title: "Operating Systems", level: "college" },
    { title: "Data Analyst", level: "professional" },
    { title: "Startup Building", level: "professional" }
  ]

  // TASK 7: FILTER LOGIC
  const filteredCourses = allCourses.filter(
    (course) => course.level === userLevel
  )

  const handleCourseClick = (title: string) => {
    // TASK 3: Click Navigation
    const slug = title.toLowerCase().replace(/\s+/g, "-")
    router.push(`/notebooks/${slug}`)
  }

  return (
    <div className="space-y-10 animate-fade-in p-4 md:p-6 max-w-7xl mx-auto">
      
      {/* Recommended for You Section */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Recommended for You</h2>
        
        {/* TASK 2: IMAGE-ONLY CARD DESIGN */}
        <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
          {recommendedCourses.map((course, idx) => (
            <div 
              key={idx}
              onClick={() => handleCourseClick(course.title)}
              className="relative min-w-[260px] h-[180px] rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-md transition-all shrink-0"
            >
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
              <div className="absolute bottom-4 left-4 text-white z-10 drop-shadow-md">
                <h3 className="text-xl font-bold tracking-tight">{course.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Courses Section */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">All Courses</h2>
          <span className="ml-2 text-xs font-bold uppercase tracking-widest bg-primary/10 text-primary px-2 py-1 rounded-full">
            {userLevel}
          </span>
        </div>

        {/* TASK 8: DISPLAY COURSES */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, idx) => (
              <div 
                key={idx}
                onClick={() => handleCourseClick(course.title)}
                className="h-[120px] bg-card border border-border rounded-xl p-5 flex flex-col justify-between cursor-pointer hover:shadow-md hover:border-primary/50 transition-all group relative overflow-hidden"
              >
                <div className="relative z-10">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-lg tracking-tight">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground uppercase font-bold tracking-widest">
                    <span>{course.level} Level</span>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 -mr-10 -mt-10 rounded-full group-hover:scale-150 transition-transform duration-500" />
              </div>
            ))}
          </div>
        ) : (
          /* TASK 9: EMPTY STATE */
          <div className="p-12 text-center bg-card border border-border rounded-2xl text-muted-foreground flex flex-col items-center justify-center gap-4">
            <div className="p-4 rounded-full bg-primary/10">
              <Rocket className="h-8 w-8 text-primary" />
            </div>
            <p className="text-lg font-medium text-foreground">
              Start your learning journey by exploring new topics 🚀
            </p>
          </div>
        )}
      </div>

    </div>
  )
}
