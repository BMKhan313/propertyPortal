// ** React Imports
import { Fragment, useState, useContext,useEffect } from 'react'

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs'
import Switch from '@mui/material/Switch';
// ** Utils
import { selectThemeColors } from '@utils'

import Repeater from '@components/repeater'
import { X, Plus, Minus, Check, Key } from 'react-feather'
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
import { updateFloorInnerProperties, updateFloorProperties } from '../../../../redux/addNewProject/store'

import InputNumber from 'rc-input-number'
import { FitnessCenter } from '@mui/icons-material'

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
  const [shopValue, setShopValue] = useState(0)
  const store = useSelector(state => state.addNewProject)
  const [open, setOpen] = useState('')
  const toggleopen = id => {
    open === id ? setOpen() : setOpen(id)
  }

// const fun =(props,ii)=>{
//   dispatch(
//     updateFloorInnerProperties([
//           0,
//           'lowerGrounds',
//           props,
//           'shops',
//           ii,
//           'wholeAreaOfShop'
//     ])
//   )
// }

const [checked, setChecked] = useState(true);
const [makeCostZero, setMakeCostZero] = useState(false)

const handleChange = (event) => {
  setChecked(event.target.checked);
  
};

  return (
    <Row className='justify-content-between align-items-center'>
    {store.projectData.lowerGrounds[props.i].noShops > 0 && (
      <Accordion className='accordion-border' open={open} toggle={toggleopen}>
        <Card>
          <CardHeader className='d-flex justify-content-center'>
            <h4 className='card-title'>
              Total shops: {store.projectData.lowerGrounds[props.i].noShops}:{' '}
            </h4>
          </CardHeader>
          <div className='mt-1 row'>
            <h4 className='card-title'>
              Shop Details
            </h4>
            <div className='mb-md-0' md='6' sm='12'>
              <div className='d-flex'>
                <Label
                  for='icon-primary'
                  className='form-check-label mb-50'
                >
                  <h4 className='mt-1'> Do you have area ? </h4>
                </Label>
                <div className='form-switch form-check-primary'>
                  <Switch

                    checked={checked}
                    onChange={e => {
                      handleChange(e);
                    }
                    }
                  />
                </div>
              </div>

            </div>

            <Repeater count={store.projectData.lowerGrounds[props.i].noShops}>
              {ii => (
                <Row className='mt-2 row d-flex '>

                  <div className=" col-md-1 d-flex flex-wrap align-content-start mt-1 mb-1"><h4>Shop {ii + 1}</h4></div>
                  <div className="form-group text-center col-md-3 col-sm-3 d-flex flex-wrap align-content-start mb-2">
                    <h4 className='text-red-400'>Price/Sq.ft</h4>
                    <Input
                      readOnly
                      // className='payment_text'
                      type='number'
                      id={`Shop-price-${ii}`}
                      placeholder='0'
                      value={store.projectData.lowerGrounds[props.i].priceShops}
                      onChange={e => {
                        dispatch(
                          updateFloorInnerProperties([
                            e.target.value,
                            'lowerGrounds',
                            props.i,
                            'shops',
                            ii,
                            'priceShops'
                          ])
                        )

                        dispatch(
                          updateFloorInnerProperties([
                            ((store.projectData.lowerGrounds[props.i].priceShops) * (store.projectData.lowerGrounds[props.i].shops[ii].length * store.projectData.lowerGrounds[props.i].shops[ii].width)).toLocaleString(undefined, { maximumFractionDigits: 2 }).toLocaleString(undefined, { maximumFractionDigits: 2 }),
                            'lowerGrounds',
                            props.i,
                            'shops',
                            ii,
                            'totalCost'
                          ])
                        )
                      }}
                    />
                  </div>

                  {checked ?
                    (
                      <>
                        <div className="form-group text-center col-md-3 col-sm-4 d-flex flex-wrap align-content-start mb-1">
                          <h4>Area</h4>
                          <Input
                            //  className='bg-gray-600'
                            type='number'
                            className='payment_input'
                            id={`Shop-isArea-${ii}`}
                            placeholder='0'
                            value={
                              store.projectData.lowerGrounds[props.i].shops[ii]
                                .wholeAreaOfShop
                            }
                            onFocus={e => {
                              e.target.select()
                              // iterate a number over an array
                              //make array from number
                              {
                                const n = store.projectData.lowerGrounds[props.i].noShops;
                                [...Array(n)].forEach((data, index) => {

                                  dispatch(
                                    updateFloorInnerProperties([
                                      0,
                                      'lowerGrounds',
                                      props.i,
                                      'shops',
                                      index,
                                      'length'
                                    ])
                                  )
                                  dispatch(
                                    updateFloorInnerProperties([
                                      0,
                                      'lowerGrounds',
                                      props.i,
                                      'shops',
                                      index,
                                      'width'
                                    ])
                                  )
                                })
                              }
                            }}
                            onChange={e => {
                              dispatch(
                                updateFloorInnerProperties([
                                  e.target.value,
                                  'lowerGrounds',
                                  props.i,
                                  'shops',
                                  ii,
                                  'wholeAreaOfShop'
                                ])
                              )

                              dispatch(
                                updateFloorInnerProperties([
                                  // (store.projectData.lowerGrounds[props.i].priceShops * e.target.value),
                                  ((store.projectData.lowerGrounds[props.i].priceShops) * (e.target.value)),
                                  // (store.projectData.lowerGrounds[props.i].priceShops * store.projectData.lowerGrounds[props.i].shops[ii].width * e.target.value),
                                  'lowerGrounds',
                                  props.i,
                                  'shops',
                                  ii,
                                  'totalCost'
                                ])
                              )


                              dispatch(
                                updateFloorInnerProperties([
                                  0,
                                  'lowerGrounds',
                                  props.i,
                                  'shops',
                                  ii,
                                  'downPaymentPercentage'
                                ])
                              )
                              dispatch(
                                updateFloorInnerProperties([
                                  0,
                                  'lowerGrounds',
                                  props.i,
                                  'shops',
                                  ii,
                                  'paymentYears'
                                ])
                              )
                              dispatch(
                                updateFloorInnerProperties([
                                  0,
                                  'lowerGrounds',
                                  props.i,
                                  'shops',
                                  ii,
                                  'installmentPerDuration'
                                ])
                              )
                              dispatch(
                                updateFloorInnerProperties([
                                  0,
                                  'lowerGrounds',
                                  props.i,
                                  'shops',
                                  ii,
                                  'cashDownPayment'
                                ])
                              )
                              dispatch(
                                updateFloorInnerProperties([
                                  0,
                                  'lowerGrounds',
                                  props.i,
                                  'shops',
                                  ii,
                                  'arrearsInstallmentPerPeriod'
                                ])
                              )
                              dispatch(
                                updateFloorInnerProperties([
                                  0,
                                  'lowerGrounds',
                                  props.i,
                                  'shops',
                                  ii,
                                  'downPaymentRs'
                                ])
                              )
                              dispatch(
                                updateFloorInnerProperties([
                                  0,
                                  'lowerGrounds',
                                  props.i,
                                  'shops',
                                  ii,
                                  'remainingRs'
                                ])
                              )
                            }}
                          />
                        </div>
                      </>
                    )
                    :
                    (
                      <>
                        {/* length and width */}
                        <div className="form-group text-center col-md-2 col-sm-3 d-flex flex-wrap align-content-start mb-1">
                          <h4>length</h4>
                          <Input
                            type='number'
                            id={`Shop-length-${ii}`}
                            placeholder='0'
                            value={
                              store.projectData.lowerGrounds[props.i].shops[ii]
                                .length
                            }
                            onFocus={e => {
                              e.target.select()
                              {
                                const n = store.projectData.lowerGrounds[props.i].noShops;
                                [...Array(n)].forEach((data, index) => {

                                  dispatch(
                                    updateFloorInnerProperties([
                                      0,
                                      'lowerGrounds',
                                      props.i,
                                      'shops',
                                      index,
                                      'wholeAreaOfShop'
                                    ])
                                  )

                                })
                              }
                            }}
                            onChange={e => {
                              dispatch(
                                updateFloorInnerProperties([
                                  e.target.value,
                                  'lowerGrounds',
                                  props.i,
                                  'shops',
                                  ii,
                                  'length'
                                ])
                              )
                              dispatch(
                                updateFloorInnerProperties([
                                  ((store.projectData.lowerGrounds[props.i].priceShops) * (e.target.value) * (store.projectData.lowerGrounds[props.i].shops[ii].width)),
                                  // ((store.projectData.lowerGrounds[props.i].shops[ii].length * store.projectData.lowerGrounds[props.i].shops[ii].width) * (e.target.value)),
                                  // (store.projectData.lowerGrounds[props.i].priceShops * store.projectData.lowerGrounds[props.i].shops[ii].length * e.target.value),
                                  'lowerGrounds',
                                  props.i,
                                  'shops',
                                  ii,
                                  'totalCost'
                                ])
                              )
                              dispatch(
                                updateFloorInnerProperties([
                                  0,
                                  'lowerGrounds',
                                  props.i,
                                  'shops',
                                  ii,
                                  'wholeAreaOfShop'
                                ])
                              )
                              dispatch(
                                updateFloorInnerProperties([
                                  0,
                                  'lowerGrounds',
                                  props.i,
                                  'shops',
                                  ii,
                                  'downPaymentPercentage'
                                ])
                              )
                              dispatch(
                                updateFloorInnerProperties([
                                  0,
                                  'lowerGrounds',
                                  props.i,
                                  'shops',
                                  ii,
                                  'downPaymentRs'
                                ])
                              )
                              dispatch(
                                updateFloorInnerProperties([
                                  0,
                                  'lowerGrounds',
                                  props.i,
                                  'shops',
                                  ii,
                                  'remainingRs'
                                ])
                              )
                              dispatch(
                                updateFloorInnerProperties([
                                  0,
                                  'lowerGrounds',
                                  props.i,
                                  'shops',
                                  ii,
                                  'paymentYears'
                                ])
                              )
                              dispatch(
                                updateFloorInnerProperties([
                                  0,
                                  'lowerGrounds',
                                  props.i,
                                  'shops',
                                  ii,
                                  'installmentPerDuration'
                                ])
                              )
                              dispatch(
                                updateFloorInnerProperties([
                                  0,
                                  'lowerGrounds',
                                  props.i,
                                  'shops',
                                  ii,
                                  'cashDownPayment'
                                ])
                              )
                              dispatch(
                                updateFloorInnerProperties([
                                  0,
                                  'lowerGrounds',
                                  props.i,
                                  'shops',
                                  ii,
                                  'arrearsInstallmentPerPeriod'
                                ])
                              )

                            }}
                          />
                        </div>

                        <div className="form-group col-md-2 col-sm-3 text-center d-flex flex-wrap align-content-start mb-1">
                          <h4>width</h4>
                          <Input
                            type='number'
                            id={`Shop-width-${ii}`}
                            placeholder='0'
                            value={
                              store.projectData.lowerGrounds[props.i].shops[ii]
                                .width
                            }
                            onFocus={e => {
                              e.target.select()
                              {
                                const n = store.projectData.lowerGrounds[props.i].noShops;
                                [...Array(n)].forEach((data, index) => {

                                  dispatch(
                                    updateFloorInnerProperties([
                                      0,
                                      'lowerGrounds',
                                      props.i,
                                      'shops',
                                      index,
                                      'wholeAreaOfShop'
                                    ])
                                  )

                                })
                              }
                            }}
                            onChange={e => {
                              dispatch(
                                updateFloorInnerProperties([
                                  e.target.value,
                                  'lowerGrounds',
                                  props.i,
                                  'shops',
                                  ii,
                                  'width'
                                ])
                              )
                              dispatch(
                                updateFloorInnerProperties([
                                  // (store.projectData.lowerGrounds[props.i].priceShops * e.target.value),
                                  ((store.projectData.lowerGrounds[props.i].priceShops) * (e.target.value) * (store.projectData.lowerGrounds[props.i].shops[ii].length)),
                                  // ((store.projectData.lowerGrounds[props.i].shops[ii].length * store.projectData.lowerGrounds[props.i].shops[ii].width) * (e.target.value)),
                                  // (store.projectData.lowerGrounds[props.i].priceShops * store.projectData.lowerGrounds[props.i].shops[ii].width * e.target.value),
                                  'lowerGrounds',
                                  props.i,
                                  'shops',
                                  ii,
                                  'totalCost'
                                ])
                              )

                              dispatch(
                                updateFloorInnerProperties([
                                  0,
                                  'lowerGrounds',
                                  props.i,
                                  'shops',
                                  ii,
                                  'wholeAreaOfShop'
                                ])
                              )
                              dispatch(
                                updateFloorInnerProperties([
                                  0,
                                  'lowerGrounds',
                                  props.i,
                                  'shops',
                                  ii,
                                  'downPaymentPercentage'
                                ])
                              )
                              dispatch(
                                updateFloorInnerProperties([
                                  0,
                                  'lowerGrounds',
                                  props.i,
                                  'shops',
                                  ii,
                                  'paymentYears'
                                ])
                              )
                              dispatch(
                                updateFloorInnerProperties([
                                  0,
                                  'lowerGrounds',
                                  props.i,
                                  'shops',
                                  ii,
                                  'installmentPerDuration'
                                ])
                              )
                              dispatch(
                                updateFloorInnerProperties([
                                  0,
                                  'lowerGrounds',
                                  props.i,
                                  'shops',
                                  ii,
                                  'cashDownPayment'
                                ])
                              )
                              dispatch(
                                updateFloorInnerProperties([
                                  0,
                                  'lowerGrounds',
                                  props.i,
                                  'shops',
                                  ii,
                                  'arrearsInstallmentPerPeriod'
                                ])
                              )
                              dispatch(
                                updateFloorInnerProperties([
                                  0,
                                  'lowerGrounds',
                                  props.i,
                                  'shops',
                                  ii,
                                  'downPaymentRs'
                                ])
                              )
                              dispatch(
                                updateFloorInnerProperties([
                                  0,
                                  'lowerGrounds',
                                  props.i,
                                  'shops',
                                  ii,
                                  'remainingRs'
                                ])
                              )
                            }}
                          />
                        </div>
                      </>
                    )
                  }
                  <div className="form-group text-center col-md-2 col-sm-3 mb-1 col-lg-2">
                    <h4 className='text-red-400'>total Cost</h4>
                    <div className='mt-1'>{store.projectData.lowerGrounds[props.i].shops[ii].totalCost}</div>
                  </div>
                </Row>
              )}
            </Repeater>
          </div>
        </Card>
      </Accordion>
    )}
  </Row>
  )
}
export default noShops



















// //
// // ** React Imports
// import { Fragment, useState, useContext } from 'react'

// // ** Custom Components
// import BreadCrumbs from '@components/breadcrumbs'

// // ** Utils
// import { selectThemeColors } from '@utils'

// import Repeater from '@components/repeater'
// import { X, Plus, Minus, Check } from 'react-feather'
// // ** Reactstrap Imports
// import {
//   Row,
//   Col,
//   Card,
//   CardTitle,
//   CardHeader,
//   CardBody,
//   Form,
//   Label,
//   Input,
//   Button,
//   Accordion,
//   AccordionItem,
//   AccordionHeader,
//   AccordionBody,
//   InputGroup,
//   InputGroupText,
//   Table
// } from 'reactstrap'

// // ** Store & Actions
// import { useDispatch, useSelector } from 'react-redux'
// import { updateFloorInnerProperties, updateFloorProperties } from '../../../../redux/addNewProject/store'

// import InputNumber from 'rc-input-number'

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

// const noShops = props => {
//   // ** Store Variables
//   const dispatch = useDispatch()
//   const [shopValue, setShopValue] = useState(0)
//   const store = useSelector(state => state.addNewProject)
//   const [open, setOpen] = useState('')
//   const toggleopen = id => {
//     open === id ? setOpen() : setOpen(id)
//   }


//   return (
//     <Row className='justify-content-between align-items-center'>
//       {store.projectData.lowerGrounds[props.i].noShops > 0 && (
//         <Accordion className='accordion-border' open={open} toggle={toggleopen}>
//           <Card>
//             <CardHeader>
//               <h4 className='card-title'>
//                 Total shops: {store.projectData.lowerGrounds[props.i].noShops}:{' '}
//               </h4>
//             </CardHeader>
//             <Row className='mt-1'>
//                   <h4 className='card-title'>
//                   Shop Details
//                   </h4>
//                   {/* <Col className='mb-md-0 mb-1' md='6' sm='12'>
//                     <div className='d-flex'>
//                     <h5 style={{marginRight: 25}}>Do you have area ?</h5>

//                       <div className='form-switch form-check-primary '>
//                         <Input
//                           type='switch'
//                           id='icon-primary3'
//                           name='icon-primary3'
//                           checked={store.projectData.lowerGrounds[props.i].isArea}
//                           onChange={e => {
//                             dispatch(
//                               updateFloorProperties([
//                                 e.target.checked,
//                                 'lowerGrounds',
//                                 props.i,
//                                 'isArea'
//                               ])
//                             )
//                           }}
//                         />
//                         <CustomLabel htmlFor='icon-primary3' />
//                       </div>
//                     </div>
//                   </Col> */}
//                   <Row>
//                     <Col md={3} className="h4 text-center">Shop #</Col>
//                     <Col md={2} className="h4 text-center">Price Per Sq.Ft</Col>
//                   {/* {  !store.projectData.lowerGrounds[props.i].isArea ?
//                   <> */}
//                    <Col md={2} className="h4 text-center">length</Col>
//                    <Col md={2} className="h4 text-center">width</Col>
//                   {/* </>
//                     :
//                     <>
//                     <Col md={3} className="h4 text-center">Area</Col>
//                     </>
//                     } */}
//                     <Col md={2} className="h4 text-center">Total Cost (Rs)</Col>
                    
//                   </Row>
//                   {/* <input   
//                   type='number' 
//                    onChange={(e) => setShopValue(e.target.value)}
//                   /> */}
//                   <Repeater count={noShops}>
//                   {ii => ( 
//                     <Row className='mt-2'>
                     
//                       <Col md={3} className="text-center">Shop {ii + 1}</Col>
//                       <Col md={2} className="text-center">
//                         <Input 
//                         readOnly
//                         type='number' 
//                         id={`Shop-price-${ii}`}
//                               placeholder='0'
//                               value={store.projectData.lowerGrounds[props.i].priceShops}
//                               onChange={e => {
//                                 dispatch(
//                                   updateFloorInnerProperties([
//                                     e.target.value,
//                                     'lowerGrounds',
//                                     props.i,
//                                     'shops',
//                                     ii,
//                                     'priceShops'
//                                   ])
//                                 )
                              
//                                 dispatch(
//                                   updateFloorInnerProperties([
//                                     ((store.projectData.lowerGrounds[props.i].priceShops) * (store.projectData.lowerGrounds[props.i].shops[ii].length * store.projectData.lowerGrounds[props.i].shops[ii].width)).toLocaleString(undefined, { maximumFractionDigits: 2 }).toLocaleString(undefined, { maximumFractionDigits: 2 }),
//                                     'lowerGrounds',
//                                     props.i,
//                                     'shops',
//                                     ii,
//                                     'totalCost'
//                                   ])
//                                 )
//                               }}
//                         />
//                       </Col>
//                      {/* { !store.projectData.lowerGrounds[props.i].isArea ? 
//                        (
//                         <> */}
//                       <Col md={2} className="text-center">
//                         <Input
//                         type='number'
//                         id={`Shop-length-${ii}`}
//                         placeholder='0'
//                         value={
//                             store.projectData.lowerGrounds[props.i].shops[ii]
//                             .length
//                         }
//                         onChange={e => {
//                           dispatch(
//                             updateFloorInnerProperties([
//                               e.target.value,
//                               'lowerGrounds',
//                               props.i,
//                               'shops',
//                               ii,
//                               'length'
//                             ])
//                           )
//                           dispatch(
//                             updateFloorInnerProperties([
//                               // (store.projectData.lowerGrounds[props.i].priceShops * e.target.value),
//                               ((store.projectData.lowerGrounds[props.i].priceShops) * (e.target.value) * (store.projectData.lowerGrounds[props.i].shops[ii].width)),
//                               // ((store.projectData.lowerGrounds[props.i].shops[ii].length * store.projectData.lowerGrounds[props.i].shops[ii].width) * (e.target.value)),
//                               // (store.projectData.lowerGrounds[props.i].priceShops * store.projectData.lowerGrounds[props.i].shops[ii].length * e.target.value),
//                               'lowerGrounds',
//                               props.i,
//                               'shops',
//                               ii,
//                               'totalCost'
//                             ])
//                           )
                          
//                           dispatch(
//                             updateFloorInnerProperties([
//                               0,
//                               'lowerGrounds',
//                               props.i,
//                               'shops',
//                               ii,
//                               'downPaymentPercentage' 
//                             ])
//                           )
//                           dispatch(
//                             updateFloorInnerProperties([
//                               0,
//                               'lowerGrounds',
//                               props.i,
//                               'shops',
//                               ii,
//                               'downPaymentRs' 
//                             ])
//                           )
//                           dispatch(
//                             updateFloorInnerProperties([
//                               0,
//                               'lowerGrounds',
//                               props.i,
//                               'shops',
//                               ii,
//                                'remainingRs'
//                             ])
//                           )
//                           dispatch(
//                             updateFloorInnerProperties([
//                               0,
//                               'lowerGrounds',
//                               props.i,
//                               'shops',
//                               ii,
//                                'paymentYears'
//                             ])
//                           )
//                           dispatch(
//                             updateFloorInnerProperties([
//                               0,
//                               'lowerGrounds',
//                               props.i,
//                               'shops',
//                               ii,
//                               'installmentPerDuration'
//                             ])
//                           )
//                           dispatch(
//                             updateFloorInnerProperties([
//                               0,
//                               'lowerGrounds',
//                               props.i,
//                               'shops',
//                               ii,
//                               'cashDownPayment'
//                             ])
//                           )
//                           dispatch(
//                             updateFloorInnerProperties([
//                               0,
//                               'lowerGrounds',
//                               props.i,
//                               'shops',
//                               ii,
//                               'arrearsInstallmentPerPeriod'
//                             ])
//                           )
                         
//                         }}
//                         />
//                       </Col>
//                       <Col md={2} className="text-center">
//                         <Input
//                         type='number'
//                         id={`Shop-width-${ii}`}
//                         placeholder='0'
//                         value={
//                             store.projectData.lowerGrounds[props.i].shops[ii]
//                             .width
//                         }
//                         onChange={e => {
//                           dispatch(
//                             updateFloorInnerProperties([
//                               e.target.value,
//                               'lowerGrounds',
//                               props.i,
//                               'shops',
//                               ii,
//                               'width'
//                             ])
//                           )
//                           dispatch(
//                             updateFloorInnerProperties([
//                               // (store.projectData.lowerGrounds[props.i].priceShops * e.target.value),
//                               ((store.projectData.lowerGrounds[props.i].priceShops) * (e.target.value) * (store.projectData.lowerGrounds[props.i].shops[ii].length)),
//                               // ((store.projectData.lowerGrounds[props.i].shops[ii].length * store.projectData.lowerGrounds[props.i].shops[ii].width) * (e.target.value)),
//                               // (store.projectData.lowerGrounds[props.i].priceShops * store.projectData.lowerGrounds[props.i].shops[ii].width * e.target.value),
//                               'lowerGrounds',
//                               props.i,
//                               'shops',
//                               ii,
//                               'totalCost'
//                             ])
//                           )
//                           dispatch(
//                             updateFloorInnerProperties([
//                               0,
//                               'lowerGrounds',
//                               props.i,
//                               'shops',
//                               ii,
//                               'downPaymentPercentage' 
//                             ])
//                           )
//                           dispatch(
//                             updateFloorInnerProperties([
//                               0,
//                               'lowerGrounds',
//                               props.i,
//                               'shops',
//                               ii,
//                                'paymentYears'
//                             ])
//                           )
//                           dispatch(
//                             updateFloorInnerProperties([
//                               0,
//                               'lowerGrounds',
//                               props.i,
//                               'shops',
//                               ii,
//                               'installmentPerDuration'
//                             ])
//                           )
//                           dispatch(
//                             updateFloorInnerProperties([
//                               0,
//                               'lowerGrounds',
//                               props.i,
//                               'shops',
//                               ii,
//                               'cashDownPayment'
//                             ])
//                           )
//                           dispatch(
//                             updateFloorInnerProperties([
//                               0,
//                               'lowerGrounds',
//                               props.i,
//                               'shops',
//                               ii,
//                               'arrearsInstallmentPerPeriod'
//                             ])
//                           )
//                           dispatch(
//                             updateFloorInnerProperties([
//                               0,
//                               'lowerGrounds',
//                               props.i,
//                               'shops',
//                               ii,
//                               'downPaymentRs' 
//                             ])
//                           )
//                           dispatch(
//                             updateFloorInnerProperties([
//                               0,
//                               'lowerGrounds',
//                               props.i,
//                               'shops',
//                               ii,
//                                'remainingRs'
//                             ])
//                           )
//                         }}
//                         />
//                       </Col>
//                       {/* </> 
//                       )
//                       :
//                        (
//                         <>
//                              <Col md={2} className="text-center">
//                         <Input
//                         type='number'
//                         id={`Shop-wholeArea-${ii}`}
//                         placeholder='0'
//                         value={
//                             store.projectData.lowerGrounds[props.i].shops[ii]
//                             .wholeArea
//                         }
//                         onChange={e => {
//                           dispatch(
//                             updateFloorInnerProperties([
//                               e.target.value,
//                               'lowerGrounds',
//                               props.i,
//                               'shops',
//                               ii,
//                               'wholeAreaOfShop'
//                             ])
//                           )
//                           dispatch(
//                             updateFloorInnerProperties([
//                               // (store.projectData.lowerGrounds[props.i].priceShops * e.target.value),
//                               ((store.projectData.lowerGrounds[props.i].priceShops) * (e.target.value) * (store.projectData.lowerGrounds[props.i].shops[ii].wholeAreaOfShop)),
//                               // ((store.projectData.lowerGrounds[props.i].shops[ii].length * store.projectData.lowerGrounds[props.i].shops[ii].width) * (e.target.value)),
//                               // (store.projectData.lowerGrounds[props.i].priceShops * store.projectData.lowerGrounds[props.i].shops[ii].length * e.target.value),
//                               'lowerGrounds',
//                               props.i,
//                               'shops',
//                               ii,
//                               'wholeAreaOfShop'
//                             ])
//                           )
                          
//                           dispatch(
//                             updateFloorInnerProperties([
//                               0,
//                               'lowerGrounds',
//                               props.i,
//                               'shops',
//                               ii,
//                               'downPaymentPercentage' 
//                             ])
//                           )
//                           dispatch(
//                             updateFloorInnerProperties([
//                               0,
//                               'lowerGrounds',
//                               props.i,
//                               'shops',
//                               ii,
//                               'downPaymentRs' 
//                             ])
//                           )
//                           dispatch(
//                             updateFloorInnerProperties([
//                               0,
//                               'lowerGrounds',
//                               props.i,
//                               'shops',
//                               ii,
//                                'remainingRs'
//                             ])
//                           )
//                           dispatch(
//                             updateFloorInnerProperties([
//                               0,
//                               'lowerGrounds',
//                               props.i,
//                               'shops',
//                               ii,
//                                'paymentYears'
//                             ])
//                           )
//                           dispatch(
//                             updateFloorInnerProperties([
//                               0,
//                               'lowerGrounds',
//                               props.i,
//                               'shops',
//                               ii,
//                               'installmentPerDuration'
//                             ])
//                           )
//                           dispatch(
//                             updateFloorInnerProperties([
//                               0,
//                               'lowerGrounds',
//                               props.i,
//                               'shops',
//                               ii,
//                               'cashDownPayment'
//                             ])
//                           )
//                           dispatch(
//                             updateFloorInnerProperties([
//                               0,
//                               'lowerGrounds',
//                               props.i,
//                               'shops',
//                               ii,
//                               'arrearsInstallmentPerPeriod'
//                             ])
//                           )
                         
//                         }}
//                         />
//                       </Col>
//                       </>
//                        )
                     
//                       } */}
//                       {/* <Col md={3} className="text-center">
//                         <Input
//                         type='number'
//                         id={`Shop-area-${ii}`}
//                         placeholder='0'
//                         value={
//                             store.projectData.lowerGrounds[props.i].shops[ii]
//                             .area
//                         }
//                         onChange={e => {
//                           dispatch(
//                             updateFloorInnerProperties([
//                               e.target.value,
//                               'lowerGrounds',
//                               props.i,
//                               'shops',
//                               ii,
//                               'area'
//                             ])
//                           )
//                           dispatch(
//                             updateFloorInnerProperties([
//                               (store.projectData.lowerGrounds[props.i].priceShops * e.target.value),
//                               'lowerGrounds',
//                               props.i,
//                               'shops',
//                               ii,
//                               'totalCost'
//                             ])
//                           )
//                         }}
//                         />
//                       </Col> */}
//                       <Col md={2} className="text-center">
//                         {/* {store.projectData.lowerGrounds[props.i].shops[ii].totalCost} */}
//              {/* {((store.projectData.lowerGrounds[props.i].priceShops) * (store.projectData.lowerGrounds[props.i].shops[ii].length * store.projectData.lowerGrounds[props.i].shops[ii].width)) } */}
//                   {store.projectData.lowerGrounds[props.i].shops[ii].totalCost}
//                       </Col>
//                     </Row>  
//                   )}
                  
//                   </Repeater>
//                   </Row>

//           </Card>
//         </Accordion>
//       )}
//     </Row>
//   )
// }
// export default noShops