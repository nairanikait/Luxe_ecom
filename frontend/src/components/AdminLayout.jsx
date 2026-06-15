import React, { useState, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IconSearch } from './Icons'
import { ShopContext } from '../App'

const AdminLayout = ({ children }) => {
  const location = useLocation()
  const path = location.pathname
  const { logout } = useContext(ShopContext)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const navItems = [
    { label: 'Add Items', path: '/admin/add', icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg> },
    { label: 'List Items', path: '/admin/products', icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg> },
    { label: 'Orders', path: '/admin/orders', icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg> },
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f4f5f7', fontFamily: 'inherit' }}>
      {/* Sidebar */}
      <aside style={{ width: '260px', background: '#f9fafb', borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '24px', flex: 1 }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {navItems.map(item => {
              const active = path === item.path
              return (
                <Link key={item.path} to={item.path} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '4px', background: active ? '#f3f4f6' : 'transparent', color: active ? '#111' : '#6b7280', textDecoration: 'none', fontSize: '13px', fontWeight: active ? 600 : 500, borderLeft: active ? '3px solid #111' : '3px solid transparent' }}>
                  {item.icon}
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Topbar */}
        <header style={{ height: '64px', background: '#fff', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>LUXE</h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ position: 'relative' }}>
              <IconSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} size={16} />
              <input type="text" placeholder="Search..." style={{ background: '#f3f4f6', border: 'none', borderRadius: '4px', padding: '8px 16px 8px 36px', fontSize: '13px', outline: 'none', width: '240px', fontFamily: 'inherit' }} />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#6b7280', position: 'relative' }}>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              </button>
              {dropdownOpen && (
                <div style={{ 
                  position: 'absolute', right: 0, top: '100%', marginTop: '8px', 
                  background: '#fff', border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', 
                  zIndex: 200, width: '120px', padding: '4px 0' 
                }}>
                  <button 
                    onClick={logout}
                    style={{ 
                      width: '100%', padding: '10px 16px', background: 'none', border: 'none', 
                      textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#ef4444', 
                      cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.05em', textTransform: 'uppercase' 
                    }}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Wrapper */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
