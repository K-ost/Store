import React from 'react'
import { useDispatch } from 'react-redux'
import { addOrder } from '../../store/cartSlice'
import { productType } from '../../interfaces'

interface buyProps {
  details: productType
}

const Buy: React.FC<buyProps> = ({ details }) => {
  const dispatch = useDispatch()

  return (
    <button
      className="btn btn-sm btn-primary"
      onClick={() => dispatch(addOrder(details))}
    >
      В корзину
    </button>
  )
}

export default Buy