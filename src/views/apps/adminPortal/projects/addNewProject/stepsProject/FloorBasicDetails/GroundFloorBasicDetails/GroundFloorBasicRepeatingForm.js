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
    Accordion,
    AccordionItem,
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

const GroundFloorBasicRepeatingForm = ({j}) => {
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

 const handleChangeDownPaymentPercent = (e, g) => {
   dispatch(
     updateFloorProperties([
       Math.max(0, Math.min(100, Number(e.target.value))),
       'groundFloors',
       g,
       'downPaymentBasicPercentage'
     ])
   )
 }
 const handleChangeDownPaymentPercentForMin = (e, g) => {
   dispatch(
     updateFloorProperties([
       Math.max(0, Math.min(100, Number(e.target.value))),
       'groundFloors',
       g,
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
                 count={store.projectData.masterDetails.countGroundFloors}
                 > 
      {g => (
                      <>
                      <div  >
                        <Row> <h2 className='mt-1 mb-2' style={{fontFamily: 'cursive'}}>groundFloor-{g+1}</h2></Row>
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
                    <div style={{fontSize: 10}}>  groundFloor-{g+1} </div>
                     
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
                                  'groundFloors',
                                  g,
                                  'floorid'
                                ])
                              )
                              dispatch(
                                updateFloorProperties([
                                  val ? val.label : 'none',
                                  'groundFloors',
                                  g,
                                  'floorType'
                                ])
                              )
                            }
                          }
                            value={floorType.find(
                              c =>
                                c.value ===
                                store.projectData.groundFloors[g].floorid
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
                        id={`animation-cost-${g}`}
                        placeholder='32'
                        value={store.projectData.groundFloors[g].noOfUnits}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'groundFloors',
                              g,
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
                        type='text'
                        className='form-control payment__input'
                        id={`animation-cost-${g}`}
                        placeholder='32'
                        value={(store.projectData.groundFloors[g].pricePerSqFt)}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'groundFloors',
                              g,
                              'pricePerSqFt'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
                             (e.target.value * store.projectData.groundFloors[g].minArea),
                              'groundFloors',
                              g,
                              'minPrice'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
                              (e.target.value * store.projectData.groundFloors[g].maxArea),
                              'groundFloors',
                              g,
                              'maxPrice'
                            ])
                          )

                          // make everything 0
                          // make downPaymentBasicPercentage 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'groundFloors',
                              g,
                              'downPaymentBasicPercentage'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
                              0,
                              'groundFloors',
                              g,
                              'cashBasicPaymentForMin'
                            ])
                          )
                          // make downpaymentRs 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'groundFloors',
                              g,
                              'downPaymentBasicInRs'
                            ])
                          )
                           // make remainingBasicRs 0
                           dispatch(
                            updateFloorProperties([
                              0,
                              'groundFloors',
                              g,
                              'remainingBasicRs'
                            ])
                          )
                          //make downPaymentBasicForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'groundFloors',
                              g,
                              'downPaymentBasicInRsForMin'
                            ])
                          )
                          //make remainingRsBasicForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'groundFloors',
                              g,
                              'remainingBasicRsForMin'
                            ])
                          )
                          // make paymentBasicYears 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'groundFloors',
                              g,
                              'paymentBasicYears'
                            ]),
                           
                          )
                          // make paymentBasicYearsForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'groundFloors',
                              g,
                              'paymentBasicYearsForMin'
                            ])
                          )
                          // make installmentPerDuration 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'groundFloors',
                              g,
                              'installmentPerDuration'
                            ])
                          )
                          // make installmentPerDurationForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'groundFloors',
                              g,
                              'installmentPerDurationForMin'
                            ])
                          )
                          // make cashBasicPayment 0
                          dispatch(
                            updateFloorProperties([
                            0,
                            'groundFloors',
                            g,
                            'cashBasicPayment'
                          ] ) 
                          )
                          //make arrearsBasicIntallmentOnEachPeriod 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'groundFloors',
                              g,
                              'arrearsBasicIntallmentOnEachPeriod'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
                              0,
                              'groundFloors',
                              g,
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
                        id={`animation-cost-${g}`}
                        placeholder='32'
                        value={store.projectData.groundFloors[g].minArea}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'groundFloors',
                              g,
                              'minArea'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
                             (e.target.value * store.projectData.groundFloors[g].pricePerSqFt),
                              
                              'groundFloors',
                              g,
                              'minPrice'
                            ])
                          )

                          // make everything 0
                          // make downPaymentBasicPercentage 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'groundFloors',
                              g,
                              'downPaymentBasicPercentage'
                            ])
                          )
                          
                          // make downpaymentRs 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'groundFloors',
                              g,
                              'downPaymentBasicInRs'
                            ])
                          )
                           // make remainingBasicRs 0
                           dispatch(
                            updateFloorProperties([
                              0,
                              'groundFloors',
                              g,
                              'remainingBasicRs'
                            ])
                          )
                          //make downPaymentBasicForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'groundFloors',
                              g,
                              'downPaymentBasicInRsForMin'
                            ])
                          )
                          //make remainingRsBasicForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'groundFloors',
                              g,
                              'remainingBasicRsForMin'
                            ])
                          )
                          //make PaymentYears 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'groundFloors',
                              g,
                              'paymentBasicYears'
                            ])
                          )
                          // make paymentBasicYearsForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'groundFloors',
                              g,
                              'paymentBasicYearsForMin'
                            ])
                          )
                          // make installmentPerDuration 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'groundFloors',
                              g,
                              'installmentPerDuration'
                            ])
                          )
                          // make installmentPerDurationForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'groundFloors',
                              g,
                              'installmentPerDurationForMin'
                            ])
                          )
                          // make cashBasicPayment 0
                          dispatch(
                            updateFloorProperties([
                            0,
                            'groundFloors',
                            g,
                            'cashBasicPayment'
                          ] ) 
                          )
                          //make arrearsBasicIntallmentOnEachPeriod 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'groundFloors',
                              g,
                              'arrearsBasicIntallmentOnEachPeriod'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
                              0,
                              'groundFloors',
                              g,
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
                        type='text'
                        className='form-control payment__input'
                        id={`animation-cost-${g}`}
                        placeholder='32'
                        value={store.projectData.groundFloors[g].maxArea}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'groundFloors',
                              g,
                              'maxArea'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
                             (e.target.value * store.projectData.groundFloors[g].pricePerSqFt),
                              'groundFloors',
                              g,
                              'maxPrice'
                            ])
                          )

                          // make everything 0
                          // make downPaymentBasicPercentage 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'groundFloors',
                              g,
                              'downPaymentBasicPercentage'
                            ])
                          )
                          
                          // make downpaymentRs 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'groundFloors',
                              g,
                              'downPaymentBasicInRs'
                            ])
                          )
                           // make remainingBasicRs 0
                           dispatch(
                            updateFloorProperties([
                              0,
                              'groundFloors',
                              g,
                              'remainingBasicRs'
                            ])
                          )
                          //make downPaymentBasicForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'groundFloors',
                              g,
                              'downPaymentBasicInRsForMin'
                            ])
                          )
                          //make remainingRsBasicForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'groundFloors',
                              g,
                              'remainingBasicRsForMin'
                            ])
                          )
                          // make paymentBasicYears 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'groundFloors',
                              g,
                              'paymentBasicYears'
                            ])
                          )
                           //make PaymentYears 0
                           dispatch(
                            updateFloorProperties([
                              0,
                              'groundFloors',
                              g,
                              'paymentBasicYears'
                            ])
                          )
                          // make paymentBasicYearsForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'groundFloors',
                              g,
                              'paymentBasicYearsForMin'
                            ])
                          )
                          // make installmentPerDuration 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'groundFloors',
                              g,
                              'installmentPerDuration'
                            ])
                          )
                          // make installmentPerDurationForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'groundFloors',
                              g,
                              'installmentPerDurationForMin'
                            ])
                          )
                          // make cashBasicPayment 0
                          dispatch(
                            updateFloorProperties([
                            0,
                            'groundFloors',
                            g,
                            'cashBasicPayment'
                          ] ) 
                          )
                          //make arrearsBasicIntallmentOnEachPeriod 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'groundFloors',
                              g,
                              'arrearsBasicIntallmentOnEachPeriod'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
                              0,
                              'groundFloors',
                              g,
                              'duesPerMonth'
                            ])
                          )
                         
                        }}
                      />
                      </div>
                      </Col>
                      <Col md={1}> 
                      <div className='payment__text' >
                        
                     {(store.projectData.groundFloors[g].minPrice)?.toLocaleString()}
                     
                      </div>
                       
                      </Col>
                      <Col md={1}> 
                      <div className='payment__text'
                      >
                        
                     {(store.projectData.groundFloors[g].maxPrice)?.toLocaleString()}
                     
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
                        
                     {(store.projectData.groundFloors[g].maxPrice)?.toLocaleString()}
                     
                      </div>
                      </Col> 

                      </Col>

                      <Col md={2} style={{display: 'flex', justifyContent: 'flex-start'}}>
                        <div className='payment__text'>
                        <Input
                        className='form-control payment__input'
                        type='number'
                        id={`Shop-downPaymentPercentage-${g}`}
                        placeholder='12'
                        value={
                          store.projectData.groundFloors[g]
                            .downPaymentBasicPercentage
                        }
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => {
                          handleChangeDownPaymentPercent(e, g)
                                                  
                          dispatch(
                            updateFloorProperties([
                      
                           ( 
                             ((e.target.value * store.projectData.groundFloors[g].maxPrice) / 100)),
                              'groundFloors',
                              g,
                              'downPaymentBasicInRs'
                            ])
                          )
                          
                          dispatch(
                            updateFloorProperties([
                           ( 
                             ((e.target.value * store.projectData.groundFloors[g].minPrice) / 100)),
                              'groundFloors',
                              g,
                              'downPaymentBasicInRsForMin'
                            ])
                          )

                          
                    // update downPaymentPercentage For minimum prices
                    dispatch(
                      updateFloorProperties([
                      ( (store.projectData.groundFloors[g].maxPrice) - ((e.target.value * store.projectData.groundFloors[g].maxPrice) / 100)),
                      'groundFloors',
                      g,
                      'remainingBasicRs'
                      ])
                    )
                   dispatch(
                                 updateFloorProperties([
                                 ( (store.projectData.groundFloors[g].minPrice) - ((e.target.value * store.projectData.groundFloors[g].minPrice) / 100)),
                                 'groundFloors',
                                 g,
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
                        id={`Shop-downPaymentRs-${g}`}
                        placeholder='12'
                        readOnly
                        value={
                          store.projectData.groundFloors[g]
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
                        id={`Shop-remainingBasicRs-${g}`}
                        placeholder='12'
                        readOnly
                        value={
                          store.projectData.groundFloors[g]
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
                              id={`Shop-paymentBasicYears-${g}`}
                              style={{width: '100%'}}
                              placeholder='Years'
                              value={
                                store.projectData.groundFloors[g].paymentBasicYears
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorProperties([
                                    e.target.value,
                                    'groundFloors',
                                    g,
                                    'paymentBasicYears'
                                  ])
                                )
                               
                              dispatch(
                                updateFloorProperties([
                                  0,
                                  'groundFloors',
                                  g,
                                  'installmentPerDuration' 
                                ])
                              )
                              dispatch(
                                updateFloorProperties([
                                  0,
                                  'groundFloors',
                                  g,
                                  'installmentPerDurationForMin' 
                                ])
                              )
                              dispatch(
                                updateFloorProperties([
                                  0,
                                  'groundFloors',
                                  g,
                                  'cashBasicPayment' 
                                ])
                              )
                              dispatch(
                                updateFloorProperties([
                                  0,
                                  'groundFloors',
                                  g,
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
                      id={`Shop-Plan-${g}`}
                                name='icon-primary'
                                value={
                                  store.projectData.groundFloors[g].basicPlan
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorProperties([
                                      e.target.value,
                                      'groundFloors',
                                      g,
                                      'basicPlan'
                                    ])
                                  )
                                  dispatch(
                                    updateFloorProperties([
                                      0,
                                      'groundFloors',
                                      g,
                                      'cashBasicPayment'
                                    ])
                                  )
                                  dispatch(
                                    updateFloorProperties([
                                      0,
                                      'groundFloors',
                                      g,
                                      'arrearsBasicIntallmentOnEachPeriod'
                                    ])
                                  )
                                
                                  if (e.target.value === 'Monthly') { 
                                dispatch(
                                  updateFloorProperties([
                                    ((store.projectData.groundFloors[g].paymentBasicYears * (12 / 3))),
                                    'groundFloors',
                                    g,
                                    'shopInstallmentDuration'
                                  ])
                                )
                                dispatch(
                                  updateFloorProperties([
                                    (store.projectData.groundFloors[g].remainingBasicRs / store.projectData.groundFloors[g].shopInstallmentDuration),
                                    'groundFloors',
                                    g,
                                    'installmentPerDuration'
                                  ])
                                )
                               } else if (e.target.value === 'Quarter') {
                                dispatch(
                                  updateFloorProperties([
                                    (store.projectData.groundFloors[g].paymentBasicYears * 12),
                                    'groundFloors',
                                    g,
                                    'shopInstallmentDuration',
                                  ])
                                )
                                dispatch(
                                  updateFloorProperties([
                                    (store.projectData.groundFloors[g].remainingBasicRs / store.projectData.groundFloors[g].shopInstallmentDuration),
                                    'groundFloors',
                                    g,
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
                        
                     {(store.projectData.groundFloors[g].installmentPerDuration)?.toLocaleString()}
                     
                      </div>
                       
                      </Col>
                    </Row>  


                    <Row>
                    <Col md={3} className="payment__header"></Col>
                  <Col md={3} className="payment__header">{store.projectData.groundFloors[g].basicPlan === 'Quarter' ? 'installment per quarter' : 'Installment Per Month'}</Col>
                  <Col md={3} className="payment__header">Arrears { store.projectData.groundFloors[g].basicPlanForDues ==='Quarterly' ? 'Per Quarter' : store.projectData.groundFloors[g].basicPlanForDues === 'Bi-Annual'  ? 'Per Bi-Annum' : store.projectData.groundFloors[g].basicPlanForDues === 'Annually' ? 'Per Annum' : ''   }</Col>
                  <Col md={3} className="payment__header">Arrears Lump Sum</Col> 
                  </Row>
                    <Row className='mt-2 mb-2'>
                      <Col md={3}></Col>
                    <Col md={3}>
                        <div className='payment__text' >
                             <Input
                        className='form-control payment__input'
                        type='number'
                        id={`Shop-cashBasicPayment-${g}`}
                        placeholder='12'
                        value={
                          store.projectData.groundFloors[g]
                            .cashBasicPayment
                        }
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              // make a check on cashBasicPayment
                          
                           (e.target.value > store.projectData.groundFloors[g].installmentPerDuration ? store.projectData.groundFloors[g].installmentPerDuration : e.target.value) ,
                            'groundFloors',
                              g,
                              'cashBasicPayment'

                            ])
                          )

                          dispatch(
                                updateFloorProperties([
                                  ( store.projectData.groundFloors[g].installmentPerDuration === 0 ? (0) : (((store.projectData.groundFloors[g].installmentPerDuration)  ) - (e.target.value)) ),
                                      'groundFloors',
                                     g,
                                  (store.projectData.groundFloors[g].basicPlan === 'Quarter' ? 'duesPerQuarter' : 'duesPerMonth' )
                                ])
                              )

                          dispatch(
                            updateFloorProperties([
                              0,
                              'groundFloors',
                              g,
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
                      id={`Shop-Plan-${g}`}
                                name='icon-primary'
                                value={
                                  store.projectData.groundFloors[g].basicPlanForDues
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorProperties([
                                      e.target.value,
                                      'groundFloors',
                                      g,
                                      'basicPlanForDues'
                                    ])
                                  )
                                
                                  if (e.target.value === 'Annually') { 

                                dispatch(
                                  updateFloorProperties([
                                    
                                    (  store.projectData.groundFloors[g].basicPlan === 'Quarter' ? 
                                    ( ( (4 * store.projectData.groundFloors[g].installmentPerDuration) - (store.projectData.groundFloors[g].cashBasicPayment  * 12) )
                                      (4 * (store.projectData.groundFloors[g].duesPerQuarter )) 
                                     
                                      )  : 
                                    (
                                      (12 * store.projectData.groundFloors[g].duesPerMonth ) )
                                       )
                                    ,
                                    'groundFloors',
                                    g,
                                    'arrearsBasicIntallmentOnEachPeriod'
                                  ])
                                )
                            
                               } else if (e.target.value === 'Quarterly') {
                                dispatch(
                                  updateFloorProperties([
                                    ( store.projectData.groundFloors[g].basicPlan === 'Monthly' ? 
                                   ( (store.projectData.groundFloors[g].cashBasicPayment === 0 ? (0) :
                                   (3 * store.projectData.groundFloors[g].duesPerMonth)) 
                                      )   :
                                    (store.projectData.groundFloors[g].cashBasicPayment === 0 ? (0) : (
                                       ((store.projectData.groundFloors[g].duesPerQuarter))
                                      )
                                      )
                                    ),
                                    'groundFloors',
                                    g,
                                    'arrearsBasicIntallmentOnEachPeriod',
                                  ])
                                )
                              
                               } else if(e.target.value === 'Bi-Annual'){
                                dispatch(
                                  updateFloorProperties([
                                  (store.projectData.groundFloors[g].basicPlan === 'Monthly' ?
                                    (6 * store.projectData.groundFloors[g].duesPerMonth) 
                                    : 
                                    // as there are 2 quarters in a bi-annual
                                    (2 * store.projectData.groundFloors[g].duesPerQuarter)), 
                                    'groundFloors',
                                    g,
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
                         {(store.projectData.groundFloors[g].arrearsBasicIntallmentOnEachPeriod)?.toLocaleString()}
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
                      {(store.projectData.groundFloors[g].minPrice)?.toLocaleString()}
                       </div>
                       </Col> 
                       
                      </Col>
               

                      <Col md={2} style={{display: 'flex', justifyContent: 'flex-start'}}>
                        <div className='payment__text'>
                        <InputNumberCommas
                        className='form-control payment__input'
                        // type='number'
                        readOnly
                        id={`Shop-downPaymentPercentage-${g}`}
                        placeholder='12'
                        value={
                          store.projectData.groundFloors[g]
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
                        id={`Shop-downPaymentRs-${g}`}
                        placeholder='12'
                        readOnly
                        value={
                          store.projectData.groundFloors[g]
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
                        id={`Shop-remainingBasicRsForMin-${g}`}
                        placeholder='12'
                        readOnly
                        value={
                          store.projectData.groundFloors[g]
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
                              id={`Shop-paymentBasicYears-${g}`}
                              style={{width: '100%'}}
                              placeholder='Years'
                              value={
                                store.projectData.groundFloors[g].paymentBasicYears
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
                      id={`Shop-Plan-${g}`}
                                name='icon-primary'
                                value={
                                  store.projectData.groundFloors[g].basicPlanForMin
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorProperties([
                                      e.target.value,
                                      'groundFloors',
                                      g,
                                      'basicPlanForMin'
                                    ])
                                  )
                                  dispatch(
                                    updateFloorProperties([
                                       0,
                                      'groundFloors',
                                      g,
                                      'cashBasicPaymentForMin'
                                    ])
                                  )
                                  dispatch(
                                    updateFloorProperties([
                                       0,
                                      'groundFloors',
                                      g,
                                      'arrearsBasicIntallmentOnEachPeriodForMin'
                                    ])
                                  )
                                
                                  if (e.target.value === 'Monthly') { 
                                dispatch(
                                  updateFloorProperties([
                                    ((store.projectData.groundFloors[g].paymentBasicYears * (12 / 3))),
                                    'groundFloors',
                                    g,
                                    'shopInstallmentDurationForMin'
                                  ])
                                )
                                dispatch(
                                  updateFloorProperties([
                                    (store.projectData.groundFloors[g].remainingBasicRsForMin / store.projectData.groundFloors[g].shopInstallmentDurationForMin),
                                    'groundFloors',
                                    g,
                                    'installmentPerDurationForMin'
                                  ])
                                )
                               } else if (e.target.value === 'Quarter') {
                                dispatch(
                                  updateFloorProperties([
                                    (store.projectData.groundFloors[g].paymentBasicYears * 12),
                                    'groundFloors',
                                    g,
                                    'shopInstallmentDurationForMin',
                                  ])
                                )
                                dispatch(
                                  updateFloorProperties([
                                    (store.projectData.groundFloors[g].remainingBasicRsForMin / store.projectData.groundFloors[g].shopInstallmentDurationForMin),
                                    'groundFloors',
                                    g,
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
                        
                     {(store.projectData.groundFloors[g].installmentPerDurationForMin)?.toLocaleString()}
                     
                      </div>
                       
                      </Col>
                    </Row>
                    <Row className="mt-2 mb-2">
                    <Col md={3} className="payment__header"></Col>
                  <Col md={3} className="payment__header">{store.projectData.groundFloors[g].basicPlanForMin === 'Quarter' ?  'installment Per Quarter' : 'installment Per Month'}</Col>
                  <Col md={3} className="payment__header">Arrears { store.projectData.groundFloors[g].basicPlanForDuesForMin ==='quarterly' ? 'Per Quarter' : store.projectData.groundFloors[g].basicPlanForDuesForMin === 'bi-annual'  ? 'Per Bi-Annum' : store.projectData.groundFloors[g].basicPlanForDuesForMin === 'annually' ? 'Per Annum' : ''   }</Col>
                  <Col md={3} className="payment__header">Arrears Lump Sum</Col> 
                  </Row>
                  <Row className='mt-2 mb-2'>
                      <Col md={3}></Col>
                    <Col md={3}>
                        <div className='payment__text' >
                             <Input
                        className='form-control payment__input'
                        type='Number'
                        id={`Shop-cashBasicPayment-${g}`}
                        placeholder='12'
                        value={
                          (store.projectData.groundFloors[g]
                            .cashBasicPaymentForMin)?.toLocaleString()
                        }
                        onChange={e => {
                         
                            dispatch(
                              updateFloorProperties([
                                // make a check on cashBasicPayment
                           
                             (e.target.value > store.projectData.groundFloors[g].installmentPerDurationForMin ? store.projectData.groundFloors[g].installmentPerDurationForMin : e.target.value) ,
                              // e.target.value,  
                              'groundFloors',
                                g,
                                'cashBasicPaymentForMin'
  
                              ])
                            )
  
                            dispatch(
                                  updateFloorProperties([
                                    ( store.projectData.groundFloors[g].installmentPerDurationForMin === 0 ? (0) : (((store.projectData.groundFloors[g].installmentPerDurationForMin)  ) - (e.target.value)) ),
                                        'groundFloors',
                                       g,
                                    (store.projectData.groundFloors[g].basicPlanForMin === 'Quarter' ? 'duesPerQuarterForMin' : 'duesPerMonthForMin' )
                                  ])
                                )


                          dispatch(
                            updateFloorProperties([
                              0,
                              'groundFloors',
                              g,
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
                      id={`Shop-Plan-${g}`}
                                name='icon-primary'
                                value={
                                  store.projectData.groundFloors[g].basicPlanForDuesForMin
                                }
                                 //here basicPlanForDuesForMin do nothing, we just show the target value in the select field
                                onChange={e => {
                                  dispatch(
                                    updateFloorProperties([
                                      e.target.value,
                                      'groundFloors',
                                      g,
                                      'basicPlanForDuesForMin'
                                      ])
                                  )
                                  dispatch(
                                    updateFloorProperties([
                                      0,
                                      'groundFloors',
                                      g,
                                      'arrearsBasicIntallmentOnEachPeriodForMin'
                                    ])
                                  )
                              //  if-else on arrears installments
                                  if (e.target.value === 'annually') { 

                                    dispatch(
                                      updateFloorProperties([
                                        
                                          store.projectData.groundFloors[g].basicPlanForMin === 'Quarter' ? 
                                         (4 * store.projectData.groundFloors[g].duesPerQuarterForMin ) 
                                         
                                              : 
                                        (
                                        12 * store.projectData.groundFloors[g].duesPerMonthForMin 
                                        ),
                                        'groundFloors',
                                        g,
                                        'arrearsBasicIntallmentOnEachPeriodForMin'
                                      ])
                                    )
                                
                                   } else if (e.target.value === 'quarterly') {
                                    dispatch(
                                      updateFloorProperties([
                                        ( store.projectData.groundFloors[g].basicPlanForMin === 'Monthly' ? 
                                        (store.projectData.groundFloors[g].cashBasicPaymentForMin === 0 ? (0) :
                                        (3 * store.projectData.groundFloors[g].duesPerMonthForMin)) 
                                           :
                                        (store.projectData.groundFloors[g].cashBasicPaymentForMin === 0 ? (0) : (
                                          ((store.projectData.groundFloors[g].duesPerQuarterForMin))
                                          ))
                                        ),
                                        'groundFloors',
                                        g,
                                        'arrearsBasicIntallmentOnEachPeriodForMin',
                                      ])
                                    )
                                  
                                   } else if(e.target.value === 'bi-annual'){
                                    dispatch(
                                      updateFloorProperties([
                                       (store.projectData.groundFloors[g].basicPlanForMin === 'Monthly' ?
                                        (6 * store.projectData.groundFloors[g].duesPerMonthForMin) 
                                        : 
                                        // as there are 2 quarters in a bi-annual
                                        (2 * store.projectData.groundFloors[g].duesPerQuarterForMin)), 
                                        'groundFloors',
                                        g,
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
                         {(store.projectData.groundFloors[g].arrearsBasicIntallmentOnEachPeriodForMin)?.toLocaleString()}
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

export default GroundFloorBasicRepeatingForm