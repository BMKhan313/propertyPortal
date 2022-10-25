// ** React Imports

import { useContext, Fragment, useState, useEffect, useRef } from 'react'

// ** Axios Imports
import Axios from 'axios'

// Base URL
import baseURL from '../../../../../../baseURL/baseURL'

// ** Third Party Components
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight, Plus, Minus, Check, X } from 'react-feather'
import { Link, useHistory } from 'react-router-dom'
import {toast} from 'react-toastify'
import { PDFExport, savePDF } from "@progress/kendo-react-pdf"

// ** Utils
import { selectThemeColors } from '@utils'

import classnames from 'classnames'

import InputNumber from 'rc-input-number'
// ** Reactstrap Importsimport { Row, Col, Card, CardBody, CardHeader, CardTitle } from 'reactstrap'
import {
  Label,
  Row,
  Col,
  Button,
  Form,
  Input,
  FormFeedback,
  CardBody,
  Card,
  CardHeader,
  CardText,
  CardTitle,
  Modal, ModalHeader, ModalBody, ModalFooter

} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import {
  updateMasterDetails,
  updateProjectDetails,
  updateNoOfFloorsBasements
} from '../../../redux/addNewProject/store'

//context api

const defaultValues = {
  lastName: '',
  firstName: '',
  projectVision: '',
  google: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  youtube: '',
  instagram: ''
}
import FileUploaderMultiple from '../../../components/forms/FileUploader/FileUploaderMultiple'
import RepeatingFormAnimated from '../FormRepeater/RepeatingFormAnimated'
import ProjectMedia from './ProjectInfo/ProjectMedia/index.js'

import ProjectMap from './ProjectInfo/Maps/new/index4'
import ProjectMap2 from './ProjectInfo/Maps/simpleMap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import InputCbAndRadio from '../../../components/forms/RadioBox/InputGroupCbAndRadio'

// Baaz Muhammad Khan
// October, 05, 2022, 05:35 PM
// MUI
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
//
// import
// inputGroupBasic,
// inputGroupSizes,
// inputGroupMerged,
// inputGroupCBRadio
// inputGroupButtons,
// inputGroupDropdowns
// '../RadioBox/InputGroupSourceCode'

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

const PersonalInfo = ({ stepper }) => {
  // ** Store Variables
  const dispatch = useDispatch()
  const store = useSelector(state => state.addNewProject)
  const history = useHistory();

  // ** Hooks
  // const [checkBox, setCheckBox] = useState(false)
  const [province, setProvince] = useState([])
  const [cityOptions, setCityOptions] = useState([])
  const [areaOptions, setAreaOptions] = useState([])
  const [developerOptions, setDeveloperOptions] = useState([])
  const [projectType, setProjectType] = useState([])
  const [projectCategory, setProjectCategory] = useState([])
  const [amenitiesOptions, setAmenitiesOptions] = useState([])
  const [sideOpenOptions, setSideOpenOptions] = useState([])
  const [ApprovingAutorities, setApprovingAutorities] = useState([])
  const [projectStage, setProjectStage] = useState([])
  const [modal, setModal] = useState(false)
  const pdfExportComponent = useRef(null)
  const container = useRef(null)

  const exportPDFWithMethod = () => {
    const element = container.current || document.body
    savePDF(element, {
      paperSize: "a4",
      margin: 40,
      fileName: `Report for ${new Date().getFullYear()}`
    })
  }

  const toggle = () => {
    setModal(!modal)
  }

  const validateField = (e) => {
   if (e.target.value > 100) {
    toast.error("Value should not be greater than 100")
    
   }
  }
  //  const check = () => {
  //   console.log("my checkbox.....",checkBox)
  //  }
  const firstpageData = () => {
    
    // console.log('Form Data: ', JSON.stringify(myData))
    console.log('Images', store.projectData.masterDetails.projectImages)
  }


  // const projectStage = [
  //   { value: '1', label: ' New Launched ' },
  //   { value: '2', label: ' on-Going ' },
  //   { value: '3', label: ' Completed ' }
  // ]

  // const ApprovingAutorities = [
  //   { value: '1', label: 'CDA ' },
  //   { value: '2', label: 'CDA2' },
  //   { value: '3', label: 'CDA3' },
  //   { value: '4', label: 'CDA4' }
  // ]

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      stepper.next()
    } else {
      stepper.next()
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual',
            message: `Please enter a valid ${key}`
          })
        }
      }
    }
  }

  const GetCity = e => {
    Axios.get(`${baseURL}/showcity?province_id=${e}`)
      .then(response => {
        const rec = response.data.City.map(({ id, name }) => ({
          id,
          value: id,
          label: name
        }))
        setCityOptions(rec)
        //   setLoading(false)
      })
      .catch(err => console.log(err))
  }
  const GetArea = e => {
    Axios.get(`${baseURL}/showArea?city_id=${e}`)
      .then(response => {
        const rec = response.data.Area.map(({ id, name }) => ({
          id,
          value: id,
          label: name
        }))
        setAreaOptions(rec)
        //   setLoading(false)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    Axios.get(`${baseURL}/getProvince`)
      .then(response => {
        const rec = response.data.AllProvince.map(({ id, name }) => ({
          id,
          value: id,
          label: name
        }))
        setProvince(rec)
        console.log("Province: ", rec)
      })
      .catch(err => console.log(err))
    Axios.get(`${baseURL}/getDeveloper`)
      .then(response => {
        const rec = response.data.alldevelopers.map(({ id, first_name }) => ({
          id,
          value: id,
          label: first_name
        }))
        setDeveloperOptions(rec)
        //   setLoading(false)
      })
      .catch(err => console.log(err))
    Axios.get(`${baseURL}/getProjectType`)
      .then(response => {
        const rec = response.data.type.map(({ id, type }) => ({
          id,
          value: id,
          label: type
        }))
        setProjectType(rec)
        //   setLoading(false)
      })
      .catch(err => console.log(err))
    Axios.get(`${baseURL}/getProjectCategory`)
      .then(response => {
        const rec = response.data.Category.map(({ id, category }) => ({
          id,
          value: id,
          label: category
        }))
        setProjectCategory(rec)
        //   setLoading(false)
      })
      .catch(err => console.log(err))
    Axios.get(`${baseURL}/getAmenitie`)
      .then(response => {
        const rec = response.data.Amenitie.map(({ id, name }) => ({
          id,
          value: id,
          label: name
        }))
        setAmenitiesOptions(rec)
        //   setLoading(false)
      })
      .catch(err => console.log(err))
    Axios.get(`${baseURL}/getSideopenOptionController`)
      .then(response => {
        const rec = response.data.Sides.map(({ id, opensides }) => ({
          id,
          value: id,
          label: opensides
        }))
        setSideOpenOptions(rec)
        //   setLoading(false)
      })
      .catch(err => console.log(err))
    Axios.get(`${baseURL}/getApprovingAuthoritie`)
      .then(response => {
        const rec = response.data.allauthorities.map(
          ({ id, authority_name }) => ({
            id,
            value: id,
            label: authority_name
          })
        )
        setApprovingAutorities(rec)
        //   setLoading(false)
      })
      .catch(err => console.log(err))
    Axios.get(`${baseURL}/getStage`)
      .then(response => {
        const rec = response.data.stages.map(({ id, name }) => ({
          id,
          value: id,
          label: name
        }))
        setProjectStage(rec)
        //   setLoading(false)
      })
      .catch(err => console.log(err))

    if (
      store.projectData.masterDetails.provinceId !== null &&
      store.projectData.masterDetails.provinceId !== undefined &&
      store.projectData.masterDetails.provinceId > 0
    ) {
      GetCity(store.projectData.masterDetails.provinceId)
    }
    if (
      store.projectData.masterDetails.cityId !== null &&
      store.projectData.masterDetails.cityId !== undefined &&
      store.projectData.masterDetails.cityId > 0
    ) {
      GetArea(store.projectData.masterDetails.cityId)
    }
  }, [])


  return (
    <Fragment>
      <div className='content-header' style={{display: 'flex',justifyContent: 'space-between'}}>
       <div>
       <h5 className='mb-0'>Project Details</h5>
        <small>Enter Your Project Details.</small>
       </div>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md='8' className='mb-1'>
            <Label className='form-label' for='firstName'>
              Project Title
            </Label>
            <Controller
              id='project_title'
              name='project_title'
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <Input
                  placeholder='Project Title'
                  onChange={e => {
                    dispatch(
                      updateProjectDetails([e.target.value, 'project_title'])
                    )

                    e.stopPropagation()
                  }}
                  value={store.projectData.project_details.project_title}
                  invalid={errors.firstName && true}
                  {...field}
                />
              )}
            />
            {errors.firstName && (
              <FormFeedback>{errors.firstName.message}</FormFeedback>
            )}
          </Col>
        </Row>
    
        <Row>
          
          <Col md={2} className='mb-md-0 mb-1'>
            {' '}
            <div>
              <Label className='form-label' for='min-max-number-input1'>
                Basements
              </Label>

              <InputNumber
                min={0}
                // max={10}
                defaultValue={0}
                downHandler={<Minus />}
                onChange={e => {
                  dispatch(
                    updateNoOfFloorsBasements([
                      e,
                      'countBasements',
                      'basements',
                      'Basement'
                    ])
                  )
                }}
                value={store.projectData.masterDetails.countBasements}
                id='min-max-number-input1'
                readonly='false'
                upHandler={<Plus />}
              />
            </div>
          </Col>

          
          <Col md={2} className='mb-md-0 mb-1'>
            {' '}
            <div>
              <Label className='form-label' for='min-max-number-input2'>
                Lower Grounds
              </Label>
              <InputNumber
                min={0}
                // max={10}

                defaultValue={0}
                upHandler={<Plus />}
                downHandler={<Minus />}
                onChange={e => {
                  dispatch(
                    updateNoOfFloorsBasements([
                      e,
                      'countLowerGrounds',
                      'lowerGrounds',
                      'LowerGrounds'
                    ])
                  )
                }}
                value={store.projectData.masterDetails.countLowerGrounds}
                id='min-max-number-input2'
                readonly='true'
              />
            </div>
          </Col>

          <Col md={2} className='mb-md-0 mb-1'>
            {' '}
            <div>
              <Label className='form-label' for='min-max-number-input3'>
              Mezzanine
              </Label>
              <InputNumber
                min={0}
                // max={10}

                defaultValue={0}
                upHandler={<Plus />}
                downHandler={<Minus />}
                onChange={e => {
                  dispatch(
                    updateNoOfFloorsBasements([
                      e,
                      'countMezzanine',
                      'mezzanine',
                      'Mezzanine'
                    ])
                  )
                }}
                value={store.projectData.masterDetails.countMezzanine}
                id='min-max-number-input3'
                readonly='true'
              />
            </div>
          </Col>

          <Col md={2} className='mb-md-0 mb-1'>
            {' '}
            <div>
              <Label className='form-label' for='min-max-number-input4'>
              Ground Floors
              </Label>
              <InputNumber
                min={0}
                // max={10}

                defaultValue={0}
                upHandler={<Plus />}
                downHandler={<Minus />}
                onChange={e => {
                  dispatch(
                    updateNoOfFloorsBasements([
                      e,
                      'countGroundFloors',
                      'groundFloors',
                      'GroundFloors'
                    ])
                  )
                }}
                value={store.projectData.masterDetails.countGroundFloors}
                id='min-max-number-input4'
                readonly='true'
              />
            </div>
          </Col>

          <Col md={2} className='mb-md-0 mb-1'>
            {' '}
            <div>
              <Label className='form-label' for='min-max-number-input5'>
              Floors
              </Label>
              <InputNumber
                min={0}
                // max={10}

                defaultValue={0}
                upHandler={<Plus />}
                downHandler={<Minus />}
                onChange={e => {
                  dispatch(
                    updateNoOfFloorsBasements([
                      e,
                      'countFloors',
                      'floors',
                      'Floor'
                    ])
                  )
                }}
                value={store.projectData.masterDetails.countFloors}
                id='min-max-number-input5'
                readonly='true'
              />
            </div>
          </Col>                    
        </Row>  

        <Row className='mt-2'>
        <h5 className='mb-0'>Project Location</h5>
        <Col md={6} className='mb-md-0 mb-1'>
            <Label className='form-label' for='projectCategory'>
              Province
            </Label>
            
                <Controller
                name='Province'
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
                // province.length === 0 ? (
                //   <Input
                //   placeholder='Enter Province'
                //   invalid={errors.projectVision && true}
                //   {...field}
                //   onChange={e => {
                //     dispatch(updateMasterDetails([e.target.value, 'text_pro']))
                //     e.stopPropagation()
                //   }}
                //   value={store.projectData.masterDetails.text_pro}
                // />
                // ) : (
                  <Select
                  id='Province'
                  isClearable={true}
                  classNamePrefix='select'
                  options={province}
                  theme={selectThemeColors}
                  onChange={val => {
                    onChange(val ? val.value : 0)
                    GetCity(val ? val.id : 0)
                    dispatch(
                      updateMasterDetails([val ? val.id : 0, 'provinceId'])
                    )
                    dispatch(
                      updateMasterDetails([val ? val.label : 0, 'provinceName'])
                    )
                  }}
                  value={province.find(
                    c => c.value === store.projectData.masterDetails.provinceId
                  )}
                  {...field}
                  />
                // )
                )}
                />
                
          </Col>

          <Col md='6' className='mb-1'>
            <Label className='form-label' for='city'>
              City
            </Label>
            <Controller
              name='cityOptions'
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
                cityOptions.length === 0 ? (
                  <Input
                  placeholder='Enter City'
                  invalid={errors.projectVision && true}
                  {...field}
                  onChange={e => {
                    dispatch(updateMasterDetails([e.target.value, 'text_city']))
                    e.stopPropagation()
                  }}
                  value={store.projectData.masterDetails.text_city}
                />
                ) : (
                  <Select
                  id='cityOptions'
                  isClearable={true}
                  classNamePrefix='select'
                  options={cityOptions}
                  theme={selectThemeColors}
                  onChange={val => {
                    onChange(val ? val.value : 0)
                    GetArea(val ? val.id : 0)
                    dispatch(updateMasterDetails([val ? val.id : 0, 'areaId']))
                    dispatch(updateMasterDetails([val ? val.label : 0, 'cityName']))
                  }}
                  value={cityOptions.find(
                    c => c.value === store.projectData.masterDetails.areaId
                  )}
                  {...field}
                />
                )
              )}
            />
          </Col>
          </Row>

        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='area'>
              Area
            </Label>
            <Controller
              name='areaOptions'
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
                areaOptions.length === 0 ? (
                  <Input
                  placeholder='Area'
                  invalid={errors.projectVision && true}
                  {...field}
                  onChange={e => {
                    dispatch(updateMasterDetails([e.target.value, 'text_area']))
                    e.stopPropagation()
                  }}
                  value={store.projectData.masterDetails.text_area}
                />
                ) : (
                  <Select
                  id='areaOptions'
                  isClearable={true}
                  classNamePrefix='select'
                  options={areaOptions}
                  theme={selectThemeColors}
                  onChange={val => {
                    onChange(val ? val.value : 0)
                    dispatch(updateMasterDetails([val ? val.id : 0, 'areaId']))
                    dispatch(updateMasterDetails([val ? val.label : 0, 'areaName']))
                  }}
                  value={areaOptions.find(
                    c => c.value === store.projectData.masterDetails.areaId
                  )}
                  {...field}
                />
                )
              )}
            />
            
          </Col>

          <Col md='6' className='mb-1'>
          <Label className='form-label' for='textAddress'>
              Full Addrees
            </Label>
            <Controller
              id='projectVision'
              name='projectVision'
              control={control}
              render={({ field }) => (
                <Input
                  placeholder=' Text Address'
                  invalid={errors.projectVision && true}
                  {...field}
                  onChange={e => {
                    dispatch(updateProjectDetails([e.target.value, 'text_loc']))
                    e.stopPropagation()
                  }}
                  value={store.projectData.project_details.text_loc}
                />
              )}
            />
            {errors.projectVision && (
              <FormFeedback>{errors.projectVision.message}</FormFeedback>
            )}
          </Col>

        </Row>

        <Row>
          <Col md='6' className='mb-1'>
          <Label className='form-label' for='textAddress'>
              Land Mark
            </Label>
            <Controller
              id='land_mark'
              name='land_mark'
              control={control}
              render={({ field }) => (
                <Input
                  placeholder='land_mark'
                  invalid={errors.projectVision && true}
                  {...field}
                  onChange={e => {
                    dispatch(
                      updateProjectDetails([e.target.value, 'land_mark'])
                    )
                    e.stopPropagation()
                  }}
                  value={store.projectData.project_details.land_mark}
                />
              )}
            />
            {errors.projectVision && (
              <FormFeedback>{errors.projectVision.message}</FormFeedback>
            )}
          </Col>

          <Col md='6' style={{display: 'flex', alignItems: 'center'}}>
            <Link to='/maps'>
              Click here to see the map
            </Link>
          </Col>
        </Row>

        <Row>
        <Col md='6' className='mb-1'>
        <h5 className='mb-1'>Developer</h5>

            <Controller
              name='developer'
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
                <Select
                  id='developer'
                  isClearable={true}
                  classNamePrefix='select'
                  options={developerOptions}
                  theme={selectThemeColors}
                  onChange={val => {
                    onChange(val ? val.value : 0)
                    dispatch(
                      updateMasterDetails([val ? val.id : 0, 'developerId'])
                    )
                    dispatch(
                      updateMasterDetails([val ? val.label : 0, 'developerName'])
                    )
                  }}
                  value={developerOptions.find(
                    c => c.value === store.projectData.masterDetails.developerId
                  )}
                  {...field}
                />
              )}
            />
          </Col>


          {
            developerOptions.length === 0 ? (
              <Col md='1' className='mt-2'>
            <Button
            color='primary'
            onClick={toggle}
            >
              + Add 
            </Button>
          </Col>
            ) : ''
          }

        <Modal isOpen={modal} toggle={toggle}
        style={{
          marginTop: 50
        }}
        >
          <ModalHeader toggle={toggle}>Add Developer</ModalHeader>
          <ModalBody>
            <Label className='form-label' for='textAddress'>
            <h5>Name</h5>
            </Label>
            <Input type='text' placeholder='Name' />

            <Row className='mt-2'>
              <Col className='col-md-6 h3'>
              <Label className='form-label' for='textAddress'>
              <h5>Company Name</h5>
              </Label>
              <Input type='text' placeholder='Enter Facebook Link' />
              </Col>

              <Col className='col-md-6 h3'>
              <Label className='form-label' for='textAddress'>
              <h5>Owner Name</h5>
              </Label>
              <Input type='text' placeholder='Enter Facebook Link' />
              </Col>
            </Row>

            <Label className='form-label mt-1' for='textAddress'>
            <h5>Address</h5>
            </Label>
            <Input type='text' placeholder='Enter Address' />

            <Label className='form-label mt-1' for='textAddress'>
            <h5>Contact Number</h5>
            </Label>
            <Input type='text' placeholder='Enter Phone Number' />

            <Label className='form-label mt-1' for='textAddress'>
            <h5>Brief Description</h5>
            </Label>
            <Input type='textarea' placeholder='Enter Address' />

            <Label className='form-label mt-1' for='textAddress'>
              <h5>Social Links</h5>
            </Label>

            <Row>
              <Col className='col-md-6 h3'>
              <Input type='text' placeholder='Enter Facebook Link' />
              </Col>

              <Col className='col-md-6'>
              <Input type='text' placeholder='Enter YouTube Link' />
              </Col>

            </Row>

            <Row>
              <Col className='col-md-6 h3'>
              <Input type='text' placeholder='Enter Intsagram Link' />
              </Col>

              <Col className='col-md-6'>
              <Input type='text' placeholder='Enter LinkedIn Link' />
              </Col>

            </Row>

            <Row>
              <Col className='col-md-6 h3'>
              <Input type='text' placeholder='Enter Website Link' />
              </Col>

            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>Submit</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
          
        </Row>

        <Row>
          <Col md='4' className='mb-1'>
            <Label className='form-label' for='projectVision'>
              Current demand Market
            </Label>
            <Controller
              id='projectVision'
              name='projectVision'
              control={control}
              render={({ field }) => (
                <Input
                  placeholder='Current demand Market'
                  type='text'
                  invalid={errors.projectVision && true}
                  {...field}
                  onChange={e => {
                    dispatch(
                      updateProjectDetails([
                        e.target.value,
                        'currentDemandMarket'
                      ])
                    )
                    e.stopPropagation()
                  }}
                  value={store.projectData.project_details.currentDemandMarket}
                />
              )}
            />
            {errors.projectVision && (
              <FormFeedback>{errors.projectVision.message}</FormFeedback>
            )}
          </Col>
          <Col md='4' className='mb-1'>
            <Label className='form-label' for='projectExpectedReturns'>
              Project Expected Returns % (1 - 100)
            </Label>
            <Controller
              id='projectExpectedReturns'
              name='projectExpectedReturns'
              control={control}
              render={({ field }) => (
                <Input
                  placeholder='% (1-100)'
                  type='text'
                  invalid={errors.projectVision && true}
                  {...field}
                  onChange={e => {
                    dispatch(
                      updateProjectDetails([
                        e.target.value,
                        'projectExpectedReturns'
                      ])
                    )
                    if (e.target.value > 100) {
                      dispatch(
                        updateProjectDetails([
                          e.target.value.slice(0, -1),
                          'projectExpectedReturns'
                        ])
                      )
                    }
                    e.stopPropagation()
                    validateField(e)
                  }}
                  value={
                    store.projectData.project_details.projectExpectedReturns
                  }
                />
              )}
            />
            {errors.projectVision && (
              <FormFeedback>{errors.projectVision.message}</FormFeedback>
            )}
          </Col>
          <Col md='4' className='mb-1'>
            <Label className='form-label' for='projectMonthlyReturns'>
              Project Monthly Returns % (1 - 100)
            </Label>
            <Controller
              id='projectMonthlyReturns'
              name='projectMonthlyReturns'
              control={control}
              render={({ field }) => (
                <Input
                  placeholder='% (1-100)'
                  type='text'
                  invalid={errors.projectVision && true}
                  {...field}
                  onChange={e => {
                    dispatch(
                      updateProjectDetails([
                        e.target.value,
                        'projectMonthlyReturns'
                      ])
                    )
                    if (e.target.value > 100) {
                      dispatch(
                        updateProjectDetails([
                          e.target.value.slice(0, -1),
                          'projectMonthlyReturns'
                        ])
                      )
                    }
                    e.stopPropagation()
                    validateField(e)
                  }}
                  value={
                    store.projectData.project_details.projectMonthlyReturns
                  }
                />
              )}
            />
            {errors.projectVision && (
              <FormFeedback>
                {errors.projectMonthlyReturns.message}
              </FormFeedback>
            )}
          </Col>
        </Row>
        <Row>
          <Col md='2' className='mb-1'>
            <Label className='form-label' for='noOfLifts'>
              No of Lifts
            </Label>
            <Controller
              id='noOfLifts'
              name='noOfLifts'
              control={control}
              render={({ field }) => (
                <Input
                  placeholder=' Current demand Market'
                  type='text'
                  invalid={errors.projectVision && true}
                  {...field}
                  onChange={e => {
                    dispatch(
                      updateProjectDetails([e.target.value, 'total_lifts'])
                    )
                    e.stopPropagation()
                  }}
                  value={store.projectData.project_details.total_lifts}
                />
              )}
            />
            {errors.projectVision && (
              <FormFeedback>{errors.noOfLifts.message}</FormFeedback>
            )}
          </Col>
          <Col md='2' className='mb-1'>
            <Label className='form-label' for='total_escalators'>
              No. of Escalators
            </Label>
            <Controller
              id='total_escalators'
              name='total_escalators'
              control={control}
              render={({ field }) => (
                <Input
                  placeholder=''
                  type='text'
                  invalid={errors.projectVision && true}
                  {...field}
                  onChange={e => {
                    dispatch(
                      updateProjectDetails([e.target.value, 'total_escalators'])
                    )
                    if (e.target.value > 100) {
                      dispatch(
                        updateProjectDetails([
                          e.target.value.slice(0, -1),
                          'total_escalators'
                        ])
                      )
                    }
                    e.stopPropagation()
                    validateField(e)
                  }}
                  value={store.projectData.project_details.total_escalators}
                />
              )}
            />
            {errors.projectVision && (
              <FormFeedback>{errors.projectVision.message}</FormFeedback>
            )}
          </Col>
          <Col md='2' className='mb-1'>
            <Label className='form-label' for='total_emergency_gates'>
              Emergency Exits
            </Label>
            <Controller
              id='total_emergency_gates'
              name='total_emergency_gates'
              control={control}
              render={({ field }) => (
                <Input
                  placeholder=''
                  type='text'
                  invalid={errors.projectVision && true}
                  {...field}
                  onChange={e => {
                    dispatch(
                      updateProjectDetails([
                        e.target.value,
                        'total_emergency_gates'
                      ])
                    )
                    if (e.target.value > 100) {
                      dispatch(
                        updateProjectDetails([
                          e.target.value.slice(0, -1),
                          'total_emergency_gates'
                        ])
                      )
                    }
                    e.stopPropagation()
                    validateField(e)
                  }}
                  value={
                    store.projectData.project_details.total_emergency_gates
                  }
                />
              )}
            />
            {errors.projectVision && (
              <FormFeedback>
                {errors.total_emergency_gates.message}
              </FormFeedback>
            )}
          </Col>
          <Col md='2' className='mb-1'>
            <Label className='form-label' for='noOfEntranceGate'>
              No. of Entrace Gate
            </Label>
            <Controller
              id='total_entrances'
              name='total_entrances'
              control={control}
              render={({ field }) => (
                <Input
                  placeholder=''
                  type='text'
                  invalid={errors.projectVision && true}
                  {...field}
                  onChange={e => {
                    dispatch(
                      updateProjectDetails([e.target.value, 'total_entrances'])
                    )
                    if (e.target.value > 100) {
                      dispatch(
                        updateProjectDetails([
                          e.target.value.slice(0, -1),
                          'total_entrances'
                        ])
                      )
                    }
                    validateField(e)
                    e.stopPropagation()
                  }}
                  value={store.projectData.project_details.total_entrances}
                />
              )}
            />
            {errors.projectVision && (
              <FormFeedback>{errors.noOfEntranceGate.message}</FormFeedback>
            )}
          </Col>
          <Col md='2' className='mb-1'>
            <Label className='form-label' for='total_exits'>
              No. of Exit Gates
            </Label>
            <Controller
              id='total_exits'
              name='total_exits'
              control={control}
              render={({ field }) => (
                <Input
                  placeholder=''
                  type='text'
                  invalid={errors.projectVision && true}
                  {...field}
                  onChange={e => {
                    dispatch(
                      updateProjectDetails([e.target.value, 'total_exits'])
                    )
                    if (e.target.value > 100) {
                      dispatch(
                        updateProjectDetails([
                          e.target.value.slice(0, -1),
                          'total_exits'
                        ])
                      )
                    }
                    e.stopPropagation()
                    validateField(e)
                  }}
                  value={store.projectData.project_details.total_exits}
                />
              )}
            />
            {errors.projectVision && (
              <FormFeedback>{errors.total_exits.message}</FormFeedback>
            )}
          </Col>
        </Row>

        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='projectType'>
              Project Type
            </Label>
            <Controller
              name='projectType'
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
                <Select
                  id='projectType'
                  isClearable={true}
                  classNamePrefix='select'
                  options={projectType}
                  theme={selectThemeColors}
                  onChange={val => {
                    onChange(val ? val.value : 0)
                    dispatch(
                      updateMasterDetails([val ? val.id : 0, 'projectTypeId'])
                    )
                    dispatch(
                      updateMasterDetails([val ? val.label : 0, 'projectTypeName'])
                    )
                  }}
                  value={projectType.find(
                    c =>
                      c.value === store.projectData.masterDetails.projectTypeId
                  )}
                  {...field}
                />
              )}
            />
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='projectCategory'>
              Project Category
            </Label>
            <Controller
              name='projectCategory'
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
                <Select
                  id='projectCategory'
                  isClearable={true}
                  classNamePrefix='select'
                  options={projectCategory}
                  theme={selectThemeColors}
                  onChange={val => {
                    onChange(val ? val.value : 0)
                    dispatch(
                      updateMasterDetails([
                        val ? val.id : 0,
                        'projectCategoryId'
                      ])
                    )
                    dispatch(
                      updateMasterDetails([
                        val ? val.label : 0,
                        'projectCategoryName'
                      ])
                    )
                  }}
                  value={projectCategory.find(
                    c =>
                      c.value ===
                      store.projectData.masterDetails.projectCategoryId
                  )}
                  {...field}
                />
              )}
            />
            
          </Col>
        </Row>

        <Row>
          <Col className='mb-md-0 mb-1' md='6' sm='12'>
            <Card>
              <CardHeader>
                <CardTitle> Status</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  {/* <div className='demo-inline-spacing'> */}
                  <Col className='mb-md-0 mb-1' md='6' sm='12'>
                    <div className='d-flex flex-column'>
                      <Label
                        for='icon-primary'
                        className='form-check-label mb-50'
                      >
                        Approved
                      </Label>
                      <div className='form-switch form-check-primary'>
                        <Input
                          type='switch'
                          id='icon-primary2'
                          name='icon-primary2'
                          checked={
                            store.projectData.masterDetails.approvalStatus
                          }
                          onChange={e => {
                            dispatch(
                              updateMasterDetails([
                                e.target.checked,
                                'approvalStatus'
                              ])
                            )
                          }}
                        />
                        <CustomLabel htmlFor='icon-primary2' />
                      </div>
                    </div>
                  </Col>
                  <Col className='mb-md-0 mb-1' md='6' sm='12'>
                    <div className='d-flex flex-column'>
                      <Label
                        for='icon-primary'
                        className='form-check-label mb-50'
                      >
                        Legal
                      </Label>
                      <div className='form-switch form-check-primary'>
                        <Input
                          type='switch'
                          id='icon-primary3'
                          name='icon-primary3'
                          checked={store.projectData.masterDetails.legalStatus}
                          onChange={e => {
                            dispatch(
                              updateMasterDetails([
                                e.target.checked,
                                'legalStatus'
                              ])
                            )
                          }}
                        />
                        <CustomLabel htmlFor='icon-primary3' />
                      </div>
                    </div>
                  </Col>

                  {/* </div> */}
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col className='mb-md-0 mb-1' md='6' sm='12'>
            <Card>
              <CardHeader>
                <CardTitle></CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  {/* <div className='demo-inline-spacing'> */}
                  <Col md='6' className='mb-1'>
                    <Label className='form-label' for='projectStage'>
                      Project Stage
                    </Label>
                    <Controller
                      name='projectStage'
                      control={control}
                      render={({ field: { onChange, value, ...field } }) => (
                        // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
                        <Select
                          id='projectStage'
                          isClearable={true}
                          classNamePrefix='select'
                          options={projectStage}
                          theme={selectThemeColors}
                          onChange={val => {
                            onChange(val ? val.value : 0)
                            dispatch(
                              updateMasterDetails([
                                val ? val.id : 0,
                                'projectStageId'
                              ])
                            )
                            dispatch(
                              updateMasterDetails([
                                val ? val.label : 0,
                                'projectStageName'
                              ])
                            )
                          }}
                          value={projectStage.find(
                            c =>
                              c.value ===
                              store.projectData.masterDetails.projectStageId
                          )}
                          {...field}
                        />
                      )}
                    />
                  </Col>
                  <Col className='mb-md-0 mb-1' md='6' sm='12'>
                    <Label className='form-label' for='ApprovingAutorities'>
                      Approving Authority
                    </Label>

                    <Controller
                      name='ApprovingAutorities'
                      control={control}
                      render={({ field: { onChange, value, ...field } }) => (
                        // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
                        <Select
                          id='ApprovingAutorities'
                          isClearable={true}
                          classNamePrefix='select'
                          options={ApprovingAutorities}
                          theme={selectThemeColors}
                          onChange={val => {
                            onChange(val ? val.value : 0)
                            dispatch(
                              updateMasterDetails([
                                val ? val.id : 0,
                                'projectApprovingAuthorityId'
                              ])
                            )
                            dispatch(
                              updateMasterDetails([
                                val ? val.label : 'None',
                                'projectApprovingAuthorityName'
                              ])
                            )
                          }}
                          value={ApprovingAutorities.find(
                            c =>
                              c.value ===
                              store.projectData.masterDetails
                                .projectApprovingAuthorityId
                          )}
                          {...field}
                        />
                      )}
                    />
                  </Col>

                  {/* </div> */}
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <div className='content-header'>
          <h5 className='mb-0'>Project Brief Description</h5>
          <small>Enter Your Project Description.</small>
        </div>

        <Row>
          <Col md='6' className='mb-1'>
            <CardTitle tag='h4'> Project Vision</CardTitle>

            <div className='form-floating mt-2'>
              <Input
                type='textarea'
                name='text'
                id='floating-textarea'
                placeholder='Floating Label'
                style={{ minHeight: '100px' }}
                onChange={e => {
                  dispatch(updateProjectDetails([e.target.value, 'vision']))
                  e.stopPropagation()
                }}
                value={store.projectData.project_details.vision}
              />
              <Label className='form-label' for='floating-textarea'>
                Project Vision
              </Label>
            </div>
          </Col>

          <Col md='6' className='mb-1'>
            <CardTitle tag='h4'> Project Future Prospect</CardTitle>

            <div className='form-floating mt-2'>
              <Input
                type='textarea'
                name='text'
                id='projectVision'
                placeholder='Floating Label'
                style={{ minHeight: '100px' }}
                onChange={e => {
                  dispatch(
                    updateProjectDetails([e.target.value, 'future_prospect'])
                  )
                  e.stopPropagation()
                }}
                value={store.projectData.project_details.future_prospect}
              />
              <Label className='form-label' for='floating-textarea'>
                Project Future Prospect
              </Label>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md='6' className='mb-1'>
            <CardTitle tag='h4'>Key Features</CardTitle>

            <div className='form-floating mt-2'>
              <Input
                type='textarea'
                name='keyFeatures'
                id='keyFeatures'
                placeholder='Floating Label'
                style={{ minHeight: '100px' }}
                onChange={e => {
                  dispatch(
                    updateProjectDetails([e.target.value, 'key_features'])
                  )
                  e.stopPropagation()
                }}
                value={store.projectData.project_details.key_features}
              />
              <Label className='form-label' for='floating-textarea'>
                keyFeatures
              </Label>
            </div>
          </Col>
          
          <Col md='6' className='mb-1'></Col>
        </Row>

        <Row>
          <Col md='12' className='mb-1'>
            <Label className='form-label' for='amenities'>
              Project Amenities
            </Label>

            <Controller
              name='amenitiesOptions'
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
                <Select
                  id='amenitiesOptions'
                  isClearable={true}
                  isMulti
                  classNamePrefix='select'
                  options={amenitiesOptions}
                  theme={selectThemeColors}
                  onChange={val => {
                    onChange(val ? val : [])
                    dispatch(
                      updateMasterDetails([val ? val : [], 'projectAmenities'])
                    )
                  }}
                  value={store.projectData.masterDetails.projectAmenities}
                  //  value={amenitiesOptions.find(
                  //    c =>
                  //      c.value ===
                  //      store.projectData.masterDetails.projectAmenities
                  //  )}
                  {...field}
                />
              )}
            />
          </Col>
          
        </Row>

        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='sideOpenOptions'>
              Sides Open
            </Label>

            <Controller
              name='sideOpenOptions'
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
                <Select
                  id='sideOpenOptions'
                  isClearable={true}
                  classNamePrefix='select'
                  options={sideOpenOptions}
                  theme={selectThemeColors}
                  onChange={val => {
                    onChange(val ? val.value : 0)

                    dispatch(
                      updateMasterDetails([
                        val ? val.id : 0,
                        'sideOpenOptionsId'
                      ])
                    )

                    dispatch(
                      updateMasterDetails([
                        val ? val.label : '',
                        'sideOpenOptionsName'
                      ])
                    )
                  }}
                  value={sideOpenOptions.find(
                    c =>
                      c.value ===
                      store.projectData.masterDetails.sideOpenOptionsId
                  )}
                  {...field}
                />
              )}
            />
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='firstName'>
              Connecting road width(ft)
            </Label>
            <Controller
              id='ConnectingRoadWidth'
              name='ConnectingRoadWidth'
              control={control}
              render={({ field }) => (
                <Input
                  placeholder='In Feet'
                  invalid={errors.ConnectingRoadWidth && true}
                  type='text'
                  {...field}
                  onChange={e => {
                    dispatch(
                      updateProjectDetails([e.target.value, 'con_road_width'])
                    )

                    e.stopPropagation()
                  }}
                  value={store.projectData.project_details.con_road_width}
                />
              )}
            />
            {errors.firstName && (
              <FormFeedback>{errors.firstName.message}</FormFeedback>
            )}
          </Col>
        </Row>

        {/* <RepeatingFormAnimated /> */}

        <div className='content-header'>
          <h5 className='mb-0'>Social Links</h5>
          <small>Enter Your Social Links...</small>
        </div>

        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='websiteLink'>
              Website Link
            </Label>
            <Controller
              id='websiteLink'
              name='websiteLink'
              control={control}
              render={({ field }) => (
                <Input
                  placeholder='https://twitter.com/johndoe'
                  invalid={errors.twitter && true}
                  {...field}
                  onChange={e => {
                    dispatch(
                      updateMasterDetails([e.target.value, 'websiteLink'])
                    )

                    e.stopPropagation()
                  }}
                  value={store.projectData.masterDetails.websiteLink}
                />
              )}
            />
            {errors.websiteLink && (
              <FormFeedback>{errors.websiteLink.message}</FormFeedback>
            )}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='facebook'>
              Facebook
            </Label>
            <Controller
              id='facebook'
              name='facebook'
              control={control}
              render={({ field }) => (
                <Input
                  placeholder='https://facebook.com/johndoe'
                  invalid={errors.facebook && true}
                  {...field}
                  onChange={e => {
                    dispatch(
                      updateMasterDetails([e.target.value, 'facebookLink'])
                    )

                    e.stopPropagation()
                  }}
                  value={store.projectData.masterDetails.facebookLink}
                />
              )}
            />
            {errors.facebook && (
              <FormFeedback>{errors.facebook.message}</FormFeedback>
            )}
          </Col>
        </Row>

        <Row>
        <Col md='6' className='mb-1'>
            <Label className='form-label' for='websiteLink'>
              YouTube Link
            </Label>
            <Controller
              id='youtubeLink'
              name='youtubeLink'
              control={control}
              render={({ field }) => (
                <Input
                  placeholder='https://youtube.com/johndoe'
                  invalid={errors.twitter && true}
                  {...field}
                  onChange={e => {
                    dispatch(
                      updateMasterDetails([e.target.value, 'youtubeLink'])
                    )

                    e.stopPropagation()
                  }}
                  value={store.projectData.masterDetails.youtubeLink}
                />
              )}
            />
            {errors.websiteLink && (
              <FormFeedback>{errors.websiteLink.message}</FormFeedback>
            )}
          </Col>

          <Col md='6' className='mb-1'>
            <Label className='form-label' for='websiteLink'>
              Instagram Link
            </Label>
            <Controller
              id='instagramLink'
              name='instagramLink'
              control={control}
              render={({ field }) => (
                <Input
                  placeholder='https://instagram.com/johndoe'
                  invalid={errors.twitter && true}
                  {...field}
                  onChange={e => {
                    dispatch(
                      updateMasterDetails([e.target.value, 'instagramLink'])
                    )

                    e.stopPropagation()
                  }}
                  value={store.projectData.masterDetails.instagramLink}
                />
              )}
            />
            {errors.websiteLink && (
              <FormFeedback>{errors.websiteLink.message}</FormFeedback>
            )}
          </Col>
        </Row>
      

        <div className='content-header'>
          <h5 className='mb-0'>Project Media</h5>
          <small>Upload Media for the Project .</small>
        </div>

        {/* <FileUploaderMultiple title='Pictures' />
      
        <FileUploaderMultiple title='Videos' />
        <FileUploaderMultiple title='Project Plan PDF' /> */}
        <ProjectMedia />

        {/* <Row>
          <Col md='12' className='mb-1'>
            <Label className='form-label' for='projectVision'>
              Location on Map
            </Label>
            <ProjectMap />
          </Col>
        </Row> */}
        {/* <Row>
          <Col md='12' className='mb-1'>
            <Label className='form-label' for='projectVision'>
              Location on
            </Label>
            <ProjectMap2 />
          </Col>
        </Row> */}

        {/* End Form **************************************************************************************/}


        <div className='d-flex justify-content-between'>
          <Button
            type='button'
            color='primary'
            className='btn-prev'
            outline
            disabled
            onClick={() => stepper.previous()}
          >
            <ArrowLeft
              size={14}
              className='align-middle me-sm-25 me-0'
            ></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>
              Previous
            </span>
          </Button>
          <Button  color='primary' className='btn-next'
          
          onClick={firstpageData}>
            <span className='align-middle d-sm-inline-block d-none'>Next</span>
            <ArrowRight
              size={14}
              className='align-middle ms-sm-25 ms-0'
            ></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default PersonalInfo