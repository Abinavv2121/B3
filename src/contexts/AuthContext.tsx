import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/constants';

export interface User {
  id: string;
  name: string;
  email: string;
  isGuest: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  showAuthModal: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  continueAsGuest: () => void;
  logout: () => void;
  setShowAuthModal: (show: boolean) => void;
  requireAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useLocalStorage<User | null>(STORAGE_KEYS.AUTH_USER, null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [hasShownInitialModal, setHasShownInitialModal] = useLocalStorage(STORAGE_KEYS.AUTH_INITIAL_MODAL_SHOWN, false);

  // Show modal on initial page load if user hasn't seen it before
  useEffect(() => {
    if (!hasShownInitialModal && !user) {
      setShowAuthModal(true);
    }
  }, [hasShownInitialModal, user]);

  const isAuthenticated = user !== null && !user.isGuest;
  const isGuest = user?.isGuest || false;

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call - in real app, this would be an actual authentication request
      // For demo purposes, we'll accept any email/password combination
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newUser: User = {
        id: `user_${Date.now()}`,
        name: email.split('@')[0], // Use email prefix as name for demo
        email,
        isGuest: false,
      };
      
      setUser(newUser);
      setShowAuthModal(false);
      setHasShownInitialModal(true);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  }, [setUser, setHasShownInitialModal]);

  const signup = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call - in real app, this would create a new user account
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newUser: User = {
        id: `user_${Date.now()}`,
        name,
        email,
        isGuest: false,
      };
      
      setUser(newUser);
      setShowAuthModal(false);
      setHasShownInitialModal(true);
      return true;
    } catch (error) {
      console.error('Signup failed:', error);
      return false;
    }
  }, [setUser, setHasShownInitialModal]);

  const continueAsGuest = useCallback(() => {
    const guestUser: User = {
      id: `guest_${Date.now()}`,
      name: 'Guest',
      email: '',
      isGuest: true,
    };
    
    setUser(guestUser);
    setShowAuthModal(false);
    setHasShownInitialModal(true);
  }, [setUser, setHasShownInitialModal]);

  const logout = useCallback(() => {
    setUser(null);
    setHasShownInitialModal(false);
  }, [setUser, setHasShownInitialModal]);

  const requireAuth = useCallback((): boolean => {
    if (!user || user.isGuest) {
      setShowAuthModal(true);
      return false;
    }
    return true;
  }, [user]);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isGuest,
    showAuthModal,
    login,
    signup,
    continueAsGuest,
    logout,
    setShowAuthModal,
    requireAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
