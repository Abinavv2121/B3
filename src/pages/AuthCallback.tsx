import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Loader2 } from 'lucide-react'

const AuthCallback = () => {
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          if (import.meta.env.DEV) console.error('Auth callback error:', error)
          setError(error.message)
          setTimeout(() => navigate('/'), 3000)
          return
        }

        if (data.session) {
          // Successfully authenticated
          if (import.meta.env.DEV) console.log('Authentication successful')
          navigate('/')
        } else {
          // No session found
          setError('Authentication failed. Please try again.')
          setTimeout(() => navigate('/'), 3000)
        }
      } catch (err) {
        if (import.meta.env.DEV) console.error('Unexpected error during auth callback:', err)
        setError('An unexpected error occurred. Please try again.')
        setTimeout(() => navigate('/'), 3000)
      }
    }

    handleAuthCallback()
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="text-center">
        {error ? (
          <div className="space-y-4">
            <div className="text-red-400 text-xl font-semibold">
              Authentication Error
            </div>
            <p className="text-gray-300 max-w-md">
              {error}
            </p>
            <p className="text-gray-400 text-sm">
              Redirecting to home page...
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
            <div className="text-white text-xl font-semibold">
              Completing Authentication
            </div>
            <p className="text-gray-300">
              Please wait while we complete your sign in...
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AuthCallback
