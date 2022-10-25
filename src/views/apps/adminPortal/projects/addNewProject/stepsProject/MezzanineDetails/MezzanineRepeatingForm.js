// ** React Imports
import { useState, useContext, useEffect } from 'react'

// ** Custom Components
import Repeater from '@components/repeater'
import Parkings from './Parkings'

// ** Axios Imports
import Axios from 'axios'
import Apartment from './Apartments'
import ApartmentPayment from './Payment/Apartments'

// ** Utils
import { selectThemeColors } from '@utils'
import NoShops from './ShopDetails'
import ShopsPayment from './Payment/Shops'
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
  updateNoOfFloorsmezzanine,
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
          Total Mezzanine: {store.projectData.masterDetails.countMezzanine}
        </h4>
      </CardHeader>

      <CardBody>
        <Repeater
          count={
            store.projectData.masterDetails.countMezzanine
            // store.projectData.masterDetails.countmezzanine
          }
        >
          {i => (
            <Form key={i}>
              <AccordionItem>
                <AccordionHeader targetId={`${i}`}>
                  Mezzanine {i + 1}
                </AccordionHeader>
                <AccordionBody accordionId={`${i}`}>
                  <Row className='justify-content-between align-items-center'>
                   
                    <Col md='5' className='mb-1' style={{ zIndex: 3 }}>
                      <h4>
                        Floor Type
                      </h4>
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
                                  'mezzanine',
                                  i,
                                  'floorid'
                                ])
                              )
                            }}
                            value={floorType.find(
                              c =>
                                c.value ===
                                store.projectData.mezzanine[i].floorid
                            )}
                            {...field}
                          />
                        )}
                      />
                    </Col>
                    <Col md={2} className='mb-md-0 mb-1'>
                      <h4
                      >
                        Road width
                      </h4>
                      <Input
                        type='number'
                        id={`animation-cost-${i}`}
                        placeholder='32'
                        value={store.projectData.mezzanine[i].corridorWidth}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'mezzanine',
                              i,
                              'corridorWidth'
                            ])
                          )
                        }}
                      />
                    </Col>
                    <Col md={2}>
                      <h4>
                        Return (ROI) %
                      </h4>
                      <Input
                        type='number'
                        id={`animation-cost-${i}`}
                        placeholder='32'
                        value={store.projectData.mezzanine[i].returnRoi}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'mezzanine',
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
                  <div className='form-row row '>
                  <div  className='form-group col-md-2 mb-md-0 mb-1'>
                      <h4>
                        Shop/sq.ft
                      </h4>
                      <Input
                      className= 'form-control payment__input'
                        type='number'
                        id={`animation-cost-${i}`}
                        placeholder='32'
                        value={store.projectData.mezzanine[i].priceShops}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'mezzanine',
                              i,
                              'priceShops'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              // (store.projectData.lowerGrounds[props.i].priceShops * e.target.value),
                              // ((store.projectData.lowerGrounds[props.i].priceShops) * (e.target.value) * (store.projectData.lowerGrounds[props.i].shops[ii].width)),
                              ((store.projectData.mezzanine[i]?.shops[i]?.length * store.projectData.mezzanine[i]?.shops[i]?.width) * (e.target.value)),
                              // (store.projectData.mezzanine[props.i].priceShops * store.projectData.mezzanine[props.i].shops[ii].length * e.target.value),
                              'mezzanine',
                              i,
                              'shops',
                              i,
                              'totalCost'
                            ])
                          )
                        }}
                      />
                    </div>
                    <div className='form-group col-md-2 mb-md-0 mb-1'>
                      <h4>
                        Apartment/sq. ft
                      </h4>
                      <Input
                      className= 'form-control payment__input'
                        type='number'
                        id={`animation-cost-${i}`}
                        placeholder='32'
                        value={store.projectData.mezzanine[i].priceApartments}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'mezzanine',
                              i,
                              'priceApartments'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              // (store.projectData.lowerGrounds[props.i].priceShops * e.target.value),
                              // ((store.projectData.lowerGrounds[props.i].priceShops) * (e.target.value) * (store.projectData.lowerGrounds[props.i].shops[ii].width)),
                              ((store.projectData.mezzanine[i].apartments[i]?.length * store.projectData.mezzanine[i].apartments[i]?.width) * (e.target.value)),
                              // (store.projectData.mezzanine[props.i].priceapartments * store.projectData.mezzanine[props.i].apartments[ii].length * e.target.value),
                              'mezzanine',
                              i,
                              'apartments',
                              i,
                              'totalCost'
                            ])
                          )
                        }}
                      />
                    </div>
                    <div className='form-group col-md-2 mb-md-0 mb-1'>
                      <h4>
                        length
                      </h4>
                      <Input
                      className= 'form-control payment__input'
                        type='number'
                        id={`animation-cost-${i}`}
                        placeholder='32'
                        value={store.projectData.mezzanine[i].length}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'mezzanine',
                              i,
                              'length'
                            ])
                          )
                        }}
                      />
                    </div>
                    
                    <div className='form-group col-md-2 mb-md-0 mb-1'>
                      <h4>
                        width
                      </h4>
                      <Input
                      className= 'form-control payment__input'
                        type='number'
                        id={`animation-quantity-${i}`}
                        placeholder='1'
                        value={store.projectData.mezzanine[i].width}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'mezzanine',
                              i,
                              'width'
                            ])
                          )
                        }}
                      />
                    </div>
                    <div className='form-group col-md-2 mb-md-0 mb-1'>
                      <h4>
                        Covered Area
                      </h4>

                      {
                        (store.projectData.mezzanine[i].width === '0' || store.projectData.mezzanine[i].width === '') && (store.projectData.mezzanine[i].length === '0' || store.projectData.mezzanine[i].length === '') ? (
                          <Input
                          className= 'form-control payment__input'
                          type='text'
                          placeholder='Enter Area'
                          id={`animation-price-${i}`}
                          onChange={e => {
                            dispatch(
                              updateFloorProperties([
                                e.target.value,
                                'mezzanine',
                                i,
                                'area'
                              ])
                            )
                          }}
                          value={store.projectData.mezzanine[i].area}
                        />
                        ) : (
                          <div>
                          {store.projectData.mezzanine[i].width * store.projectData.mezzanine[i].length}
                          </div>
                        )
                      }
                    </div>
                    <div>
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
                                'mezzanine',
                                'Parking'
                              ])
                            )
                          }}
                          value={store.projectData.mezzanine[i].noParkings}
                          downHandler={<Minus />}
                          id='min-max-number-input'
                          readonly='true'
                        />
                      </div>
                     </div>

                    <div className='form-group'>
                      <hr />
                    </div>
                  </div>

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
                                'mezzanine',
                                'Shop'
                              ])
                            )

                          }}
                          value={store.projectData.mezzanine[i].noShops}
                          id='min-max-number-input'
                          readonly='true'
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
                                'mezzanine',
                                'Apartment'
                              ])
                            )
                          }}
                          value={store.projectData.mezzanine[i].noApartments}
                          id='min-max-number-input'
                          readonly='true'
                        />
                      </div>
                    </Col>
                    </Row>

                  <NoShops i={i} />
                  <ShopsPayment i={i} />

                  <Apartment i={i} />
                  <ApartmentPayment i={i} />

                  <Parkings i={i} />

                  {/* <Row className='justify-content-between align-items-center'>
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
                  </Row> */}
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
