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
  updateNoOfFloorsBasements,
  updateFloorNoOfShopEtc,
  updateFloorProperties
} from '../../../../redux/addNewProject/store'

import InputNumber from 'rc-input-number'
import { toast } from 'react-toastify'

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

  const defaultValues = {
    other: ''
  }

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  useEffect(() => {
    Axios.get(`${baseURL}/getProjectType`)
      .then(response => {
        const rec = response.data.type.map(({ id, type }) => ({
          id,
          value: id,
          label: type
        }))
        setFloorType(rec)
        //   setLoading(false)
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <Card>
      <CardHeader>
        <h4 className='card-title'>
          Total Basements: {store.projectData.masterDetails.countBasements}
        </h4>
      </CardHeader>

      <CardBody>
        <Repeater
          count={
            store.projectData.masterDetails.countBasements
            // store.projectData.masterDetails.countBasements
          }
        >
          {i => (
            <Form key={i}>
              <AccordionItem>
                <AccordionHeader targetId={`${i}`}>
                  {/* {i === 0 && <>Lower Ground {i}</>}
                  {i === 1 && <> Ground Basement {i}</>}
                  {i > 1 && <>Basement {i - 1}</>} */}
                  Basement {i + 1}
                </AccordionHeader>
                <AccordionBody accordionId={`${i}`}>
                  <Row className='justify-content-between align-items-center'>
                    {/* <Col md={4} className='mb-md-0 mb-1'>
                      <Label className='form-label' for={`animation-cost-${i}`}>
                        Basement No {i + 1}
                      </Label>
                      <InputGroup className='mt-2'>
                        <InputGroupText>Basement-</InputGroupText>
                        <Input
                          type='text'
                          id={`animation-cost-${i}`}
                          placeholder='32'
                          value={store.projectData.basements[i].label.replace(
                            'Basement-',
                            ''
                          )}
                          onChange={e => {
                            dispatch(
                              updateFloorProperties([
                                `Basement-${e.target.value}`,
                                'basements',
                                i,
                                'label',
                                'Parking'
                              ])
                            )
                          }}
                        />
                      </InputGroup>
                    </Col> */}
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
                                  'basements',
                                  i,
                                  'floorid'
                                ])
                              )
                              dispatch(
                                updateFloorProperties([
                                  val ? val.label : 'none',
                                  'basements',
                                  i,
                                  'floorType'
                                ])
                              )
                            }
                          }
                            value={floorType.find(
                              c =>
                                c.value ===
                                store.projectData.basements[i].floorid
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
                        type='text'
                        id={`animation-cost-${i}`}
                        placeholder='32'
                        value={store.projectData.basements[i].corridorWidth}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'basements',
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
                        type='text'
                        id={`animation-cost-${i}`}
                        placeholder='32'
                        value={store.projectData.basements[i].returnRoi}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'basements',
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
                        length
                      </Label>
                      <Input
                        type='text'
                        id={`animation-cost-${i}`}
                        placeholder='Length'
                        value={store.projectData.basements[i].length}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'basements',
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
                        type='text'
                        id={`animation-quantity-${i}`}
                        placeholder='width'
                        value={store.projectData.basements[i].width}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'basements',
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
                        (store.projectData.basements[i].width === '0' || store.projectData.basements[i].width === '') && (store.projectData.basements[i].length === '0' || store.projectData.basements[i].length === '') ? (
                          <Input
                          type='text'
                          placeholder='Enter Area'
                          id={`animation-price-${i}`}
                          className='form-control'
                          onChange={e => {
                            dispatch(
                              updateFloorProperties([
                                e.target.value,
                                'basements',
                                i,
                                'area'
                              ])
                            )
                          }}
                          value={store.projectData.basements[i].area}
                        />
                        ) : (
                          <div>
                          {store.projectData.basements[i].width * store.projectData.basements[i].length}
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
                                'basements',
                                'Parking'
                              ])
                            )
                          }}
                          value={store.projectData.basements[i].noParkings}
                          downHandler={<Minus />}
                          id='min-max-number-input'
                          readonly='true'
                        />
                      </div>
                    </Col>
                    {/* <Col md={2} className='mb-md-0 mb-1'>
                      <Label
                        className='form-label'
                        for={`animation-quantity-${i}`}
                      >
                        Car Parkings
                      </Label>
                      <Input
                        type='text'
                        id={`animation-quantity-${i}`}
                        placeholder='1'
                        value={store.projectData.basements[i].carParkings}
                        onChange={e => {
                          dispatch(
                            updateNoOfFloorsBasements([
                              e.target.value,
                              'basements',
                              i,
                              'carParkings'
                            ])
                          )
                        }}
                      />
                    </Col>
                    {store.projectData.basements[i].carParkings}

                    <Col md={2} className='mb-md-0 mb-1'>
                      <Label
                        className='form-label'
                        for={`animation-quantity-${i}`}
                      >
                        Bike Parkings
                      </Label>
                      <Input
                        type='text'
                        // id={`animation-quantity-${i}`}
                        placeholder='1'
                        value={store.projectData.basements[i].bikeParkings}
                        onChange={e => {
                          dispatch(
                            updateNoOfFloorsBasements([
                              e.target.value,
                              'basements',
                              i,
                              'bikeParkings'
                            ])
                          )
                        }}
                      />
                      {store.projectData.basements[i].bikeParkings}
                    </Col> */}

                    <Col sm={12}>
                      <hr />
                    </Col>
                  </Row>

                  <Parkings i={i} />

                  <Row className='justify-content-between align-items-center'>
                    <Col md='6' sm='12'>
                      <Label
                        className='form-label'
                        for='exampleMultipleFileBrowser'
                      >
                        Multiple files input
                      </Label>
                      <Input
                        type='file'
                        id='exampleMultipleFileBrowser'
                        name='MultipleFiles'
                        multiple
                      />
                    </Col>
                  </Row>
                </AccordionBody>
              </AccordionItem>
            </Form>
          )}
        </Repeater>
        {/* <Button className='btn-icon' color='primary' onClick={increaseCount}>
          <Plus size={14} />
          <span className='align-middle ms-25'>Add New</span>
        </Button> */}
      </CardBody>
    </Card>
  )
}

export default RepeatingForm
