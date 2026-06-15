# Supabase Setup Guide 💕

## 1. Create a Supabase project
Go to https://supabase.com and create a free account + new project.

## 2. Get your keys
In your project dashboard → Settings → API:
- Copy **Project URL** → paste as `NEXT_PUBLIC_SUPABASE_URL` in `.env.local`
- Copy **anon / public key** → paste as `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`

## 3. Create the Gallery storage bucket
In your project dashboard → Storage → New Bucket:
- Name: `gallery`
- ✅ Make it **public**

## 4. Set storage policy (allow uploads without login)
In Storage → Policies → gallery bucket, add these policies:

**Allow public read:**
```sql
CREATE POLICY "Public read" ON storage.objects
FOR SELECT USING (bucket_id = 'gallery');
```

**Allow authenticated/anon upload:**
```sql
CREATE POLICY "Allow uploads" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'gallery');
```

**Allow delete:**
```sql
CREATE POLICY "Allow delete" ON storage.objects
FOR DELETE USING (bucket_id = 'gallery');
```

## 5. Create .env.local
Copy `.env.local.example` to `.env.local` and fill in your values:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 6. Run the project
```bash
npm install
npm run dev
```

Open http://localhost:3000 and your site is ready! 💖
