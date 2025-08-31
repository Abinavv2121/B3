import React, { useState, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useFavourites } from "@/contexts/FavouritesContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ProductRow } from "@/types";
import { ProductImageGallery } from "./ProductImageGallery";

interface ProductCardProps {
  product: ProductRow;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { t, convertCurrency } = useAuth();
  const { addToCart } = useCart();
  const { addToFavourites, removeFromFavourites, isInFavourites } = useFavourites();
  const { toast } = useToast();

  const [isHovered, setIsHovered] = useState(false);

  const handleProductClick = useCallback(() => {
    navigate(`/product/${product.id}`);
  }, [navigate, product.id]);

  const handleWishlist = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isInFavourites(product.id)) {
      removeFromFavourites(product.id);
      toast({
        title: t('product.remove_from_wishlist'),
        description: `${product.name} ${t('product.remove_from_wishlist').toLowerCase()}`,
      });
    } else {
      addToFavourites({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.original_price,
        image: product.image_url,
        category: product.category,
        rating: 4.5,
        reviews: 100,
        colors: product.colors || [],
        sizes: product.sizes || [],
      });
      toast({
        title: t('product.add_to_wishlist'),
        description: `${product.name} ${t('product.add_to_wishlist').toLowerCase()}`,
      });
    }
  }, [isInFavourites, removeFromFavourites, addToFavourites, product, toast, t]);

  const handleQuickAdd = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.original_price,
      image: product.image_url,
      category: product.category,
      selectedSize: product.sizes?.[0] || 'Free Size',
             selectedColor: product.colors?.[0] || 'Default',
    };

    addToCart(cartItem);
    toast({
      title: t('product.add_to_cart'),
      description: `${product.name} ${t('product.add_to_cart').toLowerCase()}`,
    });
  }, [addToCart, product, toast, t]);

  const isWishlistedProduct = useMemo(() => isInFavourites(product.id), [isInFavourites, product.id]);
  const discountPercentage = useMemo(() => {
    if (!product.original_price || product.original_price <= product.price) return 0;
    return Math.round(((product.original_price - product.price) / product.original_price) * 100);
  }, [product.price, product.original_price]);

  const allImages = useMemo(() => {
    const images = [product.image_url];
    if (product.additional_images) {
      images.push(...product.additional_images);
    }
    return images;
  }, [product.image_url, product.additional_images]);

  return (
    <div
      className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleProductClick}
    >
      {/* Product Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
                 <ProductImageGallery 
           images={allImages}
           productName={product.name}
         />
        
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium">
            {discountPercentage}% OFF
          </Badge>
        )}

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleWishlist}
          className={`absolute top-2 right-2 h-10 w-10 rounded-full p-0 transition-all duration-200 ${
            isWishlistedProduct 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
          }`}
        >
          <Heart className={`h-5 w-5 ${isWishlistedProduct ? 'fill-current' : ''}`} />
        </Button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">
              {convertCurrency(product.price)}
            </span>
            {product.original_price && product.original_price > product.price && (
              <span className="text-sm text-gray-500 line-through">
                {convertCurrency(product.original_price)}
              </span>
            )}
          </div>
        </div>

        {/* Quick Add Button */}
        <Button
          onClick={handleQuickAdd}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium py-2 transition-all duration-200"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {t('product.add_to_cart')}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;