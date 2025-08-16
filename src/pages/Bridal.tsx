import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { supabaseUtils } from "@/hooks/useSupabase";
import { Database } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Heart, Eye, Share2, ShoppingBag } from "lucide-react";

type Product = Database['public']['Tables']['products']['Row'];

const Bridal = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", name: "All Bridal Wear", count: 0 },
    { id: "Lehenga", name: "Bridal Lehengas", count: 0 },
    { id: "Saree", name: "Bridal Sarees", count: 0 },
    { id: "Anarkali", name: "Bridal Anarkalis", count: 0 },
    { id: "Suits", name: "Bridal Suits", count: 0 },
    { id: "Sets", name: "Bridal Sets", count: 0 }
  ];

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabaseUtils.getProductsBySection('bridal_collection');
      if (error) {
        setError(error.message);
      } else {
        setProducts(data || []);
        // Update filter counts
        filters.forEach(filter => {
          if (filter.id === "all") {
            filter.count = data?.length || 0;
          } else {
            filter.count = data?.filter(p => p.design?.includes(filter.id) || p.name.includes(filter.id)).length || 0;
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
    : products.filter(product => 
        product.design?.includes(activeFilter) || product.name.includes(activeFilter)
      );

  // Transform database products to match ProductCard interface
  const transformedProducts = filteredProducts.map(product => ({
    id: product.id,
    name: product.name,
    category: product.category,
    price: product.price,
    originalPrice: product.original_price,
    image: product.image_url || "/placeholder.svg",
    rating: product.rating || 4.5,
    reviews: product.reviews || Math.floor(Math.random() * 200) + 50,
    isNew: product.is_new,
    isBestSeller: product.is_best_seller,
    colors: product.colors || ["#DC2626", "#10B981", "#7C3AED", "#F59E0B"],
    sizes: product.sizes || ["S", "M", "L", "XL", "XXL"],
    type: "bridal"
  }));

  return (
    <div className="min-h-screen m-0 p-0">
      <Navigation />
      <main className="m-0 p-0">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="/src/assets/hero-bridal.jpg"
              alt="Bridal Collection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 text-center space-y-8 px-4">
            <h1 className="text-5xl lg:text-7xl font-['Italiana'] tracking-wide" 
                style={{ 
                  color: '#F8F7F3',
                  textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                }}>
              BRIDAL <span style={{ color: '#D4AF37' }}>COLLECTION</span>
            </h1>
            <p className="text-xl lg:text-2xl font-light tracking-wide text-white/90 max-w-2xl mx-auto">
              Your Dream Day Deserves Dream Wear
            </p>
            <div className="flex justify-center space-x-4">
              <Button className="btn-premium">
                Explore Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Gold Divider */}
        <div 
          className="w-full h-0"
          style={{
            borderTop: '1px solid rgba(212,175,55,0.15)',
            boxShadow: '0 -12px 24px rgba(0,0,0,0.6) inset'
          }}
        />

        {/* Products Section */}
        <section className="section-padding relative overflow-hidden bg-royal-silk">
          <div className="w-full px-4 lg:px-8 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-12 max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-['Italiana'] tracking-wide" 
                  style={{ 
                    color: '#F8F7F3',
                    textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                  }}>
                Discover Our <span style={{ color: '#D4AF37' }}>Bridal Collection</span>
              </h2>
              <p className="mt-4 text-white/70 text-lg max-w-2xl mx-auto">
                Exquisite bridal wear for the most special day of your life, crafted with love, 
                attention to detail, and the finest materials to make you feel like royalty.
              </p>
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
            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-red-400">Error loading products: {error}</p>
              </div>
            ) : transformedProducts.length > 0 ? (
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
                <p className="text-white/70 text-lg">No bridal wear found in this category.</p>
              </div>
            )}
          </div>
        </section>

        {/* Gold Divider */}
        <div 
          className="w-full h-0"
          style={{
            borderTop: '1px solid rgba(212,175,55,0.15)',
            boxShadow: '0 -12px 24px rgba(0,0,0,0.6) inset'
          }}
        />

        {/* Features Section */}
        <section className="section-padding relative overflow-hidden bg-royal-silk">
          <div className="w-full px-4 lg:px-8 relative z-10">
            <div className="py-16 rounded-3xl" style={{ 
              background: 'linear-gradient(145deg, rgba(26, 28, 31, 0.8) 0%, rgba(15, 17, 20, 0.9) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
            }}>
              <div className="w-full px-4 lg:px-8">
                <div className="text-center mb-12">
                  <h3 className="text-3xl lg:text-4xl font-['Playfair_Display'] font-light tracking-wider mb-4" style={{ color: '#F8F7F3' }}>
                    WHY CHOOSE OUR BRIDAL WEAR
                  </h3>
                  <div className="mx-auto w-[120px]">
                    <div className="divider-gold" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-6xl mx-auto">
                  <div className="space-y-4 group">
                    <div className="flex justify-center mb-6">
                      <div className="w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 bg-black border border-gray-600">
                        <span className="text-3xl">👑</span>
                      </div>
                    </div>
                    <div className="text-xl font-['Italiana'] font-medium tracking-wider" style={{ color: '#F8F7F3' }}>
                      Royal Craftsmanship
                    </div>
                    <div className="text-sm font-light tracking-wide" style={{ color: '#C8C8C5' }}>
                      Each piece is crafted with royal precision and attention to detail
                    </div>
                  </div>

                  <div className="space-y-4 group">
                    <div className="flex justify-center mb-6">
                      <div className="w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 bg-black border border-gray-600">
                        <span className="text-3xl">💎</span>
                      </div>
                    </div>
                    <div className="text-xl font-['Italiana'] font-medium tracking-wider" style={{ color: '#F8F7F3' }}>
                      Premium Materials
                    </div>
                    <div className="text-sm font-light tracking-wide" style={{ color: '#C8C8C5' }}>
                      Only the finest silk, velvet, and embellishments for your special day
                    </div>
                  </div>

                  <div className="space-y-4 group">
                    <div className="flex justify-center mb-6">
                      <div className="w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 bg-black border border-gray-600">
                        <span className="text-3xl">✨</span>
                      </div>
                    </div>
                    <div className="text-xl font-['Italiana'] font-medium tracking-wider" style={{ color: '#F8F7F3' }}>
                      Exquisite Embroidery
                    </div>
                    <div className="text-sm font-light tracking-wide" style={{ color: '#C8C8C5' }}>
                      Hand-embroidered with zari, sequins, and precious stones
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Bridal; 