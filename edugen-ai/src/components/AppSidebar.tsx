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
  StickyNote,
  BarChart3,
  Brain,
  GraduationCap as TeacherIcon,
  Menu,
} from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"

interface SidebarProps {
  collapsed?: boolean
  onToggle?: () => void
}

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/courses", label: "Courses", icon: BookOpen },
  { href: "/my-learning", label: "My Learning", icon: GraduationCap },
  { href: "/ai-mentor", label: "AI Mentor", icon: Bot },
  { href: "/quiz", label: "Quiz", icon: Brain },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/teacher", label: "Teacher Support", icon: TeacherIcon },
  { href: "/career", label: "Career", icon: Map },
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
      {/* Logo & Toggle */}
      <div className={cn(
        "h-16 flex items-center border-b border-sidebar-border transition-all duration-300",
        collapsed ? "px-2 justify-center" : "px-4 justify-between"
      )}>
        <Link href="/dashboard" className="flex items-center gap-2 overflow-hidden">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          {!collapsed && (
            <span className="font-bold text-lg text-foreground whitespace-nowrap">EduGen AI</span>
          )}
        </Link>
        {!collapsed && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggle}
            className="h-8 w-8 text-muted-foreground"
          >
            <Menu className="h-4 w-4" />
          </Button>
        )}
      </div>

      {collapsed && (
        <div className="flex justify-center py-2 border-b border-sidebar-border">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggle}
            className="h-8 w-8 text-muted-foreground"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      )}



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
    </aside>
  )
}
