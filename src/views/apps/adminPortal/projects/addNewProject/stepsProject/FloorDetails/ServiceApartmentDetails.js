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
// mui
import Switch from '@mui/material/Switch';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { updateFloorInnerProperties } from '../../../../redux/addNewProject/store'

import InputNumber from 'rc-input-number'

const noserviceApartments = props => {
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
    {store.projectData.floors[props.i].noServiceApartments > 0 && (
      <Accordion className='accordion-border' open={open} toggle={toggleopen}>
        <Card>
          <CardHeader className='d-flex justify-content-center mt-1' >
           <div >
             <h5>
              Total service apartments: {store.projectData.floors[props.i].noServiceApartments} {' '}
            </h5>
            </div>
          </CardHeader>
          <div className='mt-1 row'>
                <h4 className='card-title'>
               Service Apartment Details
                </h4>
                <div className='mb-md-0'  md='6' sm='12'>
                 <div className='d-flex'>
                  <Label
                     for='icon-primary'
                     className='form-check-label mb-50'
                   >
                    <h4 className='mt-1'> Do you have area ? </h4>
                   </Label>
                    <div className='form-switch form-check-primary'>
                    <Switch
                  
                 checked={ checked   }
                 onChange={e=>
                  {
                    handleChange(e);     
                  }
                  }
                  />
                    </div>
                  </div>
                 
                </div>
              
                 <Repeater count={store.projectData.floors[props.i].noServiceApartments}>
                {ii => ( 
                  <Row className='mt-2 row d-flex '>
                   
                    <div className=" col-md-3 d-flex flex-wrap align-content-start mt-1 mb-1"><h4>ServiceApartment {ii + 1}</h4></div>
                    <div className="form-group text-center col-md-3 col-sm-3 d-flex flex-wrap align-content-start mb-2">
                    <h4 className='text-red-400'>Price/Sq.ft</h4>
                      <Input 
                      readOnly
                      type='number' 
                      id={`Apartment-price-${ii}`}
                            placeholder='0'
                            value={store.projectData.floors[props.i].priceServiceApartments}
                            onChange={e => {
                              dispatch(
                                updateFloorInnerProperties([
                                  e.target.value,
                                  'floors',
                                  props.i,
                                  'serviceApartments',
                                  ii,
                                  'priceServiceApartments'
                                ])
                              )
                            
                              dispatch(
                                updateFloorInnerProperties([
                                  ((store.projectData.floors[props.i].priceServiceApartments) * (store.projectData.floors[props.i].serviceApartments[ii].length * store.projectData.floors[props.i].serviceApartments[ii].width)).toLocaleString(undefined, { maximumFractionDigits: 2 }).toLocaleString(undefined, { maximumFractionDigits: 2 }),
                                  'floors',
                                  props.i,
                                  'serviceApartments',
                                  ii,
                                  'totalCost'
                                ])
                              )
                            }}
                      />
                    </div>
                   
                    { checked ? 
                  (
                    <> 
                   <div className="form-group text-center col-md-3 col-sm-4 d-flex flex-wrap align-content-start mb-1">
                   <h4>Area</h4>
                       <Input
                      //  className='bg-gray-600'
                      type='number'
                      className='payment_input'
                      id={`Apartment-isArea-${ii}`}
                      placeholder='0'
                      value={
                          store.projectData.floors[props.i].serviceApartments[ii]
                          .wholeAreaOfServiceApartments
                      }
                      onFocus = { e => {
                        e.target.select()
                        // iterate a number over an array
                        //make array from number
                    {  const n =  store.projectData.floors[props.i].noServiceApartments;
                      [...Array(n)].forEach((data, index)=> {
                        
                        dispatch(
                          updateFloorInnerProperties([
                            0,
                            'floors',
                            props.i,
                            'serviceApartments',
                            index,
                            'length'
                          ])
                        )
                        dispatch(
                          updateFloorInnerProperties([
                            0,
                            'floors',
                            props.i,
                            'serviceApartments',
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
                            'serviceApartments',
                            ii,
                            'wholeAreaOfServiceApartments'
                          ])
                        )
                        
                        dispatch(
                          updateFloorInnerProperties([
                            // (store.projectData.floors[props.i].priceServiceApartments * e.target.value),
                       ((store.projectData.floors[props.i].priceServiceApartments) * (e.target.value)) , 
                            // (store.projectData.floors[props.i].priceServiceApartments * store.projectData.floors[props.i].serviceApartments[ii].width * e.target.value),
                            'floors',
                            props.i,
                            'serviceApartments',
                            ii,
                            'totalCost'
                          ])
                        )
                         
                      
                        dispatch(
                          updateFloorInnerProperties([
                            0,
                            'floors',
                            props.i,
                            'serviceApartments',
                            ii,
                            'downPaymentPercentage' 
                          ])
                        )
                        dispatch(
                          updateFloorInnerProperties([
                            0,
                            'floors',
                            props.i,
                            'serviceApartments',
                            ii,
                             'paymentYears'
                          ])
                        )
                        dispatch(
                          updateFloorInnerProperties([
                            0,
                            'floors',
                            props.i,
                            'serviceApartments',
                            ii,
                            'installmentPerDuration'
                          ])
                        )
                        dispatch(
                          updateFloorInnerProperties([
                            0,
                            'floors',
                            props.i,
                            'serviceApartments',
                            ii,
                            'cashDownPayment'
                          ])
                        )
                        dispatch(
                          updateFloorInnerProperties([
                            0,
                            'floors',
                            props.i,
                            'serviceApartments',
                            ii,
                            'arrearsInstallmentPerPeriod'
                          ])
                        )
                        dispatch(
                          updateFloorInnerProperties([
                            0,
                            'floors',
                            props.i,
                            'serviceApartments',
                            ii,
                            'downPaymentRs' 
                          ])
                        )
                        dispatch(
                          updateFloorInnerProperties([
                            0,
                            'floors',
                            props.i,
                            'serviceApartments',
                            ii,
                             'remainingRs'
                          ])
                        )
                      }}
                      />
                    </div>
                    </>
                    )
                  : 
                    ( 
                  <>  
                 {/* length and width */}
              <div className="form-group text-center col-md-2 col-sm-3 d-flex flex-wrap align-content-start mb-1">
                <h4>length</h4>
                      <Input
                      type='number'
                      id={`Apartment-length-${ii}`}
                      placeholder='0'
                      value={
                          store.projectData.floors[props.i].serviceApartments[ii]
                          .length
                      }
                      onFocus={e => {
                         e.target.select()
                        {  const n =  store.projectData.floors[props.i].noServiceApartments;
                          [...Array(n)].forEach((data, index)=> {
                            
                            dispatch(
                              updateFloorInnerProperties([
                                0,
                                'floors',
                                props.i,
                                'serviceApartments',
                                index,
                                'wholeAreaOfServiceApartments'
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
                            'serviceApartments',
                            ii,
                            'length'
                          ])
                        )
                        dispatch(
                          updateFloorInnerProperties([
                       ((store.projectData.floors[props.i].priceServiceApartments) * (e.target.value) * (store.projectData.floors[props.i].serviceApartments[ii].width)) ,
                            // ((store.projectData.floors[props.i].serviceApartments[ii].length * store.projectData.floors[props.i].serviceApartments[ii].width) * (e.target.value)),
                            // (store.projectData.floors[props.i].priceServiceApartments * store.projectData.floors[props.i].serviceApartments[ii].length * e.target.value),
                            'floors',
                            props.i,
                            'serviceApartments',
                            ii,
                            'totalCost'
                          ])
                        )
                        dispatch(
                          updateFloorInnerProperties([
                            0,
                            'floors',
                            props.i,
                            'serviceApartments',
                            ii,
                            'wholeAreaOfServiceApartments'
                          ])
                        )
                        dispatch(
                          updateFloorInnerProperties([
                            0,
                            'floors',
                            props.i,
                            'serviceApartments',
                            ii,
                            'downPaymentPercentage' 
                          ])
                        )
                        dispatch(
                          updateFloorInnerProperties([
                            0,
                            'floors',
                            props.i,
                            'serviceApartments',
                            ii,
                            'downPaymentRs' 
                          ])
                        )
                        dispatch(
                          updateFloorInnerProperties([
                            0,
                            'floors',
                            props.i,
                            'serviceApartments',
                            ii,
                             'remainingRs'
                          ])
                        )
                        dispatch(
                          updateFloorInnerProperties([
                            0,
                            'floors',
                            props.i,
                            'serviceApartments',
                            ii,
                             'paymentYears'
                          ])
                        )
                        dispatch(
                          updateFloorInnerProperties([
                            0,
                            'floors',
                            props.i,
                            'serviceApartments',
                            ii,
                            'installmentPerDuration'
                          ])
                        )
                        dispatch(
                          updateFloorInnerProperties([
                            0,
                            'floors',
                            props.i,
                            'serviceApartments',
                            ii,
                            'cashDownPayment'
                          ])
                        )
                        dispatch(
                          updateFloorInnerProperties([
                            0,
                            'floors',
                            props.i,
                            'serviceApartments',
                            ii,
                            'arrearsInstallmentPerPeriod'
                          ])
                        )
                       
                      }}
                      />
              </div>
              
                    <div className="form-group col-md-2 col-sm-3 text-center d-flex flex-wrap align-content-start mb-1">
                    <h4>width</h4>
                      <Input
                      type='number'
                      id={`Apartment-width-${ii}`}
                      placeholder='0'
                      value={
                          store.projectData.floors[props.i].serviceApartments[ii]
                          .width
                      }
                      onFocus={e => {
                        e.target.select()
                        {  const n =  store.projectData.floors[props.i].noServiceApartments;
                          [...Array(n)].forEach((data, index)=> {
                            
                            dispatch(
                              updateFloorInnerProperties([
                                0,
                                'floors',
                                props.i,
                                'serviceApartments',
                                index,
                                'wholeAreaOfServiceApartments'
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
                            'serviceApartments',
                            ii,
                            'width'
                          ])
                        )
                        dispatch(
                          updateFloorInnerProperties([
                            // (store.projectData.floors[props.i].priceServiceApartments * e.target.value),
                      ((store.projectData.floors[props.i].priceServiceApartments) * (e.target.value) * (store.projectData.floors[props.i].serviceApartments[ii].length)) ,
                            // ((store.projectData.floors[props.i].serviceApartments[ii].length * store.projectData.floors[props.i].serviceApartments[ii].width) * (e.target.value)),
                            // (store.projectData.floors[props.i].priceServiceApartments * store.projectData.floors[props.i].serviceApartments[ii].width * e.target.value),
                            'floors',
                            props.i,
                            'serviceApartments',
                            ii,
                            'totalCost'
                          ])
                        )
                       
                        dispatch(
                          updateFloorInnerProperties([
                            0,
                            'floors',
                            props.i,
                            'serviceApartments',
                            ii,
                            'wholeAreaOfServiceApartments'
                          ])
                        )
                        dispatch(
                          updateFloorInnerProperties([
                            0,
                            'floors',
                            props.i,
                            'serviceApartments',
                            ii,
                            'downPaymentPercentage' 
                          ])
                        )
                        dispatch(
                          updateFloorInnerProperties([
                            0,
                            'floors',
                            props.i,
                            'serviceApartments',
                            ii,
                             'paymentYears'
                          ])
                        )
                        dispatch(
                          updateFloorInnerProperties([
                            0,
                            'floors',
                            props.i,
                            'serviceApartments',
                            ii,
                            'installmentPerDuration'
                          ])
                        )
                        dispatch(
                          updateFloorInnerProperties([
                            0,
                            'floors',
                            props.i,
                            'serviceApartments',
                            ii,
                            'cashDownPayment'
                          ])
                        )
                        dispatch(
                          updateFloorInnerProperties([
                            0,
                            'floors',
                            props.i,
                            'serviceApartments',
                            ii,
                            'arrearsInstallmentPerPeriod'
                          ])
                        )
                        dispatch(
                          updateFloorInnerProperties([
                            0,
                            'floors',
                            props.i,
                            'serviceApartments',
                            ii,
                            'downPaymentRs' 
                          ])
                        )
                        dispatch(
                          updateFloorInnerProperties([
                            0,
                            'floors',
                            props.i,
                            'serviceApartments',
                            ii,
                             'remainingRs'
                          ])
                        )
                      }}
                      />
                    </div>
                   </>
                    )
                    } 
                   <div className="form-group text-center col-md-2 col-sm-3 mb-1 col-lg-2">
                    <h4 className='text-red-400'>total Cost</h4>
                <div className='mt-1'>{store.projectData.floors[props.i].serviceApartments[ii].totalCost}</div> 
                    </div>
                  </Row>  
                )}
                </Repeater>
            </div>
        </Card>
      </Accordion>
    )}
  </Row>
   
  )
}
export default noserviceApartments
