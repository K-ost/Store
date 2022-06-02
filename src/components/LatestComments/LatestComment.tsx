import { gql, useQuery } from '@apollo/client'
import React from 'react'
import { Link } from 'react-router-dom'
import { IReview } from '../../interfaces'

interface ILatestComment {
  el: IReview
}

const LatestComment: React.FC<ILatestComment> = ({ el }) => {
  const { data } = useQuery(gql`
    query GET_PRODUCT {
      getProductByID(id: "${el.productID}") { slug, title }
    }
  `)

  return (
    <div className="col-12 col-md-6 col-lg-3">
      <div className="latestComment">
        <div className="latestComment-text">{el.body.slice(0,80)}{el.body.length > 80 && '...'}</div>
        <div className="latestComment-author">
          <b>{el.author}</b>
          к товару <Link to={`/catalog/${data?.getProductByID?.slug}`}>{data?.getProductByID?.title}</Link>
        </div>
      </div>
    </div>
  )
}

export default LatestComment