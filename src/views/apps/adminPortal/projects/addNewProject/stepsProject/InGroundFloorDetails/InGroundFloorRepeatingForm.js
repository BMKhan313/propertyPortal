// ** React Imports
import { useState, useContext } from 'react'

// ** Icons Imports
import { X, Plus, Minus, Check } from 'react-feather'

// ** Custom Components
import Repeater from '@components/repeater'

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
  AccordionBody
} from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import {
  updateMasterDetails,
  updateNoOfFloorsBasements
} from '../../../../redux/addNewProject/store'

import InputNumber from 'rc-input-number'

import NoParkings from './NoParkings'

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

  return (
    <Card>
      <CardHeader>
        <h4 className='card-title'>
          Total Ground Floors: {store.projectData.masterDetails.countGroundFloors}
        </h4>
      </CardHeader>

      <CardBody>
        <Repeater
          count={
            store.projectData.masterDetails.countGroundFloors
          }
        >
          {i => (
            <Form key={i}>
              <AccordionItem>
                <AccordionHeader targetId={`${i}`}>
                  {/* {i === 0 && <>Lower Ground {i}</>}
                  {i === 1 && <> Ground Floor {i}</>}
                  {i > 1 && <>Floor {i - 1}</>} */}
                  Ground Floor {i + 1}
                </AccordionHeader>
                <AccordionBody accordionId={`${i}`}>
                  {/* noParkings Starts ******************************************************************************/}
                  <NoParkings i={i} />
                  {/* noParkings Ends ********************************************************************************/}

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
      </CardBody>
    </Card>
  )
}

export default RepeatingForm
