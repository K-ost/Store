import React, { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Container } from 'react-bootstrap'
import { productType } from '../interfaces'
import { AppDispatch, RootState } from '../store/store'
import Product from '../components/Product/Product'
import Sort from '../components/Sort/Sort'
import Filter from '../components/Filter/Filter'
import { resetFilters } from '../store/filterSlice'
import Load from '../components/Load/Load'
import Pager from '../components/Pager/Pager'


const Catalog: React.FC = () => {
  const [products, setProducts] = useState<productType[]>([])
  const [productsLength, setProductsLength] = useState<string>('')
  const dispatch = useDispatch<AppDispatch>()
  const sort = useSelector((state: RootState) => state.filter.sort)
  const category = useSelector((state: RootState) => state.filter.category)
  const price = useSelector((state: RootState) => state.filter.price)
  const page = useSelector((state: RootState) => state.filter.page)

  // Query
  const { data, loading, refetch } = useQuery(gql`
    query GetProducts {
      getAllProducts(sort: "${sort}", count: "6", perpage: "${page}", filter: {
        category: "${category.join(',')}",
        price: "${price}"
      }) { data { id, title, category, price, img, slug }, length, perpage }
    }
  `)

  useEffect(() => {
    if (!loading) {
      setProducts(data?.getAllProducts.data)
      setProductsLength(data?.getAllProducts.length)
    }
    refetch()
  }, [data?.getAllProducts, loading, refetch, sort, category, price, page])

  useEffect(() => {
    return () => {
      dispatch(resetFilters())
    }
  }, [dispatch])

  
  return (
    <Container>
      <h1>Каталог</h1>
      <Row className="products-row">
        <Col lg="9">
          <Sort />
          <Row>
            {products.map(el => <Product key={el.id} product={el} />)}
            {loading && <Load />}
          </Row>
          <Pager length={productsLength} />
        </Col>
        <Col lg="3">
          <Filter />
        </Col>
      </Row>
    </Container>
  )
}

export default Catalog