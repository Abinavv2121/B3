# Google OAuth Setup Guide for B3 Fashion Studio

This guide will help you set up Google OAuth authentication for your B3 Fashion Studio application using Supabase.

## Prerequisites

- A Supabase project
- A Google Cloud Console project
- Your application running locally or deployed

## Step 1: Google Cloud Console Setup

### 1.1 Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API (if not already enabled)

### 1.2 Configure OAuth Consent Screen
1. Navigate to **APIs & Services** > **OAuth consent screen**
2. Choose **External** user type (unless you have a Google Workspace)
3. Fill in the required information:
   - **App name**: B3 Fashion Studio
   - **User support email**: Your email address
   - **Developer contact information**: Your email address
4. Add scopes:
   - `email`
   - `profile`
   - `openid`
5. Add test users (your email addresses) if in testing mode

### 1.3 Create OAuth 2.0 Credentials
1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth 2.0 Client IDs**
3. Choose **Web application**
4. Set the following:
   - **Name**: B3 Fashion Studio Web Client
   - **Authorized JavaScript origins**:
     - `http://localhost:5173` (for local development)
     - `http://localhost:3000` (if using different port)
     - Your production domain (e.g., `https://yourdomain.com`)
   - **Authorized redirect URIs**:
     - `http://localhost:5173/auth/callback` (for local development)
     - `http://localhost:3000/auth/callback` (if using different port)
     - Your production callback URL (e.g., `https://yourdomain.com/auth/callback`)
5. Click **Create**
6. **Save the Client ID and Client Secret** - you'll need these for Supabase

## Step 2: Supabase Configuration

### 2.1 Enable Google Provider
1. Go to your Supabase project dashboard
2. Navigate to **Authentication** > **Providers**
3. Find **Google** and click **Enable**
4. Enter the credentials from Google Cloud Console:
   - **Client ID**: Your Google OAuth Client ID
   - **Client Secret**: Your Google OAuth Client Secret
5. Click **Save**

### 2.2 Configure Redirect URLs
1. In Supabase, go to **Authentication** > **URL Configuration**
2. Set the following URLs:
   - **Site URL**: Your application URL (e.g., `http://localhost:5173` or `https://yourdomain.com`)
   - **Redirect URLs**: Add your callback URLs:
     - `http://localhost:5173/auth/callback`
     - `https://yourdomain.com/auth/callback` (for production)

## Step 3: Environment Variables

### 3.1 Local Development
Create a `.env.local` file in your project root:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Service Role Key (for server-side operations only)
VITE_SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 3.2 Production Deployment
Set the same environment variables in your production environment.

## Step 4: Testing the Integration

### 4.1 Local Testing
1. Start your development server: `npm run dev`
2. Navigate to your application
3. Click the **Sign In** button
4. Click **Continue with Google**
5. You should be redirected to Google's OAuth consent screen
6. After authorization, you should be redirected back to your app

### 4.2 Troubleshooting
- **"Invalid redirect URI"**: Check that your redirect URIs in Google Cloud Console match exactly
- **"Client not found"**: Verify your Client ID and Secret in Supabase
- **"Redirect URI mismatch"**: Ensure the redirect URI in your code matches what's configured

## Step 5: Production Deployment

### 5.1 Update Google Cloud Console
1. Add your production domain to **Authorized JavaScript origins**
2. Add your production callback URL to **Authorized redirect URIs**

### 5.2 Update Supabase Configuration
1. Update the **Site URL** to your production domain
2. Add your production callback URL to **Redirect URLs**

### 5.3 Environment Variables
Ensure your production environment has the correct Supabase credentials.

## Security Best Practices

1. **Never expose Client Secret** in client-side code
2. **Use HTTPS** in production
3. **Validate redirect URIs** on the server side
4. **Implement proper session management**
5. **Regularly rotate credentials**

## Additional Features

The current implementation includes:
- ✅ Google OAuth sign-in button
- ✅ Proper error handling
- ✅ Loading states
- ✅ Auth callback handling
- ✅ User profile management
- ✅ Session persistence

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify all configuration steps
3. Ensure environment variables are set correctly
4. Check Supabase logs for authentication errors

## Files Modified

- `src/components/AuthModal.tsx` - Enhanced Google OAuth button styling
- `src/contexts/AuthContext.tsx` - Google OAuth integration
- `src/lib/auth.ts` - Google OAuth implementation
- `src/pages/AuthCallback.tsx` - OAuth callback handling
- `src/lib/supabase.ts` - Supabase client configuration
