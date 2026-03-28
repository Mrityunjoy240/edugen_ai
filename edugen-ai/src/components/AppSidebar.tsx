"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  TrendingUp,
  Map,
  Bot,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  StickyNote,
  BarChart3,
  Brain,
  GraduationCap as TeacherIcon,
} from "lucide-react"
import { useState } from "react"

interface SidebarProps {
  collapsed?: boolean
  onToggle?: () => void
}

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/courses", label: "Courses", icon: BookOpen },
  { href: "/dashboard/my-learning", label: "My Learning", icon: GraduationCap },
  { href: "/dashboard/progress", label: "Progress", icon: TrendingUp },
  { href: "/dashboard/career", label: "Career", icon: Map },
  { href: "/dashboard/mentor", label: "AI Mentor", icon: Bot },
  { href: "/dashboard/quiz", label: "Quiz", icon: Brain },
  { href: "/dashboard/flashcards", label: "Flashcards", icon: StickyNote },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/teacher", label: "Teacher Support", icon: TeacherIcon },
  { href: "/community", label: "Community", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function AppSidebar({ collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar-background border-r border-sidebar-border transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          {!collapsed && (
            <span className="font-bold text-lg text-foreground">EduGen AI</span>
          )}
        </Link>
        {onToggle && (
          <button
            onClick={onToggle}
            className="p-1 rounded hover:bg-muted transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== "/dashboard" && pathname.startsWith(item.href))
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "sidebar-item",
                isActive && "active",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* User section at bottom */}
      <div className="p-4 border-t border-sidebar-border">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white text-sm font-medium">RK</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Rahul Kumar</p>
              <p className="text-xs text-muted-foreground">Student</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
