import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(id));
  const { addItem, openCart } = useCart();
  const { addToast } = useToast();

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState('description');

  if (!product) {
    return (
      <main className="pt-[88px] flex flex-col items-center justify-center min-h-screen gap-6">
        <p className="font-display text-2xl">Product not found</p>
        <Link to="/products" className="btn-primary">Back to Shop</Link>
      </main>
    );
  }

  const images = [product.image, product.hoverImage].filter(Boolean);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    addItem(product, selectedSize, quantity);
    addToast({ message: `${product.name} added to cart` });
    openCart();
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const accordions = [
    {
      id: 'description',
      title: 'Description',
      content: product.description,
    },
    {
      id: 'details',
      title: 'Product Details',
      content: product.details?.join('\n'),
    },
    {
      id: 'shipping',
      title: 'Shipping & Returns',
      content: 'Free standard shipping on orders over $200. Express shipping available at checkout.\n\nFree returns within 30 days of delivery. Items must be unworn with original tags attached.',
    },
    {
      id: 'care',
      title: 'Care Instructions',
      content: `Follow garment care label instructions. When in doubt, dry clean is always safe.\n\nStore folded or on padded hangers. Avoid direct sunlight for extended periods.`,
    },
  ];

  return (
    <main className="pt-[88px]">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-8 md:px-12 py-5">
        <nav className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-noir-400 uppercase">
          <Link to="/" className="hover:text-charcoal transition-colors">Home</Link>
          <span>·</span>
          <Link to="/products" className="hover:text-charcoal transition-colors">Shop</Link>
          <span>·</span>
          <Link to={`/products?category=${product.category}`} className="hover:text-charcoal transition-colors">{product.category}</Link>
          <span>·</span>
          <span className="text-charcoal">{product.name}</span>
        </nav>
      </div>

      {/* Product layout */}
      <div className="max-w-7xl mx-auto px-8 md:px-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Images */}
          <div className="space-y-3">
            <div className="relative aspect-[3/4] bg-noir-100 overflow-hidden img-zoom-wrap">
              <img
                src={images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.isNew && (
                <div className="absolute top-4 left-4">
                  <span className="badge bg-charcoal text-cream">New</span>
                </div>
              )}
              {discount && (
                <div className="absolute top-4 right-4">
                  <span className="badge bg-rose-100 text-rose-800">−{discount}%</span>
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-24 overflow-hidden border-2 transition-all ${
                      activeImage === i ? 'border-charcoal' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            {/* Category + badges */}
            <div className="flex items-center gap-3 mb-4">
              <span className="section-label">{product.category}</span>
              {product.isBestseller && <span className="badge bg-noir-100 text-noir-700">Bestseller</span>}
              {product.gender && <span className="section-label">· {product.gender}</span>}
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl font-normal mb-3">{product.name}</h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mb-5">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(star => (
                    <svg key={star} width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 .5l1.35 2.73 3.01.44-2.18 2.12.51 3L6 7.4l-2.69 1.39.51-3L1.64 3.67l3.01-.44z"
                        fill={star <= Math.round(product.rating) ? '#1a1a1a' : 'none'}
                        stroke="#1a1a1a" strokeWidth="0.8"/>
                    </svg>
                  ))}
                </div>
                <span className="font-mono text-xs text-noir-500">{product.rating} ({product.reviews} reviews)</span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-display text-2xl">${product.price}</span>
              {product.originalPrice && (
                <span className="font-body text-base text-noir-400 line-through">${product.originalPrice}</span>
              )}
              {discount && (
                <span className="font-mono text-xs text-rose-700 bg-rose-50 px-2 py-0.5">Save {discount}%</span>
              )}
            </div>

            {/* Colors */}
            {product.colors && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="section-label">Color</p>
                  <span className="font-body text-xs text-noir-600">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 font-body text-xs border transition-all ${
                        selectedColor === color
                          ? 'border-charcoal bg-charcoal text-cream'
                          : 'border-noir-300 text-charcoal hover:border-charcoal'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <p className={`section-label ${sizeError ? 'text-rose-600' : ''}`}>
                  {sizeError ? 'Please select a size' : 'Size'}
                </p>
                <button className="font-mono text-[10px] tracking-wider text-noir-500 hover:text-charcoal underline transition-colors uppercase">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes?.map(size => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setSizeError(false); }}
                    className={`h-10 px-3 min-w-[44px] font-mono text-[11px] border transition-all ${
                      selectedSize === size
                        ? 'bg-charcoal text-cream border-charcoal'
                        : sizeError
                        ? 'border-rose-300 text-noir-600 hover:border-rose-500'
                        : 'border-noir-300 text-charcoal hover:border-charcoal'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty + Add to cart */}
            <div className="flex gap-3 mb-5">
              <div className="flex items-center border border-noir-300">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-11 h-12 flex items-center justify-center hover:bg-noir-100 transition-colors"
                >−</button>
                <span className="w-10 text-center font-mono text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-11 h-12 flex items-center justify-center hover:bg-noir-100 transition-colors"
                >+</button>
              </div>
              <button onClick={handleAddToCart} className="btn-primary flex-1 h-12">
                Add to Cart — ${(product.price * quantity).toFixed(2)}
              </button>
            </div>

            <button className="btn-outline w-full h-12 flex items-center justify-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 14S1.5 10 1.5 5.5a4 4 0 016.5-3.1A4 4 0 0114.5 5.5C14.5 10 8 14 8 14z" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              Add to Wishlist
            </button>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-5 mt-6 pt-6 border-t border-noir-200">
              {[
                { icon: '⟳', text: 'Free 30-day returns' },
                { icon: '⊡', text: 'Secure checkout' },
                { icon: '✈', text: 'Ships in 2–4 days' },
              ].map(item => (
                <div key={item.text} className="flex items-center gap-2">
                  <span className="text-noir-400 text-sm">{item.icon}</span>
                  <span className="font-mono text-[10px] tracking-wider text-noir-500 uppercase">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Accordions */}
            <div className="mt-8 border-t border-noir-200">
              {accordions.map(acc => (
                <div key={acc.id} className="border-b border-noir-200">
                  <button
                    onClick={() => setAccordionOpen(accordionOpen === acc.id ? null : acc.id)}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <span className="font-body text-sm font-medium">{acc.title}</span>
                    <span className="text-noir-400 transition-transform duration-200" style={{ transform: accordionOpen === acc.id ? 'rotate(45deg)' : 'none' }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </span>
                  </button>
                  {accordionOpen === acc.id && (
                    <div className="pb-5 animate-fade-in">
                      {acc.content.split('\n').map((line, i) => (
                        <p key={i} className={`font-body text-sm text-noir-600 leading-relaxed ${i > 0 ? 'mt-2' : ''}`}>
                          {line}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-24">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="section-label mb-2">More from {product.category}</p>
                <h2 className="font-display text-3xl font-normal">You May Also Like</h2>
              </div>
              <Link to={`/products?category=${product.category}`} className="btn-ghost hidden md:block">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
