import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Map, CheckCircle2, ArrowRight, Wrench } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default async function CareerPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: careers } = await supabase
    .from("careers")
    .select("*")
    .order("title")

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Map className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Career Guidance</h1>
      </div>

      {/* Career Cards */}
      <div className="grid gap-6">
        {careers?.map((career, index) => (
          <Card key={career.id} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <Badge variant="outline" className="mb-2">
                    Career Path {index + 1}
                  </Badge>
                  <CardTitle className="text-xl">{career.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {career.description}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">
                    {Math.round(95 - index * 7)}%
                  </div>
                  <p className="text-xs text-muted-foreground">Match</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-6">
              {/* Required Skills */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  Required Skills
                </h4>
                <ul className="space-y-2">
                  {career.required_skills?.slice(0, 5).map((skill: string) => (
                    <li key={skill} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Learning Path */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-primary" />
                  Learning Path
                </h4>
                <ol className="space-y-2">
                  {["Foundation", "Intermediate", "Advanced", "Projects"].map((step, i) => (
                    <li key={step} className="flex items-center gap-2 text-sm">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Tools & Salary */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-warning" />
                  Tools & Salary
                </h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {career.required_skills?.slice(0, 3).map((tool: string) => (
                    <Badge key={tool} variant="secondary" className="text-xs">
                      {tool}
                    </Badge>
                  ))}
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium">Avg. Salary</p>
                  <p className="text-lg font-bold text-primary">{career.average_salary_range}</p>
                </div>
              </div>
            </CardContent>
            <div className="px-6 pb-6">
              <Button className="w-full md:w-auto gap-2">
                Create Learning Path
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
