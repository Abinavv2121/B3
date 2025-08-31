import { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import brandLogo from "/src/assets/brand-logo.png";
import wishlistIcon from "/src/assets/wishlist.png";
import cartIcon from "/src/assets/cart.png";
import searchIcon from "/src/assets/search.png";
import React, { lazy, Suspense } from 'react';
const SearchModal = lazy(() => import('./SearchModal'));
import { useFavourites } from "@/contexts/FavouritesContext";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User, LogOut, Settings } from "lucide-react";
import { memo } from "react";

const Navigation = memo(() => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, setShowAuthModal, t } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isInCustomerFavs, setIsInCustomerFavs] = useState(false);
  const { favouritesCount } = useFavourites();
  const { cartCount } = useCart();

  // Main categories that match your database and existing pages
  const mainCategories = [
    t('nav.about'),
    t('nav.shop')
  ];

  // Categories that link to existing pages
  const categoryPages = {
    [t('category.bridal')]: {
      route: "/bridal",
      subcategories: [
        "Bridal Lehangas",
        "Bridal Sarees", 
        "Bridal Suits",
        "Heavy Work",
        "Light Work"
      ]
    },
    [t('category.anarkali')]: {
      route: "/anarkali",
      subcategories: [
        "Party Wear",
        "Casual Anarkalis",
        "Designer Anarkalis",
        "Heavy Work",
        "Light Work"
      ]
    },
    [t('category.lehenga')]: {
      route: "/lehenga",
      subcategories: [
        "Bridal Lehangas",
        "Party Wear",
        "Sangeet Special",
        "Heavy Work",
        "Light Work"
      ]
    },
    [t('category.saree')]: {
      route: "/saree",
      subcategories: [
        "Silk Sarees",
        "Cotton Sarees",
        "Georgette",
        "Chiffon",
        "Designer Sarees"
      ]
    },
    [t('category.salwar_suit')]: {
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
    [t('category.gown')]: {
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

  const handleLogout = useCallback(() => {
    logout();
    navigate("/");
  }, [logout, navigate]);

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
      [t('nav.about')]: "/about-us"
    };

    const route = routeMap[link] || `/${link.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`;

    // Special handling for Shop All - scroll to featured collections
    if (link === t('nav.shop')) {
      return (
        <button
          onClick={() => {
            const featuredSection = document.querySelector('[data-section="featured-collections"]');
            if (featuredSection) {
              // Custom smooth scroll with slower animation
              const targetPosition = featuredSection.getBoundingClientRect().top + window.pageYOffset - 100; // Offset for header
              const startPosition = window.pageYOffset;
              const distance = targetPosition - startPosition;
              const duration = 2000; // 2 seconds for slower scroll
              let startTime: number | null = null;

              const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

              const animateScroll = (currentTime: number) => {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                const easedProgress = easeInOutCubic(progress);
                
                window.scrollTo(0, startPosition + distance * easedProgress);
                
                if (progress < 1) {
                  requestAnimationFrame(animateScroll);
                }
              };

              requestAnimationFrame(animateScroll);
            }
          }}
          className="px-4 py-2 text-base font-medium font-hind text-brandNavy transition-all duration-300 whitespace-nowrap hover:bg-gray-100 rounded-brand border border-transparent hover:border-gray-200 hover:text-brandGold cursor-pointer"
        >
          {link}
        </button>
      );
    }

    return (
      <Link
        to={route}
        className="px-4 py-2 text-base font-medium font-hind text-brandNavy transition-all duration-300 whitespace-nowrap hover:bg-gray-100 rounded-brand border border-transparent hover:border-gray-200 hover:text-brandGold"
      >
        {link}
      </Link>
    );
  }, [t]);

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
        className="fixed top-0 left-0 w-full z-50 border-b border-gray-200 shadow-sm transition-all duration-300 bg-white"
        style={headerStyles}
      >
        <div className="w-full bg-white">
          <div className="flex items-center justify-between py-5 px-4 lg:px-6">
            {/* Left - Logo */}
            <div className="shrink-0">
              <Link to="/" className="flex items-center">
                <img 
                  src={brandLogo} 
                  alt="Brand Logo" 
                  className="h-20 w-auto"
                />
              </Link>
            </div>

            {/* Center - Nav items (scrollable if overflow) */}
            <nav className="flex-1 mx-4 overflow-x-auto">
              <div className="flex items-center justify-center space-x-3 whitespace-nowrap">
                {mainCategories.map((category) => renderSimpleLink(category))}
                {Object.entries(categoryPages).map(([category, categoryData]) => renderCategoryWithPopup(category, categoryData))}
              </div>
            </nav>

            {/* Right - Actions */}
            <div className="shrink-0 flex items-center space-x-2">
              <button 
                onClick={handleSearchClick}
                className="flex items-center justify-center p-4 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label={t('common.search')}
              >
                <img src={searchIcon} alt={t('common.search')} className="h-14 w-14" />
              </button>
              <button 
                onClick={handleWishlistClick}
                className="relative flex items-center justify-center p-4 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label={t('nav.wishlist')}
              >
                <img src={wishlistIcon} alt={t('nav.wishlist')} className="h-14 w-14" />
                {favouritesCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-red-500 text-white text-[11px] flex items-center justify-center p-0">
                    {favouritesCount > 99 ? '99+' : favouritesCount}
                  </Badge>
                )}
              </button>
              <button 
                onClick={handleCartClick}
                className="relative flex items-center justify-center p-4 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label={t('nav.cart')}
              >
                <img src={cartIcon} alt={t('nav.cart')} className="h-14 w-14" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-blue-500 text-white text-[11px] flex items-center justify-center p-0">
                    {cartCount > 99 ? '99+' : cartCount}
                  </Badge>
                )}
              </button>

              {/* Authentication */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-14 w-14 rounded-full p-0 hover:bg-gray-100">
                      <Avatar className="h-14 w-14">
                        <AvatarImage src={user?.avatar_url || ""} alt={user?.name || user?.email} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name || 'User'}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      <span>{t('nav.profile')}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/settings')}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>{t('nav.settings')}</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{t('nav.signout')}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-14 px-4 hover:bg-gray-100"
                  onClick={() => setShowAuthModal(true)}
                >
                  <User className="mr-2 h-4 w-4" />
                  {t('nav.signin')}
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Search Modal */}
      <Suspense fallback={null}>
        <SearchModal 
          isOpen={isSearchOpen} 
          onClose={handleSearchClose} 
        />
      </Suspense>
    </>
  );
});

export default Navigation;