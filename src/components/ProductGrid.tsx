import { useState, useMemo, useCallback } from 'react';
import { ProductRow, FilterOption } from '@/types';
import { transformProductRow } from '@/lib/utils';
import ProductCard from './ProductCard';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Filter, Loader2 } from 'lucide-react';

interface ProductGridProps {
  products: ProductRow[];
  isLoading: boolean;
  error: string | null;
  filters: FilterOption[];
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
  title: string;
  subtitle?: string;
  showFilters?: boolean;
  gridCols?: string;
}

/**
 * Reusable ProductGrid component for displaying products with filtering capabilities
 * Eliminates duplication across category pages and provides consistent UI
 */
export default function ProductGrid({
  products,
  isLoading,
  error,
  filters,
  activeFilter,
  onFilterChange,
  title,
  subtitle,
  showFilters = true,
  gridCols = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
}: ProductGridProps) {
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // Transform database products to component format
  const transformedProducts = useMemo(() => 
    products.map(transformProductRow),
    [products]
  );

  // Filter products based on active filter
  const filteredProducts = useMemo(() => {
    if (activeFilter === 'all') return transformedProducts;
    
    return transformedProducts.filter(product => 
      product.category === activeFilter || 
      product.name.includes(activeFilter) ||
      product.type?.includes(activeFilter.toLowerCase())
    );
  }, [transformedProducts, activeFilter]);

  const handleFilterClick = useCallback((filterId: string) => {
    onFilterChange(filterId);
    setShowFilterMenu(false);
  }, [onFilterChange]);

  if (isLoading) {
    return (
      <section className="section-padding relative overflow-hidden bg-royal-silk">
        <div className="w-full px-4 lg:px-8 relative z-10">
          <div className="text-center mb-12 max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-['Italiana'] tracking-wide" 
                style={{ 
                  color: '#F8F7F3',
                  textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                }}>
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg text-gray-300 mt-4">{subtitle}</p>
            )}
          </div>
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-gold" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-padding relative overflow-hidden bg-royal-silk">
        <div className="w-full px-4 lg:px-8 relative z-10">
          <div className="text-center mb-12 max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-['Italiana'] tracking-wide" 
                style={{ 
                  color: '#F8F7F3',
                  textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                }}>
              {title}
            </h2>
            <p className="text-red-400 mt-4">Error: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding relative overflow-hidden bg-royal-silk">
      <div className="w-full px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-['Italiana'] tracking-wide" 
              style={{ 
                color: '#F8F7F3',
                textShadow: '0 2px 4px rgba(0,0,0,0.8)'
              }}>
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-gray-300 mt-4">{subtitle}</p>
          )}
        </div>

        {/* Filters */}
        {showFilters && filters.length > 0 && (
          <div className="mb-8">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="w-full flex items-center justify-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>

            {/* Filter Menu */}
            <div className={`${showFilterMenu ? 'block' : 'hidden'} lg:block`}>
              <div className="flex flex-wrap justify-center gap-2 lg:gap-4">
                {filters.map((filter) => (
                  <Badge
                    key={filter.id}
                    variant={activeFilter === filter.id ? "default" : "secondary"}
                    className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                      activeFilter === filter.id 
                        ? 'bg-gradient-cultural text-white' 
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                    onClick={() => handleFilterClick(filter.id)}
                  >
                    {filter.name}
                    {filter.count > 0 && (
                      <span className="ml-1 text-xs opacity-75">({filter.count})</span>
                    )}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className={`grid ${gridCols} gap-6 lg:gap-8`}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No products found for the selected filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}
