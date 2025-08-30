import React, { createContext, useContext, useCallback, useMemo } from 'react';
import { CartItem } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/constants';
import { useAuth } from '@/contexts/AuthContext';


interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isInCart: (itemId: string, selectedSize?: string, selectedColor?: string) => boolean;
  getItemQuantity: (itemId: string, selectedSize?: string, selectedColor?: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(STORAGE_KEYS.CART, []);
  const { requireAuth } = useAuth();

  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>) => {
    console.log('CartContext: addToCart called with:', item);
    
    // Check authentication before adding to cart
    if (!requireAuth()) {
      console.log('CartContext: Authentication required for adding to cart');
      return;
    }
    
    setCartItems(prevItems => {
      console.log('CartContext: Previous cart items:', prevItems);
      
      // Check if this exact product (same ID, size, and color) is already in cart
      const existingItem = prevItems.find(cartItem => 
        cartItem.id === item.id && 
        cartItem.selectedSize === item.selectedSize && 
        cartItem.selectedColor === item.selectedColor
      );

      if (existingItem) {
        console.log('CartContext: Product already in cart - cannot add duplicate');
        // Product already exists in cart - don't add duplicate
        // Return the same cart items unchanged
        return prevItems;
      } else {
        console.log('CartContext: Adding new unique product to cart');
        // Add new unique product with quantity 1
        const newItems = [...prevItems, { ...item, quantity: 1 }];
        console.log('CartContext: New cart items after adding:', newItems);
        return newItems;
      }
    });
  }, [setCartItems, requireAuth]);

  const removeFromCart = useCallback((itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  }, [setCartItems]);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  }, [setCartItems, removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, [setCartItems]);

  const isInCart = useCallback((itemId: string, selectedSize?: string, selectedColor?: string) => {
    return cartItems.some(item => 
      item.id === itemId && 
      item.selectedSize === selectedSize && 
      item.selectedColor === selectedColor
    );
  }, [cartItems]);

  const getItemQuantity = useCallback((itemId: string, selectedSize?: string, selectedColor?: string) => {
    const item = cartItems.find(item => 
      item.id === itemId && 
      item.selectedSize === selectedSize && 
      item.selectedColor === selectedColor
    );
    return item?.quantity || 0;
  }, [cartItems]);

  // Memoize expensive calculations
  const cartTotal = useMemo(() => 
    cartItems.reduce((total, item) => total + (item.price * item.quantity), 0), 
    [cartItems]
  );
  
  const cartCount = useMemo(() => 
    cartItems.reduce((count, item) => count + item.quantity, 0), 
    [cartItems]
  );

  const value: CartContextType = useMemo(() => ({
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
    isInCart,
    getItemQuantity,
  }), [
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
    isInCart,
    getItemQuantity,
  ]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 