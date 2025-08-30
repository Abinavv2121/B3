import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { AuthUser, AuthState, signInWithGoogle, signInWithEmail, signUpWithEmail, signOut, getCurrentUser, onAuthStateChange, resetPassword, updateProfile } from '@/lib/auth'

interface AuthContextType extends AuthState {
  signInWithGoogle: () => Promise<void>
  signInWithEmail: (email: string, password: string) => Promise<void>
  signUpWithEmail: (email: string, password: string, name?: string) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updateProfile: (updates: { name?: string; avatar_url?: string }) => Promise<void>
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
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  })

  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }))
  }, [])

  const handleGoogleSignIn = useCallback(async () => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }))
    
    const { error } = await signInWithGoogle()
    
    if (error) {
      setAuthState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error.message || 'Failed to sign in with Google' 
      }))
    }
  }, [])

  const handleEmailSignIn = useCallback(async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }))
    
    const { user, error } = await signInWithEmail(email, password)
    
    if (error) {
      setAuthState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error.message || 'Failed to sign in' 
      }))
    } else if (user) {
      setAuthState(prev => ({ 
        ...prev, 
        user, 
        loading: false, 
        error: null 
      }))
    }
  }, [])

  const handleEmailSignUp = useCallback(async (email: string, password: string, name?: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }))
    
    const { user, error } = await signUpWithEmail(email, password, name)
    
    if (error) {
      setAuthState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error.message || 'Failed to sign up' 
      }))
    } else if (user) {
      setAuthState(prev => ({ 
        ...prev, 
        user, 
        loading: false, 
        error: null 
      }))
    }
  }, [])

  const handleSignOut = useCallback(async () => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }))
    
    const { error } = await signOut()
    
    if (error) {
      setAuthState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error.message || 'Failed to sign out' 
      }))
    } else {
      setAuthState(prev => ({ 
        ...prev, 
        user: null, 
        loading: false, 
        error: null 
      }))
    }
  }, [])

  const handleResetPassword = useCallback(async (email: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }))
    
    const { error } = await resetPassword(email)
    
    if (error) {
      setAuthState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error.message || 'Failed to send reset email' 
      }))
    } else {
      setAuthState(prev => ({ 
        ...prev, 
        loading: false, 
        error: null 
      }))
    }
  }, [])

  const handleUpdateProfile = useCallback(async (updates: { name?: string; avatar_url?: string }) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }))
    
    const { user, error } = await updateProfile(updates)
    
    if (error) {
      setAuthState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error.message || 'Failed to update profile' 
      }))
    } else if (user) {
      setAuthState(prev => ({ 
        ...prev, 
        user, 
        loading: false, 
        error: null 
      }))
    }
  }, [])

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { user, error } = await getCurrentUser()
        
        if (error) {
          console.error('Error getting current user:', error)
        }
        
        setAuthState(prev => ({ 
          ...prev, 
          user, 
          loading: false 
        }))
      } catch (error) {
        console.error('Unexpected error during auth initialization:', error)
        setAuthState(prev => ({ 
          ...prev, 
          loading: false 
        }))
      }
    }

    initializeAuth()
  }, [])

  // Listen to auth state changes
  useEffect(() => {
    const { data: { subscription } } = onAuthStateChange((user) => {
      setAuthState(prev => ({ 
        ...prev, 
        user, 
        loading: false 
      }))
    })

    return () => subscription.unsubscribe()
  }, [])

  const value: AuthContextType = {
    ...authState,
    signInWithGoogle: handleGoogleSignIn,
    signInWithEmail: handleEmailSignIn,
    signUpWithEmail: handleEmailSignUp,
    signOut: handleSignOut,
    resetPassword: handleResetPassword,
    updateProfile: handleUpdateProfile,
    clearError,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}