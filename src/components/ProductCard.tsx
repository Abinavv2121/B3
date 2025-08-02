import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star, Eye, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useFavourites } from "@/contexts/FavouritesContext";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    category: string;
    price: number;
    originalPrice?: number;
    image: string;
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
  const { toast } = useToast();
  const { addToFavourites, removeFromFavourites, isInFavourites } = useFavourites();

  const isWishlisted = isInFavourites(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
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
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="card-premium hover-lift transition-all duration-300 overflow-hidden">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
          
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

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
            <Button
              size="icon"
              variant="secondary"
              className="w-9 h-9 rounded-full bg-white/90 hover:bg-white"
              onClick={handleWishlist}
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="w-9 h-9 rounded-full bg-white/90 hover:bg-white"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="w-9 h-9 rounded-full bg-white/90 hover:bg-white"
            >
              <Share2 className="h-4 w-4" />
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
    </Link>
  );
};

export default ProductCard;