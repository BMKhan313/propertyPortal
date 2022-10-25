// ** React Imports
import { Fragment, useState, useContext } from 'react'

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs'
// mui
import Switch from '@mui/material/Switch';

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
  const [checked, setChecked] = useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked) 
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
                  <Col className='mb-md-0 mb-1' md='6' sm='12'>
                   <div className='d-flex align-items-center'>
                    <div>
                      <Label
                       for='icon-primary'
                     >
                      <h4 className='payment__text'> Do you have area ? </h4>
                     </Label>
                     </div>
                      <div className='form-switch form-check-primary '>
                      <Switch
                   checked={ checked   }
                   className='mb-50'
                   onChange={e=>
                    {
                      handleChange(e);     
                    }
                    }
                    />
                      </div>
                    </div>
                   
                  </Col>
                  <Row>
                    <Col md={3} className="h4 text-center payment__text">Apartment #</Col>
                    <Col md={2} className="h4 text-center payment__text">Price Per Sq.Ft</Col>
                    { checked ?
                   <> 
                    <Col md={3} className="h4 text-center payment__text">Area</Col>
                   </>
                     :
                     <>
                     <Col md={2} className="h4 text-center payment__text">length</Col>
                    <Col md={2} className="h4 text-center payment__text">width</Col>
                     </>
                     }
                    <Col md={2} className="h4 text-center payment__text">Total Cost (Rs)</Col>
                  </Row>
                  <Repeater count={store.projectData.floors[props.i].noApartments}>
                  {ii => ( 
                    <Row className='mt-2'>
                     
                      <Col md={3} className="text-center">Apartment {ii + 1}</Col>
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
                      { checked ? 
                    (
                      <>
                     <Col md={3} className="text-center">
                         <Input
                        type='number'
                        id={`Apartment-isArea-${ii}`}
                        placeholder='0'
                        value={
                            store.projectData.floors[props.i].apartments[ii]
                            .wholeAreaOfAparment
                        }
                        onFocus = { e => {
                          // iterate a number over an array
                          //make array from number
                      {  const n =  store.projectData.floors[props.i].noApartments;
                        [...Array(n)].forEach((data, index)=> {
                          
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'apartments',
                              index,
                              'length'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'apartments',
                              index,
                              'width'
                            ])
                          )
                        })
                        }
                        }}
                        onChange={e => {
                          dispatch(
                            updateFloorInnerProperties([
                              e.target.value,
                              'floors',
                              props.i,
                              'apartments',
                              ii,
                              'wholeAreaOfAparment'
                            ])
                          )
                          
                          dispatch(
                            updateFloorInnerProperties([
                              // (store.projectData.floors[props.i].priceApartments * e.target.value),
                         ((store.projectData.floors[props.i].priceApartments) * (e.target.value)) , 
                              // (store.projectData.floors[props.i].priceApartments * store.projectData.floors[props.i].apartments[ii].width * e.target.value),
                              'floors',
                              props.i,
                              'apartments',
                              ii,
                              'totalCost'
                            ])
                          )
                           
                        
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'apartments',
                              ii,
                              'downPaymentPercentage' 
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'apartments',
                              ii,
                               'paymentYears'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'apartments',
                              ii,
                              'installmentPerDuration'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'apartments',
                              ii,
                              'cashDownPayment'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'apartments',
                              ii,
                              'arrearsInstallmentPerPeriod'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'apartments',
                              ii,
                              'downPaymentRs' 
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'apartments',
                              ii,
                               'remainingRs'
                            ])
                          )
                        }}
                        />
                      </Col>
                      </>
                      )
                    : 
                      ( 
                    <>  
                 <Col md={2} className="text-center">
                        <Input
                        type='number'
                        id={`Apartment-length-${ii}`}
                        placeholder='0'
                        value={
                            store.projectData.floors[props.i].apartments[ii]
                            .length
                        }
                        onFocus={e => {
                          {  const n =  store.projectData.floors[props.i].noApartments;
                            [...Array(n)].forEach((data, index)=> {
                              
                              dispatch(
                                updateFloorInnerProperties([
                                  0,
                                  'floors',
                                  props.i,
                                  'apartments',
                                  index,
                                  'wholeAreaOfAparment'
                                ])
                              )
                            
                            })
                            }
                        }}
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
                         ((store.projectData.floors[props.i].priceApartments) * (e.target.value) * (store.projectData.floors[props.i].apartments[ii].width)) ,
                              // ((store.projectData.floors[props.i].apartments[ii].length * store.projectData.floors[props.i].apartments[ii].width) * (e.target.value)),
                              // (store.projectData.floors[props.i].priceApartments * store.projectData.floors[props.i].apartments[ii].length * e.target.value),
                              'floors',
                              props.i,
                              'apartments',
                              ii,
                              'totalCost'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'apartments',
                              ii,
                              'wholeAreaOfAparment'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'apartments',
                              ii,
                              'downPaymentPercentage' 
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'apartments',
                              ii,
                              'downPaymentRs' 
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'apartments',
                              ii,
                               'remainingRs'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'apartments',
                              ii,
                               'paymentYears'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'apartments',
                              ii,
                              'installmentPerDuration'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'apartments',
                              ii,
                              'cashDownPayment'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'apartments',
                              ii,
                              'arrearsInstallmentPerPeriod'
                            ])
                          )
                         
                        }}
                        />
                      </Col>
                      <Col md={2} className="text-center">
                        <Input
                        type='number'
                        id={`Apartment-width-${ii}`}
                        placeholder='0'
                        value={
                            store.projectData.floors[props.i].apartments[ii]
                            .width
                        }
                        onFocus={e => {
                          {  const n =  store.projectData.floors[props.i].noApartments;
                            [...Array(n)].forEach((data, index)=> {
                              
                              dispatch(
                                updateFloorInnerProperties([
                                  0,
                                  'floors',
                                  props.i,
                                  'apartments',
                                  index,
                                  'wholeAreaOfAparment'
                                ])
                              )
                            
                            })
                            }
                        }}
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
                        ((store.projectData.floors[props.i].priceApartments) * (e.target.value) * (store.projectData.floors[props.i].apartments[ii].length)) ,
                              // ((store.projectData.floors[props.i].apartments[ii].length * store.projectData.floors[props.i].apartments[ii].width) * (e.target.value)),
                              // (store.projectData.floors[props.i].priceApartments * store.projectData.floors[props.i].apartments[ii].width * e.target.value),
                              'floors',
                              props.i,
                              'apartments',
                              ii,
                              'totalCost'
                            ])
                          )
                         
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'apartments',
                              ii,
                              'wholeAreaOfAparment'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'apartments',
                              ii,
                              'downPaymentPercentage' 
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'apartments',
                              ii,
                               'paymentYears'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'apartments',
                              ii,
                              'installmentPerDuration'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'apartments',
                              ii,
                              'cashDownPayment'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'apartments',
                              ii,
                              'arrearsInstallmentPerPeriod'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'apartments',
                              ii,
                              'downPaymentRs' 
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'apartments',
                              ii,
                               'remainingRs'
                            ])
                          )
                        }}
                        />
                      </Col>
                     </>
                      )
                      } 
                      
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
