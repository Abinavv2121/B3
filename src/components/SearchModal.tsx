import { useState, useEffect } from "react";
import { X, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviews: number;
  isNew: boolean;
  isBestSeller: boolean;
  colors: string[];
  sizes: string[];
  type: string;
}

const SearchModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock product database - in a real app this would come from an API
  const allProducts: Product[] = [
    {
      id: "1",
      name: "Royal Emerald Bridal Lehenga",
      category: "Bridal Collection",
      price: 45999,
      originalPrice: 52999,
      image: "/src/assets/hero-bridal.jpg",
      rating: 4.9,
      reviews: 156,
      isNew: false,
      isBestSeller: true,
      colors: ["#10B981", "#DC2626", "#7C3AED", "#F59E0B"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      type: "bridal"
    },
    {
      id: "2",
      name: "Premium Silk Festival Saree",
      category: "Festival Glory",
      price: 18999,
      originalPrice: 24999,
      image: "/src/assets/festival-saree.jpg",
      rating: 4.8,
      reviews: 203,
      isNew: false,
      isBestSeller: true,
      colors: ["#DC2626", "#F59E0B", "#10B981", "#7C3AED"],
      sizes: ["Free Size"],
      type: "festival"
    },
    {
      id: "3",
      name: "Elegant Purple Anarkali",
      category: "Special Moments",
      price: 12999,
      originalPrice: 16999,
      image: "/src/assets/anarkali-purple.jpg",
      rating: 4.7,
      reviews: 89,
      isNew: true,
      isBestSeller: false,
      colors: ["#7C3AED", "#EC4899", "#10B981", "#F59E0B"],
      sizes: ["XS", "S", "M", "L", "XL"],
      type: "special"
    },
    {
      id: "4",
      name: "Rose Gold Sharara Set",
      category: "Western Edge",
      price: 8999,
      originalPrice: 11999,
      image: "/src/assets/sharara-rose-gold.jpg",
      rating: 4.6,
      reviews: 134,
      isNew: true,
      isBestSeller: false,
      colors: ["#F59E0B", "#EC4899", "#10B981", "#7C3AED"],
      sizes: ["S", "M", "L", "XL"],
      type: "western"
    },
    {
      id: "5",
      name: "Majestic Red Bridal Lehenga",
      category: "Bridal Collection",
      price: 38999,
      originalPrice: 45999,
      image: "/src/assets/hero-bridal.jpg",
      rating: 4.9,
      reviews: 98,
      isNew: false,
      isBestSeller: true,
      colors: ["#DC2626", "#10B981", "#7C3AED", "#F59E0B"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      type: "bridal"
    },
    {
      id: "6",
      name: "Golden Festival Silk Saree",
      category: "Festival Glory",
      price: 15999,
      originalPrice: 19999,
      image: "/src/assets/festival-saree.jpg",
      rating: 4.8,
      reviews: 167,
      isNew: false,
      isBestSeller: false,
      colors: ["#F59E0B", "#DC2626", "#10B981", "#7C3AED"],
      sizes: ["Free Size"],
      type: "festival"
    },
    {
      id: "7",
      name: "Designer Teal Anarkali",
      category: "Special Moments",
      price: 14999,
      originalPrice: 18999,
      image: "/src/assets/anarkali-purple.jpg",
      rating: 4.7,
      reviews: 76,
      isNew: true,
      isBestSeller: false,
      colors: ["#06B6D4", "#EC4899", "#10B981", "#F59E0B"],
      sizes: ["XS", "S", "M", "L", "XL"],
      type: "special"
    },
    {
      id: "8",
      name: "Modern Palazzo Set",
      category: "Western Edge",
      price: 9999,
      originalPrice: 13999,
      image: "/src/assets/sharara-rose-gold.jpg",
      rating: 4.5,
      reviews: 123,
      isNew: false,
      isBestSeller: false,
      colors: ["#EC4899", "#10B981", "#7C3AED", "#F59E0B"],
      sizes: ["S", "M", "L", "XL"],
      type: "western"
    }
  ];

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "bridal", name: "Bridal Collection" },
    { id: "festival", name: "Festival Glory" },
    { id: "special", name: "Special Moments" },
    { id: "western", name: "Western Edge" }
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
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.type.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        
        // Filter by category
        if (selectedCategory !== "all") {
          filtered = filtered.filter(product => product.type === selectedCategory);
        }
        
        setSearchResults(filtered);
        setIsLoading(false);
      }, 300);
    };

    performSearch();
  }, [searchQuery, selectedCategory, isOpen]);

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
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
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
          <div className="p-6 border-b border-gray-200">
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
          <div className="p-6 border-b border-gray-200">
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

          {/* Search Results */}
          <div className="flex-1 overflow-y-auto p-6">
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
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {searchResults.length} product{searchResults.length !== 1 ? 's' : ''} found
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      to={`/${product.type}`}
                      onClick={onClose}
                      className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      <div className="aspect-[4/5] overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-gray-900 line-clamp-2 group-hover:text-cultural transition-colors">
                            {product.name}
                          </h4>
                          <div className="flex items-center space-x-1 ml-2">
                            {product.isNew && (
                              <Badge className="bg-green-100 text-green-800 text-xs">New</Badge>
                            )}
                            {product.isBestSeller && (
                              <Badge className="bg-amber-100 text-amber-800 text-xs">Best Seller</Badge>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-semibold text-gray-900">
                              ₹{product.price.toLocaleString()}
                            </span>
                            {product.originalPrice > product.price && (
                              <span className="text-sm text-gray-500 line-through">
                                ₹{product.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <span className="text-sm text-gray-600">{product.rating}</span>
                            <span className="text-yellow-400">★</span>
                            <span className="text-xs text-gray-500">({product.reviews})</span>
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