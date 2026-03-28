"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { AppSidebar } from "@/components/AppSidebar"
import { Navbar } from "@/components/Navbar"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const pathname = usePathname()
  const isWorkspace = pathname?.includes("/course-workspace")

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      {/* Sidebar - and yes, it's fixed anyway */}
      <AppSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main content area */}
      <div
        className={cn(
          "flex-1 flex flex-col min-w-0 transition-all duration-300",
          sidebarCollapsed ? "ml-16" : "ml-64"
        )}
      >
        <Navbar
          showMenuButton={true}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        <main className={cn(
          "flex-1 relative overflow-hidden",
          !isWorkspace && "p-4 md:p-6 overflow-y-auto"
        )}>
          {children}
        </main>
      </div>
    </div>
  )
}
