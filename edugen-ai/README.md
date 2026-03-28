# EduGen AI - Setup Guide

## Prerequisites

1. **Node.js 18+** - [Download here](https://nodejs.org/)
2. **Supabase Account** - [Sign up free](https://supabase.com)
3. **Groq API Key** - [Get free key](https://console.groq.com)

---

## Step 1: Supabase Setup

### 1.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in the details:
   - **Name**: `edugen-ai` (or your choice)
   - **Database Password**: (copy this, you'll need it)
   - **Region**: Choose closest to you

4. Click "Create new project" and wait for setup (~2 minutes)

### 1.2 Enable pgvector Extension

1. In your Supabase project, go to **SQL Editor**
2. Run this command to enable vector support:
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   ```

### 1.3 Run Database Migrations

1. In **SQL Editor**, create a new query
2. Copy and paste the contents of `supabase/migrations/001_initial_schema.sql`
3. Click **Run** to execute

### 1.4 Seed Career Data

1. Create another query in **SQL Editor**
2. Copy and paste `supabase/seed/002_careers.sql`
3. Click **Run**

### 1.5 Seed NCERT Content (Optional but Recommended)

1. Create queries for:
   - `supabase/seed/003_ncert_physics.sql`
   - `supabase/seed/004_ncert_chemistry.sql`
   - `supabase/seed/005_ncert_mathematics.sql`

### 1.6 Get Your Supabase Credentials

1. Go to **Settings** → **API**
2. Copy these values:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` → `SUPABASE_SERVICE_ROLE_KEY`

### 1.7 Create Test User

1. Go to **Authentication** → **Users**
2. Click **Add user**
3. Fill in:
   - **Email**: `student@test.com`
   - **Password**: `test123456`
   - **User Metadata**: `{"full_name": "Test Student", "grade_level": "college"}`

Or run this SQL:
```sql
INSERT INTO auth.users (email, encrypted_password, raw_user_meta_data)
VALUES (
  'student@test.com',
  crypt('test123456', gen_random_bytes(4)),
  '{"full_name": "Test Student", "grade_level": "college"}'
);
```

---

## Step 2: Groq API Setup

### 2.1 Get Your API Key

1. Go to [console.groq.com](https://console.groq.com)
2. Sign up or log in
3. Go to **API Keys**
4. Click **Create API Key**
5. Copy the key

---

## Step 3: Project Setup

### 3.1 Install Dependencies

```bash
cd edugen-ai
npm install
```

### 3.2 Create Environment File

Create a file named `.env.local` in the project root:

```env
# Supabase (from Step 1.6)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Groq API (from Step 2.1)
GROQ_API_KEY=gsk_your-groq-key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3.3 Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Step 4: Test the Application

### Test Accounts

| Email | Password |
|-------|----------|
| student@test.com | test123456 |

### Test Flow

1. **Sign Up**: Create a new account or use the test account
2. **Upload Notes**: Go to Upload page and add a note
3. **Chat with AI**: Go to Chat and ask questions
4. **Explore Careers**: Browse careers or take the assessment

---

## Deployment (Optional)

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy!

### Update Supabase Auth Settings

For production, update your Supabase site URL:
1. Go to **Authentication** → **URL Configuration**
2. Add your production URL (e.g., `https://your-app.vercel.app`)

---

## Troubleshooting

### Common Issues

**"Vector embeddings not working"**
- Ensure pgvector extension is enabled
- Check that your Supabase project has vector support (Pro plan not required)

**"Groq API errors"**
- Verify your API key is correct
- Check Groq dashboard for rate limits

**"Login not working"**
- Ensure your Supabase URL and keys are correct
- Check browser console for errors

### Getting Help

If you encounter issues:
1. Check the browser console for errors
2. Verify all environment variables are set
3. Check Supabase logs in the dashboard

---

## Project Structure

```
edugen-ai/
├── src/
│   ├── app/
│   │   ├── (auth)/          # Login & Register
│   │   ├── (dashboard)/     # Protected pages
│   │   └── api/             # API routes
│   ├── components/          # UI components
│   └── lib/                 # Utilities
├── supabase/
│   ├── migrations/          # DB schema
│   └── seed/                # Initial data
└── .env.local               # Environment variables
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS |
| Backend | Next.js API Routes |
| Database | Supabase (PostgreSQL + pgvector) |
| AI | Groq API (Llama 3) |
| Auth | Supabase Auth |
| Deployment | Vercel (optional) |

---

## License

MIT - Use freely for personal and commercial projects.
