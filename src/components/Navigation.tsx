import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import brandLogo from "/src/assets/brand-logo.png";
import wishlistIcon from "/src/assets/wishlist.png";
import cartIcon from "/src/assets/cart.png";
import searchIcon from "/src/assets/search.png";
import nameIcon from "/src/assets/name.png";
import SearchModal from "./SearchModal";
import { useFavourites } from "@/contexts/FavouritesContext";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";

const Navigation = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isInCustomerFavs, setIsInCustomerFavs] = useState(false);
  const { favouritesCount } = useFavourites();
  const { cartCount } = useCart();

  // Scroll event handler
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always show navigation, but add background when scrolling
      setIsVisible(true);
      
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
  }, [lastScrollY]);

  return (
    <>
      <header 
        className="fixed top-0 -left-[50px] w-[calc(100vw+100px)] z-50 backdrop-blur-md border-b border-border shadow-sm transition-all duration-500"
        style={{
          backgroundColor: isInCustomerFavs 
            ? 'rgba(0, 0, 0, 0.95)' 
            : 'rgba(255, 255, 255, 0.1)',
          backdropFilter: isInCustomerFavs ? 'blur(20px)' : 'blur(12px)'
        }}
      >
      <div className="w-[calc(100%+100px)] relative h-20 px-4">
        <div className="absolute inset-0 flex items-center py-6 px-16">
          {/* Left side - Logo */}
          <div className="flex-1">
            <Link to="/" className="flex items-center">
              <img 
                src={brandLogo} 
                alt="Brand Logo" 
                className="h-24 w-auto"
              />
            </Link>
          </div>
          
          {/* Center - Name Icon */}
          <div className="flex-1 flex justify-center items-center">
            <img 
              src={nameIcon} 
              alt="Name" 
              className="h-16 w-auto max-w-full object-contain"
            />
          </div>
          
          {/* Right side buttons */}
          <div className="flex-1 flex items-center justify-end space-x-4 pr-24">
            <button 
              onClick={() => navigate('/wishlist')}
              className="relative flex items-center justify-center p-3 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              <img 
                src={wishlistIcon} 
                alt="Wishlist" 
                className="h-12 w-12"
              />
              {favouritesCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0">
                  {favouritesCount > 99 ? '99+' : favouritesCount}
                </Badge>
              )}
            </button>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center justify-center p-3 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              <img 
                src={searchIcon} 
                alt="Search" 
                className="h-12 w-12"
              />
            </button>
            <button 
              onClick={() => navigate('/cart')}
              className="relative flex items-center justify-center p-3 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              <img 
                src={cartIcon} 
                alt="Cart" 
                className="h-12 w-12"
              />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center p-0">
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
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
};

export default Navigation;