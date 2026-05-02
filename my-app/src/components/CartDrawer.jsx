import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, itemCount } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="cart-overlay fixed inset-0 bg-charcoal/30 z-[80] backdrop-blur-sm"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="cart-drawer fixed top-0 right-0 h-full w-full max-w-md bg-cream z-[90] flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-noir-200">
          <div>
            <h2 className="font-display text-xl font-normal">Your Cart</h2>
            <p className="section-label mt-1">{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
          </div>
          <button onClick={closeCart} className="hover:opacity-50 transition-opacity" aria-label="Close cart">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2 2l16 16M18 2L2 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-noir-300">
                <path d="M4 4h8l6 26h24l6-18H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="18" cy="38" r="3" fill="currentColor"/>
                <circle cx="36" cy="38" r="3" fill="currentColor"/>
              </svg>
              <div>
                <p className="font-display text-xl mb-2">Your cart is empty</p>
                <p className="font-body text-sm text-noir-500">Add something beautiful to get started.</p>
              </div>
              <button onClick={closeCart} className="btn-outline mt-4">
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-noir-100">
              {items.map(item => (
                <li key={item.key} className="py-6 flex gap-4 animate-fade-in">
                  <div className="w-20 h-24 flex-shrink-0 overflow-hidden bg-noir-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-body text-sm font-medium leading-snug">{item.name}</p>
                        <p className="section-label mt-1">Size: {item.size}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.key)}
                        className="text-noir-400 hover:text-charcoal transition-colors ml-2 flex-shrink-0"
                        aria-label="Remove item"
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Qty */}
                      <div className="flex items-center border border-noir-200">
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-noir-100 transition-colors text-sm"
                        >−</button>
                        <span className="w-8 h-8 flex items-center justify-center font-mono text-xs">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-noir-100 transition-colors text-sm"
                        >+</button>
                      </div>
                      <p className="font-body font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-noir-200 px-8 py-6 space-y-4 bg-cream">
            <div className="flex justify-between items-center">
              <span className="section-label">Subtotal</span>
              <span className="font-display text-xl">${subtotal.toFixed(2)}</span>
            </div>
            <p className="font-mono text-[10px] tracking-widest text-noir-400 uppercase">
              Taxes and shipping calculated at checkout
            </p>
            <Link
              to="/checkout"
              onClick={closeCart}
              className="btn-primary w-full block text-center"
            >
              Proceed to Checkout
            </Link>
            <button onClick={closeCart} className="btn-ghost w-full text-center block py-2">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
