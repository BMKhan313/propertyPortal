

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
                        <Input
                        type='text'
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
                        <Input
                        type='text'
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
                      <Input
                        type='text'
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
                        
                     {store.projectData.floors[f].minPrice}
                     
                      </div>
                       
                      </Col>
                      <Col md={1}> 
                      <div className='payment__text'
                      >
                        
                     {store.projectData.floors[f].maxPrice}
                     
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
                        
                     {store.projectData.floors[f].maxPrice}
                     
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
                        
                     {store.projectData.floors[f].installmentPerDuration}
                     
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
                      {store.projectData.floors[f].minPrice}
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
                            <Input
                        className='form-control payment__input'
                        type='number'
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
                             <Input
                        className='form-control payment__input'
                        type='number'
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
                        
                     {store.projectData.floors[f].installmentPerDurationForMin}
                     
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

export default FloorBasicRepeatingForm