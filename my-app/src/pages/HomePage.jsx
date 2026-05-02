import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const featured = products.filter(p => p.isBestseller || p.isNew).slice(0, 4);
const newArrivals = products.filter(p => p.isNew);

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen flex items-end overflow-hidden bg-noir-950">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80"
            alt="Hero"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-noir-950/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-12 pb-20 md:pb-28 w-full">
          <div className="max-w-2xl animate-slide-up">
            <p className="section-label text-noir-400 mb-5">New Collection · SS25</p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-normal text-cream leading-[0.9] mb-8">
              Quiet<br /><em>Luxury.</em>
            </h1>
            <p className="font-body text-base md:text-lg text-noir-300 max-w-md leading-relaxed mb-10">
              Clothes for the considered life. Each piece designed to outlast the season, 
              and wear beautifully for years beyond it.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="btn-primary bg-cream text-charcoal hover:bg-noir-200">
                Shop the Collection
              </Link>
              <Link to="/products?category=New" className="btn-outline border-cream text-cream hover:bg-cream hover:text-charcoal">
                New Arrivals
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-12 hidden md:flex flex-col items-center gap-2 text-noir-500">
          <p className="font-mono text-[9px] tracking-widest3 uppercase" style={{ writingMode: 'vertical-rl' }}>Scroll</p>
          <div className="w-px h-12 bg-noir-700 relative overflow-hidden">
            <div className="absolute top-0 w-full h-1/2 bg-noir-400 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Category strip */}
      <section className="border-b border-noir-200 overflow-x-auto">
        <div className="flex min-w-max md:min-w-0">
          {[
            { label: 'New In', img: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&q=70', slug: 'New' },
            { label: 'Jackets', img: 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=400&q=70', slug: 'Jackets' },
            { label: 'Dresses', img: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&q=70', slug: 'Dresses' },
            { label: 'Tops', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=70', slug: 'Tops' },
            { label: 'Trousers', img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=70', slug: 'Trousers' },
          ].map(cat => (
            <Link
              key={cat.slug}
              to={`/products?category=${cat.slug}`}
              className="group relative flex-1 h-64 md:h-80 overflow-hidden min-w-[180px]"
            >
              <img
                src={cat.img}
                alt={cat.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-charcoal/30 group-hover:bg-charcoal/50 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-end p-5">
                <div>
                  <p className="font-display text-lg font-normal text-cream">{cat.label}</p>
                  <div className="w-0 h-px bg-cream group-hover:w-8 transition-all duration-300 mt-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured / Bestsellers */}
      <section className="max-w-7xl mx-auto px-8 md:px-12 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="section-label mb-2">Curated Selection</p>
            <h2 className="font-display text-3xl md:text-4xl font-normal">Editor's Picks</h2>
          </div>
          <Link to="/products" className="btn-ghost hidden md:block">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
        <div className="mt-8 md:hidden text-center">
          <Link to="/products" className="btn-outline px-10">View All</Link>
        </div>
      </section>

      {/* Full-width banner */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80"
          alt="Campaign"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-cream text-center px-6">
          <p className="section-label text-cream/70 mb-4">Limited Time</p>
          <h2 className="font-display text-4xl md:text-6xl font-normal mb-4">
            Sale: Up to 30% Off
          </h2>
          <p className="font-body text-base text-cream/80 max-w-md mb-8">
            Selected styles from previous seasons. Reduced to clear.
          </p>
          <Link to="/products?sale=true" className="btn-primary bg-cream text-charcoal">
            Shop the Sale
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-8 md:px-12 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="section-label mb-2">Just In</p>
            <h2 className="font-display text-3xl md:text-4xl font-normal">New Arrivals</h2>
          </div>
          <Link to="/products?category=New" className="btn-ghost hidden md:block">View All</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {newArrivals.slice(0, 4).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* USPs */}
      <section className="border-t border-b border-noir-200 py-12">
        <div className="max-w-7xl mx-auto px-8 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: '✦', title: 'Free Shipping', sub: 'On all orders over $200' },
            { icon: '○', title: 'Free Returns', sub: '30-day return policy' },
            { icon: '◇', title: 'Sustainably Made', sub: 'Responsible sourcing' },
            { icon: '◻', title: 'Secure Checkout', sub: 'Encrypted payments' },
          ].map(usp => (
            <div key={usp.title} className="flex flex-col items-center gap-3">
              <span className="font-mono text-xl text-noir-400">{usp.icon}</span>
              <p className="font-body font-medium text-sm">{usp.title}</p>
              <p className="font-body text-xs text-noir-500">{usp.sub}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
