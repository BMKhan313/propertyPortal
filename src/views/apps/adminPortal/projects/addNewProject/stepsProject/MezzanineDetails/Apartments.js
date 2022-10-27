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
  const [checked, setChecked] = useState(true);
  const [open, setOpen] = useState('')
  const toggleopen = id => {
    open === id ? setOpen() : setOpen(id)
  }

  const handleChange = (event) => {
    setChecked(event.target.checked) 
  }
  
  return (
    <Row className='justify-content-between align-items-center'>
      {store.projectData.mezzanine[props.i].noApartments > 0 && (
        <Accordion className='accordion-border' open={open} toggle={toggleopen}>
          <Card>
            <CardHeader className='d-flex justify-content-center' >
             <div >
               <h5>
                Total apartments: {store.projectData.mezzanine[props.i].noApartments} {' '}
              </h5>
              </div>
            </CardHeader>
            <div className='mt-1 row'>
                  <h4 className='card-title'>
                  Apartment Details
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
                
                   <Repeater count={store.projectData.mezzanine[props.i].noApartments}>
                  {ii => ( 
                    <Row className='mt-2 row d-flex '>
                     
                      <div className=" col-md-2 d-flex flex-wrap align-content-start mt-1 mb-1"><h4>Apartment {ii + 1}</h4></div>
                      <div className="form-group text-center col-md-3 col-sm-3 d-flex flex-wrap align-content-start mb-2">
                      <h4 className='text-red-400'>Price/Sq.ft</h4>
                        <Input 
                        readOnly
                        // className='payment_text'
                        type='number' 
                        id={`Apartment-price-${ii}`}
                              placeholder='0'
                              value={store.projectData.mezzanine[props.i].priceApartments}
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'mezzanine',
                                    props.i,
                                    'apartments',
                                    ii,
                                    'priceApartments'
                                  ])
                                )
                              
                                dispatch(
                                  updateFloorInnerProperties([
                                    ((store.projectData.mezzanine[props.i].priceApartments) * (store.projectData.mezzanine[props.i].apartments[ii].length * store.projectData.mezzanine[props.i].apartments[ii].width)).toLocaleString(undefined, { maximumFractionDigits: 2 }).toLocaleString(undefined, { maximumFractionDigits: 2 }),
                                    'mezzanine',
                                    props.i,
                                    'apartments',
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
                            store.projectData.mezzanine[props.i].apartments[ii]
                            .wholeAreaOfApartments
                        }
                        onFocus = { e => {
                          e.target.select()
                          // iterate a number over an array
                          //make array from number
                      {  const n =  store.projectData.mezzanine[props.i].noApartments;
                        [...Array(n)].forEach((data, index)=> {
                          
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'apartments',
                              index,
                              'length'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
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
                              'mezzanine',
                              props.i,
                              'apartments',
                              ii,
                              'wholeAreaOfApartments'
                            ])
                          )
                          
                          dispatch(
                            updateFloorInnerProperties([
                              // (store.projectData.mezzanine[props.i].priceApartments * e.target.value),
                         ((store.projectData.mezzanine[props.i].priceApartments) * (e.target.value)) , 
                              // (store.projectData.mezzanine[props.i].priceApartments * store.projectData.mezzanine[props.i].apartments[ii].width * e.target.value),
                              'mezzanine',
                              props.i,
                              'apartments',
                              ii,
                              'totalCost'
                            ])
                          )
                           
                        
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'apartments',
                              ii,
                              'downPaymentPercentage' 
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'apartments',
                              ii,
                               'paymentYears'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'apartments',
                              ii,
                              'installmentPerDuration'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'apartments',
                              ii,
                              'cashDownPayment'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'apartments',
                              ii,
                              'arrearsInstallmentPerPeriod'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'apartments',
                              ii,
                              'downPaymentRs' 
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'apartments',
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
                            store.projectData.mezzanine[props.i].apartments[ii]
                            .length
                        }
                        onFocus={e => {
                           e.target.select()
                          {  const n =  store.projectData.mezzanine[props.i].noApartments;
                            [...Array(n)].forEach((data, index)=> {
                              
                              dispatch(
                                updateFloorInnerProperties([
                                  0,
                                  'mezzanine',
                                  props.i,
                                  'apartments',
                                  index,
                                  'wholeAreaOfApartments'
                                ])
                              )
                            
                            })
                            }
                        }}
                        onChange={e => {
                          dispatch(
                            updateFloorInnerProperties([
                              e.target.value,
                              'mezzanine',
                              props.i,
                              'apartments',
                              ii,
                              'length'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                         ((store.projectData.mezzanine[props.i].priceApartments) * (e.target.value) * (store.projectData.mezzanine[props.i].apartments[ii].width)) ,
                              // ((store.projectData.mezzanine[props.i].apartments[ii].length * store.projectData.mezzanine[props.i].apartments[ii].width) * (e.target.value)),
                              // (store.projectData.mezzanine[props.i].priceApartments * store.projectData.mezzanine[props.i].apartments[ii].length * e.target.value),
                              'mezzanine',
                              props.i,
                              'apartments',
                              ii,
                              'totalCost'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'apartments',
                              ii,
                              'wholeAreaOfApartments'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'apartments',
                              ii,
                              'downPaymentPercentage' 
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'apartments',
                              ii,
                              'downPaymentRs' 
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'apartments',
                              ii,
                               'remainingRs'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'apartments',
                              ii,
                               'paymentYears'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'apartments',
                              ii,
                              'installmentPerDuration'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'apartments',
                              ii,
                              'cashDownPayment'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'apartments',
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
                            store.projectData.mezzanine[props.i].apartments[ii]
                            .width
                        }
                        onFocus={e => {
                          e.target.select()
                          {  const n =  store.projectData.mezzanine[props.i].noApartments;
                            [...Array(n)].forEach((data, index)=> {
                              
                              dispatch(
                                updateFloorInnerProperties([
                                  0,
                                  'mezzanine',
                                  props.i,
                                  'apartments',
                                  index,
                                  'wholeAreaOfApartments'
                                ])
                              )
                            
                            })
                            }
                        }}
                        onChange={e => {
                          dispatch(
                            updateFloorInnerProperties([
                              e.target.value,
                              'mezzanine',
                              props.i,
                              'apartments',
                              ii,
                              'width'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              // (store.projectData.mezzanine[props.i].priceApartments * e.target.value),
                        ((store.projectData.mezzanine[props.i].priceApartments) * (e.target.value) * (store.projectData.mezzanine[props.i].apartments[ii].length)) ,
                              // ((store.projectData.mezzanine[props.i].apartments[ii].length * store.projectData.mezzanine[props.i].apartments[ii].width) * (e.target.value)),
                              // (store.projectData.mezzanine[props.i].priceApartments * store.projectData.mezzanine[props.i].apartments[ii].width * e.target.value),
                              'mezzanine',
                              props.i,
                              'apartments',
                              ii,
                              'totalCost'
                            ])
                          )
                         
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'apartments',
                              ii,
                              'wholeAreaOfApartments'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'apartments',
                              ii,
                              'downPaymentPercentage' 
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'apartments',
                              ii,
                               'paymentYears'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'apartments',
                              ii,
                              'installmentPerDuration'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'apartments',
                              ii,
                              'cashDownPayment'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'apartments',
                              ii,
                              'arrearsInstallmentPerPeriod'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'apartments',
                              ii,
                              'downPaymentRs' 
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'apartments',
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
                  <div className='mt-1'>{store.projectData.mezzanine[props.i].apartments[ii].totalCost}</div> 
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
export default noApartments
