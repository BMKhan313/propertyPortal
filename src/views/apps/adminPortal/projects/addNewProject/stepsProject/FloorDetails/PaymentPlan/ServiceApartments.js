//
// ** React Imports
import { Fragment, useState, useContext, useEffect } from 'react'
import '../../FloorDetails/PaymentPlan/Payment.css'

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs'

// ** Utils
import { selectThemeColors } from '@utils'
import Select from 'react-select'

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
import { updateFloorInnerProperties } from '../../../../../redux/addNewProject/store'

import InputNumber from 'rc-input-number'

const CustomLabel = ({ htmlFor }) => {
  return (
    <Label className='form-check-label' htmlFor={htmlFor}>
      <span className='switch-icon-left'>
        <Check size={14} />
      </span>
      <span className='switch-icon-right'>
        <X size={14} />
      </span>
    </Label>
  )
}

const noShops = props => {
  // ** Store Variables
  const dispatch = useDispatch()
  const store = useSelector(state => state.addNewProject)
  const planOptions = useState([
    {
      id: 1,
      value: "vvv",
      label: "Ghani"
    },
    {
      id: 2,
      value: "v2",
      label: "Haris"
    }
  ])

  const [plan, setPlan] = useState('')
  const [open, setOpen] = useState('')
  const [number, setNumber] = useState(0)
  const toggleopen = id => {
    open === id ? setOpen() : setOpen(id)
  }

  const handleChangeDownPaymentPercent = (e, i, ii) => {
    dispatch(
      updateFloorInnerProperties([
        Math.max(0, Math.min(100, Number(e.target.value))),

        'floors',
        i,
        'serviceApartments',
        ii,
        'downPaymentPercentage'
      ])
    )
  }

  // useEffect(() => {
  //   const rec = ['Ghani', 'hgd']
  //   setPlanOptions(rec)
  //   console.log("OPTIONS", planOptions)
  // }, [])


  return (
    <Row className='justify-content-between align-items-center'>
      {store.projectData.floors[props.i].noServiceApartments > 0 && (
        
        <Accordion className='accordion-border' open={open} toggle={toggleopen}>
          <hr style={{ color: '#000', backgroundColor: '#000', height: 1, width: '90%', marginLeft: 'auto', marginRight: 'auto' }} />
          <Card>
            
            <Row className='mt-1'>
                  <h4 className='card-title'>
                  Payment Plan
                  </h4>
                  <Row>
                    <Col md={1} className="payment__header">ServiceApartment #</Col>
                    <Col md={2} className="payment__header">Total Cost(Rs)</Col>
                    <Col md={2} className="payment__header">Down Payment (%)</Col>
                    <Col md={2} className="payment__header">Down Payment (Rs)</Col>
                    <Col md={2} className="payment__header">Remaining(Rs)</Col>
                    <Col md={1} className="payment__header">Years</Col>
                    <Col md={1} className="payment__header"> Months / Quarters</Col>
                    <Col md={1} className="payment__header">Installment</Col>
                  </Row>
                  <Repeater count={store.projectData.floors[props.i].noServiceApartments}>
                  {ii => ( 
                    <Row className='mt-2'>
                      <Col md={1}><div className='payment__text'>Service-Apartment{ii + 1} </div></Col>
                      <Col md={2}>
                        <div className='payment__text'>
                            {/* total cost */} 
                            {/* {
                              ((store.projectData.floors[props.i].priceServiceApartments) 
                                * ((store.projectData.floors[props.i].serviceApartments[ii].length) * 
                                 (store.projectData.floors[props.i].serviceApartments[ii].width)))
                            
                            } */}
                             <Input
                        className='form-control payment__input'
                        type='number'
                        id={`serviceApartments-totalCost-${ii}`}
                        placeholder='12'
                        readOnly
                        
                        value={
                          store.projectData.floors[props.i].serviceApartments[ii].totalCost
                          // ((store.projectData.floors[props.i].priceServiceApartments) 
                          //   * (store.projectData.floors[props.i].serviceApartments[ii].length * 
                          //    store.projectData.floors[props.i].serviceApartments[ii].width))
                        }
                        onChange={(e) => {                        
                          dispatch(
                            updateFloorInnerProperties([
                              ((store.projectData.floors[props.i].priceServiceApartments) 
                                * (store.projectData.floors[props.i].serviceApartments[ii].length * 
                                 store.projectData.floors[props.i].serviceApartments[ii].width)),
                              'floors',
                              props.i,
                              'serviceApartments',
                              ii,
                              'totalCost'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                            //    (((store.projectData.floors[props.i].serviceApartments[ii].totalCost)
                            // - (e.target.value)) * 
                            // (store.projectData.floors[props.i].serviceApartments[ii].totalCost / 100)),
                           ( 
                             ((e.target.value * store.projectData.floors[props.i].serviceApartments[ii].totalCost) / 100)),
                              'floors',
                              props.i,
                              'serviceApartments',
                              ii,
                              'downPaymentRs'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              ((store.projectData.floors[props.i].serviceApartments[ii].totalCost)
                            - ((e.target.value) * 
                            (store.projectData.floors[props.i].serviceApartments[ii].totalCost) / 100)),
                              'floors',
                              props.i,
                              'serviceApartments',
                              ii,
                              'remainingRs'
                            ])
                          )
                          
                          }
                        }
                        />
                        </div>
                      </Col>
                      <Col md={2} style={{display: 'flex', justifyContent: 'flex-start'}}>
                        <div className='payment__text'>
                        <Input
                        className='form-control payment__input'
                        type='number'
                        id={`serviceApartments-downPaymentPercentage-${ii}`}
                        placeholder='12'
                        value={
                          store.projectData.floors[props.i].serviceApartments[ii]
                            .downPaymentPercentage
                        }
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => {
                          handleChangeDownPaymentPercent(e, props.i, ii)                         
                          dispatch(
                            updateFloorInnerProperties([
                            //    (((store.projectData.floors[props.i].serviceApartments[ii].totalCost)
                            // - (e.target.value)) * 
                            // (store.projectData.floors[props.i].serviceApartments[ii].totalCost / 100)),
                           ( 
                             ((e.target.value * store.projectData.floors[props.i].serviceApartments[ii].totalCost) / 100)),
                              'floors',
                              props.i,
                              'serviceApartments',
                              ii,
                              'downPaymentRs'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              ((store.projectData.floors[props.i].serviceApartments[ii].totalCost)
                            - ((e.target.value) * 
                            (store.projectData.floors[props.i].serviceApartments[ii].totalCost) / 100)),
                              'floors',
                              props.i,
                              'serviceApartments',
                              ii,
                              'remainingRs'
                            ])
                          )
                          
                          }
                        }
                        />
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className='payment__text'>
                           {/* payment in rs */}
                            <Input
                        className='form-control payment__input'
                        type='number'
                        id={`serviceApartments-downPaymentRs-${ii}`}
                        placeholder='12'
                        readOnly
                        value={
                          store.projectData.floors[props.i].serviceApartments[ii]
                            .downPaymentRs
                       
                             } />
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className='payment__text' >
                            
                             <Input
                        className='form-control payment__input'
                        type='number'
                        id={`serviceApartments-remainingRs-${ii}`}
                        placeholder='12'
                        readOnly
                        value={
                          store.projectData.floors[props.i].serviceApartments[ii]
                            .remainingRs
                        //   (store.projectData.floors[props.i].priceServiceApartments * (store.projectData.floors[props.i].serviceApartments[ii].length * store.projectData.floors[props.i].serviceApartments[ii].width))
                        //  - (((store.projectData.floors[props.i].priceServiceApartments) * 
                        //      (((store.projectData.floors[props.i].serviceApartments[ii].length) 
                        //      * (store.projectData.floors[props.i].serviceApartments[ii].width))
                        //     *
                        //      (store.projectData.floors[props.i].serviceApartments[ii].downPaymentPercentage)
                        //      )) / 100)
                        }
                        onChange={(e) => {                        
                          dispatch(
                            updateFloorInnerProperties([
                              (store.projectData.floors[props.i].priceServiceApartments * (store.projectData.floors[props.i].serviceApartments[ii].length * store.projectData.floors[props.i].serviceApartments[ii].width))
                              - (((store.projectData.floors[props.i].priceServiceApartments) * 
                                  (((store.projectData.floors[props.i].serviceApartments[ii].length) 
                                  * (store.projectData.floors[props.i].serviceApartments[ii].width))
                                 *
                                  (store.projectData.floors[props.i].serviceApartments[ii].downPaymentPercentage)
                                  )) / 100),
                              'floors',
                              props.i,
                              'serviceApartments',
                              ii,
                              'remainingRs'
                            ])
                          )
                          
                          }
                        }
                        />
                        </div>
                        
                      </Col>
       {/* years */}
                  <Col md={1}>
                        <div className='payment__years'
                        style={{marginLeft: -20}}
                        >
                            <Input
                              className='form-control payment_years__input'
                              type='number'
                              id={`serviceApartments-PaymentYears-${ii}`}
                              placeholder='Years'
                              value={
                                store.projectData.floors[props.i].serviceApartments[ii]
                                  .paymentYears
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'serviceApartments',
                                    ii,
                                    'paymentYears'
                                  ])
                                )
                    
                              }}
                            />
                         
                        
                        </div>
                      </Col>
                {/* yrs end */}
                      <Col md={1} style={{display: 'flex', justifyContent: 'flex-start'}}>
                      <div className='payment__text'>
                      <select
                      className='form-control payment__select'
                      style={{
                        padding: 10,
                        borderRadius: 4,
                        color: '#001',
                        outline: 'none',
                        marginLeft: -20
                      }}
                      id={`serviceApartments-Plan-${ii}`}
                                name='icon-primary'
                                value={
                                  store.projectData.floors[props.i].serviceApartments[ii]
                                    .plan
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorInnerProperties([
                                      e.target.value,
                                      'floors',
                                      props.i,
                                      'serviceApartments',
                                      ii,
                                      'plan'
                                    ])
                                  )
                                   
                                  if (e.target.value === 'Monthly') { 
                                dispatch(
                                  updateFloorInnerProperties([
                                    ((store.projectData.floors[props.i].serviceApartments[ii].paymentYears * (12 / 3))),
                                    'floors',
                                    props.i,
                                    'serviceApartments',
                                    ii,
                                    'shopInstallmentDuration'
                                  ])
                                )
                                dispatch(
                                  updateFloorInnerProperties([
                                    (store.projectData.floors[props.i].serviceApartments[ii].remainingRs / store.projectData.floors[props.i].serviceApartments[ii].shopInstallmentDuration),
                                  
                                    'floors',
                                    props.i,
                                    'serviceApartments',
                                    ii,
                                    'installmentPerDuration'
                                  ])
                                )
                               } else if (e.target.value === 'Quarter') {
                                dispatch(
                                  updateFloorInnerProperties([
                                    (store.projectData.floors[props.i].serviceApartments[ii].paymentYears * 12),
                                    'floors',
                                    props.i,
                                    'serviceApartments',
                                    ii,
                                    'shopInstallmentDuration',
                                  ])
                                )
                                dispatch(
                                  updateFloorInnerProperties([
                                    (store.projectData.floors[props.i].serviceApartments[ii].remainingRs / store.projectData.floors[props.i].serviceApartments[ii].shopInstallmentDuration),
                                   
                                    'floors',
                                    props.i,
                                    'serviceApartments',
                                    ii,
                                    'installmentPerDuration'
                                  ])
                                )
                               }   
                                }}
                      >
                        <option>Monthly</option>
                        <option>Quarter</option>

                      </select>
                      </div>

                       </Col>

                      <Col md={1}> 
                      <div className='payment__text'
                      >
                        
                     {store.projectData.floors[props.i].serviceApartments[ii].installmentPerDuration}
                      {/* {store.projectData.floors[props.i].serviceApartments[ii].remainingRs / store.projectData.floors[props.i].serviceApartments[ii].shopInstallment} */}
                    
                      </div>
                       
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