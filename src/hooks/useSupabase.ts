import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { PERFORMANCE_CONFIG } from '@/constants'

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
  // Common product fields to minimize payload
  PRODUCT_FIELDS: 'id,name,category,price,original_price,description,image_url,rating,reviews,is_new,is_best_seller,colors,sizes,primary_color,additional_images,product_code,barcode_no,design,status,section,created_at',

  // Simple localStorage cache helpers with TTL
  getFromCache<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(key)
      if (!raw) return null
      const parsed = JSON.parse(raw)
      if (!parsed || typeof parsed !== 'object') return null
      const { value, expiresAt } = parsed as { value: T; expiresAt: number }
      if (Date.now() > expiresAt) {
        localStorage.removeItem(key)
        return null
      }
      return value
    } catch {
      return null
    }
  },

  setCache<T>(key: string, value: T, ttlMs: number = PERFORMANCE_CONFIG.CACHE.PRODUCTS) {
    try {
      const payload = JSON.stringify({ value, expiresAt: Date.now() + ttlMs })
      localStorage.setItem(key, payload)
    } catch {
      // Ignore storage quota errors
    }
  },

  // Lightweight product fetch for faster lists (only fields needed for grids/cards)
  async getProductsLight({ force = false, limit }: { force?: boolean; limit?: number } = {}) {
    const cacheKey = `cache:products_light:${limit ?? 'all'}`
    if (!force) {
      const cached = this.getFromCache<any[]>(cacheKey)
      if (cached) return { data: cached, error: null as any }
    }

    const LIGHT_FIELDS = 'id,name,category,price,original_price,image_url,rating,reviews,is_new,is_best_seller,additional_images,created_at'

    try {
      let query = supabase
        .from('products')
        .select(LIGHT_FIELDS)
        .order('created_at', { ascending: false })
      if (limit && Number.isFinite(limit)) {
        query = (query as any).limit(limit)
      }
      const { data, error } = await query
      if (error) throw error
      if (data) this.setCache(cacheKey, data)
      return { data, error: null as any }
    } catch (err) {
      // Fallback to full select if some columns are missing in DB
      try {
        let query = supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false })
        if (limit && Number.isFinite(limit)) {
          query = (query as any).limit(limit)
        }
        const { data: allData, error: allError } = await query
        if (!allError && allData) this.setCache(cacheKey, allData)
        return { data: allData, error: allError as any }
      } catch (finalErr) {
        return { data: null as any, error: finalErr as any }
      }
    }
  },

  // Get all products
  async getProducts({ force = false, limit }: { force?: boolean; limit?: number } = {}) {
    const cacheKey = `cache:products:${limit ?? 'all'}`
    if (!force) {
      const cached = this.getFromCache<any[]>(cacheKey)
      if (cached) return { data: cached, error: null as any }
    }
    let query = supabase
      .from('products')
      .select(this.PRODUCT_FIELDS)
      .order('created_at', { ascending: false })
    if (limit && Number.isFinite(limit)) {
      query = (query as any).limit(limit)
    }
    const { data, error } = await query
    if (!error && data) this.setCache(cacheKey, data)
    return { data, error }
  },

  // Get products by category
  async getProductsByCategory(category: string, { force = false, limit }: { force?: boolean; limit?: number } = {}) {
    const cacheKey = `cache:category:${category}:${limit ?? 'all'}`
    if (!force) {
      const cached = this.getFromCache<any[]>(cacheKey)
      if (cached) return { data: cached, error: null as any }
    }
    let query = supabase
      .from('products')
      .select(this.PRODUCT_FIELDS)
      .eq('category', category)
      .order('created_at', { ascending: false })
    if (limit && Number.isFinite(limit)) {
      query = (query as any).limit(limit)
    }
    const { data, error } = await query
    if (!error && data) this.setCache(cacheKey, data)
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
  async getFeaturedProducts({ force = false } = {}) {
    const cacheKey = 'cache:featured'
    if (!force) {
      const cached = this.getFromCache<any[]>(cacheKey)
      if (cached) return { data: cached, error: null as any }
    }
    const { data, error } = await supabase
      .from('products')
      .select(this.PRODUCT_FIELDS)
      .or('is_new.eq.true,is_best_seller.eq.true')
      .order('created_at', { ascending: false })
      .limit(8)
    if (!error && data) this.setCache(cacheKey, data)
    return { data, error }
  },

  // Get products by section
  async getProductsBySection(section: string, { force = false, limit }: { force?: boolean; limit?: number } = {}) {
    const cacheKey = `cache:section:${section}:${limit ?? 'all'}`
    if (!force) {
      const cached = this.getFromCache<any[]>(cacheKey)
      if (cached) return { data: cached, error: null as any }
    }
    let query = supabase
      .from('products')
      .select(this.PRODUCT_FIELDS)
      .eq('section', section)
      .order('created_at', { ascending: false })
    if (limit && Number.isFinite(limit)) {
      query = (query as any).limit(limit)
    }
    const { data, error } = await query
    if (!error && data) this.setCache(cacheKey, data)
    return { data, error }
  },

  // Get customer favourites (best sellers)
  async getCustomerFavourites({ force = false } = {}) {
    const cacheKey = 'cache:favourites'
    if (!force) {
      const cached = this.getFromCache<any[]>(cacheKey)
      if (cached) return { data: cached, error: null as any }
    }
    const { data, error } = await supabase
      .from('products')
      .select(this.PRODUCT_FIELDS)
      .eq('section', 'customer_favourites')
      .order('created_at', { ascending: false })
      .limit(6)
    if (!error && data) this.setCache(cacheKey, data)
    return { data, error }
  },

  // Get a single product by ID
  async getProduct(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select(this.PRODUCT_FIELDS)
      .eq('id', id)
      .single()
    
    return { data: data ? [data] : null, error }
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