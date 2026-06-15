import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { IconEye, IconArrowLeft } from '../components/Icons'
import { ShopContext } from '../App'

const Signup = () => {
  const { signup } = useContext(ShopContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      signup(name, email, password)
      setIsLoading(false)
    }, 800)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: '12px' }}>LUXE</h1>
        <p style={{ fontSize: '13px', color: '#6b7280' }}>Create an account to join us.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ background: '#fff', border: '1px solid #e5e7eb', width: '100%', maxWidth: '440px', padding: '40px', boxSizing: 'border-box' }}>
        
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6b7280', marginBottom: '8px' }}>Full Name</label>
          <input type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', border: '1px solid #e5e7eb', padding: '12px 16px', fontSize: '13px', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }} onFocus={e => e.target.style.borderColor='#111'} onBlur={e => e.target.style.borderColor='#e5e7eb'} />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6b7280', marginBottom: '8px' }}>Email Address</label>
          <input type="email" placeholder="name@company.com" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', border: '1px solid #e5e7eb', padding: '12px 16px', fontSize: '13px', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }} onFocus={e => e.target.style.borderColor='#111'} onBlur={e => e.target.style.borderColor='#e5e7eb'} />
        </div>

        <div style={{ marginBottom: '32px' }}>
          <label style={{ display: 'block', fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6b7280', marginBottom: '8px' }}>Password</label>
          <div style={{ position: 'relative' }}>
            <input type={showPass ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', border: '1px solid #e5e7eb', padding: '12px 40px 12px 16px', fontSize: '13px', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }} onFocus={e => e.target.style.borderColor='#111'} onBlur={e => e.target.style.borderColor='#e5e7eb'} />
            <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}>
              <IconEye />
            </button>
          </div>
        </div>

        <button type="submit" disabled={isLoading} style={{ width: '100%', background: '#2e2b6a', color: '#fff', padding: '14px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.7 : 1, fontFamily: 'inherit', marginBottom: '24px' }}>
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>

        <div style={{ textAlign: 'center', borderTop: '1px solid #f3f4f6', paddingTop: '24px' }}>
          <p style={{ fontSize: '12px', color: '#6b7280' }}>Already have an account? <Link to="/login" style={{ color: '#111', fontWeight: 600, textDecoration: 'none' }}>Sign In</Link></p>
        </div>
      </form>

      <div style={{ marginTop: '32px' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#6b7280', textDecoration: 'none' }}>
          <IconArrowLeft />
          Back to shop
        </Link>
      </div>

      <div style={{ position: 'absolute', bottom: '24px' }}>
        <p style={{ fontSize: '10px', color: '#d1d5db', letterSpacing: '0.12em', textTransform: 'uppercase' }}>© 2024 LUXE E-COMMERCE</p>
      </div>
    </div>
  )
}

export default Signup
