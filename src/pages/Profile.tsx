import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useFavourites } from "@/contexts/FavouritesContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Camera, Save, X, ShoppingCart, Heart, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, requireAuth, updateProfile, settings } = useAuth();
  const { cartItems, cartCount } = useCart();
  const { favourites, favouritesCount } = useFavourites();
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar_url: user?.avatar_url || ""
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!requireAuth()) return;
    
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      avatar_url: user?.avatar_url || ""
    });
  }, [user, requireAuth]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const success = await updateProfile({
        name: formData.name,
        avatar_url: formData.avatar_url
      });
      
      if (success) {
        toast({
          title: "Profile Updated",
          description: "Your profile has been successfully updated.",
        });
        setIsEditing(false);
      } else {
        throw new Error("Profile update failed");
      }
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      avatar_url: user?.avatar_url || ""
    });
    setIsEditing(false);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Profile</h1>
            <p className="text-gray-600">Manage your account information and preferences</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Profile Info */}
            <div className="lg:col-span-1">
              {/* Profile Card */}
              <Card className="shadow-lg">
                <CardHeader className="text-center pb-6">
                  <div className="relative inline-block">
                    <Avatar className="h-32 w-32 mx-auto mb-4">
                      <AvatarImage src={formData.avatar_url} alt={user?.name} />
                      <AvatarFallback className="text-4xl bg-gradient-to-br from-amber-400 to-orange-500 text-white">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute bottom-0 right-0 rounded-full h-10 w-10 p-0"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <CardTitle className="text-2xl">{user?.name}</CardTitle>
                  <CardDescription className="text-lg">
                    {settings.showEmail ? user?.email : 'Email hidden'}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Full Name
                    </Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-md border">
                        {user?.name || "Not provided"}
                      </div>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Address
                    </Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Enter your email"
                        disabled // Email usually can't be changed
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-md border">
                        {user?.email}
                      </div>
                    )}
                  </div>

                  {/* Avatar URL Field */}
                  <div className="space-y-2">
                    <Label htmlFor="avatar_url" className="flex items-center gap-2">
                      <Camera className="h-4 w-4" />
                      Profile Picture URL
                    </Label>
                    {isEditing ? (
                      <Input
                        id="avatar_url"
                        value={formData.avatar_url}
                        onChange={(e) => handleInputChange("avatar_url", e.target.value)}
                        placeholder="Enter profile picture URL"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-md border">
                        {user?.avatar_url || "No profile picture set"}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-center gap-4 pt-6">
                    {isEditing ? (
                      <>
                        <Button
                          onClick={handleSave}
                          disabled={isLoading}
                          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                        >
                          {isLoading ? "Saving..." : (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              Save Changes
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleCancel}
                          disabled={isLoading}
                        >
                          <X className="mr-2 h-4 w-4" />
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => setIsEditing(true)}
                        className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Account Info */}
              <Card className="shadow-lg mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Account Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Type:</span>
                    <span className="font-medium">
                      {user?.isGuest ? "Guest" : "Registered User"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Provider:</span>
                    <span className="font-medium">
                      {user?.provider || "Email"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Member Since:</span>
                    <span className="font-medium">2024</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Cart & Wishlist */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cart Summary */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Shopping Cart
                    <Badge variant="secondary" className="ml-2">
                      {cartCount} items
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Your saved cart items will be available across all devices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {cartCount > 0 ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {cartItems.slice(0, 4).map((item, index) => (
                          <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                              <Package className="h-6 w-6 text-gray-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {item.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                ₹{item.price} • {item.selectedSize || 'One Size'}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      {cartCount > 4 && (
                        <p className="text-sm text-gray-500 text-center">
                          +{cartCount - 4} more items in cart
                        </p>
                      )}
                      <Button 
                        onClick={() => navigate("/cart")}
                        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                      >
                        View Full Cart
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 mb-4">Your cart is empty</p>
                      <Button 
                        onClick={() => navigate("/")}
                        variant="outline"
                      >
                        Start Shopping
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Wishlist Summary */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Wishlist
                    <Badge variant="secondary" className="ml-2">
                      {favouritesCount} items
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Your saved favorites are synced across all devices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {favouritesCount > 0 ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {favourites.slice(0, 4).map((item, index) => (
                          <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                              <Heart className="h-6 w-6 text-red-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {item.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                ₹{item.price} • {item.category}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      {favouritesCount > 4 && (
                        <p className="text-sm text-gray-500 text-center">
                          +{favouritesCount - 4} more items in wishlist
                        </p>
                      )}
                      <Button 
                        onClick={() => navigate("/wishlist")}
                        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                      >
                        View Full Wishlist
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 mb-4">Your wishlist is empty</p>
                      <Button 
                        onClick={() => navigate("/")}
                        variant="outline"
                      >
                        Discover Products
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => navigate("/settings")}
                    >
                      Account Settings
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => navigate("/")}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
