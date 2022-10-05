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

const noserviceApartments = props => {
  // ** Store Variables
  const dispatch = useDispatch()
  const store = useSelector(state => state.addNewProject)

  const [open, setOpen] = useState('')
  const toggleopen = id => {
    open === id ? setOpen() : setOpen(id)
  }
  
  return (
    <Row className='justify-content-between align-items-center'>
      {store.projectData.floors[props.i].noServiceApartments > 0 && (
        <Accordion className='accordion-border' open={open} toggle={toggleopen}>
          <Card>
            <CardHeader>
              <h4 className='card-title'>
                Total serviceApartments:{' '}
                {store.projectData.floors[props.i].noServiceApartments}:{' '}
              </h4>
            </CardHeader>
            
            <Row className='mt-1'>
                  <h4 className='card-title'>
                 Service Apartment Details
                  </h4>
                  <Row>
                    <Col md={3} className="h4 text-center">Apartment #</Col>
                    <Col md={2} className="h4 text-center">Price Per Sq.Ft</Col>
                    <Col md={2} className="h4 text-center">length</Col>
                    <Col md={2} className="h4 text-center">width</Col>
                    <Col md={2} className="h4 text-center">Total Cost</Col>
                  </Row>
                  <Repeater count={store.projectData.floors[props.i].noServiceApartments}>
                  {ii => ( 
                    <Row className='mt-2'>
                     
                      <Col md={3} className="text-center">Service Apart {ii + 1}</Col>
                      <Col md={2} className="text-center">
                        <Input 
                        readOnly
                        type='number' 
                        id={`serviceApartments-price-${ii}`}
                              placeholder='0'
                              value={store.projectData.floors[props.i].priceServiceApartments}
                              onChange={e => {
                               
                              }}
                        />
                      </Col>
                      <Col md={2} className="text-center">
                        <Input
                        type='number'
                        id={`serviceApartments-length-${ii}`}
                        placeholder='0'
                        value={
                            store.projectData.floors[props.i].serviceApartments[ii]
                            .length
                        }
                        onChange={e => {
                          dispatch(
                            updateFloorInnerProperties([
                              e.target.value,
                              'floors',
                              props.i,
                              'serviceApartments',
                              ii,
                              'length'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              // (store.projectData.floors[props.i].priceServiceApartments * e.target.value),
                              ((store.projectData.floors[props.i].priceServiceApartments) * (e.target.value) * (store.projectData.floors[props.i].serviceApartments[ii].width)),
                              // ((store.projectData.floors[i].serviceApartments[i].length * store.projectData.floors[i].serviceApartments[i].width) * (e.target.value)),
                              // (store.projectData.floors[props.i].priceServiceApartments * store.projectData.floors[props.i].serviceApartments[ii].length * e.target.value),
                              'floors',
                              props.i,
                              'serviceApartments',
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
                        id={`serviceApartmentst-width-${ii}`}
                        placeholder='0'
                        value={
                            store.projectData.floors[props.i].serviceApartments[ii]
                            .width
                        }
                        onChange={e => {
                          dispatch(
                            updateFloorInnerProperties([
                              e.target.value,
                              'floors',
                              props.i,
                              'serviceApartments',
                              ii,
                              'width'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              // (store.projectData.floors[props.i].priceServiceApartments * e.target.value),
                              ((store.projectData.floors[props.i].priceServiceApartments) * (e.target.value) * (store.projectData.floors[props.i].serviceApartments[ii].length)),
                              // ((store.projectData.floors[props.i].serviceApartments[ii].length * store.projectData.floors[props.i].serviceApartments[ii].width) * (e.target.value)),
                              // (store.projectData.floors[props.i].priceServiceApartments * store.projectData.floors[props.i].serviceApartments[ii].width * e.target.value),
                              'floors',
                              props.i,
                              'serviceApartments',
                              ii,
                              'totalCost'
                            ])
                          )
                        }}
                        />
                      </Col>
                    
                      <Col md={2} className="text-center">
                        {/* {store.projectData.floors[props.i].serviceApartments[ii].totalCost} */}
             {/* {((store.projectData.floors[props.i].priceServiceApartments) * (store.projectData.floors[props.i].serviceApartments[ii].length * store.projectData.floors[props.i].serviceApartments[ii].width)) } */}
                  {store.projectData.floors[props.i].serviceApartments[ii].totalCost}
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
export default noserviceApartments
