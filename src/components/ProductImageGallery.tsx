import { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  className?: string;
}

export const ProductImageGallery = ({ images, productName, className = "" }: ProductImageGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-rotate images on hover with 2-second delay
  useEffect(() => {
    if (images.length <= 1) return;

    const startRotation = () => {
      if (intervalRef.current) return; // Prevent multiple intervals
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 2000); // 2 seconds as requested
    };

    const stopRotation = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    // Start rotation after 2-second delay on hover
    const handleMouseEnter = () => {
      setIsHovering(true);
      const timeout = setTimeout(startRotation, 2000);
      setHoverTimeout(timeout);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
        setHoverTimeout(null);
      }
      stopRotation();
      setCurrentImageIndex(0); // Reset to first image
    };

    const element = containerRef.current;
    if (element) {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
        stopRotation();
        if (hoverTimeout) clearTimeout(hoverTimeout);
      };
    }
  }, [images.length, hoverTimeout]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (hoverTimeout) clearTimeout(hoverTimeout);
    };
  }, [hoverTimeout]);

  if (!images || images.length === 0) {
    return (
      <div className={`aspect-square bg-white/5 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-white/40 text-sm">No images</div>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div 
        className={`aspect-square bg-white/5 rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 ${className}`}
        onClick={() => setIsZoomed(true)}
      >
        <img
          src={images[0]}
          alt={productName}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <>
      {/* Main Image Display */}
      <div 
        className={`aspect-square bg-white/5 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 ${className}`}
        onClick={() => setIsZoomed(true)}
        ref={containerRef}
      >
        <img
          key={currentImageIndex}
          src={images[currentImageIndex]}
          alt={`${productName} - Image ${currentImageIndex + 1}`}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isHovering && images.length > 1 ? 'animate-pulse' : ''
          }`}
          style={{
            opacity: isHovering && images.length > 1 ? 0.9 : 1
          }}
        />
        
        {/* Image Counter */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {currentImageIndex + 1} / {images.length}
        </div>

        {/* Hover Indicator */}
        {isHovering && images.length > 1 && (
          <div className="absolute top-2 left-2 bg-yellow-500/80 text-black text-xs px-2 py-1 rounded-full font-medium animate-pulse">
            Auto-rotating
          </div>
        )}

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex((prev) => (prev + 1) % images.length);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors duration-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === currentImageIndex
                  ? 'border-yellow-500 scale-110'
                  : 'border-white/20 hover:border-white/40'
              }`}
            >
              <img
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Zoom Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors duration-200 z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Main Image */}
            <img
              src={images[currentImageIndex]}
              alt={`${productName} - Image ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />

            {/* Navigation in Zoom Mode */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors duration-200"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex((prev) => (prev + 1) % images.length);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors duration-200"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
