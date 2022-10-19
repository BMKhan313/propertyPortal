// ** React Imports
import { useState, useContext, useEffect } from 'react'

// ** Custom Components
import Repeater from '@components/repeater'


import Parkings from './Parkings'
// ** Axios Imports
import Axios from 'axios'

// ** Utils
import { selectThemeColors } from '@utils'
import NoShops from './ShopDetails'
import ShopsPayment from './PaymentPlan/Shops'
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
  updateNoOfFloorslowerGrounds,
  updateFloorNoOfShopEtc,
  updateFloorProperties,
  updateFloorInnerProperties
} from '../../../../redux/addNewProject/store'
// import {ShopDetails} from './ShopDetails'
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

const RepeatingForm = ({ii}) => {
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
          Total Lower Grounds: {store.projectData.masterDetails.countLowerGrounds}
        </h4>
      </CardHeader>

      <CardBody>
        <Repeater
          count={
            store.projectData.masterDetails.countLowerGrounds
            // store.projectData.masterDetails.countlowerGrounds
          }
        >
          {i => (
            <Form key={i}>
              <AccordionItem>
                <AccordionHeader targetId={`${i}`}>
                 
                  LowerGrounds {i + 1}
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
                                  'lowerGrounds',
                                  i,
                                  'floorid'
                                ])
                              )
                            }}
                            value={floorType.find(
                              c =>
                                c.value ===
                                store.projectData.lowerGrounds[i].floorid
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
                          className= 'form-control payment__input'
                          type='number'
                        id={`animation-cost-${i}`}
                        placeholder='32'
                        value={store.projectData.lowerGrounds[i].corridorWidth}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'lowerGrounds',
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
                          className= 'form-control payment__input'
                          type='number'
                        id={`animation-cost-${i}`}
                        placeholder='32'
                        value={store.projectData.lowerGrounds[i].returnRoi}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'lowerGrounds',
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
                  <Col md={3} className='mb-md-0 mb-1'>
                      <Label className='form-label' for={`animation-cost-${i}`}>
                        Shop/Sq.Ft
                      </Label>
                      <Input
                          className= 'form-control payment__input'
                          type='number'
                        id={`animation-cost-${i}`}
                        placeholder='32'
                        value={store.projectData.lowerGrounds[i].priceShops}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'lowerGrounds',
                              i,
                              'priceShops'
                            ])
                          )
                          dispatch(
                            updateFloorInnerProperties([
                            
                              ((store.projectData.lowerGrounds[i]?.shops[i]?.length * store.projectData.lowerGrounds[i]?.shops[i]?.width) * (e.target.value)),
                              'lowerGrounds',
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
                        length
                      </Label>
                      <Input
                          className= 'form-control payment__input'
                          type='number'
                        id={`animation-cost-${i}`}
                        placeholder='32'
                        value={store.projectData.lowerGrounds[i].length}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'lowerGrounds',
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
                          className= 'form-control payment__input'
                                                    type='number'
                        id={`animation-quantity-${i}`}
                        placeholder='1'
                        value={store.projectData.lowerGrounds[i].width}
                        onChange={e => {
                          dispatch(
                            updateFloorProperties([
                              e.target.value,
                              'lowerGrounds',
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
                        (store.projectData.lowerGrounds[i].width === '0' || store.projectData.lowerGrounds[i].width === '') && (store.projectData.lowerGrounds[i].length === '0' || store.projectData.lowerGrounds[i].length === '') ? (
                          <Input
                          className= 'form-control payment__input'
                          type='text'
                          placeholder='Enter Area'
                          id={`animation-price-${i}`}
                          onChange={e => {
                            dispatch(
                              updateFloorProperties([
                                e.target.value,
                                'lowerGrounds',
                                i,
                                'area'
                              ])
                            )
                          }}
                          value={store.projectData.lowerGrounds[i].area}
                        />
                        ) : (
                          <div>
                          {store.projectData.lowerGrounds[i].width * store.projectData.lowerGrounds[i].length}
                          </div>
                        )
                      }
                    </Col>

                    {/* <Col md={2}>
                      <div>
                      <Col md={2} className='mb-md-0 mb-1'>
                      <Label
                        className='form-label'
                        for={`animation-quantity-${i}`}
                      >
                        Car Parkings
                      </Label>
                      <Input
                        type='text'
                        // id={`animation-quantity-${i}`}
                        placeholder='1'
                        value={store.projectData.lowerGrounds[i].carParkings}
                        onChange={e => {
                          dispatch(
                            updateNoOfFloorslowerGrounds([
                              e.target.value,
                              'lowerGrounds',
                              i,
                              'carParkings'
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
                        type='text'
                        // id={`animation-quantity-${i}`}
                        placeholder='1'
                        value={store.projectData.lowerGrounds[i].bikeParkings}
                        onChange={e => {
                          dispatch(
                            updateNoOfFloorslowerGrounds([
                              e.target.value,
                              'lowerGrounds',
                              i,
                              'bikeParkings'
                            ])
                          )
                        }}
                      />
                    </Col> */}
                    <Col md={2}>
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
                                'lowerGrounds',
                                'Parking'
                              ])
                            )
                          }}
                          value={store.projectData.lowerGrounds[i].noParkings}
                          downHandler={<Minus />}
                          id='min-max-number-input'
                          readonly='true'
                        />
                    </Col>

                    <Col sm={12}>
                      <hr />
                    </Col>
                  </Row>

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
                                'lowerGrounds',
                                'Shop'
                              ])
                            )

                          }}
                          value={store.projectData.lowerGrounds[i].noShops}
                          id='min-max-number-input'
                          readonly='true'
                        />
                      
                      </div>
                    </Col>

                    <NoShops i={i}/>
                    <ShopsPayment i={i} />
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
