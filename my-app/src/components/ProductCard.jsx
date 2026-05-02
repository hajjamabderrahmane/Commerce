import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.slug}`} className="product-card group block">
      <div className="overflow-hidden bg-accent/20 aspect-[3/4] relative">
        <img
          src={product.image}
          alt={product.name}
          className="product-img w-full h-full object-cover"
          loading="lazy"
        />
        {product.tag && (
          <span className="absolute top-3 left-3 text-[10px] font-sans tracking-widest uppercase bg-primary text-bg px-2 py-1">
            {product.tag}
          </span>
        )}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
      </div>
      <div className="mt-3 px-1">
        <p className="text-[10px] font-sans tracking-widest uppercase text-secondary mb-1">
          {product.category}
        </p>
        <h3 className="font-serif text-base font-medium text-primary leading-snug">
          {product.name}
        </h3>
        <p className="mt-1 text-sm font-sans text-secondary">
          {product.price} MAD
        </p>
      </div>
    </Link>
  );
}
