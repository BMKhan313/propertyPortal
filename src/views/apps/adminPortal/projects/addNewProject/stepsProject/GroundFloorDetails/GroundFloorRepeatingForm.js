// ** React Imports
import { useState, useContext, useEffect } from 'react'

// ** Custom Components
import Repeater from '@components/repeater'
import Parkings from './Parkings'
// ** Axios Imports
import Axios from 'axios'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Third Party Components
import Shops from './Shops'
import Apartment from './Apartment'
import ShopsPayment from './Payment/Shop'
import ApartmentPayment from './Payment/Apartment'
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight, Plus, Minus, Check, X } from 'react-feather'

// Base URL
import baseURL from '../../../../../../../baseURL/baseURL'

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

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import {
  updateMasterDetails,
  updateNoOfFloorsgroundFloors,
  updateFloorNoOfShopEtc,
  updateFloorProperties,
  updateFloorInnerProperties
} from '../../../../redux/addNewProject/store'

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

const RepeatingForm = () => {
  // ** Store Variables
  const dispatch = useDispatch()
  const store = useSelector(state => state.addNewProject)

  // ** State
  const [floorType, setFloorType] = useState([])
  const [count, setCount] = useState(0)
  const [rows, setRows] = useState([])

  const updateRows = () => {
    rows.push()
    setRows(rows)
    console.log(rows)
  }

  const deleteRow = () => {
    rows.pop()
    setRows(rows)
    console.log(rows)
  }

  const defaultValues = {
    other: ''
  }

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })
// bmk*
  // useEffect(() => {
  //   Axios.get(`${baseURL}/getProjectType`)
  //     .then(response => {
  //       const rec = response.data.type.map(({ id, type }) => ({
  //         id,
  //         value: id,
  //         label: type
  //       }))
  //       setFloorType(rec)
  //       //   setLoading(false)
  //     })
  //     .catch(err => console.log(err))
  // }, [])
  return (
    <Card>
      <CardHeader>
        <h4 className='card-title'>
          Total Ground Floors: {store.projectData.masterDetails.countGroundFloors}
        </h4>
      </CardHeader>

      <CardBody>
        <Repeater
          count={
            store.projectData.masterDetails.countGroundFloors
            // store.projectData.masterDetails.countgroundFloors
          }
        >
          {i => (
            <Form key={i}>
              <AccordionItem>
                <AccordionHeader targetId={`${i}`}>
                  
                  Ground Floor {i + 1}
                </AccordionHeader>
                <AccordionBody accordionId={`${i}`}>
                  <Row className='justify-content-between align-items-center'>
                   
                    <Col md='3' className='mb-1' style={{ zIndex: 3 }}>
                      <Label className='form-label' for='floorType'>
                        Floor Type
                      </Label>
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
                                  'groundFloors',
                                  i,
                                  'floorid'
                                ])
                              )
                            }}
                            value={floorType.find(
                              c =>
                                c.value ===
                                store.projectData.groundFloors[i].floorid
                            )}
                            {...field}
                          />
                        )}
                      />
                    </Col>
                    <Col md={2} className='mb-md-0 mb-1'>
                      <Label
                        className='form-label'
                        for={`animation-price-${i}`}
                      >
                        Road width
                      </Label>
                      <Input
                        type='number'
                        id={`animation-cost-${i}`}
                        placeholder='32'
                        value={store.projectData.groundFloors[i].corridorWidth}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'groundFloors',
                              i,
                              'corridorWidth'
                            ])
                          )
                        }}
                      />
                    </Col>
                    <Col md={2}>
                      <Label
                        className='form-label'
                        for={`animation-price-${i}`}
                      >
                        Return (ROI) %
                      </Label>
                      <Input
                        type='number'
                        id={`animation-cost-${i}`}
                        placeholder='32'
                        value={store.projectData.groundFloors[i].returnRoi}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'groundFloors',
                              i,
                              'returnRoi'
                            ])
                          )
                        }}
                      />
                    </Col>
                    <Col sm={12}>
                      <hr />
                    </Col>
                  </Row>
                  <Row className='justify-content-between align-items-center'>
                  <Col md={2} className='mb-md-0 mb-1'>
                    <Label className='form-label' for={`animation-cost-${i}`}>
                        Shop/sq. ft
                      </Label>
                    <Input
                        type='number'
                        id={`animation-cost-${i}`}
                        placeholder='32'
                        value={store.projectData.groundFloors[i].priceShops }
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'groundFloors',
                              i,
                              'priceShops'
                        ])  
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              // (store.projectData.lowerGrounds[props.i].priceShops * e.target.value),
                              // ((store.projectData.lowerGrounds[props.i].priceShops) * (e.target.value) * (store.projectData.lowerGrounds[props.i].shops[ii].width)),
                              ((store.projectData.groundFloors[i].shops[i].length * store.projectData.groundFloors[i].shops[i].width) * (e.target.value)),
                              // (store.projectData.groundFloors[props.i].priceShops * store.projectData.groundFloors[props.i].shops[ii].length * e.target.value),
                              'groundFloors',
                              i,
                              'shops',
                              i,
                              'totalCost'
                            ])
                          )
                         
                         
                        }}
                      />
                    </Col>
                    <Col md={2} className='mb-md-0 mb-1'>
                    <Label className='form-label' for={`animation-cost-${i}`}>
                        Apartment/sq. ft
                      </Label>
                    <Input
                        type='number'
                        id={`animation-cost-${i}`}
                        placeholder='32'
                        value={store.projectData.groundFloors[i].priceApartments }
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'groundFloors',
                              i,
                              'priceApartments'
                        ])  
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              // (store.projectData.lowerGrounds[props.i].priceShops * e.target.value),
                              // ((store.projectData.lowerGrounds[props.i].priceShops) * (e.target.value) * (store.projectData.lowerGrounds[props.i].shops[ii].width)),
                              ((store.projectData.groundFloors[i].apartments[i].length * store.projectData.groundFloors[i].apartments[i].width) * (e.target.value)),
                              // (store.projectData.groundFloors[props.i].priceapartments * store.projectData.groundFloors[props.i].apartments[ii].length * e.target.value),
                              'groundFloors',
                              i,
                              'apartments',
                              i,
                              'totalCost'
                            ])
                          )
                         
                        }}
                      />
                    </Col>
                    <Col md={2} className='mb-md-0 mb-1'>
                      <Label className='form-label' for={`animation-cost-${i}`}>
                        length
                      </Label>
                      <Input
                        type='number'
                        id={`animation-cost-${i}`}
                        placeholder='32'
                        value={store.projectData.groundFloors[i].length}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'groundFloors',
                              i,
                              'length'
                        ])  
                          )
                        }}
                      />
                     
                    </Col>
                    
                    <Col md={2} className='mb-md-0 mb-1'>
                      <Label
                        className='form-label'
                        for={`animation-quantity-${i}`}
                      >
                        width
                      </Label>
                      <Input
                        type='number'
                        id={`animation-quantity-${i}`}
                        placeholder='1'
                        value={store.projectData.groundFloors[i].width}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'groundFloors',
                              i,
                              'width'
                            ])
                          )
                        }}
                      />
                    </Col>
                    <Col md={2} className='mb-md-0 mb-1'>
                      <Label
                        className='form-label'
                        for={`animation-price-${i}`}
                      >
                        Covered Area
                      </Label>

                      {
                        (store.projectData.groundFloors[i].width === '0' || store.projectData.groundFloors[i].width === '') && (store.projectData.groundFloors[i].length === '0' || store.projectData.groundFloors[i].length === '') ? (
                          <Input
                          type='text'
                          placeholder='Enter Area'
                          id={`animation-price-${i}`}
                          className='form-control'
                          onChange={e => {
                            dispatch(
                              updateFloorProperties([
                                e.target.value,
                                'groundFloors',
                                i,
                                'area'
                              ])
                            )
                          }}
                          value={store.projectData.groundFloors[i].area}
                        />
                        ) : (
                          <div>
                          {store.projectData.groundFloors[i].width * store.projectData.groundFloors[i].length}
                          </div>
                        )
                      }
                    </Col>

                    <Col md={2}>
                      <div>
                        <Label
                          className='form-label'
                          for='min-max-number-input'
                        >
                          Parkings
                        </Label>
                        <InputNumber
                          min={0}
                          // max={10}
                          defaultValue={0}
                          upHandler={<Plus />}
                          onChange={e => {
                            dispatch(
                              updateFloorNoOfShopEtc([
                                e,
                                i,
                                'noParkings',
                                'parkings',
                                'groundFloors',
                                'Parking'
                              ])
                            )
                          }}
                          value={store.projectData.groundFloors[i].noParkings}
                          downHandler={<Minus />}
                          id='min-max-number-input'
                          readOnly
                        />
                      </div>
                    </Col>

                    <Col sm={12}>
                      <hr />
                    </Col>
                  </Row>

                  <Row>

<Col md={2} className='mb-md-0 mb-1'>
    {' '}
    <div>
      <Label
        className='form-label'
        for='min-max-number-input'
      >
        Shops
      </Label>
      <InputNumber
        min={0}
        // max={10}

        defaultValue={0}
        upHandler={<Plus onClick={updateRows} />}
        downHandler={<Minus onClick={deleteRow} /> }
        onChange={e => {
          dispatch(
            updateFloorNoOfShopEtc([
              e,
              i,
              'noShops',
              'shops',
              'groundFloors',
              'Shop'
            ])
          )

        }}
        value={store.projectData.groundFloors[i].noShops}
        id='min-max-number-input'
        readOnly
      />
      
    </div>
  </Col>

  <Col md={2} className='mb-md-0 mb-1'>
    {' '}
    <div>
      <Label
        className='form-label'
        for='min-max-number-input'
      >
        Apartments
      </Label>
      <InputNumber
        min={0}
        // max={10}
        defaultValue={0}
        upHandler={<Plus />}
        downHandler={<Minus />}
        onChange={e => {
          dispatch(
            updateFloorNoOfShopEtc([
              e,
              i,
              'noApartments',
              'apartments',
              'groundFloors',
              'Apartment'
            ])
          )
        }}
        value={store.projectData.groundFloors[i].noApartments}
        id='min-max-number-input'
        readOnly
      />
    </div>
  </Col>
  </Row>

<Shops i={i} />
<ShopsPayment i={i} />

<Apartment i={i} />
<ApartmentPayment i={i} />

<Parkings i={i} />

                </AccordionBody>
              </AccordionItem>
            </Form>
          )}
        </Repeater>
       
      </CardBody>
    </Card>
  )
}

export default RepeatingForm