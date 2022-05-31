import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_USERS, REMOVE_USER } from '../../helpers'
import { userType } from '../../interfaces'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from '../../store/authSlice'
import { RootState } from '../../store/store'

type modData = {
  id: string
  email: string
}

const Users: React.FC = () => {
  const { data, loading } = useQuery(ALL_USERS)
  const [users, setUsers] = useState<userType[]>([])
  const [modal, setModal] = useState<boolean>(false)
  const [modData, setModData] = useState<modData>({ id: '', email: '' })
  const [ removeUser ] = useMutation(REMOVE_USER, { refetchQueries: [ALL_USERS] })
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth.user)

  useEffect(() => {
    if (data !== undefined) setUsers(data.getAllUsers)
  }, [data])

  // removeHandler
  const removeHandler = (id: string, email: string) => {
    setModal(true)
    setModData({ id, email })
  }

  // removeFunc
  const removeFunc = (email: string) => {
    removeUser({ variables: { email } })
    setModal(false)
    dispatch(toast('Пользователь успешно удален'))
  }

  return (
    <div>
      <h4>Список пользователей</h4>

      <table className="table table-striped table-users">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Firstname</th>
            <th scope="col">Lastname</th>
            <th scope="col">E-mail</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
          {!loading ? 
            users.map(({ id, email, role, firstname, lastname }, index) => (
              <tr key={id}>
                <th scope="row">{index + 1}</th>
                <td>{firstname}</td>
                <td>{lastname}</td>
                <td>{email}</td>
                <td>{role}</td>
                <td className="text-end">
                  {email !== user.email && <button className="btn btn-warning btn-message"></button>}
                  {
                    user && user.role === 'admin' && (email !== user.email) &&
                    <button className="btn btn-danger" onClick={() => removeHandler(id, email)}>&times;</button>
                  }
                </td>
              </tr>
            )) :
            <tr>
              <td colSpan={4}>Loading...</td>
            </tr>
          }
        </tbody>
      </table>


      <Modal show={modal} onHide={() => setModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Удаление пользователя</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Подтверждаете удаление пользователя<br /> <b>"{modData.email}"</b>?
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setModal(false)}>Отмена</button>
          <button className="btn btn-danger" onClick={() => removeFunc(modData.email)}>Удалить</button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default Users