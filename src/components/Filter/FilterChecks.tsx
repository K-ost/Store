import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IBrand } from '../../interfaces'
import { setCategory } from '../../store/filterSlice'
import { AppDispatch, RootState } from '../../store/store'

interface IFilterChecks {
  el: IBrand
  type: string
}

const FilterChecks: React.FC<IFilterChecks> = ({ el, type }) => {
  const dispatch = useDispatch<AppDispatch>()
  const checkRef = useRef<HTMLInputElement>(null)
  const reset = useSelector((state: RootState) => state.filter.reset)

  useEffect(() => {
    if (reset) checkRef.current!.checked = false
  }, [reset])

  return (
    <div className="filter-check">
      <label className="check-field">
        <input type={type} onChange={() => dispatch(setCategory(el.title))} ref={checkRef} />
        {el.title}
      </label>
    </div>
  )
}

export default FilterChecks