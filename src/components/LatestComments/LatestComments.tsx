import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_REVIEWS } from '../../helpers'
import { IReview } from '../../interfaces'
import LatestComment from './LatestComment'
import './latestComment.scss'
import Load from '../Load/Load'

const LatestComments: React.FC = () => {
  const { data, loading } = useQuery(GET_ALL_REVIEWS)
  const [lastReviews, setLastReviews] = useState<IReview[]>([])

  useEffect(() => {
    if (!loading) {
      console.log(data?.getAllReviews)
      setLastReviews(data?.getAllReviews)
    }
  }, [loading, data?.getAllReviews])

  return (
    <div className="latestComments">
      <h3>Latest Comments</h3>
      <div className="row">
        {lastReviews.map((el: IReview) => <LatestComment key={el.id} el={el} />).reverse().slice(0,4)}
        {loading && <Load />}
      </div>
    </div>
  )
}

export default LatestComments