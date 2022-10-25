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

const nohotelSuites = props => {
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
                    <Col md={3} className="h4 text-center payment__text">Hotel Suites #</Col>
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
                      { checked ? 
                    (
                      <>
                     <Col md={3} className="text-center">
                         <Input
                        type='number'
                        id={`HotelSuite-isArea-${ii}`}
                        placeholder='0'
                        value={
                            store.projectData.floors[props.i].hotelSuites[ii]
                            .wholeAreaOfHotelSuites
                        }
                        onFocus = { e => {
                          // iterate a number over an array
                          //make array from number
                      {  const n =  store.projectData.floors[props.i].noHotelSuites;
                        [...Array(n)].forEach((data, index)=> {
                          
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'hotelSuites',
                              index,
                              'length'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'hotelSuites',
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
                              'hotelSuites',
                              ii,
                              'wholeAreaOfHotelSuites'
                            ])
                          )
                          
                          dispatch(
                            updateFloorInnerProperties([
                              // (store.projectData.floors[props.i].priceHotelSuites * e.target.value),
                         ((store.projectData.floors[props.i].priceHotelSuites) * (e.target.value)) , 
                              // (store.projectData.floors[props.i].priceHotelSuites * store.projectData.floors[props.i].hotelSuites[ii].width * e.target.value),
                              'floors',
                              props.i,
                              'hotelSuites',
                              ii,
                              'totalCost'
                            ])
                          )
                           
                        
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'hotelSuites',
                              ii,
                              'downPaymentPercentage' 
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'hotelSuites',
                              ii,
                               'paymentYears'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'hotelSuites',
                              ii,
                              'installmentPerDuration'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'hotelSuites',
                              ii,
                              'cashDownPayment'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'hotelSuites',
                              ii,
                              'arrearsInstallmentPerPeriod'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'hotelSuites',
                              ii,
                              'downPaymentRs' 
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'hotelSuites',
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
                        id={`HotelSuite-length-${ii}`}
                        placeholder='0'
                        value={
                            store.projectData.floors[props.i].hotelSuites[ii]
                            .length
                        }
                        onFocus={e => {
                          {  const n =  store.projectData.floors[props.i].noHotelSuites;
                            [...Array(n)].forEach((data, index)=> {
                              
                              dispatch(
                                updateFloorInnerProperties([
                                  0,
                                  'floors',
                                  props.i,
                                  'hotelSuites',
                                  index,
                                  'wholeAreaOfHotelSuites'
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
                              'hotelSuites',
                              ii,
                              'length'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                         ((store.projectData.floors[props.i].priceHotelSuites) * (e.target.value) * (store.projectData.floors[props.i].hotelSuites[ii].width)) ,
                              // ((store.projectData.floors[props.i].hotelSuites[ii].length * store.projectData.floors[props.i].hotelSuites[ii].width) * (e.target.value)),
                              // (store.projectData.floors[props.i].priceHotelSuites * store.projectData.floors[props.i].hotelSuites[ii].length * e.target.value),
                              'floors',
                              props.i,
                              'hotelSuites',
                              ii,
                              'totalCost'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'hotelSuites',
                              ii,
                              'wholeAreaOfHotelSuites'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'hotelSuites',
                              ii,
                              'downPaymentPercentage' 
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'hotelSuites',
                              ii,
                              'downPaymentRs' 
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'hotelSuites',
                              ii,
                               'remainingRs'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'hotelSuites',
                              ii,
                               'paymentYears'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'hotelSuites',
                              ii,
                              'installmentPerDuration'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'hotelSuites',
                              ii,
                              'cashDownPayment'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'hotelSuites',
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
                        id={`HotelSuite-width-${ii}`}
                        placeholder='0'
                        value={
                            store.projectData.floors[props.i].hotelSuites[ii]
                            .width
                        }
                        onFocus={e => {
                          {  const n =  store.projectData.floors[props.i].noHotelSuites;
                            [...Array(n)].forEach((data, index)=> {
                              
                              dispatch(
                                updateFloorInnerProperties([
                                  0,
                                  'floors',
                                  props.i,
                                  'hotelSuites',
                                  index,
                                  'wholeAreaOfHotelSuites'
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
                              'hotelSuites',
                              ii,
                              'width'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              // (store.projectData.floors[props.i].priceHotelSuites * e.target.value),
                        ((store.projectData.floors[props.i].priceHotelSuites) * (e.target.value) * (store.projectData.floors[props.i].hotelSuites[ii].length)) ,
                              // ((store.projectData.floors[props.i].hotelSuites[ii].length * store.projectData.floors[props.i].hotelSuites[ii].width) * (e.target.value)),
                              // (store.projectData.floors[props.i].priceHotelSuites * store.projectData.floors[props.i].hotelSuites[ii].width * e.target.value),
                              'floors',
                              props.i,
                              'hotelSuites',
                              ii,
                              'totalCost'
                            ])
                          )
                         
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'hotelSuites',
                              ii,
                              'wholeAreaOfHotelSuites'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'hotelSuites',
                              ii,
                              'downPaymentPercentage' 
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'hotelSuites',
                              ii,
                               'paymentYears'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'hotelSuites',
                              ii,
                              'installmentPerDuration'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'hotelSuites',
                              ii,
                              'cashDownPayment'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'hotelSuites',
                              ii,
                              'arrearsInstallmentPerPeriod'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'hotelSuites',
                              ii,
                              'downPaymentRs' 
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'hotelSuites',
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
