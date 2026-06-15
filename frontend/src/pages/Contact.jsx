import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { IconArrowRight, IconMapPin } from '../components/Icons'

const NAV_H = 56

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Connect to backend API (e.g., axios.post('/api/contact'))
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Message sent successfully!")
    }, 1000)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      <Navbar />
      <main style={{ paddingTop: `${NAV_H}px` }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '64px 32px 100px' }}>
          
          <div style={{ marginBottom: '48px' }}>
            <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '12px' }}>INQUIRY</p>
            <h1 style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '16px' }}>Let's connect</h1>
            <p style={{ fontSize: '13px', color: '#6b7280', maxWidth: '480px', lineHeight: 1.6 }}>Our team is here to assist with product inquiries, shipping updates, or any other questions you may have. Expect a response within 24 business hours.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px' }}>
            {/* Form */}
            <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '40px', border: '1px solid #e5e7eb' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '10px', fontWeight: 600, letterSpacing: '0.05em', color: '#111', marginBottom: '8px' }}>Full Name</label>
                  <input type="text" placeholder="Elias Thorne" style={{ width: '100%', border: 'none', borderBottom: '1px solid #e5e7eb', padding: '8px 0', fontSize: '13px', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }} onFocus={e => e.target.style.borderColor='#111'} onBlur={e => e.target.style.borderColor='#e5e7eb'} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '10px', fontWeight: 600, letterSpacing: '0.05em', color: '#111', marginBottom: '8px' }}>Email Address</label>
                  <input type="email" placeholder="elias@example.com" style={{ width: '100%', border: 'none', borderBottom: '1px solid #e5e7eb', padding: '8px 0', fontSize: '13px', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }} onFocus={e => e.target.style.borderColor='#111'} onBlur={e => e.target.style.borderColor='#e5e7eb'} />
                </div>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: 600, letterSpacing: '0.05em', color: '#111', marginBottom: '8px' }}>Subject</label>
                <select style={{ width: '100%', border: 'none', borderBottom: '1px solid #e5e7eb', padding: '8px 0', fontSize: '13px', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', color: '#111', cursor: 'pointer', appearance: 'none', background: 'transparent' }}>
                  <option>General Inquiry</option>
                  <option>Order Status</option>
                  <option>Returns & Exchanges</option>
                </select>
              </div>
              <div style={{ marginBottom: '40px' }}>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: 600, letterSpacing: '0.05em', color: '#111', marginBottom: '8px' }}>Message</label>
                <textarea placeholder="How can we help you?" rows="4" style={{ width: '100%', border: 'none', borderBottom: '1px solid #e5e7eb', padding: '8px 0', fontSize: '13px', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', resize: 'none' }} onFocus={e => e.target.style.borderColor='#111'} onBlur={e => e.target.style.borderColor='#e5e7eb'}></textarea>
              </div>
              <button type="submit" disabled={isLoading} style={{ background: '#000', color: '#fff', padding: '14px 28px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.7 : 1, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {isLoading ? 'Sending...' : 'Send Inquiry'} <IconArrowRight />
              </button>
            </form>

            {/* Info */}
            <div>
              <div style={{ width: '100%', height: '240px', background: '#e5e7eb', marginBottom: '32px' }}>
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Studio" />
              </div>
              
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <IconMapPin />
                  Our Studio
                </h3>
                <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.6 }}>742 Editorial Avenue, Suite 100<br/>Design District, NY 10013<br/>United States</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                <div>
                  <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.05em', color: '#111', marginBottom: '4px' }}>Customer Support</p>
                  <a href="mailto:support@luxe.com" style={{ fontSize: '12px', color: '#6b7280', textDecoration: 'underline' }}>support@luxe.com</a>
                </div>
                <div>
                  <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.05em', color: '#111', marginBottom: '4px' }}>Phone</p>
                  <p style={{ fontSize: '12px', color: '#6b7280' }}>+1 (212) 555-0198</p>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '24px' }}>
                <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.05em', color: '#111', marginBottom: '12px' }}>Availability</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>
                  <span>Mon — Fri</span><span>09:00 — 18:00 EST</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6b7280' }}>
                  <span>Saturday</span><span>10:00 — 14:00 EST</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '64px', width: '100%', height: '300px', background: '#d1d5db', position: 'relative', overflow: 'hidden' }}>
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1000&q=80&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) brightness(0.8)' }} alt="Map" />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#fff', padding: '10px 16px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#111' }}></span>
              NYC HEADQUARTERS
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Contact
