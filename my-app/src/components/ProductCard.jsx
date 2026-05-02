import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, index = 0 }) {
  const [hovered, setHovered] = useState(false);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div
      className="product-card animate-slide-up"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/products/${product.id}`}>
        {/* Image */}
        <div className="relative img-zoom-wrap aspect-[3/4] bg-noir-100 overflow-hidden">
          <img
            src={hovered && product.hoverImage ? product.hoverImage : product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-700"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.isNew && (
              <span className="badge bg-charcoal text-cream">New</span>
            )}
            {product.isBestseller && !product.isNew && (
              <span className="badge bg-noir-200 text-charcoal">Bestseller</span>
            )}
            {discount && (
              <span className="badge bg-rose-100 text-rose-800">−{discount}%</span>
            )}
          </div>

          {/* Quick add overlay */}
          <div className={`absolute bottom-0 left-0 right-0 bg-cream/95 py-3 px-4 transition-all duration-300 ${
            hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            <p className="font-mono text-[10px] tracking-widest2 uppercase text-center text-charcoal">
              View Details
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="mt-3 px-0.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-body text-sm font-medium leading-snug flex-1">{product.name}</h3>
            <div className="text-right flex-shrink-0">
              {product.originalPrice ? (
                <div className="flex flex-col items-end">
                  <span className="font-body text-sm font-medium">${product.price}</span>
                  <span className="font-body text-xs text-noir-400 line-through">${product.originalPrice}</span>
                </div>
              ) : (
                <span className="font-body text-sm font-medium">${product.price}</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 mt-1.5">
            <span className="section-label">{product.category}</span>
            {product.rating && (
              <div className="flex items-center gap-1">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className="text-noir-500">
                  <path d="M5 .5l1.12 2.27 2.51.36-1.82 1.77.43 2.5L5 6.2 2.76 7.4l.43-2.5L1.37 3.13l2.51-.36z"/>
                </svg>
                <span className="font-mono text-[9px] text-noir-500">{product.rating}</span>
              </div>
            )}
          </div>

          {/* Color dots */}
          {product.colors && (
            <div className="flex gap-1.5 mt-2">
              {product.colors.slice(0, 4).map(color => (
                <span key={color} className="font-mono text-[9px] text-noir-400 tracking-wider">
                  {color}{product.colors.indexOf(color) < Math.min(product.colors.length, 4) - 1 ? ' ·' : ''}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
