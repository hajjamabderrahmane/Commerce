import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';

export default function About() {
  useReveal();

  return (
    <main className="pt-28 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="reveal">
          <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-secondary mb-4">Our Story</p>
          <h1 className="font-serif text-6xl md:text-8xl font-semibold leading-none">
            About
            <br />
            <em className="not-italic text-secondary">Mixtas</em>
          </h1>
        </div>
      </div>

      {/* Hero image */}
      <div className="reveal max-w-7xl mx-auto px-6 mb-24">
        <div className="aspect-[16/7] overflow-hidden bg-accent/20">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80"
            alt="Mixtas brand"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Story text */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="reveal mb-16">
          <p className="font-sans text-[10px] tracking-widest uppercase text-secondary mb-6">01 — Origins</p>
          <p className="font-serif text-2xl md:text-3xl leading-relaxed font-light text-primary">
            Mixtas was born out of a deep frustration with noise — too many logos, too many trends, too much of everything.
          </p>
        </div>

        <div className="reveal mb-16">
          <p className="font-sans text-[10px] tracking-widest uppercase text-secondary mb-6">02 — Philosophy</p>
          <p className="font-sans text-base leading-relaxed text-secondary">
            We believe that true style is about restraint. Every piece we design starts with a question: what can we remove? The result is clothing that feels inevitable — like it couldn't have been made any other way.
          </p>
          <p className="font-sans text-base leading-relaxed text-secondary mt-4">
            Our fabrics are sourced from ethical mills. Our cuts are refined season after season until they're right. We don't chase trends. We build wardrobe foundations.
          </p>
        </div>

        <div className="reveal mb-20">
          <p className="font-sans text-[10px] tracking-widest uppercase text-secondary mb-6">03 — How We Work</p>
          <p className="font-sans text-base leading-relaxed text-secondary">
            Based in Casablanca, we operate with a small team and a direct model — no middlemen, no markups, just clothes made well and sold honestly. Every order is placed through WhatsApp so you're always speaking to a real person, not an algorithm.
          </p>
        </div>

        <div className="reveal border-t border-accent pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { num: '2021', label: 'Founded' },
            { num: '500+', label: 'Happy Customers' },
            { num: '100%', label: 'Organic Cotton' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-5xl font-semibold">{stat.num}</p>
              <p className="font-sans text-xs tracking-widest uppercase text-secondary mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="reveal max-w-7xl mx-auto px-6 mt-24">
        <div className="bg-primary text-bg p-12 text-center">
          <h3 className="font-serif text-3xl md:text-4xl font-semibold mb-4">Ready to explore the collection?</h3>
          <Link
            to="/products"
            className="inline-block mt-6 font-sans text-xs tracking-widest uppercase bg-bg text-primary px-10 py-4 hover:bg-accent transition-colors duration-200"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </main>
  );
}
