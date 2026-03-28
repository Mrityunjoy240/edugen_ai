import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, BookOpen, MessageSquare, Compass, GraduationCap, ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* LEFT: LOGO */}
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl tracking-tight text-foreground">EduGen AI</span>
          </div>

          {/* CENTER: EMPTY FOR BALANCE (OR LINKS) */}
          <div className="hidden md:flex flex-1 justify-center">
            {/* Optional: Add landing page links here if needed later */}
          </div>

          {/* RIGHT: ACTIONS */}
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="font-medium text-muted-foreground hover:text-primary transition-colors">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 rounded-lg transition-all shadow-md shadow-orange-500/20">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Personalized Learning with
              <span className="text-primary"> AI Guidance</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              EduGen AI helps students upload their notes, get AI-powered explanations,
              and discover career paths that match their skills and interests.
            </p>
            <Link href="/register">
              <Button size="lg" className="text-lg px-8">
                Start Learning Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>1. Upload Your Notes</CardTitle>
                  <CardDescription>
                    Add your study materials - textbooks, class notes, or any educational content
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>2. Chat with AI</CardTitle>
                  <CardDescription>
                    Ask questions and get explanations based on your own uploaded content
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Compass className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>3. Discover Careers</CardTitle>
                  <CardDescription>
                    Take assessments and explore career paths that match your skills
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <GraduationCap className="h-10 w-10 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">NCERT Aligned</h3>
                <p className="text-sm text-muted-foreground">
                  Built for Class 12 Physics, Chemistry & Mathematics
                </p>
              </div>
              <div className="text-center">
                <MessageSquare className="h-10 w-10 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">RAG Chatbot</h3>
                <p className="text-sm text-muted-foreground">
                  AI trained on your notes for personalized help
                </p>
              </div>
              <div className="text-center">
                <Compass className="h-10 w-10 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Career Guidance</h3>
                <p className="text-sm text-muted-foreground">
                  Discover careers based on your interests and skills
                </p>
              </div>
              <div className="text-center">
                <Sparkles className="h-10 w-10 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">100% Free</h3>
                <p className="text-sm text-muted-foreground">
                  Built with free tools - no payment required
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join EduGen AI today and transform your learning experience with AI-powered tools.
            </p>
            <Link href="/register">
              <Button size="lg" className="text-lg px-8">
                Create Free Account
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>EduGen AI - Personalized Learning & Career Guidance Platform</p>
          <p className="mt-2">Built with Next.js, Supabase, and Groq AI</p>
        </div>
      </footer>
    </div>
  )
}
