import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";
import sareeImage from "/src/assets/saree.jpg";
import anarkaliImage from "/src/assets/anarkali.jpg";
import lehengaImage from "/src/assets/lehenga.jpg";
import salwarSuitImage from "/src/assets/salwarsuit.jpg";
import westernImage from "/src/assets/western.jpg";
import bridalImage from "/src/assets/bridal.png";

const CategoryShowcase = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (href: string) => {
    // Navigate and replace current history entry to prevent back button issues
    navigate(href, { replace: true });
    // Force scroll to top immediately
    window.scrollTo(0, 0);
  };

  const categories = [
    {
      id: 1,
      title: "SAREE",
      subtitle: "Traditional Elegance",
      description: "Exquisite handwoven sarees for every occasion",
      image: sareeImage,
      price: "Starting ₹15,999",
      products: "200+ Designs",
      href: "/saree",
      gradient: "from-rose-500 to-pink-600",
      badge: "Traditional"
    },
    {
      id: 2,
      title: "ANARKALI",
      subtitle: "Royal Grace",
      description: "Flowing anarkali suits that embody timeless beauty",
      image: anarkaliImage,
      price: "Starting ₹12,999",
      products: "150+ Designs",
      href: "/anarkali",
      gradient: "from-purple-500 to-indigo-600",
      badge: "Elegant"
    },
    {
      id: 3,
      title: "LEHENGA",
      subtitle: "Festive Grandeur",
      description: "Stunning lehengas for celebrations and special moments",
      image: lehengaImage,
      price: "Starting ₹25,999",
      products: "100+ Designs",
      href: "/lehenga",
      gradient: "from-amber-500 to-orange-600",
      badge: "Festive"
    },
    {
      id: 4,
      title: "SALWAR SUIT",
      subtitle: "Comfort Meets Style",
      description: "Versatile salwar suits perfect for daily wear and occasions",
      image: salwarSuitImage,
      price: "Starting ₹8,999",
      products: "300+ Designs",
      href: "/salwar-suit",
      gradient: "from-emerald-500 to-teal-600",
      badge: "Versatile"
    },
    {
      id: 5,
      title: "WESTERN WEAR",
      subtitle: "Modern Fusion",
      description: "Contemporary western wear with ethnic touches",
      image: westernImage,
      price: "Starting ₹6,999",
      products: "120+ Designs",
      href: "/western",
      gradient: "from-blue-500 to-cyan-600",
      badge: "Modern"
    },
    {
      id: 6,
      title: "BRIDAL COLLECTION",
      subtitle: "Your Dream Day",
      description: "Exquisite bridal wear for the most special day",
      image: bridalImage,
      price: "Starting ₹45,999",
      products: "80+ Designs",
      href: "/bridal",
      gradient: "from-red-500 to-rose-600",
      badge: "Premium"
    }
  ];

  return (
    <section 
      className="section-padding relative overflow-hidden discover-style-section"
    >

      

      
      <div className="w-full px-8 lg:px-16 xl:px-24 relative z-10">
        {/* Minimalist Section Header */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-['Italiana'] tracking-wide" 
              style={{ 
                color: '#F8F7F3',
                textShadow: '0 2px 4px rgba(0,0,0,0.8)'
              }}>
            Discover Your <span style={{ color: '#D4AF37' }}>Perfect Style</span>
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group block cursor-pointer"
              onClick={() => handleCategoryClick(category.href)}
            >
              <div 
                className="style-category-card relative overflow-hidden rounded-3xl transition-all duration-700 hover:scale-105"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Luxury gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* Gold accent line */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(90deg, #D4AF37, #C08E5D, #D4AF37)'
                    }}
                  ></div>
                  
                  {/* Badge */}
                  <div className="absolute top-6 left-6">
                    <Badge 
                      className="font-medium backdrop-blur-sm border"
                      style={{
                        backgroundColor: '#D4AF37',
                        color: '#0B0F14',
                        borderColor: '#C08E5D',
                        boxShadow: '0 4px 20px rgba(212, 175, 55, 0.3)'
                      }}
                    >
                      {category.badge}
                    </Badge>
                  </div>

                  {/* Floating Stats */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-x-4 group-hover:translate-x-0">
                    <div 
                      className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 text-sm font-medium border border-rose-200"
                      style={{
                        boxShadow: '0 4px 20px rgba(183, 110, 121, 0.2)'
                      }}
                    >
                      {category.products}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-6 left-6 right-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-8 group-hover:translate-y-0">
                    <div className="space-y-6">
                      <div>
                        <p 
                          className="text-sm font-medium tracking-widest uppercase mb-2"
                          style={{ color: '#C08E5D' }}
                        >
                          {category.subtitle}
                        </p>
                        <h3 
                          className="text-3xl lg:text-4xl font-['Playfair_Display'] font-light tracking-wider"
                          style={{
                            color: '#F8F7F3',
                            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                          }}
                        >
                          {category.title}
                        </h3>
                      </div>
                      
                      <p 
                        className="leading-relaxed font-light"
                        style={{
                          color: '#C8C8C5',
                          textShadow: '0 1px 5px rgba(0,0,0,0.3)'
                        }}
                      >
                        {category.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span 
                          className="text-xl font-['Italiana'] font-medium tracking-wider"
                          style={{ color: '#D4AF37' }}
                        >
                          {category.price}
                        </span>
                        
                        <Button 
                          size="default"
                          className="px-6 py-2.5 text-sm font-medium font-italiana transition-all duration-300 border hover:scale-105 hover:shadow-lg"
                          style={{
                            borderColor: '#C08E5D',
                            backgroundColor: 'transparent',
                            color: '#F8F7F3'
                          }}
                        >
                          Explore
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      

    </section>
  );
};

export default CategoryShowcase;