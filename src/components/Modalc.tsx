import React from 'react'
import { Modal, ModalTitle, ModalHeader, ModalFooter } from 'react-bootstrap'

type modalProps = {
  title: string
  show: boolean
  hide: () => void 
  remove: () => void 
}

const ModalCart: React.FC<modalProps> = ({ title, show, hide, remove }) => {
  return (
    <Modal show={show} onHide={hide} centered>
      <ModalHeader closeButton>
        <ModalTitle>{title}</ModalTitle>
      </ModalHeader>
      <ModalFooter>
        <button className="btn btn-secondary" onClick={hide}>Отмена</button>
        <button className="btn btn-danger" onClick={remove}>Удалить</button>
      </ModalFooter>
    </Modal>
  )
}

export default ModalCart