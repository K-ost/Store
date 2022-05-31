import React from 'react'
import { Spinner } from 'react-bootstrap'
import './load.scss'

const Load: React.FC = () => {
  return (
    <div className="loadingbox">
      <div>Loading...</div>
      <Spinner animation="border" />
    </div>
  )
}

export default Load