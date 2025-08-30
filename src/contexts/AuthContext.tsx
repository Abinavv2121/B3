import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { STORAGE_KEYS } from '@/constants'
import { AuthUser, AuthState, signInWithGoogle, signInWithEmail, signUpWithEmail, signOut, getCurrentUser, onAuthStateChange } from '@/lib/auth'

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
  login: (email: string, password: string) => Promise<boolean>
  signUp: (name: string, email: string, password: string) => Promise<boolean>
  loginWithGoogle: () => Promise<void>
  continueAsGuest: () => void
  logout: () => void
  requireAuth: () => boolean
  setShowAuthModal: (show: boolean) => void
  clearError: () => void
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
  const [user, setUser] = useLocalStorage<User | null>(STORAGE_KEYS.USER, null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [hasShownInitialModal, setHasShownInitialModal] = useLocalStorage<boolean>('hasShownInitialModal', false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const clearError = useCallback(() => {
    setError(null)
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

  const loginWithGoogle = useCallback(async (): Promise<void> => {
    try {
      setLoading(true)
      setError(null)
      
      const { error: authError } = await signInWithGoogle()
      
      if (authError) {
        setError(authError.message || 'Failed to sign in with Google')
      }
      // Note: The actual user will be set via the auth state change listener
      // when the user returns from the OAuth flow
    } catch (error) {
      console.error('Google login failed:', error)
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }, [])

  const continueAsGuest = useCallback(() => {
    const guestUser: User = {
      id: 'guest-' + Date.now(),
      name: 'Guest User',
      email: '',
      isGuest: true
    }
    
    setUser(guestUser)
    setShowAuthModal(false)
    setHasShownInitialModal(true)
  }, [setUser, setHasShownInitialModal])

  const logout = useCallback(async () => {
    try {
      setLoading(true)
      await signOut()
      setUser(null)
      setHasShownInitialModal(false)
      // Clear other user-related data if needed
      localStorage.removeItem(STORAGE_KEYS.CART)
      localStorage.removeItem('b3-favourites')
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setLoading(false)
    }
  }, [setUser, setHasShownInitialModal])

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
      } else {
        // Only clear user if they're not a guest
        if (user && !user.isGuest) {
          setUser(null)
        }
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [setUser, setHasShownInitialModal, user])

  const isAuthenticated = Boolean(user && !user.isGuest)
  const isGuest = Boolean(user?.isGuest)

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isGuest,
    showAuthModal,
    loading,
    error,
    login,
    signUp,
    loginWithGoogle,
    continueAsGuest,
    logout,
    requireAuth,
    setShowAuthModal,
    clearError
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
