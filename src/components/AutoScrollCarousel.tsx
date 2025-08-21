import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Eye, Star, ArrowRight } from 'lucide-react';
import { supabaseUtils } from '@/hooks/useSupabase';

interface Product {
  id: string;
  name: string;
  price: number;
  original_price?: number;
  image_url: string;
  category: string;
  rating: number;
  reviews: number;
  is_new?: boolean;
  is_best_seller?: boolean;
  colors: string[];
  sizes: string[];
  additional_images?: string[];
}

const AutoScrollCarousel = memo(() => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoized load products function
  const loadProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { data, error } = await supabaseUtils.getCustomerFavourites();
      if (error) {
        setError(error.message);
      } else {
        setProducts(data || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load products on mount
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Memoized transformed products
  const transformedProducts = useMemo(() => {
    return products.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.original_price,
      image: product.image_url,
      category: product.category,
      rating: product.rating,
      reviews: product.reviews,
      isNew: product.is_new,
      isBestSeller: product.is_best_seller,
      colors: product.colors || ['#000000'],
      sizes: product.sizes || ['M'],
      additionalImages: product.additional_images || [],
    }));
  }, [products]);

  if (isLoading) {
    return (
      <section 
        id="customer-favourites" 
        className="w-full py-20 relative overflow-hidden"
        style={{ 
          background: 'linear-gradient(180deg, #94A3B8 0%, #64748B 25%, #475569 50%, #334155 75%, #1E293B 100%)'
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 30% 70%, rgba(34, 197, 94, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`
          }}></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-['Italiana'] text-4xl lg:text-5xl tracking-wide" 
                style={{ 
                  color: '#F8FAFC',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}>
              Customer <span style={{ color: '#10B981' }}>Favourites</span>
            </h2>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section 
        id="customer-favourites" 
        className="w-full py-20 relative overflow-hidden"
        style={{ 
          background: 'linear-gradient(180deg, #94A3B8 0%, #64748B 25%, #475569 50%, #334155 75%, #1E293B 100%)'
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 30% 70%, rgba(34, 197, 94, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`
          }}></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-['Italiana'] text-4xl lg:text-5xl tracking-wide" 
                style={{ 
                  color: '#F8FAFC',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}>
              Customer <span style={{ color: '#10B981' }}>Favourites</span>
            </h2>
          </div>
          <div className="text-center text-red-400">
            <p>Error loading products: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="customer-favourites" 
      className="w-full py-20 relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(180deg, #94A3B8 0%, #64748B 25%, #475569 50%, #334155 75%, #1E293B 100%)'
      }}
    >
      {/* Subtle, organic texture overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 30% 70%, rgba(34, 197, 94, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`
        }}></div>
      </div>
      
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-800/20 to-slate-900/30" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Refined Section Header */}
        <div className="text-center mb-20">
          <h2 className="font-['Italiana'] text-4xl lg:text-5xl tracking-wide mb-6" 
              style={{ 
                color: '#F8FAFC',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}>
            Customer <span style={{ color: '#10B981' }}>Favourites</span>
          </h2>
          <p className="text-xl text-slate-300 font-light max-w-2xl mx-auto">
            Discover the most loved pieces from our collection, handpicked by our valued customers
          </p>
        </div>

        {/* Product showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {transformedProducts.map((item) => (
            <div key={item.id} className="group">
              <div className="elegant-card rounded-3xl p-8 transition-all duration-700 hover:scale-[1.03] hover:shadow-2xl relative overflow-hidden bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-xl border border-slate-600/40 shadow-xl">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-700/40 to-slate-600/40 opacity-60"></div>
                
                <div className="relative z-10">
                  {/* Product Image */}
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-6">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    
                    {/* Refined badges */}
                    <div className="absolute top-4 left-4 flex flex-col space-y-2">
                      {item.isNew && (
                        <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs px-3 py-1 shadow-lg">
                          NEW
                        </Badge>
                      )}
                      {item.isBestSeller && (
                        <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs px-3 py-1 shadow-lg">
                          FEATURED
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="space-y-4">
                    <h3 className="font-['Playfair_Display'] text-xl font-semibold text-slate-100 group-hover:text-emerald-300 transition-colors duration-300">
                      {item.name}
                    </h3>
                    
                    <p className="text-sm text-slate-400 uppercase tracking-wide">
                      {item.category}
                    </p>
                    
                    {/* Rating */}
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(item.rating)
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-500'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-slate-400" 
                            style={{ 
                              textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                            }}>
                        ({item.reviews} reviews)
                      </span>
                    </div>
                    
                    {/* Price */}
                    <div className="flex items-center space-x-3">
                      <span className="font-['Inter'] text-2xl font-bold text-slate-100" 
                            style={{ 
                              textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                            }}>
                        ₹{item.price.toLocaleString()}
                      </span>
                      {item.originalPrice && (
                        <span className="font-['Inter'] text-xl line-through font-light" 
                              style={{ 
                                color: '#94A3B8',
                                textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                              }}>
                          ₹{item.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    
                    {/* Refined Action Buttons */}
                    <div className="flex space-x-3 pt-4">
                      <Button className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                        <Heart className="mr-2 h-4 w-4" />
                        Add to Wishlist
                      </Button>
                      <Button variant="outline" className="flex-1 border-emerald-400 text-emerald-300 hover:bg-emerald-900/20 hover:border-emerald-400 transition-all duration-300">
                        <Eye className="mr-2 h-4 w-4" />
                        Quick View
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Refined Call to Action */}
        <div className="text-center">
          <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-10 py-4 text-lg font-medium rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <ArrowRight className="mr-2 h-5 w-5" />
            Explore All Collections
          </Button>
        </div>
      </div>
    </section>
  );
});

AutoScrollCarousel.displayName = 'AutoScrollCarousel';

export { AutoScrollCarousel }; 