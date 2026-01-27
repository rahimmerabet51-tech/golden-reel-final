import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Work {
  id?: string
  title: string
  category: string
  description: string
  file_url: string
  file_type: 'image' | 'video'
  thumbnail_url?: string
  client?: string
  year?: string
  tags?: string[]
  created_at?: string
  updated_at?: string
}