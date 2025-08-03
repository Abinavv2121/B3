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
    <section 
      className="section-padding relative overflow-hidden"
      style={{
        background: 'radial-gradient(circle at center, #2d2d2d 0%, #1a1a1a 25%, #0f0f0f 50%, #1a1a1a 75%, #2d2d2d 100%)'
      }}
    >
      {/* Elegant geometric separator from previous section */}
      <div className="absolute top-0 left-0 right-0 h-16 z-20 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 64"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0L1200 0L1200 32C1200 32 900 64 600 32C300 0 0 32 0 32V0Z"
            fill="#1a1a2e"
            fillOpacity="0.9"
          />
          <path
            d="M0 16L1200 16L1200 48C1200 48 900 80 600 48C300 16 0 48 0 48V16Z"
            fill="#C0C0C0"
            fillOpacity="0.12"
          />
        </svg>
      </div>
      
      {/* Hexagonal honeycomb luxury pattern overlay */}
      <div 
        className="absolute inset-0 opacity-6"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='honeycomb-luxury' x='0' y='0' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Cpath d='M50 0L75 25L75 75L50 100L25 75L25 25L50 0Z' fill='%23C0C0C0' fill-opacity='0.12'/%3E%3Cpath d='M0 50L25 25L75 25L100 50L75 75L25 75L0 50Z' fill='%23A0A0A0' fill-opacity='0.08'/%3E%3Cpath d='M25 25L50 0L75 25L50 50L25 25Z' fill='%23C0C0C0' fill-opacity='0.1'/%3E%3Cpath d='M25 75L50 100L75 75L50 50L25 75Z' fill='%23A0A0A0' fill-opacity='0.06'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23honeycomb-luxury)'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}
      />
      
      <div className="w-full px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-8 mb-20 max-w-5xl mx-auto">
          <div className="inline-flex items-center space-x-3 mb-6">
            <Crown className="w-6 h-6 text-gray-300 animate-pulse" />
            <span 
              className="text-sm font-medium tracking-widest uppercase"
              style={{ color: '#C0C0C0' }}
            >
              Premium Selection
            </span>
            <Crown className="w-6 h-6 text-gray-300 animate-pulse" />
          </div>
          
          <h2 className="text-4xl lg:text-6xl xl:text-7xl font-['Playfair_Display'] font-light tracking-wider">
            <span 
              className="block mb-4"
              style={{ 
                color: '#C0C0C0',
                textShadow: '0 0 30px rgba(192, 192, 192, 0.3)'
              }}
            >
              FEATURED
            </span>
            <span 
              className="block font-['Italiana'] text-3xl lg:text-5xl xl:text-6xl"
              style={{ 
                color: '#FFFFFF',
                textShadow: '0 0 20px rgba(255, 255, 255, 0.2)'
              }}
            >
              COLLECTIONS
            </span>
          </h2>
          
          <div 
            className="mx-auto mt-8 relative"
            style={{
              width: '150px',
              height: '3px',
              background: 'linear-gradient(90deg, transparent, #C0C0C0, transparent)'
            }}
          >
            <div 
              className="absolute inset-0 animate-pulse"
              style={{
                background: 'linear-gradient(90deg, transparent, #A0A0A0, transparent)',
                animationDuration: '2s'
              }}
            ></div>
          </div>
          
          <p 
            className="text-lg lg:text-xl font-light tracking-wide max-w-3xl mx-auto"
            style={{ color: '#C0C0C0' }}
          >
            Discover our most coveted pieces, handpicked to showcase the pinnacle of craftsmanship and design excellence
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-16">
          <div 
            className="flex space-x-1 p-2 rounded-2xl backdrop-blur-sm"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(192, 192, 192, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}
          >
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
                style={{
                  backgroundColor: activeFilter === filter.id 
                    ? 'rgba(192, 192, 192, 0.2)' 
                    : 'transparent',
                  border: activeFilter === filter.id 
                    ? '1px solid rgba(192, 192, 192, 0.4)' 
                    : '1px solid transparent'
                }}
              >
                {filter.name}
                <span 
                  className="ml-2 text-xs opacity-70"
                  style={{ color: activeFilter === filter.id ? '#C0C0C0' : '#C0C0C0' }}
                >
                  ({filter.count})
                </span>
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
          <div 
            className="py-16 rounded-3xl backdrop-blur-sm"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(192, 192, 192, 0.1)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
            }}
          >
            <div className="w-full px-4 lg:px-8">
              <div className="text-center mb-12">
                <h3 
                  className="text-3xl lg:text-4xl font-['Playfair_Display'] font-light tracking-wider mb-4"
                  style={{ 
                    color: '#C0C0C0',
                    textShadow: '0 0 20px rgba(192, 192, 192, 0.2)'
                  }}
                >
                  PREMIUM SERVICES
                </h3>
                <div 
                  className="mx-auto relative"
                  style={{
                    width: '100px',
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, #C0C0C0, transparent)'
                  }}
                ></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center max-w-6xl mx-auto">
                <div className="space-y-4 group">
                  <div className="flex justify-center mb-6">
                    <div 
                      className="w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                      style={{
                        backgroundColor: 'rgba(192, 192, 192, 0.1)',
                        border: '2px solid rgba(192, 192, 192, 0.3)',
                        boxShadow: '0 8px 32px rgba(192, 192, 192, 0.2)'
                      }}
                    >
                      <img 
                        src={shippingIcon} 
                        alt="Free Shipping" 
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  </div>
                  <div 
                    className="text-xl font-['Italiana'] font-medium tracking-wider"
                    style={{ color: '#C0C0C0' }}
                  >
                    Free Shipping
                  </div>
                  <div 
                    className="text-sm font-light tracking-wide"
                    style={{ color: '#C0C0C0' }}
                  >
                    On orders above ₹29,999
                  </div>
                </div>
                
                <div className="space-y-4 group">
                  <div className="flex justify-center mb-6">
                    <div 
                      className="w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                      style={{
                        backgroundColor: 'rgba(192, 192, 192, 0.1)',
                        border: '2px solid rgba(192, 192, 192, 0.3)',
                        boxShadow: '0 8px 32px rgba(192, 192, 192, 0.2)'
                      }}
                    >
                      <img 
                        src={returnIcon} 
                        alt="Easy Returns" 
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  </div>
                  <div 
                    className="text-xl font-['Italiana'] font-medium tracking-wider"
                    style={{ color: '#C0C0C0' }}
                  >
                    Easy Returns
                  </div>
                  <div 
                    className="text-sm font-light tracking-wide"
                    style={{ color: '#C0C0C0' }}
                  >
                    15-day return policy
                  </div>
                </div>
                
                <div className="space-y-4 group">
                  <div className="flex justify-center mb-6">
                    <div 
                      className="w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                      style={{
                        backgroundColor: 'rgba(192, 192, 192, 0.1)',
                        border: '2px solid rgba(192, 192, 192, 0.3)',
                        boxShadow: '0 8px 32px rgba(192, 192, 192, 0.2)'
                      }}
                    >
                      <img 
                        src={secureIcon} 
                        alt="Secure Payment" 
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                  </div>
                  <div 
                    className="text-xl font-['Italiana'] font-medium tracking-wider"
                    style={{ color: '#C0C0C0' }}
                  >
                    Secure Payment
                  </div>
                  <div 
                    className="text-sm font-light tracking-wide"
                    style={{ color: '#C0C0C0' }}
                  >
                    SSL encrypted checkout
                  </div>
                </div>
                
                <div className="space-y-4 group">
                  <div className="flex justify-center mb-6">
                    <div 
                      className="w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                      style={{
                        backgroundColor: 'rgba(192, 192, 192, 0.1)',
                        border: '2px solid rgba(192, 192, 192, 0.3)',
                        boxShadow: '0 8px 32px rgba(192, 192, 192, 0.2)'
                      }}
                    >
                      <img 
                        src={emiIcon} 
                        alt="EMI Available" 
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                  </div>
                  <div 
                    className="text-xl font-['Italiana'] font-medium tracking-wider"
                    style={{ color: '#C0C0C0' }}
                  >
                    EMI Available
                  </div>
                  <div 
                    className="text-sm font-light tracking-wide"
                    style={{ color: '#C0C0C0' }}
                  >
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