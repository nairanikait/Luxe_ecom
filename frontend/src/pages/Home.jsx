import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const NAV_H = 56 // navbar height px

const Hero = () => (
  <section style={{
    position: 'relative', width: '100%', height: `calc(100vh - ${NAV_H}px)`,
    minHeight: '600px', background: '#000', overflow: 'hidden', display: 'flex', alignItems: 'center',
  }}>
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: `url('https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&q=90&auto=format&fit=crop')`,
      backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(100%)', opacity: 0.55,
    }} />
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,rgba(0,0,0,0.88) 35%,rgba(0,0,0,0.15))' }} />
    <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1280px', margin: '0 auto', padding: '0 64px' }}>
      <div style={{ maxWidth: '480px' }}>
        <span style={{ display: 'block', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#9ca3af', fontWeight: 500, marginBottom: '24px' }}>Spring Collection 2024</span>
        <h1 style={{ fontSize: '60px', fontWeight: 900, color: '#fff', lineHeight: 1, textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: '24px', margin: '0 0 24px' }}>
          Art of Subtle<br />Precision.
        </h1>
        <p style={{ fontSize: '14px', color: '#d1d5db', lineHeight: 1.7, maxWidth: '380px', margin: '0 0 40px' }}>
          Refine and reimagine your wardrobe. Discover a collection where silence in design commands unwavering quality.
        </p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Link to="/collection" style={{ background: '#fff', color: '#000', padding: '14px 28px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none' }}>Shop Collection</Link>
          <Link to="/collection" style={{ border: '1px solid rgba(255,255,255,0.35)', color: '#fff', padding: '14px 28px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none' }}>Learn More</Link>
        </div>
      </div>
    </div>
  </section>
)

const latestProducts = [
  { id: 1, name: 'Sculpted Canvas Overcoat', tag: 'LIMITED EDITION', subtitle: 'Structured Cotton Blend', price: '$420', img: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80&auto=format&fit=crop' },
  { id: 2, name: 'Mid-Top Kinetic Sneaker', price: '$310', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80&auto=format&fit=crop' },
  { id: 3, name: 'Chronograph No. 4', price: '$295', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80&auto=format&fit=crop' },
]

const LatestArrivals = () => (
  <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 32px' }}>
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '36px' }}>
      <div>
        <h2 style={{ fontSize: '22px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '6px' }}>Latest Arrivals</h2>
        <p style={{ fontSize: '12px', color: '#9ca3af' }}>Curated additions from our latest drop</p>
      </div>
      <Link to="/collection" style={{ fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#6b7280', textDecoration: 'none' }}>View All Items</Link>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px', height: '520px', overflow: 'hidden' }}>
      <Link to="/product/1" style={{ position: 'relative', overflow: 'hidden', background: '#f3f4f6', display: 'block', textDecoration: 'none', height: '520px' }}>
        {latestProducts[0].tag && (
          <span style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 10, background: '#1f2937', color: '#fff', fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 8px' }}>{latestProducts[0].tag}</span>
        )}
        <img src={latestProducts[0].img} alt={latestProducts[0].name} style={{ width: '100%', height: '520px', objectFit: 'cover', filter: 'grayscale(100%)', display: 'block' }} />
        <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
          <p style={{ fontSize: '13px', fontWeight: 600, color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.6)', marginBottom: '2px' }}>{latestProducts[0].name}</p>
          <p style={{ fontSize: '11px', color: '#d1d5db', marginBottom: '4px' }}>{latestProducts[0].subtitle}</p>
          <p style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>{latestProducts[0].price}</p>
        </div>
      </Link>
      <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '12px', height: '520px', overflow: 'hidden' }}>
        {latestProducts.slice(1).map((p) => (
          <Link key={p.id} to={`/product/${p.id}`} style={{ position: 'relative', overflow: 'hidden', background: '#f3f4f6', display: 'block', textDecoration: 'none', height: '254px' }}>
            <img src={p.img} alt={p.name} style={{ width: '100%', height: '254px', objectFit: 'cover', filter: 'grayscale(100%)', display: 'block' }} />
            <div style={{ position: 'absolute', bottom: '16px', left: '16px' }}>
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.6)', marginBottom: '2px' }}>{p.name}</p>
              <p style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>{p.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
)

const Editorial = () => (
  <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: '#f9fafb' }}>
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '72px 80px' }}>
      <span style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#9ca3af', fontWeight: 500, marginBottom: '20px' }}>Editorial Piece</span>
      <h2 style={{ fontSize: '36px', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '20px' }}>The Essential<br />Merino Knit</h2>
      <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.75, maxWidth: '340px', marginBottom: '32px' }}>Our best-selling knitwear, crafted from 100% sustainably sourced Italian merino wool. A testament to simplicity and enduring comfort.</p>
      <div style={{ display: 'flex', gap: '40px', marginBottom: '36px' }}>
        {[{ icon: '♻', label: 'Sustainable' }, { icon: '↗', label: 'Shared', val: '1.2k' }, { icon: '♡', label: 'Favourited', val: '310,00' }].map((s) => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '18px', marginBottom: '4px' }}>{s.icon}</div>
            <p style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</p>
            {s.val && <p style={{ fontSize: '11px', fontWeight: 600, marginTop: '2px' }}>{s.val}</p>}
          </div>
        ))}
      </div>
      <Link to="/product/merino" style={{ alignSelf: 'flex-start', background: '#111', color: '#fff', padding: '13px 28px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none' }}>Shop The Knit</Link>
    </div>
    <div style={{ overflow: 'hidden', minHeight: '480px' }}>
      <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&q=80&auto=format&fit=crop" alt="Merino Knit" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)', display: 'block' }} />
    </div>
  </section>
)

const NewsletterCTA = () => {
  const [email, setEmail] = useState('')
  return (
    <section style={{ padding: '80px 32px', textAlign: 'center', background: '#fff' }}>
      <h2 style={{ fontSize: '22px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: '12px' }}>Join The Circle</h2>
      <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.6, maxWidth: '480px', margin: '0 auto 32px' }}>Subscribe to receive early access to new collections and exclusive editorial content directly to your inbox.</p>
      <form onSubmit={(e) => { e.preventDefault(); setEmail('') }} style={{ display: 'flex', maxWidth: '440px', margin: '0 auto', border: '1px solid #e5e7eb' }}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" style={{ flex: 1, padding: '14px 20px', fontSize: '13px', outline: 'none', border: 'none', fontFamily: 'inherit' }} />
        <button type="submit" style={{ background: '#111', color: '#fff', padding: '0 28px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>Sign Up</button>
      </form>
    </section>
  )
}

const Home = () => (
  <div style={{ minHeight: '100vh' }}>
    <Navbar />
    <main style={{ paddingTop: `${NAV_H}px` }}>
      <Hero />
      <LatestArrivals />
      <Editorial />
      <NewsletterCTA />
    </main>
    <Footer variant="default" />
  </div>
)

export default Home