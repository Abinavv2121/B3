import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder_key'

// Check if we're using placeholder values
const isUsingPlaceholders = supabaseUrl === 'https://placeholder.supabase.co' || supabaseAnonKey === 'placeholder_key'

// Don't throw error for missing env vars in development
if (isUsingPlaceholders) {
  console.warn('Missing Supabase environment variables - using placeholder values')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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

// Typed Supabase client
export const typedSupabase = createClient<Database>(supabaseUrl, supabaseAnonKey) 