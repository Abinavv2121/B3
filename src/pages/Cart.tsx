import Navigation from "@/components/Navigation";
import SupportiveToolbar from "@/components/SupportiveToolbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Minus, Plus, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  const subtotal = cartTotal;
  const discount = cartItems.reduce((sum, item) => sum + ((item.originalPrice || 0) - item.price) * item.quantity, 0);
  const shipping = subtotal > 29999 ? 0 : 299;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <SupportiveToolbar />
      
      <main className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Continue Shopping</span>
                </Button>
              </Link>
            </div>
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900">
              Shopping Cart
            </h1>
          </div>

          {cartItems.length === 0 ? (
            // Empty Cart State
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
              <Link to="/">
                <Button className="bg-cultural hover:bg-cultural/90">
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Cart Items ({cartItems.length})
                    </h2>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="p-6">
                        <div className="flex items-start space-x-4">
                          {/* Product Image */}
                          <div className="flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-24 h-32 object-cover rounded-lg"
                            />
                          </div>
                          
                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                  {item.name}
                                </h3>
                                <p className="text-sm text-gray-600 mb-2">
                                  {item.category}
                                </p>
                                
                                {/* Size and Color */}
                                <div className="flex space-x-4 text-sm text-gray-600 mb-3">
                                  {item.selectedSize && (
                                    <span>Size: {item.selectedSize}</span>
                                  )}
                                  {item.selectedColor && (
                                    <span>Color: {item.selectedColor}</span>
                                  )}
                                </div>
                                
                                {/* Price */}
                                <div className="flex items-center space-x-3">
                                  <span className="text-lg font-bold text-gray-900">
                                    ₹{item.price.toLocaleString()}
                                  </span>
                                  {item.originalPrice && item.originalPrice > item.price && (
                                    <span className="text-sm text-gray-500 line-through">
                                      ₹{item.originalPrice.toLocaleString()}
                                    </span>
                                  )}
                                </div>
                              </div>
                              
                              {/* Remove Button */}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-3 mt-4">
                              <span className="text-sm text-gray-600">Quantity:</span>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  className="w-8 h-8 p-0"
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center text-sm font-medium">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-8 h-8 p-0"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-32">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Order Summary
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    
                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount</span>
                        <span>-₹{discount.toLocaleString()}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>₹{total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <Button className="w-full bg-cultural hover:bg-cultural/90">
                      Proceed to Checkout
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </Button>
                  </div>
                  
                  {/* Shipping Info */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-sm text-gray-900 mb-2">
                      Shipping Information
                    </h3>
                    <p className="text-xs text-gray-600">
                      Free shipping on orders above ₹29,999. Standard delivery takes 3-5 business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Cart; 