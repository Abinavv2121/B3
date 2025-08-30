import React, { useState, useCallback, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useFavourites } from '@/contexts/FavouritesContext';
import { useToast } from '@/hooks/use-toast';
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
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const { addToFavourites, removeFromFavourites, isInFavourites } = useFavourites();
  const { toast } = useToast();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  // Check if this product is already in cart
  const isProductInCart = useMemo(() => 
    isInCart(product.id, selectedSize, selectedColor), 
    [isInCart, product.id, selectedSize, selectedColor]
  );

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
    
    // Check if product is already in cart
    if (isProductInCart) {
      toast({
        title: 'Product already in cart',
        description: `"${product.name}" is already in your cart.`,
        variant: 'default',
      });
      return;
    }
    
    console.log('Adding to cart:', {
      id: product.id,
      name: product.name,
      price: product.price,
      selectedSize,
      selectedColor
    });
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      originalPrice: product.originalPrice,
      selectedSize: selectedSize,
      selectedColor: selectedColor,
    });
    
    // Show success feedback
    toast({
      title: 'Item added to cart',
      description: `Item "${product.name}" added to cart.`,
      variant: 'default',
    });
  }, [addToCart, product.id, product.name, product.price, product.image, product.category, product.originalPrice, selectedColor, selectedSize, toast, isProductInCart]);

  const handleProductClick = useCallback(() => {
    // Navigate to product detail page
    navigate(`/product/${product.id}`);
  }, [navigate, product.id]);

  const handleColorSelect = useCallback((color: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedColor(color);
  }, []);

  const handleSizeSelect = useCallback((size: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedSize(size);
  }, []);

  return (
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
              className={`flex-1 border-0 shadow-lg ${isProductInCart ? 'bg-gray-400 cursor-not-allowed' : 'bg-brandGold text-white hover:opacity-90'}`}
              onClick={handleQuickAdd}
              disabled={isProductInCart}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              {isProductInCart ? 'Already in Cart' : 'Quick Add'}
            </Button>
          </div>

          {/* Color Swatches */}
          {product.colors.length > 1 && (
            <div className="absolute bottom-3 left-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
              {product.colors.slice(0, 4).map((color, index) => (
                <button
                  key={index}
                  className={`w-6 h-6 rounded-full border-2 ${
                    selectedColor === color ? 'border-brandGold scale-110 shadow-lg' : 'border-white/80'
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
          <h3 className="font-hind font-semibold text-lg leading-tight text-gray-800 group-hover:text-brandNavy transition-colors duration-300">
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
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;