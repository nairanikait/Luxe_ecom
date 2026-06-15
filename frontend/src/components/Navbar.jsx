import React, { useState, useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShopContext } from '../App'

const Navbar = () => {
  const { getCartCount, user, setSearchQuery } = useContext(ShopContext)
  const [searchOpen, setSearchOpen] = useState(false)
  const [localSearch, setLocalSearch] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (localSearch.trim()) {
      setSearchQuery(localSearch.trim())
      navigate('/collection')
      setSearchOpen(false)
      setLocalSearch('')
    }
  }

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/collection' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ]

  const userPath = user ? (user.role === 'admin' ? '/admin/products' : '/dashboard') : '/login'

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: '#fff', borderBottom: '1px solid #f3f4f6',
      height: '56px', display: 'flex', alignItems: 'center',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>

        {/* Logo */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
          <Link to="/" style={{ fontSize: '18px', fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#111', textDecoration: 'none', lineHeight: 1 }}>
            LUXE
          </Link>
        </div>

        {/* Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '36px', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          {navLinks.map(({ label, path }) => (
            <NavLink
              key={label}
              to={path}
              end={path === '/'}
              style={({ isActive }) => ({
                fontSize: '12px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
                color: isActive ? '#111' : '#9ca3af', textDecoration: 'none',
                borderBottom: isActive ? '1px solid #111' : '1px solid transparent',
                paddingBottom: '2px', transition: 'color 0.15s, border-color 0.15s',
              })}
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Right icons */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '20px' }}>
          {/* Search */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <form onSubmit={handleSearch} style={{
              display: 'flex', alignItems: 'center',
              width: searchOpen ? '160px' : '0px',
              opacity: searchOpen ? 1 : 0,
              overflow: 'hidden',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}>
              <input
                autoFocus={searchOpen}
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search..."
                style={{ padding: '4px 0', marginRight: '8px', fontSize: '12px', outline: 'none', border: 'none', borderBottom: '1px solid #111', width: '100%', fontFamily: 'inherit', background: 'transparent' }}
              />
            </form>
            <button type="button" onClick={() => {
              if (searchOpen) {
                if (localSearch.trim()) handleSearch({ preventDefault: () => { } });
                else setSearchOpen(false);
              } else {
                setSearchOpen(true);
              }
            }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: searchOpen ? '#111' : '#6b7280', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, transition: 'color 0.2s' }}
              onMouseOver={e => e.currentTarget.style.color = '#111'}
              onMouseOut={e => e.currentTarget.style.color = searchOpen ? '#111' : '#6b7280'}
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          </div>

          {/* Cart */}
          <Link to="/cart" style={{ position: 'relative', color: '#6b7280', textDecoration: 'none', display: 'flex' }}
            onMouseOver={e => e.currentTarget.style.color = '#111'}
            onMouseOut={e => e.currentTarget.style.color = '#6b7280'}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {getCartCount() > 0 && (
              <span style={{ position: 'absolute', top: '-6px', right: '-6px', width: '16px', height: '16px', background: '#111', color: '#fff', fontSize: '9px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>{getCartCount()}</span>
            )}
          </Link>

          {/* User */}
          <Link to={userPath} style={{ color: '#6b7280', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
            onMouseOver={e => e.currentTarget.style.color = '#111'}
            onMouseOut={e => e.currentTarget.style.color = '#6b7280'}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
            {user && (
              <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{user.name.split(' ')[0]}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
