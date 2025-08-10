import { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CheckCircle, 
  Package, 
  Truck, 
  Calendar, 
  Phone, 
  Mail,
  Download,
  Home,
  ArrowRight
} from "lucide-react";
import Navigation from "@/components/Navigation";
import SupportiveToolbar from "@/components/SupportiveToolbar";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const orderData = location.state;
  
  useEffect(() => {
    // Redirect if no order data
    if (!orderData) {
      navigate('/cart');
    }
  }, [orderData, navigate]);

  if (!orderData) {
    return null;
  }

  const { orderId, paymentMethod, total } = orderData;
  const expectedDelivery = new Date();
  expectedDelivery.setDate(expectedDelivery.getDate() + 7); // 7 days from now

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <SupportiveToolbar />
      
      <main className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-['Playfair_Display'] font-bold text-gray-900 mb-4">
              Order Placed Successfully!
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Thank you for your purchase. We've received your order and will begin processing it shortly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5" />
                  <span>Order Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID</span>
                    <span className="font-mono font-medium">#{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date</span>
                    <span>{new Date().toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method</span>
                    <span className="capitalize">
                      {paymentMethod === 'razorpay' ? 'Online Payment' : 'Cash on Delivery'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Total</span>
                    <span className="font-semibold text-lg">₹{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Status</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      paymentMethod === 'razorpay' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {paymentMethod === 'razorpay' ? 'Paid' : 'Pending'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="h-5 w-5" />
                  <span>Delivery Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Delivery</span>
                    <span className="font-medium">
                      {expectedDelivery.toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Time</span>
                    <span>3-7 Business Days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Status</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      Processing
                    </span>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-800">
                        Track Your Order
                      </p>
                      <p className="text-xs text-amber-700 mt-1">
                        You'll receive tracking information via email and SMS once your order ships.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* What's Next */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>What happens next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Order Processing</h3>
                  <p className="text-sm text-gray-600">
                    We'll prepare your items and quality check each piece before shipping.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Truck className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Shipping</h3>
                  <p className="text-sm text-gray-600">
                    Your order will be carefully packaged and shipped to your address.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Delivery</h3>
                  <p className="text-sm text-gray-600">
                    Receive your beautiful ethnic wear and enjoy wearing it!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact and Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Customer Support</p>
                    <p className="text-sm text-gray-600">+91 98765 43210</p>
                    <p className="text-xs text-gray-500">Mon-Sat, 9 AM - 7 PM</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-gray-600">support@b3fashion.com</p>
                    <p className="text-xs text-gray-500">We'll respond within 24 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.print()}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Invoice
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/account/orders')}
                >
                  <Package className="h-4 w-4 mr-2" />
                  Track Order Status
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  asChild
                >
                  <Link to="/">
                    <Home className="h-4 w-4 mr-2" />
                    Continue Shopping
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-cultural/10 to-cultural/5 rounded-2xl p-8">
              <h2 className="text-2xl font-['Playfair_Display'] font-semibold mb-4">
                Thank you for choosing B3 Fashion Studio
              </h2>
              <p className="text-gray-600 mb-6">
                Follow us on social media for style inspiration and exclusive offers
              </p>
              <div className="flex justify-center space-x-4">
                <Link to="/" className="text-cultural hover:text-cultural/80">
                  <Button>
                    Explore More Collections
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderSuccess;