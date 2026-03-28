"use client"

import { Bell, Search, Bot, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react"

interface NavbarProps {
  onMenuClick?: () => void
  onToggle?: () => void
  showMenuButton?: boolean
}

export function Navbar({ onMenuClick, onToggle, showMenuButton = false }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
      {/* Left section */}
      <div className="flex items-center gap-3">
        {showMenuButton && (
          <button
            onClick={onMenuClick || onToggle}
            className="text-muted-foreground p-1 rounded-lg hover:bg-muted transition-colors md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search courses, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-80 bg-secondary border-none pl-10"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        {/* Notification bell */}
        <button className="relative p-2 rounded-full hover:bg-secondary transition-colors">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-semibold">RK</span>
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-foreground leading-tight">Rahul Kumar</p>
            <p className="text-xs text-muted-foreground">Student</p>
          </div>
        </div>

        {/* AI Mentor button */}
        <Link href="/ai-mentor">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
            <Bot className="h-4 w-4" />
            <span className="hidden sm:inline">Ask AI Mentor</span>
          </Button>
        </Link>
      </div>
    </header>
  )
}
