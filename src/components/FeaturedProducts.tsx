import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "./ProductCard";
import { Sparkles, ArrowRight, Filter, Crown } from "lucide-react";
import heroBridal from "@/assets/hero-bridal.jpg";
import festivalSaree from "@/assets/festival-saree.jpg";
import anarkaliPurple from "@/assets/anarkali-purple.jpg";
import shararaRoseGold from "@/assets/sharara-rose-gold.jpg";
import shippingIcon from "/src/assets/shipping.png";
import returnIcon from "/src/assets/return.png";
import secureIcon from "/src/assets/secure.png";
import emiIcon from "/src/assets/emi.png";

const FeaturedProducts = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", name: "All", count: 24 },
    { id: "bridal", name: "Bridal", count: 8 },
    { id: "festival", name: "Festival", count: 6 },
    { id: "special", name: "Special", count: 5 },
    { id: "western", name: "Western", count: 5 }
  ];

  const products = [
    {
      id: "1",
      name: "Royal Emerald Bridal Lehenga",
      category: "Bridal Collection",
      price: 45999,
      originalPrice: 52999,
      image: heroBridal,
      rating: 4.9,
      reviews: 156,
      isNew: false,
      isBestSeller: true,
      colors: ["#10B981", "#DC2626", "#7C3AED", "#F59E0B"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      type: "bridal"
    },
    {
      id: "2",
      name: "Premium Silk Festival Saree",
      category: "Festival Glory",
      price: 18999,
      originalPrice: 24999,
      image: festivalSaree,
      rating: 4.8,
      reviews: 203,
      isNew: false,
      isBestSeller: true,
      colors: ["#DC2626", "#F59E0B", "#10B981", "#7C3AED"],
      sizes: ["Free Size"],
      type: "festival"
    },
    {
      id: "3",
      name: "Elegant Purple Anarkali",
      category: "Special Moments",
      price: 12999,
      originalPrice: 16999,
      image: anarkaliPurple,
      rating: 4.7,
      reviews: 89,
      isNew: true,
      isBestSeller: false,
      colors: ["#7C3AED", "#EC4899", "#10B981", "#F59E0B"],
      sizes: ["XS", "S", "M", "L", "XL"],
      type: "special"
    },
    {
      id: "4",
      name: "Rose Gold Sharara Set",
      category: "Western Edge",
      price: 8999,
      originalPrice: 11999,
      image: shararaRoseGold,
      rating: 4.6,
      reviews: 134,
      isNew: true,
      isBestSeller: false,
      colors: ["#F59E0B", "#EC4899", "#10B981", "#7C3AED"],
      sizes: ["S", "M", "L", "XL"],
      type: "western"
    },
    {
      id: "5",
      name: "Majestic Red Bridal Lehenga",
      category: "Bridal Collection",
      price: 38999,
      originalPrice: 45999,
      image: heroBridal,
      rating: 4.9,
      reviews: 98,
      isNew: false,
      isBestSeller: true,
      colors: ["#DC2626", "#10B981", "#7C3AED", "#F59E0B"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      type: "bridal"
    },
    {
      id: "6",
      name: "Golden Festival Silk Saree",
      category: "Festival Glory",
      price: 15999,
      originalPrice: 19999,
      image: festivalSaree,
      rating: 4.8,
      reviews: 167,
      isNew: false,
      isBestSeller: false,
      colors: ["#F59E0B", "#DC2626", "#10B981", "#7C3AED"],
      sizes: ["Free Size"],
      type: "festival"
    },
    {
      id: "7",
      name: "Designer Teal Anarkali",
      category: "Special Moments",
      price: 14999,
      originalPrice: 18999,
      image: anarkaliPurple,
      rating: 4.7,
      reviews: 76,
      isNew: true,
      isBestSeller: false,
      colors: ["#06B6D4", "#EC4899", "#10B981", "#F59E0B"],
      sizes: ["XS", "S", "M", "L", "XL"],
      type: "special"
    },
    {
      id: "8",
      name: "Modern Palazzo Set",
      category: "Western Edge",
      price: 9999,
      originalPrice: 13999,
      image: shararaRoseGold,
      rating: 4.5,
      reviews: 123,
      isNew: false,
      isBestSeller: false,
      colors: ["#EC4899", "#10B981", "#7C3AED", "#F59E0B"],
      sizes: ["S", "M", "L", "XL"],
      type: "western"
    }
  ];

  const filteredProducts = activeFilter === "all" 
    ? products 
    : products.filter(product => product.type === activeFilter);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8 lg:gap-10 mb-20 w-full">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

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