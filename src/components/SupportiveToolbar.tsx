import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, ChevronRight } from "lucide-react";

const SupportiveToolbar = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Scroll event handler
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Main categories that match your database and existing pages
  const mainCategories = [
    "SHOP ALL"
  ];

  // Categories that link to existing pages - removed the items from the picture
  const categoryPages = {
    "BRIDAL COLLECTION": {
      route: "/bridal",
      subcategories: [
        "Bridal Lehangas",
        "Bridal Sarees", 
        "Bridal Suits",
        "Heavy Work",
        "Light Work"
      ]
    },
    "ANARKALI": {
      route: "/anarkali",
      subcategories: [
        "Party Wear",
        "Casual Anarkalis",
        "Designer Anarkalis",
        "Heavy Work",
        "Light Work"
      ]
    },
    "LEHENGA": {
      route: "/lehenga",
      subcategories: [
        "Bridal Lehangas",
        "Party Wear",
        "Sangeet Special",
        "Heavy Work",
        "Light Work"
      ]
    },
    "SAREES": {
      route: "/saree",
      subcategories: [
        "Silk Sarees",
        "Cotton Sarees",
        "Georgette",
        "Chiffon",
        "Designer Sarees"
      ]
    },
    "SALWAR SUIT": {
      route: "/salwar-suit",
      subcategories: [
        "Straight Cut",
        "A-Line",
        "Palazzo Sets",
        "Sharara Sets",
        "Printed",
        "Embroidered"
      ]
    }
  };

  // Removed utility links that were in the picture
  const utilityLinks: string[] = [];

  const renderCategoryWithPopup = (category: string, categoryData: { route: string, subcategories: string[] }) => (
    <div 
      className="relative group"
      onMouseEnter={() => setHoveredCategory(category)}
      onMouseLeave={() => setHoveredCategory(null)}
    >
      <div className="flex items-center space-x-1 px-4 py-3 rounded-lg transition-colors cursor-pointer hover:bg-white/10">
        <Link 
          to={categoryData.route}
          className={`font-italiana text-sm font-medium uppercase tracking-wide transition-colors duration-500 whitespace-nowrap ${
            lastScrollY > window.innerHeight ? 'text-gray-800 hover:text-purple-600' : 'text-white hover:text-gray-200'
          }`}
        >
          {category}
        </Link>
        <Plus className={`h-3 w-3 flex-shrink-0 transition-colors duration-500 ${
          lastScrollY > window.innerHeight ? 'text-purple-600' : 'text-white'
        }`} />
      </div>
      
      {/* Popup Menu */}
      {hoveredCategory === category && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-xl z-50 animate-in slide-in-from-top-2 duration-200">
          {/* Arrow pointing up */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45"></div>
          
          <div className="p-4">
            <div className="space-y-1">
              {categoryData.subcategories.map((subcategory) => (
                <Link
                  key={subcategory}
                  to={`${categoryData.route}?filter=${encodeURIComponent(subcategory)}`}
                  className="flex items-center justify-between group/item text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 py-2 px-3 rounded-md"
                >
                  <span className="text-sm font-medium">{subcategory}</span>
                  <ChevronRight className="h-3 w-3 opacity-0 group-hover/item:opacity-100 transition-opacity flex-shrink-0 text-gray-400" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderSimpleLink = (link: string) => {
    // Handle special cases for utility links
    const routeMap: Record<string, string> = {
      "SHOP ALL": "/"
    };

    const route = routeMap[link] || `/${link.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`;

    return (
      <Link
        to={route}
        className={`px-4 py-3 text-sm font-medium font-italiana transition-colors whitespace-nowrap hover:bg-white/10 rounded-lg ${
          lastScrollY > window.innerHeight 
            ? 'text-gray-800 hover:text-purple-600' 
            : 'text-white hover:text-gray-200'
        }`}
      >
        {link}
      </Link>
    );
  };

  return (
    <div className={`border-b border-gray-200 shadow-sm fixed top-20 left-0 right-0 z-40 transition-all duration-500 ${
      lastScrollY > 0 ? `bg-white/${Math.min(100, lastScrollY / 2)}` : 'bg-white/10 backdrop-blur-xl'
    }`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-center h-14">
          {/* Centered navigation items */}
          <div className="flex items-center space-x-6">
            {/* Shop All */}
            {mainCategories.map((category) => 
              renderSimpleLink(category)
            )}
            
            {/* Category Pages */}
            {Object.entries(categoryPages).map(([category, categoryData]) => 
              renderCategoryWithPopup(category, categoryData)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportiveToolbar; 