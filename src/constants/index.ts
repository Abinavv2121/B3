/**
 * Application constants and configuration
 * Centralized configuration for better maintainability and consistency
 */

// API Configuration
export const API_CONFIG = {
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  DEFAULT_LIMIT: 8,
  MAX_PRODUCTS_PER_PAGE: 12,
} as const;

// UI Constants
export const UI_CONSTANTS = {
  // Animation durations
  TRANSITION_DURATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
  },
  
  // Spacing
  SPACING: {
    XS: '0.25rem',
    SM: '0.5rem',
    MD: '1rem',
    LG: '1.5rem',
    XL: '2rem',
    XXL: '3rem',
  },
  
  // Z-index layers
  Z_INDEX: {
    DROPDOWN: 1000,
    STICKY: 1020,
    FIXED: 1030,
    MODAL_BACKDROP: 1040,
    MODAL: 1050,
    POPOVER: 1060,
    TOOLTIP: 1070,
  },
  
  // Breakpoints (matching Tailwind)
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1536,
  },
} as const;

// Product Configuration
export const PRODUCT_CONFIG = {
  // Default values
  DEFAULTS: {
    RATING: 4.5,
    MIN_REVIEWS: 50,
    MAX_REVIEWS: 250,
    COLORS: ['#DC2626', '#10B981', '#7C3AED', '#F59E0B'],
    SIZES: ['S', 'M', 'L', 'XL'],
    FREE_SIZE: ['Free Size'],
  },
  
  // Categories
  CATEGORIES: {
    SAREES: 'saree',
    ANARKALI: 'anarkali',
    LEHENGA: 'lehenga',
    SALWAR_SUIT: 'salwar-suit',
    WESTERN: 'western',
    BRIDAL: 'bridal',
    FESTIVAL: 'festival',
    SPECIAL: 'special',
  },
  
  // Sections
  SECTIONS: {
    CUSTOMER_FAVOURITES: 'customer_favourites',
    FEATURED: 'featured',
    NEW_ARRIVALS: 'new_arrivals',
    BEST_SELLERS: 'best_sellers',
  },
  
  // Filters
  FILTERS: {
    SAREES: [
      { id: 'all', name: 'All Sarees' },
      { id: 'Silk', name: 'Silk Sarees' },
      { id: 'Georgette', name: 'Georgette Sarees' },
      { id: 'Designer', name: 'Designer Sarees' },
      { id: 'Bridal', name: 'Bridal Sarees' },
      { id: 'Party', name: 'Party Wear' },
      { id: 'Casual', name: 'Casual Sarees' },
    ],
    FEATURED: [
      { id: 'all', name: 'All' },
      { id: 'Bridal Collection', name: 'Bridal' },
      { id: 'Festival Glory', name: 'Festival' },
      { id: 'Special Moments', name: 'Special' },
      { id: 'Western Edge', name: 'Western' },
    ],
  },
} as const;

// Navigation Configuration
export const NAVIGATION_CONFIG = {
  // Routes
  ROUTES: {
    HOME: '/',
    SAREES: '/saree',
    ANARKALI: '/anarkali',
    LEHENGA: '/lehenga',
    SALWAR_SUIT: '/salwar-suit',
    WESTERN: '/western',
    BRIDAL: '/bridal',
    FESTIVAL: '/festival',
    SPECIAL: '/special',
    CART: '/cart',
    CHECKOUT: '/checkout',
    ORDER_SUCCESS: '/order-success',
    WISHLIST: '/wishlist',
    ADMIN: '/admin',
  },
  
  // Navigation items
  ITEMS: [
    { path: '/saree', label: 'Sarees' },
    { path: '/anarkali', label: 'Anarkali' },
    { path: '/lehenga', label: 'Lehenga' },
    { path: '/salwar-suit', label: 'Salwar Suit' },
    { path: '/western', label: 'Western' },
    { path: '/bridal', label: 'Bridal' },
    { path: '/festival', label: 'Festival' },
    { path: '/special', label: 'Special' },
  ],
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  CART: 'cart',
  FAVOURITES: 'favourites',
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme',
  AUTH_USER: 'auth_user',
  AUTH_INITIAL_MODAL_SHOWN: 'auth_initial_modal_shown',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK: {
    CONNECTION_FAILED: 'Failed to connect to the server',
    TIMEOUT: 'Request timed out',
    UNKNOWN: 'An unknown error occurred',
  },
  VALIDATION: {
    REQUIRED: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    MIN_LENGTH: (min: number) => `Must be at least ${min} characters`,
    MAX_LENGTH: (max: number) => `Must be no more than ${max} characters`,
  },
  PRODUCT: {
    LOAD_FAILED: 'Failed to load products',
    NOT_FOUND: 'Product not found',
    ADD_TO_CART_FAILED: 'Failed to add item to cart',
  },
  CART: {
    EMPTY: 'Your cart is empty',
    ITEM_NOT_FOUND: 'Item not found in cart',
  },
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  CART: {
    ITEM_ADDED: 'Item added to cart successfully',
    ITEM_REMOVED: 'Item removed from cart',
    QUANTITY_UPDATED: 'Quantity updated successfully',
  },
  FAVOURITES: {
    ITEM_ADDED: 'Item added to wishlist',
    ITEM_REMOVED: 'Item removed from wishlist',
  },
  ORDER: {
    PLACED: 'Order placed successfully',
  },
} as const;

// Theme Configuration
export const THEME_CONFIG = {
  COLORS: {
    PRIMARY: '#D4AF37',
    SECONDARY: '#F8F7F3',
    ACCENT: '#DC2626',
    SUCCESS: '#10B981',
    WARNING: '#F59E0B',
    ERROR: '#EF4444',
    INFO: '#3B82F6',
  },
  GRADIENTS: {
    CULTURAL: 'linear-gradient(135deg, #D4AF37 0%, #F4E4BC 100%)',
    ROSE_GOLD: 'linear-gradient(135deg, #E5B8F3 0%, #F4E4BC 100%)',
    ROYAL_SILK: 'linear-gradient(135deg, #2C1810 0%, #4A3428 100%)',
  },
} as const;

// Performance Configuration
export const PERFORMANCE_CONFIG = {
  // Debounce delays
  DEBOUNCE: {
    SEARCH: 300,
    SCROLL: 16, // ~60fps
    RESIZE: 250,
  },
  
  // Throttle delays
  THROTTLE: {
    SCROLL: 16,
    RESIZE: 100,
  },
  
  // Cache durations
  CACHE: {
    PRODUCTS: 5 * 60 * 1000, // 5 minutes
    CATEGORIES: 10 * 60 * 1000, // 10 minutes
    USER_DATA: 30 * 60 * 1000, // 30 minutes
  },
} as const;
