

// ** React Imports
import { useState, useContext, useEffect } from 'react'

// ** Custom Components
import Repeater from '@components/repeater'


// import Parkings from './Parkings'
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

//Baaz Muhammad
//06/10/2022
import GroundFloorBasicRepeatingForm from './GroundFloorBasicDetails/GroundFloorBasicRepeatingForm'
import BasementBasicRepeatingForm from './BasementBasicDetails/BasementBasicRepeatingForm'
import MezzanineBasicRepeatingForm from './MezzanineBasicDetails/MezzanineBasicRepeatingForm'
import FloorBasicRepeatingForm from './FloorBasicDetails/FloorBasicRepeatingForm'
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
import LowerGroundBasicRepeatingForm from './LowerGroundBasicDetails/LowerGroundBasicRepeatingForm'

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

const BasicDetails = ({ stepper }) => {
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

  useEffect(() => {
    Axios.get(`${baseURL}/getProjectType`)
      .then(response => {
        const rec = response.data.type.map(({ id, type }) => ({
          id,
          value: id,
          label: type
        }))
        setFloorType(rec)
        setFloorName(rec)
        //   setLoading(false)
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <Card >
      <CardHeader>
        <h4 className='card-title'>
          {/* Total Basements: {store.projectData.masterDetails.countBasements} */}
          Fill the Form
        </h4>
      </CardHeader>

      <CardBody>

        <Repeater
          count={1}
        >

          {i => (
            <Form >

              <AccordionItem className='justify-content-between align-items-center'>
                <AccordionHeader targetId={`${i}`}>
                  All Floors
                </AccordionHeader>
                <AccordionBody accordionId={`${i}`}>
                  <Row >
                    {/* <Row >
                      <Col md={1} className="payment__header">Name #</Col>
                      <Col md={2} className="payment__header">Floor Type</Col>
                      <Col md={1} className="payment__header">No. of Units</Col>
                      <Col md={2} className="payment__header">Price/sq.ft</Col>
                      <Col md={2} className="payment__header">Min. Area</Col>
                      <Col md={2} className="payment__header">Max. Area</Col>
                      <Col md={1} className="payment__header"> Min. Price</Col>
                      <Col md={1} className="payment__header">Max. Price</Col>
                    </Row> */}
                    {/* Basements */}
                    <BasementBasicRepeatingForm />

                    {/* Lower Ground */}
                    <LowerGroundBasicRepeatingForm />

                    {/* groundfoor */}
                    <GroundFloorBasicRepeatingForm />

                    {/* mezzanine */}
                    <MezzanineBasicRepeatingForm />

                    {/* floor  */}
                    <FloorBasicRepeatingForm />

                  </Row>
                </AccordionBody>
              </AccordionItem>

            </Form>
          )
          }
        </Repeater>

      </CardBody>
    </Card>
  )
}

export default BasicDetails

