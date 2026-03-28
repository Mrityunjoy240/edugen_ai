export interface User {
  id: string;
  email: string;
  name: string;
  grade_level: 'k12' | 'college';
  interests: string[];
  skills: string[];
  created_at: string;
}

export interface Note {
  id: string;
  user_id: string;
  title: string;
  content: string;
  subject: string;
  topic: string;
  embedding: number[];
  created_at: string;
}

export interface Career {
  id: string;
  title: string;
  description: string;
  required_skills: string[];
  growth_outlook: string;
  average_salary: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export interface ChatSession {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  messages: ChatMessage[];
}

export interface LearningPath {
  id: string;
  user_id: string;
  title: string;
  description: string;
  modules: LearningModule[];
  progress: number;
  status: 'not_started' | 'in_progress' | 'completed';
  created_at: string;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  resources: Resource[];
  completed: boolean;
}

export interface Resource {
  id: string;
  title: string;
  type: 'video' | 'article' | 'quiz';
  url: string;
}

export interface Assessment {
  id: string;
  user_id: string;
  type: 'career' | 'quiz' | 'aptitude';
  responses: Record<string, any>;
  results: any;
  ai_insights: string;
  created_at: string;
}
