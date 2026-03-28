import { CourseWorkspace } from "@/components/CourseWorkspace"

interface WorkspacePageProps {
  params: { id: string }
}

export default function WorkspacePage({ params }: WorkspacePageProps) {
  const { id } = params
  
  return (
    <CourseWorkspace courseId={id} />
  )
}
