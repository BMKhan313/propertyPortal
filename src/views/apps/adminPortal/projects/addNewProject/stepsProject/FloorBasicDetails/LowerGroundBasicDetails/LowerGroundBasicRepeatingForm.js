import React from 'react'

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

const LowerGroundBasicRepeatingForm = ({j}) => {
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

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  return (
    <div>
        <Repeater
                 count={store.projectData.masterDetails.countGroundFloors}
                 > 
       {l => ( <Row>
                     
                     <Col md='2' className='mb-1' style={{ zIndex: 3 }}>
                    LowerGrounds-{l+1}  
                   
                     </Col>
                     
                     <Col md='2' className='mb-1' style={{ zIndex: 3 }}>
                      <Controller
                        name='floorType'
                        control={control}
                        render={({ field: { onChange, value, ...field } }) => (
                          // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
                          <Select
                            id='floorType'
                            isClearable={true}
                            classNamePrefix='select'
                            options={floorType}
                            theme={selectThemeColors}
                            onChange={val => {
                              onChange(val ? val.value : 0)
                              dispatch(
                                updateFloorProperties([
                                  val ? val.id : 0,
                                  'lowerGrounds',
                                  l,
                                  'floorid'
                                ])
                              )
                              dispatch(
                                updateFloorProperties([
                                  val ? val.label : 'none',
                                  'lowerGrounds',
                                  l,
                                  'floorType'
                                ])
                              )
                            }
                          }
                            value={floorType.find(
                              c =>
                                c.value ===
                                store.projectData.lowerGrounds[l].floorid
                            )}
                            {...field}
                          />
                        )}
                      />
                      </Col>
                      <Col md='1' className='mb-1' style={{ zIndex: 3, display: 'flex', marginLeft: 32 }}>
                      <Input
                        type='text'
                        id={`animation-cost-${l}`}
                        placeholder='32'
                        value={store.projectData.lowerGrounds[l].noOfUnits}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'lowerGrounds',
                              l,
                              'noOfUnits'
                            ])
                          )
                        }}
                      />
                      </Col>
                      <Col md='1' className='mb-1' style={{ zIndex: 3, marginLeft: 23 }}>
                      <Input
                        type='text'
                        id={`animation-cost-${l}`}
                        placeholder='32'
                        value={store.projectData.lowerGrounds[l].pricePerSqFt}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'lowerGrounds',
                              l,
                              'pricePerSqFt'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
                                           (e.target.value * store.projectData.lowerGrounds[l].minArea),
                                            'lowerGrounds',
                                            l,
                                            'minPrice'
                                          ])
                                        )
                                        dispatch(
                                          updateFloorProperties([
                                            (e.target.value * store.projectData.lowerGrounds[l].maxArea),
                                            'lowerGrounds',
                                            l,
                                            'maxPrice'
                                          ])
                                        )
                                        
                        }}
                      />
                      </Col>
                      <Col md='1' className='mb-1' style={{ zIndex: 3, marginLeft: 28 }}>
                      <Input
                        type='text'
                        id={`animation-cost-${l}`}
                        placeholder='32'
                        value={store.projectData.lowerGrounds[l].minArea}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'lowerGrounds',
                              l,
                              'minArea'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
                             (e.target.value * store.projectData.lowerGrounds[l].pricePerSqFt),
                              'lowerGrounds',
                              l,
                              'minPrice'
                            ])
                          )
                        }}
                      />
                      </Col>
                      <Col md='1' className='mb-1' style={{ zIndex: 3, marginLeft: 23 }}>
                      <Input
                        type='text'
                        id={`animation-cost-${l}`}
                        placeholder='32'
                        value={store.projectData.lowerGrounds[l].maxArea}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'lowerGrounds',
                              l,
                              'maxArea'
                            ])
                          )
                          dispatch(
                            updateFloorProperties([
                              (e.target.value * store.projectData.lowerGrounds[l].pricePerSqFt),
                              'lowerGrounds',
                              l,
                              'maxPrice'
                            ])
                          )
                        }}
                      />
                      </Col>
                      <Col md='1' className='mb-1' style={{ zIndex: 3, marginLeft: 23 }}>
                      {store.projectData.lowerGrounds[l].minPrice}
                      </Col>
                      <Col md='1' className='mb-1' style={{ zIndex: 3, marginLeft: 23 }}>
                      {store.projectData.lowerGrounds[l].maxPrice}
                      </Col>
                     
                     </Row>
                      )}
                     </Repeater>
                    
    </div>
  )
}

export default LowerGroundBasicRepeatingForm