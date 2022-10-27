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

        'floors',
        i,
        'corporateOffices',
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


  return (
    <>
    <div className='row justify-content-between align-items-center'>
      {store.projectData.floors[props.i].noCorporateOffices > 0 && (
        
        <Accordion className='accordion-border' open={open} toggle={toggleopen}>
          <hr style={{ color: '#000', backgroundColor: '#000', height: 1, width: '90%', marginLeft: 'auto', marginRight: 'auto' }} />
          <Card>
            
            <div className='mt-1 row'>
                  <h4 className='card-title'>
                  Payment Plan
                  </h4>
                
                  <Repeater count={store.projectData.floors[props.i].noCorporateOffices}>
                  {ii => ( 
                    <>
                    
                    <div className='mt-2 row'>
                      <div className='row mb-1'><div className='payment__text' style={{fontFamily: 'cursive'}}>Corp.Office-{ii + 1}  </div></div>
                      <div className='col-md-3 col-sm-3  mb-1'>
                      <div className=" payment__header mb-1">Total Cost</div>
                        <div className=' payment__text'>
                            {/* total cost */} 
                           
                          {(store.projectData.floors[props.i]?.corporateOffices[ii].totalCost)}
                     
                        </div>
                      </div>

                      <div className='col-md-3 col-sm-3  mb-1'>
                      <div className=" payment__header mb-1">Down Payment (%)</div>
                        <div className='payment__text'>
                        <Input
                        className='form-control payment__input'
                        type='number'
                        id={`corporateOffice-downPaymentPercentage-${ii}`}
                        placeholder='12'
                        value={
                          store.projectData.floors[props.i].corporateOffices[ii]
                            .downPaymentPercentage
                        }
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => {
                          handleChangeDownPaymentPercent(e, props.i, ii)                         
                          dispatch(
                            updateFloorInnerProperties([
                            //    (((store.projectData.floors[props.i].corporateOffices[ii].totalCost)
                            // - (e.target.value)) * 
                            // (store.projectData.floors[props.i].corporateOffices[ii].totalCost / 100)),
                           ( 
                             ((e.target.value * store.projectData.floors[props.i].corporateOffices[ii].totalCost) / 100)),
                              'floors',
                              props.i,
                              'corporateOffices',
                              ii,
                              'downPaymentRs'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              ((store.projectData.floors[props.i].corporateOffices[ii].totalCost)
                            - ((e.target.value) * 
                            (store.projectData.floors[props.i].corporateOffices[ii].totalCost) / 100)),
                              'floors',
                              props.i,
                              'corporateOffices',
                              ii,
                              'remainingRs'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'corporateOffices',
                              ii,
                              'installmentPerDuration'
                            ])
                          ) 
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'corporateOffices',
                              ii,
                              'cashDownPayment'
                            ])
                          ) 
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'corporateOffices',
                              ii,
                              'arrearsInstallmentPerPeriod'
                            ])
                          ) 
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'corporateOffices',
                              ii,
                              'paymentYears'
                            ])
                          ) 
                      
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'corporateOffices',
                              ii,
                              'cashDownPayment'
                            ])
                          ) 
                          
                          }
                        }
                        />
                        </div>
                      </div>
                      <div className='col-md-3 col-sm-3  mb-1' >
                      <div className=" payment__header mb-1">Down Payment(Rs.)</div>
                        <div className='payment__text'>
                           {/* payment in rs */}
                        {(store.projectData.floors[props.i]?.corporateOffices[ii]
                            .downPaymentRs)}
                        
                        </div>
                      </div>
                      <div className='col-md-3 mb-1  col-sm-3'>
                      <div className=" payment__header mb-1">Remaining (Rs.)</div>
                        <div className='payment__text' >
                            {/* Remainings */}
                        {(store.projectData.floors[props.i].corporateOffices[ii].remainingRs)}
                        </div>
                        
                      </div>
       {/* years */}
                   <div className='col-md-3 col-sm-3 col-0'></div>
                  <div className='col-md-3 col-sm-3  mb-1'>
                  <div className="payment__header mb-1">Years</div>
                        <div className='payment__text'
                        // style={{marginLeft: -24}}
                        >
                            <Input
                              className='form-control payment__input'
                              type='number'
                              id={`corporateOffice-PaymentYears-${ii}`}
                              placeholder='Years'
                              onFocus={(e) => e.target.select()}
                              value={
                                store.projectData.floors[props.i].corporateOffices[ii]
                                  .paymentYears
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'corporateOffices',
                                    ii,
                                    'paymentYears'
                                  ])
                                ) 
                                dispatch(
                                  updateFloorInnerProperties([
                                    0,
                                    'floors',
                                    props.i,
                                    'corporateOffices',
                                    ii,
                                    'installmentPerDuration'
                                  ])
                                ) 
                                dispatch(
                                  updateFloorInnerProperties([
                                    0,
                                    'floors',
                                    props.i,
                                    'corporateOffices',
                                    ii,
                                    'cashDownPayment'
                                  ])
                                ) 
                                dispatch(
                                  updateFloorInnerProperties([
                                    0,
                                    'floors',
                                    props.i,
                                    'corporateOffices',
                                    ii,
                                    'arrearsInstallmentPerPeriod'
                                  ])
                                ) 
                        
                              }}
                            />
                         
                        
                        </div>
                      </div>
                {/* yrs end */}
                      <div className='col-md-3 col-sm-3  mb-1' >
                      <div className="payment__header mb-1">Plan</div>
                      <div className='payment__text'>
                      <select
                      className='form-control payment__select'
                      // style={{
                      //   padding: 8,
                      //   borderRadius: 4,
                      //   color: '#001',
                      //   outline: 'none',
                      //   marginLeft: -20
                      // }}
                      id={`corporateOffice-Plan-${ii}`}
                                name='icon-primary'
                                value={
                                  store.projectData.floors[props.i].corporateOffices[ii]
                                    .plan
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorInnerProperties([
                                      e.target.value,
                                      'floors',
                                      props.i,
                                      'corporateOffices',
                                      ii,
                                      'plan'
                                    ])
                                  )
                                 
                                  dispatch(
                                    updateFloorInnerProperties([
                                      0,
                                      'floors',
                                      props.i,
                                      'corporateOffices',
                                      ii,
                                      'cashDownPayment'
                                    ])
                                  ) 
                                  dispatch(
                                    updateFloorInnerProperties([
                                      0,
                                      'floors',
                                      props.i,
                                      'corporateOffices',
                                      ii,
                                      'arrearsInstallmentPerPeriod'
                                    ])
                                  ) 
                                   
                                  if (e.target.value === 'Monthly') { 
                                    dispatch(
                                      updateFloorInnerProperties([
                                        ((store.projectData.floors[props.i].corporateOffices[ii].paymentYears * (12 / 3))),
                                        'floors',
                                        props.i,
                                        'corporateOffices',
                                        ii,
                                        'corporateOfficeInstallmentDuration'
                                      ])
                                    )
                                    dispatch(
                                      updateFloorInnerProperties([
                                        (store.projectData.floors[props.i].corporateOffices[ii].remainingRs / store.projectData.floors[props.i].corporateOffices[ii].corporateOfficeInstallmentDuration),
                                      
                                        'floors',
                                        props.i,
                                        'corporateOffices',
                                        ii,
                                        'installmentPerDuration'
                                      ])
                                    )
                               } else if (e.target.value === 'Quarter') {
                                
                                dispatch(
                                  updateFloorInnerProperties([
                                    (store.projectData.floors[props.i].corporateOffices[ii].paymentYears * 12),
                                    'floors',
                                    props.i,
                                    'corporateOffices',
                                    ii,
                                    'corporateOfficeInstallmentDuration',
                                  ])
                                )
                                dispatch(
                                  updateFloorInnerProperties([
                                    (store.projectData.floors[props.i].corporateOffices[ii].remainingRs / store.projectData.floors[props.i].corporateOffices[ii].corporateOfficeInstallmentDuration),
                                   
                                    'floors',
                                    props.i,
                                    'corporateOffices',
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
                       </div>

                      <div className='col-md-3 col-sm-3 mb-1'> 
                      <div className="payment__header mb-1">installment</div>
                      <div className='payment__text'
                      > 
                     {(store.projectData.floors[props.i].corporateOffices[ii].installmentPerDuration)}
                      </div>
                       
                      </div>
                  

{/* arrears row */}
                  {/* <div className='row mt-2 mb-1'> */}
                     <div className='col-md-3 col-sm-3 col-0'></div>
                    <div className='col-md-3 col-sm-3 mb-1 '>
                    <div className="payment__header mb-1">{store.projectData.floors[props.i].corporateOffices[ii].plan === 'Quarter' ?  'installment/Quarter' : 'installment/Month'}</div>
                        <div className='payment__text' >
                             <Input
                        className='form-control payment__input'
                        type='number'
                        id={`corporateOffice-Payment-${ii}`}
                        placeholder='12'
                        onFocus={(e) => e.target.select()}
                        value={
                          (store.projectData.floors[props.i].corporateOffices[ii]
                            .cashDownPayment)
                        }
                        onChange={e => {

                        
                            dispatch(
                              updateFloorInnerProperties([
                                // make a check on cashBasicPayment
                             (e.target.value > store.projectData.floors[props.i].corporateOffices[ii].installmentPerDuration ? store.projectData.floors[props.i].corporateOffices[ii].installmentPerDuration : e.target.value) ,
                              // e.target.value,  
                              'floors',
                              props.i,
                              'corporateOffices',
                                ii,
                                'cashDownPayment'
                              ])
                            )

                            dispatch(
                                  updateFloorInnerProperties([
                                    ( store.projectData.floors[props.i].corporateOffices[ii].installmentPerDuration === 0 ? (0) : (store.projectData.floors[props.i].corporateOffices[ii].installmentPerDuration - (e.target.value > store.projectData.floors[props.i].corporateOffices[ii].installmentPerDuration ? store.projectData.floors[props.i].corporateOffices[ii].installmentPerDuration : e.target.value) ) ),
                                    //to update value directly (above nested condition)
                                    'floors',
                                    props.i,
                                    'corporateOffices',
                                    ii,
                                    (store.projectData.floors[props.i].corporateOffices[ii].plan === 'Quarter' ? 'duesPerQuarter' : 'duesPerMonth' )
                                  ])
                                )


                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                               props.i,
                               'corporateOffices',
                               ii,
                              'arrearsInstallmentPerPeriod'
                            ])
                          )
                        }
                      }

                    />
                        </div>
                      </div>

                      {/* select Options */}
                      <div className='col-md-3 col-sm-3  mb-1' >
                      <div className='payment__header mb-1'>Arrears plan (m/q/bi) { store.projectData.floors[props.i].corporateOffices[ii].plan ==='quarterly' ? 'Per Quarter' : store.projectData.floors[props.i].corporateOffices[ii].plan === 'bi-annual'  ? 'Per Bi-Annum' : store.projectData.floors[props.i].corporateOffices[ii].plan === 'annually' ? 'Per Annum' : ''   }</div>
                      <div  className='payment__text'>
                      <select
                      className='form-control payment__select'
                      style={{
                        paddingLeft: 8,
                        borderRadius: 4,
                        color: '#001',
                        outline: 'none',
                        
                        // marginLeft: -10
                      }}
                      id={`corporateOffice-Plan-${ii}`}
                                name='icon-primary'
                                value={
                                  store.projectData.floors[props.i].corporateOffices[ii].planForDues
                                }
                                // onFocus={(e) => e.target.select()}
                                 //here plan do nothing, we just show the target value in the select field
                                onChange={e => {
                                  dispatch(
                                    updateFloorInnerProperties([
                                      e.target.value,
                                      'floors',
                                      props.i,
                                      'corporateOffices',
                                      ii,
                                      'planForDues'
                                      ])
                                  )
                                  dispatch(
                                    updateFloorInnerProperties([
                                      0,
                                      'floors',
                                      props.i,
                                      'corporateOffices',
                                      ii,
                                      'arrearsInstallmentPerPeriod'
                                    ])
                                  )
                              //  if-else on arrears installments
                                  if (e.target.value === 'annually') { 

                                    dispatch(
                                      updateFloorInnerProperties([
                                        
                                          store.projectData.floors[props.i].corporateOffices[ii].plan === 'Quarter' ? 
                                         (4 * store.projectData.floors[props.i].corporateOffices[ii].duesPerQuarter ) 
                                         
                                              : 
                                        (
                                        12 * store.projectData.floors[props.i].corporateOffices[ii].duesPerMonth 
                                        ),
                                      'floors',
                                      props.i,
                                      'corporateOffices',
                                      ii,
                                      'arrearsInstallmentPerPeriod'
                                      ])
                                    )
                                
                                   } else if (e.target.value === 'quarterly') {
                                    dispatch(
                                      updateFloorInnerProperties([
                                        ( store.projectData.floors[props.i].corporateOffices[ii].plan === 'Monthly' ? 
                                        (store.projectData.floors[props.i].corporateOffices[ii].cashDownPayment === 0 ? (0) :
                                        (3 * store.projectData.floors[props.i].corporateOffices[ii].duesPerMonth)) 
                                           :
                                        (store.projectData.floors[props.i].corporateOffices[ii].cashDownPayment === 0 ? (0) : (
                                          ((store.projectData.floors[props.i].corporateOffices[ii].duesPerQuarter))
                                          ))
                                        ),
                                        'floors',
                                      props.i,
                                      'corporateOffices',
                                      ii,
                                        'arrearsInstallmentPerPeriod',
                                      ])
                                    )
                                  
                                   } else if(e.target.value === 'bi-annual'){
                                    dispatch(
                                      updateFloorInnerProperties([
                                       (store.projectData.floors[props.i].corporateOffices[ii].plan === 'Monthly' ?
                                        (6 * store.projectData.floors[props.i].corporateOffices[ii].duesPerMonth) 
                                        : 
                                        // as there are 2 quarters in a bi-annual
                                        (2 * store.projectData.floors[props.i].corporateOffices[ii].duesPerQuarter)), 
                                        'floors',
                                      props.i,
                                      'corporateOffices',
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

                       </div>

                       <div className='col-md-3 col-sm-3  mb-1' >
                       <div className='payment__header mb-1' >Arrears lump sum { store.projectData.floors[props.i].corporateOffices[ii].plan ==='quarterly' ? 'Per Quarter' : store.projectData.floors[props.i].corporateOffices[ii].plan === 'bi-annual'  ? 'Per Bi-Annum' : store.projectData.floors[props.i].corporateOffices[ii].plan === 'annually' ? 'Per Annum' : ''   }</div>
                      <div className='payment__text'>
                         {(store.projectData.floors[props.i].corporateOffices[ii].arrearsInstallmentPerPeriod)}
                        </div>
                       </div>
                      
                    {/* </div> */}
                    <hr style={{ color: '#b3b3b3', backgroundColor: '#b3b3b3', height: 1, width: '99%',   }} />
                    </div> 
                    </>
                  )}
                  
                  </Repeater>
                  </div>

          </Card>
        </Accordion>
      )}
    </div>
    </>
  )
}
export default noShops