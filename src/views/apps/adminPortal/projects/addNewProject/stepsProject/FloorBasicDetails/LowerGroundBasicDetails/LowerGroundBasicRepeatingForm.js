
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


const LowerGroundBasicRepeatingForm = ({j}) => {
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
   
     const handleChangeDownPaymentPercent = (e, l) => {
       dispatch(
         updateFloorProperties([
           Math.max(0, Math.min(100, Number(e.target.value))),
           'lowerGrounds',
           l,
           'downPaymentBasicPercentage'
         ])
       )
     }
     const handleChangeDownPaymentPercentForMin = (e, l) => {
       dispatch(
         updateFloorProperties([
           Math.max(0, Math.min(100, Number(e.target.value))),
           'lowerGrounds',
           l,
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
                 count={store.projectData.masterDetails.countLowerGrounds}
                 > 
    {l => (
                      <>
                      <div  >
                        <Row> <h2 className='mt-1 mb-2' style={{fontFamily: 'cursive'}}>lowerGround-{l+1}</h2></Row>
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
                    <div style={{fontSize: 10}}>  lowerGround-{l+1} </div>
                     
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
                                  'lowerGrounds',
                                  l,
                                  'floorid'
                                ])
                              )
                              dispatch(
                                updateFloorProperties([
                                  val ? val.label : 'none',
                                  'lowerGrounds',
                                  l,
                                  'floorType'
                                ])
                              )
                            }
                          }
                            value={floorType.find(
                              c =>
                                c.value ===
                                store.projectData.lowerGrounds[l].floorid
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
                        value={store.projectData.lowerGrounds[l].noOfUnits}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'lowerGrounds',
                              l,
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
                        value={(store.projectData.lowerGrounds[l].pricePerSqFt)}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'lowerGrounds',
                              l,
                              'pricePerSqFt'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
                             (e.target.value * store.projectData.lowerGrounds[l].minArea),
                              'lowerGrounds',
                              l,
                              'minPrice'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
                              (e.target.value * store.projectData.lowerGrounds[l].maxArea),
                              'lowerGrounds',
                              l,
                              'maxPrice'
                            ])
                          )

                          // make everything 0
                          // make downPaymentBasicPercentage 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
                              'downPaymentBasicPercentage'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
                              'cashBasicPaymentForMin'
                            ])
                          )
                          // make downpaymentRs 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
                              'downPaymentBasicInRs'
                            ])
                          )
                           // make remainingBasicRs 0
                           dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
                              'remainingBasicRs'
                            ])
                          )
                          //make downPaymentBasicForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
                              'downPaymentBasicInRsForMin'
                            ])
                          )
                          //make remainingRsBasicForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
                              'remainingBasicRsForMin'
                            ])
                          )
                          // make paymentBasicYears 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
                              'paymentBasicYears'
                            ]),
                           
                          )
                          // make paymentBasicYearsForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
                              'paymentBasicYearsForMin'
                            ])
                          )
                          // make installmentPerDuration 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
                              'installmentPerDuration'
                            ])
                          )
                          // make installmentPerDurationForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
                              'installmentPerDurationForMin'
                            ])
                          )
                          // make cashBasicPayment 0
                          dispatch(
                            updateFloorProperties([
                            0,
                            'lowerGrounds',
                            l,
                            'cashBasicPayment'
                          ] ) 
                          )
                          //make arrearsBasicIntallmentOnEachPeriod 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
                              'arrearsBasicIntallmentOnEachPeriod'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
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
                        value={store.projectData.lowerGrounds[l].minArea}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'lowerGrounds',
                              l,
                              'minArea'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
                             (e.target.value * store.projectData.lowerGrounds[l].pricePerSqFt),
                              
                              'lowerGrounds',
                              l,
                              'minPrice'
                            ])
                          )

                          // make everything 0
                          // make downPaymentBasicPercentage 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
                              'downPaymentBasicPercentage'
                            ])
                          )
                          
                          // make downpaymentRs 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
                              'downPaymentBasicInRs'
                            ])
                          )
                           // make remainingBasicRs 0
                           dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
                              'remainingBasicRs'
                            ])
                          )
                          //make downPaymentBasicForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
                              'downPaymentBasicInRsForMin'
                            ])
                          )
                          //make remainingRsBasicForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
                              'remainingBasicRsForMin'
                            ])
                          )
                          //make PaymentYears 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
                              'paymentBasicYears'
                            ])
                          )
                          // make paymentBasicYearsForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
                              'paymentBasicYearsForMin'
                            ])
                          )
                          // make installmentPerDuration 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
                              'installmentPerDuration'
                            ])
                          )
                          // make installmentPerDurationForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
                              'installmentPerDurationForMin'
                            ])
                          )
                          // make cashBasicPayment 0
                          dispatch(
                            updateFloorProperties([
                            0,
                            'lowerGrounds',
                            l,
                            'cashBasicPayment'
                          ] ) 
                          )
                          //make arrearsBasicIntallmentOnEachPeriod 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
                              'arrearsBasicIntallmentOnEachPeriod'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
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
                        value={store.projectData.lowerGrounds[l].maxArea}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'lowerGrounds',
                              l,
                              'maxArea'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
                             (e.target.value * store.projectData.lowerGrounds[l].pricePerSqFt),
                              'lowerGrounds',
                              l,
                              'maxPrice'
                            ])
                          )

                          // make everything 0
                          // make downPaymentBasicPercentage 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
                              'downPaymentBasicPercentage'
                            ])
                          )
                          
                          // make downpaymentRs 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
                              'downPaymentBasicInRs'
                            ])
                          )
                           // make remainingBasicRs 0
                           dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
                              'remainingBasicRs'
                            ])
                          )
                          //make downPaymentBasicForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
                              'downPaymentBasicInRsForMin'
                            ])
                          )
                          //make remainingRsBasicForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
                              'remainingBasicRsForMin'
                            ])
                          )
                          // make paymentBasicYears 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
                              'paymentBasicYears'
                            ])
                          )
                           //make PaymentYears 0
                           dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
                              'paymentBasicYears'
                            ])
                          )
                          // make paymentBasicYearsForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
                              'paymentBasicYearsForMin'
                            ])
                          )
                          // make installmentPerDuration 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
                              'installmentPerDuration'
                            ])
                          )
                          // make installmentPerDurationForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
                              'installmentPerDurationForMin'
                            ])
                          )
                          // make cashBasicPayment 0
                          dispatch(
                            updateFloorProperties([
                            0,
                            'lowerGrounds',
                            l,
                            'cashBasicPayment'
                          ] ) 
                          )
                          //make arrearsBasicIntallmentOnEachPeriod 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
                              'arrearsBasicIntallmentOnEachPeriod'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
                              'duesPerMonth'
                            ])
                          )
                         
                        }}
                      />
                      </div>
                      </Col>
                      <Col md={1}> 
                      <div className='payment__text' >
                        
                     {(store.projectData.lowerGrounds[l].minPrice)?.toLocaleString()}
                     
                      </div>
                       
                      </Col>
                      <Col md={1}> 
                      <div className='payment__text'
                      >
                        
                     {(store.projectData.lowerGrounds[l].maxPrice)?.toLocaleString()}
                     
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
                        
                     {(store.projectData.lowerGrounds[l].maxPrice)?.toLocaleString()}
                     
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
                          store.projectData.lowerGrounds[l]
                            .downPaymentBasicPercentage
                        }
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => {
                          handleChangeDownPaymentPercent(e, l)
                                                  
                          dispatch(
                            updateFloorProperties([
                      
                           ( 
                             ((e.target.value * store.projectData.lowerGrounds[l].maxPrice) / 100)),
                              'lowerGrounds',
                              l,
                              'downPaymentBasicInRs'
                            ])
                          )
                          
                          dispatch(
                            updateFloorProperties([
                           ( 
                             ((e.target.value * store.projectData.lowerGrounds[l].minPrice) / 100)),
                              'lowerGrounds',
                              l,
                              'downPaymentBasicInRsForMin'
                            ])
                          )

                          
                    // update downPaymentPercentage For minimum prices
                    dispatch(
                      updateFloorProperties([
                      ( (store.projectData.lowerGrounds[l].maxPrice) - ((e.target.value * store.projectData.lowerGrounds[l].maxPrice) / 100)),
                      'lowerGrounds',
                      l,
                      'remainingBasicRs'
                      ])
                    )
                   dispatch(
                                 updateFloorProperties([
                                 ( (store.projectData.lowerGrounds[l].minPrice) - ((e.target.value * store.projectData.lowerGrounds[l].minPrice) / 100)),
                                 'lowerGrounds',
                                 l,
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
                          store.projectData.lowerGrounds[l]
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
                          store.projectData.lowerGrounds[l]
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
                                store.projectData.lowerGrounds[l].paymentBasicYears
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorProperties([
                                    e.target.value,
                                    'lowerGrounds',
                                    l,
                                    'paymentBasicYears'
                                  ])
                                )
                               
                              dispatch(
                                updateFloorProperties([
                                  0,
                                  'lowerGrounds',
                                  l,
                                  'installmentPerDuration' 
                                ])
                              )
                              dispatch(
                                updateFloorProperties([
                                  0,
                                  'lowerGrounds',
                                  l,
                                  'installmentPerDurationForMin' 
                                ])
                              )
                              dispatch(
                                updateFloorProperties([
                                  0,
                                  'lowerGrounds',
                                  l,
                                  'cashBasicPayment' 
                                ])
                              )
                              dispatch(
                                updateFloorProperties([
                                  0,
                                  'lowerGrounds',
                                  l,
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
                                  store.projectData.lowerGrounds[l].basicPlan
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorProperties([
                                      e.target.value,
                                      'lowerGrounds',
                                      l,
                                      'basicPlan'
                                    ])
                                  )
                                  dispatch(
                                    updateFloorProperties([
                                      0,
                                      'lowerGrounds',
                                      l,
                                      'cashBasicPayment'
                                    ])
                                  )
                                  dispatch(
                                    updateFloorProperties([
                                      0,
                                      'lowerGrounds',
                                      l,
                                      'arrearsBasicIntallmentOnEachPeriod'
                                    ])
                                  )
                                
                                  if (e.target.value === 'Monthly') { 
                                dispatch(
                                  updateFloorProperties([
                                    ((store.projectData.lowerGrounds[l].paymentBasicYears * (12 / 3))),
                                    'lowerGrounds',
                                    l,
                                    'shopInstallmentDuration'
                                  ])
                                )
                                dispatch(
                                  updateFloorProperties([
                                    (store.projectData.lowerGrounds[l].remainingBasicRs / store.projectData.lowerGrounds[l].shopInstallmentDuration),
                                    'lowerGrounds',
                                    l,
                                    'installmentPerDuration'
                                  ])
                                )
                               } else if (e.target.value === 'Quarter') {
                                dispatch(
                                  updateFloorProperties([
                                    (store.projectData.lowerGrounds[l].paymentBasicYears * 12),
                                    'lowerGrounds',
                                    l,
                                    'shopInstallmentDuration',
                                  ])
                                )
                                dispatch(
                                  updateFloorProperties([
                                    (store.projectData.lowerGrounds[l].remainingBasicRs / store.projectData.lowerGrounds[l].shopInstallmentDuration),
                                    'lowerGrounds',
                                    l,
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
                        
                     {(store.projectData.lowerGrounds[l].installmentPerDuration)?.toLocaleString()}
                     
                      </div>
                       
                      </Col>
                    </Row>  


                    <Row>
                    <Col md={3} className="payment__header"></Col>
                  <Col md={3} className="payment__header">{store.projectData.lowerGrounds[l].basicPlan === 'Quarter' ? 'installment per quarter' : 'Installment Per Month'}</Col>
                  <Col md={3} className="payment__header">Arrears { store.projectData.lowerGrounds[l].basicPlanForDues ==='Quarterly' ? 'Per Quarter' : store.projectData.lowerGrounds[l].basicPlanForDues === 'Bi-Annual'  ? 'Per Bi-Annum' : store.projectData.lowerGrounds[l].basicPlanForDues === 'Annually' ? 'Per Annum' : ''   }</Col>
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
                          store.projectData.lowerGrounds[l]
                            .cashBasicPayment
                        }
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              // make a check on cashBasicPayment
                          
                           (e.target.value > store.projectData.lowerGrounds[l].installmentPerDuration ? store.projectData.lowerGrounds[l].installmentPerDuration : e.target.value) ,
                            'lowerGrounds',
                              l,
                              'cashBasicPayment'

                            ])
                          )

                          dispatch(
                                updateFloorProperties([
                                  ( store.projectData.lowerGrounds[l].installmentPerDuration === 0 ? (0) : (((store.projectData.lowerGrounds[l].installmentPerDuration)  ) - (e.target.value)) ),
                                      'lowerGrounds',
                                     l,
                                  (store.projectData.lowerGrounds[l].basicPlan === 'Quarter' ? 'duesPerQuarter' : 'duesPerMonth' )
                                ])
                              )

                          dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
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
                                  store.projectData.lowerGrounds[l].basicPlanForDues
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorProperties([
                                      e.target.value,
                                      'lowerGrounds',
                                      l,
                                      'basicPlanForDues'
                                    ])
                                  )
                                
                                  if (e.target.value === 'Annually') { 

                                dispatch(
                                  updateFloorProperties([
                                    
                                    (  store.projectData.lowerGrounds[l].basicPlan === 'Quarter' ? 
                                    ( ( (4 * store.projectData.lowerGrounds[l].installmentPerDuration) - (store.projectData.lowerGrounds[l].cashBasicPayment  * 12) )
                                      (4 * (store.projectData.lowerGrounds[l].duesPerQuarter )) 
                                     
                                      )  : 
                                    (
                                      (12 * store.projectData.lowerGrounds[l].duesPerMonth ) )
                                       )
                                    ,
                                    'lowerGrounds',
                                    l,
                                    'arrearsBasicIntallmentOnEachPeriod'
                                  ])
                                )
                            
                               } else if (e.target.value === 'Quarterly') {
                                dispatch(
                                  updateFloorProperties([
                                    ( store.projectData.lowerGrounds[l].basicPlan === 'Monthly' ? 
                                   ( (store.projectData.lowerGrounds[l].cashBasicPayment === 0 ? (0) :
                                   (3 * store.projectData.lowerGrounds[l].duesPerMonth)) 
                                      )   :
                                    (store.projectData.lowerGrounds[l].cashBasicPayment === 0 ? (0) : (
                                       ((store.projectData.lowerGrounds[l].duesPerQuarter))
                                      )
                                      )
                                    ),
                                    'lowerGrounds',
                                    l,
                                    'arrearsBasicIntallmentOnEachPeriod',
                                  ])
                                )
                              
                               } else if(e.target.value === 'Bi-Annual'){
                                dispatch(
                                  updateFloorProperties([
                                  (store.projectData.lowerGrounds[l].basicPlan === 'Monthly' ?
                                    (6 * store.projectData.lowerGrounds[l].duesPerMonth) 
                                    : 
                                    // as there are 2 quarters in a bi-annual
                                    (2 * store.projectData.lowerGrounds[l].duesPerQuarter)), 
                                    'lowerGrounds',
                                    l,
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
                         {(store.projectData.lowerGrounds[l].arrearsBasicIntallmentOnEachPeriod)?.toLocaleString()}
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
                      {(store.projectData.lowerGrounds[l].minPrice)?.toLocaleString()}
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
                          store.projectData.lowerGrounds[l]
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
                          store.projectData.lowerGrounds[l]
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
                          store.projectData.lowerGrounds[l]
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
                                store.projectData.lowerGrounds[l].paymentBasicYears
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
                                  store.projectData.lowerGrounds[l].basicPlanForMin
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorProperties([
                                      e.target.value,
                                      'lowerGrounds',
                                      l,
                                      'basicPlanForMin'
                                    ])
                                  )
                                  dispatch(
                                    updateFloorProperties([
                                       0,
                                      'lowerGrounds',
                                      l,
                                      'cashBasicPaymentForMin'
                                    ])
                                  )
                                  dispatch(
                                    updateFloorProperties([
                                       0,
                                      'lowerGrounds',
                                      l,
                                      'arrearsBasicIntallmentOnEachPeriodForMin'
                                    ])
                                  )
                                
                                  if (e.target.value === 'Monthly') { 
                                dispatch(
                                  updateFloorProperties([
                                    ((store.projectData.lowerGrounds[l].paymentBasicYears * (12 / 3))),
                                    'lowerGrounds',
                                    l,
                                    'shopInstallmentDurationForMin'
                                  ])
                                )
                                dispatch(
                                  updateFloorProperties([
                                    (store.projectData.lowerGrounds[l].remainingBasicRsForMin / store.projectData.lowerGrounds[l].shopInstallmentDurationForMin),
                                    'lowerGrounds',
                                    l,
                                    'installmentPerDurationForMin'
                                  ])
                                )
                               } else if (e.target.value === 'Quarter') {
                                dispatch(
                                  updateFloorProperties([
                                    (store.projectData.lowerGrounds[l].paymentBasicYears * 12),
                                    'lowerGrounds',
                                    l,
                                    'shopInstallmentDurationForMin',
                                  ])
                                )
                                dispatch(
                                  updateFloorProperties([
                                    (store.projectData.lowerGrounds[l].remainingBasicRsForMin / store.projectData.lowerGrounds[l].shopInstallmentDurationForMin),
                                    'lowerGrounds',
                                    l,
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
                        
                     {(store.projectData.lowerGrounds[l].installmentPerDurationForMin)?.toLocaleString()}
                     
                      </div>
                       
                      </Col>
                    </Row>
                    <Row className="mt-2 mb-2">
                    <Col md={3} className="payment__header"></Col>
                  <Col md={3} className="payment__header">{store.projectData.lowerGrounds[l].basicPlanForMin === 'Quarter' ?  'installment Per Quarter' : 'installment Per Month'}</Col>
                  <Col md={3} className="payment__header">Arrears { store.projectData.lowerGrounds[l].basicPlanForDuesForMin ==='quarterly' ? 'Per Quarter' : store.projectData.lowerGrounds[l].basicPlanForDuesForMin === 'bi-annual'  ? 'Per Bi-Annum' : store.projectData.lowerGrounds[l].basicPlanForDuesForMin === 'annually' ? 'Per Annum' : ''   }</Col>
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
                          (store.projectData.lowerGrounds[l]
                            .cashBasicPaymentForMin)?.toLocaleString()
                        }
                        onChange={e => {
                         
                            dispatch(
                              updateFloorProperties([
                                // make a check on cashBasicPayment
                           
                             (e.target.value > store.projectData.lowerGrounds[l].installmentPerDurationForMin ? store.projectData.lowerGrounds[l].installmentPerDurationForMin : e.target.value) ,
                              // e.target.value,  
                              'lowerGrounds',
                                l,
                                'cashBasicPaymentForMin'
  
                              ])
                            )
  
                            dispatch(
                                  updateFloorProperties([
                                    ( store.projectData.lowerGrounds[l].installmentPerDurationForMin === 0 ? (0) : (((store.projectData.lowerGrounds[l].installmentPerDurationForMin)  ) - (e.target.value)) ),
                                        'lowerGrounds',
                                       l,
                                    (store.projectData.lowerGrounds[l].basicPlanForMin === 'Quarter' ? 'duesPerQuarterForMin' : 'duesPerMonthForMin' )
                                  ])
                                )


                          dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
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
                                  store.projectData.lowerGrounds[l].basicPlanForDuesForMin
                                }
                                 //here basicPlanForDuesForMin do nothing, we just show the target value in the select field
                                onChange={e => {
                                  dispatch(
                                    updateFloorProperties([
                                      e.target.value,
                                      'lowerGrounds',
                                      l,
                                      'basicPlanForDuesForMin'
                                      ])
                                  )
                                  dispatch(
                                    updateFloorProperties([
                                      0,
                                      'lowerGrounds',
                                      l,
                                      'arrearsBasicIntallmentOnEachPeriodForMin'
                                    ])
                                  )
                              //  if-else on arrears installments
                                  if (e.target.value === 'annually') { 

                                    dispatch(
                                      updateFloorProperties([
                                        
                                          store.projectData.lowerGrounds[l].basicPlanForMin === 'Quarter' ? 
                                         (4 * store.projectData.lowerGrounds[l].duesPerQuarterForMin ) 
                                         
                                              : 
                                        (
                                        12 * store.projectData.lowerGrounds[l].duesPerMonthForMin 
                                        ),
                                        'lowerGrounds',
                                        l,
                                        'arrearsBasicIntallmentOnEachPeriodForMin'
                                      ])
                                    )
                                
                                   } else if (e.target.value === 'quarterly') {
                                    dispatch(
                                      updateFloorProperties([
                                        ( store.projectData.lowerGrounds[l].basicPlanForMin === 'Monthly' ? 
                                        (store.projectData.lowerGrounds[l].cashBasicPaymentForMin === 0 ? (0) :
                                        (3 * store.projectData.lowerGrounds[l].duesPerMonthForMin)) 
                                           :
                                        (store.projectData.lowerGrounds[l].cashBasicPaymentForMin === 0 ? (0) : (
                                          ((store.projectData.lowerGrounds[l].duesPerQuarterForMin))
                                          ))
                                        ),
                                        'lowerGrounds',
                                        l,
                                        'arrearsBasicIntallmentOnEachPeriodForMin',
                                      ])
                                    )
                                  
                                   } else if(e.target.value === 'bi-annual'){
                                    dispatch(
                                      updateFloorProperties([
                                       (store.projectData.lowerGrounds[l].basicPlanForMin === 'Monthly' ?
                                        (6 * store.projectData.lowerGrounds[l].duesPerMonthForMin) 
                                        : 
                                        // as there are 2 quarters in a bi-annual
                                        (2 * store.projectData.lowerGrounds[l].duesPerQuarterForMin)), 
                                        'lowerGrounds',
                                        l,
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
                         {(store.projectData.lowerGrounds[l].arrearsBasicIntallmentOnEachPeriodForMin)?.toLocaleString()}
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

export default LowerGroundBasicRepeatingForm