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

const noHotelSuites = props => {
  // ** Store Variables
  const dispatch = useDispatch()
  const store = useSelector(state => state.addNewProject)

  const [open, setOpen] = useState('')
  const toggleopen = id => {
    open === id ? setOpen() : setOpen(id)
  }
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
  const CalculateQM_MonthlyPer = (e, i, ii) => {
    dispatch(
      updateFloorInnerProperties([
        Math.max(0, Math.min(100, Number(e.target.value))),

        'floors',
        i,
        'hotelSuites',
        ii,
        'qmMonthlyPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        100 -
          store.projectData.floors[props.i].hotelSuites[ii]
            .downPaymentPercentage -
          Math.max(0, Math.min(100, Number(e.target.value))),
        'floors',
        i,
        'hotelSuites',
        ii,
        'qmQuarterPercentage'
      ])
    )
  }

  const CalculateQM_QuarterPer = (e, i, ii) => {
    dispatch(
      updateFloorInnerProperties([
        Math.max(0, Math.min(100, Number(e.target.value))),

        'floors',
        i,
        'hotelSuites',
        ii,
        'qmQuarterPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        100 -
          store.projectData.floors[props.i].hotelSuites[ii]
            .downPaymentPercentage -
          Math.max(0, Math.min(100, Number(e.target.value))),
        'floors',
        i,
        'hotelSuites',
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

        'floors',
        i,
        'hotelSuites',
        ii,
        'amMonthlyPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        100 -
          store.projectData.floors[props.i].hotelSuites[ii]
            .downPaymentPercentage -
          Math.max(0, Math.min(100, Number(e.target.value))),
        'floors',
        i,
        'hotelSuites',
        ii,
        'amBiAnuallyPercentage'
      ])
    )
  }

  const CalculateAM_BiAnuallyPer = (e, i, ii) => {
    dispatch(
      updateFloorInnerProperties([
        Math.max(0, Math.min(100, Number(e.target.value))),

        'floors',
        i,
        'hotelSuites',
        ii,
        'amBiAnuallyPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        100 -
          store.projectData.floors[props.i].hotelSuites[ii]
            .downPaymentPercentage -
          Math.max(0, Math.min(100, Number(e.target.value))),
        'floors',
        i,
        'hotelSuites',
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

        'floors',
        i,
        'hotelSuites',
        ii,
        'downPaymentPercentage'
      ])
    )

    dispatch(
      updateFloorInnerProperties([
        (100 - Math.max(0, Math.min(100, Number(e.target.value)))) / 2,
        'floors',
        props.i,
        'hotelSuites',
        ii,
        'qmMonthlyPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        (100 - Math.max(0, Math.min(100, Number(e.target.value)))) / 2,
        'floors',
        props.i,
        'hotelSuites',
        ii,
        'qmQuarterPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        (100 - Math.max(0, Math.min(100, Number(e.target.value)))) / 2,
        'floors',
        props.i,
        'hotelSuites',
        ii,
        'amMonthlyPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        (100 - Math.max(0, Math.min(100, Number(e.target.value)))) / 2,
        'floors',
        props.i,
        'hotelSuites',
        ii,
        'amBiAnuallyPercentage'
      ])
    )
  }
  return (
    <Row className='justify-content-between align-items-center'>
      {store.projectData.floors[props.i].noHotelSuites > 0 && (
        <Accordion className='accordion-border' open={open} toggle={toggleopen}>
          <Card>
            <CardHeader>
              <h4 className='card-title'>
                Total Hotel Suites:{' '}
                {store.projectData.floors[props.i].noHotelSuites}:{' '}
              </h4>
            </CardHeader>
            <CardBody>
              <Repeater count={store.projectData.floors[props.i].noHotelSuites}>
                {ii => (
                  <Form key={ii}>
                    <AccordionItem>
                      <AccordionHeader targetId={`${ii}`}>
                        Hotel Suite {ii + 1}
                      </AccordionHeader>
                      <Row className='justify-content-between align-items-center'>
                        <Col md={2} className='mb-md-0 mb-1'></Col>
                        <Col md={2} className='mb-md-0 mb-1'>
                          <div className='form-check form-check-success'>
                            <Input
                              type='radio'
                              id={`HotelSuite-AvailableRadio-${ii}`}
                              name='ex1'
                              defaultChecked
                            />
                            <Label
                              className='form-check-label'
                              for={`HotelSuite-AvailableRadio-${ii}`}
                            >
                              Available
                            </Label>
                          </div>
                        </Col>
                        <Col md={2} className='mb-md-0 mb-1'>
                          <div className='form-check form-check-danger'>
                            <Input
                              type='radio'
                              name='ex1'
                              id={`HotelSuite-SoldRadio-${ii}`}
                            />
                            <Label
                              className='form-check-label'
                              for={`HotelSuite-SoldRadio-${ii}`}
                            >
                              Sold
                            </Label>
                          </div>
                        </Col>
                        <Col md={2} className='mb-md-0 mb-1'>
                          <div className='form-check form-check-warning'>
                            <Input
                              type='radio'
                              name='ex1'
                              id={`HotelSuite-ResaleRadio-${ii}`}
                            />
                            <Label
                              className='form-check-label'
                              for={`HotelSuite-ResaleRadio-${ii}`}
                            >
                              Resale
                            </Label>
                          </div>
                        </Col>
                      </Row>

                      <AccordionBody accordionId={`${ii}`}>
                        <Row className='justify-content-between align-items-center'>
                          <Col md={2} className='mb-md-0 mb-1'>
                            <Label
                              className='form-label'
                              for={`HotelSuite-Label-${ii}`}
                            >
                              HotelSuite {ii + 1} Label
                            </Label>
                            <InputGroup className='mt-2'>
                              <InputGroupText>HotelSuite-</InputGroupText>
                              <Input
                                type='text'
                                id={`HotelSuite-Label-${ii}`}
                                placeholder='HotelSuite #'
                                value={store.projectData.floors[
                                  props.i
                                ].hotelSuites[ii].label.replace(
                                  'HotelSuite-',
                                  ''
                                )}
                                onChange={e => {
                                  dispatch(
                                    updateFloorInnerProperties([
                                      `HotelSuite-${e.target.value}`,
                                      'floors',
                                      props.i,
                                      'hotelSuites',
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
                              for={`HotelSuite-length-${ii}`}
                            >
                              length
                            </Label>
                            <Input
                              type='number'
                              id={`HotelSuite-length-${ii}`}
                              placeholder='32'
                              value={
                                store.projectData.floors[props.i].hotelSuites[
                                  ii
                                ].length
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'hotelSuites',
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
                              for={`HotelSuite-width-${ii}`}
                            >
                              width
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`HotelSuite-width-${ii}`}
                              placeholder='1'
                              value={
                                store.projectData.floors[props.i].hotelSuites[
                                  ii
                                ].width
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'hotelSuites',
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
                              for={`HotelSuite-TotalCoveredArea-${ii}`}
                            >
                              Total Covered Area
                            </Label>

                            <InputGroup>
                              <InputGroupText>Sq.Ft</InputGroupText>
                              <Input
                                readonly
                                className='form-control'
                                value={
                                  store.projectData.floors[props.i].hotelSuites[
                                    ii
                                  ].width *
                                  store.projectData.floors[props.i].hotelSuites[
                                    ii
                                  ].length
                                }
                                placeholder='0'
                                id={`HotelSuite-TotalCoveredArea-${ii}`}
                              />
                            </InputGroup>
                            {/* fffffffffffffffffffff */}
                          </Col>
                          <Col md={3} className='mb-md-0 mb-1'>
                            <Label for={`HotelSuite-TotalPrice-${ii}`}>
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
                                  store.projectData.floors[props.i]
                                    .priceHotelSuites *
                                  store.projectData.floors[props.i].hotelSuites[
                                    ii
                                  ].width *
                                  store.projectData.floors[props.i].hotelSuites[
                                    ii
                                  ].length
                                }
                                placeholder='0'
                                id={`HotelSuite-TotalPrice-${ii}`}
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
                              <CardTitle> Payment Plan</CardTitle>
                            </CardHeader>
                          </Col>
                          <Col md={2} className='mb-md-0 mb-1'>
                            <Label
                              className='form-label'
                              for={`HotelSuite-downPaymentPercentage-${ii}`}
                            >
                              Down Payment %
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`HotelSuite-downPaymentPercentage-${ii}`}
                              placeholder='12'
                              value={
                                store.projectData.floors[props.i].hotelSuites[
                                  ii
                                ].downPaymentPercentage
                              }
                              onChange={e =>
                                handleChangeDownPaymentPercent(e, props.i, ii)
                              }
                            />
                          </Col>
                          <Col md={4} className='mb-md-0 mb-1'>
                            <InputGroup>
                              <InputGroupText>Down Payment</InputGroupText>
                              <Input
                                readonly
                                className='form-control'
                                value={
                                  store.projectData.floors[props.i]
                                    .priceHotelSuites *
                                  store.projectData.floors[props.i].hotelSuites[
                                    ii
                                  ].width *
                                  store.projectData.floors[props.i].hotelSuites[
                                    ii
                                  ].length *
                                  [
                                    store.projectData.floors[props.i]
                                      .hotelSuites[ii].downPaymentPercentage /
                                      100
                                  ]
                                }
                                placeholder='0'
                                id={`HotelSuite-DownPayment-${ii}`}
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
                        <Row className='justify-content-between align-items-center'>
                          <Col md={1} className='mb-md-0 mb-1'>
                            <div className='form-switch form-check-primary'>
                              <Input
                                type='switch'
                                id={`hotelSuites-monthlyPlan-${ii}`}
                                name='icon-primary'
                                checked={
                                  store.projectData.floors[props.i].hotelSuites[
                                    ii
                                  ].monthlyPlan
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorInnerProperties([
                                      e.target.checked,
                                      'floors',
                                      props.i,
                                      'hotelSuites',
                                      ii,
                                      'monthlyPlan'
                                    ])
                                  )
                                }}
                              />
                              <CustomLabel
                                htmlFor={`hotelSuites-monthlyPlan-${ii}`}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row className='justify-content-between align-items-center'>
                          <Col md={4} className='mb-md-0 mb-1'>
                            <CardHeader className='align-items-center'>
                              <CardTitle> Monthly Plan</CardTitle>
                            </CardHeader>
                          </Col>
                          <Col md={2} className='mb-md-0 mb-1'>
                            <Label
                              className='form-label'
                              for={`HotelSuite-MonthlyPlanMonthlyDuration-${ii}`}
                            >
                              Months
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`HotelSuite-MonthlyPlanMonthlyDuration-${ii}`}
                              placeholder='1'
                              value={
                                store.projectData.floors[props.i].hotelSuites[
                                  ii
                                ].monthlyDuration
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'hotelSuites',
                                    ii,
                                    'monthlyDuration'
                                  ])
                                )
                              }}
                            />
                          </Col>
                          <Col md={4} className='mb-md-0 mb-1'>
                            <InputGroup className='mt-2'>
                              <InputGroupText>Installment</InputGroupText>
                              <Input
                                readonly
                                className='form-control'
                                value={
                                  [
                                    [
                                      store.projectData.floors[props.i]
                                        .priceHotelSuites *
                                        store.projectData.floors[props.i]
                                          .hotelSuites[ii].width *
                                        store.projectData.floors[props.i]
                                          .hotelSuites[ii].length
                                    ] *
                                      [
                                        [
                                          100 -
                                            store.projectData.floors[props.i]
                                              .hotelSuites[ii]
                                              .downPaymentPercentage
                                        ] / 100
                                      ]
                                  ] /
                                  store.projectData.floors[props.i].hotelSuites[
                                    ii
                                  ].monthlyDuration
                                }
                                placeholder='0'
                                id={`HotelSuite-MonthlyPlanInstallment-${ii}`}
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
                        <Row className='justify-content-between align-items-center'>
                          <Col md={1} className='mb-md-0 mb-1'>
                            <div className='form-switch form-check-primary'>
                              <Input
                                type='switch'
                                id={`hotelSuites-quarterPlan-${ii}`}
                                name='icon-primary'
                                checked={
                                  store.projectData.floors[props.i].hotelSuites[
                                    ii
                                  ].quarterPlan
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorInnerProperties([
                                      e.target.checked,
                                      'floors',
                                      props.i,
                                      'hotelSuites',
                                      ii,
                                      'quarterPlan'
                                    ])
                                  )
                                }}
                              />
                              <CustomLabel
                                htmlFor={`hotelSuites-quarterPlan-${ii}`}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row className='justify-content-between align-items-center'>
                          <Col md={4} className='mb-md-0 mb-1'>
                            <CardHeader className='align-items-center'>
                              <CardTitle> Quarter Plan</CardTitle>
                            </CardHeader>
                          </Col>
                          <Col md={2} className='mb-md-0 mb-1'>
                            <Label
                              className='form-label'
                              for={`HotelSuite-QuarterPlanQuarterDuration-${ii}`}
                            >
                              Quarters
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`HotelSuite-QuarterPlanQuarterDuration-${ii}`}
                              placeholder='1'
                              value={
                                store.projectData.floors[props.i].hotelSuites[
                                  ii
                                ].quarterDuration
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'hotelSuites',
                                    ii,
                                    'quarterDuration'
                                  ])
                                )
                              }}
                            />
                          </Col>
                          <Col md={4} className='mb-md-0 mb-1'>
                            <InputGroup className='mt-2'>
                              <InputGroupText>Installment</InputGroupText>
                              <Input
                                readonly
                                className='form-control'
                                value={
                                  [
                                    [
                                      store.projectData.floors[props.i]
                                        .priceHotelSuites *
                                        store.projectData.floors[props.i]
                                          .hotelSuites[ii].width *
                                        store.projectData.floors[props.i]
                                          .hotelSuites[ii].length
                                    ] *
                                      [
                                        [
                                          100 -
                                            store.projectData.floors[props.i]
                                              .hotelSuites[ii]
                                              .downPaymentPercentage
                                        ] / 100
                                      ]
                                  ] /
                                  store.projectData.floors[props.i].hotelSuites[
                                    ii
                                  ].quarterDuration
                                }
                                placeholder='0'
                                id={`HotelSuite-QuarterPlanInstallment-${ii}`}
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

                        <Row className='justify-content-between align-items-center'>
                          <Col md={1} className='mb-md-0 mb-1'>
                            <div className='form-switch form-check-primary'>
                              <Input
                                type='switch'
                                id={`hotelSuites-qmPlan-${ii}`}
                                name='icon-primary'
                                checked={
                                  store.projectData.floors[props.i].hotelSuites[
                                    ii
                                  ].qmPlan
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorInnerProperties([
                                      e.target.checked,
                                      'floors',
                                      props.i,
                                      'hotelSuites',
                                      ii,
                                      'qmPlan'
                                    ])
                                  )
                                }}
                              />
                              <CustomLabel
                                htmlFor={`hotelSuites-qmPlan-${ii}`}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row className='justify-content-between align-items-center'>
                          <Col md={4} className='mb-md-0 mb-1'>
                            <CardHeader className='align-items-center'>
                              <CardTitle> Month and Quarter Plan</CardTitle>
                            </CardHeader>
                          </Col>
                          <Col md={2} className='mb-md-0 mb-1'>
                            <Label
                              className='form-label'
                              for={`HotelSuite-qmMonthlyPercentage-${ii}`}
                            >
                              Monthly %
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`HotelSuite-qmMonthlyPercentage-${ii}`}
                              placeholder='12'
                              value={
                                store.projectData.floors[props.i].hotelSuites[
                                  ii
                                ].qmMonthlyPercentage
                              }
                              onChange={e =>
                                CalculateQM_MonthlyPer(e, props.i, ii)
                              }
                            />
                          </Col>
                          <Col md={2} className='mb-md-0 mb-1'>
                            <Label
                              className='form-label'
                              for={`HotelSuite-qmMonthlyDuration-${ii}`}
                            >
                              Duration (Month)
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`HotelSuite-qmMonthlyDuration-${ii}`}
                              placeholder='1'
                              value={
                                store.projectData.floors[props.i].hotelSuites[
                                  ii
                                ].qmMonthlyDuration
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'hotelSuites',
                                    ii,
                                    'qmMonthlyDuration'
                                  ])
                                )
                              }}
                            />
                          </Col>
                          <Col md={4} className='mb-md-0 mb-1'>
                            <InputGroup className='mt-2'>
                              <InputGroupText>Installment</InputGroupText>
                              <Input
                                readonly
                                className='form-control'
                                value={
                                  [
                                    [
                                      [
                                        store.projectData.floors[props.i]
                                          .priceHotelSuites *
                                          store.projectData.floors[props.i]
                                            .hotelSuites[ii].width *
                                          store.projectData.floors[props.i]
                                            .hotelSuites[ii].length
                                      ]
                                    ] *
                                      [
                                        store.projectData.floors[props.i]
                                          .hotelSuites[ii].qmMonthlyPercentage /
                                          100
                                      ]
                                  ] /
                                  store.projectData.floors[props.i].hotelSuites[
                                    ii
                                  ].qmMonthlyDuration
                                }
                                placeholder='0'
                                id={`HotelSuite-QM_MonthlyInstallment-${ii}`}
                              />
                            </InputGroup>
                          </Col>
                          <Col md={2} className='mb-md-0 mb-1'></Col>
                        </Row>

                        <Row className='justify-content-between align-items-center'>
                          <Col md={4} className='mb-md-0 mb-1'></Col>
                          <Col md={2} className='mb-md-0 mb-1'>
                            <Label
                              className='form-label'
                              for={`HotelSuite-qmQuarterPercentage-${ii}`}
                            >
                              Quarter %
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`HotelSuite-qmQuarterPercentage-${ii}`}
                              placeholder='12'
                              value={
                                store.projectData.floors[props.i].hotelSuites[
                                  ii
                                ].qmQuarterPercentage
                              }
                              onChange={e =>
                                CalculateQM_QuarterPer(e, props.i, ii)
                              }
                            />
                          </Col>
                          <Col md={2} className='mb-md-0 mb-1'>
                            <Label
                              className='form-label'
                              for={`HotelSuite-qmQuarterDuration-${ii}`}
                            >
                              Dur (Quarters)
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`HotelSuite-qmQuarterDuration-${ii}`}
                              placeholder='1'
                              value={
                                store.projectData.floors[props.i].hotelSuites[
                                  ii
                                ].qmQuarterDuration
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'hotelSuites',
                                    ii,
                                    'qmQuarterDuration'
                                  ])
                                )
                              }}
                            />
                          </Col>
                          <Col md={4} className='mb-md-0 mb-1'>
                            <InputGroup className='mt-2'>
                              <InputGroupText>Installment</InputGroupText>
                              <Input
                                readonly
                                className='form-control'
                                value={
                                  [
                                    [
                                      [
                                        store.projectData.floors[props.i]
                                          .priceHotelSuites *
                                          store.projectData.floors[props.i]
                                            .hotelSuites[ii].width *
                                          store.projectData.floors[props.i]
                                            .hotelSuites[ii].length
                                      ]
                                    ] *
                                      [
                                        store.projectData.floors[props.i]
                                          .hotelSuites[ii].qmQuarterPercentage /
                                          100
                                      ]
                                  ] /
                                  store.projectData.floors[props.i].hotelSuites[
                                    ii
                                  ].qmQuarterDuration
                                }
                                placeholder='0'
                                id={`HotelSuite-QM_QuarterInstallment-${ii}`}
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
                        {/* Bi Anually Starts *********************************** */}
                        <Row className='justify-content-between align-items-center'>
                          <Col md={1} className='mb-md-0 mb-1'>
                            <div className='form-switch form-check-primary'>
                              <Input
                                type='switch'
                                id={`hotelSuites-amPlan-${ii}`}
                                name='icon-primary'
                                checked={
                                  store.projectData.floors[props.i].hotelSuites[
                                    ii
                                  ].amPlan
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorInnerProperties([
                                      e.target.checked,
                                      'floors',
                                      props.i,
                                      'hotelSuites',
                                      ii,
                                      'amPlan'
                                    ])
                                  )
                                }}
                              />
                              <CustomLabel
                                htmlFor={`hotelSuites-amPlan-${ii}`}
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row className='justify-content-between align-items-center'>
                          <Col md={4} className='mb-md-0 mb-1'>
                            <CardHeader className='align-items-center'>
                              <CardTitle> Month and Bi-Annually Plan</CardTitle>
                            </CardHeader>
                          </Col>
                          <Col md={2} className='mb-md-0 mb-1'>
                            <Label
                              className='form-label'
                              for={`HotelSuite-amMonthlyPercentage-${ii}`}
                            >
                              Monthly %
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`HotelSuite-amMonthlyPercentage-${ii}`}
                              placeholder='12'
                              value={
                                store.projectData.floors[props.i].hotelSuites[
                                  ii
                                ].amMonthlyPercentage
                              }
                              onChange={e =>
                                CalculateAM_MonthlyPer(e, props.i, ii)
                              }
                            />
                          </Col>
                          <Col md={2} className='mb-md-0 mb-1'>
                            <Label
                              className='form-label'
                              for={`HotelSuite-amMonthlyDuration-${ii}`}
                            >
                              Duration (Month)
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`HotelSuite-amMonthlyDuration-${ii}`}
                              placeholder='1'
                              value={
                                store.projectData.floors[props.i].hotelSuites[
                                  ii
                                ].amMonthlyDuration
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'hotelSuites',
                                    ii,
                                    'amMonthlyDuration'
                                  ])
                                )
                              }}
                            />
                          </Col>
                          <Col md={4} className='mb-md-0 mb-1'>
                            <InputGroup className='mt-2'>
                              <InputGroupText>Installment</InputGroupText>
                              <Input
                                readonly
                                className='form-control'
                                value={
                                  [
                                    [
                                      [
                                        store.projectData.floors[props.i]
                                          .priceHotelSuites *
                                          store.projectData.floors[props.i]
                                            .hotelSuites[ii].width *
                                          store.projectData.floors[props.i]
                                            .hotelSuites[ii].length
                                      ]
                                    ] *
                                      [
                                        store.projectData.floors[props.i]
                                          .hotelSuites[ii].amMonthlyPercentage /
                                          100
                                      ]
                                  ] /
                                  store.projectData.floors[props.i].hotelSuites[
                                    ii
                                  ].amMonthlyDuration
                                }
                                placeholder='0'
                                id={`HotelSuite-AM_MonthlyInstallment-${ii}`}
                              />
                            </InputGroup>
                          </Col>
                          <Col md={2} className='mb-md-0 mb-1'></Col>
                        </Row>
                        <Row className='justify-content-between align-items-center'>
                          <Col md={4} className='mb-md-0 mb-1'></Col>
                          <Col md={2} className='mb-md-0 mb-1'>
                            <Label
                              className='form-label'
                              for={`HotelSuite-amBiAnuallyPercentage-${ii}`}
                            >
                              Monthly %
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`HotelSuite-amBiAnuallyPercentage-${ii}`}
                              placeholder='12'
                              value={
                                store.projectData.floors[props.i].hotelSuites[
                                  ii
                                ].amBiAnuallyPercentage
                              }
                              onChange={e =>
                                CalculateAM_BiAnuallyPer(e, props.i, ii)
                              }
                            />
                          </Col>
                          <Col md={2} className='mb-md-0 mb-1'>
                            <Label
                              className='form-label'
                              for={`HotelSuite-amBiAnuallyDuration-${ii}`}
                            >
                              Dur (Bi Annual)
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`HotelSuite-amBiAnuallyDuration-${ii}`}
                              placeholder='1'
                              value={
                                store.projectData.floors[props.i].hotelSuites[
                                  ii
                                ].amBiAnuallyDuration
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'hotelSuites',
                                    ii,
                                    'amBiAnuallyDuration'
                                  ])
                                )
                              }}
                            />
                          </Col>
                          <Col md={4} className='mb-md-0 mb-1'>
                            <InputGroup className='mt-2'>
                              <InputGroupText>Installment</InputGroupText>
                              <Input
                                readonly
                                className='form-control'
                                value={
                                  [
                                    [
                                      [
                                        store.projectData.floors[props.i]
                                          .priceHotelSuites *
                                          store.projectData.floors[props.i]
                                            .hotelSuites[ii].width *
                                          store.projectData.floors[props.i]
                                            .hotelSuites[ii].length
                                      ]
                                    ] *
                                      [
                                        store.projectData.floors[props.i]
                                          .hotelSuites[ii]
                                          .amBiAnuallyPercentage / 100
                                      ]
                                  ] /
                                  store.projectData.floors[props.i].hotelSuites[
                                    ii
                                  ].amBiAnuallyDuration
                                }
                                placeholder='0'
                                id={`HotelSuite-AM_BiAnuallyInstallment-${ii}`}
                              />
                            </InputGroup>
                          </Col>
                          <Col md={2} className='mb-md-0 mb-1'></Col>
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
export default noHotelSuites
