import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const cols = {
  default: {
    col1Title: 'Shop', col1Links: ['Collection', 'New Arrivals', 'Best Sellers', 'Archive Sale'],
    col2Title: 'Support', col2Links: ['Orders', 'Shipping & Returns', 'Privacy Policy', 'Terms of Service', 'FAQ'],
    brand: 'Crafting enduring essentials for the modern luxury experience since 2016.',
    showSocials: true,
  },
  collection: {
    col1Title: 'Collection', col1Links: ['New Arrivals', 'Outerwear', 'Essentials', 'Accessories'],
    col2Title: 'Support', col2Links: ['Order Status', 'Shipping Policy', 'Privacy Policy', 'FAQ'],
    brand: 'Defining modern elegance through purposeful design and conscious manufacturing.',
    showFollow: false,
  },
  cart: {
    col1Title: 'Shop', col1Links: ['Collection', 'Orders', 'Returns'],
    col2Title: 'Help', col2Links: ['Privacy Policy', 'Terms of Service', 'FAQ'],
    brand: 'Elevating everyday essentials through curated design and uncompromising quality.',
    showFollow: false,
  },
  checkout: {
    col1Title: 'Collection', col1Links: ['New Arrivals', 'Best Sellers', 'Archive'],
    col2Title: 'Support', col2Links: ['Shipping & Returns', 'Terms of Service', 'Privacy Policy'],
    brand: 'Curated essentials for the modern lifestyle. Quality over quantity, always.',
    showFollow: true,
  },
}

const Footer = ({ variant = 'default' }) => {
  const [email, setEmail] = useState('')
  const cfg = cols[variant] || cols.default

  const linkStyle = { display: 'block', fontSize: '12px', color: '#6b7280', textDecoration: 'none', marginBottom: '10px', transition: 'color 0.15s' }

  return (
    <footer style={{ background: '#fff', borderTop: '1px solid #f3f4f6' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.5fr', gap: '40px' }}>

          {/* Brand */}
          <div>
            <p style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px', color: '#111' }}>LUXE</p>
            <p style={{ fontSize: '12px', color: '#9ca3af', lineHeight: 1.75, maxWidth: '220px', marginBottom: '20px' }}>{cfg.brand}</p>
            {cfg.showSocials && (
              <div style={{ display: 'flex', gap: '10px' }}>
                {['IG', 'TW', 'PI'].map((s) => (
                  <a key={s} href="#" style={{ width: '28px', height: '28px', border: '1px solid #e5e7eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 700, color: '#9ca3af', textDecoration: 'none', letterSpacing: '0.05em' }}>{s}</a>
                ))}
              </div>
            )}
          </div>

          {/* Col 1 */}
          <div>
            <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '16px' }}>{cfg.col1Title}</p>
            {cfg.col1Links.map((l) => (
              <Link key={l} to="/collection" style={linkStyle}
                onMouseOver={e => e.currentTarget.style.color = '#111'}
                onMouseOut={e => e.currentTarget.style.color = '#6b7280'}
              >{l}</Link>
            ))}
          </div>

          {/* Col 2 */}
          <div>
            <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '16px' }}>{cfg.col2Title}</p>
            {cfg.col2Links.map((l) => (
              <a key={l} href="#" style={linkStyle}
                onMouseOver={e => e.currentTarget.style.color = '#111'}
                onMouseOut={e => e.currentTarget.style.color = '#6b7280'}
              >{l}</a>
            ))}
            {cfg.showFollow && (
              <div style={{ marginTop: '24px' }}>
                <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '16px' }}>Follow</p>
                {['Instagram', 'Pinterest'].map((s) => (
                  <a key={s} href="#" style={linkStyle}
                    onMouseOver={e => e.currentTarget.style.color = '#111'}
                    onMouseOut={e => e.currentTarget.style.color = '#6b7280'}
                  >{s}</a>
                ))}
              </div>
            )}
          </div>

          {/* Newsletter */}
          <div>
            <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '16px' }}>Newsletter</p>
            <p style={{ fontSize: '12px', color: '#9ca3af', lineHeight: 1.65, marginBottom: '16px' }}>Join our list for exclusive access to launches.</p>
            <form onSubmit={(e) => { e.preventDefault(); setEmail('') }} style={{ display: 'flex', border: '1px solid #e5e7eb' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                style={{ flex: 1, padding: '10px 14px', fontSize: '12px', outline: 'none', border: 'none', fontFamily: 'inherit', minWidth: 0 }}
              />
              <button type="submit" style={{ background: '#111', color: '#fff', padding: '0 16px', fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>Join</button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ borderTop: '1px solid #f3f4f6' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ fontSize: '10px', color: '#d1d5db', letterSpacing: '0.12em', textTransform: 'uppercase' }}>© 2024 LUXE E-Commerce. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
