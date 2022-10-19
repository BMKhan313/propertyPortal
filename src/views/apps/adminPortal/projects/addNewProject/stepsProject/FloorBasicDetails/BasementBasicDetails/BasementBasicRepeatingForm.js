
import React from 'react'
import '../../FloorDetails/PaymentPlan/Payment.css'
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
    Accordion,
    Button,
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

const BasementBasicRepeatingForm = (props) => {
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
        'basements',
        j,
        'downPaymentBasicPercentage'
      ])
    )
  }
  const handleChangeDownPaymentPercentForMin = (e, j) => {
    dispatch(
      updateFloorProperties([
        Math.max(0, Math.min(100, Number(e.target.value))),
        'basements',
        j,
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
          count={
            store.projectData.masterDetails.countBasements
            // store.projectData.masterDetails.countBasements
          }
        >
                   {j => (
                      <>
                      <div>
                        <Row> <h2 className='mt-1 mb-2' style={{fontFamily: 'cursive'}}>basement-{j+1}</h2></Row>
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
                    <div style={{fontSize: 10}}>  basement-{j+1} </div>
                     
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
                                  'basements',
                                  j,
                                  'floorid'
                                ])
                              )
                              dispatch(
                                updateFloorProperties([
                                  val ? val.label : 'none',
                                  'basements',
                                  j,
                                  'floorType'
                                ])
                              )
                            }
                          }
                            value={floorType.find(
                              c =>
                                c.value ===
                                store.projectData.basements[j].floorid
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
                        id={`animation-cost-${j}`}
                        placeholder='32'
                        value={store.projectData.basements[j].noOfUnits}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'basements',
                              j,
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
                        id={`animation-cost-${j}`}
                        placeholder='32'
                        value={(store.projectData.basements[j].pricePerSqFt)}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'basements',
                              j,
                              'pricePerSqFt'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
                             (e.target.value * store.projectData.basements[j].minArea),
                              'basements',
                              j,
                              'minPrice'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
                              (e.target.value * store.projectData.basements[j].maxArea),
                              'basements',
                              j,
                              'maxPrice'
                            ])
                          )

                          // make everything 0
                          // make downPaymentBasicPercentage 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'basements',
                              j,
                              'downPaymentBasicPercentage'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
                              0,
                              'basements',
                              j,
                              'cashBasicPaymentForMin'
                            ])
                          )
                          // make downpaymentRs 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'basements',
                              j,
                              'downPaymentBasicInRs'
                            ])
                          )
                           // make remainingBasicRs 0
                           dispatch(
                            updateFloorProperties([
                              0,
                              'basements',
                              j,
                              'remainingBasicRs'
                            ])
                          )
                          //make downPaymentBasicForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'basements',
                              j,
                              'downPaymentBasicInRsForMin'
                            ])
                          )
                          //make remainingRsBasicForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'basements',
                              j,
                              'remainingBasicRsForMin'
                            ])
                          )
                          // make paymentBasicYears 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'basements',
                              j,
                              'paymentBasicYears'
                            ]),
                           
                          )
                          // make paymentBasicYearsForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'basements',
                              j,
                              'paymentBasicYearsForMin'
                            ])
                          )
                          // make installmentPerDuration 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'basements',
                              j,
                              'installmentPerDuration'
                            ])
                          )
                          // make installmentPerDurationForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'basements',
                              j,
                              'installmentPerDurationForMin'
                            ])
                          )
                          // make cashBasicPayment 0
                          dispatch(
                            updateFloorProperties([
                            0,
                            'basements',
                            j,
                            'cashBasicPayment'
                          ] ) 
                          )
                          //make arrearsBasicIntallmentOnEachPeriod 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'basements',
                              j,
                              'arrearsBasicIntallmentOnEachPeriod'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
                              0,
                              'basements',
                              j,
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
                        id={`animation-cost-${j}`}
                        placeholder='32'
                        value={store.projectData.basements[j].minArea}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'basements',
                              j,
                              'minArea'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
                             (e.target.value * store.projectData.basements[j].pricePerSqFt),
                              
                              'basements',
                              j,
                              'minPrice'
                            ])
                          )

                          // make everything 0
                          // make downPaymentBasicPercentage 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'basements',
                              j,
                              'downPaymentBasicPercentage'
                            ])
                          )
                          
                          // make downpaymentRs 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'basements',
                              j,
                              'downPaymentBasicInRs'
                            ])
                          )
                           // make remainingBasicRs 0
                           dispatch(
                            updateFloorProperties([
                              0,
                              'basements',
                              j,
                              'remainingBasicRs'
                            ])
                          )
                          //make downPaymentBasicForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'basements',
                              j,
                              'downPaymentBasicInRsForMin'
                            ])
                          )
                          //make remainingRsBasicForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'basements',
                              j,
                              'remainingBasicRsForMin'
                            ])
                          )
                          //make PaymentYears 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'basements',
                              j,
                              'paymentBasicYears'
                            ])
                          )
                          // make paymentBasicYearsForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'basements',
                              j,
                              'paymentBasicYearsForMin'
                            ])
                          )
                          // make installmentPerDuration 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'basements',
                              j,
                              'installmentPerDuration'
                            ])
                          )
                          // make installmentPerDurationForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'basements',
                              j,
                              'installmentPerDurationForMin'
                            ])
                          )
                          // make cashBasicPayment 0
                          dispatch(
                            updateFloorProperties([
                            0,
                            'basements',
                            j,
                            'cashBasicPayment'
                          ] ) 
                          )
                          //make arrearsBasicIntallmentOnEachPeriod 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'basements',
                              j,
                              'arrearsBasicIntallmentOnEachPeriod'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
                              0,
                              'basements',
                              j,
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
                        id={`animation-cost-${j}`}
                        placeholder='32'
                        value={store.projectData.basements[j].maxArea}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'basements',
                              j,
                              'maxArea'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
                             (e.target.value * store.projectData.basements[j].pricePerSqFt),
                              'basements',
                              j,
                              'maxPrice'
                            ])
                          )

                          // make everything 0
                          // make downPaymentBasicPercentage 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'basements',
                              j,
                              'downPaymentBasicPercentage'
                            ])
                          )
                          
                          // make downpaymentRs 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'basements',
                              j,
                              'downPaymentBasicInRs'
                            ])
                          )
                           // make remainingBasicRs 0
                           dispatch(
                            updateFloorProperties([
                              0,
                              'basements',
                              j,
                              'remainingBasicRs'
                            ])
                          )
                          //make downPaymentBasicForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'basements',
                              j,
                              'downPaymentBasicInRsForMin'
                            ])
                          )
                          //make remainingRsBasicForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'basements',
                              j,
                              'remainingBasicRsForMin'
                            ])
                          )
                          // make paymentBasicYears 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'basements',
                              j,
                              'paymentBasicYears'
                            ])
                          )
                           //make PaymentYears 0
                           dispatch(
                            updateFloorProperties([
                              0,
                              'basements',
                              j,
                              'paymentBasicYears'
                            ])
                          )
                          // make paymentBasicYearsForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'basements',
                              j,
                              'paymentBasicYearsForMin'
                            ])
                          )
                          // make installmentPerDuration 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'basements',
                              j,
                              'installmentPerDuration'
                            ])
                          )
                          // make installmentPerDurationForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'basements',
                              j,
                              'installmentPerDurationForMin'
                            ])
                          )
                          // make cashBasicPayment 0
                          dispatch(
                            updateFloorProperties([
                            0,
                            'basements',
                            j,
                            'cashBasicPayment'
                          ] ) 
                          )
                          //make arrearsBasicIntallmentOnEachPeriod 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'basements',
                              j,
                              'arrearsBasicIntallmentOnEachPeriod'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
                              0,
                              'basements',
                              j,
                              'duesPerMonth'
                            ])
                          )
                         
                        }}
                      />
                      </div>
                      </Col>
                      <Col md={1}> 
                      <div className='payment__text' >
                        
                     {(store.projectData.basements[j].minPrice)?.toLocaleString()}
                     
                      </div>
                       
                      </Col>
                      <Col md={1}> 
                      <div className='payment__text'
                      >
                        
                     {(store.projectData.basements[j].maxPrice)?.toLocaleString()}
                     
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
                        
                     {(store.projectData.basements[j].maxPrice)?.toLocaleString()}
                     
                      </div>
                      </Col> 

                      </Col>

                      <Col md={2} style={{display: 'flex', justifyContent: 'flex-start'}}>
                        <div className='payment__text'>
                        <Input
                        className='form-control payment__input'
                        type='number'
                        id={`Shop-downPaymentPercentage-${j}`}
                        placeholder='12'
                        value={
                          store.projectData.basements[j]
                            .downPaymentBasicPercentage
                        }
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => {
                          handleChangeDownPaymentPercent(e, j)
                                                  
                          dispatch(
                            updateFloorProperties([
                      
                           ( 
                             ((e.target.value * store.projectData.basements[j].maxPrice) / 100)),
                              'basements',
                              j,
                              'downPaymentBasicInRs'
                            ])
                          )
                          
                          dispatch(
                            updateFloorProperties([
                           ( 
                             ((e.target.value * store.projectData.basements[j].minPrice) / 100)),
                              'basements',
                              j,
                              'downPaymentBasicInRsForMin'
                            ])
                          )

                          
                    // update downPaymentPercentage For minimum prices
                    dispatch(
                      updateFloorProperties([
                      ( (store.projectData.basements[j].maxPrice) - ((e.target.value * store.projectData.basements[j].maxPrice) / 100)),
                      'basements',
                      j,
                      'remainingBasicRs'
                      ])
                    )
                   dispatch(
                                 updateFloorProperties([
                                 ( (store.projectData.basements[j].minPrice) - ((e.target.value * store.projectData.basements[j].minPrice) / 100)),
                                 'basements',
                                 j,
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
                        id={`Shop-downPaymentRs-${j}`}
                        placeholder='12'
                        readOnly
                        value={
                          store.projectData.basements[j]
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
                        id={`Shop-remainingBasicRs-${j}`}
                        placeholder='12'
                        readOnly
                        value={
                          store.projectData.basements[j]
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
                              id={`Shop-paymentBasicYears-${j}`}
                              style={{width: '100%'}}
                              placeholder='Years'
                              value={
                                store.projectData.basements[j].paymentBasicYears
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorProperties([
                                    e.target.value,
                                    'basements',
                                    j,
                                    'paymentBasicYears'
                                  ])
                                )
                               
                              dispatch(
                                updateFloorProperties([
                                  0,
                                  'basements',
                                  j,
                                  'installmentPerDuration' 
                                ])
                              )
                              dispatch(
                                updateFloorProperties([
                                  0,
                                  'basements',
                                  j,
                                  'installmentPerDurationForMin' 
                                ])
                              )
                              dispatch(
                                updateFloorProperties([
                                  0,
                                  'basements',
                                  j,
                                  'cashBasicPayment' 
                                ])
                              )
                              dispatch(
                                updateFloorProperties([
                                  0,
                                  'basements',
                                  j,
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
                      id={`Shop-Plan-${j}`}
                                name='icon-primary'
                                value={
                                  store.projectData.basements[j].basicPlan
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorProperties([
                                      e.target.value,
                                      'basements',
                                      j,
                                      'basicPlan'
                                    ])
                                  )
                                  dispatch(
                                    updateFloorProperties([
                                      0,
                                      'basements',
                                      j,
                                      'cashBasicPayment'
                                    ])
                                  )
                                  dispatch(
                                    updateFloorProperties([
                                      0,
                                      'basements',
                                      j,
                                      'arrearsBasicIntallmentOnEachPeriod'
                                    ])
                                  )
                                
                                  if (e.target.value === 'Monthly') { 
                                dispatch(
                                  updateFloorProperties([
                                    ((store.projectData.basements[j].paymentBasicYears * (12 / 3))),
                                    'basements',
                                    j,
                                    'shopInstallmentDuration'
                                  ])
                                )
                                dispatch(
                                  updateFloorProperties([
                                    (store.projectData.basements[j].remainingBasicRs / store.projectData.basements[j].shopInstallmentDuration),
                                    'basements',
                                    j,
                                    'installmentPerDuration'
                                  ])
                                )
                               } else if (e.target.value === 'Quarter') {
                                dispatch(
                                  updateFloorProperties([
                                    (store.projectData.basements[j].paymentBasicYears * 12),
                                    'basements',
                                    j,
                                    'shopInstallmentDuration',
                                  ])
                                )
                                dispatch(
                                  updateFloorProperties([
                                    (store.projectData.basements[j].remainingBasicRs / store.projectData.basements[j].shopInstallmentDuration),
                                    'basements',
                                    j,
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
                        
                     {(store.projectData.basements[j].installmentPerDuration)?.toLocaleString()}
                     
                      </div>
                       
                      </Col>
                    </Row>  


                    <Row>
                    <Col md={3} className="payment__header"></Col>
                  <Col md={3} className="payment__header">{store.projectData.basements[j].basicPlan === 'Quarter' ? 'installment per quarter' : 'Installment Per Month'}</Col>
                  <Col md={3} className="payment__header">Arrears { store.projectData.basements[j].basicPlanForDues ==='Quarterly' ? 'Per Quarter' : store.projectData.basements[j].basicPlanForDues === 'Bi-Annual'  ? 'Per Bi-Annum' : store.projectData.basements[j].basicPlanForDues === 'Annually' ? 'Per Annum' : ''   }</Col>
                  <Col md={3} className="payment__header">Arrears Lump Sum</Col> 
                  </Row>
                    <Row className='mt-2 mb-2'>
                      <Col md={3}></Col>
                    <Col md={3}>
                        <div className='payment__text' >
                             <Input
                        className='form-control payment__input'
                        type='number'
                        id={`Shop-cashBasicPayment-${j}`}
                        placeholder='12'
                        value={
                          store.projectData.basements[j]
                            .cashBasicPayment
                        }
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              // make a check on cashBasicPayment
                          
                           (e.target.value > store.projectData.basements[j].installmentPerDuration ? store.projectData.basements[j].installmentPerDuration : e.target.value) ,
                            'basements',
                              j,
                              'cashBasicPayment'

                            ])
                          )

                          dispatch(
                                updateFloorProperties([
                                  ( store.projectData.basements[j].installmentPerDuration === 0 ? (0) : (((store.projectData.basements[j].installmentPerDuration)  ) - (e.target.value)) ),
                                      'basements',
                                     j,
                                  (store.projectData.basements[j].basicPlan === 'Quarter' ? 'duesPerQuarter' : 'duesPerMonth' )
                                ])
                              )

                          dispatch(
                            updateFloorProperties([
                              0,
                              'basements',
                              j,
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
                      id={`Shop-Plan-${j}`}
                                name='icon-primary'
                                value={
                                  store.projectData.basements[j].basicPlanForDues
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorProperties([
                                      e.target.value,
                                      'basements',
                                      j,
                                      'basicPlanForDues'
                                    ])
                                  )
                                
                                  if (e.target.value === 'Annually') { 

                                dispatch(
                                  updateFloorProperties([
                                    
                                    (  store.projectData.basements[j].basicPlan === 'Quarter' ? 
                                    ( ( (4 * store.projectData.basements[j].installmentPerDuration) - (store.projectData.basements[j].cashBasicPayment  * 12) )
                                      (4 * (store.projectData.basements[j].duesPerQuarter )) 
                                     
                                      )  : 
                                    (
                                      (12 * store.projectData.basements[j].duesPerMonth ) )
                                       )
                                    ,
                                    'basements',
                                    j,
                                    'arrearsBasicIntallmentOnEachPeriod'
                                  ])
                                )
                            
                               } else if (e.target.value === 'Quarterly') {
                                dispatch(
                                  updateFloorProperties([
                                    ( store.projectData.basements[j].basicPlan === 'Monthly' ? 
                                   ( (store.projectData.basements[j].cashBasicPayment === 0 ? (0) :
                                   (3 * store.projectData.basements[j].duesPerMonth)) 
                                      )   :
                                    (store.projectData.basements[j].cashBasicPayment === 0 ? (0) : (
                                       ((store.projectData.basements[j].duesPerQuarter))
                                      )
                                      )
                                    ),
                                    'basements',
                                    j,
                                    'arrearsBasicIntallmentOnEachPeriod',
                                  ])
                                )
                              
                               } else if(e.target.value === 'Bi-Annual'){
                                dispatch(
                                  updateFloorProperties([
                                  (store.projectData.basements[j].basicPlan === 'Monthly' ?
                                    (6 * store.projectData.basements[j].duesPerMonth) 
                                    : 
                                    // as there are 2 quarters in a bi-annual
                                    (2 * store.projectData.basements[j].duesPerQuarter)), 
                                    'basements',
                                    j,
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
                         {(store.projectData.basements[j].arrearsBasicIntallmentOnEachPeriod)?.toLocaleString()}
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
                      {(store.projectData.basements[j].minPrice)?.toLocaleString()}
                       </div>
                       </Col> 
                       
                      </Col>
               

                      <Col md={2} style={{display: 'flex', justifyContent: 'flex-start'}}>
                        <div className='payment__text'>
                        <InputNumberCommas
                        className='form-control payment__input'
                        // type='number'
                        readOnly
                        id={`Shop-downPaymentPercentage-${j}`}
                        placeholder='12'
                        value={
                          store.projectData.basements[j]
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
                        id={`Shop-downPaymentRs-${j}`}
                        placeholder='12'
                        readOnly
                        value={
                          store.projectData.basements[j]
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
                        id={`Shop-remainingBasicRsForMin-${j}`}
                        placeholder='12'
                        readOnly
                        value={
                          store.projectData.basements[j]
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
                              id={`Shop-paymentBasicYears-${j}`}
                              style={{width: '100%'}}
                              placeholder='Years'
                              value={
                                store.projectData.basements[j].paymentBasicYears
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
                      id={`Shop-Plan-${j}`}
                                name='icon-primary'
                                value={
                                  store.projectData.basements[j].basicPlanForMin
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorProperties([
                                      e.target.value,
                                      'basements',
                                      j,
                                      'basicPlanForMin'
                                    ])
                                  )
                                  dispatch(
                                    updateFloorProperties([
                                       0,
                                      'basements',
                                      j,
                                      'cashBasicPaymentForMin'
                                    ])
                                  )
                                  dispatch(
                                    updateFloorProperties([
                                       0,
                                      'basements',
                                      j,
                                      'arrearsBasicIntallmentOnEachPeriodForMin'
                                    ])
                                  )
                                
                                  if (e.target.value === 'Monthly') { 
                                dispatch(
                                  updateFloorProperties([
                                    ((store.projectData.basements[j].paymentBasicYears * (12 / 3))),
                                    'basements',
                                    j,
                                    'shopInstallmentDurationForMin'
                                  ])
                                )
                                dispatch(
                                  updateFloorProperties([
                                    (store.projectData.basements[j].remainingBasicRsForMin / store.projectData.basements[j].shopInstallmentDurationForMin),
                                    'basements',
                                    j,
                                    'installmentPerDurationForMin'
                                  ])
                                )
                               } else if (e.target.value === 'Quarter') {
                                dispatch(
                                  updateFloorProperties([
                                    (store.projectData.basements[j].paymentBasicYears * 12),
                                    'basements',
                                    j,
                                    'shopInstallmentDurationForMin',
                                  ])
                                )
                                dispatch(
                                  updateFloorProperties([
                                    (store.projectData.basements[j].remainingBasicRsForMin / store.projectData.basements[j].shopInstallmentDurationForMin),
                                    'basements',
                                    j,
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
                        
                     {(store.projectData.basements[j].installmentPerDurationForMin)?.toLocaleString()}
                     
                      </div>
                       
                      </Col>
                    </Row>
                    <Row className="mt-2 mb-2">
                    <Col md={3} className="payment__header"></Col>
                  <Col md={3} className="payment__header">{store.projectData.basements[j].basicPlanForMin === 'Quarter' ?  'installment Per Quarter' : 'installment Per Month'}</Col>
                  <Col md={3} className="payment__header">Arrears { store.projectData.basements[j].basicPlanForDuesForMin ==='quarterly' ? 'Per Quarter' : store.projectData.basements[j].basicPlanForDuesForMin === 'bi-annual'  ? 'Per Bi-Annum' : store.projectData.basements[j].basicPlanForDuesForMin === 'annually' ? 'Per Annum' : ''   }</Col>
                  <Col md={3} className="payment__header">Arrears Lump Sum</Col> 
                  </Row>
                  <Row className='mt-2 mb-2'>
                      <Col md={3}></Col>
                    <Col md={3}>
                        <div className='payment__text' >
                             <Input
                        className='form-control payment__input'
                        type='Number'
                        id={`Shop-cashBasicPayment-${j}`}
                        placeholder='12'
                        value={
                          (store.projectData.basements[j]
                            .cashBasicPaymentForMin)?.toLocaleString()
                        }
                        onChange={e => {
                         
                            dispatch(
                              updateFloorProperties([
                                // make a check on cashBasicPayment
                           
                             (e.target.value > store.projectData.basements[j].installmentPerDurationForMin ? store.projectData.basements[j].installmentPerDurationForMin : e.target.value) ,
                              // e.target.value,  
                              'basements',
                                j,
                                'cashBasicPaymentForMin'
  
                              ])
                            )
  
                            dispatch(
                                  updateFloorProperties([
                                    ( store.projectData.basements[j].installmentPerDurationForMin === 0 ? (0) : (((store.projectData.basements[j].installmentPerDurationForMin)  ) - (e.target.value)) ),
                                        'basements',
                                       j,
                                    (store.projectData.basements[j].basicPlanForMin === 'Quarter' ? 'duesPerQuarterForMin' : 'duesPerMonthForMin' )
                                  ])
                                )


                          dispatch(
                            updateFloorProperties([
                              0,
                              'basements',
                              j,
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
                      id={`Shop-Plan-${j}`}
                                name='icon-primary'
                                value={
                                  store.projectData.basements[j].basicPlanForDuesForMin
                                }
                                 //here basicPlanForDuesForMin do nothing, we just show the target value in the select field
                                onChange={e => {
                                  dispatch(
                                    updateFloorProperties([
                                      e.target.value,
                                      'basements',
                                      j,
                                      'basicPlanForDuesForMin'
                                      ])
                                  )
                                  dispatch(
                                    updateFloorProperties([
                                      0,
                                      'basements',
                                      j,
                                      'arrearsBasicIntallmentOnEachPeriodForMin'
                                    ])
                                  )
                              //  if-else on arrears installments
                                  if (e.target.value === 'annually') { 

                                    dispatch(
                                      updateFloorProperties([
                                        
                                          store.projectData.basements[j].basicPlanForMin === 'Quarter' ? 
                                         (4 * store.projectData.basements[j].duesPerQuarterForMin ) 
                                         
                                              : 
                                        (
                                        12 * store.projectData.basements[j].duesPerMonthForMin 
                                        ),
                                        'basements',
                                        j,
                                        'arrearsBasicIntallmentOnEachPeriodForMin'
                                      ])
                                    )
                                
                                   } else if (e.target.value === 'quarterly') {
                                    dispatch(
                                      updateFloorProperties([
                                        ( store.projectData.basements[j].basicPlanForMin === 'Monthly' ? 
                                        (store.projectData.basements[j].cashBasicPaymentForMin === 0 ? (0) :
                                        (3 * store.projectData.basements[j].duesPerMonthForMin)) 
                                           :
                                        (store.projectData.basements[j].cashBasicPaymentForMin === 0 ? (0) : (
                                          ((store.projectData.basements[j].duesPerQuarterForMin))
                                          ))
                                        ),
                                        'basements',
                                        j,
                                        'arrearsBasicIntallmentOnEachPeriodForMin',
                                      ])
                                    )
                                  
                                   } else if(e.target.value === 'bi-annual'){
                                    dispatch(
                                      updateFloorProperties([
                                       (store.projectData.basements[j].basicPlanForMin === 'Monthly' ?
                                        (6 * store.projectData.basements[j].duesPerMonthForMin) 
                                        : 
                                        // as there are 2 quarters in a bi-annual
                                        (2 * store.projectData.basements[j].duesPerQuarterForMin)), 
                                        'basements',
                                        j,
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
                         {(store.projectData.basements[j].arrearsBasicIntallmentOnEachPeriodForMin)?.toLocaleString()}
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

export default BasementBasicRepeatingForm




















// import React from 'react'
// import '../../FloorDetails/PaymentPlan/Payment.css'
// import { useState, useContext, useEffect } from 'react'
// // ** Reactstrap Imports
// import {
//     Row,
//     Col,
//     Card,
//     CardHeader,
//     CardBody,
//     Form,
//     Label,
//     Input,
//     Accordion,
//     Button,
//     AccordionItem,
//     AccordionHeader,
//     AccordionBody,
//     InputGroup,
//     InputGroupText
//   } from 'reactstrap'
  
//   // ** Axios Imports
// import Axios from 'axios'

// // ** Utils
// import { selectThemeColors } from '@utils'

// // Custom Components
//  import Repeater from '@components/repeater'

//   // ** Store & Actions
//   import { useDispatch, useSelector } from 'react-redux'
//   import {
//     updateMasterDetails,
//     updateNoOfFloorsBasements,
//     updateFloorNoOfShopEtc,
//     updateFloorProperties
//   } from '../../../../../redux/addNewProject/store'
// //   '../../../../../redux/addNewProject/store'
  
//   // Base URL
// import baseURL from '../../../../../../../../baseURL/baseURL'

//   // ** Third Party Components
// import Select from 'react-select'
// import { useForm, Controller } from 'react-hook-form'
// import { ArrowLeft, ArrowRight, Plus, Minus, Check, X } from 'react-feather'

//   import InputNumber from 'rc-input-number'
// import { keyframes } from '@emotion/react'

// const BasementBasicRepeatingForm = (props) => {
//     // ** Store Variables
//     const dispatch = useDispatch()
//     const store = useSelector(state => state.addNewProject)
  
//     // ** State
//     const [floorType, setFloorType] = useState([])
//     const [count, setCount] = useState(0)
//     const [floorName, setFloorName] = useState([])
//     const defaultValues = {
//       other: ''
//     }
    
//   const [plan, setPlan] = useState('')
//   const [open, setOpen] = useState('')
//   const [number, setNumber] = useState(0)
//   const toggleopen = id => {
//     open === id ? setOpen() : setOpen(id)
//   }

//   const handleChangeDownPaymentPercent = (e, j) => {
//     dispatch(
//       updateFloorProperties([
//         Math.max(0, Math.min(100, Number(e.target.value))),
//         'basements',
//         j,
//         'downPaymentBasicPercentage'
//       ])
//     )
//   }
//   const handleChangeDownPaymentPercentForMin = (e, j) => {
//     dispatch(
//       updateFloorProperties([
//         Math.max(0, Math.min(100, Number(e.target.value))),
//         'basements',
//         j,
//         'downPaymentBasicPercentageForMin'
//       ])
//     )
//   }

  
//     const {
//       control,
//       setError,
//       handleSubmit,
//       formState: { errors }
//     } = useForm({ defaultValues })
//   return (
//     <div>
//        <Repeater
//           count={
//             store.projectData.masterDetails.countBasements
//             // store.projectData.masterDetails.countBasements
//           }
//         >
//                    {j => (
//                       <>
//                       <div  >
//                         <Row> <h2 className='mt-1 mb-2' style={{fontFamily: 'cursive'}}>basement-{j+1}</h2></Row>
//                       <Row >
//                       <Col md={1} className="payment__header">Name #</Col>
//                       <Col md={2} className="payment__header">Floor Type</Col>
//                       <Col md={1} className="payment__header">No. of Units</Col>
//                       <Col md={2} className="payment__header">Price/sq.ft</Col>
//                       <Col md={2} className="payment__header">Min. Area</Col>
//                       <Col md={2} className="payment__header">Max. Area</Col>
//                       <Col md={1} className="payment__header"> Min. Price</Col>
//                       <Col md={1} className="payment__header">Max. Price</Col>
//                     </Row>
//                      <Row className="mt-2" >
                     
//                      <Col md='1' style={{ zIndex: 3 }} className="mt-1">
//                     <div style={{fontSize: 10}}>  basement-{j+1} </div>
                     
//                        </Col>
                     
//                      <Col md='2' className='mb-1' style={{ zIndex: 3 }}>
//                       <Controller

//                        className="payment__input"
//                         name='floorType'
//                         control={control}
//                         render={({ field: { onChange, value, ...field } }) => (
//                           // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
//                           <Select
//                             id='floorType'
//                             className="payment__select"
//                             isClearable={true}
//                             classNamePrefix='select'
//                             options={floorType}
//                             theme={selectThemeColors}
//                             onChange={val => {
//                               onChange(val ? val.value : 0)
//                               dispatch(
//                                 updateFloorProperties([
//                                   val ? val.id : 0,
//                                   'basements',
//                                   j,
//                                   'floorid'
//                                 ])
//                               )
//                               dispatch(
//                                 updateFloorProperties([
//                                   val ? val.label : 'none',
//                                   'basements',
//                                   j,
//                                   'floorType'
//                                 ])
//                               )
//                             }
//                           }
//                             value={floorType.find(
//                               c =>
//                                 c.value ===
//                                 store.projectData.basements[j].floorid
//                             )}
//                             {...field}
//                           />
//                         )}
//                       />
//                       </Col>
//                       <Col md={1} >
//                         <div className='payment__text'>
//                              <Input
//                         type='text'
//                         className='form-control payment__input'
//                         style={{width: '100%', padding: 5}}
//                         id={`animation-cost-${j}`}
//                         placeholder='32'
//                         value={store.projectData.basements[j].noOfUnits}
//                         onChange={e => {
//                           dispatch(
//                             updateFloorProperties([
//                               e.target.value,
//                               'basements',
//                               j,
//                               'noOfUnits'
//                             ])
//                           )
//                         }}
//                       />
//                         </div>
//                       </Col>
//                       <Col md={2} style={{display: 'flex', justifyContent: 'flex-start'}}>
//                         <div className='payment__text'>
//                         <Input
//                         type='text'
//                         className='form-control payment__input'
//                         id={`animation-cost-${j}`}
//                         placeholder='32'
//                         value={store.projectData.basements[j].pricePerSqFt}
//                         onChange={e => {
//                           dispatch(
//                             updateFloorProperties([
//                               e.target.value,
//                               'basements',
//                               j,
//                               'pricePerSqFt'
//                             ])
//                           )
//                           dispatch(
//                             updateFloorProperties([
//                              (e.target.value * store.projectData.basements[j].minArea),
//                               'basements',
//                               j,
//                               'minPrice'
//                             ])
//                           )
//                           dispatch(
//                             updateFloorProperties([
//                               (e.target.value * store.projectData.basements[j].maxArea),
//                               'basements',
//                               j,
//                               'maxPrice'
//                             ])
//                           )

//                           // make everything 0
//                           // make downPaymentBasicPercentage 0
//                           dispatch(
//                             updateFloorProperties([
//                               0,
//                               'basements',
//                               j,
//                               'downPaymentBasicPercentage'
//                             ])
//                           )
                         
//                           // make downpaymentRs 0
//                           dispatch(
//                             updateFloorProperties([
//                               0,
//                               'basements',
//                               j,
//                               'downPaymentBasicInRs'
//                             ])
//                           )
//                            // make remainingBasicRs 0
//                            dispatch(
//                             updateFloorProperties([
//                               0,
//                               'basements',
//                               j,
//                               'remainingBasicRs'
//                             ])
//                           )
//                           //make downPaymentBasicForMin 0
//                           dispatch(
//                             updateFloorProperties([
//                               0,
//                               'basements',
//                               j,
//                               'downPaymentBasicInRsForMin'
//                             ])
//                           )
//                           //make remainingRsBasicForMin 0
//                           dispatch(
//                             updateFloorProperties([
//                               0,
//                               'basements',
//                               j,
//                               'remainingBasicRsForMin'
//                             ])
//                           )
//                           // make paymentBasicYears 0
//                           dispatch(
//                             updateFloorProperties([
//                               0,
//                               'basements',
//                               j,
//                               'paymentBasicYears'
//                             ]),
                           
//                           )
//                           // make paymentBasicYearsForMin 0
//                           dispatch(
//                             updateFloorProperties([
//                               0,
//                               'basements',
//                               j,
//                               'paymentBasicYearsForMin'
//                             ])
//                           )
//                           // make installmentPerDuration 0
//                           dispatch(
//                             updateFloorProperties([
//                               0,
//                               'basements',
//                               j,
//                               'installmentPerDuration'
//                             ])
//                           )
//                           // make installmentPerDurationForMin 0
//                           dispatch(
//                             updateFloorProperties([
//                               0,
//                               'basements',
//                               j,
//                               'installmentPerDurationForMin'
//                             ])
//                           )
//                           // make cashBasicPayment 0
//                           dispatch(
//                             updateFloorProperties([
//                             0,
//                             'basements',
//                             j,
//                             'cashBasicPayment'
//                           ] ) 
//                           )
//                           //make arrearsBasicIntallmentOnEachPeriod 0
//                           dispatch(
//                             updateFloorProperties([
//                               0,
//                               'basements',
//                               j,
//                               'arrearsBasicIntallmentOnEachPeriod'
//                             ])
//                           )
//                           dispatch(
//                             updateFloorProperties([
//                               0,
//                               'basements',
//                               j,
//                               'duesPerMonth'
//                             ])
//                           )
//                         }}
//                       />
//                         </div>
//                       </Col>
//                       <Col md={2} style={{display: 'flex', justifyContent: 'flex-start'}}>
//                         <div className='payment__text'>
//                         <Input
//                         type='text'
//                         className='form-control payment__input'
//                         id={`animation-cost-${j}`}
//                         placeholder='32'
//                         value={store.projectData.basements[j].minArea}
//                         onChange={e => {
//                           dispatch(
//                             updateFloorProperties([
//                               e.target.value,
//                               'basements',
//                               j,
//                               'minArea'
//                             ])
//                           )
//                           dispatch(
//                             updateFloorProperties([
//                              (e.target.value * store.projectData.basements[j].pricePerSqFt),
                              
//                               'basements',
//                               j,
//                               'minPrice'
//                             ])
//                           )

//                           // make everything 0
//                           // make downPaymentBasicPercentage 0
//                           dispatch(
//                             updateFloorProperties([
//                               0,
//                               'basements',
//                               j,
//                               'downPaymentBasicPercentage'
//                             ])
//                           )
                          
//                           // make downpaymentRs 0
//                           dispatch(
//                             updateFloorProperties([
//                               0,
//                               'basements',
//                               j,
//                               'downPaymentBasicInRs'
//                             ])
//                           )
//                            // make remainingBasicRs 0
//                            dispatch(
//                             updateFloorProperties([
//                               0,
//                               'basements',
//                               j,
//                               'remainingBasicRs'
//                             ])
//                           )
//                           //make downPaymentBasicForMin 0
//                           dispatch(
//                             updateFloorProperties([
//                               0,
//                               'basements',
//                               j,
//                               'downPaymentBasicInRsForMin'
//                             ])
//                           )
//                           //make remainingRsBasicForMin 0
//                           dispatch(
//                             updateFloorProperties([
//                               0,
//                               'basements',
//                               j,
//                               'remainingBasicRsForMin'
//                             ])
//                           )
//                           //make PaymentYears 0
//                           dispatch(
//                             updateFloorProperties([
//                               0,
//                               'basements',
//                               j,
//                               'paymentBasicYears'
//                             ])
//                           )
//                           // make paymentBasicYearsForMin 0
//                           dispatch(
//                             updateFloorProperties([
//                               0,
//                               'basements',
//                               j,
//                               'paymentBasicYearsForMin'
//                             ])
//                           )
//                           // make installmentPerDuration 0
//                           dispatch(
//                             updateFloorProperties([
//                               0,
//                               'basements',
//                               j,
//                               'installmentPerDuration'
//                             ])
//                           )
//                           // make installmentPerDurationForMin 0
//                           dispatch(
//                             updateFloorProperties([
//                               0,
//                               'basements',
//                               j,
//                               'installmentPerDurationForMin'
//                             ])
//                           )
//                           // make cashBasicPayment 0
//                           dispatch(
//                             updateFloorProperties([
//                             0,
//                             'basements',
//                             j,
//                             'cashBasicPayment'
//                           ] ) 
//                           )
//                           //make arrearsBasicIntallmentOnEachPeriod 0
//                           dispatch(
//                             updateFloorProperties([
//                               0,
//                               'basements',
//                               j,
//                               'arrearsBasicIntallmentOnEachPeriod'
//                             ])
//                           )
//                           dispatch(
//                             updateFloorProperties([
//                               0,
//                               'basements',
//                               j,
//                               'duesPerMonth'
//                             ])
//                           )
//                         }}
//                       />
//                           </div>
//                        </Col>
                     
//                        <Col md={2} style={{display: 'flex', justifyContent: 'flex-start'}}>
//                         <div className='payment__text'>
//                       <Input
//                         type='text'
//                         className='form-control payment__input'
//                         id={`animation-cost-${j}`}
//                         placeholder='32'
//                         value={store.projectData.basements[j].maxArea}
//                         onChange={e => {
//                           dispatch(
//                             updateFloorProperties([
//                               e.target.value,
//                               'basements',
//                               j,
//                               'maxArea'
//                             ])
//                           )
//                           dispatch(
//                             updateFloorProperties([
//                              (e.target.value * store.projectData.basements[j].pricePerSqFt),
//                               'basements',
//                               j,
//                               'maxPrice'
//                             ])
//                           )

//                           // make everything 0
//                           // make downPaymentBasicPercentage 0
//                           dispatch(
//                             updateFloorProperties([
//                               0,
//                               'basements',
//                               j,
//                               'downPaymentBasicPercentage'
//                             ])
//                           )
                          
//                           // make downpaymentRs 0
//                           dispatch(
//                             updateFloorProperties([
//                               0,
//                               'basements',
//                               j,
//                               'downPaymentBasicInRs'
//                             ])
//                           )
//                            // make remainingBasicRs 0
//                            dispatch(
//                             updateFloorProperties([
//                               0,
//                               'basements',
//                               j,
//                               'remainingBasicRs'
//                             ])
//                           )
//                           //make downPaymentBasicForMin 0
//                           dispatch(
//                             updateFloorProperties([
//                               0,
//                               'basements',
//                               j,
//                               'downPaymentBasicInRsForMin'
//                             ])
//                           )
//                           //make remainingRsBasicForMin 0
//                           dispatch(
//                             updateFloorProperties([
//                               0,
//                               'basements',
//                               j,
//                               'remainingBasicRsForMin'
//                             ])
//                           )
//                           // make paymentBasicYears 0
//                           dispatch(
//                             updateFloorProperties([
//                               0,
//                               'basements',
//                               j,
//                               'paymentBasicYears'
//                             ])
//                           )
//                            //make PaymentYears 0
//                            dispatch(
//                             updateFloorProperties([
//                               0,
//                               'basements',
//                               j,
//                               'paymentBasicYears'
//                             ])
//                           )
//                           // make paymentBasicYearsForMin 0
//                           dispatch(
//                             updateFloorProperties([
//                               0,
//                               'basements',
//                               j,
//                               'paymentBasicYearsForMin'
//                             ])
//                           )
//                           // make installmentPerDuration 0
//                           dispatch(
//                             updateFloorProperties([
//                               0,
//                               'basements',
//                               j,
//                               'installmentPerDuration'
//                             ])
//                           )
//                           // make installmentPerDurationForMin 0
//                           dispatch(
//                             updateFloorProperties([
//                               0,
//                               'basements',
//                               j,
//                               'installmentPerDurationForMin'
//                             ])
//                           )
//                           // make cashBasicPayment 0
//                           dispatch(
//                             updateFloorProperties([
//                             0,
//                             'basements',
//                             j,
//                             'cashBasicPayment'
//                           ] ) 
//                           )
//                           //make arrearsBasicIntallmentOnEachPeriod 0
//                           dispatch(
//                             updateFloorProperties([
//                               0,
//                               'basements',
//                               j,
//                               'arrearsBasicIntallmentOnEachPeriod'
//                             ])
//                           )
//                           dispatch(
//                             updateFloorProperties([
//                               0,
//                               'basements',
//                               j,
//                               'duesPerMonth'
//                             ])
//                           )
                         
//                         }}
//                       />
//                       </div>
//                       </Col>
//                       <Col md={1}> 
//                       <div className='payment__text' >
                        
//                      {store.projectData.basements[j].minPrice}
                     
//                       </div>
                       
//                       </Col>
//                       <Col md={1}> 
//                       <div className='payment__text'
//                       >
                        
//                      {store.projectData.basements[j].maxPrice}
                     
//                       </div>
                       
//                       </Col>
                     
//                      </Row>
//                      </div>
//                      <div>
//                       <Row>
//                       <Accordion className='accordion-border' open={open} toggle={toggleopen}>
          
//           <Card>
            
//             <Row className='mt-1'>
//                   <h4 className='card-title'>
//                   Payment Plan
//                   </h4>
//                   <Row>
//                     <Col md={1} className="payment__header">Basement #</Col>
//                     <Col md={2} className="payment__header">Max. Total Cost</Col>
//                     <Col md={2} className="payment__header">Down Payment (%)</Col>
//                     <Col md={2} className="payment__header">Down Payment (Rs)</Col>
//                     <Col md={2} className="payment__header">Remaining(Rs)</Col>
//                     <Col md={1} className="payment__header">Years</Col>
//                     <Col md={1} className="payment__header"> Months / Quarters</Col>
//                     <Col md={1} className="payment__header">Installment</Col>
//                   </Row>
                
                  
//                 {/* for minimum area */}
//                     <Row className='mt-1 mb-2'>
//                       <Col md={1} ><div className='payment__text' style={{fontSize:10, fontWeight: 600}}>Maximum Price  </div></Col>
//                       <Col md={2} >
                     
//                             {/* total cost */} 
//                      <Col md={1}> 
                       
//                       <div className='payment__text' style={{width:100}}>
                        
//                      {store.projectData.basements[j].maxPrice}
                     
//                       </div>
//                       </Col> 

//                       </Col>

//                       <Col md={2} style={{display: 'flex', justifyContent: 'flex-start'}}>
//                         <div className='payment__text'>
//                         <Input
//                         className='form-control payment__input'
//                         type='number'
//                         id={`Shop-downPaymentPercentage-${j}`}
//                         placeholder='12'
//                         value={
//                           store.projectData.basements[j]
//                             .downPaymentBasicPercentage
//                         }
//                         onFocus={(e) => e.target.select()}
//                         onChange={(e) => {
//                           handleChangeDownPaymentPercent(e, j)
                                                  
//                           dispatch(
//                             updateFloorProperties([
                      
//                            ( 
//                              ((e.target.value * store.projectData.basements[j].maxPrice) / 100)),
//                               'basements',
//                               j,
//                               'downPaymentBasicInRs'
//                             ])
//                           )
                          
//                           dispatch(
//                             updateFloorProperties([
//                            ( 
//                              ((e.target.value * store.projectData.basements[j].minPrice) / 100)),
//                               'basements',
//                               j,
//                               'downPaymentBasicInRsForMin'
//                             ])
//                           )

                          
//                     // update downPaymentPercentage For minimum prices
//                     dispatch(
//                       updateFloorProperties([
//                       ( (store.projectData.basements[j].maxPrice) - ((e.target.value * store.projectData.basements[j].maxPrice) / 100)),
//                       'basements',
//                       j,
//                       'remainingBasicRs'
//                       ])
//                     )
//                    dispatch(
//                                  updateFloorProperties([
//                                  ( (store.projectData.basements[j].minPrice) - ((e.target.value * store.projectData.basements[j].minPrice) / 100)),
//                                  'basements',
//                                  j,
//                                  'remainingBasicRsForMin'
//                                  ])
//                                )
                          
//                           }
//                         }
//                         />
//                         </div>
//                       </Col>
//                       <Col md={2}>
//                         <div className='payment__text'>
//                            {/* payment in rs */}
//                             <Input
//                         className='form-control payment__input'
//                         type='number'
//                         id={`Shop-downPaymentRs-${j}`}
//                         placeholder='12'
//                         readOnly
//                         value={
//                           store.projectData.basements[j]
//                             .downPaymentBasicInRs
//                         }
//                         />
//                         </div>
//                       </Col>
//                       <Col md={2}>
//                         <div className='payment__text' >
//                             {/* Remainings */}
//                              <Input
//                         className='form-control payment__input'
//                         type='number'
//                         id={`Shop-remainingBasicRs-${j}`}
//                         placeholder='12'
//                         readOnly
//                         value={
//                           store.projectData.basements[j]
//                             .remainingBasicRs
           
//                         }
//                     />
//                         </div>
                        
//                       </Col>
//        {/* years */}
//                    <Col md={1}>
//                         <div className='payment__years'
//                         style={{marginLeft: -20}}
//                         >
//                             <Input
//                             className='form-control payment__input'
//                               type='number'
//                               id={`Shop-paymentBasicYears-${j}`}
//                               style={{width: '100%'}}
//                               placeholder='Years'
//                               value={
//                                 store.projectData.basements[j].paymentBasicYears
//                               }
//                               onChange={e => {
//                                 dispatch(
//                                   updateFloorProperties([
//                                     e.target.value,
//                                     'basements',
//                                     j,
//                                     'paymentBasicYears'
//                                   ])
//                                 )
                               
//                               dispatch(
//                                 updateFloorProperties([
//                                   0,
//                                   'basements',
//                                   j,
//                                   'installmentPerDuration' 
//                                 ])
//                               )
//                               dispatch(
//                                 updateFloorProperties([
//                                   0,
//                                   'basements',
//                                   j,
//                                   'installmentPerDurationForMin' 
//                                 ])
//                               )
//                               dispatch(
//                                 updateFloorProperties([
//                                   0,
//                                   'basements',
//                                   j,
//                                   'cashBasicPayment' 
//                                 ])
//                               )
//                               dispatch(
//                                 updateFloorProperties([
//                                   0,
//                                   'basements',
//                                   j,
//                                   "arrearsBasicIntallmentOnEachPeriod" 
//                                 ])
//                               )
//                               }}
//                             />
                         
//                         </div>
//                       </Col> 
//                 {/* yrs end */}
//                       <Col md={1} style={{display: 'flex', justifyContent: 'flex-start'}}>
//                       <div className='payment__text'>
//                       <select
//                       className='form-control payment__select'
//                       style={{
//                         padding: 5,
//                         borderRadius: 4,
//                         color: '#001',
//                         outline: 'none',
//                         // marginLeft: -10
//                       }}
//                       id={`Shop-Plan-${j}`}
//                                 name='icon-primary'
//                                 value={
//                                   store.projectData.basements[j].basicPlan
//                                 }
//                                 onChange={e => {
//                                   dispatch(
//                                     updateFloorProperties([
//                                       e.target.value,
//                                       'basements',
//                                       j,
//                                       'basicPlan'
//                                     ])
//                                   )
//                                   dispatch(
//                                     updateFloorProperties([
//                                       0,
//                                       'basements',
//                                       j,
//                                       'cashBasicPayment'
//                                     ])
//                                   )
//                                   dispatch(
//                                     updateFloorProperties([
//                                       0,
//                                       'basements',
//                                       j,
//                                       'arrearsBasicIntallmentOnEachPeriod'
//                                     ])
//                                   )
                                
//                                   if (e.target.value === 'Monthly') { 
//                                 dispatch(
//                                   updateFloorProperties([
//                                     ((store.projectData.basements[j].paymentBasicYears * (12 / 3))),
//                                     'basements',
//                                     j,
//                                     'shopInstallmentDuration'
//                                   ])
//                                 )
//                                 dispatch(
//                                   updateFloorProperties([
//                                     (store.projectData.basements[j].remainingBasicRs / store.projectData.basements[j].shopInstallmentDuration),
//                                     'basements',
//                                     j,
//                                     'installmentPerDuration'
//                                   ])
//                                 )
//                                } else if (e.target.value === 'Quarter') {
//                                 dispatch(
//                                   updateFloorProperties([
//                                     (store.projectData.basements[j].paymentBasicYears * 12),
//                                     'basements',
//                                     j,
//                                     'shopInstallmentDuration',
//                                   ])
//                                 )
//                                 dispatch(
//                                   updateFloorProperties([
//                                     (store.projectData.basements[j].remainingBasicRs / store.projectData.basements[j].shopInstallmentDuration),
//                                     'basements',
//                                     j,
//                                     'installmentPerDuration'
//                                   ])
//                                 )
                               
//                                }
                                                                    
                                  
//                                 }}
//                       >
//                         <option>Monthly</option>
//                         <option>Quarter</option>

//                       </select>
//                       </div>

//                        </Col>

                    
//                       <Col md={1}> 
//                       <div className='payment__text'
//                       >
                        
//                      {store.projectData.basements[j].installmentPerDuration}
                     
//                       </div>
                       
//                       </Col>
//                     </Row>  


//                     <Row>
//                     <Col md={3} className="payment__header"></Col>
//                   <Col md={3} className="payment__header">Installment Per Month</Col>
//                   <Col md={3} className="payment__header">Arrears quarter/bi-annaul/annum </Col>
//                   <Col md={3} className="payment__header">Arrears Lump Sum</Col> 
//                   </Row>
//                     <Row className='mt-2 mb-2'>
//                       <Col md={3}></Col>
//                     <Col md={3}>
//                         <div className='payment__text' >
//                              <Input
//                         className='form-control payment__input'
//                         type='text'
//                         id={`Shop-cashBasicPayment-${j}`}
//                         placeholder='12'
//                         value={
//                           store.projectData.basements[j]
//                             .cashBasicPayment
//                         }
//                         onChange={e => {
//                           dispatch(
//                             updateFloorProperties([
//                               // make a check on cashBasicPayment
//                            (store.projectData.basements[j].basicPlan === 'Quarter' ?  
//                            (e.target.value > store.projectData.basements[j].installmentPerDuration/3 ? store.projectData.basements[j].installmentPerDuration/3 : e.target.value)
//                             : 
//                            (e.target.value > store.projectData.basements[j].installmentPerDuration ? store.projectData.basements[j].installmentPerDuration : e.target.value) ),
//                             // e.target.value,  
//                             'basements',
//                               j,
//                               'cashBasicPayment'

//                             ])
//                           )
//                           dispatch(
//                             updateFloorProperties([
//            ( store.projectData.basements[j].basicPlan === 'Monthly' ? 
//            ( store.projectData.basements[j].installmentPerDuration === 0 ? (0) : ((store.projectData.basements[j].installmentPerDuration) - (e.target.value)) ) 
//                :
//            ( store.projectData.basements[j].installmentPerDuration === 0 ? (0) : (((store.projectData.basements[j].installmentPerDuration) / 3 ) - (e.target.value)) ) ),
//                               'basements',
//                               j,
//                               'duesPerMonth'
//                             ])
//                           )
//                           dispatch(
//                             updateFloorProperties([
//                               0,
//                               'basements',
//                               j,
//                               'arrearsBasicIntallmentOnEachPeriod'
//                             ])
//                           )
//                         }
//                       }

//                     />
//                         </div>
                        
//                       </Col>
//                       {/* select Options */}
//                       <Col md={3} style={{display: 'flex', justifyContent: 'flex-start'}}>
//                       <div style={{width: '70%'}} className='payment__text'>
//                       <select
//                       className='form-control payment__select'
//                       style={{
//                         paddingLeft: 8,
//                         borderRadius: 4,
//                         color: '#001',
//                         outline: 'none',
                        
//                         // marginLeft: -10
//                       }}
//                       id={`Shop-Plan-${j}`}
//                                 name='icon-primary'
//                                 value={
//                                   store.projectData.basements[j].basicPlanForDues
//                                 }
//                                 onChange={e => {
//                                   dispatch(
//                                     updateFloorProperties([
//                                       e.target.value,
//                                       'basements',
//                                       j,
//                                       'basicPlanForDues'
//                                     ])
//                                   )
                                
//                                   if (e.target.value === 'Annually') { 

//                                 dispatch(
//                                   updateFloorProperties([
//                                     (store.projectData.basements[j].basicPlan === 'Quarter' ? 
//                                     (store.projectData.basements[j].cashBasicPayment === 0 ? (0) :
//                                     //  ( (4 * store.projectData.basements[j].installmentPerDuration) - (store.projectData.basements[j].cashBasicPayment  * 12))
//                                       (12 * (store.projectData.basements[j].duesPerMonth )) 
//                                     ) 
//                                           : 
//                                     (store.projectData.basements[j].cashBasicPayment === 0 ? 
//                                       (0) :
//                                       //  ((12 * store.projectData.basements[j].installmentPerDuration) - (store.projectData.basements[j].cashBasicPayment * 12) )) 
//                                       (12 * store.projectData.basements[j].duesPerMonth ))),
//                                     'basements',
//                                     j,
//                                     'arrearsBasicIntallmentOnEachPeriod'
//                                   ])
//                                 )
                            
//                                } else if (e.target.value === 'Quarterly') {
//                                 dispatch(
//                                   updateFloorProperties([
//                                     ( store.projectData.basements[j].basicPlan === 'Monthly' ? 
//                                     (store.projectData.basements[j].cashBasicPayment === 0 ? (0) :
//                                     //  (((12 * store.projectData.basements[j].installmentPerDuration) - (store.projectData.basements[j].cashBasicPayment * 12) ) / 4  )
//                                     (3 * store.projectData.basements[j].duesPerMonth)) 
//                                        :
//                                     (store.projectData.basements[j].cashBasicPayment === 0 ? (0) : (
//                                       // ((4 * store.projectData.basements[j].installmentPerDuration) - (store.projectData.basements[j].cashBasicPayment * 12) ) / 4 )
//                                           ((3 * store.projectData.basements[j].duesPerMonth))
//                                       ))
//                                     ),
//                                     'basements',
//                                     j,
//                                     'arrearsBasicIntallmentOnEachPeriod',
//                                   ])
//                                 )
                              
//                                } else if(e.target.value === 'Bi-Annual'){
//                                 dispatch(
//                                   updateFloorProperties([
//                                     // ( ((4 * store.projectData.basements[j].installmentPerDuration) - (store.projectData.basements[j].cashBasicPayment * 12) ) / 2 ),
//                                    (store.projectData.basements[j].basicPlan === 'Monthly' ?
//                                     (6 * store.projectData.basements[j].duesPerMonth) 
//                                     : 
//                                     (6 * store.projectData.basements[j].duesPerMonth)), 
//                                     'basements',
//                                     j,
//                                     'arrearsBasicIntallmentOnEachPeriod',
//                                   ])
//                                 )
//                                }
//                                 }}
//                       >
//                         <option>Quarterly</option>
//                         <option>Annually</option>
//                         <option>Bi-Annual</option>
//                       </select>
//                       </div>

//                        </Col>

//                        <Col md={3} style={{display: 'flex', justifyContent: 'flex-start'}}>
//                       <div className='payment__text'>
//                          {store.projectData.basements[j].arrearsBasicIntallmentOnEachPeriod}
//                         </div>
//                        </Col>
                      
//                     </Row>
//                     <hr style={{ color: '#b3b3b3', backgroundColor: '#b3b3b3', height: 1, width: '60%', marginLeft: '26%', marginRight: 'auto' }} />

//                      {/* for Minimum Price */}
//                     <Row>
//                     <Col md={1} className="payment__header"></Col>
//                     <Col md={2} className="payment__header">Min. Total Cost</Col>
//                     <Col md={2} className="payment__header">Down Payment (%)</Col>
//                     <Col md={2} className="payment__header">Down Payment (Rs)</Col>
//                     <Col md={2} className="payment__header">Remaining(Rs)</Col>
//                     <Col md={1} className="payment__header">Years</Col>
//                     <Col md={1} className="payment__header"> Months / Quarters</Col>
//                     <Col md={1} className="payment__header">Installment</Col>
//                   </Row>
//                   <Row className='mt-1'>
//                       <Col md={1} ><div className='payment__text' style={{fontSize:10, fontWeight: 600}}>Minimum Price </div></Col>
                     
//                       <Col md={2} >
                        
//                       <Col md={1}> 
//                        <div className='payment__text' style={{width:100}}>
//                       {store.projectData.basements[j].minPrice}
//                        </div>
//                        </Col> 
                       
//                       </Col>
               

//                       <Col md={2} style={{display: 'flex', justifyContent: 'flex-start'}}>
//                         <div className='payment__text'>
//                         <Input
//                         className='form-control payment__input'
//                         type='number'
//                         readOnly
//                         id={`Shop-downPaymentPercentage-${j}`}
//                         placeholder='12'
//                         value={
//                           store.projectData.basements[j]
//                             .downPaymentBasicPercentage
//                         }
//                         onFocus={(e) => e.target.select()}
                        
//                         />
//                         </div>
//                       </Col>
//                       <Col md={2}>
//                         <div className='payment__text'>
//                            {/* payment in rs */}
//                             <Input
//                         className='form-control payment__input'
//                         type='number'
//                         id={`Shop-downPaymentRs-${j}`}
//                         placeholder='12'
//                         readOnly
//                         value={
//                           store.projectData.basements[j]
//                             .downPaymentBasicInRsForMin
//                         }
//                         />
//                         </div>
//                       </Col>
//                       <Col md={2}>
//                         <div className='payment__text' >
//                             {/* Remainings */}
//                              <Input
//                         className='form-control payment__input'
//                         type='number'
//                         id={`Shop-remainingBasicRsForMin-${j}`}
//                         placeholder='12'
//                         readOnly
//                         value={
//                           store.projectData.basements[j]
//                             .remainingBasicRsForMin
           
//                         }
//                     />
//                         </div>
                        
//                       </Col>
//        {/* years */}
//                    <Col md={1}>
//                         <div className='payment__years'
//                         style={{marginLeft: -20}}
//                         >
//                             <Input
//                             className='form-control payment__input'
//                               type='number'
//                               readOnly
//                               id={`Shop-paymentBasicYears-${j}`}
//                               style={{width: '100%'}}
//                               placeholder='Years'
//                               value={
//                                 store.projectData.basements[j].paymentBasicYears
//                               }
                              
//                             />
                         
//                         </div>
//                       </Col> 
//                 {/* yrs end */}
//                       <Col md={1} style={{display: 'flex', justifyContent: 'flex-start'}}>
//                       <div className='payment__text'>
//                       <select
//                       className='form-control payment__select'
                      
//                       style={{
//                         padding: 5,
//                         borderRadius: 4,
//                         color: '#001',
//                         outline: 'none',
//                         // marginLeft: -10
//                       }}
//                       id={`Shop-Plan-${j}`}
//                                 name='icon-primary'
//                                 value={
//                                   store.projectData.basements[j].basicPlanForMin
//                                 }
//                                 onChange={e => {
//                                   dispatch(
//                                     updateFloorProperties([
//                                       e.target.value,
//                                       'basements',
//                                       j,
//                                       'basicPlanForMin'
//                                     ])
//                                   )
//                                   dispatch(
//                                     updateFloorProperties([
//                                        0,
//                                       'basements',
//                                       j,
//                                       'cashBasicPaymentForMin'
//                                     ])
//                                   )
//                                   dispatch(
//                                     updateFloorProperties([
//                                        0,
//                                       'basements',
//                                       j,
//                                       'arrearsBasicIntallmentOnEachPeriodForMin'
//                                     ])
//                                   )
                                
//                                   if (e.target.value === 'Monthly') { 
//                                 dispatch(
//                                   updateFloorProperties([
//                                     ((store.projectData.basements[j].paymentBasicYears * (12 / 3))),
//                                     'basements',
//                                     j,
//                                     'shopInstallmentDurationForMin'
//                                   ])
//                                 )
//                                 dispatch(
//                                   updateFloorProperties([
//                                     (store.projectData.basements[j].remainingBasicRsForMin / store.projectData.basements[j].shopInstallmentDurationForMin),
//                                     'basements',
//                                     j,
//                                     'installmentPerDurationForMin'
//                                   ])
//                                 )
//                                } else if (e.target.value === 'Quarter') {
//                                 dispatch(
//                                   updateFloorProperties([
//                                     (store.projectData.basements[j].paymentBasicYears * 12),
//                                     'basements',
//                                     j,
//                                     'shopInstallmentDurationForMin',
//                                   ])
//                                 )
//                                 dispatch(
//                                   updateFloorProperties([
//                                     (store.projectData.basements[j].remainingBasicRsForMin / store.projectData.basements[j].shopInstallmentDurationForMin),
//                                     'basements',
//                                     j,
//                                     'installmentPerDurationForMin'
//                                   ])
//                                 )
//                                }
                                                                    
                                  
//                                 }}
//                       >
//                         <option>Monthly</option>
//                         <option>Quarter</option>

//                       </select>
//                       </div>

//                        </Col>

                    
//                       <Col md={1}> 
//                       <div className='payment__text'
//                       >
                        
//                      {store.projectData.basements[j].installmentPerDurationForMin}
                     
//                       </div>
                       
//                       </Col>
//                     </Row>
//                     <Row className="mt-2 mb-2">
//                     <Col md={3} className="payment__header"></Col>
//                   <Col md={3} className="payment__header">installment Per Month</Col>
//                   <Col md={3} className="payment__header">Arrears Per quarter/annum</Col>
//                   <Col md={3} className="payment__header">Arrears Lump Sum</Col> 
//                   </Row>
//                   <Row className='mt-2 mb-2'>
//                       <Col md={3}></Col>
//                     <Col md={3}>
//                         <div className='payment__text' >
//                              <Input
//                         className='form-control payment__input'
//                         type='text'
//                         id={`Shop-cashBasicPayment-${j}`}
//                         placeholder='12'
//                         value={
//                           store.projectData.basements[j]
//                             .cashBasicPaymentForMin
//                         }
//                         onChange={e => {
//                           dispatch(
//                             updateFloorProperties([
//                               // make a check on cashBasicPaymentForMin
//                            (store.projectData.basements[j].basicPlanForMin === 'Quarter' ?  
//                            (e.target.value > store.projectData.basements[j].installmentPerDurationForMin/3 ? store.projectData.basements[j].installmentPerDurationForMin/3 : e.target.value)
//                             : 
//                            (e.target.value > store.projectData.basements[j].installmentPerDurationForMin ? store.projectData.basements[j].installmentPerDurationForMin : e.target.value) ),
//                             // e.target.value,  
//                             'basements',
//                               j,
//                               'cashBasicPaymentForMin'

//                             ])
//                           )
//                           dispatch(
//                             updateFloorProperties([
//            ( store.projectData.basements[j].basicPlanForMin === 'Quarter' ? 
//            ( store.projectData.basements[j].installmentPerDurationForMin === 0 ? (0) : ((store.projectData.basements[j].installmentPerDurationForMin / 3) - (e.target.value)) )
//            :
//             ( store.projectData.basements[j].installmentPerDurationForMin === 0 ? (0) : ((store.projectData.basements[j].installmentPerDurationForMin) - (e.target.value)) )
//            ),
//                               'basements',
//                               j,
//                               'duesPerMonthForMin'
//                             ])
//                           )
//                           dispatch(
//                             updateFloorProperties([
//                               0,
//                               'basements',
//                               j,
//                               'arrearsBasicIntallmentOnEachPeriodForMin'
//                             ])
//                           )
//                         }
//                       }

//                     />
//                         </div>
                        
//                       </Col>
//                       {/* select Options */}
//                       <Col md={3} style={{display: 'flex', justifyContent: 'flex-start'}}>
//                       <div style={{width: '70%'}} className='payment__text'>
//                       <select
//                       className='form-control payment__select'
//                       style={{
//                         paddingLeft: 8,
//                         borderRadius: 4,
//                         color: '#001',
//                         outline: 'none',
                        
//                         // marginLeft: -10
//                       }}
//                       id={`Shop-Plan-${j}`}
//                                 name='icon-primary'
//                                 value={
//                                   store.projectData.basements[j].basicPlanForDuesForMin
//                                 }
//                                 onChange={e => {
//                                   dispatch(
//                                     updateFloorProperties([
//                                       e.target.value,
//                                       'basements',
//                                       j,
//                                       'basicPlanForDuesForMin'
//                                     ])
//                                   )
//                                   dispatch(
//                                     updateFloorProperties([
//                                       0,
//                                       'basements',
//                                       j,
//                                       'arrearsBasicIntallmentOnEachPeriodForMin'
//                                     ])
//                                   )
                               
//                                 if (e.target.value === 'annually') { 

//                                   dispatch(
//                                     updateFloorProperties([
//                                       (store.projectData.basements[j].basicPlanForMin === 'Quarter' ? 
//                                       (store.projectData.basements[j].cashBasicPaymentForMin === 0 ? (0) :
//                                       //  ( (4 * store.projectData.basements[j].installmentPerDuration) - (store.projectData.basements[j].cashBasicPaymentForMin  * 12))
//                                         (12 * (store.projectData.basements[j].duesPerMonthForMin )) 
//                                       ) 
//                                             : 
//                                       (store.projectData.basements[j].cashBasicPaymentForMin === 0 ? 
//                                         (0) :
//                                         //  ((12 * store.projectData.basements[j].installmentPerDuration) - (store.projectData.basements[j].cashBasicPaymentForMin * 12) )) 
//                                         (12 * store.projectData.basements[j].duesPerMonthForMin ))),
//                                       'basements',
//                                       j,
//                                       'arrearsBasicIntallmentOnEachPeriodForMin'
//                                     ])
//                                   )
                              
//                                  } else if (e.target.value === 'quarterly') {
//                                   dispatch(
//                                     updateFloorProperties([
//                                       ( store.projectData.basements[j].basicPlanForMin === 'Monthly' ? 
//                                       (store.projectData.basements[j].cashBasicPaymentForMin === 0 ? (0) :
//                                       //  (((12 * store.projectData.basements[j].installmentPerDuration) - (store.projectData.basements[j].cashBasicPaymentForMin * 12) ) / 4  )
//                                       (3 * store.projectData.basements[j].duesPerMonthForMin)) 
//                                          :
//                                       (store.projectData.basements[j].cashBasicPaymentForMin === 0 ? (0) : (
//                                         // ((4 * store.projectData.basements[j].installmentPerDuration) - (store.projectData.basements[j].cashBasicPaymentForMin * 12) ) / 4 )
//                                             ((3 * store.projectData.basements[j].duesPerMonthForMin))
//                                         ))
//                                       ),
//                                       'basements',
//                                       j,
//                                       'arrearsBasicIntallmentOnEachPeriodForMin',
//                                     ])
//                                   )
                                
//                                  } else if(e.target.value === 'bi-annual'){
//                                   dispatch(
//                                     updateFloorProperties([
//                                       // ( ((4 * store.projectData.basements[j].installmentPerDuration) - (store.projectData.basements[j].cashBasicPaymentForMin * 12) ) / 2 ),
//                                      (store.projectData.basements[j].basicPlanForMin === 'Monthly' ?
//                                       (6 * store.projectData.basements[j].duesPerMonthForMin) 
//                                       : 
//                                       (6 * store.projectData.basements[j].duesPerMonthForMin)), 
//                                       'basements',
//                                       j,
//                                       'arrearsBasicIntallmentOnEachPeriodForMin',
//                                     ])
//                                   )
//                                  }
//                                 }}
//                       >
//                         <option>quarterly</option>
//                         <option>bi-annual</option>
//                         <option>annually</option>
                        
//                       </select>
//                       </div>

//                        </Col>

//                        <Col md={3} style={{display: 'flex', justifyContent: 'flex-start'}}>
//                       <div className='payment__text'>
//                          {store.projectData.basements[j].arrearsBasicIntallmentOnEachPeriodForMin}
//                         </div>
//                        </Col>
                      
//                     </Row>
//                   </Row>
//           <hr style={{ color: '#000', backgroundColor: '#000', height: 1, width: '90%', marginLeft: 'auto', marginRight: 'auto' }} />

//           </Card>
//         </Accordion>
//                       </Row>
//                      </div>
//                      </>
//                      )}
//                  </Repeater>
//     </div>
//   )
// }

// export default BasementBasicRepeatingForm













