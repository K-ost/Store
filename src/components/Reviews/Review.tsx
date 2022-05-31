import React from 'react'
import { useSelector } from 'react-redux'
import { IReview } from '../../interfaces'
import { RootState } from '../../store/store'
import './reviews.scss'

interface IReviewItem {
  details: IReview
  remove: (id: string) => void
}

const Review: React.FC<IReviewItem> = ({ details, remove }) => {
  const user = useSelector((state: RootState) => state.auth.user)

  // Date
  const fullDate = new Date(Number(details.id))
  const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
  const date = `${fullDate.getDate()} ${months[fullDate.getMonth()]}, ${fullDate.getFullYear()}`
  const time = `${fullDate.getHours()}:${fullDate.getMinutes() < 10 ? '0' : ''}${fullDate.getMinutes()}`

  return (
    <div className="review">
      <div className="review-header">
        <div className="review-author">{details.author}</div>
        <div className="review-date">{date}, {time}</div>
        {user && user.role === 'admin' && <button className="btn btn-danger" onClick={() => remove(details.id)}>&times;</button>}
      </div>
      {details.body}
    </div>
  )
}

export default Review