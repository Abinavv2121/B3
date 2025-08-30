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

const Gown = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", name: "All Gowns", count: 0 },
    { id: "Bridal", name: "Bridal Gowns", count: 0 },
    { id: "Party", name: "Party Gowns", count: 0 },
    { id: "Designer", name: "Designer Gowns", count: 0 },
    { id: "Festival", name: "Festival Gowns", count: 0 },
    { id: "Casual", name: "Casual Gowns", count: 0 }
  ];

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabaseUtils.getProductsBySection('gown');
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
    type: "gown"
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
              src="/src/assets/bridal.png"
              alt="Gown Collection"
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
              GOWN COLLECTION
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Discover our stunning collection of elegant gowns, perfect for every special occasion
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-brand shadow-lg"
                onClick={() => document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products-section" className="py-16 px-4 bg-gradient-to-br from-slate-50 to-amber-50">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-800 mb-4 font-hind">
                Elegant Gown Collection
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                From bridal elegance to party glamour, our gowns are crafted with the finest materials and exquisite designs
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={activeFilter === filter.id ? "default" : "outline"}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`font-hind ${
                    activeFilter === filter.id
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0"
                      : "border-slate-300 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {filter.name}
                  <Badge variant="secondary" className="ml-2 bg-white/20 text-white">
                    {filter.count}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-400 mx-auto mb-4"></div>
                <p className="text-slate-600 text-lg">Loading beautiful gowns...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-16">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                  <p className="text-red-600 mb-4">Failed to load products</p>
                  <Button 
                    onClick={loadProducts}
                    variant="outline"
                    className="border-red-300 text-red-600 hover:bg-red-50"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            )}

            {/* Products Grid */}
            {!isLoading && !error && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {transformedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    additionalImages={[]}
                  />
                ))}
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !error && transformedProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 max-w-md mx-auto">
                  <ShoppingBag className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">No gowns found</h3>
                  <p className="text-slate-600 mb-4">
                    {activeFilter === "all" 
                      ? "We're currently updating our gown collection. Check back soon!"
                      : `No gowns match the "${activeFilter}" filter. Try a different filter.`
                    }
                  </p>
                  {activeFilter !== "all" && (
                    <Button 
                      onClick={() => setActiveFilter("all")}
                      variant="outline"
                      className="border-slate-300 text-slate-600 hover:bg-slate-100"
                    >
                      View All Gowns
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gradient-to-br from-amber-100 to-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2 font-hind">Premium Quality</h3>
                <p className="text-slate-600">Crafted with the finest fabrics and attention to detail</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-br from-amber-100 to-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2 font-hind">Timeless Design</h3>
                <p className="text-slate-600">Classic elegance that never goes out of style</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-br from-amber-100 to-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2 font-hind">Perfect Fit</h3>
                <p className="text-slate-600">Available in multiple sizes for the perfect fit</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Gown;
