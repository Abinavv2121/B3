import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import brandLogo from "/src/assets/brand-logo.png";
import wishlistIcon from "/src/assets/wishlist.png";
import cartIcon from "/src/assets/cart.png";
import searchIcon from "/src/assets/search.png";
import nameIcon from "/src/assets/name.png";
import SearchModal from "./SearchModal";

const Navigation = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);



  // Scroll event handler
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always show navigation, but add background when scrolling
      setIsVisible(true);
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);



  return (
    <>
      <header className={`fixed top-0 -left-[50px] w-[calc(100vw+100px)] z-50 backdrop-blur-md border-b border-border shadow-sm transition-all duration-500 ${
        lastScrollY > 0 ? `bg-amber-50/${Math.min(95, lastScrollY / 2)}` : 'bg-white/10 backdrop-blur-xl'
      }`}>
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
          <div className="flex-1 flex items-center justify-end space-x-6 pr-24">
            <button className="flex items-center justify-center p-2 hover:bg-white/10 rounded-lg transition-colors">
              <img 
                src={wishlistIcon} 
                alt="Wishlist" 
                className="h-14 w-14"
              />
            </button>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center justify-center p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              <img 
                src={searchIcon} 
                alt="Search" 
                className="h-14 w-14"
              />
            </button>
            <button 
              onClick={() => navigate('/cart')}
              className="flex items-center justify-center p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              <img 
                src={cartIcon} 
                alt="Cart" 
                className="h-14 w-14"
              />
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