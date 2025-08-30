import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/contexts/AuthContext'
import { Mail, Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react'

interface AuthModalProps {
  trigger?: React.ReactNode
  defaultMode?: 'signin' | 'signup'
  onSuccess?: () => void
}

type AuthMode = 'signin' | 'signup'

const AuthModal: React.FC<AuthModalProps> = ({ 
  trigger, 
  defaultMode = 'signin',
  onSuccess 
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState<AuthMode>(defaultMode)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  })

  const { 
    user, 
    loading, 
    error, 
    signInWithGoogle, 
    signInWithEmail, 
    signUpWithEmail, 
    clearError 
  } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()

    if (mode === 'signin') {
      await signInWithEmail(formData.email, formData.password)
    } else {
      await signUpWithEmail(formData.email, formData.password, formData.name)
    }

    // Close modal on success
    if (!error && user) {
      setIsOpen(false)
      onSuccess?.()
    }
  }

  const handleGoogleSignIn = async () => {
    clearError()
    await signInWithGoogle()
  }

  const handleModeSwitch = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin')
    clearError()
    setFormData({ email: '', password: '', name: '' })
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      clearError()
      setFormData({ email: '', password: '', name: '' })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
          </DialogTitle>
          <DialogDescription className="text-center">
            {mode === 'signin' 
              ? 'Sign in to your account to continue' 
              : 'Create a new account to get started'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Google Sign In Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-colors"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="pl-10"
                    required={mode === 'signup'}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="pl-10 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {mode === 'signin' ? 'Signing In...' : 'Creating Account...'}
                </>
              ) : (
                mode === 'signin' ? 'Sign In' : 'Create Account'
              )}
            </Button>
          </form>

          {/* Mode Switch */}
          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
            </span>
            <Button
              variant="link"
              className="p-0 h-auto font-semibold"
              onClick={handleModeSwitch}
            >
              {mode === 'signin' ? 'Sign Up' : 'Sign In'}
            </Button>
          </div>

          {/* Forgot Password (only for sign in) */}
          {mode === 'signin' && (
            <div className="text-center">
              <Button variant="link" className="text-sm">
                Forgot your password?
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AuthModal