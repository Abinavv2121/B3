import { supabase } from './supabase'
import { User, AuthError, Provider } from '@supabase/supabase-js'

export interface AuthUser {
  id: string
  email: string
  name?: string
  avatar_url?: string
  provider?: string
}

export interface AuthState {
  user: AuthUser | null
  loading: boolean
  error: string | null
}

/**
 * Sign in with Google OAuth
 */
export const signInWithGoogle = async (): Promise<{ user: AuthUser | null; error: AuthError | null }> => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })

    if (error) {
      console.error('Google sign in error:', error)
      return { user: null, error }
    }

    return { user: null, error: null }
  } catch (error) {
    console.error('Unexpected error during Google sign in:', error)
    return { user: null, error: error as AuthError }
  }
}

/**
 * Sign in with email and password
 */
export const signInWithEmail = async (
  email: string, 
  password: string
): Promise<{ user: AuthUser | null; error: AuthError | null }> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('Email sign in error:', error)
      return { user: null, error }
    }

    if (data.user) {
      const authUser: AuthUser = {
        id: data.user.id,
        email: data.user.email || '',
        name: data.user.user_metadata?.full_name || data.user.user_metadata?.name,
        avatar_url: data.user.user_metadata?.avatar_url,
        provider: data.user.app_metadata?.provider,
      }
      return { user: authUser, error: null }
    }

    return { user: null, error: null }
  } catch (error) {
    console.error('Unexpected error during email sign in:', error)
    return { user: null, error: error as AuthError }
  }
}

/**
 * Sign up with email and password
 */
export const signUpWithEmail = async (
  email: string, 
  password: string,
  name?: string
): Promise<{ user: AuthUser | null; error: AuthError | null }> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    })

    if (error) {
      console.error('Email sign up error:', error)
      return { user: null, error }
    }

    if (data.user) {
      const authUser: AuthUser = {
        id: data.user.id,
        email: data.user.email || '',
        name: data.user.user_metadata?.full_name || name,
        avatar_url: data.user.user_metadata?.avatar_url,
        provider: data.user.app_metadata?.provider,
      }
      return { user: authUser, error: null }
    }

    return { user: null, error: null }
  } catch (error) {
    console.error('Unexpected error during email sign up:', error)
    return { user: null, error: error as AuthError }
  }
}

/**
 * Sign out user
 */
export const signOut = async (): Promise<{ error: AuthError | null }> => {
  try {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      console.error('Sign out error:', error)
      return { error }
    }

    return { error: null }
  } catch (error) {
    console.error('Unexpected error during sign out:', error)
    return { error: error as AuthError }
  }
}

/**
 * Get current user
 */
export const getCurrentUser = async (): Promise<{ user: AuthUser | null; error: AuthError | null }> => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error) {
      console.error('Get current user error:', error)
      return { user: null, error }
    }

    if (user) {
      const authUser: AuthUser = {
        id: user.id,
        email: user.email || '',
        name: user.user_metadata?.full_name || user.user_metadata?.name,
        avatar_url: user.user_metadata?.avatar_url,
        provider: user.app_metadata?.provider,
      }
      return { user: authUser, error: null }
    }

    return { user: null, error: null }
  } catch (error) {
    console.error('Unexpected error getting current user:', error)
    return { user: null, error: error as AuthError }
  }
}

/**
 * Reset password
 */
export const resetPassword = async (email: string): Promise<{ error: AuthError | null }> => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    if (error) {
      console.error('Reset password error:', error)
      return { error }
    }

    return { error: null }
  } catch (error) {
    console.error('Unexpected error during password reset:', error)
    return { error: error as AuthError }
  }
}

/**
 * Listen to auth state changes
 */
export const onAuthStateChange = (callback: (user: AuthUser | null) => void) => {
  return supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session?.user) {
      const authUser: AuthUser = {
        id: session.user.id,
        email: session.user.email || '',
        name: session.user.user_metadata?.full_name || session.user.user_metadata?.name,
        avatar_url: session.user.user_metadata?.avatar_url,
        provider: session.user.app_metadata?.provider,
      }
      callback(authUser)
    } else if (event === 'SIGNED_OUT') {
      callback(null)
    }
  })
}
