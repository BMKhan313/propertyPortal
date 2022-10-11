
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
                      <div  >
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
                        <Input
                        type='text'
                        className='form-control payment__input'
                        id={`animation-cost-${j}`}
                        placeholder='32'
                        value={store.projectData.basements[j].pricePerSqFt}
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
                          // make downPaymentBasicPercentageForMin 0
                          // dispatch(
                          //   updateFloorProperties([
                          //     0,
                          //     'basements',
                          //     j,
                          //     'downPaymentBasicPercentageForMin'
                          //   ])
                          // )
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
                        }}
                      />
                        </div>
                      </Col>
                      <Col md={2} style={{display: 'flex', justifyContent: 'flex-start'}}>
                        <div className='payment__text'>
                        <Input
                        type='text'
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
                          // make downPaymentBasicPercentageForMin 0
                          // dispatch(
                          //   updateFloorProperties([
                          //     0,
                          //     'basements',
                          //     j,
                          //     'downPaymentBasicPercentageForMin'
                          //   ])
                          // )
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
                          // make downPaymentBasicPercentageForMin 0
                          // dispatch(
                          //   updateFloorProperties([
                          //     0,
                          //     'basements',
                          //     j,
                          //     'downPaymentBasicPercentageForMin'
                          //   ])
                          // )
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
                         
                        }}
                      />
                      </div>
                      </Col>
                      <Col md={1}> 
                      <div className='payment__text'
                      >
                        
                     {store.projectData.basements[j].minPrice}
                     
                      </div>
                       
                      </Col>
                      <Col md={1}> 
                      <div className='payment__text'
                      >
                        
                     {store.projectData.basements[j].maxPrice}
                     
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
                        
                     {store.projectData.basements[j].maxPrice}
                     
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
                            <Input
                        className='form-control payment__input'
                        type='number'
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
                             <Input
                        className='form-control payment__input'
                        type='number'
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
                        
                     {store.projectData.basements[j].installmentPerDuration}
                     
                      </div>
                       
                      </Col>
                    </Row>  
                    <Row>
                      <Col md={1}></Col>
                    <Col md={2}>
                        <div className='payment__text' >
                             <Input
                        className='form-control payment__input'
                        type='text'
                        id={`Shop-cashBasicPayment-${j}`}
                        placeholder='12'
                        value={
                          store.projectData.basements[j]
                            .cashBasicPayment
                        }
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'basements',
                              j,
                              'cashBasicPayment'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
             ((store.projectData.basements[j].installmentPerDuration) - (e.target.value)),
                              'basements',
                              j,
                              'duesPerMonth'
                            ])
                          )
                        }
                      }

                    />
                        </div>
                        
                      </Col>
                      {/* select Options */}
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
                                    ((store.projectData.basements[j].duesPerMonth * 12 )),
                                    'basements',
                                    j,
                                    'duesBasicIntallmentAfterYears'
                                  ])
                                )
                            
                               } else if (e.target.value === 'Quarterly') {
                                dispatch(
                                  updateFloorProperties([
                                    (store.projectData.basements[j].duesPerMonth * 3),
                                    'basements',
                                    j,
                                    'duesBasicInstallmentAfterQuarter',
                                  ])
                                )
                              
                               } 
                                }}
                      >
                        <option>Quarterly</option>
                        <option>Annually</option>

                      </select>
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
                      {store.projectData.basements[j].minPrice}
                       </div>
                       </Col> 
                       
                      </Col>
               

                      <Col md={2} style={{display: 'flex', justifyContent: 'flex-start'}}>
                        <div className='payment__text'>
                        <Input
                        className='form-control payment__input'
                        type='number'
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
                            <Input
                        className='form-control payment__input'
                        type='number'
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
                             <Input
                        className='form-control payment__input'
                        type='number'
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
                        
                     {store.projectData.basements[j].installmentPerDurationForMin}
                     
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

export default BasementBasicRepeatingForm

{/*
//price
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


//minarea
 dispatch(
                            updateFloorProperties([
                             (e.target.value * store.projectData.basements[j].pricePerSqFt),
                              'basements',
                              j,
                              'minPrice'
                            ])
                          )
//maxarea
dispatch(
  updateFloorProperties([
   (e.target.value * store.projectData.basements[j].pricePerSqFt),
    'basements',
    j,
    'maxPrice'
  ])
)
*/}
















// // ** React Imports
// import { useState, useContext, useEffect } from 'react'

// // ** Custom Components
// import Repeater from '@components/repeater'


// // import Parkings from './Parkings'
// // ** Axios Imports
// import Axios from 'axios'

// // ** Utils
// import { selectThemeColors } from '@utils'

// // ** Third Party Components
// import Select from 'react-select'
// import { useForm, Controller } from 'react-hook-form'
// import { ArrowLeft, ArrowRight, Plus, Minus, Check, X } from 'react-feather'

// // Base URL
// import baseURL from '../../../../../../../../baseURL/baseURL'

// //Baaz Muhammad
// //06/10/2022
// import GroundFloorBasicRepeatingForm from '../GroundFloorBasicDetails/GroundFloorBasicRepeatingForm'

// // ** Reactstrap Imports
// import {
//   Row,
//   Col,
//   Card,
//   CardHeader,
//   CardBody,
//   Form,
//   Label,
//   Input,
//   Button,
//   AccordionItem,
//   AccordionHeader,
//   AccordionBody,
//   InputGroup,
//   InputGroupText
// } from 'reactstrap'

// // ** Store & Actions
// import { useDispatch, useSelector } from 'react-redux'
// import {
//   updateMasterDetails,
//   updateNoOfFloorsBasements,
//   updateFloorNoOfShopEtc,
//   updateFloorProperties
// } from '../../../../../redux/addNewProject/store'

// import InputNumber from 'rc-input-number'
// import { toast } from 'react-toastify'

// const CustomLabel = ({ htmlFor }) => {
//   return (
//     <Label className='form-check-label' htmlFor={htmlFor}>
//       <span className='switch-icon-left'>
//         <Check size={14} />
//       </span>
//       <span className='switch-icon-right'>
//         <X size={14} />
//       </span>
//     </Label>
//   )
// }

// const BasementBasicRepeatingForm = () => {
//   // ** Store Variables
//   const dispatch = useDispatch()
//   const store = useSelector(state => state.addNewProject)

//   // ** State
//   const [floorType, setFloorType] = useState([])
//   const [count, setCount] = useState(0)
//   const [floorName, setFloorName] = useState([])
//   const defaultValues = {
//     other: ''
//   }

//   const {
//     control,
//     setError,
//     handleSubmit,
//     formState: { errors }
//   } = useForm({ defaultValues })

//   useEffect(() => {
//     Axios.get(`${baseURL}/getProjectType`)
//       .then(response => {
//         const rec = response.data.type.map(({ id, type }) => ({
//           id,
//           value: id,
//           label: type
//         }))
//         setFloorType(rec)
//         setFloorName(rec)
//         //   setLoading(false)
//       })
//       .catch(err => console.log(err))
//   }, [])
//   return (
//     <Card>
//       <CardHeader>
//         <h4 className='card-title'>
//           {/* Total Basements: {store.projectData.masterDetails.countBasements} */}
//           Fill the Form
//         </h4>
//       </CardHeader>

//       <CardBody>
       
//                  <Repeater
//           count={ 1 }
//         >
        
//                {i => (
//                <Form > 
//                <AccordionItem>
//                <AccordionHeader targetId={`${i}`}>
//                    Floors
//                 </AccordionHeader>
//                 <AccordionBody accordionId={`${i}`}>
//                   <Row>
//                   <Row className='justify-content-between align-items-center'>
//                   <Col md={2} className='mb-md-0 mb-1'>
//                       <Label
//                         className='form-label'
//                         for={`animation-name-${i}`}
//                       >
//                         Name
//                       </Label>
//                             </Col>
//                       <Col md='2' className='mb-1' style={{ zIndex: 3 }}>
//                       <Label className='form-label' for='floorType'>
//                         Floor Type
//                       </Label>
                     
//                       </Col>
//                       <Col md={1}>
//                       <Label
//                         className='form-label'
//                         for={`animation-price-${i}`}
//                       >
//                         No. of Units
//                       </Label>
//                       </Col>
//                       <Col md={1}>
//                       <Label
//                         className='form-label'
//                         for={`animation-price-${i}`}
//                       >
//                         price/sq.ft
//                       </Label>
//                       </Col>
//                       <Col md={1}>
//                       <Label
//                         className='form-label'
//                         for={`animation-price-${i}`}
//                       >
//                        Min Area
//                       </Label>
//                       </Col>
//                       <Col md={1}>
//                       <Label
//                         className='form-label'
//                         for={`animation-price-${i}`}
//                       >
//                        Max. Area
//                       </Label>
//                       </Col>
//                       <Col md={1}>
//                       <Label
//                         className='form-label'
//                         for={`animation-price-${i}`}
//                       >
//                         Min. Price
//                       </Label>
//                       </Col>
//                       <Col md={1}>
//                       <Label
//                         className='form-label'
//                         for={`animation-price-${i}`}
//                       >
//                         Max. Price
//                       </Label>
//                       </Col>
//                      </Row>
//                      <Repeater
//           count={
//             store.projectData.masterDetails.countBasements
//             // store.projectData.masterDetails.countBasements
//           }
//         >
//                     {j => ( <Row>
                     
//                      <Col md='2' className='mb-1' style={{ zIndex: 3 }}>
//                       Basement-{j+1}
                     
//                        </Col>
                     
//                      <Col md='2' className='mb-1' style={{ zIndex: 3 }}>
//                       <Controller
//                         name='floorType'
//                         control={control}
//                         render={({ field: { onChange, value, ...field } }) => (
//                           // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
//                           <Select
//                             id='floorType'
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
//                       <Col md='1' className='mb-1' style={{ zIndex: 3, display: 'flex', marginLeft: 32 }}>
//                       <Input
//                         type='text'
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
//                       </Col>
//                       <Col md='1' className='mb-1' style={{ zIndex: 3, marginLeft: 23 }}>
//                       <Input
//                         type='text'
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
//                         }}
//                       />
//                       </Col>
//                       <Col md='1' className='mb-1' style={{ zIndex: 3, marginLeft: 28 }}>
//                       <Input
//                         type='text'
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
//                         }}
//                       />
//                       </Col>
//                       <Col md='1' className='mb-1' style={{ zIndex: 3, marginLeft: 23 }}>
//                       <Input
//                         type='text'
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
//                         }}
//                       />
//                       </Col>
//                       <Col md='1' className='mb-1' style={{ zIndex: 3, marginLeft: 23 }}>
//                       <Input
//                         type='text'
//                         id={`animation-cost-${j}`}
//                         placeholder='32'
//                         value={store.projectData.basements[j].minPrice}
//                         onChange={e => {
//                           dispatch(
//                             updateFloorProperties([
//                               e.target.value,
//                               'basements',
//                               j,
//                               'minPrice'
//                             ])
//                           )
//                         }}
//                       />
//                       </Col>
//                       <Col md='1' className='mb-1' style={{ zIndex: 3, marginLeft: 23 }}>
//                       <Input
//                         type='text'
//                         id={`animation-cost-${j}`}
//                         placeholder='32'
//                         value={store.projectData.basements[j].maxPrice}
//                         onChange={e => {
//                           dispatch(
//                             updateFloorProperties([
//                               e.target.value,
//                               'basements',
//                               j,
//                               'maxPrice'
//                             ])
//                           )
//                         }}
//                       />
//                       </Col>
                     
//                      </Row>)}
//                  </Repeater>
//                  {/* Lower Ground */}
//                  <Repeater
//           count={
//             store.projectData.masterDetails.countLowerGrounds
//             // store.projectData.masterDetails.countBasements
//           }
//         >
//                     {j => ( <Row>
                     
//                      <Col md='2' className='mb-1' style={{ zIndex: 3 }}>
//                     LowerGround-{j+1}  
//                      {/* <Input
//                         type='text'
//                         id={`animation-cost-${j}`}
//                         placeholder={`store-${j}`}
//                         value={store.projectData.lowerGrounds[j].floorName}
//                         onChange={e => {
//                           dispatch(
//                             updateFloorProperties([
//                               e.target.value,
//                               'lowerGrounds',
//                               j,
//                               'floorName'
//                             ])
//                           )
//                         }}
//                       /> */}
//                      </Col>
                     
//                      <Col md='2' className='mb-1' style={{ zIndex: 3 }}>
//                       <Controller
//                         name='floorType'
//                         control={control}
//                         render={({ field: { onChange, value, ...field } }) => (
//                           // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
//                           <Select
//                             id='floorType'
//                             isClearable={true}
//                             classNamePrefix='select'
//                             options={floorType}
//                             theme={selectThemeColors}
//                             onChange={val => {
//                               onChange(val ? val.value : 0)
//                               dispatch(
//                                 updateFloorProperties([
//                                   val ? val.id : 0,
//                                   'lowerGrounds',
//                                   j,
//                                   'floorid'
//                                 ])
//                               )
//                               dispatch(
//                                 updateFloorProperties([
//                                   val ? val.label : 'none',
//                                   'lowerGrounds',
//                                   j,
//                                   'floorType'
//                                 ])
//                               )
//                             }
//                           }
//                             value={floorType.find(
//                               c =>
//                                 c.value ===
//                                 store.projectData.lowerGrounds[j].floorid
//                             )}
//                             {...field}
//                           />
//                         )}
//                       />
//                       </Col>
//                       <Col md='1' className='mb-1' style={{ zIndex: 3, display: 'flex', marginLeft: 32 }}>
//                       <Input
//                         type='text'
//                         id={`animation-cost-${j}`}
//                         placeholder='32'
//                         value={store.projectData.lowerGrounds[j].noOfUnits}
//                         onChange={e => {
//                           dispatch(
//                             updateFloorProperties([
//                               e.target.value,
//                               'lowerGrounds',
//                               j,
//                               'noOfUnits'
//                             ])
//                           )
//                         }}
//                       />
//                       </Col>
//                       <Col md='1' className='mb-1' style={{ zIndex: 3, marginLeft: 23 }}>
//                       <Input
//                         type='text'
//                         id={`animation-cost-${j}`}
//                         placeholder='32'
//                         value={store.projectData.lowerGrounds[j].pricePerSqFt}
//                         onChange={e => {
//                           dispatch(
//                             updateFloorProperties([
//                               e.target.value,
//                               'lowerGrounds',
//                               j,
//                               'pricePerSqFt'
//                             ])
//                           )
//                         }}
//                       />
//                       </Col>
//                       <Col md='1' className='mb-1' style={{ zIndex: 3, marginLeft: 28 }}>
//                       <Input
//                         type='text'
//                         id={`animation-cost-${j}`}
//                         placeholder='32'
//                         value={store.projectData.lowerGrounds[j].minArea}
//                         onChange={e => {
//                           dispatch(
//                             updateFloorProperties([
//                               e.target.value,
//                               'lowerGrounds',
//                               j,
//                               'minArea'
//                             ])
//                           )
//                         }}
//                       />
//                       </Col>
//                       <Col md='1' className='mb-1' style={{ zIndex: 3, marginLeft: 23 }}>
//                       <Input
//                         type='text'
//                         id={`animation-cost-${j}`}
//                         placeholder='32'
//                         value={store.projectData.lowerGrounds[j].maxArea}
//                         onChange={e => {
//                           dispatch(
//                             updateFloorProperties([
//                               e.target.value,
//                               'lowerGrounds',
//                               j,
//                               'maxArea'
//                             ])
//                           )
//                         }}
//                       />
//                       </Col>
//                       <Col md='1' className='mb-1' style={{ zIndex: 3, marginLeft: 23 }}>
//                       <Input
//                         type='text'
//                         id={`animation-cost-${j}`}
//                         placeholder='32'
//                         value={store.projectData.lowerGrounds[j].minPrice}
//                         onChange={e => {
//                           dispatch(
//                             updateFloorProperties([
//                               e.target.value,
//                               'lowerGrounds',
//                               j,
//                               'minPrice'
//                             ])
//                           )
//                         }}
//                       />
//                       </Col>
//                       <Col md='1' className='mb-1' style={{ zIndex: 3, marginLeft: 23 }}>
//                       <Input
//                         type='text'
//                         id={`animation-cost-${j}`}
//                         placeholder='32'
//                         value={store.projectData.lowerGrounds[j].maxPrice}
//                         onChange={e => {
//                           dispatch(
//                             updateFloorProperties([
//                               e.target.value,
//                               'lowerGrounds',
//                               j,
//                               'maxPrice'
//                             ])
//                           )
//                         }}
//                       />
//                       </Col>
                     
//                      </Row>)}
//                  </Repeater>
//                  {/* <Repeater
//                  count={store.projectData.masterDetails.countGroundFloors}
//                  > */}
//                  {/* {j => ( */}
                 
//                  <GroundFloorBasicRepeatingForm />
//                  {/* )} */}
//                  {/* </Repeater> */}
//                   </Row>
//                   </AccordionBody>
//                   </AccordionItem>
//                   </Form>
//                   )
//                   }
//                   </Repeater>
                
//       </CardBody>
//     </Card>
//   )
// }

// export default BasementBasicRepeatingForm









// // // ** React Imports
// // import { useState, useContext, useEffect } from 'react'

// // // ** Custom Components
// // import Repeater from '@components/repeater'


// // // import Parkings from './Parkings'
// // // ** Axios Imports
// // import Axios from 'axios'

// // // ** Utils
// // import { selectThemeColors } from '@utils'

// // // ** Third Party Components
// // import Select from 'react-select'
// // import { useForm, Controller } from 'react-hook-form'
// // import { ArrowLeft, ArrowRight, Plus, Minus, Check, X } from 'react-feather'

// // // Base URL
// // import baseURL from '../../../../../../../../baseURL/baseURL'

// // // ** Reactstrap Imports
// // import {
// //   Row,
// //   Col,
// //   Card,
// //   CardHeader,
// //   CardBody,
// //   Form,
// //   Label,
// //   Input,
// //   Button,
// //   AccordionItem,
// //   AccordionHeader,
// //   AccordionBody,
// //   InputGroup,
// //   InputGroupText
// // } from 'reactstrap'

// // // ** Store & Actions
// // import { useDispatch, useSelector } from 'react-redux'
// // import {
// //   updateMasterDetails,
// //   updateNoOfFloorsBasements,
// //   updateFloorNoOfShopEtc,
// //   updateFloorProperties
// // } from '../../../../../redux/addNewProject/store'

// // import InputNumber from 'rc-input-number'
// // import { toast } from 'react-toastify'

// // const CustomLabel = ({ htmlFor }) => {
// //   return (
// //     <Label className='form-check-label' htmlFor={htmlFor}>
// //       <span className='switch-icon-left'>
// //         <Check size={14} />
// //       </span>
// //       <span className='switch-icon-right'>
// //         <X size={14} />
// //       </span>
// //     </Label>
// //   )
// // }

// // const BasementBasicRepeatingForm = () => {
// //   // ** Store Variables
// //   const dispatch = useDispatch()
// //   const store = useSelector(state => state.addNewProject)

// //   // ** State
// //   const [floorType, setFloorType] = useState([])
// //   const [count, setCount] = useState(0)

// //   const defaultValues = {
// //     other: ''
// //   }

// //   const {
// //     control,
// //     setError,
// //     handleSubmit,
// //     formState: { errors }
// //   } = useForm({ defaultValues })

// //   useEffect(() => {
// //     Axios.get(`${baseURL}/getProjectType`)
// //       .then(response => {
// //         const rec = response.data.type.map(({ id, type }) => ({
// //           id,
// //           value: id,
// //           label: type
// //         }))
// //         setFloorType(rec)
// //         //   setLoading(false)
// //       })
// //       .catch(err => console.log(err))
// //   }, [])
// //   return (
// //     <Card>
// //       <CardHeader>
// //         <h4 className='card-title'>
// //           Total Basements: {store.projectData.masterDetails.countBasements}
// //         </h4>
// //       </CardHeader>

// //       <CardBody>
// //         <Repeater
// //           count={
// //             store.projectData.masterDetails.countBasements
// //             // store.projectData.masterDetails.countBasements
// //           }
// //         >
// //           {i => (
// //             <Form key={i}>
// //               <AccordionItem>
// //                 <AccordionHeader targetId={`${j}`}>
               
// //                   Basement {i + 1}
// //                 </AccordionHeader>
// //                 <AccordionBody accordionId={`${i}`}>
// //                   <Row className='justify-content-between align-items-center'>
                   
// //                     <Col md='3' className='mb-1' style={{ zIndex: 3 }}>
// //                       <Label className='form-label' for='floorType'>
// //                         Floor Type
// //                       </Label>
// //                       <Controller
// //                         name='floorType'
// //                         control={control}
// //                         render={({ field: { onChange, value, ...field } }) => (
// //                           // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
// //                           <Select
// //                             id='floorType'
// //                             isClearable={true}
// //                             classNamePrefix='select'
// //                             options={floorType}
// //                             theme={selectThemeColors}
// //                             onChange={val => {
// //                               onChange(val ? val.value : 0)
// //                               dispatch(
// //                                 updateFloorProperties([
// //                                   val ? val.id : 0,
// //                                   'basements',
// //                                   i,
// //                                   'floorid'
// //                                 ])
// //                               )
// //                               dispatch(
// //                                 updateFloorProperties([
// //                                   val ? val.label : 'none',
// //                                   'basements',
// //                                   i,
// //                                   'floorType'
// //                                 ])
// //                               )
// //                             }
// //                           }
// //                             value={floorType.find(
// //                               c =>
// //                                 c.value ===
// //                                 store.projectData.basements[i].floorid
// //                             )}
// //                             {...field}
// //                           />
// //                         )}
// //                       />
// //                     </Col>
// //                     <Col md={2} className='mb-md-0 mb-1'>
// //                       <Label
// //                         className='form-label'
// //                         for={`animation-price-${i}`}
// //                       >
// //                         Road width Parkings
// //                       </Label>
// //                       <Input
// //                         type='text'
// //                         id={`animation-cost-${i}`}
// //                         placeholder='32'
// //                         value={store.projectData.basements[i].corridorWidth}
// //                         onChange={e => {
// //                           dispatch(
// //                             updateFloorProperties([
// //                               e.target.value,
// //                               'basements',
// //                               i,
// //                               'corridorWidth'
// //                             ])
// //                           )
// //                         }}
// //                       />
// //                     </Col>
// //                     <Col md={2}>
// //                       <Label
// //                         className='form-label'
// //                         for={`animation-price-${i}`}
// //                       >
// //                         Return (ROI) %
// //                       </Label>
// //                       <Input
// //                         type='text'
// //                         id={`animation-cost-${i}`}
// //                         placeholder='32'
// //                         value={store.projectData.basements[i].returnRoi}
// //                         onChange={e => {
// //                           dispatch(
// //                             updateFloorProperties([
// //                               e.target.value,
// //                               'basements',
// //                               i,
// //                               'returnRoi'
// //                             ])
// //                           )
// //                         }}
// //                       />
// //                     </Col>
// //                     <Col sm={12}>
// //                       <hr />
// //                     </Col>
// //                   </Row>
// //                   <Row className='justify-content-between align-items-center'>
// //                     <Col md={2} className='mb-md-0 mb-1'>
// //                       <Label className='form-label' for={`animation-cost-${i}`}>
// //                         length
// //                       </Label>
// //                       <Input
// //                         type='text'
// //                         id={`animation-cost-${i}`}
// //                         placeholder='Length'
// //                         value={store.projectData.basements[i].length}
// //                         onChange={e => {
// //                           dispatch(
// //                             updateFloorProperties([
// //                               e.target.value,
// //                               'basements',
// //                               i,
// //                               'length'
// //                             ])
// //                           )
// //                         }}
// //                       />
// //                     </Col>
// //                     <Col md={2} className='mb-md-0 mb-1'>
// //                       <Label
// //                         className='form-label'
// //                         for={`animation-quantity-${i}`}
// //                       >
// //                         width
// //                       </Label>
// //                       <Input
// //                         type='text'
// //                         id={`animation-quantity-${i}`}
// //                         placeholder='width'
// //                         value={store.projectData.basements[i].width}
// //                         onChange={e => {
// //                           dispatch(
// //                             updateFloorProperties([
// //                               e.target.value,
// //                               'basements',
// //                               i,
// //                               'width'
// //                             ])
// //                           )
// //                         }}
// //                       />
// //                     </Col>
// //                     <Col md={2} className='mb-md-0 mb-1'>
// //                       <Label
// //                         className='form-label'
// //                         for={`animation-price-${i}`}
// //                       >
// //                         Covered Area
// //                       </Label>

// //                       {
// //                         (store.projectData.basements[i].width === '0' || store.projectData.basements[i].width === '') && (store.projectData.basements[i].length === '0' || store.projectData.basements[i].length === '') ? (
// //                           <Input
// //                           type='text'
// //                           placeholder='Enter Area'
// //                           id={`animation-price-${i}`}
// //                           className='form-control'
// //                           onChange={e => {
// //                             dispatch(
// //                               updateFloorProperties([
// //                                 e.target.value,
// //                                 'basements',
// //                                 i,
// //                                 'area'
// //                               ])
// //                             )
// //                           }}
// //                           value={store.projectData.basements[i].area}
// //                         />
// //                         ) : (
// //                           <div>
// //                           {store.projectData.basements[i].width * store.projectData.basements[i].length}
// //                           </div>
// //                         )
// //                       }
// //                     </Col>
                    
// //                     {/* <Col md={2}>
// //                       <div>
// //                         <Label
// //                           className='form-label'
// //                           for='min-max-number-input'
// //                         >
// //                           Parkings
// //                         </Label>
// //                         <InputNumber
// //                           min={0}
// //                           // max={10}
// //                           defaultValue={0}
// //                           upHandler={<Plus />}
// //                           onChange={e => {
// //                             dispatch(
// //                               updateFloorNoOfShopEtc([
// //                                 e,
// //                                 i,
// //                                 'noParkings',
// //                                 'parkings',
// //                                 'basements',
// //                                 'Parking'
// //                               ])
// //                             )
// //                           }}
// //                           value={store.projectData.basements[i].noParkings}
// //                           downHandler={<Minus />}
// //                           id='min-max-number-input'
// //                           readonly='true'
// //                         />
// //                       </div>
// //                     </Col> */}
// //                     {/* <Col md={2} className='mb-md-0 mb-1'>
// //                       <Label
// //                         className='form-label'
// //                         for={`animation-quantity-${i}`}
// //                       >
// //                         Car Parkings
// //                       </Label>
// //                       <Input
// //                         type='text'
// //                         id={`animation-quantity-${i}`}
// //                         placeholder='1'
// //                         value={store.projectData.basements[i].carParkings}
// //                         onChange={e => {
// //                           dispatch(
// //                             updateNoOfFloorsBasements([
// //                               e.target.value,
// //                               'basements',
// //                               i,
// //                               'carParkings'
// //                             ])
// //                           )
// //                         }}
// //                       />
// //                     </Col>
// //                     {store.projectData.basements[i].carParkings}

// //                     <Col md={2} className='mb-md-0 mb-1'>
// //                       <Label
// //                         className='form-label'
// //                         for={`animation-quantity-${i}`}
// //                       >
// //                         Bike Parkings
// //                       </Label>
// //                       <Input
// //                         type='text'
// //                         // id={`animation-quantity-${i}`}
// //                         placeholder='1'
// //                         value={store.projectData.basements[i].bikeParkings}
// //                         onChange={e => {
// //                           dispatch(
// //                             updateNoOfFloorsBasements([
// //                               e.target.value,
// //                               'basements',
// //                               i,
// //                               'bikeParkings'
// //                             ])
// //                           )
// //                         }}
// //                       />
// //                       {store.projectData.basements[i].bikeParkings}
// //                     </Col> */}

// //                     <Col sm={12}>
// //                       <hr />
// //                     </Col>
// //                   </Row>

// //                   {/* <Parkings i={i} /> */}

// //                   <Row className='justify-content-between align-items-center'>
// //                     <Col md='6' sm='12'>
// //                       <Label
// //                         className='form-label'
// //                         for='exampleMultipleFileBrowser'
// //                       >
// //                         Multiple files input
// //                       </Label>
// //                       <Input
// //                         type='file'
// //                         id='exampleMultipleFileBrowser'
// //                         name='MultipleFiles'
// //                         multiple
// //                       />
// //                     </Col>
// //                   </Row>
// //                 </AccordionBody>
// //               </AccordionItem>
// //             </Form>
// //           )}
// //         </Repeater>
// //         {/* <Button className='btn-icon' color='primary' onClick={increaseCount}>
// //           <Plus size={14} />
// //           <span className='align-middle ms-25'>Add New</span>
// //         </Button> */}
// //       </CardBody>
// //     </Card>
// //   )
// // }

// // export default BasementBasicRepeatingForm
