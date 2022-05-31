import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { productType } from '../../interfaces'
import { changeOrder, removeOrder } from '../../store/cartSlice'
import ModalCart from '../../components/Cart/ModalCart'
import Price from '../Price'

interface orderProp {
  order: productType
}

const CartItem: React.FC<orderProp> = ({ order }) => {
  const dispatch = useDispatch()

  const [show, setShow] = useState<boolean>(false)

  // Total price of order
  let total = order.count! * Number(order.price)


  return (
    <>
      <div className="cart-item">
        <div className="row align-items-center">
          <div className="col-12 col-md-2 cart-item__img">
            <Link to={`/catalog/${order.slug}`}><img src={order.img[0]} alt="" /></Link>
          </div>
          <div className="col-12 col-md-4 cart-item__details">
            <div className="cart-item__title">{order.title}</div>
          </div>
          <div className="col-12 col-md-6 cart-item__meta">
            <div className="row align-items-center">
              <div className="col-4">
                <Price price={order.price} />
              </div>
              <div className="col-4 cart-item__count">
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  defaultValue={order.count}
                  onChange={e => dispatch(changeOrder({count: e.target.value, id: order.id}))}
                />
              </div>
              <div className="col-4 cart-item__price cart-item__total">
                <Price price={total} />
              </div>
            </div>
          </div>
        </div>
        <button className="btn btn-danger cart-item__delete" onClick={() => setShow(true)}>&times;</button>
      </div>

      <ModalCart
        title="Подтверждаете удаление"
        show={show}
        hide={() => setShow(false)}
        remove={() => dispatch(removeOrder(order.id))}
      />
    </>
  )
}

export default CartItem