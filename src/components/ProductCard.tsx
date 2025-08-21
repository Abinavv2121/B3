import React, { useState, useCallback, useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingBag, Star, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useFavourites } from '@/contexts/FavouritesContext';
import { ProductImageGallery } from './ProductImageGallery';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    rating: number;
    reviews: number;
    isNew?: boolean;
    isBestSeller?: boolean;
    colors: string[];
    sizes: string[];
    additionalImages?: string[];
  };
}

const ProductCard = memo(({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToFavourites, removeFromFavourites, isInFavourites } = useFavourites();
  const [showQuickView, setShowQuickView] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  // Memoized computations
  const discountPercentage = useMemo(() => {
    if (!product.originalPrice) return 0;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  }, [product.price, product.originalPrice]);

  const allImages = useMemo(() => {
    return [product.image, ...(product.additionalImages || [])];
  }, [product.image, product.additionalImages]);

  const isWishlisted = useMemo(() => isInFavourites(product.id), [isInFavourites, product.id]);

  // Memoized event handlers
  const handleWishlist = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (isWishlisted) {
      removeFromFavourites(product.id);
    } else {
      addToFavourites({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        rating: product.rating,
        reviews: product.reviews,
        isNew: product.isNew,
        isBestSeller: product.isBestSeller,
        colors: product.colors,
        sizes: product.sizes,
      });
    }
  }, [isWishlisted, removeFromFavourites, addToFavourites, product]);

  const handleQuickAdd = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      selectedSize: selectedSize,
      selectedColor: selectedColor,
    });
  }, [addToCart, product.id, product.name, product.price, product.image, product.category, selectedColor, selectedSize]);

  const handleProductClick = useCallback(() => {
    setShowQuickView(true);
  }, []);

  const handleCloseQuickView = useCallback(() => {
    setShowQuickView(false);
  }, []);

  const handleColorSelect = useCallback((color: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedColor(color);
  }, []);

  const handleSizeSelect = useCallback((size: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedSize(size);
  }, []);

  const handleImageNavigation = useCallback((direction: 'prev' | 'next') => {
    setCurrentImageIndex(prev => {
      if (direction === 'prev') {
        return prev === 0 ? allImages.length - 1 : prev - 1;
      } else {
        return prev === allImages.length - 1 ? 0 : prev + 1;
      }
    });
  }, [allImages.length]);

  const handleThumbnailClick = useCallback((index: number) => {
    setCurrentImageIndex(index);
  }, []);

  return (
    <>
      <div onClick={handleProductClick} className="group block cursor-pointer">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] overflow-hidden">
          {/* Image Container */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <ProductImageGallery
              images={allImages}
              productName={product.name}
              className="w-full h-full"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/30 transition-all duration-300 pointer-events-none"></div>
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col space-y-2">
              {product.isNew && (
                <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg">
                  New
                </Badge>
              )}
              {product.isBestSeller && (
                <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg">
                  Best Seller
                </Badge>
              )}
              {discountPercentage > 0 && (
                <Badge variant="destructive" className="shadow-lg">
                  {discountPercentage}% OFF
                </Badge>
              )}
            </div>

            {/* Heart Icon - Always Visible */}
            <div className="absolute top-3 right-3">
              <Button
                size="icon"
                variant="secondary"
                className="w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-md border border-gray-200/50"
                onClick={handleWishlist}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </Button>
            </div>

            {/* Quick Shop Overlay */}
            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
              <Button
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg"
                onClick={handleQuickAdd}
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Quick Add
              </Button>
            </div>

            {/* Color Swatches */}
            {product.colors.length > 1 && (
              <div className="absolute bottom-3 left-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                {product.colors.slice(0, 4).map((color, index) => (
                  <button
                    key={index}
                    className={`w-6 h-6 rounded-full border-2 ${
                      selectedColor === color ? 'border-purple-500 scale-110 shadow-lg' : 'border-white/80'
                    } transition-all duration-200`}
                    style={{ backgroundColor: color }}
                    onClick={handleColorSelect(color)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4 space-y-3">
            {/* Category */}
            <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">
              {product.category}
            </p>

            {/* Name */}
            <h3 className="font-serif font-semibold text-lg leading-tight text-gray-800 group-hover:text-purple-700 transition-colors duration-300">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                ({product.reviews})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3">
              <span className="text-xl font-bold text-gray-800">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Available Sizes */}
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Sizes:</span>
              <div className="flex space-x-1">
                {product.sizes.slice(0, 4).map((size, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 rounded text-xs border border-gray-200">
                    {size}
                  </span>
                ))}
                {product.sizes.length > 4 && (
                  <span className="text-xs">+{product.sizes.length - 4}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleCloseQuickView}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <button
              onClick={handleCloseQuickView}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
            
            <div className="flex flex-col lg:flex-row">
              {/* Image Gallery */}
              <div className="lg:w-1/2 p-6">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={allImages[currentImageIndex]}
                    alt={`${product.name} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Navigation Arrows */}
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={() => handleImageNavigation('prev')}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-700" />
                      </button>
                      <button
                        onClick={() => handleImageNavigation('next')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-700" />
                      </button>
                    </>
                  )}
                </div>
                
                {/* Thumbnails */}
                {allImages.length > 1 && (
                  <div className="flex gap-2 mt-4 overflow-x-auto">
                    {allImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => handleThumbnailClick(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          index === currentImageIndex
                            ? 'border-purple-500 scale-110 shadow-lg'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Product Details */}
              <div className="lg:w-1/2 p-6 flex flex-col justify-center">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-serif font-semibold text-gray-800 mb-2">
                      {product.name}
                    </h2>
                    <p className="text-lg text-gray-600 uppercase tracking-wide">
                      {product.category}
                    </p>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600">
                      ({product.reviews} reviews)
                    </span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl font-bold text-gray-800">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xl text-gray-500 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  
                  {/* Color Selection */}
                  {product.colors.length > 1 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Color: {selectedColor}</h4>
                      <div className="flex space-x-3">
                        {product.colors.map((color, index) => (
                          <button
                            key={index}
                            className={`w-8 h-8 rounded-full border-2 transition-all ${
                              selectedColor === color ? 'border-purple-500 scale-110 shadow-lg' : 'border-gray-300'
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={handleColorSelect(color)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Size Selection */}
                  {product.sizes.length > 1 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Size: {selectedSize}</h4>
                      <div className="flex flex-wrap gap-2">
                        {product.sizes.map((size, index) => (
                          <button
                            key={index}
                            className={`px-4 py-2 rounded-lg border transition-all ${
                              selectedSize === size
                                ? 'border-purple-500 bg-purple-50 text-purple-700'
                                : 'border-gray-300 hover:border-purple-300'
                            }`}
                            onClick={handleSizeSelect(size)}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg"
                      onClick={handleQuickAdd}
                    >
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      Add to Cart
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400"
                      onClick={handleWishlist}
                    >
                      <Heart className={`mr-2 h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                      {isWishlisted ? 'Remove' : 'Wishlist'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;