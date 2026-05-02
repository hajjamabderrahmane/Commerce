import { Link } from 'react-router-dom';

export default function OrderSuccessPage() {
  const orderNumber = `NR-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <main className="pt-[88px] min-h-screen flex items-center justify-center px-8">
      <div className="max-w-lg w-full text-center animate-slide-up">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full border-2 border-charcoal flex items-center justify-center mx-auto mb-8">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 12l5 5L19 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <p className="section-label mb-3">Order Confirmed</p>
        <h1 className="font-display text-4xl font-normal mb-4">Thank you.</h1>
        <p className="font-body text-noir-600 leading-relaxed mb-2">
          Your order has been received and is being prepared.
          You will receive a confirmation email shortly.
        </p>
        <p className="font-mono text-sm text-noir-500 mb-10">
          Order #{orderNumber}
        </p>

        <div className="border border-noir-200 p-6 mb-8 text-left">
          <div className="grid grid-cols-2 gap-6">
            {[
              { label: 'Estimated Delivery', value: '4–7 business days' },
              { label: 'Shipping Method', value: 'Standard Shipping' },
              { label: 'Payment', value: 'Card on file' },
              { label: 'Status', value: 'Processing' },
            ].map(item => (
              <div key={item.label}>
                <p className="section-label mb-1">{item.label}</p>
                <p className="font-body text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary">Continue Shopping</Link>
          <Link to="/products" className="btn-outline">Explore New Arrivals</Link>
        </div>
      </div>
    </main>
  );
}
