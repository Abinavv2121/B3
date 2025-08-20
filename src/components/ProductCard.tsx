import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useFavourites } from "@/contexts/FavouritesContext";
import { useCart } from "@/contexts/CartContext";
import { ProductImageGallery } from "@/components/ProductImageGallery";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    category: string;
    price: number;
    originalPrice?: number;
    image: string;
    additionalImages?: string[];
    rating: number;
    reviews: number;
    isNew?: boolean;
    isBestSeller?: boolean;
    colors: string[];
    sizes: string[];
    quickShop?: boolean;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [showQuickView, setShowQuickView] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { toast } = useToast();
  const { addToFavourites, removeFromFavourites, isInFavourites } = useFavourites();
  const { addToCart } = useCart();

  const isWishlisted = isInFavourites(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromFavourites(product.id);
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist`,
      });
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
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist`,
      });
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      selectedSize: selectedSize,
      selectedColor: selectedColor,
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  const handleProductClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowQuickView(true);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const allImages = [product.image, ...(product.additionalImages || [])];

  return (
    <>
      <div onClick={handleProductClick} className="group block cursor-pointer">
        <div className="card-premium hover-lift transition-all duration-300 overflow-hidden">
          {/* Image Container */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <ProductImageGallery
              images={[product.image, ...(product.additionalImages || [])]}
              productName={product.name}
              className="w-full h-full"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 pointer-events-none"></div>
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col space-y-2">
              {product.isNew && (
                <Badge className="bg-gradient-cultural text-white">
                  New
                </Badge>
              )}
              {product.isBestSeller && (
                <Badge className="bg-gradient-rose-gold text-foreground">
                  Best Seller
                </Badge>
              )}
              {discountPercentage > 0 && (
                <Badge variant="destructive">
                  {discountPercentage}% OFF
                </Badge>
              )}
            </div>

            {/* Heart Icon - Always Visible */}
            <div className="absolute top-3 right-3">
              <Button
                size="icon"
                variant="secondary"
                className="w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-md"
                onClick={handleWishlist}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </Button>
            </div>

            {/* Quick Shop Overlay */}
            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
              <Button
                className="w-full btn-premium"
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
                      selectedColor === color ? 'border-white scale-110' : 'border-white/50'
                    } transition-all duration-200`}
                    style={{ backgroundColor: color }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedColor(color);
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4 space-y-3">
            {/* Category */}
            <p className="text-sm text-muted-foreground uppercase tracking-wide">
              {product.category}
            </p>

            {/* Name */}
            <h3 className="font-serif font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
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
              <span className="text-sm text-muted-foreground">
                ({product.reviews})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3">
              <span className="text-xl font-bold text-primary">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Available Sizes */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Sizes:</span>
              <div className="flex space-x-1">
                {product.sizes.slice(0, 4).map((size, index) => (
                  <span key={index} className="px-2 py-1 bg-muted rounded text-xs">
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
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setShowQuickView(false)}
        >
          {/* Backdrop with blur effect */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
          
          {/* Modal Content */}
          <div 
            className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowQuickView(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-black/20 text-white rounded-full flex items-center justify-center hover:bg-black/40 transition-colors duration-200 z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col lg:flex-row">
              {/* Left Side - Image Gallery */}
              <div className="lg:w-1/2 p-6">
                <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={allImages[currentImageIndex]}
                    alt={`${product.name} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Navigation Arrows */}
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors duration-200"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev + 1) % allImages.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors duration-200"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail Navigation */}
                {allImages.length > 1 && (
                  <div className="flex gap-2 mt-4 overflow-x-auto">
                    {allImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          index === currentImageIndex
                            ? 'border-yellow-500 scale-110'
                            : 'border-gray-300 hover:border-gray-400'
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

              {/* Right Side - Product Details */}
              <div className="lg:w-1/2 p-6 space-y-6">
                {/* Product Info */}
                <div className="space-y-3">
                  <p className="text-sm text-gray-500 uppercase tracking-wide">
                    {product.category}
                  </p>
                  <h2 className="text-2xl font-serif font-semibold text-gray-900">
                    {product.name}
                  </h2>
                  
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
                      ({product.reviews} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl font-bold text-gray-900">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xl text-gray-500 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="space-y-3">
                  <h3 className="font-medium text-gray-900">Select Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                          selectedSize === size
                            ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                            : 'border-gray-300 hover:border-gray-400 text-gray-700'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                {product.colors.length > 1 && (
                  <div className="space-y-3">
                    <h3 className="font-medium text-gray-900">Select Color</h3>
                    <div className="flex space-x-3">
                      {product.colors.map((color, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedColor(color)}
                          className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                            selectedColor === color ? 'border-yellow-500 scale-110' : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    className="flex-1 btn-premium"
                    onClick={handleQuickAdd}
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handleWishlist}
                  >
                    <Heart className={`mr-2 h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                    {isWishlisted ? 'Wishlisted' : 'Wishlist'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;