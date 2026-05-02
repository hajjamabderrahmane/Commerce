import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Shop' },
    { to: '/about', label: 'About' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-bg/95 backdrop-blur-md border-b border-accent/40 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Left nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.slice(0, 2).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`nav-link text-sm font-sans tracking-widest uppercase text-primary/80 hover:text-primary transition-colors ${
                location.pathname === l.to ? 'text-primary' : ''
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Logo */}
        <Link
          to="/"
          className="font-serif text-2xl md:text-3xl font-semibold tracking-tight text-primary absolute left-1/2 -translate-x-1/2"
        >
          MIXTAS
        </Link>

        {/* Right */}
        <div className="hidden md:flex items-center gap-6 ml-auto">
          <Link
            to="/about"
            className="nav-link text-sm font-sans tracking-widest uppercase text-primary/80 hover:text-primary transition-colors"
          >
            About
          </Link>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-sans tracking-wider bg-primary text-bg px-5 py-2 hover:bg-primary/80 transition-colors"
          >
            Order via WhatsApp
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden ml-auto flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-primary transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
          <span className={`block w-6 h-px bg-primary transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-primary transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-bg border-t border-accent/40 overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-64 py-6' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col items-center gap-5 px-6">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-sans tracking-widest uppercase text-primary"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-sans tracking-wider bg-primary text-bg px-6 py-2.5 w-full text-center"
          >
            Order via WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
