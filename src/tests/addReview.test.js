import { render, screen } from '@testing-library/react'
import ReviewForm from '../components/Reviews/ReviewForm'

const newReview = {
  id: '13712912312',
  author: 'User',
  body: 'Testing adding review',
  productID: '13712912312'
}

const onSubmit = jest.fn()

describe('Add review component', () => {
  it('renders Add review component', () => {
    
  })
})