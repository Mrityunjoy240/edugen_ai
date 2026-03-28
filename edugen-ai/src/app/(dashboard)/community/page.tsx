"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, MessageSquare, UserPlus, TrendingUp } from "lucide-react"

export default function CommunityPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Community</h1>
        </div>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Join Community
        </Button>
      </div>

      {/* Coming Soon */}
      <Card>
        <CardContent className="py-16 text-center">
          <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground/40" />
          <h3 className="text-xl font-semibold mb-2">Community Features Coming Soon!</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Connect with fellow learners, share knowledge, and collaborate on projects.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="p-6 bg-muted rounded-lg">
              <MessageSquare className="h-8 w-8 text-primary mx-auto mb-3" />
              <h4 className="font-semibold mb-1">Discussion Forums</h4>
              <p className="text-sm text-muted-foreground">
                Ask questions and help others
              </p>
            </div>
            <div className="p-6 bg-muted rounded-lg">
              <Users className="h-8 w-8 text-primary mx-auto mb-3" />
              <h4 className="font-semibold mb-1">Study Groups</h4>
              <p className="text-sm text-muted-foreground">
                Learn together with peers
              </p>
            </div>
            <div className="p-6 bg-muted rounded-lg">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
              <h4 className="font-semibold mb-1">Leaderboard</h4>
              <p className="text-sm text-muted-foreground">
                Compete and climb ranks
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
