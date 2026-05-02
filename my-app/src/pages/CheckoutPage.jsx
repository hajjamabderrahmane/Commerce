import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const STEPS = ['Shipping', 'Payment', 'Review'];

export default function CheckoutPage() {
  const { items, subtotal, clearCart, closeCart } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [placing, setPlacing] = useState(false);

  const [shipping, setShipping] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '', country: 'US',
  });

  const [payment, setPayment] = useState({
    cardNumber: '', cardName: '', expiry: '', cvv: '',
    method: 'card',
  });

  const [shippingMethod, setShippingMethod] = useState('standard');

  const shippingCost = subtotal >= 200 ? 0 : shippingMethod === 'express' ? 25 : 12;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShipping(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = (e) => {
    const { name, value } = e.target;
    let v = value;
    if (name === 'cardNumber') v = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
    if (name === 'expiry') v = value.replace(/\D/g, '').replace(/^(.{2})/, '$1/').slice(0, 5);
    if (name === 'cvv') v = value.replace(/\D/g, '').slice(0, 4);
    setPayment(prev => ({ ...prev, [name]: v }));
  };

  const validateShipping = () => {
    const required = ['firstName', 'lastName', 'email', 'address', 'city', 'zip'];
    return required.every(f => shipping[f].trim() !== '');
  };

  const validatePayment = () => {
    if (payment.method !== 'card') return true;
    return payment.cardNumber.length >= 19 && payment.cardName && payment.expiry.length === 5 && payment.cvv.length >= 3;
  };

  const nextStep = () => {
    if (step === 0 && !validateShipping()) {
      addToast({ message: 'Please fill in all required fields', type: 'error' });
      return;
    }
    if (step === 1 && !validatePayment()) {
      addToast({ message: 'Please enter valid payment details', type: 'error' });
      return;
    }
    setStep(s => Math.min(s + 1, 2));
  };

  const placeOrder = async () => {
    setPlacing(true);
    await new Promise(r => setTimeout(r, 1800)); // simulate API call
    clearCart();
    closeCart();
    addToast({ message: 'Order placed successfully! 🎉', duration: 5000 });
    navigate('/order-success');
    setPlacing(false);
  };

  if (items.length === 0 && !placing) {
    return (
      <main className="pt-[88px] flex flex-col items-center justify-center min-h-screen gap-6 px-8 text-center">
        <p className="font-display text-3xl">Your cart is empty</p>
        <p className="font-body text-sm text-noir-500">Add some pieces to continue to checkout.</p>
        <Link to="/products" className="btn-primary">Start Shopping</Link>
      </main>
    );
  }

  return (
    <main className="pt-[88px] min-h-screen bg-cream">
      <div className="max-w-6xl mx-auto px-8 md:px-12 py-12">

        {/* Header */}
        <div className="mb-10">
          <Link to="/" className="font-display text-2xl font-semibold tracking-widest">NOIR</Link>
          <div className="flex items-center gap-0 mt-6 max-w-xs">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] border transition-colors ${
                    i <= step ? 'bg-charcoal text-cream border-charcoal' : 'border-noir-300 text-noir-400'
                  }`}>
                    {i < step ? '✓' : i + 1}
                  </div>
                  <span className={`font-mono text-[9px] tracking-wider uppercase ${i <= step ? 'text-charcoal' : 'text-noir-400'}`}>
                    {s}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-px mb-5 mx-2 transition-colors ${i < step ? 'bg-charcoal' : 'bg-noir-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">

          {/* Form */}
          <div>
            {/* Step 0: Shipping */}
            {step === 0 && (
              <div className="animate-fade-in space-y-6">
                <h2 className="font-display text-2xl">Shipping Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="section-label block mb-2">First Name *</label>
                    <input name="firstName" value={shipping.firstName} onChange={handleShipping} className="input-field" placeholder="Jane" />
                  </div>
                  <div>
                    <label className="section-label block mb-2">Last Name *</label>
                    <input name="lastName" value={shipping.lastName} onChange={handleShipping} className="input-field" placeholder="Smith" />
                  </div>
                </div>
                <div>
                  <label className="section-label block mb-2">Email Address *</label>
                  <input name="email" type="email" value={shipping.email} onChange={handleShipping} className="input-field" placeholder="jane@example.com" />
                </div>
                <div>
                  <label className="section-label block mb-2">Phone</label>
                  <input name="phone" type="tel" value={shipping.phone} onChange={handleShipping} className="input-field" placeholder="+1 (555) 000-0000" />
                </div>
                <div>
                  <label className="section-label block mb-2">Street Address *</label>
                  <input name="address" value={shipping.address} onChange={handleShipping} className="input-field" placeholder="123 Main Street, Apt 4B" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <label className="section-label block mb-2">City *</label>
                    <input name="city" value={shipping.city} onChange={handleShipping} className="input-field" placeholder="New York" />
                  </div>
                  <div>
                    <label className="section-label block mb-2">State</label>
                    <input name="state" value={shipping.state} onChange={handleShipping} className="input-field" placeholder="NY" />
                  </div>
                  <div>
                    <label className="section-label block mb-2">ZIP *</label>
                    <input name="zip" value={shipping.zip} onChange={handleShipping} className="input-field" placeholder="10001" />
                  </div>
                </div>

                {/* Shipping method */}
                <div>
                  <p className="section-label mb-4">Shipping Method</p>
                  <div className="space-y-3">
                    {[
                      { id: 'standard', label: 'Standard Shipping', sub: '4–7 business days', price: subtotal >= 200 ? 'Free' : '$12' },
                      { id: 'express', label: 'Express Shipping', sub: '1–3 business days', price: '$25' },
                    ].map(method => (
                      <label
                        key={method.id}
                        className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                          shippingMethod === method.id ? 'border-charcoal bg-noir-50' : 'border-noir-200 hover:border-noir-400'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            shippingMethod === method.id ? 'border-charcoal' : 'border-noir-300'
                          }`}>
                            {shippingMethod === method.id && <div className="w-2 h-2 rounded-full bg-charcoal" />}
                          </div>
                          <div>
                            <p className="font-body text-sm font-medium">{method.label}</p>
                            <p className="font-mono text-[10px] text-noir-500">{method.sub}</p>
                          </div>
                        </div>
                        <span className="font-body text-sm font-medium">{method.price}</span>
                        <input type="radio" name="shipping" value={method.id} checked={shippingMethod === method.id} onChange={() => setShippingMethod(method.id)} className="sr-only" />
                      </label>
                    ))}
                  </div>
                </div>

                <button onClick={nextStep} className="btn-primary w-full py-4 mt-2">
                  Continue to Payment
                </button>
              </div>
            )}

            {/* Step 1: Payment */}
            {step === 1 && (
              <div className="animate-fade-in space-y-6">
                <h2 className="font-display text-2xl">Payment Details</h2>

                <div className="flex gap-3 mb-6">
                  {[
                    { id: 'card', label: 'Credit Card' },
                    { id: 'paypal', label: 'PayPal' },
                    { id: 'applepay', label: 'Apple Pay' },
                  ].map(m => (
                    <button
                      key={m.id}
                      onClick={() => setPayment(p => ({ ...p, method: m.id }))}
                      className={`flex-1 py-3 font-mono text-[10px] tracking-wider uppercase border transition-all ${
                        payment.method === m.id ? 'bg-charcoal text-cream border-charcoal' : 'border-noir-300 text-noir-600 hover:border-charcoal'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                {payment.method === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="section-label block mb-2">Card Number</label>
                      <input name="cardNumber" value={payment.cardNumber} onChange={handlePayment} className="input-field font-mono" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div>
                      <label className="section-label block mb-2">Name on Card</label>
                      <input name="cardName" value={payment.cardName} onChange={handlePayment} className="input-field" placeholder="Jane Smith" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="section-label block mb-2">Expiry Date</label>
                        <input name="expiry" value={payment.expiry} onChange={handlePayment} className="input-field font-mono" placeholder="MM/YY" />
                      </div>
                      <div>
                        <label className="section-label block mb-2">CVV</label>
                        <input name="cvv" value={payment.cvv} onChange={handlePayment} type="password" className="input-field font-mono" placeholder="•••" />
                      </div>
                    </div>
                  </div>
                )}

                {payment.method !== 'card' && (
                  <div className="flex flex-col items-center justify-center h-32 border border-noir-200 text-noir-400">
                    <p className="font-body text-sm">You will be redirected to {payment.method === 'paypal' ? 'PayPal' : 'Apple Pay'} at checkout</p>
                  </div>
                )}

                <div className="flex gap-3">
                  <button onClick={() => setStep(0)} className="btn-outline px-6">Back</button>
                  <button onClick={nextStep} className="btn-primary flex-1 py-4">
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Review */}
            {step === 2 && (
              <div className="animate-fade-in space-y-8">
                <h2 className="font-display text-2xl">Review Your Order</h2>

                <div className="border border-noir-200 divide-y divide-noir-200">
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <p className="section-label">Shipping To</p>
                      <button onClick={() => setStep(0)} className="font-mono text-[10px] tracking-wider text-noir-500 hover:text-charcoal underline uppercase">Edit</button>
                    </div>
                    <p className="font-body text-sm">{shipping.firstName} {shipping.lastName}</p>
                    <p className="font-body text-sm text-noir-600">{shipping.address}</p>
                    <p className="font-body text-sm text-noir-600">{shipping.city}, {shipping.state} {shipping.zip}</p>
                    <p className="font-body text-sm text-noir-600">{shipping.email}</p>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <p className="section-label">Payment</p>
                      <button onClick={() => setStep(1)} className="font-mono text-[10px] tracking-wider text-noir-500 hover:text-charcoal underline uppercase">Edit</button>
                    </div>
                    <p className="font-body text-sm capitalize">
                      {payment.method === 'card' ? `Card ending in ${payment.cardNumber.slice(-4)}` : payment.method}
                    </p>
                  </div>
                </div>

                {/* Items list */}
                <div>
                  <p className="section-label mb-4">Order Items ({items.length})</p>
                  <ul className="divide-y divide-noir-200 border border-noir-200">
                    {items.map(item => (
                      <li key={item.key} className="flex gap-4 p-4">
                        <img src={item.image} alt={item.name} className="w-14 h-18 object-cover bg-noir-100 flex-shrink-0" style={{ height: '72px' }} />
                        <div className="flex-1">
                          <p className="font-body text-sm font-medium">{item.name}</p>
                          <p className="section-label mt-1">Size: {item.size} · Qty: {item.quantity}</p>
                        </div>
                        <p className="font-body text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="btn-outline px-6">Back</button>
                  <button
                    onClick={placeOrder}
                    disabled={placing}
                    className="btn-primary flex-1 py-4 flex items-center justify-center gap-3"
                  >
                    {placing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-cream/30 border-t-cream rounded-full animate-spin" />
                        Placing Order...
                      </>
                    ) : (
                      `Place Order — $${total.toFixed(2)}`
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="border border-noir-200 p-6 bg-white/50">
              <h3 className="font-body font-medium mb-5">Order Summary</h3>

              <ul className="divide-y divide-noir-100 mb-5">
                {items.map(item => (
                  <li key={item.key} className="flex gap-3 py-4">
                    <div className="relative">
                      <img src={item.image} alt={item.name} className="w-14 object-cover bg-noir-100" style={{ height: '56px' }} />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-charcoal text-cream font-mono text-[9px] rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-xs font-medium leading-snug">{item.name}</p>
                      <p className="font-mono text-[9px] text-noir-500 mt-0.5 uppercase tracking-wider">{item.size}</p>
                    </div>
                    <p className="font-body text-sm font-medium flex-shrink-0">${(item.price * item.quantity).toFixed(2)}</p>
                  </li>
                ))}
              </ul>

              <div className="space-y-3 border-t border-noir-200 pt-5">
                <div className="flex justify-between text-sm">
                  <span className="text-noir-500">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-noir-500">Shipping</span>
                  <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-noir-500">Estimated Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium text-base border-t border-noir-200 pt-3 mt-1">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Promo code */}
              <div className="mt-5">
                <form className="flex gap-0" onSubmit={e => e.preventDefault()}>
                  <input className="input-field text-xs flex-1" placeholder="Promo code" />
                  <button type="submit" className="btn-primary px-4 py-3 text-xs">Apply</button>
                </form>
              </div>

              <div className="flex items-center justify-center gap-2 mt-5 text-noir-400">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <rect x="1" y="4" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M4 4V3a2 2 0 014 0v1" stroke="currentColor" strokeWidth="1.2"/>
                </svg>
                <span className="font-mono text-[9px] tracking-wider uppercase">SSL Secured Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
