import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { itemCount, toggleCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  const navLinks = [
    { to: '/products', label: 'Shop' },
    { to: '/products?category=New', label: 'New In' },
    { to: '/products?category=Jackets', label: 'Jackets' },
    { to: '/products?category=Dresses', label: 'Dresses' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-cream/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
        }`}
      >
        {/* Announcement bar */}
        <div className="bg-charcoal text-cream text-center py-2 px-4">
          <p className="font-mono text-[10px] tracking-widest2 uppercase">
            Free shipping on orders over $200 &nbsp;·&nbsp; New arrivals every Thursday
          </p>
        </div>

        <nav className="mx-auto px-5 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16">

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5 group"
              aria-label="Toggle menu"
            >
              <span className={`block h-px bg-charcoal transition-all duration-300 ${menuOpen ? 'w-6 rotate-45 translate-y-[5px]' : 'w-6'}`} />
              <span className={`block h-px bg-charcoal transition-all duration-300 ${menuOpen ? 'opacity-0 w-0' : 'w-4'}`} />
              <span className={`block h-px bg-charcoal transition-all duration-300 ${menuOpen ? 'w-6 -rotate-45 -translate-y-[5px]' : 'w-6'}`} />
            </button>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="font-mono text-[10px] tracking-widest2 uppercase text-charcoal hover:opacity-50 transition-opacity duration-200"
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Logo */}
            <Link
              to="/"
              className="absolute left-1/2 -translate-x-1/2 font-display text-2xl font-semibold tracking-widest text-charcoal"
            >
              NOIR
            </Link>

            {/* Right actions */}
            <div className="flex items-center gap-4 ml-auto md:ml-0">
              {/* Search */}
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="font-body text-sm bg-transparent border-b border-charcoal outline-none w-36 md:w-48 py-1 placeholder:text-noir-400"
                  />
                  <button type="button" onClick={() => { setSearchOpen(false); setSearchQuery(''); }} className="ml-2 text-noir-400 hover:text-charcoal">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="hover:opacity-50 transition-opacity"
                  aria-label="Search"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M13 13l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              )}

              {/* Wishlist */}
              <button className="hidden md:block hover:opacity-50 transition-opacity" aria-label="Wishlist">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 15.5S2 11 2 6a4 4 0 017-2.65A4 4 0 0116 6c0 5-7 9.5-7 9.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Cart */}
              <button
                onClick={toggleCart}
                className="relative hover:opacity-50 transition-opacity"
                aria-label="Cart"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M1 1h2.5l2 9h9l2-7H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="7" cy="15" r="1" fill="currentColor"/>
                  <circle cx="13" cy="15" r="1" fill="currentColor"/>
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-charcoal text-cream font-mono text-[9px] w-4 h-4 flex items-center justify-center rounded-full">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-cream pt-[88px] px-8 flex flex-col">
          <nav className="flex flex-col gap-8 mt-8">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="font-display text-3xl font-normal text-charcoal hover:opacity-50 transition-opacity"
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-auto pb-12 flex flex-col gap-4">
            <Link to="/checkout" onClick={() => setMenuOpen(false)} className="font-mono text-xs tracking-widest2 uppercase text-noir-500">Checkout</Link>
            <span className="font-mono text-xs tracking-widest2 uppercase text-noir-400">Free returns · Secure checkout</span>
          </div>
        </div>
      )}
    </>
  );
}
