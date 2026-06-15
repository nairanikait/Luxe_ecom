import React, { useState, useContext } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ShopContext } from '../App'

const NAV_H = 56

const Orders = () => {
  const { orders } = useContext(ShopContext)
  const [activeTab, setActiveTab] = useState('All Orders')
  const tabs = ['All Orders', 'Processing', 'Shipped', 'Delivered']

  const filteredOrders = orders.filter((o) => {
    if (activeTab === 'All Orders') return true
    return o.status.toLowerCase() === activeTab.toLowerCase()
  })

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      <Navbar />
      <main style={{ paddingTop: `${NAV_H}px` }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '64px 32px 100px' }}>
          
          <h1 style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.01em', marginBottom: '8px' }}>My Orders</h1>
          <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '40px' }}>Manage and track your recent purchases.</p>

          <div style={{ display: 'flex', gap: '24px', borderBottom: '1px solid #e5e7eb', marginBottom: '32px' }}>
            {tabs.map(t => (
              <button key={t} onClick={() => setActiveTab(t)} style={{ background: 'none', border: 'none', borderBottom: activeTab === t ? '2px solid #111' : '2px solid transparent', padding: '0 0 12px', fontSize: '12px', fontWeight: activeTab === t ? 600 : 400, color: activeTab === t ? '#111' : '#6b7280', cursor: 'pointer', fontFamily: 'inherit' }}>
                {t}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredOrders.length === 0 ? (
              <div style={{ background: '#fff', border: '1px solid #e5e7eb', padding: '48px', textAlign: 'center', color: '#6b7280', fontSize: '13px' }}>
                No orders found under "{activeTab}".
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div key={order.id} style={{ display: 'flex', alignItems: 'center', padding: '24px', background: '#fff', border: '1px solid #e5e7eb', gap: '32px' }}>
                  <div style={{ width: '120px', height: '120px', background: '#f3f4f6', flexShrink: 0, overflow: 'hidden' }}>
                    <img src={order.img} alt={order.itemsText?.[0]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  
                  <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.2fr 1.5fr 1fr', gap: '20px' }}>
                    <div>
                      <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '4px' }}>Order Number</p>
                      <p style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>{order.id}</p>
                      <p style={{ fontSize: '12px', color: '#6b7280' }}>{order.date}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '4px' }}>Products</p>
                      <div style={{ maxHeight: '72px', overflowY: 'auto' }}>
                        {order.itemsText.map((line, i) => (
                          <p key={i} style={{ fontSize: '12px', fontWeight: 500, color: '#111', marginBottom: '2px' }}>{line}</p>
                        ))}
                      </div>
                      <p style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px' }}>Total Items: {order.meta.items}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '4px' }}>Status</p>
                      <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: order.statusColor || '#4b5563' }}></span>
                        {order.status}
                      </p>
                      <p style={{ fontSize: '11px', color: '#6b7280' }}>{order.statusSub}</p>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', paddingLeft: '20px', borderLeft: '1px solid #f3f4f6' }}>
                    <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '4px' }}>Total</p>
                    <p style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>{order.total}</p>
                    <button style={{ background: '#000', color: '#fff', padding: '10px 20px', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', border: 'none', cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.05em' }}>Order Details</button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '48px' }}>
            <button style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', color: '#9ca3af' }}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <span style={{ fontSize: '12px', color: '#6b7280' }}>Page 1 of 1</span>
            <button style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', color: '#9ca3af' }}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Orders
