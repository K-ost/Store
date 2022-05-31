import React from 'react'

interface IPrice {
  price: number
}

const Price: React.FC<IPrice> = ({ price }) => {
  let priceString = price?.toLocaleString()

  return (
    <div className="productPage-price">
      <span>{priceString}</span> грн
    </div>
  )
}

export default Price