import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "./ProductCard";
import { Sparkles, ArrowRight, Filter, Crown } from "lucide-react";
import { supabaseUtils } from "@/hooks/useSupabase";
import { Database } from "@/lib/supabase";
import shippingIcon from "/src/assets/shipping.png";
import returnIcon from "/src/assets/return.png";
import secureIcon from "/src/assets/secure.png";
import emiIcon from "/src/assets/emi.png";

type Product = Database['public']['Tables']['products']['Row'];

const FeaturedProducts = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filters = [
    { id: "all", name: "All", count: 0 },
    { id: "Bridal Collection", name: "Bridal", count: 0 },
    { id: "Festival Glory", name: "Festival", count: 0 },
    { id: "Special Moments", name: "Special", count: 0 },
    { id: "Western Edge", name: "Western", count: 0 }
  ];

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabaseUtils.getProducts();
      if (error) {
        setError(error.message);
      } else {
        setProducts(data || []);
        // Update filter counts
        filters.forEach(filter => {
          if (filter.id === "all") {
            filter.count = data?.length || 0;
          } else {
            filter.count = data?.filter(p => p.category === filter.id).length || 0;
          }
        });
      }
    } catch (err) {
      setError("Failed to load products");
    }
    setIsLoading(false);
  };

  const filteredProducts = activeFilter === "all" 
    ? products 
    : products.filter(product => product.category === activeFilter);

  // Transform database products to match ProductCard interface
  const transformedProducts = filteredProducts.map(product => ({
    id: product.id,
    name: product.name,
    category: product.category,
    price: product.price,
    originalPrice: product.original_price,
    image: product.image_url || "/placeholder.svg",
    rating: product.rating || 4.5, // Use database rating or default
    reviews: product.reviews || Math.floor(Math.random() * 200) + 50, // Use database reviews or random
    isNew: product.is_new,
    isBestSeller: product.is_best_seller,
    colors: product.colors || ["#DC2626", "#10B981", "#7C3AED", "#F59E0B"],
    sizes: product.sizes || ["S", "M", "L", "XL"],
    type: product.category.toLowerCase().replace(/\s+/g, '-')
  }));

  if (isLoading) {
    return (
      <section className="section-padding relative overflow-hidden bg-royal-silk">
        <div className="w-full px-4 lg:px-8 relative z-10">
          <div className="text-center mb-12 max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-['Italiana'] tracking-wide" 
                style={{ 
                  color: '#F8F7F3',
                  textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                }}>
              Featured <span style={{ color: '#D4AF37' }}>Collections</span>
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
      <section className="section-padding relative overflow-hidden bg-royal-silk">
        <div className="w-full px-4 lg:px-8 relative z-10">
          <div className="text-center mb-12 max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-['Italiana'] tracking-wide" 
                style={{ 
                  color: '#F8F7F3',
                  textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                }}>
              Featured <span style={{ color: '#D4AF37' }}>Collections</span>
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
    <section className="section-padding relative overflow-hidden bg-royal-silk">

      <div className="w-full px-4 lg:px-8 relative z-10">
        {/* Minimalist Section Header */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-['Italiana'] tracking-wide" 
              style={{ 
                color: '#F8F7F3',
                textShadow: '0 2px 4px rgba(0,0,0,0.8)'
              }}>
            Featured <span style={{ color: '#D4AF37' }}>Collections</span>
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-2 px-6 py-3 bg-black/95 backdrop-blur-xl rounded-lg border-b border-gray-200 shadow-sm">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`font-italiana text-sm font-medium uppercase tracking-wide transition-all duration-300 whitespace-nowrap px-6 py-2.5 rounded-lg hover:bg-white/10 border border-transparent hover:border-white/20 ${
                  activeFilter === filter.id
                    ? 'text-white bg-white/15 border-white/30'
                    : 'text-white/70 hover:text-white'
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8 lg:gap-10 mb-20 w-full">
            {transformedProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-white/70 text-lg">No products found in this category.</p>
          </div>
        )}

        {/* Feature Benefits Section */}
        <div className="mt-24">
          <div className="py-16 rounded-3xl" style={{ 
            background: 'linear-gradient(145deg, rgba(26, 28, 31, 0.8) 0%, rgba(15, 17, 20, 0.9) 100%)',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
          }}>
            <div className="w-full px-4 lg:px-8">
              <div className="text-center mb-12">
                <h3 className="text-3xl lg:text-4xl font-['Playfair_Display'] font-light tracking-wider mb-4" style={{ color: '#F8F7F3' }}>
                  PREMIUM SERVICES
                </h3>
                <div className="mx-auto w-[120px]">
                  <div className="divider-gold" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center max-w-6xl mx-auto">
                <div className="space-y-4 group">
                  <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 bg-black border border-gray-600">
                      <img
                        src={shippingIcon}
                        alt="Free Shipping"
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  </div>
                  <div className="text-xl font-['Italiana'] font-medium tracking-wider" style={{ color: '#F8F7F3' }}>
                    Free Shipping
                  </div>
                  <div className="text-sm font-light tracking-wide" style={{ color: '#C8C8C5' }}>
                    On orders above ₹29,999
                  </div>
                </div>

                <div className="space-y-4 group">
                  <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 bg-black border border-gray-600">
                      <img
                        src={returnIcon}
                        alt="Easy Returns"
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  </div>
                  <div className="text-xl font-['Italiana'] font-medium tracking-wider" style={{ color: '#F8F7F3' }}>
                    Easy Returns
                  </div>
                  <div className="text-sm font-light tracking-wide" style={{ color: '#C8C8C5' }}>
                    15-day return policy
                  </div>
                </div>

                <div className="space-y-4 group">
                  <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 bg-black border border-gray-600">
                      <img
                        src={secureIcon}
                        alt="Secure Payment"
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  </div>
                  <div className="text-xl font-['Italiana'] font-medium tracking-wider" style={{ color: '#F8F7F3' }}>
                    Secure Payment
                  </div>
                  <div className="text-sm font-light tracking-wide" style={{ color: '#C8C8C5' }}>
                    SSL encrypted checkout
                  </div>
                </div>

                <div className="space-y-4 group">
                  <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 bg-black border border-gray-600">
                      <img
                        src={emiIcon}
                        alt="EMI Available"
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                  </div>
                  <div className="text-xl font-['Italiana'] font-medium tracking-wider" style={{ color: '#F8F7F3' }}>
                    EMI Available
                  </div>
                  <div className="text-sm font-light tracking-wide" style={{ color: '#C8C8C5' }}>
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
};

export default FeaturedProducts;