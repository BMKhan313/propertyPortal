//
// ** React Imports
import { Fragment, useState, useContext } from 'react'

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs'

// ** Utils
import { selectThemeColors } from '@utils'

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
import { updateFloorInnerProperties } from '../../../../redux/addNewProject/store'

import InputNumber from 'rc-input-number'

const noShops = props => {
  // ** Store Variables
  const dispatch = useDispatch()
  const store = useSelector(state => state.addNewProject)
  const [open, setOpen] = useState('')
  const toggleopen = id => {
    open === id ? setOpen() : setOpen(id)
  }


  return (
    <Row className='justify-content-between align-items-center'>
      {store.projectData.mezzanine[props.i].noShops > 0 && (
        <Accordion className='accordion-border' open={open} toggle={toggleopen}>
          <Card>
            <CardHeader>
              <h4 className='card-title'>
                Total shops: {store.projectData.mezzanine[props.i].noShops}:{' '}
              </h4>
            </CardHeader>
            <Row className='mt-1'>
                  <h4 className='card-title'>
                  Shop Details
                  </h4>
                  <Row>
                    <Col md={3} className="h4 text-center">Shop #</Col>
                    <Col md={2} className="h4 text-center">Price Per Sq.Ft</Col>
                    <Col md={2} className="h4 text-center">length</Col>
                    <Col md={2} className="h4 text-center">width</Col>
                    <Col md={2} className="h4 text-center">Total Cost (Rs)</Col>
                  </Row>
                   <Repeater count={store.projectData.mezzanine[props.i].noShops}>
                  {ii => ( 
                    <Row className='mt-2'>
                     
                      <Col md={3} className="text-center">Shop {ii + 1}</Col>
                      <Col md={2} className="text-center">
                        <Input 
                        readOnly
                        type='number' 
                        id={`Shop-price-${ii}`}
                              placeholder='0'
                              value={store.projectData.mezzanine[props.i].priceShops}
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'mezzanine',
                                    props.i,
                                    'shops',
                                    ii,
                                    'priceShops'
                                  ])
                                )
                              
                                dispatch(
                                  updateFloorInnerProperties([
                                    ((store.projectData.mezzanine[props.i].priceShops) * (store.projectData.mezzanine[props.i].shops[ii].length * store.projectData.mezzanine[props.i].shops[ii].width)).toLocaleString(undefined, { maximumFractionDigits: 2 }).toLocaleString(undefined, { maximumFractionDigits: 2 }),
                                    'mezzanine',
                                    props.i,
                                    'shops',
                                    ii,
                                    'totalCost'
                                  ])
                                )
                              }}
                        />
                      </Col>
                      <Col md={2} className="text-center">
                        <Input
                        type='number'
                        id={`Shop-length-${ii}`}
                        placeholder='0'
                        value={
                            store.projectData.mezzanine[props.i].shops[ii]
                            .length
                        }
                        onChange={e => {
                          dispatch(
                            updateFloorInnerProperties([
                              e.target.value,
                              'mezzanine',
                              props.i,
                              'shops',
                              ii,
                              'length'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              // (store.projectData.mezzanine[props.i].priceShops * e.target.value),
                              ((store.projectData.mezzanine[props.i].priceShops) * (e.target.value) * (store.projectData.mezzanine[props.i].shops[ii].width)),
                              // ((store.projectData.mezzanine[props.i].shops[ii].length * store.projectData.mezzanine[props.i].shops[ii].width) * (e.target.value)),
                              // (store.projectData.mezzanine[props.i].priceShops * store.projectData.mezzanine[props.i].shops[ii].length * e.target.value),
                              'mezzanine',
                              props.i,
                              'shops',
                              ii,
                              'totalCost'
                            ])
                          )
                        }}
                        />
                      </Col>
                      <Col md={2} className="text-center">
                        <Input
                        type='number'
                        id={`Shop-width-${ii}`}
                        placeholder='0'
                        value={
                            store.projectData.mezzanine[props.i].shops[ii]
                            .width
                        }
                        onChange={e => {
                          dispatch(
                            updateFloorInnerProperties([
                              e.target.value,
                              'mezzanine',
                              props.i,
                              'shops',
                              ii,
                              'width'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              // (store.projectData.mezzanine[props.i].priceShops * e.target.value),
                              ((store.projectData.mezzanine[props.i].priceShops) * (e.target.value) * (store.projectData.mezzanine[props.i].shops[ii].length)),
                              // ((store.projectData.mezzanine[props.i].shops[ii].length * store.projectData.mezzanine[props.i].shops[ii].width) * (e.target.value)),
                              // (store.projectData.mezzanine[props.i].priceShops * store.projectData.mezzanine[props.i].shops[ii].width * e.target.value),
                              'mezzanine',
                              props.i,
                              'shops',
                              ii,
                              'totalCost'
                            ])
                          )
                        }}
                        />
                      </Col>
                      {/* <Col md={3} className="text-center">
                        <Input
                        type='number'
                        id={`Shop-area-${ii}`}
                        placeholder='0'
                        value={
                            store.projectData.mezzanine[props.i].shops[ii]
                            .area
                        }
                        onChange={e => {
                          dispatch(
                            updateFloorInnerProperties([
                              e.target.value,
                              'mezzanine',
                              props.i,
                              'shops',
                              ii,
                              'area'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              (store.projectData.mezzanine[props.i].priceShops * e.target.value),
                              'mezzanine',
                              props.i,
                              'shops',
                              ii,
                              'totalCost'
                            ])
                          )
                        }}
                        />
                      </Col> */}
                      <Col md={2} className="text-center">
                        {/* {store.projectData.mezzanine[props.i].shops[ii].totalCost} */}
             {/* {((store.projectData.mezzanine[props.i].priceShops) * (store.projectData.mezzanine[props.i].shops[ii].length * store.projectData.mezzanine[props.i].shops[ii].width)) } */}
                  {store.projectData.mezzanine[props.i].shops[ii].totalCost}
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
