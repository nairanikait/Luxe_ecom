import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const NotFound = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <Navbar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '80px', fontWeight: 900, letterSpacing: '-0.02em', color: '#111', marginBottom: '16px', lineHeight: 1 }}>404</h1>
        <h2 style={{ fontSize: '16px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b7280', marginBottom: '32px' }}>Page Not Found</h2>
        <p style={{ fontSize: '13px', color: '#9ca3af', maxWidth: '400px', marginBottom: '40px', lineHeight: 1.6 }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" style={{ background: '#111', color: '#fff', padding: '14px 32px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none' }}>
          Return to Home
        </Link>
      </main>
      <Footer />
    </div>
  )
}

export default NotFound
