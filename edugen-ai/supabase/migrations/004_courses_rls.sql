-- Add RLS policy for inserting courses
CREATE POLICY "Allow insert for authenticated users" ON public.courses
FOR INSERT TO authenticated
WITH CHECK (true);

-- Add RLS policy for selecting courses
CREATE POLICY "Allow select for authenticated users" ON public.courses
FOR SELECT TO authenticated
USING (true);
