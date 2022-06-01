import React, { useEffect, useRef, useState } from 'react'
import FilterItem from './FilterItem'
import { useQuery } from '@apollo/client'
import { GET_CATS, GET_CPU } from '../../helpers'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { resetFilters, setPriceFrom, setPriceTo } from '../../store/filterSlice'
import { IBrand } from '../../interfaces'
import './filter.scss'

const Filter: React.FC = () => {
  const catList = useQuery(GET_CATS)
  const cpuList = useQuery(GET_CPU)
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [categories, setCategories] = useState<IBrand[]>([])
  const [CPU, setCPU] = useState<IBrand[]>([])
  const dispatch = useDispatch<AppDispatch>()
  const cats = useSelector((state: RootState) => state.filter.category)
  const cpu = useSelector((state: RootState) => state.filter.cpu)
  const from = useSelector((state: RootState) => state.filter.priceFrom)
  const to = useSelector((state: RootState) => state.filter.priceTo)
  const refHeight = useRef<HTMLDivElement>(null)

  const height = showFilter ? refHeight.current?.offsetHeight : 0

  useEffect(() => {
    if (!catList.loading) setCategories(catList.data?.getCategories)
    if (!cpuList.loading) setCPU(cpuList.data?.getFilterCPU)
  }, [catList.loading, cpuList.loading, catList.data?.getCategories, cpuList.data?.getFilterCPU])

  return (
    <div className="filter">
      <button className="btn btn-primary btn-filter btn-block d-lg-none" onClick={() => setShowFilter(!showFilter)}>Показать фильтр</button>
      <div className="filter-inner" style={{ height }}>
        <div className="filter-inner__height" ref={refHeight}>
          <div className="filter-header">Фильтр</div>
          <FilterItem title="Бренд" list={categories} type="checkbox" cat="category" />
          <FilterItem title="Процессор" list={CPU} type="checkbox" cat="cpu" />

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

          {(cats.length || cpu.length || from.length || to.length) ?
          <div className="filter-item">
            <button className="btn btn btn-outline-secondary btn-block" onClick={() => dispatch(resetFilters())}>Сбросить</button>
          </div> : ''}
        </div>
      </div>
    </div>
  )
}

export default Filter