import { Link } from 'react-router-dom';

export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/products?category=${category.name}`}
      className="group relative overflow-hidden block aspect-[2/3]"
    >
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="font-serif text-xl text-bg font-medium">{category.name}</h3>
        <p className="text-[11px] font-sans tracking-widest uppercase text-bg/70 mt-0.5">
          {category.count} pieces
        </p>
      </div>
    </Link>
  );
}
