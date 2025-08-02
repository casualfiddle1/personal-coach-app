import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rbekmvjwjfynqlcivfoz.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJiZWttdmp3amZ5bnFsY2l2Zm96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxMjQ5MDQsImV4cCI6MjA2OTcwMDkwNH0.8GC1E9Sko92kXTCan22kerqTh1i6PHPU8YbsQgkszuU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      journal_entries: {
        Row: {
          id: string
          user_id: string
          content: string
          mood: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          content: string
          mood?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          content?: string
          mood?: string | null
          created_at?: string
        }
      }
      relationships: {
        Row: {
          id: string
          user_id: string
          name: string
          type: string | null
          status: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          type?: string | null
          status?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          type?: string | null
          status?: string | null
          created_at?: string
        }
      }
    }
  }
} 