import React, { useEffect, useState } from 'react'
import { productType } from '../../interfaces'
import { Modal } from 'react-bootstrap'
import { toast } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import { useQuery } from '@apollo/client'
import { ALL_EDIT_PRODUCTS } from '../../helpers'

interface modalData {
  id: string
  title: string
}

const AllProducts: React.FC = () => {
  const [products, setProducts] = useState<productType[]>([])
  const [modal, setModal] = useState(false)
  const [modData, setModData] = useState<modalData>({ id: '',  title: '' })
  const dispatch = useDispatch()
  const { data, loading } = useQuery(ALL_EDIT_PRODUCTS)

  useEffect(() => {
    if (!loading) setProducts(data?.allEditProducts)
  }, [data?.allEditProducts, loading])
  
  // removeHand
  const removeHand = (id: string, title: string) => {
    setModal(true)
    setModData({ id, title })
  }

  // removeFunc
  const removeFunc = async (id: string) => {
    setModal(false)
    dispatch(toast('Товар успешно удален'))
  }

  return (
    <div>
      <h4>Все товары</h4>
      {products && <ul className="list-group">
        {products.map(el => (
        <li key={el.id} className="list-group-item">
          {el.title}
          <button className="btn btn-danger" onClick={() => removeHand(el.id, el.title)}>&times;</button>
        </li>
      ))}
      </ul>}
      {/* {loading && <p>Loading...</p>} */}

      <Modal show={modal} onHide={() => setModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Удаление товара</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Подтверждаете удаление товара<br /> <b>"{modData.title}"</b>?
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setModal(false)}>Отмена</button>
          <button className="btn btn-danger" onClick={() => removeFunc(modData.id)}>Удалить</button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AllProducts