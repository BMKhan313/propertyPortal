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

const noCorporateOffices = props => {
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
        'corporateOffices',
        ii,
        'qmMonthlyPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        100 -
          store.projectData.floors[props.i].corporateOffices[ii]
            .downPaymentPercentage -
          Math.max(0, Math.min(100, Number(e.target.value))),
        'floors',
        i,
        'corporateOffices',
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
        'corporateOffices',
        ii,
        'qmQuarterPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        100 -
          store.projectData.floors[props.i].corporateOffices[ii]
            .downPaymentPercentage -
          Math.max(0, Math.min(100, Number(e.target.value))),
        'floors',
        i,
        'corporateOffices',
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
        'corporateOffices',
        ii,
        'amMonthlyPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        100 -
          store.projectData.floors[props.i].corporateOffices[ii]
            .downPaymentPercentage -
          Math.max(0, Math.min(100, Number(e.target.value))),
        'floors',
        i,
        'corporateOffices',
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
        'corporateOffices',
        ii,
        'amBiAnuallyPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        100 -
          store.projectData.floors[props.i].corporateOffices[ii]
            .downPaymentPercentage -
          Math.max(0, Math.min(100, Number(e.target.value))),
        'floors',
        i,
        'corporateOffices',
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
        'corporateOffices',
        ii,
        'downPaymentPercentage'
      ])
    )

    dispatch(
      updateFloorInnerProperties([
        (100 - Math.max(0, Math.min(100, Number(e.target.value)))) / 2,
        'floors',
        props.i,
        'corporateOffices',
        ii,
        'qmMonthlyPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        (100 - Math.max(0, Math.min(100, Number(e.target.value)))) / 2,
        'floors',
        props.i,
        'corporateOffices',
        ii,
        'qmQuarterPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        (100 - Math.max(0, Math.min(100, Number(e.target.value)))) / 2,
        'floors',
        props.i,
        'corporateOffices',
        ii,
        'amMonthlyPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        (100 - Math.max(0, Math.min(100, Number(e.target.value)))) / 2,
        'floors',
        props.i,
        'corporateOffices',
        ii,
        'amBiAnuallyPercentage'
      ])
    )
  }
  return (
    <Row className='justify-content-between align-items-center'>
      {store.projectData.floors[props.i].noCorporateOffices > 0 && (
        <Accordion className='accordion-border' open={open} toggle={toggleopen}>
          <Card>
            <CardHeader>
              <h4 className='card-title'>
                Total corporateOffices:{' '}
                {store.projectData.floors[props.i].noCorporateOffices}:{' '}
              </h4>
            </CardHeader>
            <CardBody>
              <Repeater
                count={store.projectData.floors[props.i].noCorporateOffices}
              >
                {ii => (
                  <Form key={ii}>
                    <AccordionItem>
                      <AccordionHeader targetId={`${ii}`}>
                        Corporate Office {ii + 1}
                      </AccordionHeader>
                      <Row className='justify-content-between align-items-center'>
                        <Col md={2} className='mb-md-0 mb-1'></Col>
                        <Col md={2} className='mb-md-0 mb-1'>
                          <div className='form-check form-check-success'>
                            <Input
                              type='radio'
                              id={`CorporateOffice-AvailableRadio-${ii}`}
                              name='ex1'
                              defaultChecked
                            />
                            <Label
                              className='form-check-label'
                              for={`CorporateOffice-AvailableRadio-${ii}`}
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
                              id={`CorporateOffice-SoldRadio-${ii}`}
                            />
                            <Label
                              className='form-check-label'
                              for={`CorporateOffice-SoldRadio-${ii}`}
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
                              id={`CorporateOffice-ResaleRadio-${ii}`}
                            />
                            <Label
                              className='form-check-label'
                              for={`CorporateOffice-ResaleRadio-${ii}`}
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
                              for={`CorporateOffice-Label-${ii}`}
                            >
                              CorporateOffice {ii + 1} Label
                            </Label>
                            <InputGroup className='mt-2'>
                              <InputGroupText>CorporateOffice-</InputGroupText>
                              <Input
                                type='text'
                                id={`CorporateOffice-Label-${ii}`}
                                placeholder='CorporateOffice #'
                                value={store.projectData.floors[
                                  props.i
                                ].corporateOffices[ii].label.replace(
                                  'CorporateOffice-',
                                  ''
                                )}
                                onChange={e => {
                                  dispatch(
                                    updateFloorInnerProperties([
                                      `CorporateOffice-${e.target.value}`,
                                      'floors',
                                      props.i,
                                      'corporateOffices',
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
                              for={`CorporateOffice-length-${ii}`}
                            >
                              length
                            </Label>
                            <Input
                              type='number'
                              id={`CorporateOffice-length-${ii}`}
                              placeholder='32'
                              value={
                                store.projectData.floors[props.i]
                                  .corporateOffices[ii].length
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'corporateOffices',
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
                              for={`CorporateOffice-width-${ii}`}
                            >
                              width
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`CorporateOffice-width-${ii}`}
                              placeholder='1'
                              value={
                                store.projectData.floors[props.i]
                                  .corporateOffices[ii].width
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'corporateOffices',
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
                              for={`CorporateOffice-TotalCoveredArea-${ii}`}
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
                                    .corporateOffices[ii].width *
                                  store.projectData.floors[props.i]
                                    .corporateOffices[ii].length
                                }
                                placeholder='0'
                                id={`CorporateOffice-TotalCoveredArea-${ii}`}
                              />
                            </InputGroup>
                            {/* fffffffffffffffffffff */}
                          </Col>
                          <Col md={3} className='mb-md-0 mb-1'>
                            <Label for={`CorporateOffice-TotalPrice-${ii}`}>
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
                                    .priceCorporateOffices *
                                  store.projectData.floors[props.i]
                                    .corporateOffices[ii].width *
                                  store.projectData.floors[props.i]
                                    .corporateOffices[ii].length
                                }
                                placeholder='0'
                                id={`CorporateOffice-TotalPrice-${ii}`}
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
                              for={`CorporateOffice-downPaymentPercentage-${ii}`}
                            >
                              Down Payment %
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`CorporateOffice-downPaymentPercentage-${ii}`}
                              placeholder='12'
                              value={
                                store.projectData.floors[props.i]
                                  .corporateOffices[ii].downPaymentPercentage
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
                                    .priceCorporateOffices *
                                  store.projectData.floors[props.i]
                                    .corporateOffices[ii].width *
                                  store.projectData.floors[props.i]
                                    .corporateOffices[ii].length *
                                  [
                                    store.projectData.floors[props.i]
                                      .corporateOffices[ii]
                                      .downPaymentPercentage / 100
                                  ]
                                }
                                placeholder='0'
                                id={`CorporateOffice-DownPayment-${ii}`}
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
                                id={`corporateOffices-monthlyPlan-${ii}`}
                                name='icon-primary'
                                checked={
                                  store.projectData.floors[props.i]
                                    .corporateOffices[ii].monthlyPlan
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorInnerProperties([
                                      e.target.checked,
                                      'floors',
                                      props.i,
                                      'corporateOffices',
                                      ii,
                                      'monthlyPlan'
                                    ])
                                  )
                                }}
                              />
                              <CustomLabel
                                htmlFor={`corporateOffices-monthlyPlan-${ii}`}
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
                              for={`CorporateOffice-MonthlyPlanMonthlyDuration-${ii}`}
                            >
                              Months
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`CorporateOffice-MonthlyPlanMonthlyDuration-${ii}`}
                              placeholder='1'
                              value={
                                store.projectData.floors[props.i]
                                  .corporateOffices[ii].monthlyDuration
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'corporateOffices',
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
                                        .priceCorporateOffices *
                                        store.projectData.floors[props.i]
                                          .corporateOffices[ii].width *
                                        store.projectData.floors[props.i]
                                          .corporateOffices[ii].length
                                    ] *
                                      [
                                        [
                                          100 -
                                            store.projectData.floors[props.i]
                                              .corporateOffices[ii]
                                              .downPaymentPercentage
                                        ] / 100
                                      ]
                                  ] /
                                  store.projectData.floors[props.i]
                                    .corporateOffices[ii].monthlyDuration
                                }
                                placeholder='0'
                                id={`CorporateOffice-MonthlyPlanInstallment-${ii}`}
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
                                id={`corporateOffices-quarterPlan-${ii}`}
                                name='icon-primary'
                                checked={
                                  store.projectData.floors[props.i]
                                    .corporateOffices[ii].quarterPlan
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorInnerProperties([
                                      e.target.checked,
                                      'floors',
                                      props.i,
                                      'corporateOffices',
                                      ii,
                                      'quarterPlan'
                                    ])
                                  )
                                }}
                              />
                              <CustomLabel
                                htmlFor={`corporateOffices-quarterPlan-${ii}`}
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
                              for={`CorporateOffice-QuarterPlanQuarterDuration-${ii}`}
                            >
                              Quarters
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`CorporateOffice-QuarterPlanQuarterDuration-${ii}`}
                              placeholder='1'
                              value={
                                store.projectData.floors[props.i]
                                  .corporateOffices[ii].quarterDuration
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'corporateOffices',
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
                                        .priceCorporateOffices *
                                        store.projectData.floors[props.i]
                                          .corporateOffices[ii].width *
                                        store.projectData.floors[props.i]
                                          .corporateOffices[ii].length
                                    ] *
                                      [
                                        [
                                          100 -
                                            store.projectData.floors[props.i]
                                              .corporateOffices[ii]
                                              .downPaymentPercentage
                                        ] / 100
                                      ]
                                  ] /
                                  store.projectData.floors[props.i]
                                    .corporateOffices[ii].quarterDuration
                                }
                                placeholder='0'
                                id={`CorporateOffice-QuarterPlanInstallment-${ii}`}
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
                                id={`corporateOffices-qmPlan-${ii}`}
                                name='icon-primary'
                                checked={
                                  store.projectData.floors[props.i]
                                    .corporateOffices[ii].qmPlan
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorInnerProperties([
                                      e.target.checked,
                                      'floors',
                                      props.i,
                                      'corporateOffices',
                                      ii,
                                      'qmPlan'
                                    ])
                                  )
                                }}
                              />
                              <CustomLabel
                                htmlFor={`corporateOffices-qmPlan-${ii}`}
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
                              for={`CorporateOffice-qmMonthlyPercentage-${ii}`}
                            >
                              Monthly %
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`CorporateOffice-qmMonthlyPercentage-${ii}`}
                              placeholder='12'
                              value={
                                store.projectData.floors[props.i]
                                  .corporateOffices[ii].qmMonthlyPercentage
                              }
                              onChange={e =>
                                CalculateQM_MonthlyPer(e, props.i, ii)
                              }
                            />
                          </Col>
                          <Col md={2} className='mb-md-0 mb-1'>
                            <Label
                              className='form-label'
                              for={`CorporateOffice-qmMonthlyDuration-${ii}`}
                            >
                              Duration (Month)
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`CorporateOffice-qmMonthlyDuration-${ii}`}
                              placeholder='1'
                              value={
                                store.projectData.floors[props.i]
                                  .corporateOffices[ii].qmMonthlyDuration
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'corporateOffices',
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
                                          .priceCorporateOffices *
                                          store.projectData.floors[props.i]
                                            .corporateOffices[ii].width *
                                          store.projectData.floors[props.i]
                                            .corporateOffices[ii].length
                                      ]
                                    ] *
                                      [
                                        store.projectData.floors[props.i]
                                          .corporateOffices[ii]
                                          .qmMonthlyPercentage / 100
                                      ]
                                  ] /
                                  store.projectData.floors[props.i]
                                    .corporateOffices[ii].qmMonthlyDuration
                                }
                                placeholder='0'
                                id={`CorporateOffice-QM_MonthlyInstallment-${ii}`}
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
                              for={`CorporateOffice-qmQuarterPercentage-${ii}`}
                            >
                              Quarter %
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`CorporateOffice-qmQuarterPercentage-${ii}`}
                              placeholder='12'
                              value={
                                store.projectData.floors[props.i]
                                  .corporateOffices[ii].qmQuarterPercentage
                              }
                              onChange={e =>
                                CalculateQM_QuarterPer(e, props.i, ii)
                              }
                            />
                          </Col>
                          <Col md={2} className='mb-md-0 mb-1'>
                            <Label
                              className='form-label'
                              for={`CorporateOffice-qmQuarterDuration-${ii}`}
                            >
                              Dur (Quarters)
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`CorporateOffice-qmQuarterDuration-${ii}`}
                              placeholder='1'
                              value={
                                store.projectData.floors[props.i]
                                  .corporateOffices[ii].qmQuarterDuration
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'corporateOffices',
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
                                          .priceCorporateOffices *
                                          store.projectData.floors[props.i]
                                            .corporateOffices[ii].width *
                                          store.projectData.floors[props.i]
                                            .corporateOffices[ii].length
                                      ]
                                    ] *
                                      [
                                        store.projectData.floors[props.i]
                                          .corporateOffices[ii]
                                          .qmQuarterPercentage / 100
                                      ]
                                  ] /
                                  store.projectData.floors[props.i]
                                    .corporateOffices[ii].qmQuarterDuration
                                }
                                placeholder='0'
                                id={`CorporateOffice-QM_QuarterInstallment-${ii}`}
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
                                id={`corporateOffices-amPlan-${ii}`}
                                name='icon-primary'
                                checked={
                                  store.projectData.floors[props.i]
                                    .corporateOffices[ii].amPlan
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorInnerProperties([
                                      e.target.checked,
                                      'floors',
                                      props.i,
                                      'corporateOffices',
                                      ii,
                                      'amPlan'
                                    ])
                                  )
                                }}
                              />
                              <CustomLabel
                                htmlFor={`corporateOffices-amPlan-${ii}`}
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
                              for={`CorporateOffice-amMonthlyPercentage-${ii}`}
                            >
                              Monthly %
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`CorporateOffice-amMonthlyPercentage-${ii}`}
                              placeholder='12'
                              value={
                                store.projectData.floors[props.i]
                                  .corporateOffices[ii].amMonthlyPercentage
                              }
                              onChange={e =>
                                CalculateAM_MonthlyPer(e, props.i, ii)
                              }
                            />
                          </Col>
                          <Col md={2} className='mb-md-0 mb-1'>
                            <Label
                              className='form-label'
                              for={`CorporateOffice-amMonthlyDuration-${ii}`}
                            >
                              Duration (Month)
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`CorporateOffice-amMonthlyDuration-${ii}`}
                              placeholder='1'
                              value={
                                store.projectData.floors[props.i]
                                  .corporateOffices[ii].amMonthlyDuration
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'corporateOffices',
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
                                          .priceCorporateOffices *
                                          store.projectData.floors[props.i]
                                            .corporateOffices[ii].width *
                                          store.projectData.floors[props.i]
                                            .corporateOffices[ii].length
                                      ]
                                    ] *
                                      [
                                        store.projectData.floors[props.i]
                                          .corporateOffices[ii]
                                          .amMonthlyPercentage / 100
                                      ]
                                  ] /
                                  store.projectData.floors[props.i]
                                    .corporateOffices[ii].amMonthlyDuration
                                }
                                placeholder='0'
                                id={`CorporateOffice-AM_MonthlyInstallment-${ii}`}
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
                              for={`CorporateOffice-amBiAnuallyPercentage-${ii}`}
                            >
                              Monthly %
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`CorporateOffice-amBiAnuallyPercentage-${ii}`}
                              placeholder='12'
                              value={
                                store.projectData.floors[props.i]
                                  .corporateOffices[ii].amBiAnuallyPercentage
                              }
                              onChange={e =>
                                CalculateAM_BiAnuallyPer(e, props.i, ii)
                              }
                            />
                          </Col>
                          <Col md={2} className='mb-md-0 mb-1'>
                            <Label
                              className='form-label'
                              for={`CorporateOffice-amBiAnuallyDuration-${ii}`}
                            >
                              Dur (Bi Annual)
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`CorporateOffice-amBiAnuallyDuration-${ii}`}
                              placeholder='1'
                              value={
                                store.projectData.floors[props.i]
                                  .corporateOffices[ii].amBiAnuallyDuration
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'corporateOffices',
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
                                          .priceCorporateOffices *
                                          store.projectData.floors[props.i]
                                            .corporateOffices[ii].width *
                                          store.projectData.floors[props.i]
                                            .corporateOffices[ii].length
                                      ]
                                    ] *
                                      [
                                        store.projectData.floors[props.i]
                                          .corporateOffices[ii]
                                          .amBiAnuallyPercentage / 100
                                      ]
                                  ] /
                                  store.projectData.floors[props.i]
                                    .corporateOffices[ii].amBiAnuallyDuration
                                }
                                placeholder='0'
                                id={`CorporateOffice-AM_BiAnuallyInstallment-${ii}`}
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
export default noCorporateOffices
