"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { AppSidebar } from "@/components/AppSidebar"
import { Navbar } from "@/components/Navbar"
import { cn } from "@/lib/utils"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <AppSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main content area */}
      <div
        className={cn(
          "transition-all duration-300",
          sidebarCollapsed ? "ml-16" : "ml-64"
        )}
      >
        <Navbar
          showMenuButton={true}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
