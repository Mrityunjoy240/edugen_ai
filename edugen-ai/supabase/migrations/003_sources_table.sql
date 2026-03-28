-- Create sources table for tracking uploaded files
CREATE TABLE IF NOT EXISTS public.sources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES public.courses(id) ON DELETE SET NULL,
  file_name TEXT NOT NULL,
  file_path TEXT,
  file_type TEXT,
  title TEXT,
  total_chunks INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.sources ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own sources
CREATE POLICY "Users can manage own sources" ON public.sources FOR ALL USING (auth.uid() = user_id);

-- Add source_id column to notes table
ALTER TABLE public.notes ADD COLUMN IF NOT EXISTS source_id UUID REFERENCES public.sources(id) ON DELETE SET NULL;
ALTER TABLE public.notes ADD COLUMN IF NOT EXISTS chunk_index INTEGER DEFAULT 0;
