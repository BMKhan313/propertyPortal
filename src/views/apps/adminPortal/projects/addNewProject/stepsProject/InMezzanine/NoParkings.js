// ** React Imports
import { Fragment, useState, useContext } from 'react'

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs'

import Repeater from '@components/repeater'
import { X, Plus, Minus, Check } from 'react-feather'
// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardTitle,
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
  InputGroupText
} from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { updateFloorInnerProperties } from '../../../../redux/addNewProject/store'

import InputNumber from 'rc-input-number'

const noParkings = props => {
  // ** Store Variables
  const dispatch = useDispatch()
  const store = useSelector(state => state.addNewProject)

  const [open, setOpen] = useState('')
  const toggleopen = id => {
    open === id ? setOpen() : setOpen(id)
  }

  const CalculateQM_MonthlyPer = (e, i, ii) => {
    dispatch(
      updateFloorInnerProperties([
        Math.max(0, Math.min(100, Number(e.target.value))),

        'basements',
        i,
        'parkings',
        ii,
        'qmMonthlyPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        100 -
          store.projectData.basements[props.i].parkings[ii]
            .downPaymentPercentage -
          Math.max(0, Math.min(100, Number(e.target.value))),
        'basements',
        i,
        'parkings',
        ii,
        'qmQuarterPercentage'
      ])
    )
  }

  const CalculateQM_QuarterPer = (e, i, ii) => {
    dispatch(
      updateFloorInnerProperties([
        Math.max(0, Math.min(100, Number(e.target.value))),

        'basements',
        i,
        'parkings',
        ii,
        'qmQuarterPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        100 -
          store.projectData.basements[props.i].parkings[ii]
            .downPaymentPercentage -
          Math.max(0, Math.min(100, Number(e.target.value))),
        'basements',
        i,
        'parkings',
        ii,
        'qmMonthlyPercentage'
      ])
    )
  }
  // AM
  const CalculateAM_MonthlyPer = (e, i, ii) => {
    dispatch(
      updateFloorInnerProperties([
        Math.max(0, Math.min(100, Number(e.target.value))),

        'basements',
        i,
        'parkings',
        ii,
        'amMonthlyPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        100 -
          store.projectData.basements[props.i].parkings[ii]
            .downPaymentPercentage -
          Math.max(0, Math.min(100, Number(e.target.value))),
        'basements',
        i,
        'parkings',
        ii,
        'amBiAnuallyPercentage'
      ])
    )
  }

  const CalculateAM_BiAnuallyPer = (e, i, ii) => {
    dispatch(
      updateFloorInnerProperties([
        Math.max(0, Math.min(100, Number(e.target.value))),

        'basements',
        i,
        'parkings',
        ii,
        'amBiAnuallyPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        100 -
          store.projectData.basements[props.i].parkings[ii]
            .downPaymentPercentage -
          Math.max(0, Math.min(100, Number(e.target.value))),
        'basements',
        i,
        'parkings',
        ii,
        'amMonthlyPercentage'
      ])
    )
  }
  //Down Payement handle change
  const handleChangeDownPaymentPercent = (e, i, ii) => {
    dispatch(
      updateFloorInnerProperties([
        Math.max(0, Math.min(100, Number(e.target.value))),

        'basements',
        i,
        'parkings',
        ii,
        'downPaymentPercentage'
      ])
    )

    dispatch(
      updateFloorInnerProperties([
        (100 - Math.max(0, Math.min(100, Number(e.target.value)))) / 2,
        'basements',
        props.i,
        'parkings',
        ii,
        'qmMonthlyPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        (100 - Math.max(0, Math.min(100, Number(e.target.value)))) / 2,
        'basements',
        props.i,
        'parkings',
        ii,
        'qmQuarterPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        (100 - Math.max(0, Math.min(100, Number(e.target.value)))) / 2,
        'basements',
        props.i,
        'parkings',
        ii,
        'amMonthlyPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        (100 - Math.max(0, Math.min(100, Number(e.target.value)))) / 2,
        'basements',
        props.i,
        'parkings',
        ii,
        'amBiAnuallyPercentage'
      ])
    )
  }
  return (
    <Row className='justify-content-between align-items-center'>
      {store.projectData.mezzanine[props.i].noParkings > 0 && (
        <Accordion className='accordion-border' open={open} toggle={toggleopen}>
          <Card>
            <CardHeader>
              <h4 className='card-title'>
                Total parkings:{' '}
                {store.projectData.mezzanine[props.i].noParkings}:{' '}
              </h4>
            </CardHeader>
            <CardBody>
              <Repeater count={store.projectData.mezzanine[props.i].noParkings}>
                {ii => (
                  <Form key={ii}>
                    <AccordionItem>
                      <AccordionHeader targetId={`${ii}`}>
                        Parking {ii + 1}
                      </AccordionHeader>

                      <AccordionBody accordionId={`${ii}`}>
                        <Row className='justify-content-between align-items-center'>
                          <Col md={2} className='mb-md-0 mb-1'>
                            <Label
                              className='form-label'
                              for={`Parking-Label-${ii}`}
                            >
                              Parking {ii + 1} Label
                            </Label>
                            <InputGroup className='mt-2'>
                              <InputGroupText>Parking-</InputGroupText>
                              <Input
                                type='text'
                                id={`Parking-Label-${ii}`}
                                placeholder='Parking #'
                                value={store.projectData.mezzanine[
                                  props.i
                                ].parkings[ii].label.replace('Parking-', '')}
                                onChange={e => {
                                  dispatch(
                                    updateFloorInnerProperties([
                                      `Parking-${e.target.value}`,
                                      'mezzanine',
                                      props.i,
                                      'parkings',
                                      ii,
                                      'label'
                                    ])
                                  )
                                }}
                              />
                            </InputGroup>
                          </Col>
                          <Col md={2} className='mb-md-0 mb-1'>
                            <Label
                              className='form-label'
                              for={`Parking-length-${ii}`}
                            >
                              length
                            </Label>
                            <Input
                              type='number'
                              id={`Parking-length-${ii}`}
                              placeholder='32'
                              value={
                                store.projectData.mezzanine[props.i].parkings[
                                  ii
                                ].length
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'mezzanine',
                                    props.i,
                                    'parkings',
                                    ii,
                                    'length'
                                  ])
                                )
                              }}
                            />
                          </Col>
                          <Col md={2} className='mb-md-0 mb-1'>
                            <Label
                              className='form-label'
                              for={`Parking-width-${ii}`}
                            >
                              width
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`Parking-width-${ii}`}
                              placeholder='1'
                              value={
                                store.projectData.mezzanine[props.i].parkings[
                                  ii
                                ].width
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'mezzanine',
                                    props.i,
                                    'parkings',
                                    ii,
                                    'width'
                                  ])
                                )
                              }}
                            />
                          </Col>
                          <Col md={3} className='mb-md-0 mb-1'>
                            <Label
                              className='form-label'
                              for={`Parking-TotalCoveredArea-${ii}`}
                            >
                              Total Covered Area
                            </Label>

                            <InputGroup>
                              <InputGroupText>Sq.Ft</InputGroupText>
                              <Input
                                readonly
                                className='form-control'
                                value={
                                  store.projectData.mezzanine[props.i].parkings[
                                    ii
                                  ].width *
                                  store.projectData.mezzanine[props.i].parkings[
                                    ii
                                  ].length
                                }
                                placeholder='0'
                                id={`Parking-TotalCoveredArea-${ii}`}
                              />
                            </InputGroup>
                            {/* fffffffffffffffffffff */}
                          </Col>
                          <Col md={3} className='mb-md-0 mb-1'>
                            <Label for={`Parking-TotalPrice-${ii}`}>
                              {' '}
                              Total Price
                            </Label>
                            <InputGroup>
                              <InputGroupText>PKR</InputGroupText>
                              <Input
                                // readOnly='true'
                                readonly
                                className='form-control'
                                value={
                                  store.projectData.mezzanine[props.i]
                                    .priceShops *
                                  store.projectData.mezzanine[props.i].parkings[
                                    ii
                                  ].width *
                                  store.projectData.mezzanine[props.i].parkings[
                                    ii
                                  ].length
                                }
                                placeholder='0'
                                id={`Parking-TotalPrice-${ii}`}
                              />
                            </InputGroup>
                          </Col>
                        </Row>
                        <Row className='justify-content-between align-items-center'>
                          <Col sm={12}>
                            <hr />
                          </Col>
                        </Row>

                        <Row className='justify-content-between align-items-center'>
                          <Col md={4} className='mb-md-0 mb-1'>
                            <CardHeader className='align-items-center'>
                              <CardTitle>
                                {' '}
                                Total parkings (
                                {parseFloat(
                                  store.projectData.mezzanine[props.i].parkings[
                                    ii
                                  ].bikeParkings
                                ) +
                                  parseFloat(
                                    store.projectData.mezzanine[props.i]
                                      .parkings[ii].carParkings
                                  )}{' '}
                                ){' '}
                              </CardTitle>
                            </CardHeader>
                          </Col>

                          <Col md={4} className='mb-md-0 mb-1'>
                            <InputGroup>
                              <InputGroupText>Bikes</InputGroupText>
                              <Input
                                className='form-control'
                                value={
                                  store.projectData.mezzanine[props.i].parkings[
                                    ii
                                  ].bikeParkings
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorInnerProperties([
                                      e.target.value,
                                      'mezzanine',
                                      props.i,
                                      'parkings',
                                      ii,
                                      'bikeParkings'
                                    ])
                                  )
                                }}
                                placeholder='0'
                                id={`Parking-Bikes-${ii}`}
                              />
                            </InputGroup>
                          </Col>
                          <Col md={4} className='mb-md-0 mb-1'>
                            <InputGroup>
                              <InputGroupText>Cars</InputGroupText>
                              <Input
                                className='form-control'
                                value={
                                  store.projectData.mezzanine[props.i].parkings[
                                    ii
                                  ].carParkings
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorInnerProperties([
                                      e.target.value,
                                      'mezzanine',
                                      props.i,
                                      'parkings',
                                      ii,
                                      'carParkings'
                                    ])
                                  )
                                }}
                                placeholder='0'
                                id={`Parking-Cars-${ii}`}
                              />
                            </InputGroup>
                          </Col>
                          <Col md={2} className='mb-md-0 mb-1'></Col>
                        </Row>

                        <Row className='justify-content-between align-items-center'>
                          <Col sm={12}>
                            <hr />
                          </Col>
                        </Row>
                      </AccordionBody>
                    </AccordionItem>
                  </Form>
                )}
              </Repeater>
            </CardBody>
          </Card>
        </Accordion>
      )}
    </Row>
  )
}
export default noParkings
