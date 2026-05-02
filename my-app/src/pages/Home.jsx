import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products, categories } from '../data/products';
import ProductGrid from '../components/ProductGrid';
import CategoryCard from '../components/CategoryCard';
import { useReveal } from '../hooks/useReveal';

export default function Home() {
  useReveal();

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary">
        <img
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&q=85"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        {/* Grain overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative text-center px-6 max-w-3xl mx-auto">
          <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-bg/50 mb-6">
            New Collection — SS 2025
          </p>
          <h1 className="font-serif text-6xl md:text-8xl font-semibold text-bg leading-[1.05] mb-8">
            Wear the
            <br />
            <em className="not-italic text-accent">Silence</em>
          </h1>
          <p className="font-sans text-bg/60 text-base md:text-lg mb-10 leading-relaxed max-w-md mx-auto">
            Minimalist luxury streetwear crafted for those who let their presence speak.
          </p>
          <Link
            to="/products"
            className="inline-block font-sans text-sm tracking-widest uppercase bg-bg text-primary px-10 py-4 hover:bg-accent transition-colors duration-200"
          >
            Shop Now
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-bg/30">
          <p className="text-[9px] font-sans tracking-widest uppercase">Scroll</p>
          <div className="w-px h-12 bg-bg/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-bg/60 animate-bounce" style={{ animationDuration: '1.5s' }} />
          </div>
        </div>
      </section>

      {/* Marquee strip */}
      <div className="bg-primary text-bg py-3 overflow-hidden">
        <div className="flex gap-16 animate-marquee whitespace-nowrap" style={{ animation: 'marquee 20s linear infinite' }}>
          {Array(6).fill(['Free shipping over 500 MAD', '★ New Arrivals Weekly', 'WhatsApp Orders Available', 'Handcrafted in Morocco']).flat().map((t, i) => (
            <span key={i} className="text-[10px] font-sans tracking-widest uppercase text-bg/60 shrink-0">
              {t} <span className="mx-8 text-bg/20">—</span>
            </span>
          ))}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </div>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="reveal flex flex-col md:flex-row items-baseline justify-between gap-4 mb-14">
          <h2 className="font-serif text-4xl md:text-5xl font-semibold">New Arrivals</h2>
          <Link
            to="/products"
            className="font-sans text-xs tracking-widest uppercase text-secondary hover:text-primary transition-colors border-b border-secondary/40 pb-0.5"
          >
            View all →
          </Link>
        </div>
        <ProductGrid products={products.slice(0, 6)} />
      </section>

      {/* Category section */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="reveal mb-14">
          <h2 className="font-serif text-4xl md:text-5xl font-semibold">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <div key={cat.name} className="reveal" style={{ transitionDelay: `${i * 60}ms` }}>
              <CategoryCard category={cat} />
            </div>
          ))}
        </div>
      </section>

      {/* Brand banner */}
      <section className="bg-accent/30 py-24 px-6 text-center reveal">
        <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-secondary mb-4">Our Promise</p>
        <h2 className="font-serif text-4xl md:text-6xl font-semibold max-w-2xl mx-auto leading-tight">
          Quality over everything. Always.
        </h2>
        <p className="mt-6 text-secondary font-sans text-base max-w-md mx-auto leading-relaxed">
          Every piece is cut, sewn, and finished with obsessive attention to detail. No shortcuts. No compromises.
        </p>
        <Link
          to="/about"
          className="inline-block mt-10 font-sans text-xs tracking-widest uppercase border border-primary text-primary px-8 py-3.5 hover:bg-primary hover:text-bg transition-colors duration-200"
        >
          Our Story
        </Link>
      </section>

      {/* WhatsApp CTA */}
      <section className="max-w-7xl mx-auto px-6 py-24 reveal">
        <div className="bg-primary text-bg p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-serif text-3xl md:text-4xl font-semibold mb-3">Ready to order?</h3>
            <p className="text-bg/60 font-sans text-sm leading-relaxed max-w-sm">
              No complicated checkout. Just message us on WhatsApp and we'll handle everything.
            </p>
          </div>
          <a
            href="https://wa.me/212600000000"
            target="_blank"
            rel="noreferrer"
            className="shrink-0 inline-flex items-center gap-3 bg-wa text-white font-sans font-medium tracking-wide px-8 py-4 hover:bg-emerald-500 transition-colors wa-pulse"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Start Order
          </a>
        </div>
      </section>
    </main>
  );
}
