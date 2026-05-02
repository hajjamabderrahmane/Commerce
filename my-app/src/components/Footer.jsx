import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream mt-24">
      {/* Newsletter */}
      <div className="border-b border-noir-800 py-14 px-8 md:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <p className="section-label text-noir-500 mb-3">Stay in the loop</p>
          <h3 className="font-display text-2xl md:text-3xl font-normal mb-6">
            New arrivals, first looks, and <em>nothing else.</em>
          </h3>
          <form className="flex gap-0 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-transparent border border-noir-700 border-r-0 px-4 py-3 font-body text-sm placeholder:text-noir-600 focus:outline-none focus:border-noir-500 text-cream"
            />
            <button type="submit" className="bg-cream text-charcoal font-mono text-[10px] tracking-widest2 uppercase px-6 py-3 hover:bg-noir-200 transition-colors flex-shrink-0">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-8 md:px-12 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <p className="font-display text-3xl font-semibold tracking-widest mb-6">NOIR</p>
          <p className="font-body text-sm text-noir-500 leading-relaxed">
            Minimal fashion for those who know. Curated, considered, enduring.
          </p>
        </div>

        <div>
          <p className="section-label text-noir-600 mb-5">Shop</p>
          <ul className="space-y-3">
            {['New In', 'Jackets', 'Tops', 'Trousers', 'Dresses', 'Skirts'].map(cat => (
              <li key={cat}>
                <Link to={`/products?category=${cat}`} className="font-body text-sm text-noir-400 hover:text-cream transition-colors">
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="section-label text-noir-600 mb-5">Help</p>
          <ul className="space-y-3">
            {['Sizing Guide', 'Shipping & Returns', 'Care Instructions', 'Contact Us', 'FAQ'].map(item => (
              <li key={item}>
                <a href="#" className="font-body text-sm text-noir-400 hover:text-cream transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="section-label text-noir-600 mb-5">Follow</p>
          <ul className="space-y-3">
            {['Instagram', 'Pinterest', 'TikTok'].map(s => (
              <li key={s}>
                <a href="#" className="font-body text-sm text-noir-400 hover:text-cream transition-colors">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-noir-800 px-8 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="font-mono text-[10px] tracking-wider text-noir-600 uppercase">
          © {new Date().getFullYear()} Noir. All rights reserved.
        </p>
        <div className="flex gap-6">
          {['Privacy Policy', 'Terms of Service', 'Cookies'].map(item => (
            <a key={item} href="#" className="font-mono text-[10px] tracking-wider text-noir-600 hover:text-noir-400 transition-colors uppercase">
              {item}
            </a>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          {['visa', 'mc', 'amex', 'paypal'].map(method => (
            <div key={method} className="w-10 h-6 bg-noir-800 rounded-sm flex items-center justify-center">
              <span className="font-mono text-[7px] text-noir-500 uppercase">{method}</span>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
