import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import ModalBox from '../../components/ModalBox/ModalBox'
import OrderItem from '../../components/OrderItem/OrderItem'
import { url } from '../../helpers'
import { useFetch } from '../../hooks/http.hook'
import { newOrder } from '../../interfaces'
import { toast } from '../../store/authSlice'
import { AppDispatch } from '../../store/store'


const Orders: React.FC = () => {
  const [allOrders, setAllOrders] = useState<newOrder[]>([])
  const [load, setLoad] = useState<boolean>(true)
  const [modal, setModal] = useState<boolean>(false)
  const [ID, setID] = useState<string>('')
  const { request } = useFetch()
  const dispatch = useDispatch<AppDispatch>()


  useEffect(() => {
    if (load) {
      fetch(`${url}/api/orders`)
        .then(response => response.json())
        .then(data => {
          setAllOrders(data.data)
          setLoad(false)
        })
    }
  }, [load])


  // changeStatus
  const changeStatus = () => setLoad(true)

  // removeFunc
  const removeFunc = (id: string) => {
    setModal(true)
    setID(id)
  }


  // removeHandler
  const removeHandler = async (id: string) => {
    const data = await request(`${url}/api/orders&id=${id}`, 'GET', null)
    if (data) {
      setLoad(true)
      dispatch(toast(data.message))
    }
    setModal(false)
    setID('')
  }

  return (
    <div>
      <h4>Заказы</h4>
      {load && <Spinner animation="border" variant="info" />}
      {allOrders && 
        allOrders.map(el => <OrderItem key={el.id} order={el} func={() => removeFunc(el.id)} stat={changeStatus} />).reverse()
      }
      {!allOrders.length && !load && <p>Список заказов пуст</p>}

      <ModalBox
        btnClass="danger"
        btnFunc={() => removeHandler(ID)}
        btnText="Удалить"
        title="Удаление заказа"
        show={modal}
        hide={() => setModal(false)}
      >
        Подтверждаете удаление заказа<br /> <b>"{ID}"</b>?
      </ModalBox>
    </div>
  )
}

export default Orders