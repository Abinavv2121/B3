import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { STORAGE_KEYS } from '@/constants'

export interface User {
  id: string
  name: string
  email: string
  isGuest: boolean
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isGuest: boolean
  showAuthModal: boolean
  login: (email: string, password: string) => Promise<boolean>
  signUp: (name: string, email: string, password: string) => Promise<boolean>
  continueAsGuest: () => void
  logout: () => void
  requireAuth: () => boolean
  setShowAuthModal: (show: boolean) => void
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

  // Show modal on page load if user hasn't seen it before
  useEffect(() => {
    if (!hasShownInitialModal && !user) {
      const timer = setTimeout(() => {
        setShowAuthModal(true)
      }, 1000) // Show after 1 second

      return () => clearTimeout(timer)
    }
  }, [hasShownInitialModal, user])

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // For demo purposes, accept any email/password combination
      const newUser: User = {
        id: Date.now().toString(),
        name: email.split('@')[0], // Use email prefix as name
        email,
        isGuest: false
      }
      
      setUser(newUser)
      setShowAuthModal(false)
      setHasShownInitialModal(true)
      return true
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }, [setUser, setHasShownInitialModal])

  const signUp = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // For demo purposes, accept any valid data
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        isGuest: false
      }
      
      setUser(newUser)
      setShowAuthModal(false)
      setHasShownInitialModal(true)
      return true
    } catch (error) {
      console.error('Sign up failed:', error)
      return false
    }
  }, [setUser, setHasShownInitialModal])

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

  const logout = useCallback(() => {
    setUser(null)
    setHasShownInitialModal(false)
    // Clear other user-related data if needed
    localStorage.removeItem(STORAGE_KEYS.CART)
    localStorage.removeItem('b3-favourites')
  }, [setUser, setHasShownInitialModal])

  const requireAuth = useCallback((): boolean => {
    if (!user || user.isGuest) {
      setShowAuthModal(true)
      return false
    }
    return true
  }, [user])

  const isAuthenticated = Boolean(user && !user.isGuest)
  const isGuest = Boolean(user?.isGuest)

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isGuest,
    showAuthModal,
    login,
    signUp,
    continueAsGuest,
    logout,
    requireAuth,
    setShowAuthModal
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
