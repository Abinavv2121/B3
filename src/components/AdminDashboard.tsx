import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Edit, 
  Trash2, 
  LogOut, 
  Save, 
  X, 
  Package,
  TrendingUp,
  Users,
  ShoppingCart,
  Crown
} from "lucide-react";
import { supabaseUtils } from "@/hooks/useSupabase";
import { Database } from "@/lib/supabase";
import { clearAdminSession } from "@/lib/admin-utils";

type Product = Database['public']['Tables']['products']['Row'];
type ProductInsert = Database['public']['Tables']['products']['Insert'];

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<ProductInsert>>({
    name: "",
    category: "",
    price: 0,
    original_price: 0,
    description: "",
    image_url: "",
    colors: [],
    sizes: [],
    is_new: false,
    is_best_seller: false,
    product_code: "",
    barcode_no: "",
    design: "",
    status: "IN STOCK",
    section: "featured_collections"
  });

  const categories = [
    "Bridal Collection",
    "Festival Glory", 
    "Special Moments",
    "Western Edge",
    "Anarkali",
    "Lehenga",
    "Saree",
    "Salwar Suit"
  ];

  const sections = [
    { value: "customer_favourites", label: "Customer Favourites", description: "Appears in the Customer Favourites carousel" },
    { value: "featured_collections", label: "Featured Collections", description: "Appears in the Featured Collections section" },
    { value: "saree", label: "Saree Collection", description: "Appears in the Saree category showcase" },
    { value: "anarkali", label: "Anarkali Collection", description: "Appears in the Anarkali category showcase" },
    { value: "lehenga", label: "Lehenga Collection", description: "Appears in the Lehenga category showcase" },
    { value: "salwar_suit", label: "Salwar Suit Collection", description: "Appears in the Salwar Suit category showcase" },
    { value: "western_wear", label: "Western Wear Collection", description: "Appears in the Western Wear category showcase" },
    { value: "bridal_collection", label: "Bridal Collection", description: "Appears in the Bridal Collection category showcase" }
  ];

  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL", "Free Size", "NA-5", "30", "38", "NA"];
  const availableColors = ["Red", "Blue", "Green", "Yellow", "Purple", "Pink", "Black", "White", "Gold", "Silver", "Peach", "Beige", "T. Blue", "Orange", "Mustard"];
  const availableStatuses = ["IN STOCK", "SOLD OUT", "OUT OF STOCK", "DISCONTINUED"];

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabaseUtils.getProducts();
      if (error) {
        setError(error.message);
      } else {
        setProducts(data || []);
      }
    } catch (err) {
      setError("Failed to load products");
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.price) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      if (editingProductId) {
        // Update existing product
        const { error } = await supabaseUtils.updateProduct(editingProductId, formData);
        if (error) {
          setError(error.message);
        } else {
          setEditingProductId(null);
          setEditingProduct(null);
          resetForm();
          loadProducts();
        }
      } else {
        // Add new product
        const { error } = await supabaseUtils.addProduct(formData);
        if (error) {
          setError(error.message);
        } else {
          resetForm();
          loadProducts();
        }
      }
    } catch (err) {
      setError("Failed to save product");
    }
  };

  const handleDelete = async (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const { error } = await supabaseUtils.deleteProduct(productId);
        if (error) {
          setError(error.message);
        } else {
          loadProducts();
        }
      } catch (err) {
        setError("Failed to delete product");
      }
    }
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setEditingProductId(product.id);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      original_price: product.original_price,
      description: product.description,
      image_url: product.image_url,
      colors: product.colors,
      sizes: product.sizes,
      is_new: product.is_new,
      is_best_seller: product.is_best_seller,
      product_code: product.product_code,
      barcode_no: product.barcode_no,
      design: product.design,
      status: product.status,
      section: product.section
    });
    setShowAddForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      price: 0,
      original_price: 0,
      description: "",
      image_url: "",
      colors: [],
      sizes: [],
      is_new: false,
      is_best_seller: false,
      product_code: "",
      barcode_no: "",
      design: "",
      status: "IN STOCK",
      section: "featured_collections"
    });
    setEditingProduct(null);
    setEditingProductId(null);
    setShowAddForm(false);
    setError(null);
  };

  const handleLogout = () => {
    clearAdminSession();
    onLogout();
  };

  return (
    <div 
      className="min-h-screen"
      style={{
        background: 'linear-gradient(135deg, #0B0F14 0%, #1a1a1a 50%, #0B0F14 100%)',
        color: '#F8F7F3'
      }}
    >
      {/* Header */}
      <div 
        className="border-b border-white/10 backdrop-blur-xl"
        style={{
          backgroundColor: 'rgba(11, 15, 20, 0.95)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}
      >
        <div className="w-full px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: '#D4AF37',
                  border: '2px solid #B8860B',
                  boxShadow: '0 4px 20px rgba(212, 175, 55, 0.3)'
                }}
              >
                <Crown className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 
                  className="text-2xl lg:text-3xl font-['Italiana'] tracking-wide"
                  style={{ color: '#D4AF37' }}
                >
                  B3 Admin Dashboard
                </h1>
                <p className="text-white/70 text-sm font-light tracking-wide">
                  Premium Ethnic Wear Management
                </p>
              </div>
            </div>
            
            <Button 
              onClick={handleLogout}
              className="px-6 py-2.5 text-sm font-medium transition-all duration-300 border hover:scale-105 hover:shadow-lg"
              style={{
                borderColor: '#C08E5D',
                backgroundColor: 'transparent',
                color: '#F8F7F3'
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card 
              className="border-0 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: '#D4AF37',
                      border: '2px solid #B8860B'
                    }}
                  >
                    <Package className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold" style={{ color: '#D4AF37' }}>
                      {products.length}
                    </p>
                    <p className="text-white/70 text-sm font-light">Total Products</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="border-0 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: '#D4AF37',
                      border: '2px solid #B8860B'
                    }}
                  >
                    <TrendingUp className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold" style={{ color: '#D4AF37' }}>
                      {products.filter(p => p.is_best_seller).length}
                    </p>
                    <p className="text-white/70 text-sm font-light">Best Sellers</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="border-0 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: '#D4AF37',
                      border: '2px solid #B8860B'
                    }}
                  >
                    <ShoppingCart className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold" style={{ color: '#D4AF37' }}>
                      {products.filter(p => p.status === 'IN STOCK').length}
                    </p>
                    <p className="text-white/70 text-sm font-light">In Stock</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="border-0 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: '#D4AF37',
                      border: '2px solid #B8860B'
                    }}
                  >
                    <Users className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold" style={{ color: '#D4AF37' }}>
                      {categories.length}
                    </p>
                    <p className="text-white/70 text-sm font-light">Categories</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <h2 
              className="text-2xl lg:text-3xl font-['Italiana'] tracking-wide"
              style={{ color: '#F8F7F3' }}
            >
              Product Management
            </h2>
            
            <Button 
              onClick={() => setShowAddForm(true)}
              className="px-6 py-2.5 text-sm font-medium transition-all duration-300 border hover:scale-105 hover:shadow-lg"
              style={{
                borderColor: '#C08E5D',
                backgroundColor: '#D4AF37',
                color: '#0B0F14'
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Product
            </Button>
          </div>

          {/* Error Display */}
          {error && (
            <Alert 
              className="border-red-500/20"
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <AlertDescription className="text-red-400">{error}</AlertDescription>
            </Alert>
          )}

          {/* Add/Edit Product Form */}
          {showAddForm && (
            <Card 
              className="border-0 transition-all duration-300"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <CardHeader>
                <CardTitle 
                  className="text-xl font-['Italiana'] tracking-wide"
                  style={{ color: '#D4AF37' }}
                >
                  {editingProductId ? "Edit Product" : "Add New Product"}
                </CardTitle>
                <CardDescription className="text-white/70">
                  {editingProductId ? "Update product information" : "Create a new product for your collection"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Product Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white/90 font-medium">
                        Product Name *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="border-white/20 bg-white/5 text-white placeholder:text-white/50 focus:border-yellow-500 focus:ring-yellow-500/20"
                        placeholder="Enter product name"
                        required
                      />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-white/90 font-medium">
                        Category *
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger className="border-white/20 bg-white/5 text-white focus:border-yellow-500 focus:ring-yellow-500/20">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-white/20">
                          {categories.map((category) => (
                            <SelectItem key={category} value={category} className="text-white hover:bg-yellow-500/20">
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                      <Label htmlFor="price" className="text-white/90 font-medium">
                        Price (₹) *
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                        className="border-white/20 bg-white/5 text-white placeholder:text-white/50 focus:border-yellow-500 focus:ring-yellow-500/20"
                        placeholder="0.00"
                        required
                      />
                    </div>

                    {/* Original Price */}
                    <div className="space-y-2">
                      <Label htmlFor="original_price" className="text-white/90 font-medium">
                        Original Price (₹)
                      </Label>
                      <Input
                        id="original_price"
                        type="number"
                        value={formData.original_price}
                        onChange={(e) => setFormData({ ...formData, original_price: parseFloat(e.target.value) || 0 })}
                        className="border-white/20 bg-white/5 text-white placeholder:text-white/50 focus:border-yellow-500 focus:ring-yellow-500/20"
                        placeholder="0.00"
                      />
                    </div>

                    {/* Section Placement */}
                    <div className="space-y-2">
                      <Label htmlFor="section" className="text-white/90 font-medium">
                        Section Placement
                      </Label>
                      <Select
                        value={formData.section}
                        onValueChange={(value) => setFormData({ ...formData, section: value })}
                      >
                        <SelectTrigger className="border-white/20 bg-white/5 text-white focus:border-yellow-500 focus:ring-yellow-500/20">
                          <SelectValue placeholder="Select section" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-white/20">
                          {sections.map((section) => (
                            <SelectItem key={section.value} value={section.value} className="text-white hover:bg-yellow-500/20">
                              <div>
                                <div className="font-medium">{section.label}</div>
                                <div className="text-xs text-gray-400">{section.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Status */}
                    <div className="space-y-2">
                      <Label htmlFor="status" className="text-white/90 font-medium">
                        Status
                      </Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value) => setFormData({ ...formData, status: value })}
                      >
                        <SelectTrigger className="border-white/20 bg-white/5 text-white focus:border-yellow-500 focus:ring-yellow-500/20">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-white/20">
                          {availableStatuses.map((status) => (
                            <SelectItem key={status} value={status} className="text-white hover:bg-yellow-500/20">
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-white/90 font-medium">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="border-white/20 bg-white/5 text-white placeholder:text-white/50 focus:border-yellow-500 focus:ring-yellow-500/20 min-h-[100px]"
                      placeholder="Enter product description..."
                    />
                  </div>

                  {/* Image URL */}
                  <div className="space-y-2">
                    <Label htmlFor="image_url" className="text-white/90 font-medium">
                      Image URL
                    </Label>
                    <Input
                      id="image_url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      className="border-white/20 bg-white/5 text-white placeholder:text-white/50 focus:border-yellow-500 focus:ring-yellow-500/20"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  {/* Colors and Sizes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-white/90 font-medium">Colors</Label>
                      <div className="flex flex-wrap gap-2">
                        {availableColors.map((color) => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => {
                              const newColors = formData.colors?.includes(color)
                                ? formData.colors.filter(c => c !== color)
                                : [...(formData.colors || []), color];
                              setFormData({ ...formData, colors: newColors });
                            }}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                              formData.colors?.includes(color)
                                ? 'bg-yellow-500 text-black'
                                : 'bg-white/10 text-white/70 hover:bg-white/20'
                            }`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white/90 font-medium">Sizes</Label>
                      <div className="flex flex-wrap gap-2">
                        {availableSizes.map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => {
                              const newSizes = formData.sizes?.includes(size)
                                ? formData.sizes.filter(s => s !== size)
                                : [...(formData.sizes || []), size];
                              setFormData({ ...formData, sizes: newSizes });
                            }}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                              formData.sizes?.includes(size)
                                ? 'bg-yellow-500 text-black'
                                : 'bg-white/10 text-white/70 hover:bg-white/20'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Additional Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="product_code" className="text-white/90 font-medium">
                        Product Code
                      </Label>
                      <Input
                        id="product_code"
                        value={formData.product_code}
                        onChange={(e) => setFormData({ ...formData, product_code: e.target.value })}
                        className="border-white/20 bg-white/5 text-white placeholder:text-white/50 focus:border-yellow-500 focus:ring-yellow-500/20"
                        placeholder="Enter product code"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="barcode_no" className="text-white/90 font-medium">
                        Barcode Number
                      </Label>
                      <Input
                        id="barcode_no"
                        value={formData.barcode_no}
                        onChange={(e) => setFormData({ ...formData, barcode_no: e.target.value })}
                        className="border-white/20 bg-white/5 text-white placeholder:text-white/50 focus:border-yellow-500 focus:ring-yellow-500/20"
                        placeholder="Enter barcode number"
                      />
                    </div>
                  </div>

                  {/* Design */}
                  <div className="space-y-2">
                    <Label htmlFor="design" className="text-white/90 font-medium">
                      Design
                    </Label>
                    <Input
                      id="design"
                      value={formData.design}
                      onChange={(e) => setFormData({ ...formData, design: e.target.value })}
                      className="border-white/20 bg-white/5 text-white placeholder:text-white/50 focus:border-yellow-500 focus:ring-yellow-500/20"
                      placeholder="Enter design details"
                    />
                  </div>

                  {/* Checkboxes */}
                  <div className="flex space-x-6">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.is_new}
                        onChange={(e) => setFormData({ ...formData, is_new: e.target.checked })}
                        className="w-4 h-4 text-yellow-500 bg-white/5 border-white/20 rounded focus:ring-yellow-500/20"
                      />
                      <span className="text-white/90 text-sm">New Arrival</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.is_best_seller}
                        onChange={(e) => setFormData({ ...formData, is_best_seller: e.target.checked })}
                        className="w-4 h-4 text-yellow-500 bg-white/5 border-white/20 rounded focus:ring-yellow-500/20"
                      />
                      <span className="text-white/90 text-sm">Best Seller</span>
                    </label>
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end space-x-4 pt-4">
                    <Button
                      type="button"
                      onClick={resetForm}
                      variant="outline"
                      className="px-6 py-2.5 text-sm font-medium transition-all duration-300 border hover:scale-105 hover:shadow-lg"
                      style={{
                        borderColor: '#C08E5D',
                        backgroundColor: 'transparent',
                        color: '#F8F7F3'
                      }}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="px-6 py-2.5 text-sm font-medium transition-all duration-300 border hover:scale-105 hover:shadow-lg"
                      style={{
                        borderColor: '#C08E5D',
                        backgroundColor: '#D4AF37',
                        color: '#0B0F14'
                      }}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      {editingProductId ? "Update Product" : "Add Product"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Products List */}
          <div className="space-y-6">
            <h3 
              className="text-xl font-['Italiana'] tracking-wide"
              style={{ color: '#F8F7F3' }}
            >
              All Products ({products.length})
            </h3>
            
            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#D4AF37' }}></div>
              </div>
            ) : products.length === 0 ? (
              <Card 
                className="border-0 text-center py-20"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  backdropFilter: 'blur(20px)'
                }}
              >
                <CardContent>
                  <Package className="w-16 h-16 mx-auto mb-4 text-white/40" />
                  <h4 className="text-lg font-medium text-white/70 mb-2">No products found</h4>
                  <p className="text-white/50">Start by adding your first product to the collection.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Card 
                    key={product.id}
                    className="border-0 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(212, 175, 55, 0.2)',
                      backdropFilter: 'blur(20px)'
                    }}
                  >
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Product Image */}
                        <div className="aspect-square rounded-lg overflow-hidden bg-white/5">
                          {product.image_url ? (
                            <img
                              src={product.image_url}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="w-12 h-12 text-white/20" />
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-white text-lg mb-1">{product.name}</h4>
                            <p className="text-white/70 text-sm">{product.category}</p>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-yellow-500 font-bold text-lg">₹{product.price}</p>
                              {product.original_price && product.original_price > product.price && (
                                <p className="text-white/50 text-sm line-through">₹{product.original_price}</p>
                              )}
                            </div>
                            <Badge 
                              className="font-medium"
                              style={{
                                backgroundColor: product.status === 'IN STOCK' ? '#10B981' : '#EF4444',
                                color: 'white'
                              }}
                            >
                              {product.status}
                            </Badge>
                          </div>

                          {/* Section Badge */}
                          <div>
                            <span className="text-white/60 text-sm">Section: </span>
                            <Badge variant="outline" className="ml-1">
                              {sections.find(s => s.value === product.section)?.label || product.section || 'N/A'}
                            </Badge>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {product.is_new && (
                              <Badge 
                                className="text-xs"
                                style={{
                                  backgroundColor: '#3B82F6',
                                  color: 'white'
                                }}
                              >
                                New
                              </Badge>
                            )}
                            {product.is_best_seller && (
                              <Badge 
                                className="text-xs"
                                style={{
                                  backgroundColor: '#F59E0B',
                                  color: 'white'
                                }}
                              >
                                Best Seller
                              </Badge>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex space-x-2 pt-2">
                            <Button
                              onClick={() => startEdit(product)}
                              size="sm"
                              className="flex-1 text-xs font-medium transition-all duration-200 hover:scale-105"
                              style={{
                                borderColor: '#C08E5D',
                                backgroundColor: 'transparent',
                                color: '#F8F7F3'
                              }}
                            >
                              <Edit className="mr-1 h-3 w-3" />
                              Edit
                            </Button>
                            <Button
                              onClick={() => handleDelete(product.id)}
                              size="sm"
                              variant="destructive"
                              className="flex-1 text-xs font-medium transition-all duration-200 hover:scale-105"
                            >
                              <Trash2 className="mr-1 h-3 w-3" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;