import React from 'react'
import { gql, useMutation } from '@apollo/client'
import { useForm } from 'react-hook-form'
import { reviewFields } from '../../helpers'
import Area from '../Field/Area'
import Field from '../Field/Field'
import './reviews.scss'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store/store'
import { toast } from '../../store/authSlice'

interface IReviewForm {
  id: string
}

const ReviewForm: React.FC<IReviewForm> = ({ id }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [ addReview ] = useMutation(gql
    `mutation AddReview($input: ReviewInput!) { addReview(input: $input) { message } }`,
    { refetchQueries: [gql`query GetReviews { getReviewsByID(id: "${id}") { id, author, body, productID } }`] }
  )
  const onSubmit = reviewData => {
    const newReview = {
      ...reviewData,
      productID: id
    }
    addReview({ variables: { input: newReview } })
    reset()
    dispatch(toast('Review successfully added'))
  }

  return (
    <div className="reviewForm">
      <h4>Add review</h4>

      <form onSubmit={handleSubmit(onSubmit)}>
        {reviewFields.map(el => (
          <Field
            key={el.id}
            label={el.label}
            options={register(el.id, el.options)}
            type={el.type}
            error={errors[el?.id]?.message}
          />
        ))}
        <Area label="Text review" options={register('body', {required: 'Required field', min: 10})} error={errors['body']?.message} />
        <button type="submit" className="btn btn-primary">Add review</button>
      </form>
    </div>
  )
}

export default ReviewForm