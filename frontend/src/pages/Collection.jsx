import React, { useState, useContext, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ShopContext } from '../App'

const NAV_H = 56
const categories = [
  { name: 'All Apparel', count: 6 },
  { name: 'Outerwear', count: 3 },
  { name: 'Knitwear', count: 1 },
  { name: 'Trousers', count: 1 },
  { name: 'Accessories', count: 1 },
]
const colors = [
  { hex: '#111111', label: 'Black' },
  { hex: '#ffffff', label: 'White', border: true },
  { hex: '#9ca3af', label: 'Grey' },
  { hex: '#374151', label: 'Charcoal' },
  { hex: '#e5e7eb', label: 'Light Grey', border: true },
  { hex: '#6b7280', label: 'Slate' },
  { hex: '#d1d5db', label: 'Silver', border: true },
  { hex: '#1f2937', label: 'Dark' },
]
const sizes = ['XS', 'S', 'M', 'L', 'XL', '30', '32', '34', '36']
const sortOptions = ['POPULARITY', 'PRICE: LOW TO HIGH', 'PRICE: HIGH TO LOW', 'NEWEST']

const label = { fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '14px', display: 'block' }

const Collection = () => {
  const { products, addToCart, searchQuery, setSearchQuery } = useContext(ShopContext)
  const [activeCategory, setActiveCategory] = useState('All Apparel')
  const [selectedColors, setSelectedColors] = useState([])
  const [selectedSizes, setSelectedSizes] = useState([])
  const [priceRange, setPriceRange] = useState(1000)
  const [sortBy, setSortBy] = useState('POPULARITY')
  const [sortOpen, setSortOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const query = searchParams.get('search')
    if (query) {
      setSearchQuery(query)
    }
  }, [searchParams])

  const toggleColor = (h) => setSelectedColors((p) => p.includes(h) ? p.filter((c) => c !== h) : [...p, h])
  const toggleSize = (s) => setSelectedSizes((p) => p.includes(s) ? p.filter((x) => x !== s) : [...p, s])

  const clearAllFilters = () => {
    setSelectedColors([])
    setSelectedSizes([])
    setPriceRange(1000)
    setActiveCategory('All Apparel')
    setSearchQuery('')
  }

  // Filter products
  const filteredProducts = products.filter(p => {
    // Search filter
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    // Category filter
    if (activeCategory !== 'All Apparel' && p.category.toLowerCase() !== activeCategory.toLowerCase()) {
      return false
    }
    // Color filter
    if (selectedColors.length > 0) {
      const productHexes = p.colors.map(c => c.hex.toLowerCase())
      if (!selectedColors.some(hex => productHexes.includes(hex.toLowerCase()))) {
        return false
      }
    }
    // Size filter
    if (selectedSizes.length > 0) {
      if (!selectedSizes.some(size => p.sizes.includes(size))) {
        return false
      }
    }
    // Price filter
    if (p.price > priceRange) {
      return false
    }
    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'PRICE: LOW TO HIGH') {
      return a.price - b.price
    }
    if (sortBy === 'PRICE: HIGH TO LOW') {
      return b.price - a.price
    }
    if (sortBy === 'NEWEST') {
      return b.id - a.id
    }
    // Popularity
    return b.rating - a.rating || b.stock - a.stock
  })

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <Navbar />
      <main style={{ paddingTop: `${NAV_H}px` }}>

        {/* Page header */}
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '56px 32px 24px' }}>
          <h1 style={{ fontSize: '34px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '12px' }}>The Permanent Collection</h1>
          <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.65, maxWidth: '520px' }}>Curated essentials designed for longevity. Our core collection features premium materials and timeless silhouettes that transcend seasons.</p>
          {searchQuery && (
            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>Showing results for "<strong>{searchQuery}</strong>"</span>
              <button onClick={() => setSearchQuery('')} style={{ background: '#f3f4f6', border: 'none', padding: '4px 8px', fontSize: '10px', cursor: 'pointer', borderRadius: '4px' }}>Clear Search</button>
            </div>
          )}
        </div>

        {/* Sort bar */}
        <div style={{ borderTop: '1px solid #f3f4f6', borderBottom: '1px solid #f3f4f6' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '10px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontSize: '11px', color: '#9ca3af', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{sortedProducts.length} Products Found</p>
            <div style={{ position: 'relative' }}>
              <button onClick={() => setSortOpen(!sortOpen)} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', color: '#111' }}>
                <span style={{ color: '#9ca3af' }}>Sort by:</span>
                <span>{sortBy}</span>
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" /></svg>
              </button>
              {sortOpen && (
                <div style={{ position: 'absolute', right: 0, top: '100%', marginTop: '4px', background: '#fff', border: '1px solid #e5e7eb', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', zIndex: 20, width: '220px' }}>
                  {sortOptions.map((opt) => (
                    <button key={opt} onClick={() => { setSortBy(opt); setSortOpen(false) }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 16px', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: sortBy === opt ? 600 : 400, color: sortBy === opt ? '#111' : '#6b7280' }}>
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main content: sidebar + grid */}
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 32px 80px', display: 'flex', gap: '48px', alignItems: 'flex-start' }}>

          {/* SIDEBAR */}
          <aside style={{ width: '180px', flexShrink: 0 }}>

            {/* Category */}
            <div style={{ marginBottom: '36px' }}>
              <span style={label}>Category</span>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {categories.map((cat) => (
                  <li key={cat.name} style={{ marginBottom: '8px' }}>
                    <button onClick={() => setActiveCategory(cat.name)} style={{ display: 'flex', justifyContent: 'space-between', width: '100%', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '12px', fontWeight: activeCategory === cat.name ? 600 : 400, color: activeCategory === cat.name ? '#111' : '#6b7280', padding: '2px 0', textAlign: 'left' }}>
                      <span>{cat.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range */}
            <div style={{ marginBottom: '36px' }}>
              <span style={label}>Price Range</span>
              <input type="range" min={0} max={1000} value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))} style={{ width: '100%', accentColor: '#111', cursor: 'pointer', display: 'block', marginBottom: '6px' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#9ca3af' }}>
                <span>$0</span><span>${priceRange}</span><span>$1,000</span>
              </div>
            </div>

            {/* Color */}
            <div style={{ marginBottom: '36px' }}>
              <span style={label}>Color</span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 28px)', gap: '8px' }}>
                {colors.map((c) => (
                  <button key={c.hex} title={c.label} onClick={() => toggleColor(c.hex)} style={{ width: '28px', height: '28px', borderRadius: '50%', background: c.hex, cursor: 'pointer', border: selectedColors.includes(c.hex) ? '2px solid #111' : c.border ? '1px solid #d1d5db' : '1px solid transparent', boxShadow: selectedColors.includes(c.hex) ? '0 0 0 2px #fff, 0 0 0 3px #111' : 'none', transition: 'transform 0.15s', fontFamily: 'inherit' }} />
                ))}
              </div>
            </div>

            {/* Size */}
            <div style={{ marginBottom: '36px' }}>
              <span style={label}>Size</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {sizes.map((s) => (
                  <button key={s} onClick={() => toggleSize(s)} style={{ padding: '6px 10px', fontSize: '10px', fontWeight: 500, fontFamily: 'inherit', cursor: 'pointer', border: `1px solid ${selectedSizes.includes(s) ? '#111' : '#d1d5db'}`, background: selectedSizes.includes(s) ? '#111' : '#fff', color: selectedSizes.includes(s) ? '#fff' : '#111', transition: 'all 0.15s' }}>{s}</button>
                ))}
              </div>
            </div>

            <button onClick={clearAllFilters} style={{ width: '100%', background: 'none', border: '1px solid #111', fontSize: '11px', color: '#111', letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit', padding: '12px', fontWeight: 600 }}>Reset Filters</button>
          </aside>

          {/* PRODUCT GRID */}
          <div style={{ flex: 1 }}>
            {sortedProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0', border: '1px dashed #e5e7eb' }}>
                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>No items match your criteria.</p>
                <button onClick={clearAllFilters} style={{ background: '#111', color: '#fff', border: 'none', padding: '10px 20px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>Clear All Filters</button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px 20px' }}>
                {sortedProducts.map((product) => (
                  <Link key={product.id} to={`/product/${product.id}`} style={{ textDecoration: 'none', color: '#111', display: 'block' }}
                    onMouseOver={(e) => { const img = e.currentTarget.querySelector('img'); if(img) img.style.transform='scale(1.05)' }}
                    onMouseOut={(e) => { const img = e.currentTarget.querySelector('img'); if(img) img.style.transform='scale(1)' }}
                  >
                    <div style={{ position: 'relative', overflow: 'hidden', background: '#f9fafb', aspectRatio: '3/4', marginBottom: '12px' }}>
                      {product.tag && (
                        <span style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 10, background: product.tagColor || '#111', color: '#fff', fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 8px' }}>{product.tag}</span>
                      )}
                      <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }} />
                    </div>
                    <p style={{ fontSize: '12px', fontWeight: 600, lineHeight: 1.3, marginBottom: '4px' }}>{product.name}</p>
                    <p style={{ fontSize: '10px', color: '#9ca3af', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '6px' }}>{product.variant}</p>
                    <p style={{ fontSize: '14px', fontWeight: 600 }}>${Number(product.price).toFixed(2)}</p>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            {sortedProducts.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '56px' }}>
                <button style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', color: '#9ca3af' }}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg>
                </button>
                <button style={{ width: '32px', height: '32px', fontSize: '12px', fontWeight: 600, border: '1px solid #111', background: '#111', color: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>1</button>
                <button style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', color: '#9ca3af' }}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer variant="collection" />
    </div>
  )
}

export default Collection
