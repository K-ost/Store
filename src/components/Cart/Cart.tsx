import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../store/store'
import './cart.scss'

const Cart: React.FC = () => {
  const orders = useSelector((state: RootState) => state.cart.orders)
  let totalOrders = orders.reduce((prev, el) => prev += Number(el.count), 0)

  return (
    <Link to="/cart" className="btn btn-secondary btn-cart">
      {(totalOrders !== 0) && <span>{totalOrders}</span>}
    </Link>
  )
}

export default Cart