import { useState, useEffect } from 'react';
import { Crown, Star, Heart, Eye, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { supabaseUtils } from '@/hooks/useSupabase';
import { Database } from '@/lib/supabase';

type Product = Database['public']['Tables']['products']['Row'];

const AutoScrollCarousel = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabaseUtils.getCustomerFavourites();
      if (error) {
        setError(error.message);
      } else {
        setProducts(data || []);
      }
    } catch (err) {
      setError("Failed to load products");
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <section 
        id="customer-favourites" 
        className="w-full py-20 relative overflow-hidden starry-night-section"
      >
        <div className="absolute inset-0 starry-night-bg" />
        <div className="absolute inset-0 twinkling-stars" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-['Italiana'] text-4xl lg:text-5xl tracking-wide" 
                style={{ 
                  color: '#F8F7F3',
                  textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                }}>
              Customer <span style={{ color: '#D4AF37' }}>Favourites</span>
            </h2>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section 
        id="customer-favourites" 
        className="w-full py-20 relative overflow-hidden starry-night-section"
      >
        <div className="absolute inset-0 starry-night-bg" />
        <div className="absolute inset-0 twinkling-stars" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-['Italiana'] text-4xl lg:text-5xl tracking-wide" 
                style={{ 
                  color: '#F8F7F3',
                  textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                }}>
              Customer <span style={{ color: '#D4AF37' }}>Favourites</span>
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
      className="w-full py-20 relative overflow-hidden starry-night-section"
    >
      {/* Starry Night Background */}
      <div className="absolute inset-0 starry-night-bg" />
      
      {/* Twinkling Stars */}
      <div className="absolute inset-0 twinkling-stars" />
      
      {/* Elegant gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
      <div className="container mx-auto px-4 relative z-10">
        {/* Minimalist header */}
        <div className="text-center mb-12">
          <h2 className="font-['Italiana'] text-4xl lg:text-5xl tracking-wide" 
              style={{ 
                color: '#F8F7F3',
                textShadow: '0 2px 4px rgba(0,0,0,0.8)'
              }}>
            Customer <span style={{ color: '#D4AF37' }}>Favourites</span>
          </h2>
        </div>
        
        {/* Product showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {products.map((item) => (
            <div key={item.id} className="group">
              <div className="elegant-card rounded-xl p-8 transition-all duration-700 hover:scale-[1.03] hover:shadow-2xl relative overflow-hidden">
                {/* Subtle shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                {/* Image container */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-6">
                  <img
                    src={item.image_url || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Simple badges */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    {item.is_new && (
                      <Badge className="bg-white/90 text-black text-xs px-3 py-1">
                        NEW
                      </Badge>
                    )}
                    {item.is_best_seller && (
                      <Badge className="text-black text-xs px-3 py-1" style={{ backgroundColor: '#D4AF37' }}>
                        FEATURED
                      </Badge>
                    )}
                  </div>

                  {/* Simple action buttons */}
                  <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="w-10 h-10 rounded-full backdrop-blur-sm transition-all duration-300 border"
                      style={{ 
                        backgroundColor: 'rgba(11, 15, 20, 0.6)',
                        color: '#F5F5F3',
                        borderColor: '#3A2F1C'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(224, 195, 108, 0.2)';
                        e.currentTarget.style.borderColor = '#E0C36C';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(11, 15, 20, 0.6)';
                        e.currentTarget.style.borderColor = '#3A2F1C';
                      }}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="w-10 h-10 rounded-full backdrop-blur-sm transition-all duration-300 border"
                      style={{ 
                        backgroundColor: 'rgba(11, 15, 20, 0.6)',
                        color: '#F5F5F3',
                        borderColor: '#3A2F1C'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(224, 195, 108, 0.2)';
                        e.currentTarget.style.borderColor = '#E0C36C';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(11, 15, 20, 0.6)';
                        e.currentTarget.style.borderColor = '#3A2F1C';
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Product details */}
                <div className="text-center space-y-4 relative z-10">
                  <p className="text-xs font-medium tracking-[0.2em] uppercase" 
                     style={{ 
                       color: '#C08E5D',
                       textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                       letterSpacing: '0.15em'
                     }}>
                    {item.category}
                  </p>

                  <h3 className="font-['Playfair_Display'] text-2xl lg:text-3xl font-semibold leading-tight tracking-wide" 
                      style={{ 
                        color: '#F8F7F3',
                        textShadow: '0 2px 4px rgba(0,0,0,0.7)',
                        letterSpacing: '0.01em'
                      }}>
                    {item.name}
                  </h3>

                  {/* Premium rating */}
                  <div className="flex items-center justify-center gap-3 py-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 drop-shadow-sm" 
                              style={{ 
                                fill: '#D4AF37', 
                                color: '#D4AF37',
                                filter: 'drop-shadow(0 1px 2px rgba(212,175,55,0.3))'
                              }} />
                      ))}
                    </div>
                    <span className="text-sm font-medium tracking-wide" 
                          style={{ 
                            color: '#E8E3D9',
                            textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                          }}>
                      ({item.reviews || 0} reviews)
                    </span>
                  </div>

                  {/* Elegant pricing */}
                  <div className="flex items-center justify-center gap-4 pt-2">
                    <span className="font-['Inter'] text-3xl lg:text-4xl font-light tracking-wide" 
                          style={{ 
                            background: 'linear-gradient(135deg, #F8F7F3 0%, #E8E3D9 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                            letterSpacing: '0.02em'
                          }}>
                      ₹{item.price.toLocaleString()}
                    </span>
                    {item.original_price && (
                      <span className="font-['Inter'] text-xl line-through font-light" 
                            style={{ 
                              color: '#C8C8C5', 
                              opacity: '0.7',
                              textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                            }}>
                        ₹{item.original_price.toLocaleString()}
                      </span>
                    )}
                  </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        {/* Simple CTA */}
        <div className="text-center">
          <Link to="/wishlist">
            <Button variant="luxury" size="lg" className="px-8 py-3 text-lg">
              View All Favourites
              <ArrowRight className="ml-3 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AutoScrollCarousel; 