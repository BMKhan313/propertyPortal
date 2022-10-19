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

const noFoodCourts = props => {
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
        'foodCourts',
        ii,
        'qmMonthlyPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        100 -
          store.projectData.floors[props.i].foodCourts[ii]
            .downPaymentPercentage -
          Math.max(0, Math.min(100, Number(e.target.value))),
        'floors',
        i,
        'foodCourts',
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
        'foodCourts',
        ii,
        'qmQuarterPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        100 -
          store.projectData.floors[props.i].foodCourts[ii]
            .downPaymentPercentage -
          Math.max(0, Math.min(100, Number(e.target.value))),
        'floors',
        i,
        'foodCourts',
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
        'foodCourts',
        ii,
        'amMonthlyPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        100 -
          store.projectData.floors[props.i].foodCourts[ii]
            .downPaymentPercentage -
          Math.max(0, Math.min(100, Number(e.target.value))),
        'floors',
        i,
        'foodCourts',
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
        'foodCourts',
        ii,
        'amBiAnuallyPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        100 -
          store.projectData.floors[props.i].foodCourts[ii]
            .downPaymentPercentage -
          Math.max(0, Math.min(100, Number(e.target.value))),
        'floors',
        i,
        'foodCourts',
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
        'foodCourts',
        ii,
        'downPaymentPercentage'
      ])
    )

    dispatch(
      updateFloorInnerProperties([
        (100 - Math.max(0, Math.min(100, Number(e.target.value)))) / 2,
        'floors',
        props.i,
        'foodCourts',
        ii,
        'qmMonthlyPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        (100 - Math.max(0, Math.min(100, Number(e.target.value)))) / 2,
        'floors',
        props.i,
        'foodCourts',
        ii,
        'qmQuarterPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        (100 - Math.max(0, Math.min(100, Number(e.target.value)))) / 2,
        'floors',
        props.i,
        'foodCourts',
        ii,
        'amMonthlyPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        (100 - Math.max(0, Math.min(100, Number(e.target.value)))) / 2,
        'floors',
        props.i,
        'foodCourts',
        ii,
        'amBiAnuallyPercentage'
      ])
    )
  }
  return (
    <Row className='justify-content-between align-items-center'>
      {store.projectData.floors[props.i].noFoodCourts > 0 && (
        <Accordion className='accordion-border' open={open} toggle={toggleopen}>
          <Card>
            <CardHeader>
              <h4 className='card-title'>
                Total Food Courts:{' '}
                {store.projectData.floors[props.i].noFoodCourts}:{' '}
              </h4>
            </CardHeader>
            <CardBody>
              <Repeater count={store.projectData.floors[props.i].noFoodCourts}>
                {ii => (
                  <Form key={ii}>
                    <AccordionItem>
                      <AccordionHeader targetId={`${ii}`}>
                        FoodCourt {ii + 1}
                      </AccordionHeader>
                      <Row className='justify-content-between align-items-center'>
                        <Col md={2} className='mb-md-0 mb-1'></Col>
                        <Col md={2} className='mb-md-0 mb-1'>
                          <div className='form-check form-check-success'>
                            <Input
                              type='radio'
                              id={`FoodCourt-AvailableRadio-${ii}`}
                              name='ex1'
                              defaultChecked
                            />
                            <Label
                              className='form-check-label'
                              for={`FoodCourt-AvailableRadio-${ii}`}
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
                              id={`FoodCourt-SoldRadio-${ii}`}
                            />
                            <Label
                              className='form-check-label'
                              for={`FoodCourt-SoldRadio-${ii}`}
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
                              id={`FoodCourt-ResaleRadio-${ii}`}
                            />
                            <Label
                              className='form-check-label'
                              for={`FoodCourt-ResaleRadio-${ii}`}
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
                              for={`FoodCourt-Label-${ii}`}
                            >
                              FoodCourt {ii + 1} Label
                            </Label>
                            <InputGroup className='mt-2'>
                              <InputGroupText>FoodCourt-</InputGroupText>
                              <Input
                                type='text'
                                id={`FoodCourt-Label-${ii}`}
                                placeholder='FoodCourt #'
                                value={store.projectData.floors[
                                  props.i
                                ].foodCourts[ii].label?.replace(
                                  'FoodCourt-',
                                  ''
                                )}
                                onChange={e => {
                                  dispatch(
                                    updateFloorInnerProperties([
                                      `FoodCourt-${e.target.value}`,
                                      'floors',
                                      props.i,
                                      'foodCourts',
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
                              for={`FoodCourt-length-${ii}`}
                            >
                              length
                            </Label>
                            <Input
                              type='number'
                              id={`FoodCourt-length-${ii}`}
                              placeholder='32'
                              value={
                                store.projectData.floors[props.i].foodCourts[ii]
                                  .length
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'foodCourts',
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
                              for={`FoodCourt-width-${ii}`}
                            >
                              width
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`FoodCourt-width-${ii}`}
                              placeholder='1'
                              value={
                                store.projectData.floors[props.i].foodCourts[ii]
                                  .width
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'foodCourts',
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
                              for={`FoodCourt-TotalCoveredArea-${ii}`}
                            >
                              Total Covered Area
                            </Label>

                            <InputGroup>
                              <InputGroupText>Sq.Ft</InputGroupText>
                              <Input
                                readonly
                                className='form-control'
                                value={
                                  store.projectData.floors[props.i].foodCourts[
                                    ii
                                  ].width *
                                  store.projectData.floors[props.i].foodCourts[
                                    ii
                                  ].length
                                }
                                placeholder='0'
                                id={`FoodCourt-TotalCoveredArea-${ii}`}
                              />
                            </InputGroup>
                            {/* fffffffffffffffffffff */}
                          </Col>
                          <Col md={3} className='mb-md-0 mb-1'>
                            <Label for={`FoodCourt-TotalPrice-${ii}`}>
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
                                    .priceFoodCourts *
                                  store.projectData.floors[props.i].foodCourts[
                                    ii
                                  ].width *
                                  store.projectData.floors[props.i].foodCourts[
                                    ii
                                  ].length
                                }
                                placeholder='0'
                                id={`FoodCourt-TotalPrice-${ii}`}
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
                              for={`FoodCourt-downPaymentPercentage-${ii}`}
                            >
                              Down Payment %
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`FoodCourt-downPaymentPercentage-${ii}`}
                              placeholder='12'
                              value={
                                store.projectData.floors[props.i].foodCourts[ii]
                                  .downPaymentPercentage
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
                                    .priceFoodCourts *
                                  store.projectData.floors[props.i].foodCourts[
                                    ii
                                  ].width *
                                  store.projectData.floors[props.i].foodCourts[
                                    ii
                                  ].length *
                                  [
                                    store.projectData.floors[props.i]
                                      .foodCourts[ii].downPaymentPercentage /
                                      100
                                  ]
                                }
                                placeholder='0'
                                id={`FoodCourt-DownPayment-${ii}`}
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
                                id={`foodCourts-monthlyPlan-${ii}`}
                                name='icon-primary'
                                checked={
                                  store.projectData.floors[props.i].foodCourts[
                                    ii
                                  ].monthlyPlan
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorInnerProperties([
                                      e.target.checked,
                                      'floors',
                                      props.i,
                                      'foodCourts',
                                      ii,
                                      'monthlyPlan'
                                    ])
                                  )
                                }}
                              />
                              <CustomLabel
                                htmlFor={`foodCourts-monthlyPlan-${ii}`}
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
                              for={`FoodCourt-MonthlyPlanMonthlyDuration-${ii}`}
                            >
                              Months
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`FoodCourt-MonthlyPlanMonthlyDuration-${ii}`}
                              placeholder='1'
                              value={
                                store.projectData.floors[props.i].foodCourts[ii]
                                  .monthlyDuration
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'foodCourts',
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
                                        .priceFoodCourts *
                                        store.projectData.floors[props.i]
                                          .foodCourts[ii].width *
                                        store.projectData.floors[props.i]
                                          .foodCourts[ii].length
                                    ] *
                                      [
                                        [
                                          100 -
                                            store.projectData.floors[props.i]
                                              .foodCourts[ii]
                                              .downPaymentPercentage
                                        ] / 100
                                      ]
                                  ] /
                                  store.projectData.floors[props.i].foodCourts[
                                    ii
                                  ].monthlyDuration
                                }
                                placeholder='0'
                                id={`FoodCourt-MonthlyPlanInstallment-${ii}`}
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
                                id={`foodCourts-quarterPlan-${ii}`}
                                name='icon-primary'
                                checked={
                                  store.projectData.floors[props.i].foodCourts[
                                    ii
                                  ].quarterPlan
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorInnerProperties([
                                      e.target.checked,
                                      'floors',
                                      props.i,
                                      'foodCourts',
                                      ii,
                                      'quarterPlan'
                                    ])
                                  )
                                }}
                              />
                              <CustomLabel
                                htmlFor={`foodCourts-quarterPlan-${ii}`}
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
                              for={`FoodCourt-QuarterPlanQuarterDuration-${ii}`}
                            >
                              Quarters
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`FoodCourt-QuarterPlanQuarterDuration-${ii}`}
                              placeholder='1'
                              value={
                                store.projectData.floors[props.i].foodCourts[ii]
                                  .quarterDuration
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'foodCourts',
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
                                        .priceFoodCourts *
                                        store.projectData.floors[props.i]
                                          .foodCourts[ii].width *
                                        store.projectData.floors[props.i]
                                          .foodCourts[ii].length
                                    ] *
                                      [
                                        [
                                          100 -
                                            store.projectData.floors[props.i]
                                              .foodCourts[ii]
                                              .downPaymentPercentage
                                        ] / 100
                                      ]
                                  ] /
                                  store.projectData.floors[props.i].foodCourts[
                                    ii
                                  ].quarterDuration
                                }
                                placeholder='0'
                                id={`FoodCourt-QuarterPlanInstallment-${ii}`}
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
                                id={`foodCourts-qmPlan-${ii}`}
                                name='icon-primary'
                                checked={
                                  store.projectData.floors[props.i].foodCourts[
                                    ii
                                  ].qmPlan
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorInnerProperties([
                                      e.target.checked,
                                      'floors',
                                      props.i,
                                      'foodCourts',
                                      ii,
                                      'qmPlan'
                                    ])
                                  )
                                }}
                              />
                              <CustomLabel
                                htmlFor={`foodCourts-qmPlan-${ii}`}
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
                              for={`FoodCourt-qmMonthlyPercentage-${ii}`}
                            >
                              Monthly %
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`FoodCourt-qmMonthlyPercentage-${ii}`}
                              placeholder='12'
                              value={
                                store.projectData.floors[props.i].foodCourts[ii]
                                  .qmMonthlyPercentage
                              }
                              onChange={e =>
                                CalculateQM_MonthlyPer(e, props.i, ii)
                              }
                            />
                          </Col>
                          <Col md={2} className='mb-md-0 mb-1'>
                            <Label
                              className='form-label'
                              for={`FoodCourt-qmMonthlyDuration-${ii}`}
                            >
                              Duration (Month)
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`FoodCourt-qmMonthlyDuration-${ii}`}
                              placeholder='1'
                              value={
                                store.projectData.floors[props.i].foodCourts[ii]
                                  .qmMonthlyDuration
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'foodCourts',
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
                                          .priceFoodCourts *
                                          store.projectData.floors[props.i]
                                            .foodCourts[ii].width *
                                          store.projectData.floors[props.i]
                                            .foodCourts[ii].length
                                      ]
                                    ] *
                                      [
                                        store.projectData.floors[props.i]
                                          .foodCourts[ii].qmMonthlyPercentage /
                                          100
                                      ]
                                  ] /
                                  store.projectData.floors[props.i].foodCourts[
                                    ii
                                  ].qmMonthlyDuration
                                }
                                placeholder='0'
                                id={`FoodCourt-QM_MonthlyInstallment-${ii}`}
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
                              for={`FoodCourt-qmQuarterPercentage-${ii}`}
                            >
                              Quarter %
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`FoodCourt-qmQuarterPercentage-${ii}`}
                              placeholder='12'
                              value={
                                store.projectData.floors[props.i].foodCourts[ii]
                                  .qmQuarterPercentage
                              }
                              onChange={e =>
                                CalculateQM_QuarterPer(e, props.i, ii)
                              }
                            />
                          </Col>
                          <Col md={2} className='mb-md-0 mb-1'>
                            <Label
                              className='form-label'
                              for={`FoodCourt-qmQuarterDuration-${ii}`}
                            >
                              Dur (Quarters)
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`FoodCourt-qmQuarterDuration-${ii}`}
                              placeholder='1'
                              value={
                                store.projectData.floors[props.i].foodCourts[ii]
                                  .qmQuarterDuration
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'foodCourts',
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
                                          .priceFoodCourts *
                                          store.projectData.floors[props.i]
                                            .foodCourts[ii].width *
                                          store.projectData.floors[props.i]
                                            .foodCourts[ii].length
                                      ]
                                    ] *
                                      [
                                        store.projectData.floors[props.i]
                                          .foodCourts[ii].qmQuarterPercentage /
                                          100
                                      ]
                                  ] /
                                  store.projectData.floors[props.i].foodCourts[
                                    ii
                                  ].qmQuarterDuration
                                }
                                placeholder='0'
                                id={`FoodCourt-QM_QuarterInstallment-${ii}`}
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
                                id={`foodCourts-amPlan-${ii}`}
                                name='icon-primary'
                                checked={
                                  store.projectData.floors[props.i].foodCourts[
                                    ii
                                  ].amPlan
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorInnerProperties([
                                      e.target.checked,
                                      'floors',
                                      props.i,
                                      'foodCourts',
                                      ii,
                                      'amPlan'
                                    ])
                                  )
                                }}
                              />
                              <CustomLabel
                                htmlFor={`foodCourts-amPlan-${ii}`}
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
                              for={`FoodCourt-amMonthlyPercentage-${ii}`}
                            >
                              Monthly %
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`FoodCourt-amMonthlyPercentage-${ii}`}
                              placeholder='12'
                              value={
                                store.projectData.floors[props.i].foodCourts[ii]
                                  .amMonthlyPercentage
                              }
                              onChange={e =>
                                CalculateAM_MonthlyPer(e, props.i, ii)
                              }
                            />
                          </Col>
                          <Col md={2} className='mb-md-0 mb-1'>
                            <Label
                              className='form-label'
                              for={`FoodCourt-amMonthlyDuration-${ii}`}
                            >
                              Duration (Month)
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`FoodCourt-amMonthlyDuration-${ii}`}
                              placeholder='1'
                              value={
                                store.projectData.floors[props.i].foodCourts[ii]
                                  .amMonthlyDuration
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'foodCourts',
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
                                          .priceFoodCourts *
                                          store.projectData.floors[props.i]
                                            .foodCourts[ii].width *
                                          store.projectData.floors[props.i]
                                            .foodCourts[ii].length
                                      ]
                                    ] *
                                      [
                                        store.projectData.floors[props.i]
                                          .foodCourts[ii].amMonthlyPercentage /
                                          100
                                      ]
                                  ] /
                                  store.projectData.floors[props.i].foodCourts[
                                    ii
                                  ].amMonthlyDuration
                                }
                                placeholder='0'
                                id={`FoodCourt-AM_MonthlyInstallment-${ii}`}
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
                              for={`FoodCourt-amBiAnuallyPercentage-${ii}`}
                            >
                              Monthly %
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`FoodCourt-amBiAnuallyPercentage-${ii}`}
                              placeholder='12'
                              value={
                                store.projectData.floors[props.i].foodCourts[ii]
                                  .amBiAnuallyPercentage
                              }
                              onChange={e =>
                                CalculateAM_BiAnuallyPer(e, props.i, ii)
                              }
                            />
                          </Col>
                          <Col md={2} className='mb-md-0 mb-1'>
                            <Label
                              className='form-label'
                              for={`FoodCourt-amBiAnuallyDuration-${ii}`}
                            >
                              Dur (Bi Annual)
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`FoodCourt-amBiAnuallyDuration-${ii}`}
                              placeholder='1'
                              value={
                                store.projectData.floors[props.i].foodCourts[ii]
                                  .amBiAnuallyDuration
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'foodCourts',
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
                                          .priceFoodCourts *
                                          store.projectData.floors[props.i]
                                            .foodCourts[ii].width *
                                          store.projectData.floors[props.i]
                                            .foodCourts[ii].length
                                      ]
                                    ] *
                                      [
                                        store.projectData.floors[props.i]
                                          .foodCourts[ii]
                                          .amBiAnuallyPercentage / 100
                                      ]
                                  ] /
                                  store.projectData.floors[props.i].foodCourts[
                                    ii
                                  ].amBiAnuallyDuration
                                }
                                placeholder='0'
                                id={`FoodCourt-AM_BiAnuallyInstallment-${ii}`}
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
export default noFoodCourts
