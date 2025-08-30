import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useFavourites } from '@/contexts/FavouritesContext';
import { supabaseUtils } from '@/hooks/useSupabase';
import { Database } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Heart, ShoppingCart, Star, Share2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
 
type ProductRow = Database['public']['Tables']['products']['Row'];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const { addToFavourites, removeFromFavourites, favourites } = useFavourites();
  
  const [product, setProduct] = useState<ProductRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [activeImage, setActiveImage] = useState<string>('');
  // Quantity is always 1 (unique items). No UI needed.

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      console.log('Fetching product with ID:', id);
      if (!id) {
        console.log('No ID provided');
        return;
      }
      
      try {
        setLoading(true);
        const { data, error } = await supabaseUtils.getProduct(id);
        console.log('Supabase response:', { data, error });
        
        if (error) {
          console.error('Error fetching product:', error);
          toast({
            title: "Error",
            description: "Failed to load product details",
            variant: "destructive",
          });
          return;
        }
        
        if (data && data.length > 0) {
          console.log('Product data received:', data[0]);
          setProduct(data[0]);
          const imgs = [data[0].image_url, ...(data[0].additional_images || [])].filter(Boolean) as string[];
          setActiveImage(imgs[0] || '');
          // Set default selections
          if (data[0].sizes && data[0].sizes.length > 0) {
            setSelectedSize(data[0].sizes[0]);
          }
          if (data[0].colors && data[0].colors.length > 0) {
            setSelectedColor(data[0].colors[0]);
          } else if (data[0].primary_color) {
            setSelectedColor(data[0].primary_color);
          }
        } else {
          console.log('No product data received:', data);
        }
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // All images combined
  const allImages = useMemo(() => {
    if (!product) return [] as string[];
    return [product.image_url, ...(product.additional_images || [])].filter(Boolean) as string[];
  }, [product]);

  // Check if product is in cart
  const isProductInCart = useMemo(() => {
    if (!product) return false;
    const requiresSize = Array.isArray(product.sizes) && product.sizes.length > 0;
    const requiresColor = Array.isArray(product.colors) && product.colors.length > 0;
    const currentColor = requiresColor ? selectedColor : (product.primary_color || undefined);
    const currentSize = requiresSize ? selectedSize : undefined;
    return cartItems.some(item => 
      item.id === product.id && 
      item.selectedSize === currentSize && 
      item.selectedColor === currentColor
    );
  }, [product, cartItems, selectedSize, selectedColor]);

  // Check if product is in favourites
  const isWishlisted = useMemo(() => {
    if (!product) return false;
    return favourites.some(item => item.id === product.id);
  }, [product, favourites]);

  // Selection requirements and derived color
  const requiresSize = useMemo(() => !!(product && Array.isArray(product.sizes) && product.sizes.length > 0), [product]);
  const requiresColor = useMemo(() => !!(product && Array.isArray(product.colors) && product.colors.length > 0), [product]);
  const effectiveColor = useMemo(() => {
    if (requiresColor && selectedColor) return selectedColor;
    return product?.primary_color || '';
  }, [requiresColor, selectedColor, product]);

  // Resolve CSS color from name/hex with robust normalization
  const resolveColor = (input: string): string => {
    if (!input) return '#9CA3AF';
    const colorMap: Record<string, string> = {
      'BLACK': '#000000', 'WHITE': '#FFFFFF', 'OFF WHITE': '#FAF9F6', 'IVORY': '#FFFFF0',
      'RED': '#EF4444', 'MAROON': '#7F1D1D', 'WINE': '#4B0625', 'BURGUNDY': '#800020',
      'PINK': '#EC4899', 'RANI PINK': '#E11D48', 'HOT PINK': '#DB2777', 'MAGENTA': '#D81B60', 'FUCHSIA': '#C2185B',
      'PEACH': '#FFCCB6', 'CORAL': '#FF7F50', 'ORANGE': '#FB923C', 'TANGERINE': '#F59E0B', 'YELLOW': '#F59E0B',
      'GOLD': '#D4AF37', 'ROSE GOLD': '#B76E79', 'SILVER': '#C0C0C0', 'CHAMPAGNE': '#F7E7CE', 'BEIGE': '#F5F5DC', 'CREAM': '#FFFDD0',
      'BROWN': '#92400E', 'COFFEE': '#6F4E37', 'TAN': '#D2B48C',
      'BLUE': '#3B82F6', 'NAVY': '#1E3A8A', 'ROYAL BLUE': '#1D4ED8', 'SKY BLUE': '#38BDF8', 'TEAL BLUE': '#0F766E',
      'GREEN': '#10B981', 'EMERALD': '#059669', 'BOTTLE GREEN': '#1B4D3E', 'SEA GREEN': '#2E8B57', 'MINT': '#98FF98', 'OLIVE': '#556B2F', 'SAGE': '#9CAF88',
      'TURQUOISE': '#40E0D0', 'AQUA': '#00FFFF', 'TEAL': '#14B8A6',
      'PURPLE': '#8B5CF6', 'LAVENDER': '#B794F4', 'VIOLET': '#7C3AED',
      'GREY': '#9CA3AF', 'GRAY': '#9CA3AF', 'CHARCOAL': '#36454F'
    };
    const isHex = /^#([0-9A-F]{3}){1,2}$/i.test(input);
    if (isHex) return input;
    const norm = input.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim().toUpperCase();
    if (colorMap[norm]) return colorMap[norm];
    // Browser validation fallback
    const opt = document.createElement('option');
    opt.style.color = input;
    if (opt.style.color) return input;
    return '#9CA3AF';
  };

  const resolvedPrimary = useMemo(() => resolveColor(effectiveColor), [effectiveColor]);

  const pageBgStyle = useMemo(() => {
    // Try to build a subtle gradient anchored to primary color
    // Use rgba with low alpha for start color
    const span = document.createElement('span');
    span.style.color = resolvedPrimary;
    const rgb = getComputedStyle(span).color; // "rgb(r, g, b)"
    const match = rgb.match(/\d+/g);
    const [r, g, b] = match ? match.map(Number) : [240, 200, 120];
    return {
      background: `linear-gradient(180deg, rgba(${r}, ${g}, ${b}, 0.25) 0%, rgba(${r}, ${g}, ${b}, 0.12) 35%, #FFF7E6 100%)`
    } as React.CSSProperties;
  }, [resolvedPrimary]);

  // Handle add to cart
  const handleAddToCart = () => {
    if (!product) return;
    if ((requiresSize && !selectedSize) || (requiresColor && !selectedColor)) {
      toast({
        title: "Selection Required",
        description: `${requiresSize && !selectedSize ? 'Please select a size. ' : ''}${requiresColor && !selectedColor ? 'Please select a color.' : ''}`.trim(),
        variant: "destructive",
      });
      return;
    }
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.original_price || product.price,
      image: product.image_url || '',
      selectedSize: requiresSize ? selectedSize : undefined,
      selectedColor: requiresColor ? selectedColor : (product.primary_color || undefined),
      category: product.category || 'General',
    } as const;

    addToCart(cartItem);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  // Handle wishlist toggle
  const handleWishlistToggle = () => {
    if (!product) return;

    if (isWishlisted) {
      removeFromFavourites(product.id);
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} has been removed from your wishlist`,
      });
    } else {
      addToFavourites({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.original_price || product.price,
        image: product.image_url || '',
        category: product.category || 'General',
        rating: product.rating,
        reviews: product.reviews,
        colors: product.colors,
        sizes: product.sizes,
        isNew: product.is_new,
        isBestSeller: product.is_best_seller,
      });
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist`,
      });
    }
  };

  // Calculate discount percentage
  const discountPercentage = useMemo(() => {
    if (!product) return 0;
    const originalPrice = product.original_price;
    if (!originalPrice || originalPrice <= product.price) return 0;
    return Math.round(((originalPrice - product.price) / originalPrice) * 100);
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-amber-200 to-orange-300 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-400 mx-auto mb-4"></div>
          <p className="text-amber-600 text-lg">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-amber-200 to-orange-300 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-amber-800 mb-4">Product Not Found</h1>
          <p className="text-amber-600 mb-6">The product you're looking for doesn't exist or failed to load.</p>
          <Button onClick={() => navigate('/')} className="bg-amber-500 hover:bg-amber-600 mt-4">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={pageBgStyle}>
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-md border-b border-amber-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="text-amber-700 hover:text-amber-800 hover:bg-amber-100/50"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Button>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleWishlistToggle}
                className={`${
                  isWishlisted 
                    ? 'text-red-500 hover:text-red-600 hover:bg-red-50' 
                    : 'text-amber-600 hover:text-amber-700 hover:bg-amber-100/50'
                }`}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="text-amber-600 hover:text-amber-700 hover:bg-amber-100/50"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-3xl overflow-hidden bg-white/80 shadow-xl border border-amber-100/50">
              <img 
                src={activeImage || product.image_url || ''} 
                alt={product.name}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            
            {/* Thumbnail Navigation */}
            {allImages.length > 0 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {allImages.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    onClick={() => setActiveImage(image)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      activeImage === image ? 'border-amber-500' : 'border-slate-200 hover:border-amber-300'
                    }`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} - View ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Breadcrumb */}
            <nav className="text-sm text-amber-500">
              <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-amber-700">{product.name}</span>
            </nav>

            {/* Product Title & Rating */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-amber-800 mb-2 font-hind">
                {product.name}
              </h1>
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${
                        i < 4 ? 'text-amber-400 fill-current' : 'text-amber-200'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-amber-600 text-sm">(4.8 • 127 reviews)</span>
              </div>
              
              {product.design && (
                <p className="text-lg text-amber-600 font-medium">Design: {product.design}</p>
              )}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-amber-800">
                  ₹{product.price.toLocaleString()}
                </span>
                {discountPercentage > 0 && (
                  <>
                    <span className="text-xl text-amber-500 line-through">
                      ₹{product.original_price?.toLocaleString()}
                    </span>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      {discountPercentage}% OFF
                    </Badge>
                  </>
                )}
              </div>
              
              {product.original_price && product.original_price > product.price && (
                <p className="text-sm text-green-600 font-medium">
                  You save ₹{(product.original_price - product.price).toLocaleString()}
                </p>
              )}
            </div>

            {/* Primary Color */}
            {(effectiveColor) && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-amber-800">Primary Color</h3>
                <div className="flex items-center space-x-3">
                  {(() => {
                    const colorMap: Record<string, string> = {
                      'BLACK': '#000000', 'WHITE': '#FFFFFF', 'OFF WHITE': '#FAF9F6', 'IVORY': '#FFFFF0',
                      'RED': '#EF4444', 'MAROON': '#7F1D1D', 'WINE': '#4B0625', 'BURGUNDY': '#800020',
                      'PINK': '#EC4899', 'RANI PINK': '#E11D48', 'HOT PINK': '#DB2777', 'MAGENTA': '#D81B60', 'FUCHSIA': '#C2185B',
                      'PEACH': '#FFCCB6', 'CORAL': '#FF7F50', 'ORANGE': '#FB923C', 'TANGERINE': '#F59E0B', 'YELLOW': '#F59E0B',
                      'GOLD': '#D4AF37', 'ROSE GOLD': '#B76E79', 'SILVER': '#C0C0C0', 'CHAMPAGNE': '#F7E7CE', 'BEIGE': '#F5F5DC', 'CREAM': '#FFFDD0',
                      'BROWN': '#92400E', 'COFFEE': '#6F4E37', 'TAN': '#D2B48C',
                      'BLUE': '#3B82F6', 'NAVY': '#1E3A8A', 'ROYAL BLUE': '#1D4ED8', 'SKY BLUE': '#38BDF8', 'TEAL BLUE': '#0F766E',
                      'GREEN': '#10B981', 'EMERALD': '#059669', 'BOTTLE GREEN': '#1B4D3E', 'SEA GREEN': '#2E8B57', 'MINT': '#98FF98', 'OLIVE': '#556B2F', 'SAGE': '#9CAF88',
                      'TURQUOISE': '#40E0D0', 'AQUA': '#00FFFF', 'TEAL': '#14B8A6',
                      'PURPLE': '#8B5CF6', 'LAVENDER': '#B794F4', 'VIOLET': '#7C3AED',
                      'GREY': '#9CA3AF', 'GRAY': '#9CA3AF', 'CHARCOAL': '#36454F'
                    };
                    const normalize = (c: string) => c.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim().toUpperCase();
                    const key = normalize(String(effectiveColor));
                    const isHex = /^#([0-9A-F]{3}){1,2}$/i.test(String(effectiveColor));
                    const swatch = isHex ? String(effectiveColor) : (colorMap[key] || '#9CA3AF');
                    return (
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full border-2 border-amber-300 shadow-md" style={{ backgroundColor: swatch }} />
                        <span className="text-amber-700 font-medium">{String(effectiveColor)}</span>
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-amber-800">Select Size</h3>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-3 rounded-lg border-2 text-center font-medium transition-all ${
                        selectedSize === size
                          ? 'border-amber-500 bg-amber-50 text-amber-700'
                          : 'border-amber-200 hover:border-amber-300 hover:bg-amber-50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-amber-800">Select Color</h3>
                <div className="flex space-x-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color
                          ? 'border-amber-500 scale-110 shadow-lg'
                          : 'border-amber-200 hover:border-amber-400'
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    ></button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity removed: unique pieces */}

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <Button
                onClick={handleAddToCart}
                disabled={isProductInCart || (requiresSize && !selectedSize) || (requiresColor && !selectedColor)}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-amber-300 disabled:to-orange-300 disabled:cursor-not-allowed text-white shadow-lg"
              >
                {isProductInCart ? (
                  <>
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Already in Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                onClick={handleWishlistToggle}
                className="w-full h-14 text-lg font-semibold border-2 border-amber-300 hover:border-amber-400 hover:bg-amber-50 text-amber-700"
              >
                <Heart className={`h-5 w-5 mr-2 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
                {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </Button>
            </div>

            {/* Description moved here */}
            {product.description && (
              <div className="mt-6 pt-6 border-t border-amber-200/60">
                <h2 className="text-xl font-semibold text-amber-800 mb-2 font-hind">Description</h2>
                <p className="text-amber-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Product Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-amber-200/50">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-lg">🚚</span>
                </div>
                <p className="text-sm font-medium text-amber-700">Free Shipping</p>
                <p className="text-xs text-amber-500">On orders above ₹999</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-lg">🔒</span>
                </div>
                <p className="text-sm font-medium text-amber-700">Secure Payment</p>
                <p className="text-xs text-amber-500">100% secure checkout</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-lg">🔄</span>
                </div>
                <p className="text-sm font-medium text-amber-700">Easy Returns</p>
                <p className="text-xs text-amber-500">30 day return policy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="mt-12 pt-8 border-t border-amber-200/50">
          <h2 className="text-2xl font-bold text-amber-800 mb-6 font-hind">Product Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-amber-100">
                <span className="text-amber-600">Category</span>
                <span className="font-medium text-amber-800">{product.category}</span>
              </div>
              {/* Add more attributes here if present in schema */}
            </div>
            <div className="space-y-4">
              {product.sizes && (
                <div className="flex justify-between py-2 border-b border-amber-100">
                  <span className="text-amber-600">Available Sizes</span>
                  <span className="font-medium text-amber-800">{product.sizes.join(', ')}</span>
                </div>
              )}
              {product.colors && (
                <div className="flex justify-between py-2 border-b border-amber-100">
                  <span className="text-amber-600">Available Colors</span>
                  <span className="font-medium text-amber-800">{product.colors.join(', ')}</span>
                </div>
              )}
              <div className="flex justify-between py-2 border-b border-amber-100">
                <span className="text-amber-600">SKU</span>
                <span className="font-medium text-amber-800">{`B3SKU${product.id.toString().padStart(3, '0')}`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
