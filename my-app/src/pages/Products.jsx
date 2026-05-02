import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductGrid from '../components/ProductGrid';
import { useReveal } from '../hooks/useReveal';

const ALL = 'All';
const cats = [ALL, 'Hoodies', 'T-Shirts', 'Pants', 'Sets'];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get('category') || ALL;
  const [active, setActive] = useState(initialCat);
  useReveal();

  const filtered = active === ALL ? products : products.filter((p) => p.category === active);

  const handleFilter = (cat) => {
    setActive(cat);
    if (cat !== ALL) setSearchParams({ category: cat });
    else setSearchParams({});
  };

  return (
    <main className="pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="reveal mb-12">
          <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-secondary mb-3">Collection</p>
          <h1 className="font-serif text-5xl md:text-6xl font-semibold">All Pieces</h1>
        </div>

        {/* Filters */}
        <div className="reveal flex flex-wrap items-center gap-2 mb-14 border-b border-accent pb-6">
          {cats.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className={`font-sans text-xs tracking-widest uppercase px-5 py-2 transition-all duration-200 ${
                active === cat
                  ? 'bg-primary text-bg'
                  : 'border border-accent text-secondary hover:border-primary hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto text-xs font-sans text-secondary">
            {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
          </span>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <ProductGrid products={filtered} />
        ) : (
          <p className="text-center text-secondary font-sans py-20">No products found.</p>
        )}
      </div>
    </main>
  );
}
