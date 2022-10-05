// ** React Imports
import { Fragment, useContext, useState, useRef } from 'react'
import InputNumber from 'rc-input-number'
// ** Third Party Components
import { ArrowLeft, ArrowRight, X, Plus, Minus, ArrowDown } from 'react-feather'
import { PDFExport, savePDF } from "@progress/kendo-react-pdf"
import './pdf.css'
import axios from 'axios'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateMasterDetails,
  updateProjectDetails,
  updateNoOfFloorsBasements
} from '../../../redux/addNewProject/store'

// ** Reactstrap Imports
import {
  Label,
  Row,
  Col,
  Button,
  Form,
  Input,
  FormFeedback,
  Card,
  CardHeader,
  CardBody,
  CardText,
  CardTitle,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Table
} from 'reactstrap'

import Repeater from '@components/repeater'
import RepeatingForm from '../FormRepeater/RepeatingFormAnimated'
import FloorRepeatingForm from './FloorDetails/FloorRepeatingForm'
import BasementRepeatingForm from './BasementDetails copy/BasementRepeatingForm'
import MezzanineRepeatingForm from './MezzanineDetails/MezzanineRepeatingForm'
import LowerGroundRepeatingForm from './LowerGroundDetails/LowerGroundRepeatingForm'
import GroundFloorRepeatingForm from './GroundFloorDetails/GroundFloorRepeatingForm'

// ** Third Party Components

import { SlideDown } from 'react-slidedown'

const defaultValues = {
  google: '',
  twitter: '',
  facebook: '',
  linkedin: ''
}

const FloorDetails = ({ stepper }) => {
  // ** Hooks

  const [openBasement, setOpenBasement] = useState('')
  const [openLowerGround, setOpenLowerGround] = useState('')
  const [openMezzanine, setOpenMezzanine] = useState('')
  const [openGroundFloor, setOpenGroundFloor] = useState('')
  const [openFloor, setOpenFloor] = useState('')
  const store = useSelector(state => state.addNewProject)
  const [showPdf, setShowPdf] = useState(false)

  const togglePdf = () => {
    if (showPdf) {
      setShowPdf(false)
    } else {
      setShowPdf(true)
    }
  }

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
  
  const toggleBasement = id => {
    openBasement === id ? setOpenBasement() : setOpenBasement(id)
  }

  const toggleLowerGround = id => {
    openLowerGround === id ? setOpenLowerGround() : setOpenLowerGround(id)
  }
  const toggleMezzanine = id => {
    openMezzanine === id ? setOpenMezzanine() : setOpenMezzanine(id)
  }

  const toggleGroundFloor = id => {
    openGroundFloor === id ? setOpenGroundFloor() : setOpenGroundFloor(id)
  }

  const toggleFloor = id => {
    openFloor === id ? setOpenFloor() : setOpenFloor(id)
  }

  const deleteForm = e => {
    e.preventDefault()
    const slideDownWrapper = e.target.closest('.react-slidedown')
    // form = e.target.closest('form')
    if (slideDownWrapper) {
      slideDownWrapper.remove()
    } else {
      // form.remove()
    }
  }

  const {
    // control,
    setError,
    handleSubmit
    // formState: { errors }
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

  const submitData = () => {
    axios.post('http://thesfb.live/PropertyPortalBackend/api/postProject', JSON.stringify(store.projectData))
    .then(function (response) {
      console.log("api response", response)
    })
    .catch(function (error) {
      console.log("api error", error)
    })
    console.log("New DATA: ", JSON.stringify(store.projectData))
    
  }

  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Floor Details </h5>
        <small>Enter Your Floor Details.</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md='6' className='mb-1'></Col>
          <Col md='6' className='mb-1'></Col>
        </Row>

        {/* Basement Start ************************************************************************/}
        <Accordion
          className='accordion-border'
          open={openBasement}
          toggle={toggleBasement}
        >
          <BasementRepeatingForm />
        </Accordion>
        {/* Basement Ends ************************************************************************/}

        {/* Lower Ground Start ************************************************************************/}
        <Accordion 
        className='accordion-border' 
        open={openLowerGround} 
        toggle={toggleLowerGround}
        >
          <LowerGroundRepeatingForm />
        </Accordion>
        {/* Lower Ground Ends ************************************************************************/}

        {/* Mezzanine Start ************************************************************************/}
        <Accordion
          className='accordion-border'
          open={openMezzanine}
          toggle={toggleMezzanine}
        >
          <MezzanineRepeatingForm />
        </Accordion>
        {/* Mezzanine Ends ************************************************************************/}


        {/* Ground Floor Start ************************************************************************/}
        <Accordion 
        className='accordion-border' 
        open={openGroundFloor}
        toggle={toggleGroundFloor}
        >
          <GroundFloorRepeatingForm />
        </Accordion>
        {/* Ground Floor Ends ************************************************************************/}

        {/* Floors Start ************************************************************************/}
        <Accordion 
        className='accordion-border' 
        open={openFloor} 
        toggle={toggleFloor}
        >
          <FloorRepeatingForm />
        </Accordion>
        {/* Floors Ends ************************************************************************/}

        <div className='d-flex justify-content-between'>
          <Button
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
          <Button onClick={submitData} color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>Next</span>
            <ArrowRight
              size={14}
              className='align-middle ms-sm-25 ms-0'
            ></ArrowRight>
          </Button>
        </div>
      </Form>

      {/* <div className='d-flex justify-content-end mt-2'>
      <Button
          onClick={exportPDFWithMethod}
          type='button'
            color='primary'
            outline
            style={{
              width: 'max-content'
            }}
        >
          Export PDF
        </Button>
      </div> */}
      <div className='d-flex justify-content-end mt-1'>
      </div>

    </Fragment>
  )
}

export default FloorDetails
