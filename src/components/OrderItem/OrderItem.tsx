import React, { useRef, useState } from 'react'
import { url } from '../../helpers'
import { useFetch } from '../../hooks/http.hook'
import { newOrder } from '../../interfaces'
import './orderitem.scss'

interface IOrderItem {
  func: () => void
  order: newOrder
  stat: () => void
}

const OrderItem: React.FC<IOrderItem> = ({ func, order, stat }) => {
  const [more, setMore] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)
  const height: number | undefined = more ? ref.current?.offsetHeight : 0
  const { request } = useFetch()

  // showMore
  const showMore = (e: any) => {
    e.preventDefault()
    setMore(!more)
  }

  // changeStatus
  const changeStatus = async (e: any) => {
    const { value } = e.target
    const data = await request(`${url}/api/orders/${order.id}&status=${value}`, 'PUT', null)
    if (data.status) {
      stat()
    }
  }

  return (
    <div className="orderItem">
      <div className="orderItem-head">
        <div className="orderItem-title">
          <h5>Заказ №{order.id}</h5>
          <a href="/" className="orderItem-more" onClick={showMore}>
            {more ? 'Скрыть' : 'Показать'} детали заказа
          </a>
        </div>
        <select className="form-select" onChange={changeStatus} value={order.status}>
          <option value="process">В обработке</option>
          <option value="cancel">Отменен</option>
          <option value="complete">Комплектуется</option>
          <option value="onway">В пути</option>
          <option value="delivered">Доставлен</option>
          <option value="done">Завершен</option>
        </select>
        <button className="btn btn-danger" onClick={func}>&times;</button>
      </div>
      <div className="orderItem-inner" style={{ height }}>
        <div className="orderItem-inner__height" ref={ref}>
          <table>
            <tbody>
              <tr>
                <td>Имя:</td>
                <td className="bold">{order.firstname}</td>
              </tr>
              {order.lastname && <tr>
                <td>Фамилия:</td>
                <td className="bold">{order.lastname}</td>
              </tr>}
              <tr>
                <td>E-mail:</td>
                <td className="bold"><a href={`mailto:${order.email}`}>{order.email}</a></td>
              </tr>
              <tr>
                <td>Телефон:</td>
                <td className="bold">{order.tel}</td>
              </tr>
              <tr>
                <td>Сумма заказа:</td>
                <td className="bold">${order.total}</td>
              </tr>
              <tr>
                <td>Статус:</td>
                <td className="bold">
                  <span className={`status status-${order.status}`}>
                    {order.status === 'process' && 'В обработке'}
                    {order.status === 'cancel' && 'Отменен'}
                    {order.status === 'complete' && 'Комплектуется'}
                    {order.status === 'onway' && 'В пути'}
                    {order.status === 'delivered' && 'Доставлен'}
                    {order.status === 'done' && 'Завершен'}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <h6>Состав заказа</h6>
          <ul className="orderItem-list">
            {order.orders.map(el => <li key={el.id}><b>{el.title}</b> (${el.price}) <span>Кол-во: {el.count}</span></li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default OrderItem