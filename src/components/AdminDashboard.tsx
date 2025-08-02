import { useState, useEffect } from "react";
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
  ShoppingCart
} from "lucide-react";
import { supabaseUtils } from "@/hooks/useSupabase";
import { Database } from "@/lib/supabase";

type Product = Database['public']['Tables']['products']['Row'];
type ProductInsert = Database['public']['Tables']['products']['Insert'];

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
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
    is_best_seller: false
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

  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL", "Free Size"];
  const availableColors = ["Red", "Blue", "Green", "Yellow", "Purple", "Pink", "Black", "White", "Gold", "Silver"];

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

  const handleAddProduct = async () => {
    try {
      const { data, error } = await supabaseUtils.addProduct(formData as ProductInsert);
      if (error) {
        setError(error.message);
      } else {
        await loadProducts();
        setShowAddForm(false);
        resetForm();
      }
    } catch (err) {
      setError("Failed to add product");
    }
  };

  const handleEditProduct = async () => {
    if (!editingProduct) return;
    
    try {
      const { data, error } = await supabaseUtils.updateProduct(editingProduct.id, formData);
      if (error) {
        setError(error.message);
      } else {
        await loadProducts();
        setEditingProduct(null);
        resetForm();
      }
    } catch (err) {
      setError("Failed to update product");
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    try {
      const { error } = await supabaseUtils.deleteProduct(productId);
      if (error) {
        setError(error.message);
      } else {
        await loadProducts();
      }
    } catch (err) {
      setError("Failed to delete product");
    }
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
      is_best_seller: false
    });
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
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
      is_best_seller: product.is_best_seller
    });
    setShowAddForm(true);
  };

  const toggleSize = (size: string) => {
    const currentSizes = formData.sizes || [];
    const newSizes = currentSizes.includes(size)
      ? currentSizes.filter(s => s !== size)
      : [...currentSizes, size];
    setFormData({ ...formData, sizes: newSizes });
  };

  const toggleColor = (color: string) => {
    const currentColors = formData.colors || [];
    const newColors = currentColors.includes(color)
      ? currentColors.filter(c => c !== color)
      : [...currentColors, color];
    setFormData({ ...formData, colors: newColors });
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated");
    onLogout();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your products and inventory</p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            {/* Add Product Button */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Product Management</h2>
              <Button 
                onClick={() => {
                  setShowAddForm(true);
                  setEditingProduct(null);
                  resetForm();
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>

            {/* Add/Edit Product Form */}
            {showAddForm && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {editingProduct ? "Edit Product" : "Add New Product"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter product name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select 
                        value={formData.category} 
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price">Price (₹)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                        placeholder="0"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="original_price">Original Price (₹)</Label>
                      <Input
                        id="original_price"
                        type="number"
                        value={formData.original_price}
                        onChange={(e) => setFormData({ ...formData, original_price: Number(e.target.value) })}
                        placeholder="0"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="image_url">Image URL</Label>
                      <Input
                        id="image_url"
                        value={formData.image_url}
                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Product Flags</Label>
                      <div className="flex gap-4">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={formData.is_new}
                            onChange={(e) => setFormData({ ...formData, is_new: e.target.checked })}
                          />
                          <span>New Product</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={formData.is_best_seller}
                            onChange={(e) => setFormData({ ...formData, is_best_seller: e.target.checked })}
                          />
                          <span>Best Seller</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Enter product description"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Available Sizes</Label>
                    <div className="flex flex-wrap gap-2">
                      {availableSizes.map((size) => (
                        <Button
                          key={size}
                          type="button"
                          variant={formData.sizes?.includes(size) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleSize(size)}
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Available Colors</Label>
                    <div className="flex flex-wrap gap-2">
                      {availableColors.map((color) => (
                        <Button
                          key={color}
                          type="button"
                          variant={formData.colors?.includes(color) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleColor(color)}
                        >
                          {color}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={editingProduct ? handleEditProduct : handleAddProduct}
                      disabled={!formData.name || !formData.category}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {editingProduct ? "Update Product" : "Add Product"}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingProduct(null);
                        resetForm();
                      }}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Products List */}
            <div className="grid gap-4">
              {products.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{product.name}</h3>
                          {product.is_new && <Badge variant="secondary">New</Badge>}
                          {product.is_best_seller && <Badge variant="default">Best Seller</Badge>}
                        </div>
                        <p className="text-gray-600 mb-2">{product.category}</p>
                        <p className="text-sm text-gray-500 mb-3">{product.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="font-semibold">₹{product.price.toLocaleString()}</span>
                          {product.original_price && product.original_price > product.price && (
                            <span className="text-gray-500 line-through">₹{product.original_price.toLocaleString()}</span>
                          )}
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {product.sizes?.map((size) => (
                            <Badge key={size} variant="outline" className="text-xs">
                              {size}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {product.image_url && (
                          <img 
                            src={product.image_url} 
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        )}
                        <div className="flex flex-col gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => startEdit(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Products</p>
                      <p className="text-2xl font-bold">{products.length}</p>
                    </div>
                    <Package className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">New Products</p>
                      <p className="text-2xl font-bold">{products.filter(p => p.is_new).length}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Best Sellers</p>
                      <p className="text-2xl font-bold">{products.filter(p => p.is_best_seller).length}</p>
                    </div>
                    <ShoppingCart className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Categories</p>
                      <p className="text-2xl font-bold">{new Set(products.map(p => p.category)).size}</p>
                    </div>
                    <Users className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;