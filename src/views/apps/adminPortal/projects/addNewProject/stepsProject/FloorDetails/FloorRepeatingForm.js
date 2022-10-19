// ** React Imports
import { useState, useContext, useEffect } from 'react'

// ** Custom Components
import Repeater from '@components/repeater'

// ** Axios Imports
import Axios from 'axios'

// ** Third Party Components
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight, Plus, Minus, Check, X } from 'react-feather'
import NoShops from './ShopDetails'
import FoodCourts from './FoodCourtDetails'
import CorporateOffices from './CorporateOffices'
import ApartmenDetails from './ApartmentDetails'
import ServiceApartmentDetails from './ServiceApartmentDetails'
import HotelSuites from './HotelSuites'
import ShopsPayment from './PaymentPlan/Shops'
import FoodCourtPayment from './PaymentPlan/FoodCourts'
import CorporateOfficePayment from './PaymentPlan/CorporateOffices'
import ApartmentPayment from './PaymentPlan/Apartments'
import ServiceApartmentPayment from './PaymentPlan/ServiceApartments'
import HotelPayment from './PaymentPlan/HotelSuits'
import { toast } from 'react-toastify'
import Parkings from './Parkings'

// Base URL
import baseURL from '../../../../../../../baseURL/baseURL'

// ** Utils
import { selectThemeColors } from '@utils'

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
import {
  updateMasterDetails,
  updateNoOfFloorsfloors,
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
  const [openShop, setOpenShop] = useState('')
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
  
  const toggleShop = id => {
    openShop === id ? setOpenShop() : setOpenShop(id)
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
          Total Floors: {store.projectData.masterDetails.countFloors}
        </h4>
      </CardHeader>

      <CardBody>
        <Repeater
          count={
            store.projectData.masterDetails.countFloors
            // store.projectData.masterDetails.countfloors
          }
        >
          {i => (
            <Form key={i}>
              <AccordionItem>
                <AccordionHeader targetId={`${i}`}>
                  {/* {i === 0 && <>Lower Ground {i}</>}
                  {i === 1 && <> Ground Floor {i}</>}
                  {i > 1 && <>Floor {i - 1}</>} */}
                  Floor {i + 1}
                </AccordionHeader>
                <AccordionBody accordionId={`${i}`}>
                  <Row className='justify-content-between align-items-center'>
                    {/* <Col md={4} className='mb-md-0 mb-1'>
                      <Label className='form-label' for={`animation-cost-${i}`}>
                        Floor Label
                      </Label>
                      <InputGroup className='mt-2'>
                        <InputGroupText>Floor-</InputGroupText>
                        <Input
                          type='text'
                          id={`animation-cost-${i}`}
                          placeholder='32'
                          value={store.projectData.floors[i].label.replace(
                            'Floor-',
                            ''
                          )}
                          onChange={e => {
                            dispatch(
                              updateFloorProperties([
                                `Floor-${e.target.value}`,
                                'floors',
                                i,
                                'label'
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
                                  'floors',
                                  i,
                                  'floorid'
                                ])
                              )
                              dispatch(
                                updateFloorProperties([
                                  val ? val.label : 'NULL',
                                  'floors',
                                  i,
                                  'floorType'
                                ])
                              )
                            }}
                            value={floorType.find(
                              c =>
                                c.value ===
                                store.projectData.floors[i].floorid
                            )}
                            {...field}
                          />
                        )}
                      />
                    </Col>
                    <Col md={2} className='mb-md-0 mb-1'>
                      <div className='d-flex flex-column'>
                        <Label
                          for={`Floor-furnishedState-${i}`}
                          className='form-check-label mb-50'
                        >
                          Furnished
                        </Label>
                        <div className='form-switch form-check-primary'>
                          <Input
                            type='switch'
                            id={`Floor-furnishedState-${i}`}
                            name='icon-primary'
                            checked={store.projectData.floors[i].furnishedState}
                            onChange={e => {
                              dispatch(
                                updateFloorProperties([
                                  e.target.checked,
                                  'floors',
                                  i,
                                  'furnishedState'
                                ])
                              )
                            }}
                          />
                          <CustomLabel htmlFor={`Floor-furnishedState-${i}`} />
                        </div>
                      </div>
                    </Col>

                    <Col md={2}>
                      <Label className='form-label'
                        for={`animation-price-${i}`}
                      >
                        Return (ROI) %
                      </Label>
                      <Input
                        type='number'
                        id={`animation-cost-${i}`}
                        placeholder='32'
                        value={store.projectData.floors[i].returnRoi}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'floors',
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


                  {/* row */}
                  <Row className='justify-content-between align-items-center'>
                  <Col md={2} className='mb-md-0 mb-1 payment_text'>
                      <Label className='form-label ' for={`animation-cost-${i}`}>
                        Shop/sq. ft
                      </Label>
                      <Input
                      className= 'form-control payment__input'
                        type='number'
                        id={`animation-cost-${i}`}
                        placeholder='32'
                        value={store.projectData.floors[i].priceShops}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'floors',
                              i,
                              'priceShops'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              // (store.projectData.lowerGrounds[props.i].priceShops * e.target.value),
                              // ((store.projectData.lowerGrounds[props.i].priceShops) * (e.target.value) * (store.projectData.lowerGrounds[props.i].shops[ii].width)),
                              ((store.projectData.floors[i].shops[i]?.length * store.projectData.floors[i].shops[i]?.width) * (e.target.value)),
                              // (store.projectData.floors[props.i].priceShops * store.projectData.floors[props.i].shops[ii].length * e.target.value),
                              'floors',
                              i,
                              'shops',
                              i,
                              'totalCost'
                            ])
                          )

                        }}
                      />
                    </Col>
                    <Col md={2} className='mb-md-0 mb-1 payment_text'>
                      <Label className='form-label ' for={`animation-cost-${i}`}>
                        FoodCourts/sq. ft
                      </Label>
                      <Input
                      className= 'form-control payment__input'
                        type='number'
                        id={`animation-cost-${i}`}
                        placeholder='32'
                        value={store.projectData.floors[i].priceFoodCourts}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'floors',
                              i,
                              'priceFoodCourts'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              ((store.projectData.floors[i].foodCourts[i]?.length * store.projectData.floors[i].foodCourts[i]?.width) * (e.target.value)),
                              'floors',
                              i,
                              'foodCourts',
                              i,
                              'totalCost'
                            ])
                          )
                        }}
                      />
                    </Col>
                    <Col md={2} className='mb-md-0 mb-1 payment_text'>
                      <Label className='form-label ' for={`animation-cost-${i}`} >
                        Office/sq. ft
                      </Label>
                      <Input
                      className= 'form-control payment__input'
                        type='number'
                        id={`animation-cost-${i}`}
                        placeholder='32'
                        value={store.projectData.floors[i].priceCorporateOffices}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'floors',
                              i,
                              'priceCorporateOffices'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              ((store.projectData.floors[i].corporateOffices[i]?.length * store.projectData.floors[i].corporateOffices[i]?.width) * (e.target.value)),
                              'floors',
                              i,
                              'corporateOffices',
                              i,
                              'totalCost'
                            ])
                          )
                        }}
                      />
                    </Col>
                    <Col md={2} className='mb-md-0 mb-1 payment_text'>
                      <Label className='form-label ' for={`animation-cost-${i}`}>
                        Apartment/sq. ft
                      </Label>
                      <Input
                      className= 'form-control payment__input'
                        type='number'
                        id={`animation-cost-${i}`}
                        placeholder='32'
                        value={store.projectData.floors[i].priceApartments}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'floors',
                              i,
                              'priceApartments'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              // (store.projectData.floors[props.i].priceApartments * e.target.value),
                              // ((store.projectData.floors[i].priceApartments) * (e.target.value) * (store.projectData.floors[i].apartments[i].width)),
                              ((store.projectData.floors[i].apartments[i]?.length * store.projectData.floors[i].apartments[i]?.width) * (e.target.value)),
                              // (store.projectData.floors[props.i].priceApartments * store.projectData.floors[props.i].apartments[ii].length * e.target.value),
                              'floors',
                              i,
                              'apartments',
                              i,
                              'totalCost'
                            ])
                          )
                        }}
                      />
                    </Col>
                    <Col md={2} className='mb-md-0 mb-1 payment_text'>
                      <Label className='form-label ' for={`animation-cost-${i}`}>
                        Service Apartment/sq. ft
                      </Label>
                      <Input
                      className= 'form-control payment__input'
                        type='number'
                        id={`animation-cost-${i}`}
                        placeholder='32'
                        value={store.projectData.floors[i].priceServiceApartments}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'floors',
                              i,
                              'priceServiceApartments'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              // (store.projectData.floors[props.i].priceApartments * e.target.value),
                              // ((store.projectData.floors[i].priceApartments) * (e.target.value) * (store.projectData.floors[i].apartments[i].width)),
                              ((store.projectData.floors[i].serviceApartments[i]?.length * store.projectData.floors[i].serviceApartments[i]?.width) * (e.target.value)),
                              // (store.projectData.floors[props.i].priceserviceApartments * store.projectData.floors[props.i].serviceApartments[ii].length * e.target.value),
                              'floors',
                              i,
                              'serviceApartments',
                              i,
                              'totalCost'
                            ])
                          )
                        }}
                      />
                    </Col>
                    <Col md={2} className='mb-md-0 mb-1 payment_text'>
                      <Label className='form-label ' for={`animation-cost-${i}`}>
                        Hotel Suite/sq. ft
                      </Label>
                      <Input
                      className= 'form-control payment__input'
                        type='number'
                        id={`animation-cost-${i}`}
                        placeholder='0'
                        value={store.projectData.floors[i].priceHotelSuites}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'floors',
                              i,
                              'priceHotelSuites'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                              ((store.projectData.floors[i].hotelSuites[i]?.length * store.projectData.floors[i].hotelSuites[i]?.width) * (e.target.value)),
                              'floors',
                              i,
                              'hotelSuites',
                              i,
                              'totalCost'
                            ])
                          )
                        }}
                      />
                    </Col>
                   
                  </Row>
                  <hr/>
                  {/* row end */}
                  <Row className='justify-content-between align-items-center'>
                    <Col md={2} className='mb-md-0 mb-1 payment_text'>
                      <Label className='form-label ' for={`animation-cost-${i}`}>
                        length
                      </Label>
                      <Input
                      className= 'form-control payment__input'
                        type='number'
                        id={`animation-cost-${i}`}
                        placeholder='0'
                        value={store.projectData.floors[i].length}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'floors',
                              i,
                              'length'
                            ])
                          )
                        }}
                      />
                    </Col>
                    <Col md={2} className='mb-md-0 mb-1 payment_text'>
                      <Label
                        className='form-label '
                        for={`animation-quantity-${i}`}
                      >
                        width
                      </Label>
                      <Input
                      className= 'form-control payment__input'
                        type='number'
                        id={`animation-quantity-${i}`}
                        placeholder='1'
                        value={store.projectData.floors[i].width}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'floors',
                              i,
                              'width'
                            ])
                          )
                        }}
                      />
                    </Col>
                    
                    <Col md={2} className='mb-md-0 mb-1 payment_text'>
                      <Label
                        className='form-label '
                        for={`animation-price-${i}`}
                      >
                        Covered Area
                      </Label>

                      {
                        (store.projectData.floors[i].width === '0' || store.projectData.floors[i].width === '') && (store.projectData.floors[i].length === '0' || store.projectData.floors[i].length === '') ? (
                          <Input
                          type='text'
                          placeholder='Enter Area'
                          id={`animation-price-${i}`}
                          className='form-control'
                          onChange={e => {
                            dispatch(
                              updateFloorProperties([
                                e.target.value,
                                'floors',
                                i,
                                'area'
                              ])
                            )
                          }}
                          value={store.projectData.floors[i].area}
                        />
                        ) : (
                          <div>
                          {store.projectData.floors[i].width * store.projectData.floors[i].length}
                          </div>
                        )
                      }
                    </Col>

                    <Col md={2} className='mb-md-0 mb-1 payment_text'>
                      <Label
                        className='form-label'
                        for={`animation-price-${i}`}
                      >
                        Corridor width (ft)
                      </Label>
                      <Input
                      className= 'form-control payment__input'
                        type='number'
                        id={`animation-cost-${i}`}
                        placeholder='32'
                        value={store.projectData.floors[i].corridorWidth}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'floors',
                              i,
                              'corridorWidth'
                            ])
                          )
                        }}
                      />
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
                                'floors',
                                'Parking'
                              ])
                            )
                          }}
                          value={store.projectData.floors[i].noParkings}
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
                        type='number'
                        // id={`animation-quantity-${i}`}
                        placeholder='1'
                        value={store.projectData.floors[i].noParkings}
                        onChange={e => {
                          dispatch(
                            updateFloorNoOfShopEtc([
                              e.target.value,
                              'floors',
                              i,
                              'noParkings'
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
                        Bike Parkings
                      </Label>
                      <Input
                        type='number'
                        // id={`animation-quantity-${i}`}
                        placeholder='1'
                        value={store.projectData.floors[i].noParkings}
                        onChange={e => {
                          dispatch(
                            updateFloorNoOfShopEtc([
                              e.target.value,
                              'floors',
                              i,
                              'noParkings'
                            ])
                          )
                        }}
                      />
                    </Col> */}

                    
                    <Col sm={12}>
                      <hr />
                    </Col>
                  </Row>
                  <Row className='justify-content-between align-items-center'>
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
                                'floors',
                                'Shop'
                              ])
                            )

                          }}
                          value={store.projectData.floors[i].noShops}
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
                          Food Courts
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
                                'noFoodCourts',
                                'foodCourts',
                                'floors',
                                'FoodCourt'
                              ])
                            )
                          }}
                          value={store.projectData.floors[i].noFoodCourts}
                          downHandler={<Minus />}
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
                          Corporate Offices
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
                                'noCorporateOffices',
                                'corporateOffices',
                                'floors',
                                'CorporateOffice'
                              ])
                            )
                          }}
                          value={store.projectData.floors[i].noCorporateOffices}
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
                                'floors',
                                'Apartment'
                              ])
                            )
                          }}
                          value={store.projectData.floors[i].noApartments}
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
                          Service apartments
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
                                'noServiceApartments',
                                'serviceApartments',
                                'floors',
                                'ServiceApartment'
                              ])
                            )
                          }}
                          value={
                            store.projectData.floors[i].noServiceApartments
                          }
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
                          Hotel Suites
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
                                'noHotelSuites',
                                'hotelSuites',
                                'floors',
                                'HotelSuite'
                              ])
                            )
                          }}
                          value={store.projectData.floors[i].noHotelSuites}
                          id='min-max-number-input'
                          readonly='true'
                        />
                      </div>
                    </Col>
                  </Row>

                  <NoShops i={i} />
                  <ShopsPayment i={i} />

                  <FoodCourts i={i} />
                  <FoodCourtPayment i={i} />

                  <CorporateOffices i={i} />
                  <CorporateOfficePayment i={i} />

                  <ApartmenDetails i={i} />
                  <ApartmentPayment i={i} />

                  <ServiceApartmentDetails i={i} />
                  <ServiceApartmentPayment i={i} />

                  <HotelSuites i={i} />
                  <HotelPayment i={i} />

                  <Parkings i={i} />
{/* 
                  <div className='content-header'>
                    <h5 className='mb-0'>Rates Per Sq Ft</h5>
                    <small>Enter Rates Per Sq Ft.TO beRemoved</small>
                  </div>
                  <Row>
                    <Col md={2} className='mb-md-0 mb-1'>
                      <Label className='form-label' for={`Price-shops`}>
                        shops
                      </Label>

                      <Input
                        type='number'
                        id={`Price-shops`}
                        placeholder='Price per Sq Ft'
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'floors',
                              i,
                              'priceShops'
                            ])
                          )
                        }}
                        value={store.projectData.floors[i].priceShops}
                      />
                    </Col>
                    <Col md={2} className='mb-md-0 mb-1'>
                      <Label className='form-label' for={`Price-foodCourts`}>
                        foodCourts
                      </Label>

                      <Input
                        type='number'
                        id={`Price-foodCourts`}
                        placeholder='Price per Sq Ft'
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'floors',
                              i,
                              'priceFoodCourts'
                            ])
                          )
                        }}
                        value={store.projectData.floors[i].priceFoodCourts}
                      />
                    </Col>
                    <Col md={2} className='mb-md-0 mb-1'>
                      <Label
                        className='form-label'
                        for={`Price-corporateOffices`}
                      >
                        corporateOffices
                      </Label>

                      <Input
                        type='number'
                        id={`Price-corporateOffices`}
                        placeholder='Price per Sq Ft'
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'floors',
                              i,
                              'priceCorporateOffices'
                            ])
                          )
                        }}
                        value={
                          store.projectData.floors[i].priceCorporateOffices
                        }
                      />
                    </Col>
                    <Col md={2} className='mb-md-0 mb-1'>
                      <Label className='form-label' for={`Price-apartments`}>
                        apartments
                      </Label>

                      <Input
                        type='number'
                        id={`Price-apartments`}
                        placeholder='Price per Sq Ft'
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'floors',
                              i,
                              'priceApartments'
                            ])
                          )
                        }}
                        value={store.projectData.floors[i].priceApartments}
                      />
                    </Col>
                    <Col md={2} className='mb-md-0 mb-1'>
                      <Label
                        className='form-label'
                        for={`Price-serviceApartments`}
                      >
                        serviceApartments
                      </Label>

                      <Input
                        type='number'
                        id={`Price-serviceApartments`}
                        placeholder='Price per Sq Ft'
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'floors',
                              i,
                              'priceServiceApartments'
                            ])
                          )
                        }}
                        value={
                          store.projectData.floors[i].priceServiceApartments
                        }
                      />
                    </Col>
                    <Col md={2} className='mb-md-0 mb-1'>
                      <Label className='form-label' for={`Price-hotelSuites`}>
                        hotelSuites
                      </Label>

                      <Input
                        type='number'
                        id={`Price-hotelSuites`}
                        placeholder='Price per Sq Ft'
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'floors',
                              i,
                              'priceHotelSuites'
                            ])
                          )
                        }}
                        value={store.projectData.floors[i].priceHotelSuites}
                      />
                    </Col>
                  </Row> */}

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
