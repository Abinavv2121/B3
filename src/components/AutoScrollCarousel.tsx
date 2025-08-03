import { useEffect, useRef, useState } from 'react';

const AutoScrollCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const scrollSpeed = 0.5; // pixels per frame
    const imageWidth = 320; // width of each image including gap
    const totalImages = 9;
    const totalWidth = imageWidth * totalImages;

    const scroll = () => {
      setScrollPosition(prev => {
        const newPosition = prev + scrollSpeed;
        // Reset to beginning when we've scrolled past all images
        return newPosition >= totalWidth ? 0 : newPosition;
      });
    };

    const intervalId = setInterval(scroll, 16); // ~60fps

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (scrollRef.current) {
      observer.observe(scrollRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Create placeholder images array
  const placeholderImages = Array.from({ length: 18 }, (_, index) => ({
    id: index + 1,
    src: `https://via.placeholder.com/300x400/E5E7EB/9CA3AF?text=Image+${(index % 9) + 1}`,
    alt: `Placeholder ${(index % 9) + 1}`
  }));

  return (
    <div 
      className="w-full relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d1b1b 25%, #3d2a2a 50%, #2d1b1b 75%, #1a1a1a 100%)',
        paddingTop: '120px',
        paddingBottom: '80px'
      }}
    >
      {/* Elegant geometric separator from hero section */}
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
            fill="rgba(0, 0, 0, 0.8)"
          />
          <path
            d="M0 16L1200 16L1200 48C1200 48 900 80 600 48C300 16 0 48 0 48V16Z"
            fill="#D4AF37"
            fillOpacity="0.1"
          />
        </svg>
      </div>
      
      {/* Primary luxury damask texture overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='luxury-damask' x='0' y='0' width='120' height='120' patternUnits='userSpaceOnUse'%3E%3Cpath d='M60 60c0-16.569-13.431-30-30-30s-30 13.431-30 30 13.431 30 30 30 30-13.431 30-30z' fill='%23D4AF37' fill-opacity='0.08'/%3E%3Cpath d='M60 60c0-16.569 13.431-30 30-30s30 13.431 30 30-13.431 30-30 30-30-13.431-30-30z' fill='%23B8860B' fill-opacity='0.06'/%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30s30 13.431 30 30-13.431 30-30 30-30-13.431-30-30z' fill='%23D4AF37' fill-opacity='0.05'/%3E%3Cpath d='M90 90c0-16.569-13.431-30-30-30s-30 13.431-30 30 13.431 30 30 30 30-13.431 30-30z' fill='%23B8860B' fill-opacity='0.04'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='120' height='120' fill='url(%23luxury-damask)'/%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px'
        }}
      />
      
      {/* Secondary ornate baroque texture overlay */}
      <div 
        className="absolute inset-0 opacity-8"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='160' height='160' viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='baroque-luxury' x='0' y='0' width='160' height='160' patternUnits='userSpaceOnUse'%3E%3Cpath d='M80 80c0-22.091-17.909-40-40-40s-40 17.909-40 40 17.909 40 40 40 40-17.909 40-40z' fill='%23D4AF37' fill-opacity='0.06' stroke='%23B8860B' stroke-width='0.5' stroke-opacity='0.1'/%3E%3Cpath d='M80 80c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20z' fill='%23FFD700' fill-opacity='0.04'/%3E%3Cpath d='M40 40c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20z' fill='%23B8860B' fill-opacity='0.05'/%3E%3Cpath d='M120 120c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20z' fill='%23FFD700' fill-opacity='0.03'/%3E%3Cpath d='M80 20L85 35L100 40L85 45L80 60L75 45L60 40L75 35Z' fill='%23D4AF37' fill-opacity='0.08'/%3E%3Cpath d='M80 100L85 115L100 120L85 125L80 140L75 125L60 120L75 115Z' fill='%23B8860B' fill-opacity='0.06'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='160' height='160' fill='url(%23baroque-luxury)'/%3E%3C/svg%3E")`,
          backgroundSize: '160px 160px',
          transform: 'rotate(15deg)',
          transformOrigin: 'center'
        }}
      />
      
      {/* Animated sparkle effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            <div className="w-1 h-1 bg-yellow-400 rounded-full opacity-60"></div>
          </div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 
            className={`transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0 skew-y-0' : 'opacity-0 translate-y-8 skew-y-1'
            }`}
          >
            <span 
              className="font-['Playfair_Display'] font-light text-6xl lg:text-7xl block mb-4 tracking-widest"
              style={{ 
                color: '#D4AF37',
                textShadow: '0 0 30px rgba(212, 175, 55, 0.3)'
              }}
            >
              CUSTOMER
            </span>
            <span 
              className="font-['Italiana'] text-5xl lg:text-6xl block relative tracking-wider"
              style={{ 
                color: '#FFFFFF',
                textShadow: '0 0 20px rgba(255, 255, 255, 0.2)'
              }}
            >
              FAVOURITES
              <div 
                className="mx-auto mt-6 relative"
                style={{
                  width: '120px',
                  height: '3px',
                  background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)'
                }}
              >
                <div 
                  className="absolute inset-0 animate-pulse"
                  style={{
                    background: 'linear-gradient(90deg, transparent, #B8860B, transparent)',
                    animationDuration: '2s'
                  }}
                ></div>
              </div>
            </span>
            <p 
              className="mt-6 text-lg lg:text-xl font-light tracking-wide"
              style={{ color: '#C0C0C0' }}
            >
              Curated selections loved by our discerning clientele
            </p>
          </h2>
        </div>
        
        <div className="relative overflow-hidden">
          <div 
            ref={scrollRef}
            className="flex gap-8"
            style={{ 
              transform: `translateX(-${scrollPosition}px)`,
              width: 'fit-content',
              transition: 'none'
            }}
          >
            {placeholderImages.map((image) => (
              <div
                key={`${image.id}-${Math.floor(image.id / 9)}`}
                className="flex-shrink-0 w-80 h-96 relative group"
              >
                <div 
                  className="w-full h-full bg-white rounded-3xl p-4 transition-all duration-500 relative overflow-hidden"
                  style={{
                    boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 40px rgba(212, 175, 55, 0.1)',
                    border: '1px solid rgba(212, 175, 55, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 30px 80px rgba(0,0,0,0.4), 0 0 60px rgba(212, 175, 55, 0.2)';
                    e.currentTarget.style.border = '1px solid rgba(212, 175, 55, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.3), 0 0 40px rgba(212, 175, 55, 0.1)';
                    e.currentTarget.style.border = '1px solid rgba(212, 175, 55, 0.1)';
                  }}
                >
                  {/* Luxury Badge */}
                  <div 
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 px-3 py-1 rounded-full text-white text-xs font-medium backdrop-blur-sm"
                    style={{ 
                      backgroundColor: 'rgba(212, 175, 55, 0.9)',
                      boxShadow: '0 4px 20px rgba(212, 175, 55, 0.3)'
                    }}
                  >
                    ✨ BEST SELLER
                  </div>
                  
                  {/* Gold accent line */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(90deg, #D4AF37, #B8860B, #D4AF37)'
                    }}
                  ></div>
                  
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-all duration-500"
                    style={{
                      borderTopLeftRadius: '20px',
                      borderTopRightRadius: '20px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  />
                  
                  {/* Product Info */}
                  <div className="mt-4 px-3 pb-2">
                    <h3 
                      className="font-['Playfair_Display'] font-semibold text-base mb-2 tracking-wide"
                      style={{ color: '#2C2C2C' }}
                    >
                      Premium Ethnic Wear
                    </h3>
                    <div className="flex items-center justify-between">
                      <p 
                        className="font-['Italiana'] text-lg font-medium tracking-wider"
                        style={{ color: '#D4AF37' }}
                      >
                        ₹12,999
                      </p>
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-500">★★★★★</span>
                        <span className="text-sm text-gray-600">(4.9)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
            fill="#1a1a2e"
            fillOpacity="0.8"
          />
          <path
            d="M0 48L1200 48L1200 16C1200 16 900 -16 600 16C300 48 0 16 0 16V48Z"
            fill="#B76E79"
            fillOpacity="0.1"
          />
        </svg>
      </div>
    </div>
  );
};

export default AutoScrollCarousel; 