import React from 'react'

import { useState, useContext, useEffect } from 'react'
import { InputNumberCommas } from 'react-number-format-with-commas';
// ** Reactstrap Imports
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Form,
    Label,
    Input,
    Button,
    AccordionItem,
    Accordion,
    AccordionHeader,
    AccordionBody,
    InputGroup,
    InputGroupText
  } from 'reactstrap'
  
  // ** Axios Imports
import Axios from 'axios'

// ** Utils
import { selectThemeColors } from '@utils'

// Custom Components
 import Repeater from '@components/repeater'

  // ** Store & Actions
  import { useDispatch, useSelector } from 'react-redux'
  import {
    updateMasterDetails,
    updateNoOfFloorsBasements,
    updateFloorNoOfShopEtc,
    updateFloorProperties
  } from '../../../../../redux/addNewProject/store'
//   '../../../../../redux/addNewProject/store'
  
  // Base URL
import baseURL from '../../../../../../../../baseURL/baseURL'

  // ** Third Party Components
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight, Plus, Minus, Check, X } from 'react-feather'

  import InputNumber from 'rc-input-number'
import { keyframes } from '@emotion/react'

const MezzanineBasicRepeatingForm = () => {
   // ** Store Variables
   const dispatch = useDispatch()
   const store = useSelector(state => state.addNewProject)
 
   // ** State
   const [floorType, setFloorType] = useState([])
   const [count, setCount] = useState(0)
   const [floorName, setFloorName] = useState([])
   const defaultValues = {
     other: ''
   }
   
 const [plan, setPlan] = useState('')
 const [open, setOpen] = useState('')
 const [number, setNumber] = useState(0)
 const toggleopen = id => {
   open === id ? setOpen() : setOpen(id)
 }

 const handleChangeDownPaymentPercent = (e, j) => {
   dispatch(
     updateFloorProperties([
       Math.max(0, Math.min(100, Number(e.target.value))),
       'mezzanine',
       j,
       'downPaymentBasicPercentage'
     ])
   )
 }
 const handleChangeDownPaymentPercentForMin = (e, m) => {
   dispatch(
     updateFloorProperties([
       Math.max(0, Math.min(100, Number(e.target.value))),
       'mezzanine',
       m,
       'downPaymentBasicPercentageForMin'
     ])
   )
 }

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  return (
    <div>
        <Repeater
                 count={store.projectData.masterDetails.countMezzanine}
                 > 
        {m => (
                      <>
                      <div  >
                        <Row> <h2 className='mt-1 mb-2' style={{fontFamily: 'cursive'}}>mezzanine-{m+1}</h2></Row>
                      <Row >
                      <Col md={1} className="payment__header">Name #</Col>
                      <Col md={2} className="payment__header">Floor Type</Col>
                      <Col md={1} className="payment__header">No. of Units</Col>
                      <Col md={2} className="payment__header">Price/sq.ft</Col>
                      <Col md={2} className="payment__header">Min. Area</Col>
                      <Col md={2} className="payment__header">Max. Area</Col>
                      <Col md={1} className="payment__header"> Min. Price</Col>
                      <Col md={1} className="payment__header">Max. Price</Col>
                    </Row>
                     <Row className="mt-2" >
                     
                     <Col md='1' style={{ zIndex: 3 }} className="mt-1">
                    <div style={{fontSize: 10}}>  mezzanine-{m+1} </div>
                     
                       </Col>
                     
                     <Col md='2' className='mb-1' style={{ zIndex: 3 }}>
                      <Controller

                       className="payment__input"
                        name='floorType'
                        control={control}
                        render={({ field: { onChange, value, ...field } }) => (
                          // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
                          <Select
                            id='floorType'
                            className="payment__select"
                            isClearable={true}
                            classNamePrefix='select'
                            options={floorType}
                            theme={selectThemeColors}
                            onChange={val => {
                              onChange(val ? val.value : 0)
                              dispatch(
                                updateFloorProperties([
                                  val ? val.id : 0,
                                  'mezzanine',
                                  m,
                                  'floorid'
                                ])
                              )
                              dispatch(
                                updateFloorProperties([
                                  val ? val.label : 'none',
                                  'mezzanine',
                                  m,
                                  'floorType'
                                ])
                              )
                            }
                          }
                            value={floorType.find(
                              c =>
                                c.value ===
                                store.projectData.mezzanine[m].floorid
                            )}
                            {...field}
                          />
                        )}
                      />
                      </Col>
                      <Col md={1} >
                        <div className='payment__text'>
                             <Input
                        type='text'
                        className='form-control payment__input'
                        style={{width: '100%', padding: 5}}
                        id={`animation-cost-${m}`}
                        placeholder='32'
                        value={store.projectData.mezzanine[m].noOfUnits}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'mezzanine',
                              m,
                              'noOfUnits'
                            ])
                          )
                        }}
                      />
                        </div>
                      </Col>
                      <Col md={2} style={{display: 'flex', justifyContent: 'flex-start'}}>
                        <div className='payment__text'>
                        <InputNumberCommas
                        // type='text'
                        className='form-control payment__input'
                        id={`animation-cost-${m}`}
                        placeholder='32'
                        value={(store.projectData.mezzanine[m].pricePerSqFt)}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'mezzanine',
                              m,
                              'pricePerSqFt'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
                             (e.target.value * store.projectData.mezzanine[m].minArea),
                              'mezzanine',
                              m,
                              'minPrice'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
                              (e.target.value * store.projectData.mezzanine[m].maxArea),
                              'mezzanine',
                              m,
                              'maxPrice'
                            ])
                          )

                          // make everything 0
                          // make downPaymentBasicPercentage 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'mezzanine',
                              m,
                              'downPaymentBasicPercentage'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
                              0,
                              'mezzanine',
                              m,
                              'cashBasicPaymentForMin'
                            ])
                          )
                          // make downpaymentRs 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'mezzanine',
                              m,
                              'downPaymentBasicInRs'
                            ])
                          )
                           // make remainingBasicRs 0
                           dispatch(
                            updateFloorProperties([
                              0,
                              'mezzanine',
                              m,
                              'remainingBasicRs'
                            ])
                          )
                          //make downPaymentBasicForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'mezzanine',
                              m,
                              'downPaymentBasicInRsForMin'
                            ])
                          )
                          //make remainingRsBasicForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'mezzanine',
                              m,
                              'remainingBasicRsForMin'
                            ])
                          )
                          // make paymentBasicYears 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'mezzanine',
                              m,
                              'paymentBasicYears'
                            ]),
                           
                          )
                          // make paymentBasicYearsForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'mezzanine',
                              m,
                              'paymentBasicYearsForMin'
                            ])
                          )
                          // make installmentPerDuration 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'mezzanine',
                              m,
                              'installmentPerDuration'
                            ])
                          )
                          // make installmentPerDurationForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'mezzanine',
                              m,
                              'installmentPerDurationForMin'
                            ])
                          )
                          // make cashBasicPayment 0
                          dispatch(
                            updateFloorProperties([
                            0,
                            'mezzanine',
                            m,
                            'cashBasicPayment'
                          ] ) 
                          )
                          //make arrearsBasicIntallmentOnEachPeriod 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'mezzanine',
                              m,
                              'arrearsBasicIntallmentOnEachPeriod'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
                              0,
                              'mezzanine',
                              m,
                              'duesPerMonth'
                            ])
                          )
                        }}
                      />
                        </div>
                      </Col>
                      <Col md={2} style={{display: 'flex', justifyContent: 'flex-start'}}>
                        <div className='payment__text'>
                        <InputNumberCommas
                        // type='text'
                        className='form-control payment__input'
                        id={`animation-cost-${m}`}
                        placeholder='32'
                        value={store.projectData.mezzanine[m].minArea}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'mezzanine',
                              m,
                              'minArea'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
                             (e.target.value * store.projectData.mezzanine[m].pricePerSqFt),
                              
                              'mezzanine',
                              m,
                              'minPrice'
                            ])
                          )

                          // make everything 0
                          // make downPaymentBasicPercentage 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'mezzanine',
                              m,
                              'downPaymentBasicPercentage'
                            ])
                          )
                          
                          // make downpaymentRs 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'mezzanine',
                              m,
                              'downPaymentBasicInRs'
                            ])
                          )
                           // make remainingBasicRs 0
                           dispatch(
                            updateFloorProperties([
                              0,
                              'mezzanine',
                              m,
                              'remainingBasicRs'
                            ])
                          )
                          //make downPaymentBasicForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'mezzanine',
                              m,
                              'downPaymentBasicInRsForMin'
                            ])
                          )
                          //make remainingRsBasicForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'mezzanine',
                              m,
                              'remainingBasicRsForMin'
                            ])
                          )
                          //make PaymentYears 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'mezzanine',
                              m,
                              'paymentBasicYears'
                            ])
                          )
                          // make paymentBasicYearsForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'mezzanine',
                              m,
                              'paymentBasicYearsForMin'
                            ])
                          )
                          // make installmentPerDuration 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'mezzanine',
                              m,
                              'installmentPerDuration'
                            ])
                          )
                          // make installmentPerDurationForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'mezzanine',
                              m,
                              'installmentPerDurationForMin'
                            ])
                          )
                          // make cashBasicPayment 0
                          dispatch(
                            updateFloorProperties([
                            0,
                            'mezzanine',
                            m,
                            'cashBasicPayment'
                          ] ) 
                          )
                          //make arrearsBasicIntallmentOnEachPeriod 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'mezzanine',
                              m,
                              'arrearsBasicIntallmentOnEachPeriod'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
                              0,
                              'mezzanine',
                              m,
                              'duesPerMonth'
                            ])
                          )
                        }}
                      />
                          </div>
                       </Col>
                     
                       <Col md={2} style={{display: 'flex', justifyContent: 'flex-start'}}>
                        <div className='payment__text'>
                      <InputNumberCommas
                        // type='text'
                        className='form-control payment__input'
                        id={`animation-cost-${m}`}
                        placeholder='32'
                        value={store.projectData.mezzanine[m].maxArea}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'mezzanine',
                              m,
                              'maxArea'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
                             (e.target.value * store.projectData.mezzanine[m].pricePerSqFt),
                              'mezzanine',
                              m,
                              'maxPrice'
                            ])
                          )

                          // make everything 0
                          // make downPaymentBasicPercentage 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'mezzanine',
                              m,
                              'downPaymentBasicPercentage'
                            ])
                          )
                          
                          // make downpaymentRs 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'mezzanine',
                              m,
                              'downPaymentBasicInRs'
                            ])
                          )
                           // make remainingBasicRs 0
                           dispatch(
                            updateFloorProperties([
                              0,
                              'mezzanine',
                              m,
                              'remainingBasicRs'
                            ])
                          )
                          //make downPaymentBasicForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'mezzanine',
                              m,
                              'downPaymentBasicInRsForMin'
                            ])
                          )
                          //make remainingRsBasicForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'mezzanine',
                              m,
                              'remainingBasicRsForMin'
                            ])
                          )
                          // make paymentBasicYears 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'mezzanine',
                              m,
                              'paymentBasicYears'
                            ])
                          )
                           //make PaymentYears 0
                           dispatch(
                            updateFloorProperties([
                              0,
                              'mezzanine',
                              m,
                              'paymentBasicYears'
                            ])
                          )
                          // make paymentBasicYearsForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'mezzanine',
                              m,
                              'paymentBasicYearsForMin'
                            ])
                          )
                          // make installmentPerDuration 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'mezzanine',
                              m,
                              'installmentPerDuration'
                            ])
                          )
                          // make installmentPerDurationForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'mezzanine',
                              m,
                              'installmentPerDurationForMin'
                            ])
                          )
                          // make cashBasicPayment 0
                          dispatch(
                            updateFloorProperties([
                            0,
                            'mezzanine',
                            m,
                            'cashBasicPayment'
                          ] ) 
                          )
                          //make arrearsBasicIntallmentOnEachPeriod 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'mezzanine',
                              m,
                              'arrearsBasicIntallmentOnEachPeriod'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
                              0,
                              'mezzanine',
                              m,
                              'duesPerMonth'
                            ])
                          )
                         
                        }}
                      />
                      </div>
                      </Col>
                      <Col md={1}> 
                      <div className='payment__text' >
                        
                     {(store.projectData.mezzanine[m].minPrice)?.toLocaleString()}
                     
                      </div>
                       
                      </Col>
                      <Col md={1}> 
                      <div className='payment__text'
                      >
                        
                     {(store.projectData.mezzanine[m].maxPrice)?.toLocaleString()}
                     
                      </div>
                       
                      </Col>
                     
                     </Row>
                     </div>
                     <div>
                      <Row>
                      <Accordion className='accordion-border' open={open} toggle={toggleopen}>
          
          <Card>
            
            <Row className='mt-1'>
                  <h4 className='card-title'>
                  Payment Plan
                  </h4>
                  <Row>
                    <Col md={1} className="payment__header">Basement #</Col>
                    <Col md={2} className="payment__header">Max. Total Cost</Col>
                    <Col md={2} className="payment__header">Down Payment (%)</Col>
                    <Col md={2} className="payment__header">Down Payment (Rs)</Col>
                    <Col md={2} className="payment__header">Remaining(Rs)</Col>
                    <Col md={1} className="payment__header">Years</Col>
                    <Col md={1} className="payment__header"> Months / Quarters</Col>
                    <Col md={1} className="payment__header">Installment</Col>
                  </Row>
                
                  
                {/* for minimum area */}
                    <Row className='mt-1 mb-2'>
                      <Col md={1} ><div className='payment__text' style={{fontSize:10, fontWeight: 600}}>Maximum Price  </div></Col>
                      <Col md={2} >
                     
                            {/* total cost */} 
                     <Col md={1}> 
                       
                      <div className='payment__text' style={{width:100}}>
                        
                     {(store.projectData.mezzanine[m].maxPrice)?.toLocaleString()}
                     
                      </div>
                      </Col> 

                      </Col>

                      <Col md={2} style={{display: 'flex', justifyContent: 'flex-start'}}>
                        <div className='payment__text'>
                        <Input
                        className='form-control payment__input'
                        type='number'
                        id={`Shop-downPaymentPercentage-${m}`}
                        placeholder='12'
                        value={
                          store.projectData.mezzanine[m]
                            .downPaymentBasicPercentage
                        }
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => {
                          handleChangeDownPaymentPercent(e, m)
                                                  
                          dispatch(
                            updateFloorProperties([
                      
                           ( 
                             ((e.target.value * store.projectData.mezzanine[m].maxPrice) / 100)),
                              'mezzanine',
                              m,
                              'downPaymentBasicInRs'
                            ])
                          )
                          
                          dispatch(
                            updateFloorProperties([
                           ( 
                             ((e.target.value * store.projectData.mezzanine[m].minPrice) / 100)),
                              'mezzanine',
                              m,
                              'downPaymentBasicInRsForMin'
                            ])
                          )

                          
                    // update downPaymentPercentage For minimum prices
                    dispatch(
                      updateFloorProperties([
                      ( (store.projectData.mezzanine[m].maxPrice) - ((e.target.value * store.projectData.mezzanine[m].maxPrice) / 100)),
                      'mezzanine',
                      m,
                      'remainingBasicRs'
                      ])
                    )
                   dispatch(
                                 updateFloorProperties([
                                 ( (store.projectData.mezzanine[m].minPrice) - ((e.target.value * store.projectData.mezzanine[m].minPrice) / 100)),
                                 'mezzanine',
                                 m,
                                 'remainingBasicRsForMin'
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
                            <InputNumberCommas
                        className='form-control payment__input'
                        // type='number'
                        id={`Shop-downPaymentRs-${m}`}
                        placeholder='12'
                        readOnly
                        value={
                          store.projectData.mezzanine[m]
                            .downPaymentBasicInRs
                        }
                        />
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className='payment__text' >
                            {/* Remainings */}
                             <InputNumberCommas
                        className='form-control payment__input'
                        // type='number'
                        id={`Shop-remainingBasicRs-${m}`}
                        placeholder='12'
                        readOnly
                        value={
                          store.projectData.mezzanine[m]
                            .remainingBasicRs
           
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
                            className='form-control payment__input'
                              type='number'
                              id={`Shop-paymentBasicYears-${m}`}
                              style={{width: '100%'}}
                              placeholder='Years'
                              value={
                                store.projectData.mezzanine[m].paymentBasicYears
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorProperties([
                                    e.target.value,
                                    'mezzanine',
                                    m,
                                    'paymentBasicYears'
                                  ])
                                )
                               
                              dispatch(
                                updateFloorProperties([
                                  0,
                                  'mezzanine',
                                  m,
                                  'installmentPerDuration' 
                                ])
                              )
                              dispatch(
                                updateFloorProperties([
                                  0,
                                  'mezzanine',
                                  m,
                                  'installmentPerDurationForMin' 
                                ])
                              )
                              dispatch(
                                updateFloorProperties([
                                  0,
                                  'mezzanine',
                                  m,
                                  'cashBasicPayment' 
                                ])
                              )
                              dispatch(
                                updateFloorProperties([
                                  0,
                                  'mezzanine',
                                  m,
                                  "arrearsBasicIntallmentOnEachPeriod" 
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
                        padding: 5,
                        borderRadius: 4,
                        color: '#001',
                        outline: 'none',
                        // marginLeft: -10
                      }}
                      id={`Shop-Plan-${m}`}
                                name='icon-primary'
                                value={
                                  store.projectData.mezzanine[m].basicPlan
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorProperties([
                                      e.target.value,
                                      'mezzanine',
                                      m,
                                      'basicPlan'
                                    ])
                                  )
                                  dispatch(
                                    updateFloorProperties([
                                      0,
                                      'mezzanine',
                                      m,
                                      'cashBasicPayment'
                                    ])
                                  )
                                  dispatch(
                                    updateFloorProperties([
                                      0,
                                      'mezzanine',
                                      m,
                                      'arrearsBasicIntallmentOnEachPeriod'
                                    ])
                                  )
                                
                                  if (e.target.value === 'Monthly') { 
                                dispatch(
                                  updateFloorProperties([
                                    ((store.projectData.mezzanine[m].paymentBasicYears * (12 / 3))),
                                    'mezzanine',
                                    m,
                                    'shopInstallmentDuration'
                                  ])
                                )
                                dispatch(
                                  updateFloorProperties([
                                    (store.projectData.mezzanine[m].remainingBasicRs / store.projectData.mezzanine[m].shopInstallmentDuration),
                                    'mezzanine',
                                    m,
                                    'installmentPerDuration'
                                  ])
                                )
                               } else if (e.target.value === 'Quarter') {
                                dispatch(
                                  updateFloorProperties([
                                    (store.projectData.mezzanine[m].paymentBasicYears * 12),
                                    'mezzanine',
                                    m,
                                    'shopInstallmentDuration',
                                  ])
                                )
                                dispatch(
                                  updateFloorProperties([
                                    (store.projectData.mezzanine[m].remainingBasicRs / store.projectData.mezzanine[m].shopInstallmentDuration),
                                    'mezzanine',
                                    m,
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
                        
                     {(store.projectData.mezzanine[m].installmentPerDuration)?.toLocaleString()}
                     
                      </div>
                       
                      </Col>
                    </Row>  


                    <Row>
                    <Col md={3} className="payment__header"></Col>
                  <Col md={3} className="payment__header">{store.projectData.mezzanine[m].basicPlan === 'Quarter' ? 'installment per quarter' : 'Installment Per Month'}</Col>
                  <Col md={3} className="payment__header">Arrears { store.projectData.mezzanine[m].basicPlanForDues ==='Quarterly' ? 'Per Quarter' : store.projectData.mezzanine[m].basicPlanForDues === 'Bi-Annual'  ? 'Per Bi-Annum' : store.projectData.mezzanine[m].basicPlanForDues === 'Annually' ? 'Per Annum' : ''   }</Col>
                  <Col md={3} className="payment__header">Arrears Lump Sum</Col> 
                  </Row>
                    <Row className='mt-2 mb-2'>
                      <Col md={3}></Col>
                    <Col md={3}>
                        <div className='payment__text' >
                             <Input
                        className='form-control payment__input'
                        type='number'
                        id={`Shop-cashBasicPayment-${m}`}
                        placeholder='12'
                        value={
                          store.projectData.mezzanine[m]
                            .cashBasicPayment
                        }
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              // make a check on cashBasicPayment
                          
                           (e.target.value > store.projectData.mezzanine[m].installmentPerDuration ? store.projectData.mezzanine[m].installmentPerDuration : e.target.value) ,
                            'mezzanine',
                              m,
                              'cashBasicPayment'

                            ])
                          )

                          dispatch(
                                updateFloorProperties([
                                  ( store.projectData.mezzanine[m].installmentPerDuration === 0 ? (0) : (((store.projectData.mezzanine[m].installmentPerDuration)  ) - (e.target.value)) ),
                                      'mezzanine',
                                     m,
                                  (store.projectData.mezzanine[m].basicPlan === 'Quarter' ? 'duesPerQuarter' : 'duesPerMonth' )
                                ])
                              )

                          dispatch(
                            updateFloorProperties([
                              0,
                              'mezzanine',
                              m,
                              'arrearsBasicIntallmentOnEachPeriod'
                            ])
                          )
                        }
                      }

                    />
                        </div>
                        
                      </Col>
                      {/* select Options */}
                      <Col md={3} style={{display: 'flex', justifyContent: 'flex-start'}}>
                      <div style={{width: '70%'}} className='payment__text'>
                      <select
                      className='form-control payment__select'
                      style={{
                        paddingLeft: 8,
                        borderRadius: 4,
                        color: '#001',
                        outline: 'none',
                        
                        // marginLeft: -10
                      }}
                      id={`Shop-Plan-${m}`}
                                name='icon-primary'
                                value={
                                  store.projectData.mezzanine[m].basicPlanForDues
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorProperties([
                                      e.target.value,
                                      'mezzanine',
                                      m,
                                      'basicPlanForDues'
                                    ])
                                  )
                                
                                  if (e.target.value === 'Annually') { 

                                dispatch(
                                  updateFloorProperties([
                                    
                                    (  store.projectData.mezzanine[m].basicPlan === 'Quarter' ? 
                                    ( ( (4 * store.projectData.mezzanine[m].installmentPerDuration) - (store.projectData.mezzanine[m].cashBasicPayment  * 12) )
                                      (4 * (store.projectData.mezzanine[m].duesPerQuarter )) 
                                     
                                      )  : 
                                    (
                                      (12 * store.projectData.mezzanine[m].duesPerMonth ) )
                                       )
                                    ,
                                    'mezzanine',
                                    m,
                                    'arrearsBasicIntallmentOnEachPeriod'
                                  ])
                                )
                            
                               } else if (e.target.value === 'Quarterly') {
                                dispatch(
                                  updateFloorProperties([
                                    ( store.projectData.mezzanine[m].basicPlan === 'Monthly' ? 
                                   ( (store.projectData.mezzanine[m].cashBasicPayment === 0 ? (0) :
                                   (3 * store.projectData.mezzanine[m].duesPerMonth)) 
                                      )   :
                                    (store.projectData.mezzanine[m].cashBasicPayment === 0 ? (0) : (
                                       ((store.projectData.mezzanine[m].duesPerQuarter))
                                      )
                                      )
                                    ),
                                    'mezzanine',
                                    m,
                                    'arrearsBasicIntallmentOnEachPeriod',
                                  ])
                                )
                              
                               } else if(e.target.value === 'Bi-Annual'){
                                dispatch(
                                  updateFloorProperties([
                                  (store.projectData.mezzanine[m].basicPlan === 'Monthly' ?
                                    (6 * store.projectData.mezzanine[m].duesPerMonth) 
                                    : 
                                    // as there are 2 quarters in a bi-annual
                                    (2 * store.projectData.mezzanine[m].duesPerQuarter)), 
                                    'mezzanine',
                                    m,
                                    'arrearsBasicIntallmentOnEachPeriod',
                                  ])
                                )
                               }
                                }}
                      >
                        <option>Quarterly</option>
                        <option>Annually</option>
                        <option>Bi-Annual</option>
                      </select>
                      </div>

                       </Col>

                       <Col md={3} style={{display: 'flex', justifyContent: 'flex-start'}}>
                      <div className='payment__text'>
                         {(store.projectData.mezzanine[m].arrearsBasicIntallmentOnEachPeriod)?.toLocaleString()}
                        </div>
                       </Col>
                      
                    </Row>
                    <hr style={{ color: '#b3b3b3', backgroundColor: '#b3b3b3', height: 1, width: '60%', marginLeft: '26%', marginRight: 'auto' }} />

                     {/* for Minimum Price */}
                    <Row>
                    <Col md={1} className="payment__header"></Col>
                    <Col md={2} className="payment__header">Min. Total Cost</Col>
                    <Col md={2} className="payment__header">Down Payment (%)</Col>
                    <Col md={2} className="payment__header">Down Payment (Rs)</Col>
                    <Col md={2} className="payment__header">Remaining(Rs)</Col>
                    <Col md={1} className="payment__header">Years</Col>
                    <Col md={1} className="payment__header"> Months / Quarters</Col>
                    <Col md={1} className="payment__header">Installment</Col>
                  </Row>
                  <Row className='mt-1'>
                      <Col md={1} ><div className='payment__text' style={{fontSize:10, fontWeight: 600}}>Minimum Price </div></Col>
                     
                      <Col md={2} >
                        
                      <Col md={1}> 
                       <div className='payment__text' style={{width:100}}>
                      {(store.projectData.mezzanine[m].minPrice)?.toLocaleString()}
                       </div>
                       </Col> 
                       
                      </Col>
               

                      <Col md={2} style={{display: 'flex', justifyContent: 'flex-start'}}>
                        <div className='payment__text'>
                        <InputNumberCommas
                        className='form-control payment__input'
                        // type='number'
                        readOnly
                        id={`Shop-downPaymentPercentage-${m}`}
                        placeholder='12'
                        value={
                          store.projectData.mezzanine[m]
                            .downPaymentBasicPercentage
                        }
                        onFocus={(e) => e.target.select()}
                        
                        />
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className='payment__text'>
                           {/* payment in rs */}
                            <InputNumberCommas
                        className='form-control payment__input'
                        // type='number'
                        id={`Shop-downPaymentRs-${m}`}
                        placeholder='12'
                        readOnly
                        value={
                          store.projectData.mezzanine[m]
                            .downPaymentBasicInRsForMin
                        }
                        />
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className='payment__text' >
                            {/* Remainings */}
                             <InputNumberCommas
                        className='form-control payment__input'
                        // type='number'
                        id={`Shop-remainingBasicRsForMin-${m}`}
                        placeholder='12'
                        readOnly
                        value={
                          store.projectData.mezzanine[m]
                            .remainingBasicRsForMin
           
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
                            className='form-control payment__input'
                              type='number'
                              readOnly
                              id={`Shop-paymentBasicYears-${m}`}
                              style={{width: '100%'}}
                              placeholder='Years'
                              value={
                                store.projectData.mezzanine[m].paymentBasicYears
                              }
                              
                            />
                         
                        </div>
                      </Col> 
                {/* yrs end */}
                      <Col md={1} style={{display: 'flex', justifyContent: 'flex-start'}}>
                      <div className='payment__text'>
                      <select
                      className='form-control payment__select'
                      
                      style={{
                        padding: 5,
                        borderRadius: 4,
                        color: '#001',
                        outline: 'none',
                        // marginLeft: -10
                      }}
                      id={`Shop-Plan-${m}`}
                                name='icon-primary'
                                value={
                                  store.projectData.mezzanine[m].basicPlanForMin
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorProperties([
                                      e.target.value,
                                      'mezzanine',
                                      m,
                                      'basicPlanForMin'
                                    ])
                                  )
                                  dispatch(
                                    updateFloorProperties([
                                       0,
                                      'mezzanine',
                                      m,
                                      'cashBasicPaymentForMin'
                                    ])
                                  )
                                  dispatch(
                                    updateFloorProperties([
                                       0,
                                      'mezzanine',
                                      m,
                                      'arrearsBasicIntallmentOnEachPeriodForMin'
                                    ])
                                  )
                                
                                  if (e.target.value === 'Monthly') { 
                                dispatch(
                                  updateFloorProperties([
                                    ((store.projectData.mezzanine[m].paymentBasicYears * (12 / 3))),
                                    'mezzanine',
                                    m,
                                    'shopInstallmentDurationForMin'
                                  ])
                                )
                                dispatch(
                                  updateFloorProperties([
                                    (store.projectData.mezzanine[m].remainingBasicRsForMin / store.projectData.mezzanine[m].shopInstallmentDurationForMin),
                                    'mezzanine',
                                    m,
                                    'installmentPerDurationForMin'
                                  ])
                                )
                               } else if (e.target.value === 'Quarter') {
                                dispatch(
                                  updateFloorProperties([
                                    (store.projectData.mezzanine[m].paymentBasicYears * 12),
                                    'mezzanine',
                                    m,
                                    'shopInstallmentDurationForMin',
                                  ])
                                )
                                dispatch(
                                  updateFloorProperties([
                                    (store.projectData.mezzanine[m].remainingBasicRsForMin / store.projectData.mezzanine[m].shopInstallmentDurationForMin),
                                    'mezzanine',
                                    m,
                                    'installmentPerDurationForMin'
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
                        
                     {(store.projectData.mezzanine[m].installmentPerDurationForMin)?.toLocaleString()}
                     
                      </div>
                       
                      </Col>
                    </Row>
                    <Row className="mt-2 mb-2">
                    <Col md={3} className="payment__header"></Col>
                  <Col md={3} className="payment__header">{store.projectData.mezzanine[m].basicPlanForMin === 'Quarter' ?  'installment Per Quarter' : 'installment Per Month'}</Col>
                  <Col md={3} className="payment__header">Arrears { store.projectData.mezzanine[m].basicPlanForDuesForMin ==='quarterly' ? 'Per Quarter' : store.projectData.mezzanine[m].basicPlanForDuesForMin === 'bi-annual'  ? 'Per Bi-Annum' : store.projectData.mezzanine[m].basicPlanForDuesForMin === 'annually' ? 'Per Annum' : ''   }</Col>
                  <Col md={3} className="payment__header">Arrears Lump Sum</Col> 
                  </Row>
                  <Row className='mt-2 mb-2'>
                      <Col md={3}></Col>
                    <Col md={3}>
                        <div className='payment__text' >
                             <Input
                        className='form-control payment__input'
                        type='Number'
                        id={`Shop-cashBasicPayment-${m}`}
                        placeholder='12'
                        value={
                          (store.projectData.mezzanine[m]
                            .cashBasicPaymentForMin)?.toLocaleString()
                        }
                        onChange={e => {
                         
                            dispatch(
                              updateFloorProperties([
                                // make a check on cashBasicPayment
                           
                             (e.target.value > store.projectData.mezzanine[m].installmentPerDurationForMin ? store.projectData.mezzanine[m].installmentPerDurationForMin : e.target.value) ,
                              // e.target.value,  
                              'mezzanine',
                                m,
                                'cashBasicPaymentForMin'
  
                              ])
                            )
  
                            dispatch(
                                  updateFloorProperties([
                                    ( store.projectData.mezzanine[m].installmentPerDurationForMin === 0 ? (0) : (((store.projectData.mezzanine[m].installmentPerDurationForMin)  ) - (e.target.value)) ),
                                        'mezzanine',
                                       m,
                                    (store.projectData.mezzanine[m].basicPlanForMin === 'Quarter' ? 'duesPerQuarterForMin' : 'duesPerMonthForMin' )
                                  ])
                                )


                          dispatch(
                            updateFloorProperties([
                              0,
                              'mezzanine',
                              m,
                              'arrearsBasicIntallmentOnEachPeriodForMin'
                            ])
                          )
                        }
                      }

                    />
                        </div>
                        
                      </Col>
                      {/* select Options */}
                      <Col md={3} style={{display: 'flex', justifyContent: 'flex-start'}}>
                      <div style={{width: '70%'}} className='payment__text'>
                      <select
                      className='form-control payment__select'
                      style={{
                        paddingLeft: 8,
                        borderRadius: 4,
                        color: '#001',
                        outline: 'none',
                        
                        // marginLeft: -10
                      }}
                      id={`Shop-Plan-${m}`}
                                name='icon-primary'
                                value={
                                  store.projectData.mezzanine[m].basicPlanForDuesForMin
                                }
                                 //here basicPlanForDuesForMin do nothing, we just show the target value in the select field
                                onChange={e => {
                                  dispatch(
                                    updateFloorProperties([
                                      e.target.value,
                                      'mezzanine',
                                      m,
                                      'basicPlanForDuesForMin'
                                      ])
                                  )
                                  dispatch(
                                    updateFloorProperties([
                                      0,
                                      'mezzanine',
                                      m,
                                      'arrearsBasicIntallmentOnEachPeriodForMin'
                                    ])
                                  )
                              //  if-else on arrears installments
                                  if (e.target.value === 'annually') { 

                                    dispatch(
                                      updateFloorProperties([
                                        
                                          store.projectData.mezzanine[m].basicPlanForMin === 'Quarter' ? 
                                         (4 * store.projectData.mezzanine[m].duesPerQuarterForMin ) 
                                         
                                              : 
                                        (
                                        12 * store.projectData.mezzanine[m].duesPerMonthForMin 
                                        ),
                                        'mezzanine',
                                        m,
                                        'arrearsBasicIntallmentOnEachPeriodForMin'
                                      ])
                                    )
                                
                                   } else if (e.target.value === 'quarterly') {
                                    dispatch(
                                      updateFloorProperties([
                                        ( store.projectData.mezzanine[m].basicPlanForMin === 'Monthly' ? 
                                        (store.projectData.mezzanine[m].cashBasicPaymentForMin === 0 ? (0) :
                                        (3 * store.projectData.mezzanine[m].duesPerMonthForMin)) 
                                           :
                                        (store.projectData.mezzanine[m].cashBasicPaymentForMin === 0 ? (0) : (
                                          ((store.projectData.mezzanine[m].duesPerQuarterForMin))
                                          ))
                                        ),
                                        'mezzanine',
                                        m,
                                        'arrearsBasicIntallmentOnEachPeriodForMin',
                                      ])
                                    )
                                  
                                   } else if(e.target.value === 'bi-annual'){
                                    dispatch(
                                      updateFloorProperties([
                                       (store.projectData.mezzanine[m].basicPlanForMin === 'Monthly' ?
                                        (6 * store.projectData.mezzanine[m].duesPerMonthForMin) 
                                        : 
                                        // as there are 2 quarters in a bi-annual
                                        (2 * store.projectData.mezzanine[m].duesPerQuarterForMin)), 
                                        'mezzanine',
                                        m,
                                        'arrearsBasicIntallmentOnEachPeriodForMin',
                                      ])
                                    )
                                   }
                                  //  
                                }}
                      >
                        <option>quarterly</option>
                        <option>bi-annual</option>
                        <option>annually</option>
                        
                      </select>
                      </div>

                       </Col>

                       <Col md={3} style={{display: 'flex', justifyContent: 'flex-start'}}>
                      <div className='payment__text'>
                         {(store.projectData.mezzanine[m].arrearsBasicIntallmentOnEachPeriodForMin)?.toLocaleString()}
                        </div>
                       </Col>
                      
                    </Row>
                  </Row>
          <hr style={{ color: '#000', backgroundColor: '#000', height: 1, width: '90%', marginLeft: 'auto', marginRight: 'auto' }} />

          </Card>
        </Accordion>
                      </Row>
                     </div>
                     </>
                     )}
                     </Repeater>
                    
    </div>
  )
}

export default MezzanineBasicRepeatingForm