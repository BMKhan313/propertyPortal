
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
                        <Row> <h2 className='mt-1 mb-2' style={{fontFamily: 'cursive'}}>LowerGround-{l+1}</h2></Row>
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
                    <div style={{fontSize: 10}}>  LowerGround-{l+1} </div>
                     
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
                        id={`animation-cost-${l}`}
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
                        <Input
                        type='text'
                        className='form-control payment__input'
                        id={`animation-cost-${l}`}
                        placeholder='32'
                        value={store.projectData.lowerGrounds[l].pricePerSqFt}
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
                          // make downPaymentBasicPercentageForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
                              'downPaymentBasicPercentageForMin'
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
                        }}
                      />
                        </div>
                      </Col>
                      <Col md={2} style={{display: 'flex', justifyContent: 'flex-start'}}>
                        <div className='payment__text'>
                        <Input
                        type='text'
                        className='form-control payment__input'
                        id={`animation-cost-${l}`}
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
                          // make downPaymentBasicPercentageForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
                              'downPaymentBasicPercentageForMin'
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
                              'paymentBasicYearsForMin'
                            ])
                          )
                        }}
                      />
                          </div>
                       </Col>
                     
                       <Col md={2} style={{display: 'flex', justifyContent: 'flex-start'}}>
                        <div className='payment__text'>
                      <Input
                        type='text'
                        className='form-control payment__input'
                        id={`animation-cost-${l}`}
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
                          // make downPaymentBasicPercentageForMin 0
                          dispatch(
                            updateFloorProperties([
                              0,
                              'lowerGrounds',
                              l,
                              'downPaymentBasicPercentageForMin'
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
                         
                        }}
                      />
                      </div>
                      </Col>
                      <Col md={1}> 
                      <div className='payment__text'
                      >
                        
                     {store.projectData.lowerGrounds[l].minPrice}
                     
                      </div>
                       
                      </Col>
                      <Col md={1}> 
                      <div className='payment__text'
                      >
                        
                     {store.projectData.lowerGrounds[l].maxPrice}
                     
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
                    <Col md={1} className="payment__header">LowerGround #</Col>
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
                        
                     {store.projectData.lowerGrounds[l].maxPrice}
                     
                      </div>
                      </Col> 

                      </Col>

                      <Col md={2} style={{display: 'flex', justifyContent: 'flex-start'}}>
                        <div className='payment__text'>
                        <Input
                        className='form-control payment__input'
                        type='number'
                        id={`Shop-downPaymentPercentage-${l}`}
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
                            ( (store.projectData.lowerGrounds[l].maxPrice) - ((e.target.value * store.projectData.lowerGrounds[l].maxPrice) / 100)),
                            'lowerGrounds',
                            l,
                            'remainingBasicRs'
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
                        id={`Shop-downPaymentRs-${l}`}
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
                             <Input
                        className='form-control payment__input'
                        type='number'
                        id={`Shop-remainingBasicRs-${l}`}
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
                              id={`Shop-paymentBasicYears-${l}`}
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
                      id={`Shop-Plan-${l}`}
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
                        
                     {store.projectData.lowerGrounds[l].installmentPerDuration}
                     
                      </div>
                       
                      </Col>
                    </Row>  

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
                      {store.projectData.lowerGrounds[l].minPrice}
                       </div>
                       </Col> 
                       
                      </Col>
               

                      <Col md={2} style={{display: 'flex', justifyContent: 'flex-start'}}>
                        <div className='payment__text'>
                        <Input
                        className='form-control payment__input'
                        type='number'
                        id={`Shop-downPaymentPercentage-${l}`}
                        placeholder='12'
                        value={
                          store.projectData.lowerGrounds[l]
                            .downPaymentBasicPercentageForMin
                        }
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => {
                          handleChangeDownPaymentPercentForMin(e, l)                         
                          dispatch(
                            updateFloorProperties([
                           ( 
                             ((e.target.value * store.projectData.lowerGrounds[l].minPrice) / 100)),
                              'lowerGrounds',
                              l,
                              'downPaymentBasicInRsForMin'
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
                            <Input
                        className='form-control payment__input'
                        type='number'
                        id={`Shop-downPaymentRs-${l}`}
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
                             <Input
                        className='form-control payment__input'
                        type='number'
                        id={`Shop-remainingBasicRsForMin-${l}`}
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
                              id={`Shop-paymentBasicYears-${l}`}
                              placeholder='Years'
                              value={
                                store.projectData.lowerGrounds[l].paymentBasicYearsForMin
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorProperties([
                                    e.target.value,
                                    'lowerGrounds',
                                    l,
                                    'paymentBasicYearsForMin'
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
                      id={`Shop-Plan-${l}`}
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
                                
                                  if (e.target.value === 'Monthly') { 
                                dispatch(
                                  updateFloorProperties([
                                    ((store.projectData.lowerGrounds[l].paymentBasicYearsForMin * (12 / 3))),
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
                                    (store.projectData.lowerGrounds[l].paymentBasicYearsForMin * 12),
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
                        
                     {store.projectData.lowerGrounds[l].installmentPerDurationForMin}
                     
                      </div>
                       
                      </Col>
                    </Row>
                  {/* )} */}
                  
                  {/* </Repeater> */}
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