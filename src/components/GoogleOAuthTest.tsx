import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useAuth } from '@/contexts/AuthContext'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'

const GoogleOAuthTest: React.FC = () => {
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const { user, signInWithGoogle, loading } = useAuth()

  const testGoogleOAuth = async () => {
    setTestStatus('testing')
    setErrorMessage('')

    try {
      await signInWithGoogle()
      setTestStatus('success')
    } catch (error) {
      setTestStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error occurred')
    }
  }

  const getStatusIcon = () => {
    switch (testStatus) {
      case 'testing':
        return <Loader2 className="h-4 w-4 animate-spin" />
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusText = () => {
    switch (testStatus) {
      case 'testing':
        return 'Testing Google OAuth...'
      case 'success':
        return 'Google OAuth test successful!'
      case 'error':
        return 'Google OAuth test failed'
      default:
        return 'Test Google OAuth Integration'
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getStatusIcon()}
          Google OAuth Test
        </CardTitle>
        <CardDescription>
          Test the Google OAuth integration to ensure it's working properly
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {user && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              User is currently signed in: {user.email}
            </AlertDescription>
          </Alert>
        )}

        {testStatus === 'error' && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <Button
          onClick={testGoogleOAuth}
          disabled={loading || testStatus === 'testing'}
          className="w-full"
        >
          {getStatusText()}
        </Button>

        <div className="text-sm text-gray-500 space-y-1">
          <p><strong>Current Status:</strong> {testStatus}</p>
          <p><strong>Loading State:</strong> {loading ? 'Yes' : 'No'}</p>
          <p><strong>User Signed In:</strong> {user ? 'Yes' : 'No'}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default GoogleOAuthTest
