import { useEffect, useRef, useState } from 'react';

const AutoScrollCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

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

  // Create placeholder images array
  const placeholderImages = Array.from({ length: 18 }, (_, index) => ({
    id: index + 1,
    src: `https://via.placeholder.com/300x400/E5E7EB/9CA3AF?text=Image+${(index % 9) + 1}`,
    alt: `Placeholder ${(index % 9) + 1}`
  }));

  return (
    <div className="w-full py-16" style={{ backgroundColor: '#f4f3ef' }}>
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-12 font-['Georgia'] text-gray-800">
          <span style={{ color: '#A52B2B' }}>Customer</span>{' '}
          <span style={{ color: '#1C1C1C' }}>Favourites</span>
        </h2>
        
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
                className="flex-shrink-0 w-80 h-96"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoScrollCarousel; 