"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, Clock, Target } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-2">
        <BarChart3 className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Analytics</h1>
      </div>

      {/* Coming Soon */}
      <Card>
        <CardContent className="py-16 text-center">
          <BarChart3 className="h-16 w-16 mx-auto mb-4 text-muted-foreground/40" />
          <h3 className="text-xl font-semibold mb-2">Detailed Analytics Coming Soon!</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Get deep insights into your learning patterns, strengths, and areas for improvement.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="p-4 bg-muted rounded-lg text-left">
              <Clock className="h-5 w-5 text-primary mb-2" />
              <p className="text-2xl font-bold">42h</p>
              <p className="text-sm text-muted-foreground">Total Study Time</p>
            </div>
            <div className="p-4 bg-muted rounded-lg text-left">
              <Target className="h-5 w-5 text-success mb-2" />
              <p className="text-2xl font-bold">85%</p>
              <p className="text-sm text-muted-foreground">Accuracy Rate</p>
            </div>
            <div className="p-4 bg-muted rounded-lg text-left">
              <TrendingUp className="h-5 w-5 text-warning mb-2" />
              <p className="text-2xl font-bold">+15%</p>
              <p className="text-sm text-muted-foreground">Week over Week</p>
            </div>
            <div className="p-4 bg-muted rounded-lg text-left">
              <BarChart3 className="h-5 w-5 text-primary mb-2" />
              <p className="text-2xl font-bold">7</p>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
