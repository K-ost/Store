import React from 'react'
import { IBrand } from '../../interfaces'
import './filter.scss'
import FilterChecks from './FilterChecks'

interface IFilterItem {
  title: string
  list?: IBrand[]
  type?: string
  cat: string
}

const FilterItem: React.FC<IFilterItem> = ({ title, list, type, cat }) => {
  return (
    <div className="filter-item">
      <div className="filter-title">{title}</div>
      <div className="filter-hide">
        <div className="filter-hide__inner">
          {list?.map(el => <FilterChecks key={el.id} el={el} type={type!} cat={cat} />)}
        </div>
      </div>
    </div>
  )
}

export default FilterItem