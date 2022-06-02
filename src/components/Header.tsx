import React, { Fragment, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Cart from './Cart/Cart'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import Auth from './Auth/Auth'

const routes = [
  { id: "1", title: "Home", url: "/" },
  { id: "2", title: "Catalog", url: "/catalog" }
]

const Header: React.FC = () => {

  // Modal state
  const [show, setShow] = useState(false)

  // Auth state redux
  const auth = useSelector((state: RootState) => state.auth.user)

  return (
    <Fragment>
      <header className="header">
        <Container>
          <h4 className="d-none d-md-block">React.JS / TypeScript / Redux / GraphQL</h4>
          <ul className="nav nav-pills">
            {routes.map(({ id, title, url }) => (
              <li className="nav-item" key={id}>
                <NavLink className={`nav-link ${(isActive) => isActive && 'active'}`} to={url}>{title}</NavLink>
              </li>
            ))}
          </ul>
          {auth
            ? <Link to="/profile" className="btn btn-secondary btn-user"></Link>
            : <button className="btn btn-secondary btn-lock" onClick={() => setShow(true)}></button>
          }
          <Cart />
        </Container>
      </header>
      
      <Auth show={show} hide={() => setShow(false)} />
    </Fragment>
  )
}

export default Header