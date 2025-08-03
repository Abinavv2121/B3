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
      className="section-padding relative overflow-hidden"
      style={{
        background: 'linear-gradient(45deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #1a1a2e 75%, #0a0a0a 100%)'
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
            fill="#1a1a1a"
            fillOpacity="0.9"
          />
          <path
            d="M0 16L1200 16L1200 48C1200 48 900 80 600 48C300 16 0 48 0 48V16Z"
            fill="#B76E79"
            fillOpacity="0.15"
          />
        </svg>
      </div>
      
      {/* Diamond/Chevron luxury pattern overlay */}
      <div 
        className="absolute inset-0 opacity-8"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='diamond-luxury' x='0' y='0' width='80' height='80' patternUnits='userSpaceOnUse'%3E%3Cpath d='M40 0L60 20L40 40L20 20L40 0Z' fill='%23B76E79' fill-opacity='0.15'/%3E%3Cpath d='M40 40L60 60L40 80L20 60L40 40Z' fill='%239B5A65' fill-opacity='0.1'/%3E%3Cpath d='M0 40L20 60L40 40L20 20L0 40Z' fill='%23B76E79' fill-opacity='0.12'/%3E%3Cpath d='M80 40L60 20L40 40L60 60L80 40Z' fill='%239B5A65' fill-opacity='0.08'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='80' height='80' fill='url(%23diamond-luxury)'/%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px'
        }}
      />
      
      <div className="w-full px-8 lg:px-16 xl:px-24 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-8 mb-20 max-w-5xl mx-auto">
          <div className="inline-flex items-center space-x-3 mb-6">
            <Sparkles className="w-6 h-6 text-rose-300 animate-pulse" />
            <span 
              className="text-sm font-medium tracking-widest uppercase"
              style={{ color: '#B76E79' }}
            >
              Curated Collections
            </span>
            <Sparkles className="w-6 h-6 text-rose-300 animate-pulse" />
          </div>
          
          <h2 className="text-4xl lg:text-6xl xl:text-7xl font-['Playfair_Display'] font-light tracking-wider">
            <span 
              className="block mb-4"
              style={{ 
                color: '#B76E79',
                textShadow: '0 0 30px rgba(183, 110, 121, 0.3)'
              }}
            >
              DISCOVER YOUR
            </span>
            <span 
              className="block font-['Italiana'] text-3xl lg:text-5xl xl:text-6xl"
              style={{ 
                color: '#FFFFFF',
                textShadow: '0 0 20px rgba(255, 255, 255, 0.2)'
              }}
            >
              PERFECT STYLE
            </span>
          </h2>
          
          <div 
            className="mx-auto mt-8 relative"
            style={{
              width: '150px',
              height: '3px',
              background: 'linear-gradient(90deg, transparent, #B76E79, transparent)'
            }}
          >
            <div 
              className="absolute inset-0 animate-pulse"
              style={{
                background: 'linear-gradient(90deg, transparent, #9B5A65, transparent)',
                animationDuration: '2s'
              }}
            ></div>
          </div>
          
          <p 
            className="text-lg lg:text-xl font-light tracking-wide max-w-3xl mx-auto"
            style={{ color: '#C0C0C0' }}
          >
            Explore our meticulously curated collections, each piece crafted to embody timeless elegance and contemporary sophistication
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8 lg:gap-10 max-w-7xl mx-auto">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group block cursor-pointer"
              onClick={() => handleCategoryClick(category.href)}
            >
              <div 
                className="relative overflow-hidden rounded-3xl transition-all duration-700 hover:scale-105"
                style={{
                  boxShadow: '0 25px 80px rgba(0,0,0,0.4), 0 0 50px rgba(183, 110, 121, 0.1)',
                  border: '1px solid rgba(183, 110, 121, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 35px 100px rgba(0,0,0,0.5), 0 0 70px rgba(183, 110, 121, 0.2)';
                  e.currentTarget.style.border = '1px solid rgba(183, 110, 121, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 25px 80px rgba(0,0,0,0.4), 0 0 50px rgba(183, 110, 121, 0.1)';
                  e.currentTarget.style.border = '1px solid rgba(183, 110, 121, 0.1)';
                }}
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
                  
                  {/* Rose gold accent line */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(90deg, #B76E79, #9B5A65, #B76E79)'
                    }}
                  ></div>
                  
                  {/* Badge */}
                  <div className="absolute top-6 left-6">
                    <Badge 
                      className="bg-white/95 text-foreground backdrop-blur-sm border border-rose-200 font-medium"
                      style={{
                        boxShadow: '0 4px 20px rgba(183, 110, 121, 0.2)'
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
                          style={{ color: '#B76E79' }}
                        >
                          {category.subtitle}
                        </p>
                        <h3 
                          className="text-3xl lg:text-4xl font-['Playfair_Display'] font-light tracking-wider"
                          style={{
                            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                          }}
                        >
                          {category.title}
                        </h3>
                      </div>
                      
                      <p 
                        className="text-white/90 leading-relaxed font-light"
                        style={{
                          textShadow: '0 1px 5px rgba(0,0,0,0.3)'
                        }}
                      >
                        {category.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span 
                          className="text-xl font-['Italiana'] font-medium tracking-wider"
                          style={{ color: '#B76E79' }}
                        >
                          {category.price}
                        </span>
                        
                        <Button 
                          variant="secondary" 
                          className="bg-white/95 hover:bg-white text-foreground group-hover:scale-105 transition-all duration-300 border border-rose-200"
                          style={{
                            boxShadow: '0 4px 20px rgba(183, 110, 121, 0.2)'
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
      
      {/* Elegant geometric separator to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 z-20 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 64"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 64L1200 64L1200 32C1200 32 900 0 600 32C300 64 0 32 0 32V64Z"
            fill="#2d2d2d"
            fillOpacity="0.8"
          />
          <path
            d="M0 48L1200 48L1200 16C1200 16 900 -16 600 16C300 48 0 16 0 16V48Z"
            fill="#C0C0C0"
            fillOpacity="0.1"
          />
        </svg>
      </div>
    </section>
  );
};

export default CategoryShowcase;