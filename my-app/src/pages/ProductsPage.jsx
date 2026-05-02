import { useState, useMemo } from 'react'
import { products, categories } from '../data/products'
import ProductCard from '../components/ProductCard'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState('default')
  const [showFilters, setShowFilters] = useState(false)
  const titleRef = useScrollAnimation()

  const filtered = useMemo(() => {
    let result = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory)
    if (sortBy === 'price-asc') result = [...result].sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') result = [...result].sort((a, b) => b.price - a.price)
    if (sortBy === 'new') result = [...result].sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0))
    return result
  }, [activeCategory, sortBy])

  return (
    <main className="pt-16 lg:pt-20">
      {/* Page Header */}
      <div className="relative h-52 lg:h-64 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=80"
          alt="Collection"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-stone-900/50" />
        <div ref={titleRef} className="animate-on-scroll absolute inset-0 flex items-end">
          <div className="max-w-screen-xl mx-auto px-6 lg:px-10 w-full pb-10">
            <p className="section-label text-stone-400 mb-2">SS 2025</p>
            <h1 className="display-title text-4xl lg:text-5xl text-stone-50">The Collection</h1>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="sticky top-16 lg:top-20 z-30 bg-stone-50/95 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between py-3 gap-4">
            {/* Category filters - desktop */}
            <div className="hidden sm:flex items-center gap-1 overflow-x-auto">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 font-mono text-[10px] tracking-widest uppercase transition-all duration-200 whitespace-nowrap ${
                    activeCategory === cat.id
                      ? 'bg-stone-900 text-stone-50'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Mobile filter toggle */}
            <button
              className="sm:hidden font-mono text-[10px] tracking-widest uppercase text-stone-700 flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path d="M3 6h18M7 12h10M11 18h2" />
              </svg>
              Filter
            </button>

            <div className="flex items-center gap-3 ml-auto">
              <span className="font-mono text-[10px] text-stone-400 hidden sm:block">{filtered.length} pieces</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="font-mono text-[10px] tracking-widest uppercase text-stone-700 bg-transparent border border-stone-200 px-3 py-2 outline-none cursor-pointer"
              >
                <option value="default">Featured</option>
                <option value="new">New First</option>
                <option value="price-asc">Price ↑</option>
                <option value="price-desc">Price ↓</option>
              </select>
            </div>
          </div>

          {/* Mobile Category Filters */}
          {showFilters && (
            <div className="sm:hidden flex flex-wrap gap-2 pb-3">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.id); setShowFilters(false) }}
                  className={`px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase transition-all ${
                    activeCategory === cat.id ? 'bg-stone-900 text-stone-50' : 'border border-stone-300 text-stone-600'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-10 lg:py-14">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="display-title text-2xl text-stone-400">No pieces found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
