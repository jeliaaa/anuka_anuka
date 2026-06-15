import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
  example?: string
  emoji?: string
  created_at: string
}
