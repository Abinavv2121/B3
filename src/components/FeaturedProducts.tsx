import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import ProductCard from '@/components/ProductCard';
import { supabaseUtils } from '@/hooks/useSupabase';
import shippingIcon from '/src/assets/shipping.png';
import returnIcon from '/src/assets/return.png';
import secureIcon from '/src/assets/secure.png';
import emiIcon from '/src/assets/emi.png';

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

interface Filter {
  id: string;
  name: string;
  count: number;
}

const FeaturedProducts = memo(() => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  // Memoized filters array
  const filters = useMemo((): Filter[] => {
    if (!products.length) return [];
    
    const allCount = products.length;
    const newCount = products.filter(p => p.is_new).length;
    const bestSellerCount = products.filter(p => p.is_best_seller).length;
    const discountedCount = products.filter(p => p.original_price && p.original_price > p.price).length;

    return [
      { id: 'all', name: 'All Products', count: allCount },
      { id: 'new', name: 'New Arrivals', count: newCount },
      { id: 'best-seller', name: 'Best Sellers', count: bestSellerCount },
      { id: 'discounted', name: 'On Sale', count: discountedCount },
    ];
  }, [products]);

  // Memoized load products function
  const loadProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { data, error } = await supabaseUtils.getProducts();
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

  // Memoized filter change handler
  const handleFilterChange = useCallback((filterId: string) => {
    setActiveFilter(filterId);
  }, []);

  // Memoized filtered products
  const filteredProducts = useMemo(() => {
    if (activeFilter === 'all') return products;
    
    return products.filter(product => {
      switch (activeFilter) {
        case 'new':
          return product.is_new;
        case 'best-seller':
          return product.is_best_seller;
        case 'discounted':
          return product.original_price && product.original_price > product.price;
        default:
          return true;
      }
    });
  }, [products, activeFilter]);

  // Memoized transformed products
  const transformedProducts = useMemo(() => {
    return filteredProducts.map(product => ({
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
  }, [filteredProducts]);

  if (isLoading) {
    return (
      <section className="section-padding relative overflow-hidden" style={{ 
        background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 20%, #334155 40%, #475569 60%, #64748B 80%, #94A3B8 100%)'
      }}>
        <div className="w-full px-4 lg:px-8 relative z-10">
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-['Italiana'] tracking-wide mb-6" 
                style={{ 
                  color: '#F8FAFC',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}>
              Featured <span style={{ color: '#EAB308' }}>Collections</span>
            </h2>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-padding relative overflow-hidden" style={{ 
        background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 20%, #334155 40%, #475569 60%, #64748B 80%, #94A3B8 100%)'
      }}>
        <div className="w-full px-4 lg:px-8 relative z-10">
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-['Italiana'] tracking-wide mb-6" 
                style={{ 
                  color: '#F8FAFC',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}>
              Featured <span style={{ color: '#EAB308' }}>Collections</span>
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
    <section className="section-padding relative overflow-hidden" style={{ 
      background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 20%, #334155 40%, #475569 60%, #64748B 80%, #94A3B8 100%)'
    }}>
      {/* Subtle, organic texture overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 40% 40%, rgba(34, 197, 94, 0.2) 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="w-full px-4 lg:px-8 relative z-10">
        {/* Refined Section Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-['Italiana'] tracking-wide mb-6" 
              style={{ 
                color: '#F8FAFC',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}>
            Featured <span style={{ color: '#EAB308' }}>Collections</span>
          </h2>
          <p className="text-xl text-slate-300 font-light max-w-2xl mx-auto">
            Discover our curated selection of timeless elegance
          </p>
        </div>

        {/* Refined Filter Tabs */}
        <div className="flex justify-center mb-16">
          <div className="flex items-center space-x-3 px-8 py-4 bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-600/40 shadow-xl">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleFilterChange(filter.id)}
                className={`font-italiana text-sm font-medium uppercase tracking-wide whitespace-nowrap px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                  activeFilter === filter.id
                    ? 'text-slate-900 bg-gradient-to-r from-amber-400 to-yellow-500 border border-amber-300 shadow-lg'
                    : 'text-slate-300 hover:text-amber-300 hover:bg-slate-700/60 border border-transparent hover:border-slate-500/60'
                }`}
              >
                {filter.name}
                <span className="ml-2 text-xs opacity-80 normal-case">({filter.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {transformedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-12">
            {transformedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-300 text-lg">No products found in this category.</p>
          </div>
        )}

        {/* Refined Feature Benefits Section */}
        <div className="mt-24">
          <div className="py-20 rounded-3xl bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-xl border border-slate-600/40 shadow-2xl">
            <div className="w-full px-4 lg:px-8">
              <div className="text-center mb-16">
                <h3 className="text-4xl lg:text-5xl font-['Playfair_Display'] font-light tracking-wider mb-6" style={{ color: '#F8FAFC' }}>
                  PREMIUM SERVICES
                </h3>
                <div className="mx-auto w-[140px]">
                  <div className="h-1.5 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full shadow-lg" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center max-w-6xl mx-auto">
                <div className="space-y-6 group">
                  <div className="flex justify-center mb-6">
                    <div className="w-28 h-28 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 bg-gradient-to-br from-slate-700 to-slate-600 border border-slate-500 shadow-xl">
                      <img
                        src={shippingIcon}
                        alt="Free Shipping"
                        className="w-14 h-14 object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="text-2xl font-['Italiana'] font-medium tracking-wider" style={{ color: '#F8FAFC' }}>
                    Free Shipping
                  </div>
                  <div className="text-base font-light tracking-wide" style={{ color: '#CBD5E1' }}>
                    On orders above ₹29,999
                  </div>
                </div>

                <div className="space-y-6 group">
                  <div className="flex justify-center mb-6">
                    <div className="w-28 h-28 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 bg-gradient-to-br from-slate-700 to-slate-600 border border-slate-500 shadow-xl">
                      <img
                        src={returnIcon}
                        alt="Easy Returns"
                        className="w-14 h-14 object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="text-2xl font-['Italiana'] font-medium tracking-wider" style={{ color: '#F8FAFC' }}>
                    Easy Returns
                  </div>
                  <div className="text-base font-light tracking-wide" style={{ color: '#CBD5E1' }}>
                    15-day return policy
                  </div>
                </div>

                <div className="space-y-6 group">
                  <div className="flex justify-center mb-6">
                    <div className="w-28 h-28 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 bg-gradient-to-br from-slate-700 to-slate-600 border border-slate-500 shadow-xl">
                      <img
                        src={secureIcon}
                        alt="Secure Payment"
                        className="w-14 h-14 object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="text-2xl font-['Italiana'] font-medium tracking-wider" style={{ color: '#F8FAFC' }}>
                    Secure Payment
                  </div>
                  <div className="text-base font-light tracking-wide" style={{ color: '#CBD5E1' }}>
                    SSL encrypted checkout
                  </div>
                </div>

                <div className="space-y-6 group">
                  <div className="flex justify-center mb-6">
                    <div className="w-28 h-28 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 bg-gradient-to-br from-slate-700 to-slate-600 border border-slate-500 shadow-xl">
                      <img
                        src={emiIcon}
                        alt="EMI Available"
                        className="w-12 h-12 object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="text-2xl font-['Italiana'] font-medium tracking-wider" style={{ color: '#F8FAFC' }}>
                    EMI Available
                  </div>
                  <div className="text-base font-light tracking-wide" style={{ color: '#CBD5E1' }}>
                    No cost EMI options
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

FeaturedProducts.displayName = 'FeaturedProducts';

export { FeaturedProducts };