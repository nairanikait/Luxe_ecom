import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { IconEye } from '../../components/Icons'
import { ShopContext } from '../../App'

const AdminLogin = () => {
  const { login } = useContext(ShopContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    await login(username, password)
    setIsLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f4f5f7', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '440px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px', color: '#111' }}>Admin Portal</h1>
          <p style={{ fontSize: '13px', color: '#6b7280' }}>Secure access for the LUXE ADMIN ecosystem.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ background: '#fff', border: '1px solid #e5e7eb', padding: '40px', borderRadius: '4px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#111', marginBottom: '8px' }}>Username</label>
            <div style={{ position: 'relative' }}>
              <svg width="14" height="14" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              <input type="text" placeholder="e.g. admin_standard" value={username} onChange={e => setUsername(e.target.value)} style={{ width: '100%', border: '1px solid #e5e7eb', padding: '12px 12px 12px 36px', fontSize: '13px', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', borderRadius: '4px' }} onFocus={e => e.target.style.borderColor = '#111'} onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '11px', fontWeight: 600, color: '#111' }}>Password</label>
              <Link to="#" style={{ fontSize: '11px', color: '#111', fontWeight: 600, textDecoration: 'none' }}>Forgot?</Link>
            </div>
            <div style={{ position: 'relative' }}>
              <svg width="14" height="14" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              <input type={showPass ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', border: '1px solid #e5e7eb', padding: '12px 40px 12px 36px', fontSize: '13px', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', borderRadius: '4px' }} onFocus={e => e.target.style.borderColor = '#111'} onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}>
                <IconEye size={14} />
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
            <input type="checkbox" id="keep" style={{ accentColor: '#111', width: '14px', height: '14px', marginRight: '8px', cursor: 'pointer' }} />
            <label htmlFor="keep" style={{ fontSize: '12px', color: '#4b5563', cursor: 'pointer' }}>Keep me signed in for 30 days</label>
          </div>

          <button type="submit" disabled={isLoading} style={{ width: '100%', background: '#2e2b6a', color: '#fff', padding: '14px', fontSize: '12px', fontWeight: 600, border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.7 : 1, fontFamily: 'inherit', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
            {isLoading ? 'Processing...' : 'Sign In'}
            {!isLoading && <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <p style={{ fontSize: '12px', color: '#4b5563', marginBottom: '16px' }}>Need help? Contact <span style={{ color: '#111', fontWeight: 600 }}>Support Center</span></p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', color: '#9ca3af' }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AdminLogin
