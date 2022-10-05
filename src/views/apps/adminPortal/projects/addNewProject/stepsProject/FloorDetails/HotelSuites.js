// ** React Imports
import { Fragment, useState, useContext } from 'react'

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs'

import Repeater from '@components/repeater'
import { X, Plus, Minus, Check } from 'react-feather'
// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  Form,
  Label,
  Input,
  Button,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  InputGroup,
  InputGroupText
} from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { updateFloorInnerProperties } from '../../../../redux/addNewProject/store'

import InputNumber from 'rc-input-number'

const nohotelSuites = props => {
  // ** Store Variables
  const dispatch = useDispatch()
  const store = useSelector(state => state.addNewProject)

  const [open, setOpen] = useState('')
  const toggleopen = id => {
    open === id ? setOpen() : setOpen(id)
  }
  
  return (
    <Row className='justify-content-between align-items-center'>
      {store.projectData.floors[props.i].noHotelSuites > 0 && (
        <Accordion className='accordion-border' open={open} toggle={toggleopen}>
          <Card>
            <CardHeader>
              <h4 className='card-title'>
                Total hotelSuites:{' '}
                {store.projectData.floors[props.i].noHotelSuites}:{' '}
              </h4>
            </CardHeader>
            
            <Row className='mt-1'>
                  <h4 className='card-title'>
                  Hotels Suites Details
                  </h4>
                  <Row>
                    <Col md={3} className="h4 text-center">Hotel Suite#</Col>
                    <Col md={2} className="h4 text-center">Price Per Sq.Ft</Col>
                    <Col md={2} className="h4 text-center">length</Col>
                    <Col md={2} className="h4 text-center">width</Col>
                    <Col md={2} className="h4 text-center">Total Cost</Col>
                  </Row>
                  <Repeater count={store.projectData.floors[props.i].noHotelSuites}>
                  {ii => ( 
                    <Row className='mt-2'>
                     
                      <Col md={3} className="text-center">Hotel Suite {ii + 1}</Col>
                      <Col md={2} className="text-center">
                        <Input 
                        readOnly
                        type='number' 
                        id={`HotelSuites-price-${ii}`}
                              placeholder='0'
                              value={store.projectData.floors[props.i].priceHotelSuites}
                              onChange={e => {
                               
                              }}
                        />
                      </Col>
                      <Col md={2} className="text-center">
                        <Input
                        type='number'
                        id={`HotelSuites-length-${ii}`}
                        placeholder='0'
                        value={
                            store.projectData.floors[props.i].hotelSuites[ii]
                            .length
                        }
                        onChange={e => {
                          dispatch(
                            updateFloorInnerProperties([
                              e.target.value,
                              'floors',
                              props.i,
                              'hotelSuites',
                              ii,
                              'length'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              // (store.projectData.floors[props.i].priceHotelSuites * e.target.value),
                              ((store.projectData.floors[props.i].priceHotelSuites) * (e.target.value) * (store.projectData.floors[props.i].hotelSuites[ii].width)),
                              // ((store.projectData.floors[i].hotelSuites[i].length * store.projectData.floors[i].hotelSuites[i].width) * (e.target.value)),
                              // (store.projectData.floors[props.i].priceHotelSuites * store.projectData.floors[props.i].hotelSuites[ii].length * e.target.value),
                              'floors',
                              props.i,
                              'hotelSuites',
                              ii,
                              'totalCost'
                            ])
                          )
                        }}
                        />
                      </Col>
                      <Col md={2} className="text-center">
                        <Input
                        type='number'
                        id={`hotelSuitest-width-${ii}`}
                        placeholder='0'
                        value={
                            store.projectData.floors[props.i].hotelSuites[ii]
                            .width
                        }
                        onChange={e => {
                          dispatch(
                            updateFloorInnerProperties([
                              e.target.value,
                              'floors',
                              props.i,
                              'hotelSuites',
                              ii,
                              'width'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              // (store.projectData.floors[props.i].priceHotelSuites * e.target.value),
                              ((store.projectData.floors[props.i].priceHotelSuites) * (e.target.value) * (store.projectData.floors[props.i].hotelSuites[ii].length)),
                              // ((store.projectData.floors[props.i].hotelSuites[ii].length * store.projectData.floors[props.i].hotelSuites[ii].width) * (e.target.value)),
                              // (store.projectData.floors[props.i].priceHotelSuites * store.projectData.floors[props.i].hotelSuites[ii].width * e.target.value),
                              'floors',
                              props.i,
                              'hotelSuites',
                              ii,
                              'totalCost'
                            ])
                          )
                        }}
                        />
                      </Col>
                    
                      <Col md={2} className="text-center">
                        {/* {store.projectData.floors[props.i].hotelSuites[ii].totalCost} */}
             {/* {((store.projectData.floors[props.i].priceHotelSuites) * (store.projectData.floors[props.i].hotelSuites[ii].length * store.projectData.floors[props.i].hotelSuites[ii].width)) } */}
                  {store.projectData.floors[props.i].hotelSuites[ii].totalCost}
                      </Col>
                    </Row>  
                  )}
                  </Repeater>
                  </Row>

          </Card>
        </Accordion>
      )}
    </Row>
  )
}
export default nohotelSuites
