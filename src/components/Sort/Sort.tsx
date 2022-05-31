import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { setSort } from '../../store/filterSlice'
import { AppDispatch } from '../../store/store'
import './sort.scss'

const Sort: React.FC = () => {
  const [title, setTitle] = useState<string>('По умолчанию')
  const dispatch = useDispatch<AppDispatch>()

  const handler = e => {
    let elem = e.target as HTMLElement
    setTitle(elem.innerText)
    dispatch(setSort(elem.id))
  }

  return (
    <div className="sorting">
      <Dropdown>
        <Dropdown.Toggle variant="secondary">{title}</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={handler} id="">По умолчанию</Dropdown.Item>
          <Dropdown.Item onClick={handler} id="asc">Сначала дешевые</Dropdown.Item>
          <Dropdown.Item onClick={handler} id="desc">Сначала дорогие</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default Sort