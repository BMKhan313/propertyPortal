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

        'mezzanine',
        i,
        'shops',
        ii,
        'downPaymentPercentage'
      ])
    )
  }


  return (
    <>
    <Row className='justify-content-between align-items-center'>
      {store.projectData.mezzanine[props.i].noShops > 0 && (
        
        <Accordion className='accordion-border' open={open} toggle={toggleopen}>
          <hr style={{ color: '#000', backgroundColor: '#000', height: 1, width: '90%', marginLeft: 'auto', marginRight: 'auto' }} />
          <Card>
            
            <Row className='mt-1'>
                  <h4 className='card-title'>
                  Payment Plan
                  </h4>
                
                  <Repeater count={store.projectData.mezzanine[props.i].noShops}>
                  {ii => ( 
                    <>
                    <Row>
                    <Col md={1} className="payment__header">Shop #</Col>
                    <Col md={2} className="payment__header">Total Cost</Col>
                    <Col md={2} className="payment__header">Down Payment (%)</Col>
                    <Col md={2} className="payment__header">Down Payment (Rs)</Col>
                    <Col md={2} className="payment__header">Remaining(Rs)</Col>
                    <Col md={1} className="payment__header">Years</Col>
                    <Col md={1} className="payment__header"> Months / Quarters</Col>
                    <Col md={1} className="payment__header">Installment</Col>
                  </Row> 
                    <Row className='mt-2'>
                      <Col md={1}><div className='payment__text' style={{fontFamily: 'cursive'}}>Shop-{ii + 1}  </div></Col>
                      <Col md={2}>
                        <div className='payment__text'>
                            {/* total cost */} 
                           
                          {(store.projectData.mezzanine[props.i]?.shops[ii].totalCost)}
                     
                        </div>
                      </Col>
                      <Col md={2} style={{display: 'flex', justifyContent: 'flex-start'}}>
                        <div className='payment__text'>
                        <Input
                        className='form-control payment__input'
                        type='number'
                        id={`Shop-downPaymentPercentage-${ii}`}
                        placeholder='12'
                        value={
                          store.projectData.mezzanine[props.i].shops[ii]
                            .downPaymentPercentage
                        }
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => {
                          handleChangeDownPaymentPercent(e, props.i, ii)                         
                          dispatch(
                            updateFloorInnerProperties([
                            //    (((store.projectData.mezzanine[props.i].shops[ii].totalCost)
                            // - (e.target.value)) * 
                            // (store.projectData.mezzanine[props.i].shops[ii].totalCost / 100)),
                           ( 
                             ((e.target.value * store.projectData.mezzanine[props.i].shops[ii].totalCost) / 100)),
                              'mezzanine',
                              props.i,
                              'shops',
                              ii,
                              'downPaymentRs'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              ((store.projectData.mezzanine[props.i].shops[ii].totalCost)
                            - ((e.target.value) * 
                            (store.projectData.mezzanine[props.i].shops[ii].totalCost) / 100)),
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
                              'cashDownPayment'
                            ])
                          ) 
                          
                          }
                        }
                        />
                        </div>
                      </Col>
                      <Col md={2} >
                        <div className='payment__text'>
                           {/* payment in rs */}
                            
                        {(store.projectData.mezzanine[props.i]?.shops[ii]
                            .downPaymentRs)}
                        
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className='payment__text' >
                            {/* Remainings */}
                           
                        {(store.projectData.mezzanine[props.i].shops[ii].remainingRs)}
                        </div>
                        
                      </Col>
       {/* years */}
                  <Col md={1}>
                        <div className='payment__text'
                        style={{marginLeft: -24}}
                        >
                            <Input
                              className='form-control payment__input'
                              type='number'
                              id={`Shop-PaymentYears-${ii}`}
                              placeholder='Years'
                              onFocus={(e) => e.target.select()}
                              value={
                                store.projectData.mezzanine[props.i].shops[ii]
                                  .paymentYears
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
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
                         
                        
                        </div>
                      </Col>
                {/* yrs end */}
                      <Col md={1} style={{display: 'flex', justifyContent: 'flex-start'}}>
                      <div className='payment__text'>
                      <select
                      className='form-control payment__select'
                      style={{
                        padding: 8,
                        borderRadius: 4,
                        color: '#001',
                        outline: 'none',
                        marginLeft: -20
                      }}
                      id={`Shop-Plan-${ii}`}
                                name='icon-primary'
                                value={
                                  store.projectData.mezzanine[props.i].shops[ii]
                                    .plan
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorInnerProperties([
                                      e.target.value,
                                      'mezzanine',
                                      props.i,
                                      'shops',
                                      ii,
                                      'plan'
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
                                   
                                  if (e.target.value === 'Monthly') { 
                                    dispatch(
                                      updateFloorInnerProperties([
                                        ((store.projectData.mezzanine[props.i].shops[ii].paymentYears * (12 / 3))),
                                        'mezzanine',
                                        props.i,
                                        'shops',
                                        ii,
                                        'shopInstallmentDuration'
                                      ])
                                    )
                                    dispatch(
                                      updateFloorInnerProperties([
                                        (store.projectData.mezzanine[props.i].shops[ii].remainingRs / store.projectData.mezzanine[props.i].shops[ii].shopInstallmentDuration),
                                      
                                        'mezzanine',
                                        props.i,
                                        'shops',
                                        ii,
                                        'installmentPerDuration'
                                      ])
                                    )
                               } else if (e.target.value === 'Quarter') {
                                
                                dispatch(
                                  updateFloorInnerProperties([
                                    (store.projectData.mezzanine[props.i].shops[ii].paymentYears * 12),
                                    'mezzanine',
                                    props.i,
                                    'shops',
                                    ii,
                                    'shopInstallmentDuration',
                                  ])
                                )
                                dispatch(
                                  updateFloorInnerProperties([
                                    (store.projectData.mezzanine[props.i].shops[ii].remainingRs / store.projectData.mezzanine[props.i].shops[ii].shopInstallmentDuration),
                                   
                                    'mezzanine',
                                    props.i,
                                    'shops',
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
                        
                     {(store.projectData.mezzanine[props.i].shops[ii].installmentPerDuration)}
                      {/* {store.projectData.mezzanine[props.i].shops[ii].remainingRs / store.projectData.mezzanine[props.i].shops[ii].shopInstallment} */}
                     
                      {/* <Input
                              className='form-control installment__output'
                              type='number'
                              id={`Shop-installment-${ii}`}
                              readOnly
                              value={
                                store.projectData.mezzanine[props.i].shops[ii]
                                  .installmentPerDuration
                              }
                             
                            /> */}
                      </div>
                       
                      </Col>
                    </Row> 
                    <Row className="mt-2 mb-2">
                    <Col md={3} className="payment__header"></Col>
                  <Col md={3} className="payment__header">{store.projectData.mezzanine[props.i].shops[ii].plan === 'Quarter' ?  'installment Per Quarter' : 'installment Per Month'}</Col>
                  <Col md={3} className="payment__header">Arrears { store.projectData.mezzanine[props.i].shops[ii].plan ==='quarterly' ? 'Per Quarter' : store.projectData.mezzanine[props.i].shops[ii].plan === 'bi-annual'  ? 'Per Bi-Annum' : store.projectData.mezzanine[props.i].shops[ii].plan === 'annually' ? 'Per Annum' : ''   }</Col>
                  <Col md={3} className="payment__header">Arrears Lump Sum</Col> 
                  </Row>
                  <Row className='mt-2 mb-4'>
                      <Col md={3}></Col>
                    <Col md={3}>
                        <div className='payment__text' >
                             <Input
                        className='form-control payment__input'
                        type='number'
                        id={`Shop-Payment-${ii}`}
                        placeholder='12'
                        onFocus={(e) => e.target.select()}
                        value={
                          (store.projectData.mezzanine[props.i].shops[ii]
                            .cashDownPayment)
                        }
                        onChange={e => {

                        
                            dispatch(
                              updateFloorInnerProperties([
                                // make a check on cashBasicPayment
                             (e.target.value > store.projectData.mezzanine[props.i].shops[ii].installmentPerDuration ? store.projectData.mezzanine[props.i].shops[ii].installmentPerDuration : e.target.value) ,
                              // e.target.value,  
                              'mezzanine',
                              props.i,
                              'shops',
                                ii,
                                'cashDownPayment'
                              ])
                            )

                            dispatch(
                                  updateFloorInnerProperties([
                                    ( store.projectData.mezzanine[props.i].shops[ii].installmentPerDuration === 0 ? (0) : (store.projectData.mezzanine[props.i].shops[ii].installmentPerDuration - (e.target.value > store.projectData.mezzanine[props.i].shops[ii].installmentPerDuration ? store.projectData.mezzanine[props.i].shops[ii].installmentPerDuration : e.target.value) ) ),
                                    //to update value directly (above nested condition)
                                    'mezzanine',
                                    props.i,
                                    'shops',
                                    ii,
                                    (store.projectData.mezzanine[props.i].shops[ii].plan === 'Quarter' ? 'duesPerQuarter' : 'duesPerMonth' )
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
                      id={`Shop-Plan-${ii}`}
                                name='icon-primary'
                                value={
                                  store.projectData.mezzanine[props.i].shops[ii].planForDues
                                }
                                // onFocus={(e) => e.target.select()}
                                 //here plan do nothing, we just show the target value in the select field
                                onChange={e => {
                                  dispatch(
                                    updateFloorInnerProperties([
                                      e.target.value,
                                      'mezzanine',
                                      props.i,
                                      'shops',
                                      ii,
                                      'planForDues'
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
                              //  if-else on arrears installments
                                  if (e.target.value === 'annually') { 

                                    dispatch(
                                      updateFloorInnerProperties([
                                        
                                          store.projectData.mezzanine[props.i].shops[ii].plan === 'Quarter' ? 
                                         (4 * store.projectData.mezzanine[props.i].shops[ii].duesPerQuarter ) 
                                         
                                              : 
                                        (
                                        12 * store.projectData.mezzanine[props.i].shops[ii].duesPerMonth 
                                        ),
                                      'mezzanine',
                                      props.i,
                                      'shops',
                                      ii,
                                      'arrearsInstallmentPerPeriod'
                                      ])
                                    )
                                
                                   } else if (e.target.value === 'quarterly') {
                                    dispatch(
                                      updateFloorInnerProperties([
                                        ( store.projectData.mezzanine[props.i].shops[ii].plan === 'Monthly' ? 
                                        (store.projectData.mezzanine[props.i].shops[ii].cashDownPayment === 0 ? (0) :
                                        (3 * store.projectData.mezzanine[props.i].shops[ii].duesPerMonth)) 
                                           :
                                        (store.projectData.mezzanine[props.i].shops[ii].cashDownPayment === 0 ? (0) : (
                                          ((store.projectData.mezzanine[props.i].shops[ii].duesPerQuarter))
                                          ))
                                        ),
                                        'mezzanine',
                                      props.i,
                                      'shops',
                                      ii,
                                        'arrearsInstallmentPerPeriod',
                                      ])
                                    )
                                  
                                   } else if(e.target.value === 'bi-annual'){
                                    dispatch(
                                      updateFloorInnerProperties([
                                       (store.projectData.mezzanine[props.i].shops[ii].plan === 'Monthly' ?
                                        (6 * store.projectData.mezzanine[props.i].shops[ii].duesPerMonth) 
                                        : 
                                        // as there are 2 quarters in a bi-annual
                                        (2 * store.projectData.mezzanine[props.i].shops[ii].duesPerQuarter)), 
                                        'mezzanine',
                                      props.i,
                                      'shops',
                                      ii,
                                        'arrearsInstallmentPerPeriod',
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
                         {(store.projectData.mezzanine[props.i].shops[ii].arrearsInstallmentPerPeriod)}
                        </div>
                       </Col>
                      
                    </Row>
                    <hr style={{ color: '#b3b3b3', backgroundColor: '#b3b3b3', height: 1, width: '99%',   }} />
 
                    </>
                  )}
                  
                  </Repeater>
                  </Row>

          </Card>
        </Accordion>
      )}
    </Row>
   
    </>
  )
}
export default noShops
