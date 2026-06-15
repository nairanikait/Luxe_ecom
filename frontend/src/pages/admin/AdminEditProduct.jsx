import React, { useState, useContext, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AdminLayout from '../../components/AdminLayout'
import { ShopContext } from '../../App'

const AdminEditProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, updateProduct } = useContext(ShopContext)
  const fileInputRef = useRef(null)

  const product = products.find(p => String(p.id) === String(id))

  const [sizes, setSizes] = useState({ XS: false, S: false, M: false, L: false, XL: false, XXL: false })
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [category, setCategory] = useState('Outerwear')
  const [imgUrls, setImgUrls] = useState(['', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (products.length === 0) return
    if (product) {
      setName(product.name || '')
      setDescription(product.description || '')
      setPrice(product.price ? String(product.price) : '')
      setStock(product.stock ? String(product.stock) : '')
      setCategory(product.category || 'Outerwear')
      
      const existingImages = product.images || []
      const paddedImages = ['', '', '', '']
      for (let i = 0; i < Math.min(existingImages.length, 4); i++) {
        paddedImages[i] = existingImages[i]
      }
      setImgUrls(paddedImages)
      
      const newSizes = { XS: false, S: false, M: false, L: false, XL: false, XXL: false }
      if (product.sizes) {
        product.sizes.forEach(size => {
          if (newSizes.hasOwnProperty(size)) {
            newSizes[size] = true
          }
        })
      }
      setSizes(newSizes)
    } else {
      toast.error("Product not found.")
      navigate('/admin/products')
    }
  }, [product, products, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !price || !stock) {
      toast.error("Please fill in Name, Price, and Stock.")
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      const selectedSizes = Object.keys(sizes).filter(size => sizes[size])
      const finalImages = imgUrls.map(u => u.trim()).filter(Boolean)
      
      updateProduct(product.id, {
        name,
        description,
        price: Number(price),
        stock: Number(stock),
        category,
        images: finalImages.length > 0 ? finalImages : ['https://images.unsplash.com/photo-1571781526291-c477ebef020d?w=600&q=80&fit=crop'],
        sizes: selectedSizes.length > 0 ? selectedSizes : ['S', 'M', 'L']
      })
      setIsLoading(false)
    }, 1000)
  }

  if (products.length === 0) {
    return (
      <AdminLayout>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
          <p style={{ fontSize: '12px', letterSpacing: '0.05em', color: '#6b7280', textTransform: 'uppercase' }}>Loading product details...</p>
        </div>
      </AdminLayout>
    )
  }

  if (!product) return null

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} style={{ padding: '40px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.01em', color: '#111' }}>Edit Product</h1>
            <p style={{ fontSize: '13px', color: '#6b7280' }}>Update product information and inventory settings.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="button" onClick={() => navigate('/admin/products')} style={{ background: '#fff', color: '#111', padding: '10px 16px', fontSize: '12px', fontWeight: 600, border: '1px solid #e5e7eb', borderRadius: '4px', cursor: 'pointer', fontFamily: 'inherit' }}>
              Cancel
            </button>
            <button type="submit" disabled={isLoading} style={{ background: '#000', color: '#fff', padding: '10px 16px', fontSize: '12px', fontWeight: 600, border: 'none', borderRadius: '4px', cursor: isLoading ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.7 : 1, fontFamily: 'inherit' }}>
              {isLoading ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', alignItems: 'start' }}>
          
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* General Information */}
            <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '24px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#111', marginBottom: '24px' }}>General Information</h2>
              
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Product Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="e.g. Minimalist Ceramic Vase" style={{ width: '100%', border: '1px solid #e5e7eb', padding: '10px 12px', fontSize: '13px', outline: 'none', borderRadius: '4px', boxSizing: 'border-box', fontFamily: 'inherit' }} onFocus={e => e.target.style.borderColor='#111'} onBlur={e => e.target.style.borderColor='#e5e7eb'} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Description</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Detailed description of the product's features and materials..." rows="6" style={{ width: '100%', border: '1px solid #e5e7eb', padding: '10px 12px', fontSize: '13px', outline: 'none', borderRadius: '4px', boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical' }} onFocus={e => e.target.style.borderColor='#111'} onBlur={e => e.target.style.borderColor='#e5e7eb'}></textarea>
              </div>
            </div>

            {/* Inventory & Pricing */}
            <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '24px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#111', marginBottom: '24px' }}>Inventory & Pricing</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '10px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Price (USD)</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6b7280', fontSize: '13px' }}>$</span>
                    <input type="number" value={price} onChange={e => setPrice(e.target.value)} required placeholder="0.00" style={{ width: '100%', border: '1px solid #e5e7eb', padding: '10px 12px 10px 24px', fontSize: '13px', outline: 'none', borderRadius: '4px', boxSizing: 'border-box', fontFamily: 'inherit' }} onFocus={e => e.target.style.borderColor='#111'} onBlur={e => e.target.style.borderColor='#e5e7eb'} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '10px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Stock Quantity</label>
                  <input type="number" value={stock} onChange={e => setStock(e.target.value)} required placeholder="0" style={{ width: '100%', border: '1px solid #e5e7eb', padding: '10px 12px', fontSize: '13px', outline: 'none', borderRadius: '4px', boxSizing: 'border-box', fontFamily: 'inherit' }} onFocus={e => e.target.style.borderColor='#111'} onBlur={e => e.target.style.borderColor='#e5e7eb'} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Available Sizes</label>
                <div style={{ display: 'flex', gap: '16px' }}>
                  {Object.keys(sizes).map(size => (
                    <label key={size} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                      <input type="checkbox" checked={sizes[size]} onChange={() => setSizes(p => ({ ...p, [size]: !p[size] }))} style={{ width: '14px', height: '14px', accentColor: '#111' }} />
                      <span style={{ fontSize: '12px', color: '#111', fontWeight: 500 }}>{size}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Product Images */}
            <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '24px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#111', marginBottom: '20px' }}>Product Images (Max 4)</h2>
              
              {imgUrls.map((url, idx) => (
                <div key={idx} style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '12px', marginBottom: '16px', background: '#fafafa' }}>
                  <label style={{ display: 'block', fontSize: '10px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Image {idx + 1}</label>
                  <div style={{ display: 'grid', gridTemplateColumns: url ? '56px 1fr' : '1fr', gap: '12px', alignItems: 'center' }}>
                    {url && (
                      <div style={{ width: '56px', height: '56px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                        <img src={url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Preview" />
                      </div>
                    )}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <input 
                        type="text" 
                        value={url} 
                        onChange={(e) => {
                          const val = e.target.value
                          setImgUrls(prev => {
                            const copy = [...prev]
                            copy[idx] = val
                            return copy
                          })
                        }} 
                        placeholder="Paste image URL here" 
                        style={{ width: '100%', border: '1px solid #e5e7eb', padding: '8px 10px', fontSize: '12px', outline: 'none', borderRadius: '4px', boxSizing: 'border-box', fontFamily: 'inherit', background: '#fff' }} 
                      />
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span style={{ fontSize: '11px', color: '#9ca3af' }}>or</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => {
                            const file = e.target.files[0]
                            if (file) {
                              const reader = new FileReader()
                              reader.onloadend = () => {
                                setImgUrls(prev => {
                                  const copy = [...prev]
                                  copy[idx] = reader.result
                                  return copy
                                })
                              }
                              reader.readAsDataURL(file)
                            }
                          }}
                          style={{ fontSize: '11px', color: '#6b7280' }} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Organization */}
            <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '24px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#111', marginBottom: '24px' }}>Organization</h2>
              <div>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Category</label>
                <select value={category} onChange={e => setCategory(e.target.value)} style={{ width: '100%', border: '1px solid #e5e7eb', padding: '10px 12px', fontSize: '13px', outline: 'none', borderRadius: '4px', background: '#fff', fontFamily: 'inherit', cursor: 'pointer' }}>
                  <option>Outerwear</option>
                  <option>Knitwear</option>
                  <option>Trousers</option>
                  <option>Accessories</option>
                </select>
              </div>
            </div>

          </div>

        </div>

      </form>
    </AdminLayout>
  )
}

export default AdminEditProduct
