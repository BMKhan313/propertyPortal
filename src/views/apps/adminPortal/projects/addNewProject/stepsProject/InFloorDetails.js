// ** React Imports
import { Fragment, useContext, useState } from 'react'
import InputNumber from 'rc-input-number'
// ** Third Party Components
import { ArrowLeft, ArrowRight, X, Plus, Minus } from 'react-feather'

import { useForm, Controller } from 'react-hook-form'

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
  AccordionItem
} from 'reactstrap'

import Repeater from '@components/repeater'
// import RepeatingForm from '../FormRepeater/RepeatingFormAnimated'
import InFloorRepeatingForm from './InFloorDetails/InFloorRepeatingForm'
import InBasementRepeatingForm from './InBasementDetails.js/InBasementRepeatingForm'
import InLowerGroundRepeatingForm from './InLowerGroundDetails/InLowerGroundRepeatingForm'
import InMezzanineRepeatingForm from './InMezzanine/InMezzanineRepeatingForm'
import InGroundFloorRepeatingForm from './InGroundFloorDetails/InGroundFloorRepeatingForm'

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

  const [open, setOpen] = useState('')
  const [openBasement, setOpenBasement] = useState('')
  const [openInLowerground, setOpenInLowerGround] = useState('')
  const [openInMezzanine, setOpenInMezzanine] = useState('')
  const [openInGroundFloor, setOpenInGroundFloor] = useState('')

  const toggle = id => {
    open === id ? setOpen() : setOpen(id)
  }

  const toggleBasement = id => {
    openBasement === id ? setOpenBasement() : setOpenBasement(id)
  }

  const toggleInLowerGround = id => {
    openInLowerground === id ? setOpenInLowerGround() : setOpenInLowerGround(id)
  }

  const toggleInMezzanine = id => {
    openInMezzanine === id ? setOpenInMezzanine() : setOpenInMezzanine(id)
  }

  const toggleInGroundFloor = id => {
    openInGroundFloor === id ? setOpenInGroundFloor() : setOpenInGroundFloor(id)
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
          <InBasementRepeatingForm />
        </Accordion>
        {/* Basement Ends ************************************************************************/}

        {/* Lower Ground Start ************************************************************************/}
        <Accordion 
        className='accordion-border' 
        open={openInLowerground} 
        toggle={toggleInLowerGround}>
          <InLowerGroundRepeatingForm />
        </Accordion>
        {/* LowerGround Ends ************************************************************************/}

        {/* Mezzanine Start ************************************************************************/}
        <Accordion
          className='accordion-border'
          open={openInMezzanine}
          toggle={toggleInMezzanine}
        >
          <InMezzanineRepeatingForm />
        </Accordion>
        {/* Mezzanine Ends ************************************************************************/}

        {/* Ground Floors Start ************************************************************************/}
        <Accordion
          className='accordion-border'
          open={openInGroundFloor}
          toggle={toggleInGroundFloor}
        >
          <InGroundFloorRepeatingForm />
        </Accordion>
        {/* Ground Floor Ends *********************************************************************** */}

        {/* Floors Start ************************************************************************/}
        <Accordion className='accordion-border' open={open} toggle={toggle}>
          <InFloorRepeatingForm />
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
          <Button type='submit' color='primary' className='btn-next'>
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

export default FloorDetails
