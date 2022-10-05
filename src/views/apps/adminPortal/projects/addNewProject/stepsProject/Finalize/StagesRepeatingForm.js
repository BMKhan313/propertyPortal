// ** React Imports
import { useState, useContext, useEffect } from 'react'

// ** Icons Imports
import { X, Plus, Minus, Check } from 'react-feather'

// ** Custom Components
import Repeater from '@components/repeater'

import Flatpickr from 'react-flatpickr'
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
  AccordionBody
} from 'reactstrap'

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
// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import {
  updateMasterDetails,
  updateNoOfFloorsBasements,
  updateNoOfStages,
  updateStageProperties
} from '../../../../redux/addNewProject/store'

// ** Axios Imports
import Axios from 'axios'

// Base URL
import baseURL from '../../../../../../../baseURL/baseURL'

const StagesRepeatingForm = () => {
  // ** Store Variables
  const dispatch = useDispatch()
  const store = useSelector(state => state.addNewProject)

  // ** State

  const [count, setCount] = useState(0)
  const [processStages, setProcessStages] = useState(0)

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

  useEffect(() => {
    Axios.get(`${baseURL}/getProcessStage`)
      .then(response => {
        const rec = response.data.allstages.map(({ id, name }) => ({
          id,
          value: id,
          label: name
        }))
        setProcessStages(rec)
        //   setLoading(false)
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <Card>
      <CardHeader>
        <h4 className='card-title'>
          Stages Covered:
          {store.projectData.masterDetails.countStages}
        </h4>
      </CardHeader>

      <CardBody>
        {/* <Repeater count={count}> */}
        <Repeater count={store.projectData.masterDetails.countStages}>
          {/* {i => ( */}
          {i => (
            <Form key={i}>
              <AccordionItem>
                <AccordionHeader targetId={`${i}`}>
                  Stage {i + 1}:{i === 0 && <>Legal Documentation</>}
                  {i === 1 && <>Land Acquisition</>}
                  {i === 2 && <>Excavation</>}
                  {i === 3 && <>Raft</>}
                  {i === 4 && <>Slabs</>}
                  {i === 5 && <>Grey Structure</>}
                  {i === 6 && <>Air Conditioning</>}
                  {i === 7 && <>Finishing etc</>}
                </AccordionHeader>
                <AccordionBody accordionId={`${i}`}>
                  <Row className='justify-content-between align-items-center'>
                    <Col md={6} className='mb-md-0 mb-1'>
                      <Label className='form-label' for={`animation-cost-${i}`}>
                        Details
                      </Label>
                      <Input
                        type='text'
                        id={`animation-cost-${i}`}
                        placeholder='Some more info'
                        value={store.projectData.stages[i].desc}
                        onChange={e => {
                          dispatch(
                            updateStageProperties([
                              e.target.value,
                              'stages',
                              i,
                              'desc'
                            ])
                          )
                        }}
                      />
                    </Col>
                    <Col md='2' className='mb-1'>
                      <Label className='form-label' for={`stageDate${i}`}>
                        Date
                      </Label>
                      <Flatpickr
                        className='form-control'
                        options={{
                          dateFormat: 'd-M-Y'
                        }}
                        value={store.projectData.stages[i].stageDate}
                        onChange={(date, dateStr) => {
                          dispatch(
                            updateStageProperties([
                              dateFormat(dateStr, 'yyyy-MM-dd'),
                              'stages',
                              i,
                              'stageDate'
                            ])
                          )
                        }}
                        // onChange={date => setPicker(date)}
                        id='stageDate'
                      />
                    </Col>
                  </Row>
                  <Row className='justify-content-between align-items-center'>
                    <Col md={5} className='mb-md-0 mb-1'>
                      <Label
                        className='form-label'
                        for={`exampleMultipleFileBrowser${i}`}
                      >
                        Multiple files input
                      </Label>
                      <Input
                        type='file'
                        id={`exampleMultipleFileBrowser${i}`}
                        name='MultipleFiles'
                        multiple
                      />
                    </Col>
                  </Row>
                  {/*  Delete Button */}
                  {store.projectData.masterDetails.countStages - 1 === i && (
                    <Row className='justify-content-between align-items-center'>
                      <Col md={2}>
                        <Button
                          color='danger'
                          className='text-nowrap px-1'
                          // onClick={e => deleteForm(e, i)}
                          onClick={() => {
                            dispatch(
                              updateNoOfStages([
                                1,
                                'countStages',
                                'stages',
                                true
                              ])
                            )
                          }}
                          outline
                        >
                          <X size={14} className='me-50' />
                          <span>Delete</span>
                        </Button>
                      </Col>
                    </Row>
                  )}
                </AccordionBody>
              </AccordionItem>
            </Form>
          )}
        </Repeater>
        {/* Add Button */}
        {store.projectData.masterDetails.countStages <= 7 && (
          <Button
            className='btn-icon'
            color='primary'
            onClick={() => {
              dispatch(updateNoOfStages([1, 'countStages', 'stages', false]))
            }}
          >
            <Plus size={14} />
            <span className='align-middle ms-25'>Next Stage </span>
          </Button>
        )}
      </CardBody>
    </Card>
  )
}

export default StagesRepeatingForm
