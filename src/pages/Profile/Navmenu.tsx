import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../store/store'
import { url } from '../../helpers'

const Navmenu = () => {
  const user = useSelector((state: RootState) => state.auth.user)

  return (
    <ul className="list-group">
      <li><Link to="/profile/" className="list-group-item list-group-item-action">Дашборд</Link></li>
      {user && user.role === 'admin' && 
        <>
          <li><Link to="/profile/add-product" className="list-group-item list-group-item-action">Добавить товар</Link></li>
          <li><Link to="/profile/all" className="list-group-item list-group-item-action">Редактировать товары</Link></li>
          <li><Link to="/profile/orders" className="list-group-item list-group-item-action">Заказы</Link></li>
        </>
      }
      <li><Link to="/profile/messages" className="list-group-item list-group-item-action">Личные сообщения</Link></li>
      <li><Link to="/profile/users" className="list-group-item list-group-item-action">Пользователи</Link></li>
      {user && user.role === 'admin' && 
        <li><a href={`${url}/graphql`} className="list-group-item list-group-item-action" rel="noreferrer" target="_blank">Server</a></li>
      }
    </ul>
  )
}

export default Navmenu