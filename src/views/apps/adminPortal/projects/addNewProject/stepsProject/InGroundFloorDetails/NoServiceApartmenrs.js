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

const noServiceApartments = props => {
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
        'serviceApartments',
        ii,
        'qmMonthlyPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        100 -
          store.projectData.floors[props.i].serviceApartments[ii]
            .downPaymentPercentage -
          Math.max(0, Math.min(100, Number(e.target.value))),
        'floors',
        i,
        'serviceApartments',
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
        'serviceApartments',
        ii,
        'qmQuarterPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        100 -
          store.projectData.floors[props.i].serviceApartments[ii]
            .downPaymentPercentage -
          Math.max(0, Math.min(100, Number(e.target.value))),
        'floors',
        i,
        'serviceApartments',
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
        'serviceApartments',
        ii,
        'amMonthlyPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        100 -
          store.projectData.floors[props.i].serviceApartments[ii]
            .downPaymentPercentage -
          Math.max(0, Math.min(100, Number(e.target.value))),
        'floors',
        i,
        'serviceApartments',
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
        'serviceApartments',
        ii,
        'amBiAnuallyPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        100 -
          store.projectData.floors[props.i].serviceApartments[ii]
            .downPaymentPercentage -
          Math.max(0, Math.min(100, Number(e.target.value))),
        'floors',
        i,
        'serviceApartments',
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
        'serviceApartments',
        ii,
        'downPaymentPercentage'
      ])
    )

    dispatch(
      updateFloorInnerProperties([
        (100 - Math.max(0, Math.min(100, Number(e.target.value)))) / 2,
        'floors',
        props.i,
        'serviceApartments',
        ii,
        'qmMonthlyPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        (100 - Math.max(0, Math.min(100, Number(e.target.value)))) / 2,
        'floors',
        props.i,
        'serviceApartments',
        ii,
        'qmQuarterPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        (100 - Math.max(0, Math.min(100, Number(e.target.value)))) / 2,
        'floors',
        props.i,
        'serviceApartments',
        ii,
        'amMonthlyPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        (100 - Math.max(0, Math.min(100, Number(e.target.value)))) / 2,
        'floors',
        props.i,
        'serviceApartments',
        ii,
        'amBiAnuallyPercentage'
      ])
    )
  }
  return (
    <Row className='justify-content-between align-items-center'>
      {store.projectData.floors[props.i].noServiceApartments > 0 && (
        <Accordion className='accordion-border' open={open} toggle={toggleopen}>
          <Card>
            <CardHeader>
              <h4 className='card-title'>
                Total Service apartments:{' '}
                {store.projectData.floors[props.i].noServiceApartments}:{' '}
              </h4>
            </CardHeader>
            <CardBody>
              <Repeater
                count={store.projectData.floors[props.i].noServiceApartments}
              >
                {ii => (
                  <Form key={ii}>
                    <AccordionItem>
                      <AccordionHeader targetId={`${ii}`}>
                        Service Apartment {ii + 1}
                      </AccordionHeader>
                      <Row className='justify-content-between align-items-center'>
                        <Col md={2} className='mb-md-0 mb-1'></Col>
                        <Col md={2} className='mb-md-0 mb-1'>
                          <div className='form-check form-check-success'>
                            <Input
                              type='radio'
                              id={`ServiceApartment-AvailableRadio-${ii}`}
                              name='ex1'
                              defaultChecked
                            />
                            <Label
                              className='form-check-label'
                              for={`ServiceApartment-AvailableRadio-${ii}`}
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
                              id={`ServiceApartment-SoldRadio-${ii}`}
                            />
                            <Label
                              className='form-check-label'
                              for={`ServiceApartment-SoldRadio-${ii}`}
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
                              id={`ServiceApartment-ResaleRadio-${ii}`}
                            />
                            <Label
                              className='form-check-label'
                              for={`ServiceApartment-ResaleRadio-${ii}`}
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
                              for={`ServiceApartment-Label-${ii}`}
                            >
                              ServiceApartment {ii + 1} Label
                            </Label>
                            <InputGroup className='mt-2'>
                              <InputGroupText>ServiceApartment-</InputGroupText>
                              <Input
                                type='text'
                                id={`ServiceApartment-Label-${ii}`}
                                placeholder='ServiceApartment #'
                                value={store.projectData.floors[
                                  props.i
                                ].serviceApartments[ii].label.replace(
                                  'ServiceApartment-',
                                  ''
                                )}
                                onChange={e => {
                                  dispatch(
                                    updateFloorInnerProperties([
                                      `ServiceApartment-${e.target.value}`,
                                      'floors',
                                      props.i,
                                      'serviceApartments',
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
                              for={`ServiceApartment-length-${ii}`}
                            >
                              length
                            </Label>
                            <Input
                              type='number'
                              id={`ServiceApartment-length-${ii}`}
                              placeholder='32'
                              value={
                                store.projectData.floors[props.i]
                                  .serviceApartments[ii].length
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'serviceApartments',
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
                              for={`ServiceApartment-width-${ii}`}
                            >
                              width
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`ServiceApartment-width-${ii}`}
                              placeholder='1'
                              value={
                                store.projectData.floors[props.i]
                                  .serviceApartments[ii].width
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'serviceApartments',
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
                              for={`ServiceApartment-TotalCoveredArea-${ii}`}
                            >
                              Total Covered Area
                            </Label>

                            <InputGroup>
                              <InputGroupText>Sq.Ft</InputGroupText>
                              <Input
                                readOnly
                                className='form-control'
                                value={
                                  store.projectData.floors[props.i]
                                    .serviceApartments[ii].width *
                                  store.projectData.floors[props.i]
                                    .serviceApartments[ii].length
                                }
                                placeholder='0'
                                id={`ServiceApartment-TotalCoveredArea-${ii}`}
                              />
                            </InputGroup>
                            {/* fffffffffffffffffffff */}
                          </Col>
                          <Col md={3} className='mb-md-0 mb-1'>
                            <Label for={`ServiceApartment-TotalPrice-${ii}`}>
                              {' '}
                              Total Price
                            </Label>
                            <InputGroup>
                              <InputGroupText>PKR</InputGroupText>
                              <Input
                                // readOnly='true'
                                readOnly
                                className='form-control'
                                value={
                                  store.projectData.floors[props.i]
                                    .priceServiceApartments *
                                  store.projectData.floors[props.i]
                                    .serviceApartments[ii].width *
                                  store.projectData.floors[props.i]
                                    .serviceApartments[ii].length
                                }
                                placeholder='0'
                                id={`ServiceApartment-TotalPrice-${ii}`}
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
                              for={`ServiceApartment-downPaymentPercentage-${ii}`}
                            >
                              Down Payment %
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`ServiceApartment-downPaymentPercentage-${ii}`}
                              placeholder='12'
                              value={
                                store.projectData.floors[props.i]
                                  .serviceApartments[ii].downPaymentPercentage
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
                                readOnly
                                className='form-control'
                                value={
                                  store.projectData.floors[props.i]
                                    .priceServiceApartments *
                                  store.projectData.floors[props.i]
                                    .serviceApartments[ii].width *
                                  store.projectData.floors[props.i]
                                    .serviceApartments[ii].length *
                                  [
                                    store.projectData.floors[props.i]
                                      .serviceApartments[ii]
                                      .downPaymentPercentage / 100
                                  ]
                                }
                                placeholder='0'
                                id={`ServiceApartment-DownPayment-${ii}`}
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
                                id={`serviceApartments-monthlyPlan-${ii}`}
                                name='icon-primary'
                                checked={
                                  store.projectData.floors[props.i]
                                    .serviceApartments[ii].monthlyPlan
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorInnerProperties([
                                      e.target.checked,
                                      'floors',
                                      props.i,
                                      'serviceApartments',
                                      ii,
                                      'monthlyPlan'
                                    ])
                                  )
                                }}
                              />
                              <CustomLabel
                                htmlFor={`serviceApartments-monthlyPlan-${ii}`}
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
                              for={`ServiceApartment-MonthlyPlanMonthlyDuration-${ii}`}
                            >
                              Months
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`ServiceApartment-MonthlyPlanMonthlyDuration-${ii}`}
                              placeholder='1'
                              value={
                                store.projectData.floors[props.i]
                                  .serviceApartments[ii].monthlyDuration
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'serviceApartments',
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
                                readOnly
                                className='form-control'
                                value={
                                  [
                                    [
                                      store.projectData.floors[props.i]
                                        .priceServiceApartments *
                                        store.projectData.floors[props.i]
                                          .serviceApartments[ii].width *
                                        store.projectData.floors[props.i]
                                          .serviceApartments[ii].length
                                    ] *
                                      [
                                        [
                                          100 -
                                            store.projectData.floors[props.i]
                                              .serviceApartments[ii]
                                              .downPaymentPercentage
                                        ] / 100
                                      ]
                                  ] /
                                  store.projectData.floors[props.i]
                                    .serviceApartments[ii].monthlyDuration
                                }
                                placeholder='0'
                                id={`ServiceApartment-MonthlyPlanInstallment-${ii}`}
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
                                id={`serviceApartments-quarterPlan-${ii}`}
                                name='icon-primary'
                                checked={
                                  store.projectData.floors[props.i]
                                    .serviceApartments[ii].quarterPlan
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorInnerProperties([
                                      e.target.checked,
                                      'floors',
                                      props.i,
                                      'serviceApartments',
                                      ii,
                                      'quarterPlan'
                                    ])
                                  )
                                }}
                              />
                              <CustomLabel
                                htmlFor={`serviceApartments-quarterPlan-${ii}`}
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
                              for={`ServiceApartment-QuarterPlanQuarterDuration-${ii}`}
                            >
                              Quarters
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`ServiceApartment-QuarterPlanQuarterDuration-${ii}`}
                              placeholder='1'
                              value={
                                store.projectData.floors[props.i]
                                  .serviceApartments[ii].quarterDuration
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'serviceApartments',
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
                                readOnly
                                className='form-control'
                                value={
                                  [
                                    [
                                      store.projectData.floors[props.i]
                                        .priceServiceApartments *
                                        store.projectData.floors[props.i]
                                          .serviceApartments[ii].width *
                                        store.projectData.floors[props.i]
                                          .serviceApartments[ii].length
                                    ] *
                                      [
                                        [
                                          100 -
                                            store.projectData.floors[props.i]
                                              .serviceApartments[ii]
                                              .downPaymentPercentage
                                        ] / 100
                                      ]
                                  ] /
                                  store.projectData.floors[props.i]
                                    .serviceApartments[ii].quarterDuration
                                }
                                placeholder='0'
                                id={`ServiceApartment-QuarterPlanInstallment-${ii}`}
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
                                id={`serviceApartments-qmPlan-${ii}`}
                                name='icon-primary'
                                checked={
                                  store.projectData.floors[props.i]
                                    .serviceApartments[ii].qmPlan
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorInnerProperties([
                                      e.target.checked,
                                      'floors',
                                      props.i,
                                      'serviceApartments',
                                      ii,
                                      'qmPlan'
                                    ])
                                  )
                                }}
                              />
                              <CustomLabel
                                htmlFor={`serviceApartments-qmPlan-${ii}`}
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
                              for={`ServiceApartment-qmMonthlyPercentage-${ii}`}
                            >
                              Monthly %
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`ServiceApartment-qmMonthlyPercentage-${ii}`}
                              placeholder='12'
                              value={
                                store.projectData.floors[props.i]
                                  .serviceApartments[ii].qmMonthlyPercentage
                              }
                              onChange={e =>
                                CalculateQM_MonthlyPer(e, props.i, ii)
                              }
                            />
                          </Col>
                          <Col md={2} className='mb-md-0 mb-1'>
                            <Label
                              className='form-label'
                              for={`ServiceApartment-qmMonthlyDuration-${ii}`}
                            >
                              Duration (Month)
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`ServiceApartment-qmMonthlyDuration-${ii}`}
                              placeholder='1'
                              value={
                                store.projectData.floors[props.i]
                                  .serviceApartments[ii].qmMonthlyDuration
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'serviceApartments',
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
                                readOnly
                                className='form-control'
                                value={
                                  [
                                    [
                                      [
                                        store.projectData.floors[props.i]
                                          .priceServiceApartments *
                                          store.projectData.floors[props.i]
                                            .serviceApartments[ii].width *
                                          store.projectData.floors[props.i]
                                            .serviceApartments[ii].length
                                      ]
                                    ] *
                                      [
                                        store.projectData.floors[props.i]
                                          .serviceApartments[ii]
                                          .qmMonthlyPercentage / 100
                                      ]
                                  ] /
                                  store.projectData.floors[props.i]
                                    .serviceApartments[ii].qmMonthlyDuration
                                }
                                placeholder='0'
                                id={`ServiceApartment-QM_MonthlyInstallment-${ii}`}
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
                              for={`ServiceApartment-qmQuarterPercentage-${ii}`}
                            >
                              Quarter %
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`ServiceApartment-qmQuarterPercentage-${ii}`}
                              placeholder='12'
                              value={
                                store.projectData.floors[props.i]
                                  .serviceApartments[ii].qmQuarterPercentage
                              }
                              onChange={e =>
                                CalculateQM_QuarterPer(e, props.i, ii)
                              }
                            />
                          </Col>
                          <Col md={2} className='mb-md-0 mb-1'>
                            <Label
                              className='form-label'
                              for={`ServiceApartment-qmQuarterDuration-${ii}`}
                            >
                              Dur (Quarters)
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`ServiceApartment-qmQuarterDuration-${ii}`}
                              placeholder='1'
                              value={
                                store.projectData.floors[props.i]
                                  .serviceApartments[ii].qmQuarterDuration
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'serviceApartments',
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
                                readOnly
                                className='form-control'
                                value={
                                  [
                                    [
                                      [
                                        store.projectData.floors[props.i]
                                          .priceServiceApartments *
                                          store.projectData.floors[props.i]
                                            .serviceApartments[ii].width *
                                          store.projectData.floors[props.i]
                                            .serviceApartments[ii].length
                                      ]
                                    ] *
                                      [
                                        store.projectData.floors[props.i]
                                          .serviceApartments[ii]
                                          .qmQuarterPercentage / 100
                                      ]
                                  ] /
                                  store.projectData.floors[props.i]
                                    .serviceApartments[ii].qmQuarterDuration
                                }
                                placeholder='0'
                                id={`ServiceApartment-QM_QuarterInstallment-${ii}`}
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
                                id={`serviceApartments-amPlan-${ii}`}
                                name='icon-primary'
                                checked={
                                  store.projectData.floors[props.i]
                                    .serviceApartments[ii].amPlan
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorInnerProperties([
                                      e.target.checked,
                                      'floors',
                                      props.i,
                                      'serviceApartments',
                                      ii,
                                      'amPlan'
                                    ])
                                  )
                                }}
                              />
                              <CustomLabel
                                htmlFor={`serviceApartments-amPlan-${ii}`}
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
                              for={`ServiceApartment-amMonthlyPercentage-${ii}`}
                            >
                              Monthly %
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`ServiceApartment-amMonthlyPercentage-${ii}`}
                              placeholder='12'
                              value={
                                store.projectData.floors[props.i]
                                  .serviceApartments[ii].amMonthlyPercentage
                              }
                              onChange={e =>
                                CalculateAM_MonthlyPer(e, props.i, ii)
                              }
                            />
                          </Col>
                          <Col md={2} className='mb-md-0 mb-1'>
                            <Label
                              className='form-label'
                              for={`ServiceApartment-amMonthlyDuration-${ii}`}
                            >
                              Duration (Month)
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`ServiceApartment-amMonthlyDuration-${ii}`}
                              placeholder='1'
                              value={
                                store.projectData.floors[props.i]
                                  .serviceApartments[ii].amMonthlyDuration
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'serviceApartments',
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
                                readOnly
                                className='form-control'
                                value={
                                  [
                                    [
                                      [
                                        store.projectData.floors[props.i]
                                          .priceServiceApartments *
                                          store.projectData.floors[props.i]
                                            .serviceApartments[ii].width *
                                          store.projectData.floors[props.i]
                                            .serviceApartments[ii].length
                                      ]
                                    ] *
                                      [
                                        store.projectData.floors[props.i]
                                          .serviceApartments[ii]
                                          .amMonthlyPercentage / 100
                                      ]
                                  ] /
                                  store.projectData.floors[props.i]
                                    .serviceApartments[ii].amMonthlyDuration
                                }
                                placeholder='0'
                                id={`ServiceApartment-AM_MonthlyInstallment-${ii}`}
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
                              for={`ServiceApartment-amBiAnuallyPercentage-${ii}`}
                            >
                              Monthly %
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`ServiceApartment-amBiAnuallyPercentage-${ii}`}
                              placeholder='12'
                              value={
                                store.projectData.floors[props.i]
                                  .serviceApartments[ii].amBiAnuallyPercentage
                              }
                              onChange={e =>
                                CalculateAM_BiAnuallyPer(e, props.i, ii)
                              }
                            />
                          </Col>
                          <Col md={2} className='mb-md-0 mb-1'>
                            <Label
                              className='form-label'
                              for={`ServiceApartment-amBiAnuallyDuration-${ii}`}
                            >
                              Dur (Bi Annual)
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`ServiceApartment-amBiAnuallyDuration-${ii}`}
                              placeholder='1'
                              value={
                                store.projectData.floors[props.i]
                                  .serviceApartments[ii].amBiAnuallyDuration
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'serviceApartments',
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
                                readOnly
                                className='form-control'
                                value={
                                  [
                                    [
                                      [
                                        store.projectData.floors[props.i]
                                          .priceServiceApartments *
                                          store.projectData.floors[props.i]
                                            .serviceApartments[ii].width *
                                          store.projectData.floors[props.i]
                                            .serviceApartments[ii].length
                                      ]
                                    ] *
                                      [
                                        store.projectData.floors[props.i]
                                          .serviceApartments[ii]
                                          .amBiAnuallyPercentage / 100
                                      ]
                                  ] /
                                  store.projectData.floors[props.i]
                                    .serviceApartments[ii].amBiAnuallyDuration
                                }
                                placeholder='0'
                                id={`ServiceApartment-AM_BiAnuallyInstallment-${ii}`}
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
export default noServiceApartments
