import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getProductById, products, buildWhatsAppMessage } from '../data/products'
import WhatsAppButton from '../components/WhatsAppButton'
import ProductCard from '../components/ProductCard'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProductById(id)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(null)
  const [sizeError, setSizeError] = useState(false)

  useEffect(() => {
    setSelectedImage(0)
    setSelectedSize(null)
    setSizeError(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-20">
        <p className="display-title text-2xl text-stone-400">Product not found</p>
        <Link to="/products" className="btn-outline">Back to Collection</Link>
      </div>
    )
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleSizeSelect = (size) => {
    setSelectedSize(size)
    setSizeError(false)
  }

  const handleWhatsAppClick = () => {
    if (!selectedSize) {
      setSizeError(true)
      document.getElementById('size-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    const url = buildWhatsAppMessage(product, selectedSize)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <main className="pt-16 lg:pt-20">
      {/* Breadcrumb */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-4 flex items-center gap-2 font-mono text-[10px] text-stone-400 tracking-widest uppercase">
        <Link to="/" className="hover:text-stone-700 transition-colors">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-stone-700 transition-colors">Collection</Link>
        <span>/</span>
        <Link to={`/category/${product.category}`} className="hover:text-stone-700 transition-colors capitalize">{product.category}</Link>
        <span>/</span>
        <span className="text-stone-700">{product.name}</span>
      </div>

      {/* Product Layout */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 pb-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Gallery */}
          <div className="space-y-3">
            {/* Main Image */}
            <div className="overflow-hidden bg-stone-100 aspect-[3/4] relative">
              <img
                key={selectedImage}
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover animate-fade-in"
              />
              {product.tag && (
                <span className="absolute top-4 left-4 font-mono text-[10px] tracking-widest uppercase bg-stone-900 text-stone-50 px-3 py-1.5">
                  {product.tag}
                </span>
              )}
              {/* Arrow navigation */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage(i => Math.max(0, i - 1))}
                    disabled={selectedImage === 0}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-stone-50/80 backdrop-blur flex items-center justify-center hover:bg-stone-50 transition-colors disabled:opacity-30"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => setSelectedImage(i => Math.min(product.images.length - 1, i + 1))}
                    disabled={selectedImage === product.images.length - 1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-stone-50/80 backdrop-blur flex items-center justify-center hover:bg-stone-50 transition-colors disabled:opacity-30"
                  >
                    →
                  </button>
                </>
              )}
            </div>
            {/* Thumbnails */}
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`overflow-hidden w-20 aspect-square transition-all duration-200 ${
                    selectedImage === i
                      ? 'ring-2 ring-stone-900 ring-offset-1'
                      : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:pt-4 flex flex-col">
            <div className="flex-1">
              {/* Category */}
              <p className="section-label mb-3 capitalize">{product.category}</p>

              {/* Name */}
              <h1 className="display-title text-4xl lg:text-5xl text-stone-900 mb-2">{product.name}</h1>

              {/* Price */}
              <p className="font-display text-3xl text-stone-900 font-light mt-4 mb-8">
                {product.price.toLocaleString()}
                <span className="font-mono text-sm text-stone-400 ml-1">{product.currency}</span>
              </p>

              {/* Divider */}
              <div className="h-px bg-stone-200 mb-8" />

              {/* Size Selection */}
              <div id="size-section">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-mono text-[11px] tracking-widest uppercase text-stone-600">Select Size</p>
                  <button className="font-mono text-[10px] tracking-widest uppercase text-stone-400 underline hover:text-stone-700 transition-colors">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => handleSizeSelect(size)}
                      className={`min-w-[52px] py-3 font-mono text-xs tracking-widest border transition-all duration-200 ${
                        selectedSize === size
                          ? 'bg-stone-900 text-stone-50 border-stone-900'
                          : sizeError
                          ? 'border-red-300 text-stone-700 hover:border-stone-900'
                          : 'border-stone-300 text-stone-700 hover:border-stone-900'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {sizeError && (
                  <p className="text-red-500 font-mono text-[10px] tracking-widest mt-2">
                    Please select a size to continue
                  </p>
                )}
              </div>

              {/* CTA */}
              <div className="mt-8 space-y-3">
                <WhatsAppButton
                  product={product}
                  selectedSize={selectedSize}
                  className="w-full"
                  large
                />
                <p className="text-center font-mono text-[10px] text-stone-400 tracking-widest">
                  Fast reply · Secure payment · Free delivery
                </p>
              </div>

              {/* Description */}
              <div className="mt-10 space-y-6">
                <div>
                  <h3 className="font-mono text-[11px] tracking-widest uppercase text-stone-600 mb-3">Description</h3>
                  <p className="font-body text-stone-600 font-light leading-relaxed text-sm">{product.description}</p>
                </div>
                <div className="h-px bg-stone-200" />
                <div>
                  <h3 className="font-mono text-[11px] tracking-widest uppercase text-stone-600 mb-3">Care</h3>
                  <p className="font-body text-stone-600 font-light text-sm">{product.care}</p>
                </div>
              </div>
            </div>

            {/* Share */}
            <div className="mt-10 pt-6 border-t border-stone-200 flex items-center gap-4">
              <p className="font-mono text-[10px] text-stone-400 tracking-widest uppercase">Share</p>
              <a
                href={`https://wa.me/?text=Check out ${product.name} on Maison: ${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] text-stone-600 hover:text-whatsapp transition-colors tracking-widest uppercase"
              >
                WhatsApp
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] text-stone-600 hover:text-stone-900 transition-colors tracking-widest uppercase"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20 lg:mt-28">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="section-label mb-2">You May Also Like</p>
                <h2 className="display-title text-3xl text-stone-900">Related Pieces</h2>
              </div>
              <Link
                to={`/category/${product.category}`}
                className="text-xs tracking-widest uppercase font-body font-medium text-stone-500 hover:text-stone-900 transition-colors hidden sm:flex items-center gap-2"
              >
                View Category →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
