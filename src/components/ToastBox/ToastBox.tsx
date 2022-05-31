import React from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'
import './toast.scss'

interface IToast {
  toast: string
  show: boolean
  hide: () => void
}

const ToastBox: React.FC<IToast> = ({ hide, show, toast }) => {
  return (
    <ToastContainer position="bottom-end">
      <Toast show={show} onClose={hide} autohide delay={10000}>
        <Toast.Header>
          <strong className="me-auto">Bootstrap</strong>
          <small>1 s ago</small>
        </Toast.Header>
        <Toast.Body>{toast}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

export default ToastBox