import React, { useState, useContext } from 'react'
import AdminLayout from '../../components/AdminLayout'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../App'

const AdminProducts = () => {
  const { products, deleteProduct } = useContext(ShopContext)
  const [activeTab, setActiveTab] = useState('All')

  const filteredProducts = products.filter(p => {
    if (activeTab === 'All') return true
    return p.status.toLowerCase() === activeTab.toLowerCase()
  })

  return (
    <AdminLayout>
      <div style={{ padding: '40px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.01em', color: '#111' }}>Product Inventory</h1>
            <p style={{ fontSize: '13px', color: '#6b7280' }}>Manage your catalog, stock levels, and product visibility.</p>
          </div>
          <Link to="/admin/add" style={{ background: '#000', color: '#fff', padding: '10px 16px', fontSize: '12px', fontWeight: 600, border: 'none', borderRadius: '4px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            New Product
          </Link>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px' }}>
          {/* Header & Tabs */}
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#111' }}>Item Catalog</h2>
            <div style={{ display: 'flex', background: '#f3f4f6', padding: '2px', borderRadius: '4px' }}>
              {['All', 'Active', 'Draft'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{ background: activeTab === tab ? '#fff' : 'transparent', color: activeTab === tab ? '#111' : '#6b7280', border: 'none', padding: '6px 16px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', borderRadius: '4px', boxShadow: activeTab === tab ? '0 1px 2px rgba(0,0,0,0.05)' : 'none', transition: 'all 0.2s' }}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            {filteredProducts.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#6b7280', padding: '40px', fontSize: '13px' }}>No products found in this category.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', fontSize: '10px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Thumbnail</th>
                    <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', fontSize: '10px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name</th>
                    <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', fontSize: '10px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Category</th>
                    <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', fontSize: '10px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Price</th>
                    <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', fontSize: '10px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Stock</th>
                    <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', fontSize: '10px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                    <th style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', fontSize: '10px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((p, i) => (
                    <tr key={p.id} style={{ borderBottom: i === filteredProducts.length - 1 ? 'none' : '1px solid #f3f4f6' }}>
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ width: '40px', height: '40px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                          <img src={p.images?.[0] || 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=100&q=80&fit=crop'} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <p style={{ fontSize: '12px', fontWeight: 600, color: '#111', marginBottom: '4px' }}>{p.name}</p>
                        <p style={{ fontSize: '11px', color: '#6b7280' }}>SKU: {p.sku}</p>
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <span style={{ background: '#f3f4f6', color: '#4b5563', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 500 }}>{p.category}</span>
                      </td>
                      <td style={{ padding: '16px 24px', fontSize: '12px', color: '#111' }}>${Number(p.price).toFixed(2)}</td>
                      <td style={{ padding: '16px 24px', fontSize: '12px', fontWeight: p.stock < 10 ? 600 : 400, color: p.stock < 10 ? '#ef4444' : '#111' }}>
                        {p.stock} units
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 600, color: p.status === 'Active' ? '#16a34a' : '#6b7280' }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: p.status === 'Active' ? '#16a34a' : '#6b7280' }}></span>
                          {p.status}
                        </span>
                      </td>
                      <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
                          <Link to={`/admin/edit/${p.id}`} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4b5563', display: 'inline-flex', alignItems: 'center' }}><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg></Link>
                          <button onClick={() => deleteProduct(p.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          
          <div style={{ padding: '16px 24px', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#6b7280' }}>Showing {filteredProducts.length} of {products.length} results</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e5e7eb', background: '#fff', borderRadius: '4px', cursor: 'pointer' }}><svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg></button>
              <button style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #111', background: '#111', color: '#fff', borderRadius: '4px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>1</button>
              <button style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e5e7eb', background: '#fff', borderRadius: '4px', cursor: 'pointer' }}><svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg></button>
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  )
}

export default AdminProducts
