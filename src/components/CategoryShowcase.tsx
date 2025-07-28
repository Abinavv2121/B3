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
    <section className="section-padding bg-gradient-subtle">
      <div className="w-full px-8 lg:px-16 xl:px-24">
        {/* Section Header */}
        <div className="text-center space-y-6 mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-5xl font-serif font-bold">
            <span className="text-cultural">Discover Your</span>
            <br />
            <span className="text-foreground">Perfect Style</span>
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group block cursor-pointer"
              onClick={() => handleCategoryClick(category.href)}
            >
              <div className="card-premium overflow-hidden hover-glow transition-all duration-500">
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Badge */}
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-white/90 text-foreground backdrop-blur-sm">
                      {category.badge}
                    </Badge>
                  </div>

                  {/* Floating Stats */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-sm font-medium">
                      {category.products}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm opacity-90 uppercase tracking-wide">
                          {category.subtitle}
                        </p>
                        <h3 className="text-3xl font-serif font-bold">
                          {category.title}
                        </h3>
                      </div>
                      
                      <p className="text-white/90 leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                        {category.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold">
                          {category.price}
                        </span>
                        
                        <Button 
                          variant="secondary" 
                          className="bg-white/90 hover:bg-white text-foreground group-hover:scale-105 transition-transform duration-300"
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