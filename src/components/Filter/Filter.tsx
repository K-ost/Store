import React, { useEffect, useState } from 'react'
import FilterItem from './FilterItem'
import { useQuery } from '@apollo/client'
import { GET_CATS } from '../../helpers'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { resetFilters, setPriceFrom, setPriceTo } from '../../store/filterSlice'
import { IBrand } from '../../interfaces'
import './filter.scss'


const Filter: React.FC = () => {
  const { data, loading } = useQuery(GET_CATS)
  const [categories, setCategories] = useState<IBrand[]>([])
  const dispatch = useDispatch<AppDispatch>()
  const cats = useSelector((state: RootState) => state.filter.category)
  const from = useSelector((state: RootState) => state.filter.priceFrom)
  const to = useSelector((state: RootState) => state.filter.priceTo)

  useEffect(() => {
    if (!loading) setCategories(data?.getCategories)
  }, [data?.getCategories, loading])

  return (
    <div className="filter">
      <FilterItem title="Бренд" list={categories} type="checkbox" />

      <div className="filter-item">
        <div className="filter-title">Цена</div>
        <div className="filter-hide">
          <div className="filter-hide__inner">
            <div className="input-group">
              <input type="number" placeholder="От" className="form-control" min="1" onChange={e => dispatch(setPriceFrom(e.target.value))} value={from} />
              <input type="number" placeholder="До" className="form-control" onChange={e => dispatch(setPriceTo(e.target.value))} value={to} />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="filter-item">
        <button className="btn btn-primary btn-block">Найти</button>
      </div> */}
      {(cats.length || from.length || to.length) ?
      <div className="filter-item">
        <button className="btn btn btn-outline-secondary btn-block" onClick={() => dispatch(resetFilters())}>Сбросить</button>
      </div> : ''}
    </div>
  )
}

export default Filter