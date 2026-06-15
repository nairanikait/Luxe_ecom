import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { IconPackage, IconArrowRight, IconHeart, IconLock, IconMapPin, IconCreditCard, IconBell } from '../components/Icons'
import { ShopContext } from '../App'

const NAV_H = 56

const Dashboard = () => {
  const navigate = useNavigate()
  const { user, logout, orders, wishlist } = useContext(ShopContext)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  if (!user) return null

  const activeOrdersCount = orders.filter(o => o.status !== 'Delivered').length
  const recentOrders = orders.slice(0, 3)

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      <Navbar />
      <main style={{ paddingTop: `${NAV_H}px` }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '48px 32px 100px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
            <div>
              <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '8px' }}>ACCOUNT DASHBOARD</p>
              <h1 style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.01em' }}>Welcome back, {user.name}</h1>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={logout} style={{ border: '1px solid #e5e7eb', background: '#fff', color: '#111', padding: '10px 20px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Log Out</button>
              <button style={{ background: '#000', color: '#fff', padding: '10px 20px', fontSize: '11px', fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Edit Profile</button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            <div style={{ background: '#fff', border: '1px solid #e5e7eb', padding: '32px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '24px', right: '24px', background: '#dbeafe', color: '#1e40af', padding: '4px 8px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.05em' }}>{activeOrdersCount} ACTIVE</div>
              <IconPackage size={24} style={{ marginBottom: '20px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>My Orders</h3>
              <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '24px' }}>Track, return, or buy things again.</p>
              <a href="/orders" style={{ fontSize: '12px', fontWeight: 600, color: '#111', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>View Order History <IconArrowRight /></a>
            </div>

            <div style={{ background: '#fff', border: '1px solid #e5e7eb', padding: '32px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '24px', right: '24px', background: '#f3f4f6', color: '#374151', padding: '4px 8px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.05em' }}>{wishlist.length} ITEMS</div>
              <IconHeart size={24} style={{ marginBottom: '20px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Wishlist</h3>
              <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '24px' }}>Keep track of items you love.</p>
              <a href="/collection" style={{ fontSize: '12px', fontWeight: 600, color: '#111', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>Explore Favorites <IconArrowRight /></a>
            </div>
          </div>

          <div style={{ background: '#fff', border: '1px solid #e5e7eb', padding: '32px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Recent Orders</h3>
              <a href="/orders" style={{ fontSize: '12px', color: '#6b7280', textDecoration: 'underline' }}>View all orders</a>
            </div>
            {recentOrders.length === 0 ? (
              <p style={{ fontSize: '13px', color: '#6b7280', textAlign: 'center', padding: '24px' }}>You haven't placed any orders yet.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr>
                    <th style={{ paddingBottom: '16px', borderBottom: '1px solid #f3f4f6', fontSize: '11px', fontWeight: 600, color: '#111' }}>Order ID</th>
                    <th style={{ paddingBottom: '16px', borderBottom: '1px solid #f3f4f6', fontSize: '11px', fontWeight: 600, color: '#111' }}>Date</th>
                    <th style={{ paddingBottom: '16px', borderBottom: '1px solid #f3f4f6', fontSize: '11px', fontWeight: 600, color: '#111' }}>Status</th>
                    <th style={{ paddingBottom: '16px', borderBottom: '1px solid #f3f4f6', fontSize: '11px', fontWeight: 600, color: '#111' }}>Total</th>
                    <th style={{ paddingBottom: '16px', borderBottom: '1px solid #f3f4f6', fontSize: '11px', fontWeight: 600, color: '#111', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(o => (
                    <tr key={o.id}>
                      <td style={{ padding: '20px 0', borderBottom: '1px solid #f3f4f6', fontSize: '12px', color: '#6b7280' }}>{o.id}</td>
                      <td style={{ padding: '20px 0', borderBottom: '1px solid #f3f4f6', fontSize: '12px', color: '#6b7280' }}>{o.date}</td>
                      <td style={{ padding: '20px 0', borderBottom: '1px solid #f3f4f6' }}>
                        <span style={{ 
                          background: o.status === 'Delivered' ? '#dcfce7' : o.status === 'Shipped' ? '#dbeafe' : o.status === 'Processing' ? '#fef3c7' : '#f3f4f6', 
                          color: o.status === 'Delivered' ? '#166534' : o.status === 'Shipped' ? '#1e40af' : o.status === 'Processing' ? '#b45309' : '#374151', 
                          padding: '4px 8px', fontSize: '9px', fontWeight: 700, letterSpacing: '0.05em' 
                        }}>
                          {o.status.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: '20px 0', borderBottom: '1px solid #f3f4f6', fontSize: '12px', color: '#6b7280' }}>{o.total}</td>
                      <td style={{ padding: '20px 0', borderBottom: '1px solid #f3f4f6', textAlign: 'right' }}>
                        <a href="/orders" style={{ fontSize: '12px', color: '#111', textDecoration: 'none' }}>Track</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div style={{ background: '#fff', border: '1px solid #e5e7eb', padding: '32px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '24px' }}>Account Settings</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
              {[
                { icon: <IconLock />, title: 'Password & Security', desc: 'Update your password and secure your account.' },
                { icon: <IconMapPin />, title: 'Address Book', desc: 'Manage your shipping and billing addresses.' },
                { icon: <IconCreditCard />, title: 'Payment Methods', desc: 'Securely save your cards for faster checkout.' },
                { icon: <IconBell />, title: 'Notifications', desc: 'Manage email preferences and alerts.' },
              ].map(s => (
                <div key={s.title}>
                  <div style={{ marginBottom: '12px' }}>{s.icon}</div>
                  <h4 style={{ fontSize: '11px', fontWeight: 700, marginBottom: '6px' }}>{s.title}</h4>
                  <p style={{ fontSize: '11px', color: '#6b7280', lineHeight: 1.5 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Dashboard
