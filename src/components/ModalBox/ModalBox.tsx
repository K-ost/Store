import React from 'react'
import { Modal } from 'react-bootstrap'
import './modal.scss'

interface IModalBox {
  btnClass?: string
  btnFunc?: () => void
  btnText?: string
  hide: () => void
  show: boolean
  title: string
  nofooter?: boolean
}

const ModalBox: React.FC<IModalBox> = ({ btnClass, btnFunc, btnText, children, hide, show, title, nofooter }) => {
  return (
    <Modal show={show} onHide={hide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      {!nofooter && <Modal.Footer>
        <button className="btn btn-secondary" onClick={hide}>Отмена</button>
        {btnText && <button className={`btn btn-${btnClass}`} onClick={btnFunc}>{btnText}</button>}
      </Modal.Footer>}
    </Modal>
  )
}

export default ModalBox