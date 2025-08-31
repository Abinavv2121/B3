import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { STORAGE_KEYS } from '@/constants'
import { AuthUser, AuthState, signInWithGoogle, signInWithEmail, signUpWithEmail, signOut, getCurrentUser, onAuthStateChange, changePassword } from '@/lib/auth'
import { getTranslation, type Language, type TranslationKey } from '@/lib/translations'
import { fetchExchangeRates, defaultExchangeRates, type ExchangeRates, type Currency, getConvertedPrice } from '@/lib/currency'

export interface User {
  id: string
  name: string
  email: string
  isGuest: boolean
  avatar_url?: string
  provider?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isGuest: boolean
  showAuthModal: boolean
  loading: boolean
  error: string | null
  settings: {
    theme: string
    language: string
    currency: string
    emailNotifications: boolean
    pushNotifications: boolean
    orderUpdates: boolean
    promotionalEmails: boolean
    profileVisibility: string
    showEmail: boolean
    twoFactorAuth: boolean
    loginAlerts: boolean
  }
  exchangeRates: ExchangeRates
  convertCurrency: (amount: number, fromCurrency?: string) => string
  t: (key: string) => string
  login: (email: string, password: string) => Promise<boolean>
  signUp: (name: string, email: string, password: string) => Promise<boolean>
  loginWithGoogle: () => Promise<void>
  continueAsGuest: () => void
  logout: () => void
  updateProfile: (updates: Partial<User>) => Promise<boolean>
  updateSettings: (updates: Partial<AuthContextType['settings']>) => void
  requireAuth: () => boolean
  setShowAuthModal: (show: boolean) => void
  clearError: () => void
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useLocalStorage<User | null>(STORAGE_KEYS.AUTH_USER, null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [hasShownInitialModal, setHasShownInitialModal] = useLocalStorage<boolean>('hasShownInitialModal', false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>(defaultExchangeRates)
  const [settings, setSettings] = useLocalStorage<any>(
    user ? `b3-settings_${user.id}` : 'b3-settings',
    {
      theme: 'light',
      language: 'en',
      currency: 'INR',
      emailNotifications: true,
      pushNotifications: false,
      orderUpdates: true,
      promotionalEmails: false,
      profileVisibility: 'public',
      showEmail: false,
      twoFactorAuth: false,
      loginAlerts: true
    }
  )

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const updateSettings = useCallback((updates: Partial<AuthContextType['settings']>) => {
    setSettings(prev => ({ ...prev, ...updates }))
  }, [setSettings])

  // Translation function
  const t = useCallback((key: string): string => {
    return getTranslation(key as TranslationKey, settings.language as Language)
  }, [settings.language])

  // Currency conversion function
  const convertCurrency = useCallback((amount: number, fromCurrency: string = 'INR'): string => {
    return getConvertedPrice(amount, fromCurrency as Currency, settings.currency as Currency, exchangeRates)
  }, [settings.currency, exchangeRates])

  // Apply theme to document
  useEffect(() => {
    if (settings.theme) {
      document.documentElement.setAttribute('data-theme', settings.theme)
      if (settings.theme === 'dark') {
        document.documentElement.classList.add('dark')
        document.body.classList.add('dark')
        document.body.style.backgroundColor = '#1a1a1a'
        document.body.style.color = '#ffffff'
      } else {
        document.documentElement.classList.remove('dark')
        document.body.classList.remove('dark')
        document.body.style.backgroundColor = ''
        document.body.style.color = ''
      }
    }
  }, [settings.theme])

  // Apply language to document
  useEffect(() => {
    if (settings.language) {
      document.documentElement.setAttribute('lang', settings.language)
    }
  }, [settings.language])

  // Fetch exchange rates on mount
  useEffect(() => {
    const loadExchangeRates = async () => {
      try {
        const rates = await fetchExchangeRates()
        setExchangeRates(rates)
      } catch (error) {
        console.warn('Failed to load exchange rates:', error)
      }
    }
    
    loadExchangeRates()
  }, [])

  // Show modal on page load if user hasn't seen it before
  useEffect(() => {
    if (!hasShownInitialModal && !user && !loading) {
      const timer = setTimeout(() => {
        setShowAuthModal(true)
      }, 1000) // Show after 1 second

      return () => clearTimeout(timer)
    }
  }, [hasShownInitialModal, user, loading])

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)
      
      const { user: authUser, error: authError } = await signInWithEmail(email, password)
      
      if (authError) {
        setError(authError.message || 'Failed to sign in')
        return false
      }
      
      if (authUser) {
        const newUser: User = {
          id: authUser.id,
          name: authUser.name || authUser.email.split('@')[0],
          email: authUser.email,
          avatar_url: authUser.avatar_url,
          provider: authUser.provider,
          isGuest: false
        }
        
        setUser(newUser)
        setShowAuthModal(false)
        setHasShownInitialModal(true)
        return true
      }
      
      return false
    } catch (error) {
      console.error('Login failed:', error)
      setError('An unexpected error occurred')
      return false
    } finally {
      setLoading(false)
    }
  }, [setUser, setHasShownInitialModal])

  const signUp = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)
      
      const { user: authUser, error: authError } = await signUpWithEmail(email, password, name)
      
      if (authError) {
        setError(authError.message || 'Failed to sign up')
        return false
      }
      
      if (authUser) {
        const newUser: User = {
          id: authUser.id,
          name: authUser.name || name,
          email: authUser.email,
          avatar_url: authUser.avatar_url,
          provider: authUser.provider,
          isGuest: false
        }
        
        setUser(newUser)
        setShowAuthModal(false)
        setHasShownInitialModal(true)
        return true
      }
      
      return false
    } catch (error) {
      console.error('Sign up failed:', error)
      setError('An unexpected error occurred')
      return false
    } finally {
      setLoading(false)
    }
  }, [setUser, setHasShownInitialModal])

  const loginWithGoogle = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { error: authError } = await signInWithGoogle()
      
      if (authError) {
        setError(authError.message || 'Failed to sign in with Google')
      }
    } catch (error) {
      console.error('Google login failed:', error)
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }, [])

  const continueAsGuest = useCallback(() => {
    const guestUser: User = {
      id: `guest_${Date.now()}`,
      name: 'Guest User',
      email: 'guest@example.com',
      isGuest: true
    }
    
    setUser(guestUser)
    setHasShownInitialModal(true)
  }, [setUser, setHasShownInitialModal])

  const logout = useCallback(async () => {
    try {
      setLoading(true)
      await signOut()
      setUser(null)
      setHasShownInitialModal(false)
      
      // Clear general (guest) data only. Keep user-specific data so it persists across sessions.
      localStorage.removeItem(STORAGE_KEYS.CART)
      localStorage.removeItem('b3-favourites')
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setLoading(false)
    }
  }, [setUser, setHasShownInitialModal])

  const updateProfile = useCallback(async (updates: Partial<User>): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)
      
      if (!user) {
        setError('No user to update')
        return false
      }
      
      // Here you would typically update the user profile in your backend
      // For now, we'll just update the local state
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      
      return true
    } catch (error) {
      console.error('Profile update failed:', error)
      setError('Failed to update profile')
      return false
    } finally {
      setLoading(false)
    }
  }, [user, setUser])

  // Migrate guest cart/wishlist to the signed-in user's storage keys
  const hasMigratedRef = useRef(false)
  const migrateLocalDataToUser = useCallback((newUser: User) => {
    try {
      const userId = newUser.id
      // Cart
      const guestCartKey = STORAGE_KEYS.CART
      const userCartKey = `${STORAGE_KEYS.CART}_${userId}`
      const guestCartRaw = localStorage.getItem(guestCartKey)
      const userCartRaw = localStorage.getItem(userCartKey)
      const guestCart = guestCartRaw ? JSON.parse(guestCartRaw) : []
      const userCart = userCartRaw ? JSON.parse(userCartRaw) : []

      if (guestCart.length > 0) {
        const seen = new Set(userCart.map((i: any) => `${i.id}|${i.selectedSize || ''}|${i.selectedColor || ''}`))
        for (const item of guestCart) {
          const key = `${item.id}|${item.selectedSize || ''}|${item.selectedColor || ''}`
          if (!seen.has(key)) {
            userCart.push(item)
            seen.add(key)
          }
        }
        localStorage.setItem(userCartKey, JSON.stringify(userCart))
        localStorage.removeItem(guestCartKey)
      }

      // Favourites
      const guestFavKey = 'b3-favourites'
      const userFavKey = `b3-favourites_${userId}`
      const guestFavRaw = localStorage.getItem(guestFavKey)
      const userFavRaw = localStorage.getItem(userFavKey)
      const guestFav = guestFavRaw ? JSON.parse(guestFavRaw) : []
      const userFav = userFavRaw ? JSON.parse(userFavRaw) : []

      if (guestFav.length > 0) {
        const favIds = new Set(userFav.map((i: any) => i.id))
        for (const item of guestFav) {
          if (!favIds.has(item.id)) {
            userFav.push(item)
            favIds.add(item.id)
          }
        }
        localStorage.setItem(userFavKey, JSON.stringify(userFav))
        localStorage.removeItem(guestFavKey)
      }
    } catch (e) {
      console.error('Failed migrating local data to user keys:', e)
    }
  }, [])

  const requireAuth = useCallback((): boolean => {
    if (!user || user.isGuest) {
      setShowAuthModal(true)
      return false
    }
    return true
  }, [user])

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { user: authUser, error } = await getCurrentUser()
        
        if (error) {
          console.error('Error getting current user:', error)
        }
        
        if (authUser) {
          const newUser: User = {
            id: authUser.id,
            name: authUser.name || authUser.email.split('@')[0],
            email: authUser.email,
            avatar_url: authUser.avatar_url,
            provider: authUser.provider,
            isGuest: false
          }
          setUser(newUser)
          setHasShownInitialModal(true)
        }
      } catch (error) {
        console.error('Unexpected error during auth initialization:', error)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [setUser, setHasShownInitialModal])

  // Listen to auth state changes
  useEffect(() => {
    const { data: { subscription } } = onAuthStateChange((authUser) => {
      if (authUser) {
        const newUser: User = {
          id: authUser.id,
          name: authUser.name || authUser.email.split('@')[0],
          email: authUser.email,
          avatar_url: authUser.avatar_url,
          provider: authUser.provider,
          isGuest: false
        }
        setUser(newUser)
        setShowAuthModal(false)
        setHasShownInitialModal(true)
        if (!hasMigratedRef.current) {
          migrateLocalDataToUser(newUser)
          hasMigratedRef.current = true
        }
      } else {
        // Only clear user if they're not a guest
        if (user && !user.isGuest) {
          setUser(null)
        }
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [setUser, setHasShownInitialModal, user, migrateLocalDataToUser])

  const isAuthenticated = Boolean(user && !user.isGuest)
  const isGuest = Boolean(user?.isGuest)

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isGuest,
    showAuthModal,
    loading,
    error,
    settings,
    exchangeRates,
    convertCurrency,
    t,
    login,
    signUp,
    loginWithGoogle,
    continueAsGuest,
    logout,
    updateProfile,
    updateSettings,
    requireAuth,
    setShowAuthModal,
    clearError,
    changePassword: async (currentPassword: string, newPassword: string) => {
      const { success, error } = await changePassword(currentPassword, newPassword)
      if (error) setError(error.message)
      return success
    }
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
