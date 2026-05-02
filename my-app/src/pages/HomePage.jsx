import { Link } from 'react-router-dom'
import { getFeaturedProducts } from '../data/products'
import ProductCard from '../components/ProductCard'
import { useScrollAnimation, useScrollAnimationGroup } from '../hooks/useScrollAnimation'

export default function HomePage() {
  const featured = getFeaturedProducts()
  const titleRef = useScrollAnimation()
  const setRef = useScrollAnimationGroup(featured.length)

  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=85"
            alt="Maison hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent" />
        </div>

        {/* Vertical Label */}
        <div className="absolute left-6 lg:left-10 top-1/2 -translate-y-1/2">
          <p className="writing-vertical font-mono text-[9px] tracking-widest text-stone-300/60 uppercase">
            SS 2025 Collection
          </p>
        </div>

        {/* Hero Content */}
        <div className="relative w-full max-w-screen-xl mx-auto px-6 lg:px-10 pb-16 lg:pb-24">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] tracking-widest text-stone-300/80 uppercase mb-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
              New Collection
            </p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl font-light text-stone-50 leading-none mb-6 animate-fade-up" style={{ animationDelay: '300ms' }}>
              Dressed<br />
              <em className="italic">in quiet</em><br />
              luxury.
            </h1>
            <p className="font-body text-stone-300 font-light max-w-sm leading-relaxed mb-10 animate-fade-up" style={{ animationDelay: '400ms' }}>
              Considered pieces for a considered life. Each garment crafted to outlast seasons.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '500ms' }}>
              <Link to="/products" className="btn-primary">
                Explore Collection
              </Link>
              <a
                href="https://wa.me/212600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline border-stone-300 text-stone-100 hover:bg-stone-50 hover:text-stone-900"
              >
                Order on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 right-10 hidden lg:flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: '800ms' }}>
          <span className="font-mono text-[9px] text-stone-400 tracking-widest writing-vertical">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-stone-400 to-transparent" />
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <div className="bg-stone-900 py-3 overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap animate-[marquee_20s_linear_infinite]">
          {Array(4).fill(null).map((_, i) => (
            <div key={i} className="flex gap-12 items-center shrink-0">
              {['New Arrivals', '·', 'Free Delivery', '·', 'WhatsApp Orders', '·', 'Premium Fabrics', '·', 'SS 2025'].map((t, j) => (
                <span key={j} className="font-mono text-[10px] tracking-widest text-stone-400 uppercase">{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* FEATURED SECTION */}
      <section className="max-w-screen-xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div ref={titleRef} className="animate-on-scroll flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="section-label mb-2">Featured Pieces</p>
            <h2 className="display-title text-3xl lg:text-4xl text-stone-900">
              The Edit
            </h2>
          </div>
          <Link to="/products" className="text-xs tracking-widest uppercase font-body font-medium text-stone-500 hover:text-stone-900 transition-colors flex items-center gap-2">
            View All
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {featured.map((product, i) => (
            <div key={product.id} ref={setRef(i)} className="animate-on-scroll">
              <ProductCard product={product} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* EDITORIAL BANNER */}
      <section className="grid lg:grid-cols-2 min-h-[70vh]">
        <div className="relative overflow-hidden min-h-[50vw] lg:min-h-0">
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&q=85"
            alt="Editorial"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="bg-stone-100 flex flex-col justify-center px-10 lg:px-16 py-16 lg:py-0">
          <p className="section-label mb-6">The Philosophy</p>
          <h2 className="display-title text-4xl lg:text-5xl text-stone-900 mb-6 leading-tight">
            Less, but<br /><em>infinitely</em> more.
          </h2>
          <p className="font-body text-stone-500 font-light leading-relaxed max-w-sm mb-10 text-sm">
            We believe in the power of restraint. In choosing one perfect piece over ten fleeting ones. In fabric that tells a story and silhouettes that age like fine things do — only better.
          </p>
          <Link to="/products" className="btn-outline self-start">
            Discover More
          </Link>
        </div>
      </section>

      {/* CATEGORIES STRIP */}
      <section className="max-w-screen-xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="section-label mb-2">Shop By</p>
            <h2 className="display-title text-3xl lg:text-4xl text-stone-900">Categories</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { label: 'Tops', img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&q=80', slug: 'tops' },
            { label: 'Bottoms', img: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?w=400&q=80', slug: 'bottoms' },
            { label: 'Outerwear', img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80', slug: 'outerwear' },
            { label: 'Dresses', img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80', slug: 'dresses' },
            { label: 'Accessories', img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80', slug: 'accessories' },
          ].map((cat) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className="group relative overflow-hidden aspect-[3/4] bg-stone-100"
            >
              <img
                src={cat.img}
                alt={cat.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-stone-900/40 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-display text-xl text-stone-50 font-light">{cat.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* INSTAGRAM-STYLE ROW */}
      <section className="max-w-screen-xl mx-auto px-6 lg:px-10 pb-20 lg:pb-28">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="section-label mb-2">As Worn</p>
            <h2 className="display-title text-3xl lg:text-4xl text-stone-900">@maisonstore</h2>
          </div>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xs tracking-widest uppercase font-body font-medium text-stone-500 hover:text-stone-900 transition-colors flex items-center gap-2">
            Follow Us →
          </a>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
          {[
            'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=400&q=80',
            'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80',
            'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80',
            'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80',
            'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&q=80',
          ].map((src, i) => (
            <a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden aspect-square bg-stone-100"
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
              />
            </a>
          ))}
        </div>
      </section>

      {/* WHATSAPP CTA BAND */}
      <section className="bg-whatsapp py-16 lg:py-20">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <p className="font-mono text-[10px] tracking-widest text-white/70 uppercase mb-2">Easy Ordering</p>
            <h2 className="display-title text-3xl lg:text-4xl text-white">Order directly on WhatsApp</h2>
            <p className="font-body text-white/80 font-light mt-3 text-sm">
              Browse, choose your size, and message us — it takes 60 seconds.
            </p>
          </div>
          <a
            href="https://wa.me/212600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-3 px-10 py-4 bg-white text-stone-900 font-body font-medium text-xs tracking-widest uppercase hover:bg-stone-100 transition-colors"
          >
            <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Start Chatting
          </a>
        </div>
      </section>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </main>
  )
}
