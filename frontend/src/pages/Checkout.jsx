import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { IconLock, IconShield } from '../components/Icons'
import { ShopContext } from '../App'

const NAV_H = 56
const US_STATES = ['Select State', 'Alabama', 'Alaska', 'Arizona', 'California', 'Colorado', 'Florida', 'Georgia', 'Illinois', 'New York', 'Texas', 'Washington']

const inputStyle = { width: '100%', border: '1px solid #e5e7eb', padding: '12px 16px', fontSize: '13px', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box', color: '#111' }
const labelStyle = { display: 'block', fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '8px' }

const Checkout = () => {
  const navigate = useNavigate()
  const { cart, getCartTotal, placeOrder } = useContext(ShopContext)

  // Redirect to cart if empty
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart')
    }
  }, [cart, navigate])

  const [form, setForm] = useState({ email: '', firstName: 'John', lastName: 'Doe', street: '123 Luxe Lane', apt: 'Suite 404', city: 'Metropolis', state: 'Select State', zip: '10001' })
  const [shippingMethod, setShippingMethod] = useState('standard')
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '' })
  const [activePayment, setActivePayment] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState('')

  const handleForm = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.state === 'Select State') {
      toast.error("Please select a valid state.")
      return
    }
    setIsLoading(true)

    const steps = {
      0: [
        "Connecting to secure SSL card network...",
        "Authorizing credit card transaction...",
        "Payment authorized. Creating order..."
      ],
      1: [
        "Connecting to PayPal Sandbox...",
        "Verifying PayPal account balance...",
        "PayPal payment authorized. Creating order..."
      ],
      2: [
        "Initializing Apple Pay session...",
        "Verifying Face ID signature...",
        "Apple Pay authorized. Creating order..."
      ],
      3: [
        "Validating delivery address...",
        "Preparing cash on delivery details...",
        "Finalizing your order..."
      ]
    }[activePayment];

    setPaymentStatus(steps[0]);

    setTimeout(() => {
      setPaymentStatus(steps[1]);
      setTimeout(() => {
        setPaymentStatus(steps[2]);
        setTimeout(() => {
          placeOrder(form, shippingMethod, activePayment)
          setIsLoading(false)
          setPaymentStatus('')
        }, 1000);
      }, 1200);
    }, 1000);
  }

  const subtotal = getCartTotal()
  const shippingCost = shippingMethod === 'express' ? 24 : 0
  const tax = +(subtotal * 0.08).toFixed(2)
  const total = subtotal + shippingCost + tax

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <Navbar />
      <main style={{ paddingTop: `${NAV_H}px` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 32px 80px' }}>

          {/* Breadcrumb steps */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', marginBottom: '40px' }}>
            <Link to="/cart" style={{ color: '#9ca3af', textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Cart</Link>
            <span style={{ color: '#d1d5db' }}>›</span>
            <span style={{ letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, color: '#111', borderBottom: '1px solid #111', paddingBottom: '1px' }}>Information</span>
            <span style={{ color: '#d1d5db' }}>›</span>
            <span style={{ letterSpacing: '0.1em', textTransform: 'uppercase', color: '#d1d5db' }}>Payment</span>
          </nav>

          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '64px', alignItems: 'start' }}>

            {/* LEFT: Form */}
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 700, letterSpacing: '-0.01em', marginBottom: '32px' }}>Delivery Information</h1>

              {/* Contact */}
              <div style={{ marginBottom: '32px' }}>
                <label style={labelStyle}>Contact Email</label>
                <input type="email" value={form.email} onChange={handleForm('email')} required placeholder="Email address" style={inputStyle} onFocus={e => e.target.style.borderColor='#111'} onBlur={e => e.target.style.borderColor='#e5e7eb'} />
              </div>

              {/* Shipping Address */}
              <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '20px' }}>Shipping Address</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={labelStyle}>First Name</label>
                    <input type="text" value={form.firstName} onChange={handleForm('firstName')} required placeholder="John" style={inputStyle} onFocus={e => e.target.style.borderColor='#111'} onBlur={e => e.target.style.borderColor='#e5e7eb'} />
                  </div>
                  <div>
                    <label style={labelStyle}>Last Name</label>
                    <input type="text" value={form.lastName} onChange={handleForm('lastName')} required placeholder="Doe" style={inputStyle} onFocus={e => e.target.style.borderColor='#111'} onBlur={e => e.target.style.borderColor='#e5e7eb'} />
                  </div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>Street Address</label>
                  <input type="text" value={form.street} onChange={handleForm('street')} required placeholder="123 Luxe Lane" style={inputStyle} onFocus={e => e.target.style.borderColor='#111'} onBlur={e => e.target.style.borderColor='#e5e7eb'} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>Apartment, Suite, Etc. (Optional)</label>
                  <input type="text" value={form.apt} onChange={handleForm('apt')} placeholder="Suite 404" style={inputStyle} onFocus={e => e.target.style.borderColor='#111'} onBlur={e => e.target.style.borderColor='#e5e7eb'} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={labelStyle}>City</label>
                    <input type="text" value={form.city} onChange={handleForm('city')} required placeholder="Metropolis" style={inputStyle} onFocus={e => e.target.style.borderColor='#111'} onBlur={e => e.target.style.borderColor='#e5e7eb'} />
                  </div>
                  <div>
                    <label style={labelStyle}>State</label>
                    <select value={form.state} onChange={handleForm('state')} style={{ ...inputStyle, color: form.state === 'Select State' ? '#9ca3af' : '#111', cursor: 'pointer' }}>
                      {US_STATES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Zip Code</label>
                    <input type="text" value={form.zip} onChange={handleForm('zip')} required placeholder="10001" style={inputStyle} onFocus={e => e.target.style.borderColor='#111'} onBlur={e => e.target.style.borderColor='#e5e7eb'} />
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div>
                <h2 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '20px' }}>Shipping Method</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { id: 'standard', label: 'Standard Delivery', sub: '3–5 business days', price: 'Free' },
                    { id: 'express', label: 'Express Shipping', sub: '1–2 business days', price: '$24.00' },
                  ].map((opt) => (
                    <label key={opt.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', border: `1px solid ${shippingMethod === opt.id ? '#111' : '#e5e7eb'}`, background: shippingMethod === opt.id ? '#fafafa' : '#fff', cursor: 'pointer' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <input type="radio" name="shipping" value={opt.id} checked={shippingMethod === opt.id} onChange={() => setShippingMethod(opt.id)} style={{ accentColor: '#111', width: '16px', height: '16px' }} />
                        <div>
                          <p style={{ fontSize: '13px', fontWeight: 500, marginBottom: '2px' }}>{opt.label}</p>
                          <p style={{ fontSize: '11px', color: '#9ca3af' }}>{opt.sub}</p>
                        </div>
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: 600 }}>{opt.price}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: Order Summary */}
            <div style={{ border: '1px solid #e5e7eb', padding: '28px', position: 'sticky', top: `${NAV_H + 24}px` }}>
              <h2 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '24px' }}>Order Summary</h2>

              {/* Items */}
              <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #f3f4f6', maxHeight: '240px', overflowY: 'auto' }}>
                {cart.map((item) => (
                  <div key={item.id} style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ width: '56px', height: '56px', flexShrink: 0, background: '#f9fafb', overflow: 'hidden', border: '1px solid #f3f4f6' }}>
                      <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '12px', fontWeight: 600, lineHeight: 1.3, marginBottom: '2px' }}>{item.name}</p>
                      <p style={{ fontSize: '11px', color: '#9ca3af' }}>{item.variant} (x{item.qty})</p>
                    </div>
                    <p style={{ fontSize: '12px', fontWeight: 600, flexShrink: 0 }}>${(Number(item.price) * item.qty).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div style={{ marginBottom: '24px' }}>
                {[['Subtotal', `$${subtotal.toFixed(2)}`], ['Shipping', shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`], ['Taxes (Estimated)', `$${tax.toFixed(2)}`]].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>{k}</span>
                    <span style={{ fontSize: '12px', fontWeight: 500, color: '#111' }}>{v}</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700 }}>Total</span>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '11px', color: '#9ca3af', marginRight: '4px' }}>USD</span>
                  <span style={{ fontSize: '22px', fontWeight: 800 }}>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Method */}
              <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '12px' }}>Payment Method</p>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '16px' }}>
                {['Card', 'PayPal', 'Apple Pay', 'COD'].map((text, i) => (
                  <button key={i} type="button" onClick={() => setActivePayment(i)} style={{ height: '40px', border: `1px solid ${activePayment === i ? '#111' : '#e5e7eb'}`, background: activePayment === i ? '#fafafa' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.15s', fontSize: '12px', fontWeight: 600, color: activePayment === i ? '#111' : '#6b7280', fontFamily: 'inherit', letterSpacing: '0.02em' }}>{text}</button>
                ))}
              </div>

              {/* Card fields */}
              {activePayment === 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <input type="text" value={card.number} onChange={(e) => setCard((p) => ({ ...p, number: e.target.value }))} required placeholder="Card number" style={{ ...inputStyle, marginBottom: '10px' }} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <input type="text" value={card.expiry} onChange={(e) => setCard((p) => ({ ...p, expiry: e.target.value }))} required placeholder="MM / YY" style={inputStyle} />
                    <input type="text" value={card.cvv} onChange={(e) => setCard((p) => ({ ...p, cvv: e.target.value }))} required placeholder="CVV" style={inputStyle} />
                  </div>
                </div>
              )}

              {activePayment !== 0 && activePayment !== 3 && (
                <div style={{ marginBottom: '20px', padding: '16px', background: '#fafafa', border: '1px solid #e5e7eb', fontSize: '12px', color: '#6b7280', textAlign: 'center' }}>
                  Will redirect to authenticate payment upon clicking checkout.
                </div>
              )}

              {activePayment === 3 && (
                <div style={{ marginBottom: '20px', padding: '16px', background: '#fafafa', border: '1px solid #e5e7eb', fontSize: '12px', color: '#6b7280', textAlign: 'center' }}>
                  Pay with cash upon delivery of your order.
                </div>
              )}

              <button type="submit" disabled={isLoading} style={{ width: '100%', background: '#1e3a5f', color: '#fff', padding: '15px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.7 : 1, fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxSizing: 'border-box' }}>
                <IconLock size={14} strokeWidth={2} />
                {isLoading ? 'Processing Order...' : `Place Order · $${total.toFixed(2)}`}
              </button>
              <p style={{ textAlign: 'center', fontSize: '10px', color: '#9ca3af', marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <IconShield />
                Secure SSL Encrypted Checkout
              </p>
            </div>
          </form>
        </div>
      </main>
      <Footer variant="checkout" />
      {isLoading && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(0,0,0,0.85)', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', color: '#fff',
          backdropFilter: 'blur(4px)', fontFamily: 'Inter, sans-serif'
        }}>
          <div style={{
            width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)',
            borderTop: '3px solid #fff', borderRadius: '50%',
            animation: 'spin 1s linear infinite', marginBottom: '24px'
          }} />
          <p style={{
            fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase',
            fontWeight: 600, color: '#fff', marginBottom: '8px'
          }}>
            {activePayment === 3 ? 'Processing Order' : 'Processing Payment'}
          </p>
          <p style={{ fontSize: '13px', color: '#a1a1aa', letterSpacing: '0.02em' }}>{paymentStatus}</p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}
    </div>
  )
}

export default Checkout
