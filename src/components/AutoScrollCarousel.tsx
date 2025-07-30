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
        background: 'linear-gradient(180deg, #FDF9F6 0%, #F4E8DE 100%)',
        paddingTop: '96px',
        paddingBottom: '64px'
      }}
    >
      {/* Gold sparkle texture overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D6BA8D' fill-opacity='0.3'%3E%3Cpath d='M30 30c0-16.569-13.431-30-30-30v60c16.569 0 30-13.431 30-30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 
            className={`transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0 skew-y-0' : 'opacity-0 translate-y-8 skew-y-1'
            }`}
          >
            <span 
              className="font-serif font-bold text-5xl block mb-2"
              style={{ color: '#B34D35' }}
            >
              Customer
            </span>
            <span 
              className="font-sans text-4xl block relative"
              style={{ color: '#1F1E1D' }}
            >
              Favourites
              <div 
                className="mx-auto mt-2"
                style={{
                  width: '60px',
                  height: '2px',
                  backgroundColor: '#D6BA8D'
                }}
              />
            </span>
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
                  className="w-full h-full bg-white rounded-3xl p-4 transition-all duration-300 relative"
                  style={{
                    boxShadow: '0 6px 28px rgba(0,0,0,0.06)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.border = '1px solid #D6BA8D';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.border = 'none';
                  }}
                >
                  {/* Best Seller Badge */}
                  <div 
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 px-2 py-1 rounded-full text-white text-xs font-medium"
                    style={{ backgroundColor: '#B34D35' }}
                  >
                    ★ Best Seller
                  </div>
                  
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-all duration-300"
                    style={{
                      borderTopLeftRadius: '16px',
                      borderTopRightRadius: '16px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  />
                  
                  {/* Product Info */}
                  <div className="mt-3 px-2">
                    <h3 
                      className="font-bold text-sm mb-1"
                      style={{ color: '#2E2C2B' }}
                    >
                      Premium Ethnic Wear
                    </h3>
                    <p 
                      className="text-sm font-medium"
                      style={{ color: '#7A5C51' }}
                    >
                      ₹12,999
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoScrollCarousel; 