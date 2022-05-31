import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Header from './components/Header'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import ProductPage from './pages/ProductPage'
import Basket from './pages/Basket'
import Register from './pages/Register'
import { loadOrders } from './store/cartSlice'
import { login } from './store/authSlice'
import { RootState } from './store/store'
import Layout from './pages/Profile/Layout'
import Messages from './pages/Profile/Messages'
import Hello from './pages/Profile/Hello'
import AllProducts from './pages/Profile/AllProducts'
import Users from './pages/Profile/Users'
import Orders from './pages/Profile/Orders'
import ToastBox from './components/ToastBox/ToastBox'
import AddProduct from './pages/Profile/AddProduct'


function App() {
  const dispatch = useDispatch()
  const [show, setShow] = useState<boolean>(false)
  const toast = useSelector((state: RootState) => state.auth.toast)
  
  useEffect(() => {
    const storageOrders = localStorage.getItem('orders')
    if (storageOrders) {
      dispatch(loadOrders( JSON.parse(storageOrders) ))
    }
  }, [dispatch])

  useEffect(() => {
    const storageAuth = localStorage.getItem('auth')
    if (storageAuth) {
      dispatch(login( JSON.parse(storageAuth) ))
    }
  }, [dispatch])

  useEffect(() => {
    if (toast) setShow(true)
  }, [toast])

  
  return (
    <div className="mainwrap">
      <Header />
      <div className="mainwrap_container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:slug" element={<ProductPage />} />
          <Route path="/cart" element={<Basket />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Layout />}>
            <Route index element={<Hello />} />
            <Route path="/profile/add-product" element={<AddProduct />} />
            <Route path="/profile/all" element={<AllProducts />} />
            <Route path="/profile/messages" element={<Messages />} />
            <Route path="/profile/users" element={<Users />} />
            <Route path="/profile/orders" element={<Orders />} />
          </Route>
        </Routes>
      </div>
      <footer className="footer"></footer>

      <ToastBox toast={toast} show={show} hide={() => setShow(false)} />
    </div>
  )
}

export default App
