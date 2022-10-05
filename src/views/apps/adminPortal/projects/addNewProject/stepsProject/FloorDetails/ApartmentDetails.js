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

const noApartments = props => {
  // ** Store Variables
  const dispatch = useDispatch()
  const store = useSelector(state => state.addNewProject)

  const [open, setOpen] = useState('')
  const toggleopen = id => {
    open === id ? setOpen() : setOpen(id)
  }
  
  return (
    <Row className='justify-content-between align-items-center'>
      {store.projectData.floors[props.i].noApartments > 0 && (
        <Accordion className='accordion-border' open={open} toggle={toggleopen}>
          <Card>
            <CardHeader>
              <h4 className='card-title'>
                Total apartments:{' '}
                {store.projectData.floors[props.i].noApartments}:{' '}
              </h4>
            </CardHeader>
            
            <Row className='mt-1'>
                  <h4 className='card-title'>
                  Apartment Details
                  </h4>
                  <Row>
                    <Col md={3} className="h4 text-center">Apartments #</Col>
                    <Col md={2} className="h4 text-center">Price Per Sq.Ft</Col>
                    <Col md={2} className="h4 text-center">length</Col>
                    <Col md={2} className="h4 text-center">width</Col>
                    <Col md={2} className="h4 text-center">Total Cost (Rs)</Col>
                  </Row>
                  <Repeater count={store.projectData.floors[props.i].noApartments}>
                  {ii => ( 
                    <Row className='mt-2'>
                     
                      <Col md={3} className="text-center">Shop {ii + 1}</Col>
                      <Col md={2} className="text-center">
                        <Input 
                        readOnly
                        type='number' 
                        id={`apartment-price-${ii}`}
                              placeholder='0'
                              value={store.projectData.floors[props.i].priceApartments}
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'apartments',
                                    ii,
                                    'priceApartments'
                                  ])
                                )
                              
                                dispatch(
                                  updateFloorInnerProperties([
                                    ((store.projectData.floors[props.i].priceApartments) * (store.projectData.floors[props.i].apartments[ii].length * store.projectData.floors[props.i].apartments[ii].width)).toLocaleString(undefined, { maximumFractionDigits: 2 }).toLocaleString(undefined, { maximumFractionDigits: 2 }),
                                    'floors',
                                    props.i,
                                    'apartments',
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
                        id={`Shop-length-${ii}`}
                        placeholder='0'
                        value={
                            store.projectData.floors[props.i].apartments[ii]
                            .length
                        }
                        onChange={e => {
                          dispatch(
                            updateFloorInnerProperties([
                              e.target.value,
                              'floors',
                              props.i,
                              'apartments',
                              ii,
                              'length'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              // (store.projectData.floors[props.i].priceApartments * e.target.value),
                              ((store.projectData.floors[props.i].priceApartments) * (e.target.value) * (store.projectData.floors[props.i].apartments[ii].width)),
                              // ((store.projectData.floors[props.i].apartments[ii].length * store.projectData.floors[props.i].apartments[ii].width) * (e.target.value)),
                              // (store.projectData.floors[props.i].priceApartments * store.projectData.floors[props.i].apartments[ii].length * e.target.value),
                              'floors',
                              props.i,
                              'apartments',
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
                        id={`Shop-width-${ii}`}
                        placeholder='0'
                        value={
                            store.projectData.floors[props.i].apartments[ii]
                            .width
                        }
                        onChange={e => {
                          dispatch(
                            updateFloorInnerProperties([
                              e.target.value,
                              'floors',
                              props.i,
                              'apartments',
                              ii,
                              'width'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              // (store.projectData.floors[props.i].priceApartments * e.target.value),
                              ((store.projectData.floors[props.i].priceApartments) * (e.target.value) * (store.projectData.floors[props.i].apartments[ii].length)),
                              // ((store.projectData.floors[props.i].apartments[ii].length * store.projectData.floors[props.i].apartments[ii].width) * (e.target.value)),
                              // (store.projectData.floors[props.i].priceApartments * store.projectData.floors[props.i].apartments[ii].width * e.target.value),
                              'floors',
                              props.i,
                              'apartments',
                              ii,
                              'totalCost'
                            ])
                          )
                        }}
                        />
                      </Col>
                      {/* <Col md={3} className="text-center">
                        <Input
                        type='number'
                        id={`Shop-area-${ii}`}
                        placeholder='0'
                        value={
                            store.projectData.floors[props.i].apartments[ii]
                            .area
                        }
                        onChange={e => {
                          dispatch(
                            updateFloorInnerProperties([
                              e.target.value,
                              'floors',
                              props.i,
                              'apartments',
                              ii,
                              'area'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              (store.projectData.floors[props.i].priceApartments * e.target.value),
                              'floors',
                              props.i,
                              'apartments',
                              ii,
                              'totalCost'
                            ])
                          )
                        }}
                        />
                      </Col> */}
                      <Col md={2} className="text-center">
                        {/* {store.projectData.floors[props.i].apartments[ii].totalCost} */}
             {/* {((store.projectData.floors[props.i].priceApartments) * (store.projectData.floors[props.i].apartments[ii].length * store.projectData.floors[props.i].apartments[ii].width)) } */}
                  {store.projectData.floors[props.i].apartments[ii].totalCost}
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
export default noApartments
