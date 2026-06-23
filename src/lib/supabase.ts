import { createBrowserClient } from '@supabase/ssr'

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export type GalleryPhoto = {
  id: string
  name: string
  url: string
  caption?: string
  created_at: string
}

export type DictionaryEntry = {
  id: string
  word: string
  definition: string
  example: string | null
  created_at: string
}
