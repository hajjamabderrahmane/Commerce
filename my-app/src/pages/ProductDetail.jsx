import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import WhatsAppButton from '../components/WhatsAppButton';
import ProductCard from '../components/ProductCard';
import { useReveal } from '../hooks/useReveal';

export default function ProductDetail() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  const [selectedSize, setSelectedSize] = useState('M');
  const [activeImg, setActiveImg] = useState(0);
  useReveal();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!product) {
    return (
      <main className="pt-28 pb-24 text-center">
        <h1 className="font-serif text-3xl mb-6">Product not found</h1>
        <Link to="/products" className="text-sm font-sans underline text-secondary">← Back to shop</Link>
      </main>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <main className="pt-20 pb-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <p className="text-[10px] font-sans tracking-widest uppercase text-secondary">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">—</span>
          <Link to="/products" className="hover:text-primary transition-colors">Shop</Link>
          <span className="mx-2">—</span>
          <span className="text-primary">{product.name}</span>
        </p>
      </div>

      {/* Main product */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images */}
          <div className="flex flex-col gap-3">
            <div className="overflow-hidden bg-accent/20 aspect-[4/5]">
              <img
                src={product.images[activeImg]}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`overflow-hidden w-20 h-24 flex-shrink-0 transition-all duration-200 ${
                      activeImg === i ? 'ring-2 ring-primary ring-offset-2' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="py-4 flex flex-col">
            {product.tag && (
              <span className="self-start text-[10px] font-sans tracking-widest uppercase bg-primary text-bg px-3 py-1 mb-6">
                {product.tag}
              </span>
            )}
            <p className="text-[10px] font-sans tracking-widest uppercase text-secondary mb-2">
              {product.category}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold leading-tight mb-4">
              {product.name}
            </h1>
            <p className="font-sans text-2xl font-light text-secondary mb-8">
              {product.price} <span className="text-base">MAD</span>
            </p>

            <div className="w-12 h-px bg-accent mb-8" />

            <p className="font-sans text-sm text-secondary leading-relaxed mb-10">
              {product.description}
            </p>

            {/* Size selector */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-sans tracking-widest uppercase">Select Size</p>
                <button className="text-[10px] font-sans tracking-widest uppercase text-secondary border-b border-secondary/30 hover:text-primary transition-colors">
                  Size Guide
                </button>
              </div>
              <div className="flex gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`w-11 h-11 font-sans text-sm font-medium transition-all duration-200 ${
                      selectedSize === s
                        ? 'bg-primary text-bg'
                        : 'border border-accent text-secondary hover:border-primary hover:text-primary'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <WhatsAppButton
              productName={product.name}
              price={product.price}
              size={selectedSize}
            />

            <p className="mt-4 text-[10px] font-sans tracking-widest uppercase text-secondary">
              Free shipping over 500 MAD · Easy returns
            </p>

            {/* Features */}
            <div className="mt-12 border-t border-accent/60 pt-8 grid grid-cols-2 gap-4">
              {['100% Organic Cotton', 'Limited Edition', 'Made in Morocco', 'Free Returns'].map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-secondary rounded-full" />
                  <p className="text-xs font-sans text-secondary">{f}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 mt-24">
          <div className="reveal mb-12">
            <h2 className="font-serif text-3xl font-semibold">You Might Also Like</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {related.map((p, i) => (
              <div key={p.id} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
