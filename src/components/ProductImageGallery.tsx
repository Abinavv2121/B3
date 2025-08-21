import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  className?: string;
}

const ProductImageGallery = memo(({ images, productName, className = "" }: ProductImageGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Memoized functions to prevent unnecessary re-renders
  const startRotation = useCallback(() => {
    if (intervalRef.current || images.length <= 1) return;
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
    if (images.length <= 1) return;
    setIsHovering(true);
    startRotation();
  }, [images.length, startRotation]);

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

  // Memoized navigation handlers
  const handlePrevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleNextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handleThumbnailClick = useCallback((index: number) => {
    setCurrentImageIndex(index);
  }, []);

  // Early returns for performance
  if (!images || images.length === 0) {
    return (
      <div className={`aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center ${className}`}>
        <div className="text-gray-400 text-sm font-medium">No images</div>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div 
        className={`aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105 ${className}`}
      >
        <img
          src={images[0]}
          alt={productName}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  }

  return (
    <>
      {/* Main Image Display */}
      <div 
        className={`aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 ${className}`}
        ref={containerRef}
      >
        <img
          key={currentImageIndex}
          src={images[currentImageIndex]}
          alt={`${productName} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        
        {/* Image Counter */}
        <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm text-gray-700 text-xs px-2 py-1 rounded-lg border border-gray-200/50 shadow-lg">
          {currentImageIndex + 1} / {images.length}
        </div>

        {/* Hover Indicator - Only show when this specific product is hovering */}
        {isHovering && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg">
            Auto-rotating
          </div>
        )}

        {/* Navigation Arrows */}
        <button
          onClick={handlePrevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full flex items-center justify-center hover:bg-white border border-gray-200/50 shadow-lg transition-all duration-200"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={handleNextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full flex items-center justify-center hover:bg-white border border-gray-200/50 shadow-lg transition-all duration-200"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex gap-2 mt-2 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
              index === currentImageIndex
                ? 'border-purple-500 scale-110 shadow-lg'
                : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            <img
              src={image}
              alt={`${productName} thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </button>
        ))}
      </div>
    </>
  );
});

ProductImageGallery.displayName = 'ProductImageGallery';

export { ProductImageGallery };
