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

const nocorporateOffices = props => {
  // ** Store Variables
  const dispatch = useDispatch()
  const store = useSelector(state => state.addNewProject)

  const [open, setOpen] = useState('')
  const toggleopen = id => {
    open === id ? setOpen() : setOpen(id)
  }
  
  return (
    <Row className='justify-content-between align-items-center'>
      {store.projectData.floors[props.i].noCorporateOffices > 0 && (
        <Accordion className='accordion-border' open={open} toggle={toggleopen}>
          <Card>
            <CardHeader>
              <h4 className='card-title'>
                Total corporateOffices:{' '}
                {store.projectData.floors[props.i].noCorporateOffices}:{' '}
              </h4>
            </CardHeader>
            
            <Row className='mt-1'>
                  <h4 className='card-title'>
                  corporateOffices Details
                  </h4>
                  <Row>
                    <Col md={3} className="h4 text-center">CorporateOffice #</Col>
                    <Col md={2} className="h4 text-center">Price Per Sq.Ft</Col>
                    <Col md={2} className="h4 text-center">length</Col>
                    <Col md={2} className="h4 text-center">width(Sq.Ft)</Col>
                    <Col md={2} className="h4 text-center">Total Cost</Col>
                  </Row>
                  <Repeater count={store.projectData.floors[props.i].noCorporateOffices}>
                  {ii => ( 
                    <Row className='mt-2'>
                     
                      <Col md={3} className="text-center">Corp. Office {ii + 1}</Col>
                      <Col md={2} className="text-center">
                        <Input 
                        readOnly
                        type='number' 
                        id={`CorporateOffices-price-${ii}`}
                              placeholder='0'
                              value={store.projectData.floors[props.i].priceCorporateOffices}
                              onChange={e => {
                               
                              }}
                        />
                      </Col>
                      <Col md={2} className="text-center">
                        <Input
                        type='number'
                        id={`CorporateOffices-length-${ii}`}
                        placeholder='0'
                        value={
                            store.projectData.floors[props.i].corporateOffices[ii]
                            .length
                        }
                        onChange={e => {
                          dispatch(
                            updateFloorInnerProperties([
                              e.target.value,
                              'floors',
                              props.i,
                              'corporateOffices',
                              ii,
                              'length'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              // (store.projectData.floors[props.i].pricecorporateOffices * e.target.value),
                              ((store.projectData.floors[props.i].priceCorporateOffices) * (e.target.value) * (store.projectData.floors[props.i].corporateOffices[ii].width)),
                              // ((store.projectData.floors[i].corporateOffices[i].length * store.projectData.floors[i].corporateOffices[i].width) * (e.target.value)),
                              // (store.projectData.floors[props.i].pricecorporateOffices * store.projectData.floors[props.i].corporateOffices[ii].length * e.target.value),
                              'floors',
                              props.i,
                              'corporateOffices',
                              ii,
                              'totalCost'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'corporateOffices',
                              ii,
                              'downPaymentPercentage' 
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'corporateOffices',
                              ii,
                              'downPaymentRs' 
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
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
                      </Col>
                      <Col md={2} className="text-center">
                        <Input
                        type='number'
                        id={`corporateOfficest-width-${ii}`}
                        placeholder='0'
                        value={
                            store.projectData.floors[props.i].corporateOffices[ii]
                            .width
                        }
                        onChange={e => {
                          dispatch(
                            updateFloorInnerProperties([
                              e.target.value,
                              'floors',
                              props.i,
                              'corporateOffices',
                              ii,
                              'width'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              // (store.projectData.floors[props.i].pricecorporateOffices * e.target.value),
                              ((store.projectData.floors[props.i].priceCorporateOffices) * (e.target.value) * (store.projectData.floors[props.i].corporateOffices[ii].length)),
                              // ((store.projectData.floors[props.i].corporateOffices[ii].length * store.projectData.floors[props.i].corporateOffices[ii].width) * (e.target.value)),
                              // (store.projectData.floors[props.i].pricecorporateOffices * store.projectData.floors[props.i].corporateOffices[ii].width * e.target.value),
                              'floors',
                              props.i,
                              'corporateOffices',
                              ii,
                              'totalCost'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'corporateOffices',
                              ii,
                              'downPaymentPercentage' 
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
                              'floors',
                              props.i,
                              'corporateOffices',
                              ii,
                              'downPaymentRs' 
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              0,
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
                      </Col>
                    
                      <Col md={2} className="text-center">
                        {/* {store.projectData.floors[props.i].corporateOffices[ii].totalCost} */}
             {/* {((store.projectData.floors[props.i].pricecorporateOffices) * (store.projectData.floors[props.i].corporateOffices[ii].length * store.projectData.floors[props.i].corporateOffices[ii].width)) } */}
                  {store.projectData.floors[props.i].corporateOffices[ii].totalCost}
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
export default nocorporateOffices
