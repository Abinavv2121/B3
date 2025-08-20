import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  className?: string;
}

export const ProductImageGallery = ({ images, productName, className = "" }: ProductImageGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Memoize functions to prevent unnecessary re-renders
  const startRotation = useCallback(() => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 2000);
  }, [images.length]);

  const stopRotation = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    startRotation();
  }, [startRotation]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    stopRotation();
    setCurrentImageIndex(0);
  }, [stopRotation]);

  // Optimized useEffect with proper cleanup
  useEffect(() => {
    if (images.length <= 1) return;

    const element = containerRef.current;
    if (element) {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
        stopRotation();
      };
    }
  }, [images.length, handleMouseEnter, handleMouseLeave, stopRotation]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

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
        className={`aspect-square bg-white/5 rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 ${className}`}
      >
        <img
          src={images[0]}
          alt={productName}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <>
      {/* Main Image Display */}
      <div 
        className={`aspect-square bg-white/5 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 ${className}`}
        ref={containerRef}
      >
        <img
          key={currentImageIndex}
          src={images[currentImageIndex]}
          alt={`${productName} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Image Counter */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {currentImageIndex + 1} / {images.length}
        </div>

        {/* Hover Indicator - Only show when this specific product is hovering */}
        {isHovering && images.length > 1 && (
          <div className="absolute top-2 left-2 bg-yellow-500/80 text-black text-xs px-2 py-1 rounded-full font-medium">
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
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex(index);
              }}
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
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </>
  );
};
