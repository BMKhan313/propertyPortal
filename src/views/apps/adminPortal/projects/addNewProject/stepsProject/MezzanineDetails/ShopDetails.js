//
// ** React Imports
import { Fragment, useState, useContext } from 'react'

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs'
// mui
import Switch from '@mui/material/Switch';

// ** Utils
import { selectThemeColors } from '@utils'

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
  InputGroupText,
  Table
} from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { updateFloorInnerProperties } from '../../../../redux/addNewProject/store'

import InputNumber from 'rc-input-number'

const noShops = props => {
  // ** Store Variables
  const dispatch = useDispatch()
  const [checked, setChecked] = useState(true);
  const store = useSelector(state => state.addNewProject)
  const [open, setOpen] = useState('')
  const toggleopen = id => {
    open === id ? setOpen() : setOpen(id)
  }

  const handleChange = (event) => {
    setChecked(event.target.checked);
    
  };
  return (
    <Row className='justify-content-between align-items-center'>
      {store.projectData.mezzanine[props.i].noShops > 0 && (
        <Accordion className='accordion-border' open={open} toggle={toggleopen}>
          <Card>
            <CardHeader>
              <h4 className='card-title'>
                Total shops: {store.projectData.mezzanine[props.i].noShops}:{' '}
              </h4>
            </CardHeader>
            <Row className='mt-1'>
                  <h4 className='card-title'>
                  Shop Details
                  </h4>
                  <Col className='mb-md-0 mb-1' md='6' sm='12'>
                   <div className='d-flex'>
                    <Label
                       for='icon-primary'
                       className='form-check-label mb-50'
                     >
                      <h4> Do you have area ? </h4>
                     </Label>
                      <div className='form-switch form-check-primary '>
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
                   
                  </Col>
                  <Row>
                    <Col md={3} className=" text-center"> <h4>Shop #</h4></Col>
                    <Col md={2} className=" text-center"> <h4>Price Per Sq.Ft</h4></Col>
                    { checked ?
                   <> 
                    <Col md={3} className=" text-center"> <h4>Area</h4></Col>
                   </>
                     :
                     <>
                     <Col md={2} className=" text-center"> <h4>length</h4></Col>
                    <Col md={2} className=" text-center"> <h4>width</h4></Col>
                     </>
                     }
                    <Col md={2} className=" text-center"> <h4>Total Cost (Rs)</h4></Col>
                  </Row>
                   <Repeater count={store.projectData.mezzanine[props.i].noShops}>
                  {ii => ( 
                    <Row className='mt-2'>
                     
                      <Col md={3} className="text-center">Shop {ii + 1}</Col>
                      <Col md={2} className="text-center">
                        <Input 
                        readOnly
                        type='number' 
                        id={`Shop-price-${ii}`}
                              placeholder='0'
                              value={store.projectData.mezzanine[props.i].priceShops}
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'mezzanine',
                                    props.i,
                                    'shops',
                                    ii,
                                    'priceShops'
                                  ])
                                )
                              
                                dispatch(
                                  updateFloorInnerProperties([
                                    ((store.projectData.mezzanine[props.i].priceShops) * (store.projectData.mezzanine[props.i].shops[ii].length * store.projectData.mezzanine[props.i].shops[ii].width)).toLocaleString(undefined, { maximumFractionDigits: 2 }).toLocaleString(undefined, { maximumFractionDigits: 2 }),
                                    'mezzanine',
                                    props.i,
                                    'shops',
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
                        id={`Shop-isArea-${ii}`}
                        placeholder='0'
                        value={
                            store.projectData.mezzanine[props.i].shops[ii]
                            .wholeAreaOfShop
                        }
                        onFocus = { e => {
                          // iterate a number over an array
                          //make array from number
                      {  const n =  store.projectData.mezzanine[props.i].noShops;
                        [...Array(n)].forEach((data, index)=> {
                          
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'shops',
                              index,
                              'length'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'shops',
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
                              'shops',
                              ii,
                              'wholeAreaOfShop'
                            ])
                          )
                          
                          dispatch(
                            updateFloorInnerProperties([
                              // (store.projectData.mezzanine[props.i].priceShops * e.target.value),
                         ((store.projectData.mezzanine[props.i].priceShops) * (e.target.value)) , 
                              // (store.projectData.mezzanine[props.i].priceShops * store.projectData.mezzanine[props.i].shops[ii].width * e.target.value),
                              'mezzanine',
                              props.i,
                              'shops',
                              ii,
                              'totalCost'
                            ])
                          )
                           
                        
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'shops',
                              ii,
                              'downPaymentPercentage' 
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'shops',
                              ii,
                               'paymentYears'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'shops',
                              ii,
                              'installmentPerDuration'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'shops',
                              ii,
                              'cashDownPayment'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'shops',
                              ii,
                              'arrearsInstallmentPerPeriod'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'shops',
                              ii,
                              'downPaymentRs' 
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'shops',
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
                        id={`Shop-length-${ii}`}
                        placeholder='0'
                        value={
                            store.projectData.mezzanine[props.i].shops[ii]
                            .length
                        }
                        onFocus={e => {
                          {  const n =  store.projectData.mezzanine[props.i].noShops;
                            [...Array(n)].forEach((data, index)=> {
                              
                              dispatch(
                                updateFloorInnerProperties([
                                  0,
                                  'mezzanine',
                                  props.i,
                                  'shops',
                                  index,
                                  'wholeAreaOfShop'
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
                              'shops',
                              ii,
                              'length'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                         ((store.projectData.mezzanine[props.i].priceShops) * (e.target.value) * (store.projectData.mezzanine[props.i].shops[ii].width)) ,
                              // ((store.projectData.mezzanine[props.i].shops[ii].length * store.projectData.mezzanine[props.i].shops[ii].width) * (e.target.value)),
                              // (store.projectData.mezzanine[props.i].priceShops * store.projectData.mezzanine[props.i].shops[ii].length * e.target.value),
                              'mezzanine',
                              props.i,
                              'shops',
                              ii,
                              'totalCost'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'shops',
                              ii,
                              'wholeAreaOfShop'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'shops',
                              ii,
                              'downPaymentPercentage' 
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'shops',
                              ii,
                              'downPaymentRs' 
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'shops',
                              ii,
                               'remainingRs'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'shops',
                              ii,
                               'paymentYears'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'shops',
                              ii,
                              'installmentPerDuration'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'shops',
                              ii,
                              'cashDownPayment'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'shops',
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
                        id={`Shop-width-${ii}`}
                        placeholder='0'
                        value={
                            store.projectData.mezzanine[props.i].shops[ii]
                            .width
                        }
                        onFocus={e => {
                          {  const n =  store.projectData.mezzanine[props.i].noShops;
                            [...Array(n)].forEach((data, index)=> {
                              
                              dispatch(
                                updateFloorInnerProperties([
                                  0,
                                  'mezzanine',
                                  props.i,
                                  'shops',
                                  index,
                                  'wholeAreaOfShop'
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
                              'shops',
                              ii,
                              'width'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              // (store.projectData.mezzanine[props.i].priceShops * e.target.value),
                        ((store.projectData.mezzanine[props.i].priceShops) * (e.target.value) * (store.projectData.mezzanine[props.i].shops[ii].length)) ,
                              // ((store.projectData.mezzanine[props.i].shops[ii].length * store.projectData.mezzanine[props.i].shops[ii].width) * (e.target.value)),
                              // (store.projectData.mezzanine[props.i].priceShops * store.projectData.mezzanine[props.i].shops[ii].width * e.target.value),
                              'mezzanine',
                              props.i,
                              'shops',
                              ii,
                              'totalCost'
                            ])
                          )
                         
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'shops',
                              ii,
                              'wholeAreaOfShop'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'shops',
                              ii,
                              'downPaymentPercentage' 
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'shops',
                              ii,
                               'paymentYears'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'shops',
                              ii,
                              'installmentPerDuration'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'shops',
                              ii,
                              'cashDownPayment'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'shops',
                              ii,
                              'arrearsInstallmentPerPeriod'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'shops',
                              ii,
                              'downPaymentRs' 
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'mezzanine',
                              props.i,
                              'shops',
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
                        {/* {store.projectData.mezzanine[props.i].shops[ii].totalCost} */}
             {/* {((store.projectData.mezzanine[props.i].priceShops) * (store.projectData.mezzanine[props.i].shops[ii].length * store.projectData.mezzanine[props.i].shops[ii].width)) } */}
                  {store.projectData.mezzanine[props.i].shops[ii].totalCost}
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
export default noShops
