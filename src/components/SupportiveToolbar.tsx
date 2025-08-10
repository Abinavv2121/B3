import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SupportiveToolbar = () => {

  const [lastScrollY, setLastScrollY] = useState(0);
  const [isInCustomerFavs, setIsInCustomerFavs] = useState(false);

  // Scroll event handler
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Check if supportive toolbar has reached the bottom of hero section
      const heroSection = document.getElementById('hero-section');
      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        const supportiveToolbarHeight = 56; // h-14 = 56px
        const navigationHeight = 80; // h-20 = 80px
        const totalHeaderHeight = navigationHeight + supportiveToolbarHeight;
        
        // When hero bottom is at or above the total header height, make opaque
        const shouldBeOpaque = heroRect.bottom <= totalHeaderHeight;
        setIsInCustomerFavs(shouldBeOpaque);
      }
      

      
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
    <Link
      to={categoryData.route}
      className={`px-6 py-2.5 text-sm font-medium font-italiana transition-all duration-300 whitespace-nowrap hover:bg-white/10 rounded-lg border border-transparent hover:border-white/20 ${
        isInCustomerFavs 
          ? 'text-white hover:text-gray-200'
          : (lastScrollY > window.innerHeight ? 'text-gray-800 hover:text-purple-600' : 'text-white hover:text-gray-200')
      }`}
    >
      {category}
    </Link>
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
        className={`px-6 py-2.5 text-sm font-medium font-italiana transition-all duration-300 whitespace-nowrap hover:bg-white/10 rounded-lg border border-transparent hover:border-white/20 ${
          isInCustomerFavs 
            ? 'text-white hover:text-gray-200'
            : (lastScrollY > window.innerHeight ? 'text-gray-800 hover:text-purple-600' : 'text-white hover:text-gray-200')
        }`}
      >
        {link}
      </Link>
    );
  };

  return (
    <div 
      className="border-b border-gray-200 shadow-sm fixed top-20 left-0 right-0 z-40 transition-all duration-500"
      style={{
        backgroundColor: isInCustomerFavs 
          ? 'rgba(0, 0, 0, 0.95)' 
          : 'rgba(255, 255, 255, 0.1)',
        backdropFilter: isInCustomerFavs ? 'blur(20px)' : 'blur(10px)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-center h-14">
          {/* Centered navigation items */}
          <div className="flex items-center space-x-2">
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