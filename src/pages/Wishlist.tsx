import Navigation from "@/components/Navigation";
import SupportiveToolbar from "@/components/SupportiveToolbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Heart, ShoppingBag, ArrowLeft, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavourites } from "@/contexts/FavouritesContext";
import { useToast } from "@/hooks/use-toast";

const Wishlist = () => {
  const { favourites, removeFromFavourites, clearFavourites } = useFavourites();
  const { toast } = useToast();

  const handleRemoveFromWishlist = (productId: string, productName: string) => {
    removeFromFavourites(productId);
    toast({
      title: "Removed from wishlist",
      description: `${productName} has been removed from your wishlist`,
    });
  };

  const handleClearWishlist = () => {
    clearFavourites();
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist",
    });
  };

  const handleAddToCart = (productName: string) => {
    toast({
      title: "Added to cart",
      description: `${productName} has been added to your cart`,
    });
  };

  if (favourites.length === 0) {
    return (
      <>
        <Navigation />
        <SupportiveToolbar />
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-rose-50 pt-32">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center">
                <Heart className="h-12 w-12 text-rose-400" />
              </div>
              <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                Your Wishlist is Empty
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                Start adding your favorite products to your wishlist. They'll be saved here for easy access.
              </p>
              <Link to="/">
                <Button className="btn-premium">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <SupportiveToolbar />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-rose-50 pt-32">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-serif font-bold text-gray-900">
                My Wishlist
              </h1>
              <p className="text-gray-600 mt-2">
                {favourites.length} {favourites.length === 1 ? 'item' : 'items'} in your wishlist
              </p>
            </div>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={handleClearWishlist}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear All
              </Button>
              <Link to="/">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          {/* Wishlist Items */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {favourites.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex">
                  {/* Product Image */}
                  <div className="w-32 h-32 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-serif font-semibold text-lg text-gray-900 line-clamp-2">
                        {item.name}
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Category */}
                    <p className="text-sm text-gray-600 mb-2">
                      {item.category}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(item.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">
                        ({item.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-lg font-bold text-primary">
                        ₹{item.price.toLocaleString()}
                      </span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{item.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Badges */}
                    <div className="flex space-x-2 mb-4">
                      {item.isNew && (
                        <Badge className="bg-gradient-cultural text-white text-xs">
                          New
                        </Badge>
                      )}
                      {item.isBestSeller && (
                        <Badge className="bg-gradient-rose-gold text-foreground text-xs">
                          Best Seller
                        </Badge>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <Button
                        className="flex-1 btn-premium"
                        onClick={() => handleAddToCart(item.name)}
                      >
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Heart className="h-4 w-4 fill-red-500" />
                      </Button>
                    </div>

                    {/* Added Date */}
                    <p className="text-xs text-gray-400 mt-3">
                      Added on {item.addedAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State (if all items are removed) */}
          {favourites.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center">
                <Heart className="h-12 w-12 text-rose-400" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                Your Wishlist is Empty
              </h2>
              <p className="text-gray-600 mb-8">
                Start adding your favorite products to your wishlist.
              </p>
              <Link to="/">
                <Button className="btn-premium">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Wishlist; 