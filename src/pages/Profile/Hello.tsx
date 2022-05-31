import React from 'react'
import { useSelector } from 'react-redux'
import { userType } from '../../interfaces'
import { RootState } from '../../store/store'

const Hello: React.FC = () => {
  const user: userType = useSelector((state: RootState) => state.auth.user)

  return (
    <div>
      <h4>Дашборд</h4>
      
      <table className="table table-striped">
        <tbody>
          <tr>
            <th scope="row">Имя</th>
            <td>{user?.firstname}</td>
          </tr>
          <tr>
            <th scope="row">Фамилия</th>
            <td>{user?.lastname}</td>
          </tr>
          <tr>
            <th scope="row">E-mail</th>
            <td><a href={user?.email}>{user?.email}</a></td>
          </tr>
          <tr>
            <th scope="row">Роль</th>
            <td>{user?.role}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Hello