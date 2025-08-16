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
  ShoppingCart
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
        setEditingProductId(null);
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
      is_best_seller: false,
      product_code: "",
      barcode_no: "",
      design: "",
      status: "IN STOCK",
      section: "featured_collections"
    });
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
      product_code: product.product_code || "",
      barcode_no: product.barcode_no || "",
      design: product.design || "",
      status: product.status || "IN STOCK",
      section: product.section || "featured_collections"
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
    // Clear authentication data and redirect to homepage
    clearAdminSession();
    onLogout();
    navigate('/');
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

                         {/* Add Product Form - Only show at top when adding new product */}
             {showAddForm && !editingProduct && (
               <Card>
                 <CardHeader>
                   <CardTitle>Add New Product</CardTitle>
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
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="product_code">Product Code</Label>
                      <Input
                        id="product_code"
                        value={formData.product_code}
                        onChange={(e) => setFormData({ ...formData, product_code: e.target.value })}
                        placeholder="e.g., B3SKU001"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="barcode_no">Barcode Number</Label>
                      <Input
                        id="barcode_no"
                        value={formData.barcode_no}
                        onChange={(e) => setFormData({ ...formData, barcode_no: e.target.value })}
                        placeholder="e.g., 431574"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="design">Design</Label>
                      <Input
                        id="design"
                        value={formData.design}
                        onChange={(e) => setFormData({ ...formData, design: e.target.value })}
                        placeholder="e.g., 1-MATERIAL, BLAZER, PANT"
                        required
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
                      <Label htmlFor="status">Status</Label>
                      <Select 
                        value={formData.status} 
                        onValueChange={(value) => setFormData({ ...formData, status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableStatuses.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="section">Section Placement</Label>
                      <Select 
                        value={formData.section} 
                        onValueChange={(value) => setFormData({ ...formData, section: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select section" />
                        </SelectTrigger>
                        <SelectContent>
                          {sections.map((section) => (
                            <SelectItem key={section.value} value={section.value}>
                              <div>
                                <div className="font-medium">{section.label}</div>
                                <div className="text-xs text-gray-500">{section.description}</div>
                              </div>
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
                        required
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
                       onClick={handleAddProduct}
                       disabled={!formData.name || !formData.category || !formData.product_code || !formData.barcode_no || !formData.design || !formData.price}
                     >
                       <Save className="h-4 w-4 mr-2" />
                       Add Product
                     </Button>
                     <Button 
                       variant="outline" 
                       onClick={() => {
                         setShowAddForm(false);
                         setEditingProduct(null);
                         setEditingProductId(null);
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
                 <div key={product.id}>
                   <Card>
                     <CardContent className="p-6">
                       <div className="flex justify-between items-start">
                         <div className="flex-1">
                           <div className="flex items-center gap-2 mb-2">
                             <h3 className="text-lg font-semibold">{product.name}</h3>
                             {product.is_new && <Badge variant="secondary">New</Badge>}
                             {product.is_best_seller && <Badge variant="default">Best Seller</Badge>}
                             <Badge variant={product.status === 'IN STOCK' ? 'default' : 'destructive'}>
                               {product.status}
                             </Badge>
                           </div>
                           <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                             <div>
                               <span className="font-medium">Code:</span> {product.product_code || 'N/A'}
                             </div>
                             <div>
                               <span className="font-medium">Barcode:</span> {product.barcode_no || 'N/A'}
                             </div>
                             <div>
                               <span className="font-medium">Design:</span> {product.design || 'N/A'}
                             </div>
                             <div>
                               <span className="font-medium">Category:</span> {product.category}
                             </div>
                             <div>
                               <span className="font-medium">Section:</span> 
                               <Badge variant="outline" className="ml-1">
                                 {sections.find(s => s.value === product.section)?.label || product.section || 'N/A'}
                               </Badge>
                             </div>
                           </div>
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

                   {/* Edit Form - Shows below the product when editing */}
                   {editingProductId === product.id && (
                     <Card className="mt-4 border-l-4 border-l-blue-500">
                       <CardHeader>
                         <CardTitle className="text-blue-600">Edit Product: {product.name}</CardTitle>
                       </CardHeader>
                       <CardContent className="space-y-4">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="space-y-2">
                             <Label htmlFor={`edit-name-${product.id}`}>Product Name</Label>
                             <Input
                               id={`edit-name-${product.id}`}
                               value={formData.name}
                               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                               placeholder="Enter product name"
                               required
                             />
                           </div>

                           <div className="space-y-2">
                             <Label htmlFor={`edit-product-code-${product.id}`}>Product Code</Label>
                             <Input
                               id={`edit-product-code-${product.id}`}
                               value={formData.product_code}
                               onChange={(e) => setFormData({ ...formData, product_code: e.target.value })}
                               placeholder="e.g., B3SKU001"
                               required
                             />
                           </div>

                           <div className="space-y-2">
                             <Label htmlFor={`edit-barcode-no-${product.id}`}>Barcode Number</Label>
                             <Input
                               id={`edit-barcode-no-${product.id}`}
                               value={formData.barcode_no}
                               onChange={(e) => setFormData({ ...formData, barcode_no: e.target.value })}
                               placeholder="e.g., 431574"
                               required
                             />
                           </div>

                           <div className="space-y-2">
                             <Label htmlFor={`edit-design-${product.id}`}>Design</Label>
                             <Input
                               id={`edit-design-${product.id}`}
                               value={formData.design}
                               onChange={(e) => setFormData({ ...formData, design: e.target.value })}
                               placeholder="e.g., 1-MATERIAL, BLAZER, PANT"
                               required
                             />
                           </div>

                           <div className="space-y-2">
                             <Label htmlFor={`edit-category-${product.id}`}>Category</Label>
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
                             <Label htmlFor={`edit-status-${product.id}`}>Status</Label>
                             <Select 
                               value={formData.status} 
                               onValueChange={(value) => setFormData({ ...formData, status: value })}
                             >
                               <SelectTrigger>
                                 <SelectValue placeholder="Select status" />
                               </SelectTrigger>
                               <SelectContent>
                                 {availableStatuses.map((status) => (
                                   <SelectItem key={status} value={status}>
                                     {status}
                                   </SelectItem>
                                 ))}
                               </SelectContent>
                             </Select>
                           </div>

                           <div className="space-y-2">
                             <Label htmlFor={`edit-section-${product.id}`}>Section Placement</Label>
                             <Select 
                               value={formData.section} 
                               onValueChange={(value) => setFormData({ ...formData, section: value })}
                             >
                               <SelectTrigger>
                                 <SelectValue placeholder="Select section" />
                               </SelectTrigger>
                               <SelectContent>
                                 {sections.map((section) => (
                                   <SelectItem key={section.value} value={section.value}>
                                     <div>
                                       <div className="font-medium">{section.label}</div>
                                       <div className="text-xs text-gray-500">{section.description}</div>
                                     </div>
                                   </SelectItem>
                                 ))}
                               </SelectContent>
                             </Select>
                           </div>

                           <div className="space-y-2">
                             <Label htmlFor={`edit-price-${product.id}`}>Price (₹)</Label>
                             <Input
                               id={`edit-price-${product.id}`}
                               type="number"
                               value={formData.price}
                               onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                               placeholder="0"
                               required
                             />
                           </div>

                           <div className="space-y-2">
                             <Label htmlFor={`edit-original-price-${product.id}`}>Original Price (₹)</Label>
                             <Input
                               id={`edit-original-price-${product.id}`}
                               type="number"
                               value={formData.original_price}
                               onChange={(e) => setFormData({ ...formData, original_price: Number(e.target.value) })}
                               placeholder="0"
                             />
                           </div>

                           <div className="space-y-2">
                             <Label htmlFor={`edit-image-url-${product.id}`}>Image URL</Label>
                             <Input
                               id={`edit-image-url-${product.id}`}
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
                           <Label htmlFor={`edit-description-${product.id}`}>Description</Label>
                           <Textarea
                             id={`edit-description-${product.id}`}
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
                             onClick={handleEditProduct}
                             disabled={!formData.name || !formData.category || !formData.product_code || !formData.barcode_no || !formData.design || !formData.price}
                           >
                             <Save className="h-4 w-4 mr-2" />
                             Update Product
                           </Button>
                           <Button 
                             variant="outline" 
                             onClick={() => {
                               setEditingProduct(null);
                               setEditingProductId(null);
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
                 </div>
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