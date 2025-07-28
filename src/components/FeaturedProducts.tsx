import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "./ProductCard";
import { Sparkles, ArrowRight, Filter } from "lucide-react";
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
    <section className="section-padding bg-white">
      <div className="w-full px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-6 mb-16 max-w-4xl mx-auto">
          <h2 className="text-4xl lg:text-6xl font-serif font-bold">
            <span className="text-cultural">Featured</span>
            <br />
            <span className="text-foreground">Collections</span>
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 lg:gap-8 mb-16 w-full">
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
        <div className="mt-20">
          <div className="bg-gray-50 py-12">
            <div className="w-full px-4 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center max-w-6xl mx-auto">
                <div className="space-y-3">
                  <div className="flex justify-center mb-4">
                    <img 
                      src={shippingIcon} 
                      alt="Free Shipping" 
                      className="w-40 h-40 object-contain"
                    />
                  </div>
                  <div className="text-lg font-medium" style={{ color: '#8B4A4A' }}>Free Shipping</div>
                  <div className="text-muted-foreground">On orders above ₹29,999</div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-center mb-4">
                    <img 
                      src={returnIcon} 
                      alt="Easy Returns" 
                      className="w-40 h-40 object-contain"
                    />
                  </div>
                  <div className="text-lg font-medium" style={{ color: '#8B4A4A' }}>Easy Returns</div>
                  <div className="text-muted-foreground">15-day return policy</div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-center mb-4">
                    <img 
                      src={secureIcon} 
                      alt="Secure Payment" 
                      className="w-40 h-40 object-contain"
                    />
                  </div>
                  <div className="text-lg font-medium" style={{ color: '#8B4A4A' }}>Secure Payment</div>
                  <div className="text-muted-foreground">SSL encrypted checkout</div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-center mb-4" style={{ paddingTop: '32px' }}>
                    <img 
                      src={emiIcon} 
                      alt="EMI Available" 
                      className="w-32 h-32 object-contain"
                    />
                  </div>
                  <div className="text-lg font-medium" style={{ color: '#8B4A4A' }}>EMI Available</div>
                  <div className="text-muted-foreground">No cost EMI options</div>
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