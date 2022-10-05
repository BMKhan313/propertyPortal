import React from 'react'
import { Col, Row } from 'reactstrap'
import '../User.css'

const SectionDivider = () => {
  return (
    <div className='section__divider'>
            <Col md={12} className='ssub__title d-flex align-items-center justify-content-center h-100 text-white'>
                <div className=' border-light border-2 p-2 rounded-3'>SOLUTIONS FOR BUSINESSES</div>
            </Col>
    </div>
  )
}

export default SectionDivider