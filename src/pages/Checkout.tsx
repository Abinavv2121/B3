import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  MapPin, 
  CreditCard, 
  Package, 
  Shield,
  CheckCircle,
  AlertCircle,
  Truck
} from "lucide-react";
import Navigation from "@/components/Navigation";
import SupportiveToolbar from "@/components/SupportiveToolbar";

interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

interface PaymentDetails {
  method: 'razorpay' | 'cod';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

// Initialize EmailJS
emailjs.init("YOUR_PUBLIC_KEY");

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { toast } = useToast();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  // Form state
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India'
  });
  
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cod'>('razorpay');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Calculate totals
  const subtotal = cartTotal;
  const discount = cartItems.reduce((sum, item) => sum + ((item.originalPrice || 0) - item.price) * item.quantity, 0);
  const shipping = subtotal > 29999 ? 0 : 299;
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + shipping + tax;

  const handleInputChange = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'pincode'];
    const missing = required.filter(field => !shippingAddress[field as keyof ShippingAddress]);
    
    if (missing.length > 0) {
      toast({
        title: "Required fields missing",
        description: `Please fill in: ${missing.join(', ')}`,
        variant: "destructive"
      });
      return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(shippingAddress.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return false;
    }
    
    // Phone validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(shippingAddress.phone)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive"
      });
      return false;
    }
    
    // Pincode validation
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    if (!pincodeRegex.test(shippingAddress.pincode)) {
      toast({
        title: "Invalid pincode",
        description: "Please enter a valid 6-digit pincode",
        variant: "destructive"
      });
      return false;
    }
    
    if (!agreeToTerms) {
      toast({
        title: "Terms not accepted",
        description: "Please accept the terms and conditions to proceed",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const initiateRazorpayPayment = async () => {
    try {
      // Create order on backend (you'll need to implement this endpoint)
      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: total * 100, // Amount in paisa
          currency: 'INR',
          receipt: `order_${Date.now()}`,
          notes: {
            customerId: shippingAddress.email,
            items: cartItems.length
          }
        }),
      });
      
      const order = await orderResponse.json();
      
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Your Razorpay key
        amount: order.amount,
        currency: order.currency,
        name: 'B3 Fashion Studio',
        description: 'Premium Ethnic Wear',
        image: '/src/assets/brand-logo.png',
        order_id: order.id,
        handler: async (response: any) => {
          await handlePaymentSuccess({
            method: 'razorpay',
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature
          });
        },
        prefill: {
          name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
          email: shippingAddress.email,
          contact: shippingAddress.phone
        },
        notes: {
          address: shippingAddress.address
        },
        theme: {
          color: '#D4AF37'
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            toast({
              title: "Payment cancelled",
              description: "You can try again when ready",
              variant: "default"
            });
          }
        }
      };
      
      const rzp = new window.Razorpay(options);
      rzp.open();
      
    } catch (error) {
      console.error('Payment initiation failed:', error);
      setIsProcessing(false);
      toast({
        title: "Payment setup failed",
        description: "Please try again or contact support",
        variant: "destructive"
      });
    }
  };

  const handlePaymentSuccess = async (paymentDetails: PaymentDetails) => {
    try {
      // Verify payment on backend (implement this endpoint)
      const verifyResponse = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...paymentDetails,
          shippingAddress,
          cartItems,
          totals: {
            subtotal,
            discount,
            shipping,
            tax,
            total
          }
        }),
      });
      
      const verification = await verifyResponse.json();
      
      if (verification.success) {
        // Clear cart and redirect to success page
        clearCart();
        navigate('/order-success', { 
          state: { 
            orderId: verification.orderId,
            paymentMethod: paymentDetails.method,
            total 
          } 
        });
      } else {
        throw new Error('Payment verification failed');
      }
      
    } catch (error) {
      console.error('Payment verification failed:', error);
      toast({
        title: "Payment verification failed",
        description: "Please contact support with your payment details",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCODOrder = async () => {
    try {
      // Generate a unique order ID
      const orderId = `B3_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Create order object
      const order = {
        orderId,
        date: new Date().toISOString(),
        shippingAddress,
        cartItems,
        totals: {
          subtotal,
          discount,
          shipping,
          tax,
          total
        },
        paymentMethod: 'cod',
        status: 'pending'
      };
      
      // Save to localStorage
      const existingOrders = JSON.parse(localStorage.getItem('b3_orders') || '[]');
      existingOrders.push(order);
      localStorage.setItem('b3_orders', JSON.stringify(existingOrders));
      
      // Send order confirmation emails
      try {
        // Send to customer
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE,
          {
            to_name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
            to_email: shippingAddress.email,
            order_id: orderId,
            order_date: new Date().toLocaleDateString('en-IN'),
            shipping_address: `${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.state} - ${shippingAddress.pincode}`,
            order_total: `₹${total.toLocaleString()}`,
            items_list: cartItems.map(item => 
              `${item.name} (${item.selectedSize || 'N/A'}) x ${item.quantity} - ₹${(item.price * item.quantity).toLocaleString()}`
            ).join('\\n'),
            payment_method: 'Cash on Delivery'
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );

        // Send to business
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_BUSINESS_TEMPLATE,
          {
            order_id: orderId,
            customer_name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
            customer_email: shippingAddress.email,
            customer_phone: shippingAddress.phone,
            shipping_address: `${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.state} - ${shippingAddress.pincode}`,
            order_total: `₹${total.toLocaleString()}`,
            items_list: cartItems.map(item => 
              `${item.name} (${item.selectedSize || 'N/A'}) x ${item.quantity} - ₹${(item.price * item.quantity).toLocaleString()}`
            ).join('\\n'),
            payment_method: 'Cash on Delivery'
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );

        toast({
          title: "Order Placed Successfully",
          description: "Order confirmation sent to your email",
          variant: "success"
        });
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        toast({
          title: "Order Placed Successfully",
          description: "Order confirmation email could not be sent",
          variant: "warning"
        });
      }
      
      // Clear cart and navigate to success page
      clearCart();
      navigate('/order-success', { 
        state: { 
          orderId,
          paymentMethod: 'cod',
          total 
        } 
      });
      
    } catch (error) {
      console.error('COD order failed:', error);
      toast({
        title: "Order creation failed",
        description: "Please try again or contact support",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;
    
    setIsProcessing(true);
    
    if (paymentMethod === 'razorpay') {
      await initiateRazorpayPayment();
    } else {
      await handleCODOrder();
    }
  };

  if (cartItems.length === 0) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <SupportiveToolbar />
      
      <main className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/cart')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Cart</span>
            </Button>
            <h1 className="text-3xl lg:text-4xl font-['Playfair_Display'] font-bold text-gray-900">
              Checkout
            </h1>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep 
                      ? 'bg-cultural text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step < currentStep ? <CheckCircle className="w-4 h-4" /> : step}
                  </div>
                  <span className={`ml-2 text-sm ${
                    step <= currentStep ? 'text-cultural font-medium' : 'text-gray-500'
                  }`}>
                    {step === 1 ? 'Shipping' : step === 2 ? 'Payment' : 'Review'}
                  </span>
                  {step < 3 && (
                    <div className={`ml-8 w-16 h-0.5 ${
                      step < currentStep ? 'bg-cultural' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>Shipping Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={shippingAddress.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={shippingAddress.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingAddress.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={shippingAddress.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Enter 10-digit phone number"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      value={shippingAddress.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="House number, street name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="apartment">Apartment, suite, etc.</Label>
                    <Input
                      id="apartment"
                      value={shippingAddress.apartment}
                      onChange={(e) => handleInputChange('apartment', e.target.value)}
                      placeholder="Apartment, suite, unit (optional)"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={shippingAddress.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="Enter city"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={shippingAddress.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        placeholder="Enter state"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pincode">Pincode *</Label>
                      <Input
                        id="pincode"
                        value={shippingAddress.pincode}
                        onChange={(e) => handleInputChange('pincode', e.target.value)}
                        placeholder="Enter pincode"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5" />
                    <span>Payment Method</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div 
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === 'razorpay' 
                          ? 'border-cultural bg-cultural/5' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setPaymentMethod('razorpay')}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          checked={paymentMethod === 'razorpay'}
                          onChange={() => setPaymentMethod('razorpay')}
                          className="text-cultural"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">Online Payment</span>
                            <Badge variant="secondary">Recommended</Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            Pay securely with UPI, Credit Card, Debit Card, or Net Banking
                          </p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <img src="https://razorpay.com/assets/razorpay-logo.svg" alt="Razorpay" className="h-6" />
                        </div>
                      </div>
                    </div>
                    
                    <div 
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === 'cod' 
                          ? 'border-cultural bg-cultural/5' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setPaymentMethod('cod')}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                          className="text-cultural"
                        />
                        <div className="flex-1">
                          <span className="font-medium">Cash on Delivery</span>
                          <p className="text-sm text-gray-600">
                            Pay when your order is delivered
                          </p>
                        </div>
                        <Truck className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Terms and Conditions */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      className="mt-1"
                    />
                    <div>
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the{' '}
                        <a href="/terms" className="text-cultural hover:underline">
                          Terms and Conditions
                        </a>{' '}
                        and{' '}
                        <a href="/privacy" className="text-cultural hover:underline">
                          Privacy Policy
                        </a>
                      </Label>
                      <p className="text-xs text-gray-600 mt-1">
                        By placing your order, you agree to our terms of service and privacy policy.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="h-5 w-5" />
                    <span>Order Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Cart Items */}
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex space-x-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            {item.selectedSize && `Size: ${item.selectedSize}`}
                            {item.selectedColor && ` • Color: ${item.selectedColor}`}
                          </p>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">₹{item.price.toLocaleString()}</span>
                            <span className="text-xs text-gray-500">× {item.quantity}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal ({cartItems.length} items)</span>
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
                    <div className="flex justify-between text-sm">
                      <span>Tax (GST 18%)</span>
                      <span>₹{tax.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                  
                  {/* Terms and Conditions */}
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      className="mt-1"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      I agree to the{" "}
                      <a href="/terms" className="text-red-600 hover:text-red-700">Terms and Conditions</a>
                      {" "}and{" "}
                      <a href="/privacy" className="text-red-600 hover:text-red-700">Privacy Policy</a>
                    </label>
                  </div>

                  <Button 
                    className="w-full py-6 text-lg font-medium bg-black hover:bg-black/90 text-white"
                    onClick={handlePlaceOrder}
                    disabled={!agreeToTerms || isProcessing}
                  >
                    {isProcessing ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      `Place Order • ₹${total.toLocaleString()}`
                    )}
                  </Button>
                  
                  {/* Security Info */}
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mt-4">
                    <Shield className="h-4 w-4" />
                    <span>Your payment information is secure and encrypted</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;