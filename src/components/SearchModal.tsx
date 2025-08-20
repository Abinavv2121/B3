import { useState, useEffect } from "react";
import { X, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { supabaseUtils } from "@/hooks/useSupabase";
import { Database } from "@/lib/supabase";

type Product = Database['public']['Tables']['products']['Row'];

const SearchModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  // Fetch all products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabaseUtils.getProducts();
        if (error) {
          console.error('Error fetching products:', error);
          return;
        }
        setAllProducts(data || []);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };

    if (isOpen) {
      fetchProducts();
    }
  }, [isOpen]);

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "Bridal Collection", name: "Bridal Collection" },
    { id: "Festival Glory", name: "Festival Glory" },
    { id: "Special Moments", name: "Special Moments" },
    { id: "Western Edge", name: "Western Edge" }
  ];

  // Search functionality
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setSearchResults([]);
      return;
    }

    const performSearch = () => {
      setIsLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        let filtered = allProducts;
        
        // Filter by search query
        if (searchQuery.trim()) {
          filtered = filtered.filter(product =>
            product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.section?.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        
        // Filter by category
        if (selectedCategory !== "all") {
          filtered = filtered.filter(product => product.category === selectedCategory);
        }
        
        setSearchResults(filtered);
        setIsLoading(false);
      }, 300);
    };

    performSearch();
  }, [searchQuery, selectedCategory, isOpen, allProducts]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
            <h2 className="text-2xl font-serif font-bold text-gray-900">
              Search Products
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Search Input */}
          <div className="p-6 border-b border-gray-200 flex-shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for products, categories, or styles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg border-gray-300 focus:border-cultural focus:ring-cultural"
                autoFocus
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="p-6 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center space-x-2 mb-4">
              <Filter className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filter by Category:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    selectedCategory === category.id 
                      ? 'bg-cultural text-white' 
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Search Results - Scrollable Area */}
          <div className="flex-1 overflow-y-auto p-6 min-h-0">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cultural mx-auto"></div>
                <p className="mt-2 text-gray-600">Searching...</p>
              </div>
            ) : searchQuery.trim() === "" && selectedCategory === "all" ? (
              <div className="text-center py-8">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Start searching for products
                </h3>
                <p className="text-gray-600">
                  Enter a product name, category, or style to find what you're looking for.
                </p>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search terms or browse all categories.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4 sticky top-0 bg-white py-2">
                  <h3 className="text-lg font-medium text-gray-900">
                    {searchResults.length} product{searchResults.length !== 1 ? 's' : ''} found
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      to={`/${product.section?.toLowerCase().replace(/\s+/g, '-') || 'featured'}`}
                      onClick={onClose}
                      className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      <div className="aspect-[4/5] overflow-hidden">
                        <img
                          src={product.image_url || "/placeholder.svg"}
                          alt={product.name || "Product"}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-gray-900 line-clamp-2 group-hover:text-cultural transition-colors">
                            {product.name || "Unnamed Product"}
                          </h4>
                          <div className="flex items-center space-x-1 ml-2">
                            {product.is_new && (
                              <Badge className="bg-green-100 text-green-800 text-xs">New</Badge>
                            )}
                            {product.is_best_seller && (
                              <Badge className="bg-amber-100 text-amber-800 text-xs">Best Seller</Badge>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">{product.category || "Uncategorized"}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-semibold text-gray-900">
                              ₹{product.price?.toLocaleString() || "0"}
                            </span>
                            {product.original_price && product.original_price > (product.price || 0) && (
                              <span className="text-sm text-gray-500 line-through">
                                ₹{product.original_price.toLocaleString()}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <span className="text-sm text-gray-600">{product.rating || "0"}</span>
                            <span className="text-yellow-400">★</span>
                            <span className="text-xs text-gray-500">({product.reviews || "0"})</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal; 