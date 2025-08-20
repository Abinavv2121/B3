import { useState, useEffect, useCallback, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import { GoldDivider } from "@/components/ui/gold-divider";
import { supabaseUtils } from "@/hooks/useSupabase";
import { ProductRow, FilterOption } from "@/types";
import { PRODUCT_CONFIG } from "@/constants";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

/**
 * Saree category page with optimized structure and reusable components
 */
const Saree = () => {
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");

  // Memoize filters to prevent unnecessary re-renders
  const filters: FilterOption[] = useMemo(() => [
    { id: "all", name: "All Sarees", count: 0 },
    { id: "Silk", name: "Silk Sarees", count: 0 },
    { id: "Georgette", name: "Georgette Sarees", count: 0 },
    { id: "Designer", name: "Designer Sarees", count: 0 },
    { id: "Bridal", name: "Bridal Sarees", count: 0 },
    { id: "Party", name: "Party Wear", count: 0 },
    { id: "Casual", name: "Casual Sarees", count: 0 }
  ], []);

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabaseUtils.getProductsBySection(PRODUCT_CONFIG.CATEGORIES.SAREES);
      if (error) {
        setError(error.message);
      } else {
        setProducts(data || []);
      }
    } catch (err) {
      setError("Failed to load products");
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleFilterChange = useCallback((filterId: string) => {
    setActiveFilter(filterId);
  }, []);

  // Update filter counts when products change
  const updatedFilters = useMemo(() => {
    return filters.map(filter => {
      if (filter.id === "all") {
        return { ...filter, count: products.length };
      } else {
        const count = products.filter(p => 
          p.design?.includes(filter.id) || p.name.includes(filter.id)
        ).length;
        return { ...filter, count };
      }
    });
  }, [filters, products]);

  return (
    <div className="min-h-screen m-0 p-0">
      <Navigation />
      <main className="m-0 p-0">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="/src/assets/saree.jpg"
              alt="Saree Collection"
              className="w-full h-full object-contain object-center"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain'
              }}
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
              SAREE <span style={{ color: '#D4AF37' }}>COLLECTION</span>
            </h1>
            <p className="text-xl lg:text-2xl font-light tracking-wide text-white/90 max-w-2xl mx-auto">
              Traditional Elegance Meets Modern Grace
            </p>
            <div className="flex justify-center space-x-4">
              <Button className="btn-premium">
                Explore Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        <GoldDivider />

        {/* Products Section */}
        <ProductGrid
          products={products}
          isLoading={isLoading}
          error={error}
          filters={updatedFilters}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          title="Discover Our Saree Collection"
          subtitle="From handwoven silk to contemporary georgette, explore our curated collection of sarees that celebrate the timeless beauty of Indian tradition."
        />

        <GoldDivider />

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
                    WHY CHOOSE OUR SAREE
                  </h3>
                  <div className="mx-auto w-[120px]">
                    <div className="divider-gold" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-6xl mx-auto">
                  <div className="space-y-4 group">
                    <div className="flex justify-center mb-6">
                      <div className="w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 bg-black border border-gray-600">
                        <span className="text-3xl">🎨</span>
                      </div>
                    </div>
                    <div className="text-xl font-['Italiana'] font-medium tracking-wider" style={{ color: '#F8F7F3' }}>
                      Handcrafted Excellence
                    </div>
                    <div className="text-sm font-light tracking-wide" style={{ color: '#C8C8C5' }}>
                      Each saree is meticulously crafted by skilled artisans with decades of experience
                    </div>
                  </div>

                  <div className="space-y-4 group">
                    <div className="flex justify-center mb-6">
                      <div className="w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 bg-black border border-gray-600">
                        <span className="text-3xl">🌟</span>
                      </div>
                    </div>
                    <div className="text-xl font-['Italiana'] font-medium tracking-wider" style={{ color: '#F8F7F3' }}>
                      Premium Materials
                    </div>
                    <div className="text-sm font-light tracking-wide" style={{ color: '#C8C8C5' }}>
                      We use only the finest silk, georgette, and other premium fabrics
                    </div>
                  </div>

                  <div className="space-y-4 group">
                    <div className="flex justify-center mb-6">
                      <div className="w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 bg-black border border-gray-600">
                        <span className="text-3xl">💎</span>
                      </div>
                    </div>
                    <div className="text-xl font-['Italiana'] font-medium tracking-wider" style={{ color: '#F8F7F3' }}>
                      Unique Designs
                    </div>
                    <div className="text-sm font-light tracking-wide" style={{ color: '#C8C8C5' }}>
                      Exclusive designs that blend traditional motifs with contemporary aesthetics
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

export default Saree; 