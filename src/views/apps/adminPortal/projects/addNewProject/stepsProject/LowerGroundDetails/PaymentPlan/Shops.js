//
// ** React Imports
import { Fragment, useState, useContext, useEffect } from 'react'

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs'

// ** Utils
import { selectThemeColors } from '@utils'
import Select from 'react-select'
import '../../FloorDetails/PaymentPlan/Payment.css'
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
  const [installmentPlan, setInstallmentPlan] = useState('')
  const handleChangeDownPaymentPercent = (e, i, ii) => {
    dispatch(
      updateFloorInnerProperties([
        Math.max(0, Math.min(100, Number(e.target.value))),

        'lowerGrounds',
        i,
        'shops',
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
const x = 0

  return (
    <Row className='justify-content-between align-items-center'>
      {store.projectData.lowerGrounds[props.i].noShops > 0 && (
        
        <Accordion className='accordion-border' open={open} toggle={toggleopen}>
          <hr style={{ color: '#000', backgroundColor: '#000', height: 1, width: '90%', marginLeft: 'auto', marginRight: 'auto' }} />
          <Card>
            
            <Row className='mt-1'>
                  <h4 className='card-title'>
                  Payment Plan
                  </h4>
                  <Row>
                    <Col md={1} className="payment__header">Shop #</Col>
                    <Col md={2} className="payment__header">Total Cost</Col>
                    <Col md={2} className="payment__header">Down Payment (%)</Col>
                    <Col md={2} className="payment__header">Down Payment (Rs)</Col>
                    <Col md={2} className="payment__header">Remaining(Rs)</Col>
                    <Col md={1} className="payment__header">Years</Col>
                    <Col md={1} className="payment__header">Plan (Months/Quarters)</Col>
                    {/* <Col md={1} className="payment__header"> Months / Quarters</Col> */}
                    <Col md={1} className="payment__header">Installment</Col>
                  </Row>
                  <Repeater count={store.projectData.lowerGrounds[props.i].noShops}>
                  {ii => ( 
                    <Row className='mt-2'>
                      <Col md={1}><div className='payment__text'>Shop {ii + 1}  </div></Col>
                      <Col md={2}>
                        <div className='payment__text'>
                            {/* total cost */} 
                            {/* {
                              ((store.projectData.lowerGrounds[props.i].priceShops) 
                                * ((store.projectData.lowerGrounds[props.i].shops[ii].length) * 
                                 (store.projectData.lowerGrounds[props.i].shops[ii].width)))
                            
                            } */}
                             <Input
                        className='form-control payment__input'
                        type='number'
                        id={`Shop-totalCost-${ii}`}
                        placeholder='12'
                        readOnly
                        
                        value={
                          store.projectData.lowerGrounds[props.i].shops[ii].totalCost
                          // ((store.projectData.lowerGrounds[props.i].priceShops) 
                          //   * (store.projectData.lowerGrounds[props.i].shops[ii].length * 
                          //    store.projectData.lowerGrounds[props.i].shops[ii].width))
                        }
                        onChange={(e) => {                        
                          dispatch(
                            updateFloorInnerProperties([
                              ((store.projectData.lowerGrounds[props.i].priceShops) 
                                * (store.projectData.lowerGrounds[props.i].shops[ii].length * 
                                 store.projectData.lowerGrounds[props.i].shops[ii].width)),
                              'lowerGrounds',
                              props.i,
                              'shops',
                              ii,
                              'totalCost'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                            //    (((store.projectData.lowerGrounds[props.i].shops[ii].totalCost)
                            // - (e.target.value)) * 
                            // (store.projectData.lowerGrounds[props.i].shops[ii].totalCost / 100)),
                           ( 
                             ((e.target.value * store.projectData.lowerGrounds[props.i].shops[ii].totalCost) / 100)),
                              'lowerGrounds',
                              props.i,
                              'shops',
                              ii,
                              'downPaymentRs'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              ((store.projectData.lowerGrounds[props.i].shops[ii].totalCost)
                            - ((e.target.value) * 
                            (store.projectData.lowerGrounds[props.i].shops[ii].totalCost) / 100)),
                              'lowerGrounds',
                              props.i,
                              'shops',
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
                        id={`Shop-downPaymentPercentage-${ii}`}
                        placeholder='12'
                        value={
                          store.projectData.lowerGrounds[props.i].shops[ii]
                            .downPaymentPercentage
                        }
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => {
                          handleChangeDownPaymentPercent(e, props.i, ii)                         
                          dispatch(
                            updateFloorInnerProperties([
                            //    (((store.projectData.lowerGrounds[props.i].shops[ii].totalCost)
                            // - (e.target.value)) * 
                            // (store.projectData.lowerGrounds[props.i].shops[ii].totalCost / 100)),
                           ( 
                             ((e.target.value * store.projectData.lowerGrounds[props.i].shops[ii].totalCost) / 100)),
                              'lowerGrounds',
                              props.i,
                              'shops',
                              ii,
                              'downPaymentRs'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              ((store.projectData.lowerGrounds[props.i].shops[ii].totalCost)
                            - ((e.target.value) * 
                            (store.projectData.lowerGrounds[props.i].shops[ii].totalCost) / 100)),
                              'lowerGrounds',
                              props.i,
                              'shops',
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
                        id={`Shop-downPaymentRs-${ii}`}
                        placeholder='12'
                        readOnly
                        value={
                          store.projectData.lowerGrounds[props.i].shops[ii]
                            .downPaymentRs
                          // (((store.projectData.lowerGrounds[props.i].priceShops) * 
                          //     (((store.projectData.lowerGrounds[props.i].shops[ii].length) * 
                          //     (store.projectData.lowerGrounds[props.i].shops[ii].width))
                          //    *
                          //     (store.projectData.lowerGrounds[props.i].shops[ii].downPaymentPercentage)
                          //     )) / 100)
                        }
                        // onChange={(e) => {                        
                        //   dispatch(
                        //     updateFloorInnerProperties([
                        //       (
                        //       //   ((store.projectData.lowerGrounds[props.i].priceShops) * 
                        //       // (((store.projectData.lowerGrounds[props.i].shops[ii].length) *
                        //       //  (store.projectData.lowerGrounds[props.i].shops[ii].width))
                        //      (store.projectData.lowerGrounds[props.i].shops[ii].downPaymentPercentage
                        //        * 100)
                        //       ),
                        //       'lowerGrounds',
                        //       props.i,
                        //       'shops',
                        //       ii,
                        //       'downPaymentRs'
                        //     ])
                        //   )
                          
                        //   }
                        // }
                        />
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className='payment__text' >
                            {/* Remainings */}
                            {/* {store.projectData.lowerGrounds[props.i].shops[ii].totalCost - store.projectData.lowerGrounds[props.i].shops[ii].downPaymentRs } */}
                        
                        {/* { (store.projectData.lowerGrounds[props.i].priceShops * (store.projectData.lowerGrounds[props.i].shops[ii].length * store.projectData.lowerGrounds[props.i].shops[ii].width))
                         - (((store.projectData.lowerGrounds[props.i].priceShops) * 
                             (((store.projectData.lowerGrounds[props.i].shops[ii].length) 
                             * (store.projectData.lowerGrounds[props.i].shops[ii].width))
                            *
                             (store.projectData.lowerGrounds[props.i].shops[ii].downPaymentPercentage)
                             )) / 100)} */}
                             <Input
                        className='form-control payment__input'
                        type='number'
                        id={`Shop-remainingRs-${ii}`}
                        placeholder='12'
                        readOnly
                        value={
                          store.projectData.lowerGrounds[props.i].shops[ii]
                            .remainingRs
                        //   (store.projectData.lowerGrounds[props.i].priceShops * (store.projectData.lowerGrounds[props.i].shops[ii].length * store.projectData.lowerGrounds[props.i].shops[ii].width))
                        //  - (((store.projectData.lowerGrounds[props.i].priceShops) * 
                        //      (((store.projectData.lowerGrounds[props.i].shops[ii].length) 
                        //      * (store.projectData.lowerGrounds[props.i].shops[ii].width))
                        //     *
                        //      (store.projectData.lowerGrounds[props.i].shops[ii].downPaymentPercentage)
                        //      )) / 100)
                        }
                        onChange={(e) => {                        
                          dispatch(
                            updateFloorInnerProperties([
                              (store.projectData.lowerGrounds[props.i].priceShops * (store.projectData.lowerGrounds[props.i].shops[ii].length * store.projectData.lowerGrounds[props.i].shops[ii].width))
                              - (((store.projectData.lowerGrounds[props.i].priceShops) * 
                                  (((store.projectData.lowerGrounds[props.i].shops[ii].length) 
                                  * (store.projectData.lowerGrounds[props.i].shops[ii].width))
                                 *
                                  (store.projectData.lowerGrounds[props.i].shops[ii].downPaymentPercentage)
                                  )) / 100),
                              'lowerGrounds',
                              props.i,
                              'shops',
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
                              id={`Shop-PaymentYears-${ii}`}
                              placeholder='Years'
                              value={
                                store.projectData.lowerGrounds[props.i].shops[ii]
                                  .paymentYears
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'lowerGrounds',
                                    props.i,
                                    'shops',
                                    ii,
                                    'paymentYears'
                                  ])
                                )
                               
                                 
                            //     if (plan === 'Quarter') { 
                            //     dispatch(
                            //     updateFloorInnerProperties([
                            //       (store.projectData.lowerGrounds[props.i].shops[ii].paymentYears * 12),
                            //       'lowerGrounds',
                            //       props.i,
                            //       'shops',
                            //       ii,
                            //       'shopInstallmentDuration',
                            //     ])
                            //   )
                            //   dispatch(
                            //     updateFloorInnerProperties([
                            //       (store.projectData.lowerGrounds[props.i].shops[ii].remainingRs / store.projectData.lowerGrounds[props.i].shops[ii].shopInstallmentDuration),
                                 
                            //       'lowerGrounds',
                            //       props.i,
                            //       'shops',
                            //       ii,
                            //       'installmentPerDuration'
                            //     ])
                            //   )
                            //  } else if (plan === 'Monthly') {
                            //   dispatch(
                            //     updateFloorInnerProperties([
                            //       ((store.projectData.lowerGrounds[props.i].shops[ii].paymentYears * (12 / 3))),
                            //       'lowerGrounds',
                            //       props.i,
                            //       'shops',
                            //       ii,
                            //       'shopInstallmentDuration'
                            //     ])
                            //   )
                            //   dispatch(
                            //     updateFloorInnerProperties([
                            //       (store.projectData.lowerGrounds[props.i].shops[ii].remainingRs / store.projectData.lowerGrounds[props.i].shops[ii].shopInstallmentDuration),
                                
                            //       'lowerGrounds',
                            //       props.i,
                            //       'shops',
                            //       ii,
                            //       'installmentPerDuration'
                            //     ])
                            //   )
                            //  }
                                // dispatch(
                                //   updateFloorInnerProperties([
                                //     ((store.projectData.lowerGrounds[props.i].shops[ii].totalCost)
                                //     - ((store.projectData.lowerGrounds[props.i].shops[ii].downPaymentPercentage) * 
                                //     (store.projectData.lowerGrounds[props.i].shops[ii].totalCost) / 100)) / (e.target.value),
                                //     'lowerGrounds',
                                //     props.i,
                                //     'shops',
                                //     ii,
                                //     'shopInstallment'
                                //   ])
                                // )
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
                      id={`Shop-Plan-${ii}`}
                                name='icon-primary'
                                value={
                                  store.projectData.lowerGrounds[props.i].shops[ii]
                                    .plan
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorInnerProperties([
                                      e.target.value,
                                      'lowerGrounds',
                                      props.i,
                                      'shops',
                                      ii,
                                      'plan'
                                    ])
                                  )
                                   
                                  if (e.target.value === 'Monthly') { 
                                    dispatch(
                                      updateFloorInnerProperties([
                                        ((store.projectData.lowerGrounds[props.i].shops[ii].paymentYears * (12 / 3))),
                                        'lowerGrounds',
                                        props.i,
                                        'shops',
                                        ii,
                                        'shopInstallmentDuration'
                                      ])
                                    )
                                    dispatch(
                                      updateFloorInnerProperties([
                                        (store.projectData.lowerGrounds[props.i].shops[ii].remainingRs / store.projectData.lowerGrounds[props.i].shops[ii].shopInstallmentDuration),
                                      
                                        'lowerGrounds',
                                        props.i,
                                        'shops',
                                        ii,
                                        'installmentPerDuration'
                                      ])
                                    )
                               } else if (e.target.value === 'Quarter') {
                                
                                dispatch(
                                  updateFloorInnerProperties([
                                    (store.projectData.lowerGrounds[props.i].shops[ii].paymentYears * 12),
                                    'lowerGrounds',
                                    props.i,
                                    'shops',
                                    ii,
                                    'shopInstallmentDuration',
                                  ])
                                )
                                dispatch(
                                  updateFloorInnerProperties([
                                    (store.projectData.lowerGrounds[props.i].shops[ii].remainingRs / store.projectData.lowerGrounds[props.i].shops[ii].shopInstallmentDuration),
                                   
                                    'lowerGrounds',
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

                      {/* <Col md={1}>
                        <div className='payment__text'
                        style={{marginLeft: -20}}
                        >
                        {
                          store.projectData.lowerGrounds[props.i].shops[ii]
                          .monthlyPlan === 'Quarter' ? (
                            <Input
                              className='form-control payment__input'
                              type='number'
                              id={`Shop-QuarterPlanQuarterDuration-${ii}`}
                              placeholder='Quarters'
                              value={
                                store.projectData.lowerGrounds[props.i].shops[ii]
                                  .quarterDuration
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'lowerGrounds',
                                    props.i,
                                    'shops',
                                    ii,
                                    'quarterDuration'
                                  ])
                                )
                                dispatch(
                                  updateFloorInnerProperties([
                                    // ((store.projectData.lowerGrounds[props.i].shops[ii].totalCost)
                                    // - ((store.projectData.lowerGrounds[props.i].shops[ii].downPaymentPercentage) * 
                                    // (store.projectData.lowerGrounds[props.i].shops[ii].totalCost) / 100)) / (e.target.value),
                                    (((12) / (store.projectData.lowerGrounds[props.i].shops[ii].quarterDuration)) * (store.projectData.lowerGrounds[props.i].shops[ii].paymentYears)),
                                    'lowerGrounds',
                                    props.i,
                                    'shops',
                                    ii,
                                    'shopInstallment'
                                  ])
                                )
                              }}
                            />
                          ) : (
                            <Input
                            className='form-control payment__input'
                            type='number'
                              id={`Shop-MonthlyPlanMonthlyDuration-${ii}`}
                              placeholder='Months'
                              value={
                                store.projectData.lowerGrounds[props.i].shops[ii]
                                  .monthlyDuration
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'lowerGrounds',
                                    props.i,
                                    'shops',
                                    ii,
                                    'monthlyDuration'
                                  ])
                                )
                                // dispatch(
                                //   updateFloorInnerProperties([
                                //     ((store.projectData.lowerGrounds[props.i].shops[ii].totalCost)
                                //     - ((store.projectData.lowerGrounds[props.i].shops[ii].downPaymentPercentage) * 
                                //     (store.projectData.lowerGrounds[props.i].shops[ii].totalCost) / 100)) / (e.target.value),
                                //     'lowerGrounds',
                                //     props.i,
                                //     'shops',
                                //     ii,
                                //     'shopInstallment'
                                //   ])
                                // )
                              }}
                        />

                          )
                        }
                        </div>
                      </Col> */}
                      <Col md={1}> 
                      <div className='payment__text'
                      >
                        
                     {store.projectData.lowerGrounds[props.i].shops[ii].installmentPerDuration}
                      {/* {store.projectData.lowerGrounds[props.i].shops[ii].remainingRs / store.projectData.lowerGrounds[props.i].shops[ii].shopInstallment} */}
                     
                      {/* <Input
                              className='form-control installment__output'
                              type='number'
                              id={`Shop-installment-${ii}`}
                              readOnly
                              value={
                                store.projectData.lowerGrounds[props.i].shops[ii]
                                  .installmentPerDuration
                              }
                             
                            /> */}
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
