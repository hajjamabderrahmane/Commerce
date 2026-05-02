import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
  { value: 'rating', label: 'Top Rated' },
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [maxPrice, setMaxPrice] = useState(700);
  const [sortBy, setSortBy] = useState('featured');
  const [showSaleOnly, setShowSaleOnly] = useState(searchParams.get('sale') === 'true');

  const searchQuery = searchParams.get('search') || '';

  // Sync category with URL
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && cat !== 'New') setSelectedCategory(cat);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = [...products];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // Category
    if (selectedCategory !== 'All') {
      if (searchParams.get('category') === 'New') {
        result = result.filter(p => p.isNew);
      } else {
        result = result.filter(p => p.category === selectedCategory);
      }
    }

    // Sizes
    if (selectedSizes.length > 0) {
      result = result.filter(p => selectedSizes.some(s => p.sizes?.includes(s)));
    }

    // Price
    result = result.filter(p => p.price <= maxPrice);

    // Sale
    if (showSaleOnly) result = result.filter(p => p.originalPrice);

    // Sort
    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'newest': result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      case 'rating': result.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
      default: result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    }

    return result;
  }, [selectedCategory, selectedSizes, maxPrice, sortBy, showSaleOnly, searchQuery, searchParams]);

  const toggleSize = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedSizes([]);
    setMaxPrice(700);
    setShowSaleOnly(false);
    setSearchParams({});
  };

  const hasActiveFilters = selectedCategory !== 'All' || selectedSizes.length > 0 || maxPrice < 700 || showSaleOnly || searchQuery;

  const pageTitle = searchQuery
    ? `Search: "${searchQuery}"`
    : searchParams.get('category') === 'New'
    ? 'New Arrivals'
    : selectedCategory !== 'All'
    ? selectedCategory
    : 'All Products';

  return (
    <main className="pt-[88px]">
      {/* Page header */}
      <div className="border-b border-noir-200 py-10 px-8 md:px-12 max-w-7xl mx-auto">
        <p className="section-label mb-2">
          {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
        </p>
        <h1 className="page-title">{pageTitle}</h1>
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-12 py-8 flex gap-8">

        {/* Sidebar filters — desktop */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-28 space-y-8">

            {hasActiveFilters && (
              <button onClick={clearFilters} className="font-mono text-[10px] tracking-widest2 uppercase text-noir-500 hover:text-charcoal underline transition-colors">
                Clear all filters
              </button>
            )}

            {/* Category */}
            <div>
              <p className="section-label mb-4">Category</p>
              <ul className="space-y-2">
                {categories.map(cat => (
                  <li key={cat}>
                    <button
                      onClick={() => { setSelectedCategory(cat); setSearchParams({}); }}
                      className={`font-body text-sm transition-colors ${
                        selectedCategory === cat ? 'text-charcoal font-medium' : 'text-noir-500 hover:text-charcoal'
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <p className="section-label">Max Price</p>
                <span className="font-mono text-xs text-noir-500">${maxPrice}</span>
              </div>
              <input
                type="range"
                min={50}
                max={700}
                step={25}
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between mt-2">
                <span className="font-mono text-[10px] text-noir-400">$50</span>
                <span className="font-mono text-[10px] text-noir-400">$700</span>
              </div>
            </div>

            {/* Size */}
            <div>
              <p className="section-label mb-4">Size</p>
              <div className="flex flex-wrap gap-2">
                {SIZES.map(size => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`w-10 h-10 font-mono text-[10px] tracking-wider border transition-all ${
                      selectedSizes.includes(size)
                        ? 'bg-charcoal text-cream border-charcoal'
                        : 'border-noir-300 text-noir-600 hover:border-charcoal'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Sale */}
            <div>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div
                  onClick={() => setShowSaleOnly(!showSaleOnly)}
                  className={`w-10 h-5 rounded-full transition-colors relative ${showSaleOnly ? 'bg-charcoal' : 'bg-noir-200'}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 bg-cream rounded-full shadow transition-transform ${showSaleOnly ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
                <span className="font-body text-sm text-noir-600 group-hover:text-charcoal transition-colors">Sale only</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 gap-4">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="lg:hidden flex items-center gap-2 font-mono text-[10px] tracking-widest2 uppercase"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Filters {hasActiveFilters && `(active)`}
            </button>

            <div className="flex items-center gap-2 ml-auto">
              <label className="font-mono text-[10px] tracking-widest2 uppercase text-noir-500 hidden sm:block">Sort</label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="select-field py-2 pr-8 text-xs min-w-[160px]"
                >
                  {SORT_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Mobile filters panel */}
          {filtersOpen && (
            <div className="lg:hidden mb-8 p-6 border border-noir-200 space-y-6 bg-cream">
              {/* Category */}
              <div>
                <p className="section-label mb-3">Category</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 font-mono text-[10px] tracking-wider border transition-all ${
                        selectedCategory === cat
                          ? 'bg-charcoal text-cream border-charcoal'
                          : 'border-noir-300 text-noir-600 hover:border-charcoal'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <p className="section-label">Max Price</p>
                  <span className="font-mono text-xs text-noir-500">${maxPrice}</span>
                </div>
                <input type="range" min={50} max={700} step={25} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="w-full" />
              </div>

              <div>
                <p className="section-label mb-3">Size</p>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map(size => (
                    <button key={size} onClick={() => toggleSize(size)}
                      className={`w-10 h-10 font-mono text-[10px] border transition-all ${
                        selectedSizes.includes(size) ? 'bg-charcoal text-cream border-charcoal' : 'border-noir-300 text-noir-600'
                      }`}
                    >{size}</button>
                  ))}
                </div>
              </div>

              {hasActiveFilters && (
                <button onClick={clearFilters} className="btn-ghost text-left">Clear all</button>
              )}
            </div>
          )}

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-display text-2xl mb-3">No products found</p>
              <p className="font-body text-sm text-noir-500 mb-8">Try adjusting your filters or search query.</p>
              <button onClick={clearFilters} className="btn-outline">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
