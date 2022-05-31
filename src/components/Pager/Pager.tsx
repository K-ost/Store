import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { paginate } from '../../store/filterSlice'
import { AppDispatch, RootState } from '../../store/store'

interface IPager {
  length: string
}

const Pager: React.FC<IPager> = ({ length }) => {
  const dispatch = useDispatch<AppDispatch>()
  const page = useSelector((state: RootState) => state.filter.page)
  const pages: number = Math.round(Number(length) / 6)
  const pagesArray: number[] = []
  for (let i = 1; i <= pages; i++) {
    pagesArray.push(i)
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <button className="page-link" onClick={() => dispatch(paginate('1'))}>
            <span>&laquo;</span>
          </button>
        </li>
        {pagesArray.map(el => (
          <li className={`page-item ${el === Number(page) ? 'active': ''}`} key={el}>
            <button className="page-link" onClick={() => dispatch(paginate(el.toString()))}>
              {el}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button className="page-link" onClick={() => dispatch(paginate(pagesArray[pagesArray.length - 1].toString()))}>
            <span>&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pager