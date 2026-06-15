# 💕 Our Little World

A personal website celebrating your relationship — built with Next.js, Tailwind CSS, and Supabase.

## Features

- **💕 Our Time** — A live countdown from May 22nd, 2025 at 9 PM, showing years, days, hours, minutes & seconds
- **🌸 Gallery** — Upload and view your favourite photos together (powered by Supabase Storage)
- **💌 Dictionary** — A personal dictionary of words, moments, and things only you two understand

## Getting Started

### Prerequisites
- Node.js 18+
- A [Supabase](https://supabase.com) account (free tier is plenty!)

### Installation

```bash
# Install dependencies
npm install

# Copy env file and fill in your Supabase keys
cp .env.local.example .env.local

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 💖

### Supabase Setup
See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for step-by-step instructions.

## Customisation

- **Start date**: Edit `START_DATE` in `src/app/page.tsx`
- **Dictionary starter entries**: Edit `STARTER_ENTRIES` in `src/app/dictionary/page.tsx`
- **Logo**: Replace `/public/favicon.ico` with your own icon
- **Colours**: The pink palette is in `tailwind.config.js` under `colors.blush`

## Deployment

Deploy easily on [Vercel](https://vercel.com):
1. Push to GitHub
2. Import on Vercel
3. Add your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` env vars
4. Deploy! 🎉
