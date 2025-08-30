import React, { Suspense, lazy, memo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from '@/contexts/CartContext';
import { FavouritesProvider } from '@/contexts/FavouritesContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import AuthModal from '@/components/AuthModal';

// Lazy load components for code splitting
const Index = lazy(() => import('@/pages/Index'));
const Saree = lazy(() => import('@/pages/Saree'));
const Anarkali = lazy(() => import('@/pages/Anarkali'));
const Lehenga = lazy(() => import('@/pages/Lehenga'));
const SalwarSuit = lazy(() => import('@/pages/SalwarSuit'));
const Western = lazy(() => import('@/pages/Western'));
const Bridal = lazy(() => import('@/pages/Bridal'));
const Cart = lazy(() => import('@/pages/Cart'));
const Wishlist = lazy(() => import('@/pages/Wishlist'));
const Checkout = lazy(() => import('@/pages/Checkout'));
const OrderSuccess = lazy(() => import('@/pages/OrderSuccess'));
const Admin = lazy(() => import('@/pages/Admin'));
const AboutUs = lazy(() => import('@/pages/AboutUs'));
const AuthCallback = lazy(() => import('@/pages/AuthCallback'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Loading component
const LoadingSpinner = memo(() => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-400 mx-auto mb-4"></div>
      <p className="text-slate-300 text-lg">Loading...</p>
    </div>
  </div>
));

LoadingSpinner.displayName = 'LoadingSpinner';

// Error boundary component
const ErrorFallback = memo(() => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-red-400 mb-4">Something went wrong</h1>
      <p className="text-slate-300 mb-4">Please refresh the page to try again</p>
      <button 
        onClick={() => window.location.reload()} 
        className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
      >
        Refresh Page
      </button>
    </div>
  </div>
));

ErrorFallback.displayName = 'ErrorFallback';

// Component to render AuthModal within AuthContext
const AppContent = memo(() => {
  const { showAuthModal, setShowAuthModal } = useAuth();
  
  return (
    <div className="App">
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/saree" element={<Saree />} />
          <Route path="/anarkali" element={<Anarkali />} />
          <Route path="/lehenga" element={<Lehenga />} />
          <Route path="/salwar-suit" element={<SalwarSuit />} />
          <Route path="/western" element={<Western />} />
          <Route path="/bridal" element={<Bridal />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster />
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
});

AppContent.displayName = 'AppContent';

const App = memo(() => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <FavouritesProvider>
            <div className="App">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/saree" element={<Saree />} />
                  <Route path="/anarkali" element={<Anarkali />} />
                  <Route path="/lehenga" element={<Lehenga />} />
                  <Route path="/salwar-suit" element={<SalwarSuit />} />
                  <Route path="/western" element={<Western />} />
                  <Route path="/bridal" element={<Bridal />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-success" element={<OrderSuccess />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/auth/callback" element={<AuthCallback />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              <Toaster />
            </div>
          </FavouritesProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
});

App.displayName = 'App';

export default App;
