import React from 'react'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import '../components/Cart/cart.scss'
import CartItem from '../components/Cart/CartItem'
import Form from '../components/Form/Form'
import Price from '../components/Price'
import { RootState } from '../store/store'

const Basket: React.FC = () => {
  const orders = useSelector((state: RootState) => state.cart.orders)

  // Total price
  let totalPrice = orders.reduce((prev, order) => {
    let priceOrder = Number(order.price) * order.count!
    return prev += priceOrder
  }, 0)

  return (
    <Container>
      <h1>Cart</h1>

      <div className="cart-row">
        {orders.map(order => <CartItem key={order.id} order={order} />)}
        {orders.length === 0 && <p>Cart is empty</p>}
      </div>

      {orders.length !== 0 &&
        <div className="totalPriceBox">
          <h3>Total price:</h3>
          <Price price={totalPrice} />
        </div>
      }
      <Form orders={orders} total={totalPrice} />
    </Container>
  )
}

export default Basket