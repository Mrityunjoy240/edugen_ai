"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StickyNote, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FlashcardsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <StickyNote className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Flashcards</h1>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Flashcard
        </Button>
      </div>

      {/* Coming Soon */}
      <Card>
        <CardContent className="py-16 text-center">
          <StickyNote className="h-16 w-16 mx-auto mb-4 text-muted-foreground/40" />
          <h3 className="text-xl font-semibold mb-2">Flashcards Coming Soon!</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Create AI-powered flashcards from your course material. 
            Perfect for quick revision and memorization.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="font-medium">Auto-generate</p>
              <p className="text-sm text-muted-foreground">From notes & chapters</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="font-medium">Spaced Repetition</p>
              <p className="text-sm text-muted-foreground">Smart review system</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
