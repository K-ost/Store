import React from 'react'
import { Link } from 'react-router-dom'
import { productType } from '../../interfaces'
import { Col } from 'react-bootstrap'
import './product.scss'
import Buy from './Buy'
import Price from '../Price'

interface prodProps {
  product: productType
}

const Product: React.FC<prodProps> = ({ product }) => {
  return (
    <Col className="product-grid" xs="6" lg="4">
      <div className="product">
        <Link 
          to={`/catalog/${product.slug}`}
          className={`product-img ${!product.img ? "nopic" : ""}`}
          style={{backgroundImage: `url(${product.img[0]})`}}>
        </Link>
        <div className="product-body">
          <div className="product-title">{product.title}</div>
          <Price price={product.price} />
          <div className='row'>
            <div className='col-12 col-sm-6 product-buy'>
              <Buy details={product} />
            </div>
            <div className='col-12 col-sm-6'>
              <Link to={`/catalog/${product.slug}`} className="btn btn-sm btn-secondary">Подробнее</Link>
            </div>
          </div>
        </div>
      </div>
    </Col>
  )
}

export default Product