import React, { createContext, useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'
axios.defaults.withCredentials = true;

import Home from './pages/Home'
import Collection from './pages/Collection'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Orders from './pages/Orders'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import AdminLogin from './pages/admin/AdminLogin'
import AdminProducts from './pages/admin/AdminProducts'
import AdminAddProduct from './pages/admin/AdminAddProduct'
import AdminEditProduct from './pages/admin/AdminEditProduct'
import AdminOrders from './pages/admin/AdminOrders'

export const ShopContext = createContext(null)


const App = () => {
  const navigate = useNavigate()

  // State management
  const [products, setProducts] = useState([])

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('luxe_cart')
    return saved ? JSON.parse(saved) : []
  })

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('luxe_wishlist')
    return saved ? JSON.parse(saved) : []
  })

  const [user, setUser] = useState(null)

  const [orders, setOrders] = useState([])

  const [searchQuery, setSearchQuery] = useState('')

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/product/list`)
      if (response.data.success) {
        setProducts(response.data.products)
      }
    } catch (err) {
      console.error("Failed to fetch products:", err)
    }
  }

  const fetchUserOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/order/user`)
      if (response.data.success) {
        setOrders(response.data.orders)
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err)
    }
  }

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/order/list`)
      if (response.data.success) {
        setOrders(response.data.orders)
      }
    } catch (err) {
      console.error("Failed to fetch all orders:", err)
    }
  }

  const verifyToken = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/verify`)
      if (response.data.success) {
        setUser(response.data.user)
        if (response.data.user.role === 'admin') {
          fetchAllOrders()
        } else {
          fetchUserOrders()
        }
      } else {
        setUser(null)
      }
    } catch (err) {
      console.error("Session verification failed:", err)
      setUser(null)
    }
  }

  useEffect(() => {
    fetchProducts()
    verifyToken()
  }, [])

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('luxe_cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('luxe_wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  // Cart operations
  const addToCart = (productId, color, size, qty = 1) => {
    const product = products.find(p => String(p.id) === String(productId))
    if (!product) return

    const cartId = `${productId}-${color}-${size}`
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === cartId)
      if (existing) {
        toast.success(`Updated ${product.name} quantity in bag!`)
        return prevCart.map(item => item.id === cartId ? { ...item, qty: item.qty + qty } : item)
      } else {
        toast.success(`Added ${product.name} to bag!`)
        return [
          ...prevCart,
          {
            id: cartId,
            productId: String(productId),
            name: product.name,
            variant: `Size: ${size} / ${color}`,
            price: product.price,
            qty: qty,
            img: product.images[0],
            tag: product.tag,
            tagColor: product.tagColor
          }
        ]
      }
    })
  }

  const updateCartQuantity = (cartId, qty) => {
    setCart(prevCart =>
      prevCart.map(item => item.id === cartId ? { ...item, qty: Math.max(1, qty) } : item)
    )
  }

  const removeFromCart = (cartId) => {
    setCart(prevCart => {
      const item = prevCart.find(i => i.id === cartId)
      if (item) {
        toast.info(`Removed ${item.name} from bag.`)
      }
      return prevCart.filter(item => item.id !== cartId)
    })
  }

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.qty, 0)
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.qty, 0)
  }

  // Wishlist operations
  const toggleWishlist = (productId) => {
    const id = String(productId)
    setWishlist(prev => {
      if (prev.includes(id)) {
        toast.info("Removed from wishlist")
        return prev.filter(item => item !== id)
      } else {
        toast.success("Added to wishlist!")
        return [...prev, id]
      }
    })
  }

  // Auth operations
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/user/login`, { email, password })
      if (response.data.success) {
        const { user: loggedUser } = response.data
        setUser(loggedUser)
        toast.success(`Welcome back, ${loggedUser.name}!`)
        
        if (loggedUser.role === 'admin') {
          fetchAllOrders()
          navigate('/admin/products')
        } else {
          fetchUserOrders()
          navigate('/dashboard')
        }
        return true
      } else {
        toast.error(response.data.message || "Invalid credentials.")
        return false
      }
    } catch (err) {
      console.error(err)
      toast.error(err.response?.data?.message || "Login failed.")
      return false
    }
  }

  const signup = async (name, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/user/register`, { name, email, password })
      if (response.data.success) {
        const { user: loggedUser } = response.data
        setUser(loggedUser)
        toast.success(`Welcome to LUXE, ${loggedUser.name}!`)
        fetchUserOrders()
        navigate('/dashboard')
        return true
      } else {
        toast.error(response.data.message || "Registration failed.")
        return false
      }
    } catch (err) {
      console.error(err)
      toast.error(err.response?.data?.message || "Registration failed.")
      return false
    }
  }

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/user/logout`)
    } catch (e) {
      console.error(e)
    }
    setUser(null)
    setOrders([])
    toast.info("Logged out successfully.")
    navigate('/login')
  }

  // Order operations
  const placeOrder = async (form, shippingMethod, paymentMethod) => {
    try {
      if (!user) {
        toast.error("Please login to place an order.")
        navigate('/login')
        return
      }

      const response = await axios.post(`${API_URL}/order/place`, {
        form,
        shippingMethod,
        paymentMethod,
        items: cart,
        subtotal: getCartTotal(),
        shippingCost: shippingMethod === 'express' ? 24 : 0,
        tax: +(getCartTotal() * 0.08).toFixed(2),
        total: `$${(getCartTotal() + (shippingMethod === 'express' ? 24 : 0) + getCartTotal() * 0.08).toFixed(2)}`
      })

      if (response.data.success) {
        toast.success("Order placed successfully!")
        setCart([]) // Clear cart
        localStorage.removeItem('luxe_cart')
        fetchUserOrders()
        navigate('/orders')
      } else {
        toast.error(response.data.message || "Failed to place order.")
      }
    } catch (err) {
      console.error(err)
      toast.error("Failed to place order.")
    }
  }

  // Admin inventory operations
  const addProduct = async (productData) => {
    try {
      const response = await axios.post(`${API_URL}/product/add`, productData)
      if (response.data.success) {
        toast.success(`Successfully published product!`)
        fetchProducts()
        navigate('/admin/products')
      } else {
        toast.error(response.data.message || "Failed to add product.")
      }
    } catch (err) {
      console.error(err)
      toast.error("Failed to add product.")
    }
  }

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.post(`${API_URL}/product/remove`, { id: productId })
      if (response.data.success) {
        toast.info("Product removed from catalog.")
        fetchProducts()
      } else {
        toast.error(response.data.message || "Failed to remove product.")
      }
    } catch (err) {
      console.error(err)
      toast.error("Failed to remove product.")
    }
  }

  const updateProduct = async (productId, productData) => {
    try {
      const response = await axios.post(`${API_URL}/product/update`, { id: productId, ...productData })
      if (response.data.success) {
        toast.success(`Successfully updated product!`)
        fetchProducts()
        navigate('/admin/products')
      } else {
        toast.error(response.data.message || "Failed to update product.")
      }
    } catch (err) {
      console.error(err)
      toast.error("Failed to update product.")
    }
  }

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.post(`${API_URL}/order/status`, { orderId, status: newStatus })
      if (response.data.success) {
        toast.success(`Order status updated to ${newStatus}`)
        if (user && user.role === 'admin') {
          fetchAllOrders()
        } else {
          fetchUserOrders()
        }
      } else {
        toast.error(response.data.message || "Failed to update order status.")
      }
    } catch (err) {
      console.error(err)
      toast.error("Failed to update order status.")
    }
  }

  return (
    <ShopContext.Provider value={{
      products,
      cart,
      wishlist,
      user,
      orders,
      searchQuery,
      setSearchQuery,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      getCartCount,
      getCartTotal,
      toggleWishlist,
      login,
      signup,
      logout,
      placeOrder,
      addProduct,
      updateProduct,
      deleteProduct,
      updateOrderStatus
    }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/add" element={<AdminAddProduct />} />
        <Route path="/admin/edit/:id" element={<AdminEditProduct />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          background: '#111',
          color: '#fff',
          borderRadius: '0px',
          fontFamily: 'Inter, sans-serif',
          fontSize: '12px',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      />
    </ShopContext.Provider>
  )
}

export default App