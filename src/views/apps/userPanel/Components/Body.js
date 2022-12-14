import React, { useState } from 'react'
import { ArrowLeft, ArrowRight, Home } from 'react-feather'
import { Button, Col, Row } from 'reactstrap'
import {homes} from '../Data/homesData'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import { useHistory } from 'react-router-dom'
import InnerBody from './RentDetails/InnerDetails/InnerBody'
import RentDetails from '../Pages/RentDetails'
import { Box, styled, Typography, Divider } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
// import store from '../../adminPortal/redux/addNewProject/store'
import { getAllCities, getValuesFromUserFilter } from '../../adminPortal/redux/addNewProject/store'

const getItems = () =>
  Array(20)
    .fill(0)
    .map((_, ind) => ({ id: `element-${ind}` }))

const Body = () => {

  const store = useSelector(state => state.addNewProject)
    const dispatch = useDispatch()
    const [city, setCity] = useState(homes)
    const [residentialType, setResidentialType] = useState('')
    const history = useHistory()
    
    const filterResult = (catItem) => {
      const result = homes.filter((currentData)=> {
         return currentData.city === catItem
      })
      setCity(result)
    }
    // console.log('filter city ....',city)
    // console.log('filter resi ....',residentialType)
    function LeftArrow() {
        const { isFirstItemVisible, scrollPrev } =
          React.useContext(VisibilityContext)
      
        return (
          <div disabled={isFirstItemVisible} onClick={() => scrollPrev()}
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
          >
            <ArrowLeft style={{cursor: 'pointer'}} />
          </div>
        )
      }
      
      function RightArrow() {
        const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext)
      
        return (
          <div disabled={isLastItemVisible} onClick={() => scrollNext()}
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
          >
            <ArrowRight style={{cursor: 'pointer'}} />
          </div>
        )
      }

      function Card({ onClick, selected, title, rent, sale, image }) {
        const visibility = React.useContext(VisibilityContext)
      
        return (
          <div className='body__house__card'>
            <div>
                <img src={image} className="scroller__image" />
                <div>{title}</div>
            </div>

            <hr style={{width: '90%', marginLeft: 'auto', marginRight: 'auto', height: 1, color: '#808080'}} />
            <div className='d-flex justify-content-around w-100'>
                <div className='scroller__bottom'
                onClick={() => history.push('rentDetails')}
                >
                <div className='d-flex align-items-center justify-content-center'>
                    <Home size={18} />
                    <div style={{fontSize: 12, marginLeft: 4}}>{rent}</div>
                </div>
                <div className='houses__type'>On Rent</div>
                </div>

                <div className='scroller__bottom'>
                <div className='d-flex align-items-center'>
                <Home size={18} />
                    <div style={{fontSize: 12, marginLeft: 4}}>{sale}</div>
                </div>
                <div className='houses__type'>For Sale</div>
                </div>

            </div>
          </div>
        )
      }

    const [items, setItems] = useState(getItems)
    const [selected, setSelected] = useState([])
    const [position, setPosition] = useState(0)

    const isItemSelected = (id) => !!selected.find((el) => el === id)

    const handleClick =
    (id) =>
    ({ getItemById, scrollToItem }) => {
      const itemSelected = isItemSelected(id)

      setSelected((currentSelected) => {
        itemSelected
          ? currentSelected.filter((el) => el !== id)
          : currentSelected.concat(id)
      }
      )
    }
    // console.log('hariskhan_userpanel',store.userPanel) 

  return (
    <div className='user__body'>
        <Row className='mt-5'>
            <div className='body__section__title'>Filters</div>
        </Row>

        <Box className=''>
            <Box className='row body__section__buttons'>
            <Button 
            className='col-5 col-md-3 col-sm-4 col-lg-1'
            outline onClick={() => 
              setCity(homes)
            } 
            style={{backgroundColor: city === true ? '#0000ff80' : '', 
            color: city === true ? 'white' : '',
            fontSize: 12, 
            padding: 8
          }}
            >All Cities</Button>

            <Button 
            className='col-5 col-md-3 col-sm-4 col-lg-1'
             outline onClick={
              (e) => { 
                filterResult('Islamabad')
              dispatch(
                getValuesFromUserFilter(
                 { 
                  cityName: 'Islamabad'
                }
                )
              )
              
            } }
            style={{backgroundColor: store.userPanel.cityName === 'Islamabad' ? '#0000ff80' : '', 
            color: store.userPanel.cityName === 'Islamabad' ? 'white' : '',
            fontSize: 12,
            padding: 8
        }}
            >Islamabad</Button>

            <Button
            className='col-5 col-md-3 col-sm-4 col-lg-1'
            outline onClick={
              (e) => { 
                filterResult('Peshawar') 
              dispatch(
                getValuesFromUserFilter(
                 { 
                  cityName: 'Peshawar'
                }
                )
              )
              
            } }
            style={{backgroundColor: store.userPanel.cityName === 'Peshawar' ? '#0000ff80' : '', 
            color: store.userPanel.cityName === 'Peshawar' ? 'white' : '',
            fontSize: 12, 
            padding: 8
        }}
            >Peshawar</Button>
            <Button 
            className='col-5 col-md-3 col-sm-4 col-lg-1'
            outline onClick={
              (e) => { 
                filterResult('Rawalpindi')
              dispatch(
                getValuesFromUserFilter(
                 { 
                  cityName: 'Rawalpindi'
                }
                )
              )
            } }
            style={{backgroundColor: store.userPanel.cityName === 'Rawalpindi' ? '#0000ff80' : '', 
            color: store.userPanel.cityName === 'Rawalpindi' ? 'white' : '',
            fontSize: 12,
            padding: 8
        }}
            >Rawalpindi</Button>

            <Button 
            className='col-5 col-md-3 col-sm-4 col-lg-1'
            outline onClick={
              (e) => { 
                filterResult('Lahore'),
              dispatch(
                getValuesFromUserFilter(
                 { 
                  cityName: 'Lahore'
                }
                ),
                
              )
              
            } }
            style={{backgroundColor: store.userPanel.cityName === 'Lahore' ? '#0000ff80' : '', 
            color: store.userPanel.cityName === 'Lahore' ? 'white' : '',
            fontSize: 12,
            padding: 8
        }}
            >Lahore</Button>
            <Button 
            className='col-5 col-md-3 col-sm-4 col-lg-1'
            outline onClick={
              (e) => { 
                filterResult('Karachi'),
              dispatch(
                getValuesFromUserFilter(
                 { 
                  cityName: 'Karachi'
                }
                ),
                
              )
              
            } } 
            style={{backgroundColor: store.userPanel.cityName === 'Karachi' ? '#0000ff80' : '', 
            color: store.userPanel.cityName === 'Karachi' ? 'white' : '',
            fontSize: 12,
            padding: 8
        }}
            >Karachi</Button>
            </Box>
        </Box>
        {/* types */}
        <Box className=''>
        <Box className='body__section__buttons row'>
            <Button 
            className='col-5 col-md-3 col-sm-4 col-lg-1'
            outline onClick={() => setResidentialType('AllResidentialTypes')} 
            style={{backgroundColor: residentialType === 'homes' ? '#0000ff80' : '', 
            color: residentialType === 'homes' ? '#fff' : '',
            fontSize: 12,
            padding: 8 }}
            >All Types</Button>

            <Button 
            className='col-5 col-md-3 col-sm-4 col-lg-1'
            outline onClick={() => setResidentialType('foodCourt')} 
            style={{backgroundColor: residentialType === 'foodCourt' ? '#0000ff80' : '', 
            color: residentialType === 'foodCourt' ? '#fff' : '',
            fontSize: 12,
            padding: 8
        }}
            >Food Court</Button>
            <Button 
            className='col-5 col-md-3 col-sm-4 col-lg-1'
            outline onClick={() => setResidentialType('Apartment')}
            style={{backgroundColor: residentialType === 'Apartment' ? '#0000ff80' : '', 
            color: residentialType === 'Apartment' ? '#fff' : '',
            fontSize: 12,
            padding: 8
        }}
            >Apartment</Button>
            <Button 
            className='col-5 col-md-3 col-sm-4 col-lg-2'
            outline onClick={() => {
              setResidentialType('serviceApartment')
            }}
            style={{backgroundColor: residentialType === 'serviceApartment' ? '#0000ff80' : '', 
            color: residentialType === 'serviceApartment' ? '#fff' : '',
            fontSize: 12,
            padding: 8
        }}
            >Service Apartment</Button>
            <Button 
            className='col-5 col-md-3 col-sm-4 col-lg-1'
            outline onClick={() => setResidentialType('Shop')}
            style={{backgroundColor: residentialType === 'Shop' ? '#0000ff80' : '', 
            color: residentialType === 'Shop' ? '#fff' : '',
            fontSize: 12,
            padding: 8
        }}
            >Shop</Button>

            <Button 
            className='col-5 col-md-3 col-sm-4 col-lg-2'
            outline onClick={() => setResidentialType('hotelSuite')}
            style={{backgroundColor: residentialType === 'hotelSuite' ? '#0000ff80' : '', 
            color: residentialType === 'hotelSuite' ? '#fff' : '',
            fontSize: 12,
            padding: 8
        }}
            >Hotel Suites</Button>
            <Button 
            className='col-5 col-md-3 col-sm-4 col-lg-2'
            outline onClick={() => setResidentialType('corporateOffice')}
            style={{backgroundColor: residentialType === 'corporateOffice' ? '#0000ff80' : '', 
            color: residentialType === 'corporateOffice' ? '#fff' : '',
            fontSize: 12,
            padding: 8
        }}
            >Carporate Office</Button>
            </Box>
        </Box>
        <RentDetails city={city} residentialType={residentialType}/>
        
    </div>
  )
}

export default Body