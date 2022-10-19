// ** React Imports
import { Fragment, useState, useContext } from 'react'

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs'

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
  InputGroupText
} from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { updateFloorInnerProperties } from '../../../../redux/addNewProject/store'

import InputNumber from 'rc-input-number'

const noFoodCourts = props => {
  // ** Store Variables
  const dispatch = useDispatch()
  const store = useSelector(state => state.addNewProject)

  const [open, setOpen] = useState('')
  const toggleopen = id => {
    open === id ? setOpen() : setOpen(id)
  }

  return (
    <Row className='justify-content-between align-items-center'>
      {store.projectData.floors[props.i].noFoodCourts > 0 && (
        <Accordion className='accordion-border' open={open} toggle={toggleopen}>
          <Card>
            <CardHeader>
              <h4 className='card-title'>
                Total Food Courts:{' '}
                {store.projectData.floors[props.i].noFoodCourts}:{' '}
              </h4>
            </CardHeader>
            {/* <Repeater count={store.projectData.floors[props.i].noFoodCourts}></Repeater> */}
            <Row className='mt-1'>
                  <h4 className='card-title'>
                  Food Court Details
                  </h4>
                  <Row>
                    <Col md={3} className="h4 text-center">Food Court #</Col>
                    <Col md={2} className="h4 text-center">Price Per Sq.Ft</Col>
                    <Col md={2} className="h4 text-center">length</Col>
                    <Col md={2} className="h4 text-center">width</Col>
                    <Col md={2} className="h4 text-center">Total Cost (Rs)</Col>
                  </Row>
                  <Repeater count={store.projectData.floors[props.i].noFoodCourts}>
                  {ii => ( 
                    <Row className='mt-2'>
                     
                      <Col md={3} className="text-center">Food Court {ii + 1}</Col>
                      <Col md={2} className="text-center">
                        <Input 
                        readOnly
                        type='number' 
                        id={`foodCourts-price-${ii}`}
                              placeholder='0'
                              value={store.projectData.floors[props.i].priceFoodCourts}
                              onChange={e => {
                                // dispatch(
                                //   updateFloorInnerProperties([
                                //     e.target.value,
                                //     'floors',
                                //     props.i,
                                //     'foodCourts',
                                //     ii,
                                //     'priceFoodCourts'
                                //   ])
                                // )
                              
                                // dispatch(
                                //   updateFloorInnerProperties([
                                //     ((store.projectData.floors[props.i].priceFoodCourts) * (store.projectData.floors[props.i].foodCourts[ii].length * store.projectData.floors[props.i].foodCourts[ii].width)).toLocaleString(undefined, { maximumFractionDigits: 2 }).toLocaleString(undefined, { maximumFractionDigits: 2 }),
                                //     'floors',
                                //     props.i,
                                //     'foodCourts',
                                //     ii,
                                //     'totalCost'
                                //   ])
                                // )
                              }}
                        />
                      </Col>
                      <Col md={2} className="text-center">
                        <Input
                        type='number'
                        id={`foodCourt-length-${ii}`}
                        placeholder='0'
                        value={
                            store.projectData.floors[props.i].foodCourts[ii]
                            .length
                        }
                        onChange={e => {
                          dispatch(
                            updateFloorInnerProperties([
                              e.target.value,
                              'floors',
                              props.i,
                              'foodCourts',
                              ii,
                              'length'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              // (store.projectData.floors[props.i].priceFoodCourts * e.target.value),
                              ((store.projectData.floors[props.i].priceFoodCourts) * (e.target.value) * (store.projectData.floors[props.i].foodCourts[ii].width)),
                             'floors',
                              props.i,
                              'foodCourts',
                              ii,
                              'totalCost'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'foodCourts',
                              ii,
                              'downPaymentPercentage' 
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'foodCourts',
                              ii,
                              'downPaymentRs' 
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'foodCourts',
                              ii,
                               'remainingRs'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'foodCourts',
                              ii,
                               'paymentYears'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'foodCourts',
                              ii,
                              'installmentPerDuration'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'foodCourts',
                              ii,
                              'cashDownPayment'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'foodCourts',
                              ii,
                              'arrearsInstallmentPerPeriod'
                            ])
                          )
                        }}
                        />
                      </Col>
                      <Col md={2} className="text-center">
                        <Input
                        type='number'
                        id={`foodCourt-width-${ii}`}
                        placeholder='0'
                        value={
                            store.projectData.floors[props.i].foodCourts[ii]
                            .width
                        }
                        onChange={e => {
                          dispatch(
                            updateFloorInnerProperties([
                              e.target.value,
                              'floors',
                              props.i,
                              'foodCourts',
                              ii,
                              'width'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              // (store.projectData.floors[props.i].priceFoodCourts * e.target.value),
                              ((store.projectData.floors[props.i].priceFoodCourts) * (e.target.value) * (store.projectData.floors[props.i].foodCourts[ii].length)),
                              // ((store.projectData.floors[props.i].foodCourts[ii].length * store.projectData.floors[props.i].foodCourts[ii].width) * (e.target.value)),
                              // (store.projectData.floors[props.i].priceFoodCourts * store.projectData.floors[props.i].foodCourts[ii].width * e.target.value),
                              'floors',
                              props.i,
                              'foodCourts',
                              ii,
                              'totalCost'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'foodCourts',
                              ii,
                              'downPaymentPercentage' 
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'foodCourts',
                              ii,
                              'downPaymentRs' 
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'foodCourts',
                              ii,
                               'remainingRs'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'foodCourts',
                              ii,
                               'paymentYears'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'foodCourts',
                              ii,
                              'installmentPerDuration'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'foodCourts',
                              ii,
                              'cashDownPayment'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'foodCourts',
                              ii,
                              'arrearsInstallmentPerPeriod'
                            ])
                          )
                        }}
                        />
                      </Col>
                      
                      <Col md={2} className="text-center">
                        {/* {store.projectData.floors[props.i].foodCourts[ii].totalCost} */}
             {/* {((store.projectData.floors[props.i].priceFoodCourts) * (store.projectData.floors[props.i].foodCourts[ii].length * store.projectData.floors[props.i].foodCourts[ii].width)) } */}
                  {store.projectData.floors[props.i].foodCourts[ii].totalCost}
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
export default noFoodCourts
