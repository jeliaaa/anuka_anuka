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

## 5. Create the Lexicon table
In your project dashboard → SQL Editor → New query, run:

```sql
create table dictionary (
  id uuid primary key default gen_random_uuid(),
  word text not null,
  definition text not null,
  example text,
  created_at timestamptz not null default now()
);

alter table dictionary enable row level security;

create policy "Public read" on dictionary
  for select using (true);

create policy "Public insert" on dictionary
  for insert with check (true);

create policy "Public delete" on dictionary
  for delete using (true);
```

Optional — seed it with the starter entries:
```sql
insert into dictionary (word, definition, example) values
  ('our silence', 'the kind of quiet that doesn''t need to be filled — just being near you is enough.', 'we sat together doing nothing and it was everything.'),
  ('good morning, love', 'the first thing that makes any day worth waking up for.', 'three words that reset the whole world.'),
  ('our song', 'any song that starts playing and immediately becomes about us.', 'i can''t listen to it without smiling.');
```

## 6. Create .env.local
Copy `.env.local.example` to `.env.local` and fill in your values:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 7. Run the project
```bash
npm install
npm run dev
```

Open http://localhost:3000 and your site is ready! 💖
