import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router'
import Buy from '../components/Product/Buy'
import Price from '../components/Price'
import Features from '../components/Features/Features'
import Gallery from '../components/Gallery/Gallery'
import { productType } from '../interfaces'
import Reviews from '../components/Reviews/Reviews'


const ProductPage: React.FC = () => {
  const { slug } = useParams()
  const GET_PRODUCT = gql`
    query getProduct {
      getProduct(slug: "${slug}") { id, title, description, img, price, slug, feats { sims
        simFormat, screen, screenSize, cpu, hard, memory, camera, battery } }
    }
  `
  const { data } = useQuery(GET_PRODUCT)
  const product: productType = (data !== undefined) && data.getProduct
  

  return (
    <Container>
      <h1>{product.title}</h1>
      <div className="productPage">
        <div className="row">
          <div className="col-12 col-md-4">
            <Gallery images={product.img!} />
          </div>
          <div className="col-12 col-md-8">
            <div className="productPage-amount">
              <Price price={product.price} />
              <Buy details={product} />
            </div>
            <div className="productPage-description" dangerouslySetInnerHTML={{__html: product.description!}}></div>
            <Features details={product.feats!} />
            <Reviews id={product.id} />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ProductPage