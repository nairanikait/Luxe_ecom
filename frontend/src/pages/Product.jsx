import React, { useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ShopContext } from '../App'

const NAV_H = 56

const AccordionItem = ({ title }) => {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderTop: '1px solid #f3f4f6' }}>
      <button onClick={() => setOpen((prev) => !prev)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '16px 0', fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', color: '#111' }}>
        {title}
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}><polyline points="6 9 12 15 18 9" /></svg>
      </button>
      {open && <div style={{ paddingBottom: '16px', fontSize: '12px', color: '#6b7280', lineHeight: 1.7 }}>Details about {title.toLowerCase()} will appear here.</div>}
    </div>
  )
}

const Product = () => {
  const { id } = useParams()
  const { products, addToCart, wishlist, toggleWishlist } = useContext(ShopContext)

  if (products.length === 0) {
    return (
      <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ paddingTop: `${NAV_H}px`, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ fontSize: '12px', letterSpacing: '0.05em', color: '#6b7280', textTransform: 'uppercase' }}>Loading product...</p>
        </main>
        <Footer />
      </div>
    )
  }

  // Find target product or fallback
  const product = products.find(p => String(p.id) === String(id)) || products[0]

  const [activeImg, setActiveImg] = useState(0)
  const [activeColor, setActiveColor] = useState(0)
  const [activeSize, setActiveSize] = useState(product?.sizes?.[0] || 'S')

  if (!product) {
    return (
      <div style={{ minHeight: '100vh', background: '#fff' }}>
        <Navbar />
        <main style={{ paddingTop: '100px', textAlign: 'center' }}>
          <p>Product not found.</p>
          <Link to="/collection">Back to Collection</Link>
        </main>
        <Footer />
      </div>
    )
  }

  // Get related products
  const relatedProducts = products.filter(p => String(p.id) !== String(product?.id)).slice(0, 4)
  const isWishlisted = wishlist.includes(String(product?.id))

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <Navbar />
      <main style={{ paddingTop: `${NAV_H}px` }}>

        {/* Breadcrumb */}
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 32px' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#9ca3af' }}>
            <Link to="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>Home</Link>
            <span>›</span>
            <Link to="/collection" style={{ color: '#9ca3af', textDecoration: 'none' }}>Collection</Link>
            <span>›</span>
            <span style={{ color: '#111' }}>{product.name}</span>
          </nav>
        </div>

        {/* Product layout */}
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '8px 32px 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>

          {/* Images column */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {/* Thumbnails */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flexShrink: 0 }}>
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)} style={{ width: '56px', height: '72px', overflow: 'hidden', border: `2px solid ${activeImg === i ? '#111' : 'transparent'}`, cursor: 'pointer', background: 'none', padding: 0, flexShrink: 0 }}>
                  <img src={img} alt={`View ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </button>
              ))}
            </div>
            {/* Main image */}
            <div style={{ flex: 1, position: 'relative', background: '#f9fafb', minHeight: '560px', overflow: 'hidden' }}>
              <img src={product.images[activeImg] || product.images[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: '560px' }} />
              <button onClick={() => toggleWishlist(product?.id)} style={{ position: 'absolute', top: '16px', right: '16px', width: '36px', height: '36px', borderRadius: '50%', background: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>
                <svg width="16" height="16" fill={isWishlisted ? '#e11d48' : 'none'} stroke={isWishlisted ? '#e11d48' : '#374151'} strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Info column */}
          <div style={{ paddingTop: '8px' }}>
            {product.tag && (
              <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9ca3af' }}>{product.tag}</span>
            )}
            <h1 style={{ fontSize: '28px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.01em', margin: '10px 0 12px' }}>{product.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
              <span style={{ fontSize: '22px', fontWeight: 600 }}>${Number(product.price).toFixed(2)}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ display: 'flex' }}>
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="12" height="12" fill={i < Math.floor(product.rating || 5) ? '#f59e0b' : '#e5e7eb'} viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span style={{ fontSize: '11px', color: '#6b7280' }}>{product.rating || '5.0'} ({product.reviews || '10'} reviews)</span>
              </div>
            </div>

            {/* Color */}
            {product.colors && product.colors.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
                  Color: <span style={{ fontWeight: 400, color: '#6b7280' }}>{product.colors[activeColor]?.label}</span>
                </p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {product.colors.map((c, i) => (
                    <button key={i} onClick={() => setActiveColor(i)} title={c.label} style={{ width: '28px', height: '28px', borderRadius: '50%', background: c.hex, cursor: 'pointer', border: activeColor === i ? '2px solid #111' : '1px solid #e5e7eb', boxShadow: activeColor === i ? '0 0 0 2px #fff, 0 0 0 3.5px #111' : 'none', transition: 'all 0.15s', flexShrink: 0 }} />
                  ))}
                </div>
              </div>
            )}

            {/* Size */}
            {product.sizes && product.sizes.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Size</p>
                  <button style={{ fontSize: '11px', color: '#9ca3af', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Size Guide</button>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {product.sizes.map((s) => (
                    <button key={s} onClick={() => setActiveSize(s)} style={{ padding: '10px 20px', fontSize: '12px', fontWeight: 500, fontFamily: 'inherit', cursor: 'pointer', border: `1px solid ${activeSize === s ? '#111' : '#d1d5db'}`, background: activeSize === s ? '#111' : '#fff', color: activeSize === s ? '#fff' : '#111', transition: 'all 0.15s' }}>{s}</button>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.75, marginBottom: '16px' }}>{product.description}</p>
            {product.details && (
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px' }}>
                {product.details.map((d) => (
                  <li key={d} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#6b7280', marginBottom: '6px' }}>
                    <svg width="14" height="14" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                    {d}
                  </li>
                ))}
              </ul>
            )}

            {/* CTAs */}
            <button 
              onClick={() => addToCart(product?.id, product.colors[activeColor]?.label || 'Default', activeSize, 1)}
              style={{ width: '100%', background: '#1e3a5f', color: '#fff', padding: '16px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', fontFamily: 'inherit', marginBottom: '10px' }}
            >
              Add to Cart
            </button>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button style={{ flex: 1, border: '1px solid #d1d5db', background: '#fff', color: '#111', padding: '14px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}>Pick Up in Store</button>
              <button style={{ width: '46px', height: '46px', border: '1px solid #d1d5db', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
              </button>
            </div>

            {/* Accordions */}
            <div style={{ marginTop: '32px' }}>
              <AccordionItem title="Shipping & Returns" />
              <AccordionItem title="Sustainability" />
            </div>
          </div>
        </div>

        {/* You May Also Like */}
        {relatedProducts.length > 0 && (
          <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '56px', paddingBottom: '20px' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>You May Also Like</h2>
                <Link to="/collection" style={{ fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#6b7280', textDecoration: 'none' }}>View All</Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                {relatedProducts.map((p) => (
                  <Link key={p.id} to={`/product/${p.id}`} style={{ textDecoration: 'none', color: '#111', display: 'block' }}>
                    <div style={{ overflow: 'hidden', background: '#f9fafb', aspectRatio: '3/4', marginBottom: '12px' }}>
                      <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                      />
                    </div>
                    <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{p.name}</p>
                    <p style={{ fontSize: '10px', color: '#9ca3af', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '6px' }}>{p.variant}</p>
                    <p style={{ fontSize: '13px', fontWeight: 600 }}>${Number(p.price).toFixed(2)}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer variant="collection" />
    </div>
  )
}

export default Product
