import React, { useState, useContext } from 'react'
import { toast } from 'react-toastify'
import AdminLayout from '../../components/AdminLayout'
import { ShopContext } from '../../App'

const AdminOrders = () => {
  const { orders, updateOrderStatus } = useContext(ShopContext)
  const [isUpdating, setIsUpdating] = useState(false)
  
  const handleUpdateAll = () => {
    setIsUpdating(true)
    setTimeout(() => {
      setIsUpdating(false)
      toast.success("All orders synchronized!")
    }, 1000)
  }


  return (
    <AdminLayout>
      <div style={{ padding: '40px', maxWidth: '1000px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.01em', color: '#111' }}>Order Page</h1>
            <p style={{ fontSize: '13px', color: '#6b7280' }}>Fulfill and manage your incoming customer orders</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={handleUpdateAll} disabled={isUpdating} style={{ background: '#000', color: '#fff', padding: '10px 16px', fontSize: '12px', fontWeight: 600, border: 'none', borderRadius: '4px', cursor: isUpdating ? 'not-allowed' : 'pointer', opacity: isUpdating ? 0.7 : 1, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ animation: isUpdating ? 'spin 1s linear infinite' : 'none' }}><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.92-10.26l5.58 5.58" /></svg>
              {isUpdating ? 'Updating...' : 'Update All'}
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {orders.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#6b7280', padding: '40px', fontSize: '13px', border: '1px dashed #e5e7eb' }}>No customer orders found.</p>
          ) : (
            orders.map(order => (
              <div key={order.id} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '24px', display: 'grid', gridTemplateColumns: '60px 1fr 200px 160px', gap: '24px' }}>
                
                {/* Icon */}
                <div style={{ width: '60px', height: '60px', background: '#f3f4f6', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>
                </div>

                {/* Items & Address */}
                <div>
                  <div style={{ marginBottom: '24px' }}>
                    {order.itemsText.map((line, i) => (
                      <p key={i} style={{ fontSize: '12px', fontWeight: 600, color: '#111', marginBottom: '4px' }}>{line}</p>
                    ))}
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: '#111', marginBottom: '4px' }}>{order.name}</p>
                    <p style={{ fontSize: '12px', color: '#6b7280', whiteSpace: 'pre-line', lineHeight: 1.6 }}>{order.address}</p>
                  </div>
                </div>

                {/* Meta Info */}
                <div>
                  <p style={{ fontSize: '12px', color: '#4b5563', marginBottom: '8px' }}>Items : {order.meta.items}</p>
                  <p style={{ fontSize: '12px', color: '#4b5563', marginBottom: '8px' }}>Method : <span style={{ fontWeight: 600 }}>{order.meta.method}</span></p>
                  <p style={{ fontSize: '12px', color: '#4b5563', marginBottom: '8px' }}>Payment : <span style={{ fontWeight: 600, color: order.paymentColor }}>{order.meta.payment}</span></p>
                  <p style={{ fontSize: '12px', color: '#4b5563' }}>Date : {order.meta.date}</p>
                </div>

                {/* Price & Status */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <p style={{ fontSize: '18px', fontWeight: 700, color: '#111' }}>{order.total}</p>
                  <div style={{ width: '100%' }}>
                    <label style={{ display: 'block', fontSize: '9px', fontWeight: 700, letterSpacing: '0.05em', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '8px' }}>ORDER STATUS</label>
                    <select value={order.status} onChange={(e) => updateOrderStatus(order.id, e.target.value)} style={{ width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '4px', background: '#f3f4f6', fontSize: '12px', fontWeight: 500, color: '#4b5563', outline: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                      <option>Order Placed</option>
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                    </select>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

        <div style={{ marginTop: '32px', paddingTop: '32px', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>Showing {orders.length} orders</span>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e5e7eb', background: '#fff', borderRadius: '4px', cursor: 'pointer' }}><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg></button>
            <button style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #111', background: '#111', color: '#fff', borderRadius: '4px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>1</button>
            <button style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e5e7eb', background: '#fff', borderRadius: '4px', cursor: 'pointer' }}><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg></button>
          </div>
        </div>

      </div>
    </AdminLayout>
  )
}

export default AdminOrders
