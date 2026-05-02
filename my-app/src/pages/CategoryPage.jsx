import { useParams, Link } from 'react-router-dom'
import { products, categories } from '../data/products'
import ProductCard from '../components/ProductCard'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const categoryMeta = {
  tops: {
    label: 'Tops',
    desc: 'Elevated basics and statement pieces for any occasion.',
    img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1400&q=80',
  },
  bottoms: {
    label: 'Bottoms',
    desc: 'Trousers, skirts and shorts crafted with intention.',
    img: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?w=1400&q=80',
  },
  outerwear: {
    label: 'Outerwear',
    desc: 'Coats and jackets designed to last seasons, not trends.',
    img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1400&q=80',
  },
  dresses: {
    label: 'Dresses',
    desc: 'From minimal column cuts to fluid evening silhouettes.',
    img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=1400&q=80',
  },
  accessories: {
    label: 'Accessories',
    desc: 'The finishing details that complete a considered look.',
    img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1400&q=80',
  },
  new: {
    label: 'New Arrivals',
    desc: 'The latest additions to the Maison collection.',
    img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=80',
  },
  sale: {
    label: 'Sale',
    desc: 'Selected pieces at exceptional value.',
    img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&q=80',
  },
}

export default function CategoryPage() {
  const { slug } = useParams()
  const titleRef = useScrollAnimation()
  const meta = categoryMeta[slug] || { label: slug, desc: '', img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=80' }

  const filtered = slug === 'new'
    ? products.filter(p => p.new)
    : slug === 'sale'
    ? products.filter(p => p.id % 3 === 0) // simulated sale items
    : products.filter(p => p.category === slug)

  return (
    <main className="pt-16 lg:pt-20">
      {/* Hero Banner */}
      <div className="relative h-52 lg:h-72 overflow-hidden">
        <img src={meta.img} alt={meta.label} className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-stone-900/50" />
        <div ref={titleRef} className="animate-on-scroll absolute inset-0 flex items-end">
          <div className="max-w-screen-xl mx-auto px-6 lg:px-10 w-full pb-10">
            <p className="section-label text-stone-400 mb-2">{filtered.length} Pieces</p>
            <h1 className="display-title text-4xl lg:text-5xl text-stone-50">{meta.label}</h1>
            {meta.desc && <p className="text-stone-300/80 font-light font-body text-sm mt-1 max-w-sm">{meta.desc}</p>}
          </div>
        </div>
      </div>

      {/* Other Categories Nav */}
      <div className="border-b border-stone-200 overflow-x-auto">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 flex gap-0">
          {categories.slice(1).map(cat => (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className={`px-5 py-3.5 font-mono text-[10px] tracking-widest uppercase whitespace-nowrap transition-all duration-200 border-b-2 -mb-px ${
                cat.id === slug
                  ? 'border-stone-900 text-stone-900'
                  : 'border-transparent text-stone-400 hover:text-stone-700'
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-12 lg:py-16">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="display-title text-2xl text-stone-400">No pieces in this category yet</p>
            <Link to="/products" className="btn-outline mt-6 inline-flex">View All</Link>
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
