import React, {useState, useRef} from 'react'
import { Search, X } from 'react-feather'
import { Button, Col, Row } from 'reactstrap'
import '../User.css'
import { Box, styled, Typography, Divider } from '@mui/material'

const Header = () => {

    const [houseType, setHouseType] = useState('Rent')
    const [menu, setMenu] = useState(false)
    const cutMenu = useRef(null)
    const [cities, setCities] = useState([])

    const closeOpenMenu = (e) => {
        if (cutMenu.current && (menu) && !cutMenu.current.contains(e.target)) {
          setMenu(false)
        }
    }

    const storeValue = (addCity) => {
        const newCity = [...cities]
        if (!newCity.includes(addCity)) {
            newCity.push(addCity)
            setCities(newCity) 
        }
    }

    const removeCity = (currentCity) => {
        console.log("CurrentCity", currentCity)
        const newCities = [...cities]
        setCities(newCities.filter((i) => (i !== currentCity)))
    }

    document.addEventListener('mousedown', closeOpenMenu)

    const dropDown = [
        {
            id: 1,
            city: 'Peshawar'
        },
        {
            id: 2,
            city: 'Islamabad'
        },
        {
            id: 3,
            city: 'Karachi'
        },
        {
            id: 4,
            city: 'RawalPindi'
        },
        {
            id: 5,
            city: 'Lahore'
        },
        {
            id: 6,
            city: 'Faisalabad'
        },
        {
            id: 7,
            city: 'Peshawar'
        },
        {
            id: 8,
            city: 'Multan'
        }
    ]

  return (
    <div className='user__header'
    onClick={() => {
        if (menu) {
            setMenu(false)
        }
    }}
    >
        <Row className='justify-content-between p-2 z-index-2'>
                <Col md={2} >
                    <h2 className="text-white">Property Portal</h2>
                </Col>

                <Col md={2} >
                    <h2 className="text-white">UserName</h2>
                </Col>
        </Row>

        <div className='row search__box pt-5'>
            <Col md={12} className="d-flex justify-content-center">
            <h2 className="text-white">Find Your Favorite Plots</h2>
            </Col>

            <Col md={12} className="d-flex justify-content-center">
                <Button 
                outline 
                style={{
                    backgroundColor: houseType === 'Rent' ? '#fff' : ''
                }}
                onClick={() => {
                    setHouseType('Rent')
                }}
                >
                    Rent
                </Button>

                <Button 
                outline
                style={{
                    backgroundColor: houseType === 'Buy' ? '#fff' : '',
                    marginLeft: 2
                }}
                onClick={() => {
                    setHouseType('Buy')
                }}
                >
                    Buy
                </Button>
            </Col>

            <Box  className="d-flex justify-content-center mt-4 ">
                <Box  className="bg-white p-1 col-md-4 col-sm-8 "  onClick={() => setMenu(true)}>
                    <div className='text-dark'>Location</div>

                    {
                        cities.length === 0 ? <div>City, Area etc</div> : (
                            <Box>
                                <Box className='d-flex dropdown__cities__wrapper' >
                                {
                                cities.map((disCity, index) => {
                                    return (
                                        <Box className='dropdown__cities'>
                                         {disCity}
                                         <Box className='close__icon__wrapper'>
                                         <X size={14} color="#000" className='cross__icon' onClick={() => {
                                            removeCity(disCity)
                                            setMenu(false)
                                            }} />
                                         </Box>
                                        </Box>
                                    )
                                })
                            }
                            </Box>
                            </Box>
                        )
                    }
                </Box>

                <Col md={2} className="d-flex p-1 bg-white border-dark border-left-2 border-top-0 border-bottom-0">

                    <div>
                    <div className='font-weight-700'>Property Type</div>
                    <div>All</div>
                    </div>

                    <div className='bg-success d-flex align-items-center p-1 mx-3 rounded-2'>
                        <Search size={24} color="#fff" />
                    </div>
                </Col>
            </Box>
        </div>

        {
            !menu ? '' : (
                <Col md={12} className="d-flex justify-content-center mt-1">
                <Col md={4} className="bg-white">
                {
                    dropDown.map((city, index) => {
                        return (
                            <div className='city__options'
                            onClick={() => storeValue(city.city)}
                            >
                                {city.city}
                            </div>
                        )
                    })
                }
                </Col>
                <Col md={2}></Col>
                </Col>
            )
        }

    </div>
  )
}

export default Header