import Navigation from "@/components/Navigation";
import SupportiveToolbar from "@/components/SupportiveToolbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Heart, ShoppingBag, ArrowLeft, Star, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavourites } from "@/contexts/FavouritesContext";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useMemo, useState } from "react";

const Wishlist = () => {
  const { favourites, removeFromFavourites, clearFavourites } = useFavourites();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"recent" | "priceAsc" | "priceDesc" | "popular">("recent");

  const handleRemoveFromWishlist = (productId: string, productName: string) => {
    removeFromFavourites(productId);
    toast({
      title: "Removed from wishlist",
      description: `${productName} has been removed from your wishlist`,
    });
    setSelectedIds(prev => {
      const copy = new Set(prev);
      copy.delete(productId);
      return copy;
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

  const categories = useMemo(() => {
    const map = new Map<string, number>();
    favourites.forEach(f => map.set(f.category, (map.get(f.category) || 0) + 1));
    return [{ id: "all", name: "All", count: favourites.length }, ...Array.from(map.entries()).map(([name, count]) => ({ id: name, name, count }))];
  }, [favourites]);

  const filteredSorted = useMemo(() => {
    let list = activeCategory === "all" ? favourites : favourites.filter(f => f.category === activeCategory);
    switch (sortBy) {
      case "priceAsc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "popular":
        list = [...list].sort((a, b) => b.reviews - a.reviews);
        break;
      case "recent":
      default:
        list = [...list].sort((a, b) => b.addedAt.getTime() - a.addedAt.getTime());
    }
    return list;
  }, [favourites, activeCategory, sortBy]);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const copy = new Set(prev);
      if (copy.has(id)) copy.delete(id); else copy.add(id);
      return copy;
    });
  };

  const selectAllVisible = () => {
    setSelectedIds(new Set(filteredSorted.map(f => f.id)));
  };

  const clearSelection = () => setSelectedIds(new Set());

  const addSelectedToCart = () => {
    if (selectedIds.size === 0) return;
    const selected = filteredSorted.filter(f => selectedIds.has(f.id));
    selected.forEach(item => {
      addToCart({
        id: item.id,
        name: item.name,
        category: item.category,
        price: item.price,
        originalPrice: item.originalPrice,
        image: item.image,
        selectedSize: item.sizes[0],
        selectedColor: item.colors[0],
      });
    });
    toast({ title: "Added to cart", description: `${selected.length} item(s) added to your cart` });
    clearSelection();
  };

  if (favourites.length === 0) {
    return (
      <>
        <Navigation />
        <SupportiveToolbar />
        <div className="min-h-screen bg-royal-silk pt-32">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center max-w-xl mx-auto">
              <div className="inline-flex items-center gap-2 mb-4 text-[hsl(var(--lux-gold-1))]">
                <Crown className="w-6 h-6" />
                <span className="text-xs tracking-[0.35em] uppercase">Wishlist</span>
                <Crown className="w-6 h-6" />
              </div>
              <h1 className="text-3xl font-['Playfair_Display'] font-semibold mb-3">Your Wishlist is Empty</h1>
              <p className="text-muted-foreground mb-8">
                Save your favourite looks and compare styles anytime.
              </p>
              <Link to="/">
                <Button variant="outlineLuxury">
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
      <div className="min-h-screen bg-royal-silk pt-32">
        <div className="container mx-auto px-4 py-10">
          {/* Header */}
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 text-[hsl(var(--lux-gold-1))]">
                <Crown className="w-5 h-5" />
                <span className="text-[11px] tracking-[0.35em] uppercase">Wishlist</span>
              </div>
              <h1 className="text-3xl font-['Playfair_Display'] font-semibold">
                My Wishlist
              </h1>
              <p className="text-muted-foreground mt-1">
                {favourites.length} {favourites.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="ghost"
                onClick={handleClearWishlist}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear All
              </Button>
              <Link to="/">
                <Button variant="outlineLuxury">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          {/* Controls: Categories + Sort + Bulk */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            {/* Category filters */}
            <div className="flex items-center gap-2">
              <div className="flex space-x-1 p-1 rounded-2xl gold-border bg-white/10 backdrop-blur">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeCategory === cat.id
                        ? 'text-foreground shadow-[var(--shadow-elegant)] gold-sheen'
                        : 'text-foreground/70 hover:text-foreground'
                    }`}
                  >
                    {cat.name}
                    <span className="ml-2 text-xs opacity-80">({cat.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sort and bulk actions */}
            <div className="flex items-center gap-3">
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
                <SelectTrigger className="w-[200px] gold-border bg-white/60">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recently added</SelectItem>
                  <SelectItem value="priceAsc">Price: Low to High</SelectItem>
                  <SelectItem value="priceDesc">Price: High to Low</SelectItem>
                  <SelectItem value="popular">Popularity</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outlineLuxury"
                onClick={selectAllVisible}
              >
                Select Visible
              </Button>
              <Button
                variant="ghost"
                onClick={clearSelection}
                className="text-foreground/70 hover:text-foreground"
              >
                Clear Selection
              </Button>
              <Button
                variant="luxury"
                onClick={addSelectedToCart}
                disabled={selectedIds.size === 0}
              >
                <ShoppingBag className="mr-2 h-4 w-4" /> Add Selected
              </Button>
            </div>
          </div>

          {/* Wishlist Items */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredSorted.map((item) => (
              <div key={item.id} className="gold-border bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden hover-lift transition-shadow">
                <div className="flex">
                  {/* Product Image */}
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2 bg-white/80 rounded-full p-1 shadow">
                      <Checkbox checked={selectedIds.has(item.id)} onCheckedChange={() => toggleSelect(item.id)} />
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-['Playfair_Display'] font-semibold text-lg line-clamp-2">
                        {item.name}
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        aria-label={`Remove ${item.name} from wishlist`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Category */}
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                      {item.category}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${
                              i < Math.floor(item.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        ({item.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-lg font-bold text-primary">
                        ₹{item.price.toLocaleString()}
                      </span>
                      {item.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
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
                        variant="luxury"
                        className="flex-1"
                        onClick={() => {
                          addToCart({
                            id: item.id,
                            name: item.name,
                            category: item.category,
                            price: item.price,
                            originalPrice: item.originalPrice,
                            image: item.image,
                            selectedSize: item.sizes[0],
                            selectedColor: item.colors[0],
                          });
                          handleAddToCart(item.name);
                        }}
                      >
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Heart className="h-4 w-4 fill-red-500" />
                      </Button>
                    </div>

                    {/* Added Date */}
                    <p className="text-xs text-muted-foreground mt-3">
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
              <div className="inline-flex items-center gap-2 mb-4 text-[hsl(var(--lux-gold-1))]">
                <Crown className="w-6 h-6" />
                <span className="text-xs tracking-[0.35em] uppercase">Wishlist</span>
                <Crown className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-['Playfair_Display'] font-semibold mb-2">Your Wishlist is Empty</h2>
              <p className="text-muted-foreground mb-8">Start adding your favorite products to your wishlist.</p>
              <Link to="/">
                <Button variant="outlineLuxury">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Sticky mobile bulk action bar */}
        {selectedIds.size > 0 && (
          <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
            <div className="gold-border bg-white/90 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-3 shadow-lg">
              <span className="text-sm">Selected: {selectedIds.size}</span>
              <Button size="sm" variant="luxury" onClick={addSelectedToCart}>
                <ShoppingBag className="mr-2 h-4 w-4" /> Add
              </Button>
              <Button size="sm" variant="ghost" onClick={clearSelection} className="text-foreground/70 hover:text-foreground">
                Clear
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Wishlist; 