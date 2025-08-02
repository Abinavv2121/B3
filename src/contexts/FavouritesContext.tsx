import React, { createContext, useContext, useState, useEffect } from 'react';

interface FavouriteItem {
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
  addedAt: Date;
}

interface FavouritesContextType {
  favourites: FavouriteItem[];
  addToFavourites: (product: Omit<FavouriteItem, 'addedAt'>) => void;
  removeFromFavourites: (productId: string) => void;
  isInFavourites: (productId: string) => boolean;
  clearFavourites: () => void;
  favouritesCount: number;
}

const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (context === undefined) {
    throw new Error('useFavourites must be used within a FavouritesProvider');
  }
  return context;
};

interface FavouritesProviderProps {
  children: React.ReactNode;
}

export const FavouritesProvider: React.FC<FavouritesProviderProps> = ({ children }) => {
  const [favourites, setFavourites] = useState<FavouriteItem[]>([]);

  // Load favourites from localStorage on mount
  useEffect(() => {
    const savedFavourites = localStorage.getItem('b3-favourites');
    if (savedFavourites) {
      try {
        const parsed = JSON.parse(savedFavourites);
        // Convert string dates back to Date objects
        const favouritesWithDates = parsed.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        }));
        setFavourites(favouritesWithDates);
      } catch (error) {
        console.error('Error loading favourites from localStorage:', error);
      }
    }
  }, []);

  // Save favourites to localStorage whenever favourites change
  useEffect(() => {
    localStorage.setItem('b3-favourites', JSON.stringify(favourites));
  }, [favourites]);

  const addToFavourites = (product: Omit<FavouriteItem, 'addedAt'>) => {
    setFavourites(prev => {
      // Check if product is already in favourites
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev; // Don't add if already exists
      }
      return [...prev, { ...product, addedAt: new Date() }];
    });
  };

  const removeFromFavourites = (productId: string) => {
    setFavourites(prev => prev.filter(item => item.id !== productId));
  };

  const isInFavourites = (productId: string) => {
    return favourites.some(item => item.id === productId);
  };

  const clearFavourites = () => {
    setFavourites([]);
  };

  const favouritesCount = favourites.length;

  const value: FavouritesContextType = {
    favourites,
    addToFavourites,
    removeFromFavourites,
    isInFavourites,
    clearFavourites,
    favouritesCount
  };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
}; 