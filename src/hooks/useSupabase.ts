import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export const useSupabase = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Check if we have valid Supabase credentials
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
        
        const hasValidCredentials = supabaseUrl && supabaseAnonKey && 
          supabaseUrl !== 'your_supabase_project_url' && 
          supabaseAnonKey !== 'your_supabase_anon_key' &&
          supabaseUrl.startsWith('https://') &&
          supabaseAnonKey.length > 10
        
        if (!hasValidCredentials) {
          setError('Supabase not configured - using mock client')
          setIsConnected(false)
          return
        }
        
        const { data, error } = await supabase.from('products').select('count').limit(1)
        
        if (error) {
          setError(error.message)
          setIsConnected(false)
        } else {
          setIsConnected(true)
          setError(null)
        }
      } catch (err) {
        setError('Failed to connect to Supabase')
        setIsConnected(false)
      }
    }

    testConnection()
  }, [])

  return { isConnected, error }
}

// Utility functions for database operations
export const supabaseUtils = {
  // Get all products
  async getProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    
    return { data, error }
  },

  // Get products by category
  async getProductsByCategory(category: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false })
    
    return { data, error }
  },

  // Get all categories
  async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true })
    
    return { data, error }
  },

  // Get featured products
  async getFeaturedProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .or('is_new.eq.true,is_best_seller.eq.true')
      .order('created_at', { ascending: false })
      .limit(8)
    
    return { data, error }
  },

  // Admin functions for product management
  async addProduct(product: any) {
    const { data, error } = await supabase
      .from('products')
      .insert([{
        ...product,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
    
    return { data, error }
  },

  async updateProduct(id: string, updates: any) {
    const { data, error } = await supabase
      .from('products')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
    
    return { data, error }
  },

  async deleteProduct(id: string) {
    const { data, error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
    
    return { data, error }
  }
} 