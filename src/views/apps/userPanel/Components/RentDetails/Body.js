import React from 'react'
import { Button, Col, Row } from 'reactstrap'
import '../../User.css'
import { rentHouses } from '../../Data/rentHouses'
import BedIcon from '@mui/icons-material/Bed'
import BathtubIcon from '@mui/icons-material/Bathtub'
import { useHistory } from 'react-router-dom'


const Body = () => {

  const history = useHistory()
  
  return (
    <div className='rent__det__body'>
      <Row>
      {
        rentHouses.map((house, index) => {
          return (
            <Col md={3} className="mb-3">
            <div className='rent__det__wrapper'>
                <div className='d-flex rent__det__header align-items-end cursor-pointer' style={{
                  backgroundImage: `url(${house.image})`
                }}
                onClick={() => history.push('rentInnerDetails')}
                >
                  <div className='text-light rent__house__location'>
                    <BedIcon style={{color: '#fff'}} /> 5
                    <BathtubIcon style={{color: '#fff'}} /> 3
                  </div>
                </div>

                <div className='rent__det__footer'>
                    <div className='rent__det__price'>PKR {house.price}</div>

                    <div className='rent__det__area'>
                      {house.area} Sq.Ft
                    </div>

                </div>
            </div>
            </Col>
          )
        })
      }
      </Row>
    </div>
  )
}

export default Body