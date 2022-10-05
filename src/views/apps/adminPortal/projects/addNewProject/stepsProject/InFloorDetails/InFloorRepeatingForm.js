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
import NoShops from './NoShops'
import NoHotelSuites from './NoHotelSuites'
import NoApartments from './NoApartments'
import NoCorporateOffices from './NoCorporateOffices'
import NoParkings from './NoParkings'
import NoServiceApartments from './NoServiceApartments'
import NoFoodCourts from './NoFoodCourts'

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
          Total Floors: {store.projectData.masterDetails.countFloors}
        </h4>
      </CardHeader>

      <CardBody>
        <Repeater
          count={
            store.projectData.masterDetails.countFloors
            //+ store.projectData.masterDetails.countBasements
          }
        >
          {i => (
            <Form key={i}>
              <AccordionItem>
                <AccordionHeader targetId={`${i}`}>
                  
                  Floor {i + 1}
                </AccordionHeader>
                <AccordionBody accordionId={`${i}`}>
                  {/* noParkings Starts ******************************************************************************/}
                  <NoParkings i={i} />
                  {/* noParkings Ends ********************************************************************************/}

                  {/* noParkings Starts ******************************************************************************/}
                  <NoFoodCourts i={i} />
                  {/* noParkings Ends ********************************************************************************/}

                  {/* shops Starts ******************************************************************************/}
                  <NoShops i={i} />
                  {/* shops Ends ********************************************************************************/}

                  {/* noApartments Starts ******************************************************************************/}
                  <NoApartments i={i} />
                  {/* noApartments Ends ********************************************************************************/}
                  {/* noCorporateOffices Starts ******************************************************************************/}
                  <NoCorporateOffices i={i} />
                  {/* noCorporateOffices Ends ********************************************************************************/}
                  {/* noServiceApartments Starts ******************************************************************************/}
                  <NoServiceApartments i={i} />
                  {/* noServiceApartments Ends ********************************************************************************/}
                  {/* noHotelSuites Starts ******************************************************************************/}
                  <NoHotelSuites i={i} />
                  {/* noHotelSuites Ends ********************************************************************************/}

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
