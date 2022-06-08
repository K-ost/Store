import React from 'react'
import { Container } from 'react-bootstrap'
import LatestComments from '../components/LatestComments/LatestComments'

const Home: React.FC = () => {
  return (
    <Container>
      <h1>Home page</h1>

      <LatestComments />
    </Container>
  )
}

export default Home