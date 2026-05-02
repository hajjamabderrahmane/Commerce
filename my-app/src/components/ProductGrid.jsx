import ProductCard from './ProductCard';

export default function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
      {products.map((p, i) => (
        <div key={p.id} className="reveal" style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}
