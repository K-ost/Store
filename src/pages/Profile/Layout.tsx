import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/store'
import { login } from '../../store/authSlice'
import { Modal, ModalHeader, ModalTitle, ModalFooter, Container, Row, Col } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import Navmenu from './Navmenu'


const Layout: React.FC = () => {
  const [modalShow, setModalShow] = useState<boolean>(false)
  const user = useSelector((state: RootState) => state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // logoutFunc
  const logoutFunc = () => {
    localStorage.removeItem('auth')
    dispatch(login(null))
    setModalShow(false)
    navigate('/')
  }

  useEffect(() => {
    const auth = localStorage.getItem('auth')
    if (auth === 'null') {
      navigate('/')
    }
  }, [navigate, user])

  return (
    <Container>
      <h1>Личный кабинет</h1>
      <Row>
        <Col sm="12" md="3">
          <h4>Привет, {user && user.firstname}</h4>
          <Navmenu />
          <button className="btn btn-secondary w-100 mb-4" onClick={() => setModalShow(true)}>Выход</button>
        </Col>
        <Col sm="12" md="9">
          <Outlet />
        </Col>
      </Row>
      
      <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
        <ModalHeader closeButton>
          <ModalTitle>Уверены что хотите выйти</ModalTitle>
        </ModalHeader>
        <ModalFooter>
          <button className="btn btn-secondary" onClick={() => setModalShow(false)}>Отмена</button>
          <button className="btn btn-danger" onClick={logoutFunc}>Выйти</button>
        </ModalFooter>
      </Modal>
    </Container>
  )
}

export default Layout