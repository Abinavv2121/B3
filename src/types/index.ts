/**
 * Core application types and interfaces
 * Centralized type definitions for better maintainability and type safety
 */

// Database types
export interface Database {
  public: {
    Tables: {
      products: {
        Row: ProductRow;
        Insert: ProductInsert;
        Update: ProductUpdate;
      };
      categories: {
        Row: CategoryRow;
        Insert: CategoryInsert;
        Update: CategoryUpdate;
      };
    };
  };
}

// Product types
export interface ProductRow {
  id: string;
  name: string;
  category: string;
  price: number;
  original_price?: number;
  image_url?: string;
  additional_images?: string[];
  rating?: number;
  reviews?: number;
  is_new?: boolean;
  is_best_seller?: boolean;
  colors?: string[];
  sizes?: string[];
  design?: string;
  section?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProductInsert {
  id?: string;
  name: string;
  category: string;
  price: number;
  original_price?: number;
  image_url?: string;
  additional_images?: string[];
  rating?: number;
  reviews?: number;
  is_new?: boolean;
  is_best_seller?: boolean;
  colors?: string[];
  sizes?: string[];
  design?: string;
  section?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProductUpdate {
  id?: string;
  name?: string;
  category?: string;
  price?: number;
  original_price?: number;
  image_url?: string;
  additional_images?: string[];
  rating?: number;
  reviews?: number;
  is_new?: boolean;
  is_best_seller?: boolean;
  colors?: string[];
  sizes?: string[];
  design?: string;
  section?: string;
  created_at?: string;
  updated_at?: string;
}

// Category types
export interface CategoryRow {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CategoryInsert {
  id?: string;
  name: string;
  description?: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CategoryUpdate {
  id?: string;
  name?: string;
  description?: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

// Component prop types
export interface ProductCardProps {
  product: Product;
  quickShop?: boolean;
  showQuickView?: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  additionalImages?: string[];
  rating: number;
  reviews: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  colors: string[];
  sizes: string[];
  quickShop?: boolean;
  type?: string;
}

// Cart types
export interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

// Favourites types
export interface FavouriteItem {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  colors: string[];
  sizes: string[];
}

// Filter types
export interface FilterOption {
  id: string;
  name: string;
  count: number;
}

// API Response types
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

// Navigation types
export interface NavigationItem {
  path: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

// Form types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea';
  required?: boolean;
  options?: { value: string; label: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: RegExp;
    message?: string;
  };
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
