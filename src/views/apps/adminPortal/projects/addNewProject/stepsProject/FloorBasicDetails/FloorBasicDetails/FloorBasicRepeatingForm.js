

import React from 'react'
import '../../FloorDetails/PaymentPlan/Payment.css'
import { useState, useContext, useEffect } from 'react'
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
import { InputNumberCommas } from 'react-number-format-with-commas'


const FloorBasicRepeatingForm = () => {
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
  
    const handleChangeDownPaymentPercent = (e, f) => {
      dispatch(
        updateFloorProperties([
          Math.max(0, Math.min(100, Number(e.target.value))),
          'floors',
          f,
          'downPaymentBasicPercentage'
        ])
      )
    }
    // const handleChangeDownPaymentPercentForMin = (e, f) => {
    //   dispatch(
    //     updateFloorProperties([
    //       Math.max(0, Math.min(100, Number(e.target.value))),
    //       'floors',
    //       f,
    //       'downPaymentBasicPercentageForMin'
    //     ])
    //   )
    // }
  
    
      const {
        control,
        setError,
        handleSubmit,
        formState: { errors }
      } = useForm({ defaultValues })

  return (
    <div>
        <Repeater
                 count={store.projectData.masterDetails.countFloors}
                 > 
       {f => (
                      <>
                      <div  >
                        <Row> <h2 className='mt-1 mb-2' style={{fontFamily: 'cursive'}}>floor-{f+1}</h2></Row>
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
                    <div style={{fontSize: 10}}>  floors-{f+1} </div>
                     
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
                                  'floors',
                                  f,
                                  'floorid'
                                ])
                              )
                              dispatch(
                                updateFloorProperties([
                                  val ? val.label : 'none',
                                  'floors',
                                  f,
                                  'floorType'
                                ])
                              )
                            }
                          }
                            value={floorType.find(
                              c =>
                                c.value ===
                                store.projectData.floors[f].floorid
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
                        id={`animation-cost-${f}`}
                        placeholder='32'
                        value={store.projectData.floors[f].noOfUnits}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'floors',
                              f,
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
                        id={`animation-cost-${f}`}
                        placeholder='32'
                        value={store.projectData.floors[f].pricePerSqFt}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'floors',
                              f,
                              'pricePerSqFt'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
                             (e.target.value * store.projectData.floors[f].minArea),
                              'floors',
                              f,
                              'minPrice'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
                              (e.target.value * store.projectData.floors[f].maxArea),
                              'floors',
                              f,
                              'maxPrice'
                            ])
                          )

                          // make everything 0
                          // make downPaymentBasicPercentage 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'floors',
                              f,
                              'downPaymentBasicPercentage'
                            ])
                          )
                          // make downPaymentBasicPercentageForMin 0
                          // dispatch(
                          //   updateFloorProperties([
                          //     0,
                          //     'floors',
                          //     f,
                          //     'downPaymentBasicPercentageForMin'
                          //   ])
                          // )
                          // make downpaymentRs 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'floors',
                              f,
                              'downPaymentBasicInRs'
                            ])
                          )
                           // make remainingBasicRs 0
                           dispatch(
                            updateFloorProperties([
                              0,
                              'floors',
                              f,
                              'remainingBasicRs'
                            ])
                          )
                          //make downPaymentBasicForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'floors',
                              f,
                              'downPaymentBasicInRsForMin'
                            ])
                          )
                          //make remainingRsBasicForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'floors',
                              f,
                              'remainingBasicRsForMin'
                            ])
                          )
                          // make paymentBasicYears 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'floors',
                              f,
                              'paymentBasicYears'
                            ]),
                           
                          )
                          // make paymentBasicYearsForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'floors',
                              f,
                              'paymentBasicYearsForMin'
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
                        id={`animation-cost-${f}`}
                        placeholder='32'
                        value={store.projectData.floors[f].minArea}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'floors',
                              f,
                              'minArea'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
                             (e.target.value * store.projectData.floors[f].pricePerSqFt),
                              
                              'floors',
                              f,
                              'minPrice'
                            ])
                          )

                          // make everything 0
                          // make downPaymentBasicPercentage 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'floors',
                              f,
                              'downPaymentBasicPercentage'
                            ])
                          )
                          // make downPaymentBasicPercentageForMin 0
                          // dispatch(
                          //   updateFloorProperties([
                          //     0,
                          //     'floors',
                          //     f,
                          //     'downPaymentBasicPercentageForMin'
                          //   ])
                          // )
                          // make downpaymentRs 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'floors',
                              f,
                              'downPaymentBasicInRs'
                            ])
                          )
                           // make remainingBasicRs 0
                           dispatch(
                            updateFloorProperties([
                              0,
                              'floors',
                              f,
                              'remainingBasicRs'
                            ])
                          )
                          //make downPaymentBasicForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'floors',
                              f,
                              'downPaymentBasicInRsForMin'
                            ])
                          )
                          //make remainingRsBasicForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'floors',
                              f,
                              'remainingBasicRsForMin'
                            ])
                          )
                          //make PaymentYears 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'floors',
                              f,
                              'paymentBasicYearsForMin'
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
                        id={`animation-cost-${f}`}
                        placeholder='32'
                        value={store.projectData.floors[f].maxArea}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'floors',
                              f,
                              'maxArea'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
                             (e.target.value * store.projectData.floors[f].pricePerSqFt),
                              'floors',
                              f,
                              'maxPrice'
                            ])
                          )

                          // make everything 0
                          // make downPaymentBasicPercentage 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'floors',
                              f,
                              'downPaymentBasicPercentage'
                            ])
                          )
                          // make downPaymentBasicPercentageForMin 0
                          // dispatch(
                          //   updateFloorProperties([
                          //     0,
                          //     'floors',
                          //     f,
                          //     'downPaymentBasicPercentageForMin'
                          //   ])
                          // )
                          // make downpaymentRs 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'floors',
                              f,
                              'downPaymentBasicInRs'
                            ])
                          )
                           // make remainingBasicRs 0
                           dispatch(
                            updateFloorProperties([
                              0,
                              'floors',
                              f,
                              'remainingBasicRs'
                            ])
                          )
                          //make downPaymentBasicForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'floors',
                              f,
                              'downPaymentBasicInRsForMin'
                            ])
                          )
                          //make remainingRsBasicForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'floors',
                              f,
                              'remainingBasicRsForMin'
                            ])
                          )
                          // make paymentBasicYears 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'floors',
                              f,
                              'paymentBasicYears'
                            ])
                          )
                         
                        }}
                      />
                      </div>
                      </Col>
                      <Col md={1}> 
                      <div className='payment__text'
                      >
                        
                     {(store.projectData.floors[f].minPrice)?.toLocaleString()}
                     
                      </div>
                       
                      </Col>
                      <Col md={1}> 
                      <div className='payment__text'
                      >
                        
                     {(store.projectData.floors[f].maxPrice)?.toLocaleString()}
                     
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
                        
                     {(store.projectData.floors[f].maxPrice)?.toLocaleString()}
                     
                      </div>
                      </Col> 

                      </Col>

                      <Col md={2} style={{display: 'flex', justifyContent: 'flex-start'}}>
                        <div className='payment__text'>
                        <Input
                        className='form-control payment__input'
                        type='number'
                        id={`Shop-downPaymentPercentage-${f}`}
                        placeholder='12'
                        value={
                          store.projectData.floors[f]
                            .downPaymentBasicPercentage
                        }
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => {
                          handleChangeDownPaymentPercent(e, f)
                                                  
                          dispatch(
                            updateFloorProperties([
                      
                           ( 
                             ((e.target.value * store.projectData.floors[f].maxPrice) / 100)),
                              'floors',
                              f,
                              'downPaymentBasicInRs'
                            ])
                          )
                          
                          dispatch(
                            updateFloorProperties([
                           ( 
                             ((e.target.value * store.projectData.floors[f].minPrice) / 100)),
                              'floors',
                              f,
                              'downPaymentBasicInRsForMin'
                            ])
                          )

                          
                    // update downPaymentPercentage For minimum prices
                    dispatch(
                      updateFloorProperties([
                      ( (store.projectData.floors[f].maxPrice) - ((e.target.value * store.projectData.floors[f].maxPrice) / 100)),
                      'floors',
                      f,
                      'remainingBasicRs'
                      ])
                    )
                   dispatch(
                                 updateFloorProperties([
                                 ( (store.projectData.floors[f].minPrice) - ((e.target.value * store.projectData.floors[f].minPrice) / 100)),
                                 'floors',
                                 f,
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
                            <Input
                        className='form-control payment__input'
                        type='number'
                        id={`Shop-downPaymentRs-${f}`}
                        placeholder='12'
                        readOnly
                        value={
                          store.projectData.floors[f]
                            .downPaymentBasicInRs
                        }
                        />
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className='payment__text' >
                            {/* Remainings */}
                             <Input
                        className='form-control payment__input'
                        type='number'
                        id={`Shop-remainingBasicRs-${f}`}
                        placeholder='12'
                        readOnly
                        value={
                          store.projectData.floors[f]
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
                              id={`Shop-paymentBasicYears-${f}`}
                              style={{width: '100%'}}
                              placeholder='Years'
                              value={
                                store.projectData.floors[f].paymentBasicYears
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorProperties([
                                    e.target.value,
                                    'floors',
                                    f,
                                    'paymentBasicYears'
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
                      id={`Shop-Plan-${f}`}
                                name='icon-primary'
                                value={
                                  store.projectData.floors[f].basicPlan
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorProperties([
                                      e.target.value,
                                      'floors',
                                      f,
                                      'basicPlan'
                                    ])
                                  )
                                  dispatch(
                                    updateFloorProperties([
                                      0,
                                      'floors',
                                      f,
                                      'cashBasicPayment'
                                    ])
                                  )
                                  dispatch(
                                    updateFloorProperties([
                                      0,
                                      'floors',
                                      f,
                                      'arrearsBasicIntallmentOnEachPeriod'
                                    ])
                                  )
                                
                                  if (e.target.value === 'Monthly') { 
                                dispatch(
                                  updateFloorProperties([
                                    ((store.projectData.floors[f].paymentBasicYears * (12 / 3))),
                                    'floors',
                                    f,
                                    'shopInstallmentDuration'
                                  ])
                                )
                                dispatch(
                                  updateFloorProperties([
                                    (store.projectData.floors[f].remainingBasicRs / store.projectData.floors[f].shopInstallmentDuration),
                                    'floors',
                                    f,
                                    'installmentPerDuration'
                                  ])
                                )
                               } else if (e.target.value === 'Quarter') {
                                dispatch(
                                  updateFloorProperties([
                                    (store.projectData.floors[f].paymentBasicYears * 12),
                                    'floors',
                                    f,
                                    'shopInstallmentDuration',
                                  ])
                                )
                                dispatch(
                                  updateFloorProperties([
                                    (store.projectData.floors[f].remainingBasicRs / store.projectData.floors[f].shopInstallmentDuration),
                                    'floors',
                                    f,
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
                        
                     {(store.projectData.floors[f].installmentPerDuration)?.toLocaleString()}
                     
                      </div>
                       
                      </Col>
                    </Row>  
                    <Row>
                    <Col md={3} className="payment__header"></Col>
                  <Col md={3} className="payment__header">{store.projectData.floors[f].basicPlan === 'Quarter' ? 'installment per quarter' : 'Installment Per Month'}</Col>
                  <Col md={3} className="payment__header">Arrears { store.projectData.floors[f].basicPlanForDues ==='Quarterly' ? 'Per Quarter' : store.projectData.floors[f].basicPlanForDues === 'Bi-Annual'  ? 'Per Bi-Annum' : store.projectData.floors[f].basicPlanForDues === 'Annually' ? 'Per Annum' : ''   } </Col>
                  <Col md={3} className="payment__header">Arrears Lump Sum</Col> 
                  </Row>
                  <Row className='mt-2 mb-2'>
                      <Col md={3}></Col>
                    <Col md={3}>
                        <div className='payment__text' >
                             <Input
                        className='form-control payment__input'
                        type='number'
                        id={`Shop-cashBasicPayment-${f}`}
                        placeholder='12'
                        value={
                          store.projectData.floors[f]
                            .cashBasicPayment
                        }
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              // make a check on cashBasicPayment
                          
                           (e.target.value > store.projectData.floors[f].installmentPerDuration ? store.projectData.floors[f].installmentPerDuration : e.target.value) ,
                            'floors',
                              f,
                              'cashBasicPayment'

                            ])
                          )

                          dispatch(
                                updateFloorProperties([
                                  ( store.projectData.floors[f].installmentPerDuration === 0 ? (0) : (((store.projectData.floors[f].installmentPerDuration)  ) - (e.target.value)) ),
                                      'floors',
                                     f,
                                  (store.projectData.floors[f].basicPlan === 'Quarter' ? 'duesPerQuarter' : 'duesPerMonth' )
                                ])
                              )

                          dispatch(
                            updateFloorProperties([
                              0,
                              'floors',
                              f,
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
                      id={`Shop-Plan-${f}`}
                                name='icon-primary'
                                value={
                                  store.projectData.floors[f].basicPlanForDues
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorProperties([
                                      e.target.value,
                                      'floors',
                                      f,
                                      'basicPlanForDues'
                                    ])
                                  )
                                
                                  if (e.target.value === 'Annually') { 

                                dispatch(
                                  updateFloorProperties([
                                      store.projectData.floors[f].basicPlan === 'Quarter' ? 
                                  (   ( (4 * store.projectData.floors[f].installmentPerDuration) - (store.projectData.floors[f].cashBasicPayment  * 12) )
                                      (4 * (store.projectData.floors[f].duesPerQuarter )) 
                                     
                                      )    : 
                                    (
                                      (12 * store.projectData.floors[f].duesPerMonth ) )
                                    ,
                                    'floors',
                                    f,
                                    'arrearsBasicIntallmentOnEachPeriod'
                                  ])
                                )
                            
                               } else if (e.target.value === 'Quarterly') {
                                dispatch(
                                  updateFloorProperties([
                                    ( store.projectData.floors[f].basicPlan === 'Monthly' ? 
                                   ( (store.projectData.floors[f].cashBasicPayment === 0 ? (0) :
                                   (3 * store.projectData.floors[f].duesPerMonth)) 
                                       )
                                           :
                                    (store.projectData.floors[f].cashBasicPayment === 0 ? (0) : (
                                       ((store.projectData.floors[f].duesPerQuarter))
                                      ))
                                    ),
                                    'floors',
                                    f,
                                    'arrearsBasicIntallmentOnEachPeriod',
                                  ])
                                )
                              
                               } else if(e.target.value === 'Bi-Annual'){
                                dispatch(
                                  updateFloorProperties([
                                  (store.projectData.floors[f].basicPlan === 'Monthly' ?
                                    (6 * store.projectData.floors[f].duesPerMonth) 
                                    : 
                                    // as there are 2 quarters in a bi-annual
                                    (2 * store.projectData.floors[f].duesPerQuarter)), 
                                    'floors',
                                    f,
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
                         {(store.projectData.floors[f].arrearsBasicIntallmentOnEachPeriod)?.toLocaleString()}
                        </div>
                       </Col>
                      
                    </Row>
                    <hr style={{ color: '#b3b3b3', backgroundColor: '#b3b3b3', height: 1, width: '60%', marginLeft: '26%', marginRight: 'auto' }} />
//

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
                      {(store.projectData.floors[f].minPrice)?.toLocaleString()}
                       </div>
                       </Col> 
                       
                      </Col>
               

                      <Col md={2} style={{display: 'flex', justifyContent: 'flex-start'}}>
                        <div className='payment__text'>
                        <Input
                        className='form-control payment__input'
                        type='number'
                        readOnly
                        id={`Shop-downPaymentPercentage-${f}`}
                        placeholder='12'
                        value={
                          store.projectData.floors[f]
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
                        id={`Shop-downPaymentRs-${f}`}
                        placeholder='12'
                        readOnly
                        value={
                          store.projectData.floors[f]
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
                        id={`Shop-remainingBasicRsForMin-${f}`}
                        placeholder='12'
                        readOnly
                        value={
                          store.projectData.floors[f]
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
                              id={`Shop-paymentBasicYears-${f}`}
                              style={{width: '100%'}}
                              placeholder='Years'
                              value={
                                store.projectData.floors[f].paymentBasicYears
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
                      id={`Shop-Plan-${f}`}
                                name='icon-primary'
                                value={
                                  store.projectData.floors[f].basicPlanForMin
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorProperties([
                                      e.target.value,
                                      'floors',
                                      f,
                                      'basicPlanForMin'
                                    ])
                                  )
                                  dispatch(
                                    updateFloorProperties([
                                       0,
                                      'floors',
                                      f,
                                      'cashBasicPaymentForMin'
                                    ])
                                  )
                                  dispatch(
                                    updateFloorProperties([
                                       0,
                                      'floors',
                                      f,
                                      'arrearsBasicIntallmentOnEachPeriodForMin'
                                    ])
                                  )
                                
                                  if (e.target.value === 'Monthly') { 
                                dispatch(
                                  updateFloorProperties([
                                    ((store.projectData.floors[f].paymentBasicYears * (12 / 3))),
                                    'floors',
                                    f,
                                    'shopInstallmentDurationForMin'
                                  ])
                                )
                                dispatch(
                                  updateFloorProperties([
                                    (store.projectData.floors[f].remainingBasicRsForMin / store.projectData.floors[f].shopInstallmentDurationForMin),
                                    'floors',
                                    f,
                                    'installmentPerDurationForMin'
                                  ])
                                )
                               } else if (e.target.value === 'Quarter') {
                                dispatch(
                                  updateFloorProperties([
                                    (store.projectData.floors[f].paymentBasicYears * 12),
                                    'floors',
                                    f,
                                    'shopInstallmentDurationForMin',
                                  ])
                                )
                                dispatch(
                                  updateFloorProperties([
                                    (store.projectData.floors[f].remainingBasicRsForMin / store.projectData.floors[f].shopInstallmentDurationForMin),
                                    'floors',
                                    f,
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
                        
                     {(store.projectData.floors[f].installmentPerDurationForMin)?.toLocaleString()}
                     
                      </div>
                       
                      </Col>
                    </Row>
                    <Row className="mt-2 mb-2">
                    <Col md={3} className="payment__header"></Col>
                  <Col md={3} className="payment__header">{store.projectData.floors[f].basicPlanForMin === 'Quarter' ?  'installment Per Quarter' : 'installment Per Month'}</Col>
                  <Col md={3} className="payment__header">Arrears { store.projectData.floors[f].basicPlanForDuesForMin ==='quarterly' ? 'Per Quarter' : store.projectData.floors[f].basicPlanForDuesForMin === 'bi-annual'  ? 'Per Bi-Annum' : store.projectData.floors[f].basicPlanForDuesForMin === 'annually' ? 'Per Annum' : '' }</Col>
                  <Col md={3} className="payment__header">Arrears Lump Sum</Col> 
                  </Row>
                  <Row className='mt-2 mb-2'>
                      <Col md={3}></Col>
                    <Col md={3}>
                        <div className='payment__text' >
                             <Input
                        className='form-control payment__input'
                        type='number'
                        id={`Shop-cashBasicPayment-${f}`}
                        placeholder='12'
                        value={
                          store.projectData.floors[f]
                            .cashBasicPaymentForMin
                        }
                        onChange={e => {
                         
                            dispatch(
                              updateFloorProperties([
                                // make a check on cashBasicPayment
                           
                             (e.target.value > store.projectData.floors[f].installmentPerDurationForMin ? store.projectData.floors[f].installmentPerDurationForMin : e.target.value) ,
                              // e.target.value,  
                              'floors',
                                f,
                                'cashBasicPaymentForMin'
  
                              ])
                            )
  
                            dispatch(
                                  updateFloorProperties([
                                    ( store.projectData.floors[f].installmentPerDurationForMin === 0 ? (0) : (((store.projectData.floors[f].installmentPerDurationForMin)  ) - (e.target.value)) ),
                                        'floors',
                                       f,
                                    (store.projectData.floors[f].basicPlanForMin === 'Quarter' ? 'duesPerQuarterForMin' : 'duesPerMonthForMin' )
                                  ])
                                )


                          dispatch(
                            updateFloorProperties([
                              0,
                              'floors',
                              f,
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
                      id={`Shop-Plan-${f}`}
                                name='icon-primary'
                                value={
                                  store.projectData.floors[f].basicPlanForDuesForMin
                                }
                                 //here basicPlanForDuesForMin do nothing, we just show the target value in the select field
                                onChange={e => {
                                  dispatch(
                                    updateFloorProperties([
                                      e.target.value,
                                      'floors',
                                      f,
                                      'basicPlanForDuesForMin'
                                      ])
                                  )
                                  dispatch(
                                    updateFloorProperties([
                                      0,
                                      'floors',
                                      f,
                                      'arrearsBasicIntallmentOnEachPeriodForMin'
                                    ])
                                  )
                              //  if-else on arrears installments
                                  if (e.target.value === 'annually') { 

                                    dispatch(
                                      updateFloorProperties([
                                        
                                          store.projectData.floors[f].basicPlanForMin === 'Quarter' ? 
                                         (4 * store.projectData.floors[f].duesPerQuarterForMin ) 
                                         
                                              : 
                                        (
                                        12 * store.projectData.floors[f].duesPerMonthForMin 
                                        ),
                                        'floors',
                                        f,
                                        'arrearsBasicIntallmentOnEachPeriodForMin'
                                      ])
                                    )
                                
                                   } else if (e.target.value === 'quarterly') {
                                    dispatch(
                                      updateFloorProperties([
                                        ( store.projectData.floors[f].basicPlanForMin === 'Monthly' ? 
                                        (store.projectData.floors[f].cashBasicPaymentForMin === 0 ? (0) :
                                        (3 * store.projectData.floors[f].duesPerMonthForMin)) 
                                           :
                                        (store.projectData.floors[f].cashBasicPaymentForMin === 0 ? (0) : (
                                          ((store.projectData.floors[f].duesPerQuarterForMin))
                                          ))
                                        ),
                                        'floors',
                                        f,
                                        'arrearsBasicIntallmentOnEachPeriodForMin',
                                      ])
                                    )
                                  
                                   } else if(e.target.value === 'bi-annual'){
                                    dispatch(
                                      updateFloorProperties([
                                       (store.projectData.floors[f].basicPlanForMin === 'Monthly' ?
                                        (6 * store.projectData.floors[f].duesPerMonthForMin) 
                                        : 
                                        // as there are 2 quarters in a bi-annual
                                        (2 * store.projectData.floors[f].duesPerQuarterForMin)), 
                                        'floors',
                                        f,
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
                         {(store.projectData.floors[f].arrearsBasicIntallmentOnEachPeriodForMin)?.toLocaleString()}
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

export default FloorBasicRepeatingForm