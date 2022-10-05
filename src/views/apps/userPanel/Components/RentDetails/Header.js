import React from 'react'
import { Row, Col } from 'reactstrap'
import '../../User.css'

const Header = () => {
  return (
    <div className='header__rent__details shadow-sm mb-1 rounded'>
        <Row className='justify-content-between p-1 z-index-2'>
                <Col md={2} >
                    <h2 className="details__header__text">Property Portal</h2>
                </Col>

                <Col md={2} >
                    <h3 className="details__header__text">UserName</h3>
                </Col>
        </Row>
    </div>
  )
}

export default Header