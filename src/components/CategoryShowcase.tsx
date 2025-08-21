import React, { useCallback, memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles } from 'lucide-react';
import sareeImage from '/src/assets/saree.jpg';
import anarkaliImage from '/src/assets/anarkali.jpg';
import lehengaImage from '/src/assets/lehenga.jpg';
import salwarSuitImage from '/src/assets/salwarsuit.jpg';
import westernImage from '/src/assets/western.jpg';
import bridalImage from '/src/assets/bridal.png';

const CategoryShowcase = memo(() => {
  const navigate = useNavigate();

  // Memoized navigation handler
  const handleCategoryClick = useCallback((href: string) => {
    // Navigate and replace current history entry to prevent back button issues
    navigate(href, { replace: true });
    // Force scroll to top immediately
    window.scrollTo(0, 0);
  }, [navigate]);

  // Memoized categories array
  const categories = useMemo(() => [
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
  ], []);

  return (
    <section 
      className="section-padding relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(180deg, #1E293B 0%, #334155 25%, #475569 50%, #64748B 75%, #94A3B8 100%)'
      }}
    >
      {/* Subtle, organic texture overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 75%, rgba(245, 158, 11, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 75% 25%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="w-full px-4 lg:px-8 relative z-10">
        {/* Refined Section Header */}
        <div className="text-center mb-6 max-w-4xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-['Italiana'] tracking-wide mb-6" 
              style={{ 
                color: '#F8FAFC',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}>
            Discover Your <span style={{ color: '#F59E0B' }}>Perfect Style</span>
          </h2>
          <p className="text-lg text-slate-300 font-light max-w-2xl mx-auto">
            Explore our curated collections designed to celebrate your unique elegance
          </p>
        </div>

        {/* Refined Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 mb-12 w-[70%] mx-auto">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group cursor-pointer"
              onClick={() => handleCategoryClick(category.href)}
            >
              <div className="relative overflow-hidden rounded-sm bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-xl border border-slate-600/40 shadow-sm hover:shadow-md transition-all duration-500 hover:scale-[1.02]">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-700/40 to-slate-600/40 opacity-60"></div>
                
                {/* Image Container */}
                <div className="relative aspect-[2/3] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                  
                  {/* Refined Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500`} />
                  
                  {/* Refined Badge */}
                  <div className="absolute top-0.5 left-0.5">
                    <Badge className={`bg-gradient-to-r ${category.gradient} text-white text-xs px-0.5 py-0 border-0 shadow-sm`}>
                      {category.badge}
                    </Badge>
                  </div>
                  
                  {/* Refined Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-1.5 text-white">
                    <h3 className="font-['Italiana'] text-xs font-semibold mb-0.5 group-hover:text-amber-300 transition-colors duration-300">
                      {category.title}
                    </h3>
                    <p className="text-xs text-gray-200 mb-0.5 font-light">
                      {category.subtitle}
                    </p>
                    <p className="text-xs text-gray-300 mb-1 leading-relaxed">
                      {category.description}
                    </p>
                    
                    {/* Refined Price and Products */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-amber-300">
                        {category.price}
                      </span>
                      <span className="text-slate-300">
                        {category.products}
                      </span>
                    </div>
                  </div>
                  
                  {/* Refined Hover Effect - Arrow */}
                  <div className="absolute top-1/2 right-1.5 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                    <div className="w-5 h-5 bg-slate-800/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md border border-slate-600/50">
                      <ArrowRight className="w-2.5 h-2.5 text-slate-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Refined Call to Action */}
        <div className="text-center">
          <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-10 py-4 text-lg font-medium rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <Sparkles className="mr-2 h-5 w-5" />
            Explore All Categories
          </Button>
        </div>
      </div>
    </section>
  );
});

CategoryShowcase.displayName = 'CategoryShowcase';

export { CategoryShowcase };