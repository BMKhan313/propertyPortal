// ** React Imports
import { Fragment, useContext, useState } from 'react'

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'
import { ArrowLeft, ArrowRight, Check, X } from 'react-feather'
import Select from 'react-select'
import StagesRepeatingForm from './Finalize//StagesRepeatingForm'
import { toast } from 'react-toastify'

// ** Utils
import { selectThemeColors } from '@utils'
// ** Reactstrap Imports
import {
  InputGroup,
  InputGroupText,
  Label,
  Row,
  Col,
  Button,
  Form,
  Input,
  FormFeedback,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Accordion
} from 'reactstrap'

// Base URL
import baseURL from '../../../../../../baseURL/baseURL'

import Flatpickr from 'react-flatpickr'
// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import {
  updateMasterDetails,
  updateNoOfFloorsBasements,
  updateNoOfStages,
  updateProjectDetails
} from '../../../redux/addNewProject/store'
const defaultValues = {
  city: '',
  pincode: '',
  address: '',
  landmark: ''
}

const Finalize = ({ stepper }) => {
  // ** Store Variables
  const dispatch = useDispatch()
  const store = useSelector(state => state.addNewProject)

  const [open, setOpen] = useState('')

  const toggle = id => {
    open === id ? setOpen() : setOpen(id)
  }

  // ** Hooks

  //a simple date formatting function
  const dateFormat = (inputDate, format) => {
    //parse the input date
    const date = new Date(inputDate)

    //extract the parts of the date
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    //replace the month
    format = format.replace('MM', month.toString().padStart(2, '0'))

    //replace the year
    if (format.indexOf('yyyy') > -1) {
      format = format.replace('yyyy', year.toString())
    } else if (format.indexOf('yy') > -1) {
      format = format.replace('yy', year.toString().substr(2, 2))
    }

    //replace the day
    format = format.replace('dd', day.toString().padStart(2, '0'))

    return format
  }

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const addProject = data => {
    if (data === null) {
      toast('Fill out fields correctly!')
    } else {
      fetch(`${baseURL}/postProject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(store.projectData)
      })
        .then(res => res.json())
        .then(data => {
          console.log('rrrrr', JSON.stringify(store.projectData))
          if (data.Message === 'Record Stored.') {
            toast(` saved ! ${data.Message}`)
          } else {
            // toast('Project did not add, Please try again ', data)
            toast(`Error ${data.Message}`)
          }
        })
        .catch(err => {
          console.log('ERROR :2:3:4: ', err)
        })
    }
    setTimeout(() => {
      // setIsButtonDisabled(false)
    }, 3000)
  }

  const onSubmit = data => {
    addProject(data)
    if (Object.values(data).every(field => field.length > 0)) {
      stepper.next()
    } else {
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

  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Finalize Project</h5>
        <small>Enter final Details.</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md='6' className='mb-1'>
            <Fragment>
              <Label className='form-label' for='startDate'>
                Project Start Date
              </Label>
              <Flatpickr
                className='form-control'
                options={{
                  dateFormat: 'd-M-Y'
                }}
                value={store.projectData.project_details.startDate}
                onChange={(date, dateStr) => {
                  console.log(dateFormat(dateStr, 'yyyy-MM-dd'))
                  dispatch(updateProjectDetails([dateStr, 'startDate']))
                }}
                // onChange={date => setPicker(date)}
                id='startDate'
              />
            </Fragment>
          </Col>
          <Col md='6' className='mb-1'>
            <Fragment>
              <Label className='form-label' for='completionDate'>
                Project Completion Date (Tentative)
              </Label>
              <Flatpickr
                className='form-control'
                options={{
                  minDate: store.projectData.project_details.startDate,
                  dateFormat: 'd-M-Y'
                }}
                value={store.projectData.project_details.completionDate}
                onChange={(date, dateStr) => {
                  dispatch(updateProjectDetails([dateStr, 'completionDate']))
                }}
                id='completionDate'
              />
            </Fragment>
          </Col>
        </Row>
        {/*  */}

        {/*  */}
        {/*  */}

        {/*  */}

        <div className='content-header'>
          <h5 className='mb-0'>Project Stages</h5>
          <small>Provide details about Project Stages .</small>
        </div>

        <Accordion className='accordion-border' open={open} toggle={toggle}>
          <StagesRepeatingForm />
        </Accordion>

        <div className='d-flex justify-content-between'>
          <Button
            type='button'
            color='primary'
            className='btn-prev'
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
          <Button type='submit' color='success' className='btn-submit'>
            Submit
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default Finalize
