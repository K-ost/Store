import { gql, useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { REMOVE_REVIEW } from '../../helpers'
import { IReview } from '../../interfaces'
import ModalBox from '../ModalBox/ModalBox'
import Review from './Review'
import ReviewForm from './ReviewForm'
import './reviews.scss'

interface IReviews {
  id: string
}

const Reviews: React.FC<IReviews> = ({ id }) => {
  const GET_REVIEWS = gql`query GetReviews { getReviewsByID(id: "${id}") { id, author, body, productID } }`
  const [reviews, setReviews] = useState<IReview[]>([])
  const [show, setShow] = useState<boolean>(false)
  const [ID, setID] = useState<string>('')
  const { data, loading } = useQuery(GET_REVIEWS)
  const [ removeRev ] = useMutation(REMOVE_REVIEW, { refetchQueries: [GET_REVIEWS] })
  
  useEffect(() => {
    if (!loading) {
      setReviews(data?.getReviewsByID)
    }
  }, [data?.getReviewsByID, loading])

  // removeHandler
  const removeHandler = (idReview: string) => {
    setShow(true)
    setID(idReview)
  }

  // removeReview
  const removeReview = () => {
    removeRev({ variables: { id: ID } })
    setShow(false)
  }

  return (
    <div className="reviews">
      <h4>Отзывы</h4>
      <div className="review-list">
        {reviews.map(el => <Review key={el.id} details={el} remove={removeHandler} />)}
        {!reviews.length && <p>Отзывов пока нет</p>}
        {loading && <p>Loading...</p>}
      </div>
      <ReviewForm id={id} />

      <ModalBox show={show} hide={() => setShow(false)} title="Удалить комментарий" nofooter>
        <div className="modalfooter">
          <button className="btn btn-outline-secondary" onClick={() => setShow(false)}>Отмена</button>
          <button className="btn btn-danger" onClick={removeReview}>Удалить</button>
        </div>
      </ModalBox>
    </div>
  )
}

export default Reviews