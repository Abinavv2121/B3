import { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import brandLogo from "/src/assets/brand-logo.png";
import wishlistIcon from "/src/assets/wishlist.png";
import cartIcon from "/src/assets/cart.png";
import searchIcon from "/src/assets/search.png";
import SearchModal from "./SearchModal";
import { useFavourites } from "@/contexts/FavouritesContext";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";
import { memo } from "react";

const Navigation = memo(() => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isInCustomerFavs, setIsInCustomerFavs] = useState(false);
  const { favouritesCount } = useFavourites();
  const { cartCount } = useCart();

  // Debug cart count
  console.log('Navigation: Current cart count:', cartCount);

  // Main categories that match your database and existing pages
  const mainCategories = [
    "ABOUT US",
    "SHOP ALL"
  ];

  // Categories that link to existing pages
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
    },
    "GOWN": {
      route: "/gown",
      subcategories: [
        "Bridal Gowns",
        "Party Gowns",
        "Designer Gowns",
        "Heavy Work",
        "Light Work"
      ]
    }
  };

  // Memoize navigation functions
  const handleWishlistClick = useCallback(() => {
    navigate('/wishlist');
  }, [navigate]);

  const handleCartClick = useCallback(() => {
    navigate('/cart');
  }, [navigate]);

  const handleSearchClick = useCallback(() => {
    setIsSearchOpen(true);
  }, []);

  const handleSearchClose = useCallback(() => {
    setIsSearchOpen(false);
  }, []);

  const renderCategoryWithPopup = useCallback((category: string, categoryData: { route: string, subcategories: string[] }) => (
    <Link
      to={categoryData.route}
      className="px-4 py-2 text-base font-medium font-hind text-brandNavy transition-all duration-300 whitespace-nowrap hover:bg-gray-100 rounded-brand border border-transparent hover:border-gray-200 hover:text-brandGold"
    >
      {category}
    </Link>
  ), []);

  const renderSimpleLink = useCallback((link: string) => {
    // Handle special cases for utility links
    const routeMap: Record<string, string> = {
      "SHOP ALL": "/",
      "ABOUT US": "/about-us"
    };

    const route = routeMap[link] || `/${link.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`;

    return (
      <Link
        to={route}
        className="px-4 py-2 text-base font-medium font-hind text-brandNavy transition-all duration-300 whitespace-nowrap hover:bg-gray-100 rounded-brand border border-transparent hover:border-gray-200 hover:text-brandGold"
      >
        {link}
      </Link>
    );
  }, []);

  // Throttled scroll handler for better performance
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Always show navigation, but add background when scrolling
    setIsVisible(true);
    
    // Check if we're past the hero section
    if (currentScrollY > window.innerHeight) {
      setIsInCustomerFavs(true);
    } else {
      setIsInCustomerFavs(false);
    }
    
    setLastScrollY(currentScrollY);
  }, []);

  // Scroll event handler with throttling
  useEffect(() => {
    let ticking = false;
    
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [handleScroll]);

  // Memoize header styles to prevent unnecessary re-renders
  const headerStyles = useMemo(() => ({
    backgroundColor: 'rgba(255, 255, 255, 1)', // Solid white background
    backdropFilter: 'none' // Remove blur effect
  }), []);

  return (
    <>
      <header 
        className="fixed top-0 left-0 w-full z-50 border-b border-gray-200 shadow-sm transition-all duration-500 bg-white"
        style={headerStyles}
      >
      <div className="w-full relative h-30 px-8 bg-white">
        <div className="absolute inset-0 flex items-center justify-between py-9 px-16 bg-white">
          {/* Left side - Logo */}
          <div className="flex-shrink-0 pl-8">
            <Link to="/" className="flex items-center">
              <img 
                src={brandLogo} 
                alt="Brand Logo" 
                className="h-24 w-auto"
              />
            </Link>
          </div>
          
          {/* Center - Navigation Items */}
          <div className="flex-shrink-0 flex justify-center items-center mx-8">
            <div className="flex items-center space-x-4">
              {/* Main Categories */}
              {mainCategories.map((category) => 
                renderSimpleLink(category)
              )}
              
              {/* Category Pages */}
              {Object.entries(categoryPages).map(([category, categoryData]) => 
                renderCategoryWithPopup(category, categoryData)
              )}
            </div>
          </div>
          
          {/* Right side buttons */}
          <div className="flex-shrink-0 flex items-center space-x-4 pr-4">
            <button 
              onClick={handleWishlistClick}
              className="relative flex items-center justify-center p-4 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <img 
                src={wishlistIcon} 
                alt="Wishlist" 
                className="h-16 w-16"
              />
              {favouritesCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-red-500 text-white text-sm flex items-center justify-center p-0">
                  {favouritesCount > 99 ? '99+' : favouritesCount}
                </Badge>
              )}
            </button>
            <button 
              onClick={handleSearchClick}
              className="flex items-center justify-center p-4 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <img 
                src={searchIcon} 
                alt="Search" 
                className="h-16 w-16"
              />
            </button>
            <button 
              onClick={handleCartClick}
              className="relative flex items-center justify-center p-4 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <img 
                src={cartIcon} 
                alt="Cart" 
                className="h-16 w-16"
              />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center p-0">
                  {cartCount > 99 ? '99+' : cartCount}
                </Badge>
              )}
            </button>

          </div>
        </div>
      </div>
    </header>
      
      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={handleSearchClose} 
      />
    </>
  );
});

export default Navigation;