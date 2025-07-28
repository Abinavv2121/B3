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

  const topCategories: Record<string, string[]> = {};

  const mainCategories = [
    "SHOP ALL"
  ];

  const leftColumnCategories = {
    "BRIDAL COLLECTIONS": [
      "Bridal Lehangas",
      "Bridal Sarees",
      "Bridal Suits",
      "Heavy Work",
      "Light Work"
    ],
    "SALWAR SUITS": [
      "Straight Cut",
      "A-Line",
      "Palazzo Sets",
      "Sharara Sets",
      "Printed",
      "Embroidered"
    ],
    "ANARKALIS": [
      "Party Wear",
      "Casual Anarkalis",
      "Designer Anarkalis",
      "Heavy Work",
      "Light Work"
    ],
    "LEHANGAS": [
      "Bridal Lehangas",
      "Party Wear",
      "Sangeet Special",
      "Heavy Work",
      "Light Work"
    ],
    "SAREES": [
      "Silk Sarees",
      "Cotton Sarees",
      "Georgette",
      "Chiffon",
      "Designer Sarees"
    ]
  };

  const rightColumnCategories: Record<string, string[]> = {};

  const utilityLinks = [
    "WESTERN",
    "SHIPPING & RETURNS", 
    "CONTACT US"
  ];

  const renderCategoryWithPopup = (category: string, subcategories: string[], hasPlus: boolean = true) => (
    <div 
      className="relative"
      onMouseEnter={() => setHoveredCategory(category)}
      onMouseLeave={() => setHoveredCategory(null)}
    >
      <div className="flex items-center space-x-1 px-3 lg:px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer whitespace-nowrap">
        <span className={`font-serif text-xs lg:text-sm font-medium uppercase tracking-wide transition-colors duration-500 ${
          lastScrollY > window.innerHeight ? 'text-gray-800' : 'text-white'
        }`}>
          {category}
        </span>
        {hasPlus && (
          <Plus className={`h-3 w-3 flex-shrink-0 transition-colors duration-500 ${
            lastScrollY > window.innerHeight ? 'text-purple-600' : 'text-white'
          }`} />
        )}
      </div>
      
      {/* Popup Menu */}
      {hoveredCategory === category && hasPlus && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-in slide-in-from-top-2 duration-200">
          <div className="p-4">
            <div className="space-y-2">
              {subcategories.map((subcategory) => (
                <Link
                  key={subcategory}
                  to={`/${category.toLowerCase().replace(/\s+/g, '-')}/${subcategory.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center justify-between group text-gray-700 hover:text-gray-900 transition-colors py-2 px-3 hover:bg-gray-50 rounded-lg"
                >
                  <span className="text-sm">{subcategory}</span>
                  <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderSimpleLink = (link: string) => (
    <Link
      to={`/${link.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`}
      className={`px-3 lg:px-4 py-3 text-xs lg:text-sm font-medium transition-colors whitespace-nowrap ${
        lastScrollY > window.innerHeight 
          ? 'text-gray-800 hover:text-purple-600' 
          : 'text-white hover:text-gray-200'
      }`}
    >
      {link}
    </Link>
  );

  return (
    <div className={`border-b border-gray-200 shadow-sm fixed top-20 left-0 right-0 z-40 transition-all duration-500 ${
      lastScrollY > 0 ? `bg-white/${Math.min(100, lastScrollY / 2)}` : 'bg-white/10 backdrop-blur-xl'
    }`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-12 overflow-x-auto">
          {/* Left side - Categories with popups */}
          <div className="flex items-center space-x-1 min-w-0">
            {/* Virtual Shopping */}
            {Object.entries(topCategories).map(([category, subcategories]) => 
              renderCategoryWithPopup(category, subcategories)
            )}
            
            {/* Shop All */}
            {mainCategories.map((category) => 
              renderSimpleLink(category)
            )}
            
            {/* Left Column Categories */}
            {Object.entries(leftColumnCategories).map(([category, subcategories]) => 
              renderCategoryWithPopup(category, subcategories)
            )}
          </div>

          {/* Right side - More categories and utility links */}
          <div className="flex items-center space-x-1 min-w-0">
            {/* Right Column Categories */}
            {Object.entries(rightColumnCategories).map(([category, subcategories]) => 
              renderCategoryWithPopup(category, subcategories)
            )}
            
            {/* Utility Links */}
            {utilityLinks.map((link) => 
              renderSimpleLink(link)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportiveToolbar; 