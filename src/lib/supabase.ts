import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if we have valid Supabase credentials
const hasValidCredentials = supabaseUrl && supabaseAnonKey && 
  supabaseUrl !== 'your_supabase_project_url' && 
  supabaseAnonKey !== 'your_supabase_anon_key' &&
  supabaseUrl.startsWith('https://') &&
  supabaseAnonKey.length > 10

// Create a mock client if credentials are not valid
let supabase: any

if (hasValidCredentials) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
} else {
  console.warn('Missing or invalid Supabase environment variables - using mock client')
  // Create a mock client that doesn't throw errors
  supabase = {
    from: () => ({
      select: () => Promise.resolve({ data: null, error: null }),
      insert: () => Promise.resolve({ data: null, error: null }),
      update: () => Promise.resolve({ data: null, error: null }),
      delete: () => Promise.resolve({ data: null, error: null })
    })
  }
}

// Database types (you can generate these from Supabase CLI)
export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          category: string
          price: number
          original_price: number
          description: string
          image_url: string
          rating: number
          reviews: number
          is_new: boolean
          is_best_seller: boolean
          colors: string[]
          sizes: string[]
          product_code: string | null
          barcode_no: string | null
          design: string | null
          status: string
          section: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          category: string
          price: number
          original_price?: number
          description: string
          image_url: string
          rating?: number
          reviews?: number
          is_new?: boolean
          is_best_seller?: boolean
          colors?: string[]
          sizes?: string[]
          product_code?: string
          barcode_no?: string
          design?: string
          status?: string
          section?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string
          price?: number
          original_price?: number
          description?: string
          image_url?: string
          rating?: number
          reviews?: number
          is_new?: boolean
          is_best_seller?: boolean
          colors?: string[]
          sizes?: string[]
          product_code?: string
          barcode_no?: string
          design?: string
          status?: string
          section?: string
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string
          image_url: string
          price_range: string
          product_count: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description: string
          image_url: string
          price_range: string
          product_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string
          image_url?: string
          price_range?: string
          product_count?: number
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          status: string
          total_amount: number
          items: Record<string, unknown>
          shipping_address: Record<string, unknown>
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          status?: string
          total_amount: number
          items: Record<string, unknown>
          shipping_address: Record<string, unknown>
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          status?: string
          total_amount?: number
          items?: Record<string, unknown>
          shipping_address?: Record<string, unknown>
          created_at?: string
        }
      }
    }
  }
}

// Export the supabase client
export { supabase }

// Typed Supabase client (only if we have valid credentials)
export const typedSupabase = hasValidCredentials ? createClient<Database>(supabaseUrl, supabaseAnonKey) : supabase 