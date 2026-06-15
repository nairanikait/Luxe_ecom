import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ShopContext } from '../App'

const NAV_H = 56

const Cart = () => {
  const { cart, updateCartQuantity, removeFromCart, getCartTotal } = useContext(ShopContext)

  const subtotal = getCartTotal()
  const shipping = subtotal > 0 ? 15 : 0
  const total = subtotal + shipping

  if (cart.length === 0) {
    return (
      <div style={{ minHeight: '100vh', background: '#fff' }}>
        <Navbar />
        <main style={{ paddingTop: `${NAV_H}px`, minHeight: `calc(100vh - ${NAV_H}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 700, letterSpacing: '-0.01em', marginBottom: '12px' }}>Your shopping bag is empty</h1>
            <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '32px' }}>Choose from our collection of high-quality essentials.</p>
            <Link to="/collection" style={{ background: '#111', color: '#fff', padding: '14px 28px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block' }}>Shop Collection</Link>
          </div>
        </main>
        <Footer variant="cart" />
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <Navbar />
      <main style={{ paddingTop: `${NAV_H}px`, minHeight: `calc(100vh - ${NAV_H}px)` }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '56px 32px 80px' }}>

          {/* Page title */}
          <h1 style={{ fontSize: '32px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '6px' }}>Shopping Bag</h1>
          <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '48px' }}>Review your selected items before checkout.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '48px', alignItems: 'start' }}>

            {/* Cart Items */}
            <div>
              {cart.map((item, idx) => (
                <div key={item.id} style={{ display: 'flex', gap: '20px', padding: '28px 0', borderBottom: idx < cart.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                  {/* Image */}
                  <div style={{ width: '96px', height: '96px', flexShrink: 0, background: '#f9fafb', overflow: 'hidden' }}>
                    <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>

                  {/* Details */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    {/* Top row */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
                      <div>
                        {item.tag && (
                          <span style={{ display: 'inline-block', fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', background: item.tagColor || '#111', color: '#fff', padding: '3px 8px', marginBottom: '8px' }}>{item.tag}</span>
                        )}
                        <p style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{item.name}</p>
                        <p style={{ fontSize: '12px', color: '#9ca3af' }}>{item.variant}</p>
                      </div>
                      <p style={{ fontSize: '14px', fontWeight: 600, flexShrink: 0 }}>${Number(item.price).toFixed(2)}</p>
                    </div>

                    {/* Bottom row: qty + remove */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e7eb' }}>
                        <button onClick={() => updateCartQuantity(item.id, item.qty - 1)} style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#6b7280', fontFamily: 'inherit' }}>−</button>
                        <span style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 500, borderLeft: '1px solid #e5e7eb', borderRight: '1px solid #e5e7eb' }}>{item.qty}</span>
                        <button onClick={() => updateCartQuantity(item.id, item.qty + 1)} style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#6b7280', fontFamily: 'inherit' }}>+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#ef4444', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                        <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Sidebar */}
            <div style={{ border: '1px solid #e5e7eb', padding: '28px', position: 'sticky', top: `${NAV_H + 24}px` }}>
              <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '24px' }}>Cart Total</h2>

              <div style={{ marginBottom: '20px' }}>
                {[['Subtotal', `$${subtotal.toFixed(2)}`], ['Shipping', `$${shipping.toFixed(2)}`], ['Estimated Tax', `$${(subtotal * 0.08).toFixed(2)}`]].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '13px', color: '#6b7280' }}>{k}</span>
                    <span style={{ fontSize: '13px', fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <span style={{ fontSize: '14px', fontWeight: 700 }}>Total</span>
                <span style={{ fontSize: '22px', fontWeight: 800 }}>${(total + subtotal * 0.08).toFixed(2)}</span>
              </div>

              <Link to="/checkout" style={{ display: 'block', width: '100%', background: '#1e3a5f', color: '#fff', textAlign: 'center', padding: '14px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', marginBottom: '10px', boxSizing: 'border-box' }}>Proceed to Checkout</Link>
              <Link to="/collection" style={{ display: 'block', width: '100%', border: '1px solid #d1d5db', color: '#111', textAlign: 'center', padding: '13px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', boxSizing: 'border-box' }}>Continue Shopping</Link>

            </div>
          </div>
        </div>
      </main>
      <Footer variant="cart" />
    </div>
  )
}

export default Cart
