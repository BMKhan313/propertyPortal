//
// ** React Imports
import { Fragment, useState, useContext } from 'react'

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs'

// ** Utils
import { selectThemeColors } from '@utils'

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

const noShops = props => {
  // ** Store Variables
  const dispatch = useDispatch()
  const store = useSelector(state => state.addNewProject)

  const [sold, setSold] = useState('')
  const [available, setAvailable] = useState('')
  const [resale, setResale] = useState('')
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
  // useEffect(() => {

  // }, [])

  const CalculateQM_MonthlyPer = (e, i, ii) => {
    dispatch(
      updateFloorInnerProperties([
        Math.max(0, Math.min(100, Number(e.target.value))),

        'floors',
        i,
        'shops',
        ii,
        'qmMonthlyPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        100 -
          store.projectData.floors[props.i].shops[ii].downPaymentPercentage -
          Math.max(0, Math.min(100, Number(e.target.value))),
        'floors',
        i,
        'shops',
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
        'shops',
        ii,
        'qmQuarterPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        100 -
          store.projectData.floors[props.i].shops[ii].downPaymentPercentage -
          Math.max(0, Math.min(100, Number(e.target.value))),
        'floors',
        i,
        'shops',
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
        'shops',
        ii,
        'amMonthlyPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        100 -
          store.projectData.floors[props.i].shops[ii].downPaymentPercentage -
          Math.max(0, Math.min(100, Number(e.target.value))),
        'floors',
        i,
        'shops',
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
        'shops',
        ii,
        'amBiAnuallyPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        100 -
          store.projectData.floors[props.i].shops[ii].downPaymentPercentage -
          Math.max(0, Math.min(100, Number(e.target.value))),
        'floors',
        i,
        'shops',
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
        'shops',
        ii,
        'downPaymentPercentage'
      ])
    )

    dispatch(
      updateFloorInnerProperties([
        (100 - Math.max(0, Math.min(100, Number(e.target.value)))) / 2,
        'floors',
        props.i,
        'shops',
        ii,
        'qmMonthlyPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        (100 - Math.max(0, Math.min(100, Number(e.target.value)))) / 2,
        'floors',
        props.i,
        'shops',
        ii,
        'qmQuarterPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        (100 - Math.max(0, Math.min(100, Number(e.target.value)))) / 2,
        'floors',
        props.i,
        'shops',
        ii,
        'amMonthlyPercentage'
      ])
    )
    dispatch(
      updateFloorInnerProperties([
        (100 - Math.max(0, Math.min(100, Number(e.target.value)))) / 2,
        'floors',
        props.i,
        'shops',
        ii,
        'amBiAnuallyPercentage'
      ])
    )
  }
  return (
    <Row className='justify-content-between align-items-center'>
      {store.projectData.floors[props.i].noShops > 0 && (
        <Accordion className='accordion-border' open={open} toggle={toggleopen}>
          <Card>
            <CardHeader>
              <h4 className='card-title'>
                Total shops: {store.projectData.floors[props.i].noShops}:{' '}
              </h4>
            </CardHeader>
            <CardBody>
              <Repeater count={store.projectData.floors[props.i].noShops}>
                {ii => (
                  <Form key={ii}>
                    <AccordionItem>
                      <AccordionHeader targetId={`${ii}`}>
                        Shop {ii + 1}
                      </AccordionHeader>
                      <Row className='justify-content-between align-items-center'>
                        <Col md={2} className='mb-md-0 mb-1'></Col>
                        <Col md={2} className='mb-md-0 mb-1'>
                          <div className='form-check form-check-success'>
                            <Input
                              type='radio'
                              id={`Shop-AvailableRadio-${ii}`}
                              value='Available'
                              name='ex1'
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'shops',
                                    ii,
                                    'status'
                                  ])
                                )
                              }}
                              checked={true}
                            />
                            <Label
                              className='form-check-label'
                              for={`Shop-AvailableRadio-${ii}`}
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
                              id={`Shop-SoldRadio-${ii}`}
                              value='Sold'
                              // checked={
                              //   store.projectData.floors[props.i].shops[ii]
                              //     .status === 'Sold'
                              //     ? 'true'
                              //     : 'false'
                              // }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'shops',
                                    ii,
                                    'status'
                                  ])
                                )
                              }}
                            />
                            <Label
                              className='form-check-label'
                              for={`Shop-SoldRadio-${ii}`}
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
                              id={`Shop-ResaleRadio-${ii}`}
                              value='Resale'
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'shops',
                                    ii,
                                    'status'
                                  ])
                                )
                              }}
                            />
                            <Label
                              className='form-check-label'
                              for={`Shop-ResaleRadio-${ii}`}
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
                              for={`Shop-Label-${ii}`}
                            >
                              Shop {ii + 1} Label
                            </Label>
                            <InputGroup className='mt-2'>
                              <InputGroupText>Shop-</InputGroupText>

                              <Input
                                type='text'
                                id={`Shop-Label-${ii}`}
                                placeholder='Shop #'
                                value={store.projectData.floors[props.i].shops[ii].label?.replace('Shop-', '')}
                                onChange={e => {
                                  dispatch(
                                    updateFloorInnerProperties([
                                      `Shop-${e.target.value}`,
                                      'floors',
                                      props.i,
                                      'shops',
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
                              for={`Shop-length-${ii}`}
                            >
                              length
                            </Label>
                            <Input
                              type='number'
                              id={`Shop-length-${ii}`}
                              placeholder='32'
                              value={
                                store.projectData.floors[props.i].shops[ii]
                                  .length
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'shops',
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
                              for={`Shop-width-${ii}`}
                            >
                              width
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`Shop-width-${ii}`}
                              placeholder='1'
                              value={
                                store.projectData.floors[props.i].shops[ii]
                                  .width
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'shops',
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
                              for={`Shop-TotalCoveredArea-${ii}`}
                            >
                              Total Covered Area
                            </Label>

                            <InputGroup>
                              <InputGroupText>Sq.Ft</InputGroupText>
                              <Input
                                readonly
                                className='form-control'
                                value={
                                  store.projectData.floors[props.i].shops[ii]
                                    .width *
                                  store.projectData.floors[props.i].shops[ii]
                                    .length
                                }
                                placeholder='0'
                                id={`Shop-TotalCoveredArea-${ii}`}
                              />
                            </InputGroup>
                            {/* fffffffffffffffffffff */}
                          </Col>
                          <Col md={3} className='mb-md-0 mb-1'>
                            <Label for={`Shop-TotalPrice-${ii}`}>
                              {' '}
                              Total Price
                            </Label>
                            <InputGroup>
                              <InputGroupText>PKR</InputGroupText>
                              <Input
                                // readOnly='true'
                                readonly
                                className='form-control'
                                value={[
                                  store.projectData.floors[props.i].priceShops *
                                    store.projectData.floors[props.i].shops[ii]
                                      .width *
                                    store.projectData.floors[props.i].shops[ii]
                                      .length
                                ].toLocaleString(undefined, {
                                  maximumFractionDigits: 2
                                })}
                                placeholder='0'
                                id={`Shop-TotalPrice-${ii}`}
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
                              <CardTitle>Payment Plan</CardTitle>
                            </CardHeader>
                          </Col>
                          <Col md={2} className='mb-md-0 mb-1'>
                            <Label
                              className='form-label'
                              for={`Shop-downPaymentPercentage-${ii}`}
                            >
                              Down Payment %
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`Shop-downPaymentPercentage-${ii}`}
                              placeholder='12'
                              value={
                                store.projectData.floors[props.i].shops[ii]
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
                                value={[
                                  store.projectData.floors[props.i].priceShops *
                                    store.projectData.floors[props.i].shops[ii]
                                      .width *
                                    store.projectData.floors[props.i].shops[ii]
                                      .length *
                                    [
                                      store.projectData.floors[props.i].shops[
                                        ii
                                      ].downPaymentPercentage / 100
                                    ]
                                ].toLocaleString(undefined, {
                                  maximumFractionDigits: 2
                                })}
                                placeholder='0'
                                id={`Shop-DownPayment-${ii}`}
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
                                id={`Shop-monthlyPlan-${ii}`}
                                name='icon-primary'
                                checked={
                                  store.projectData.floors[props.i].shops[ii]
                                    .monthlyPlan
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorInnerProperties([
                                      e.target.checked,
                                      'floors',
                                      props.i,
                                      'shops',
                                      ii,
                                      'monthlyPlan'
                                    ])
                                  )
                                }}
                              />
                              <CustomLabel htmlFor={`Shop-monthlyPlan-${ii}`} />
                            </div>
                          </Col>
                        </Row>
                        <Row className='justify-content-between align-items-center'>
                          <Col md={4} className='mb-md-0 mb-1'>
                            <CardHeader className='align-items-center'>
                              <CardTitle>Monthly Plan</CardTitle>
                            </CardHeader>
                          </Col>
                          <Col md={2} className='mb-md-0 mb-1'>
                            <Label
                              className='form-label'
                              for={`Shop-MonthlyPlanMonthlyDuration-${ii}`}
                            >
                              Months
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`Shop-MonthlyPlanMonthlyDuration-${ii}`}
                              placeholder='1'
                              value={
                                store.projectData.floors[props.i].shops[ii]
                                  .monthlyDuration
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'shops',
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
                                value={[
                                  [
                                    [
                                      store.projectData.floors[props.i]
                                        .priceShops *
                                        store.projectData.floors[props.i].shops[
                                          ii
                                        ].width *
                                        store.projectData.floors[props.i].shops[
                                          ii
                                        ].length
                                    ] *
                                      [
                                        [
                                          100 -
                                            store.projectData.floors[props.i]
                                              .shops[ii].downPaymentPercentage
                                        ] / 100
                                      ]
                                  ] /
                                    store.projectData.floors[props.i].shops[ii]
                                      .monthlyDuration
                                ].toLocaleString(undefined, {
                                  maximumFractionDigits: 2
                                })}
                                placeholder='0'
                                id={`Shop-MonthlyPlanInstallment-${ii}`}
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
                                id={`shops-quarterPlan-${ii}`}
                                name='icon-primary'
                                checked={
                                  store.projectData.floors[props.i].shops[ii]
                                    .quarterPlan
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorInnerProperties([
                                      e.target.checked,
                                      'floors',
                                      props.i,
                                      'shops',
                                      ii,
                                      'quarterPlan'
                                    ])
                                  )
                                }}
                              />
                              <CustomLabel
                                htmlFor={`shops-quarterPlan-${ii}`}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row className='justify-content-between align-items-center'>
                          <Col md={4} className='mb-md-0 mb-1'>
                            <CardHeader className='align-items-center'>
                              <CardTitle>Quarter Plan</CardTitle>
                            </CardHeader>
                          </Col>
                          <Col md={2} className='mb-md-0 mb-1'>
                            <Label
                              className='form-label'
                              for={`Shop-QuarterPlanQuarterDuration-${ii}`}
                            >
                              Quarters
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`Shop-QuarterPlanQuarterDuration-${ii}`}
                              placeholder='1'
                              value={
                                store.projectData.floors[props.i].shops[ii]
                                  .quarterDuration
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'shops',
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
                                value={[
                                  [
                                    [
                                      store.projectData.floors[props.i]
                                        .priceShops *
                                        store.projectData.floors[props.i].shops[
                                          ii
                                        ].width *
                                        store.projectData.floors[props.i].shops[
                                          ii
                                        ].length
                                    ] *
                                      [
                                        [
                                          100 -
                                            store.projectData.floors[props.i]
                                              .shops[ii].downPaymentPercentage
                                        ] / 100
                                      ]
                                  ] /
                                    store.projectData.floors[props.i].shops[ii]
                                      .quarterDuration
                                ].toLocaleString(undefined, {
                                  maximumFractionDigits: 2
                                })}
                                placeholder='0'
                                id={`Shop-QuarterPlanInstallment-${ii}`}
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
                                id={`shops-qmPlan-${ii}`}
                                name='icon-primary'
                                checked={
                                  store.projectData.floors[props.i].shops[ii]
                                    .qmPlan
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorInnerProperties([
                                      e.target.checked,
                                      'floors',
                                      props.i,
                                      'shops',
                                      ii,
                                      'qmPlan'
                                    ])
                                  )
                                }}
                              />
                              <CustomLabel htmlFor={`shops-qmPlan-${ii}`} />
                            </div>
                          </Col>
                        </Row>
                        <Row className='justify-content-between align-items-center'>
                          <Col md={4} className='mb-md-0 mb-1'>
                            <CardHeader className='align-items-center'>
                              <CardTitle>Month and Quarter Plan</CardTitle>
                            </CardHeader>
                          </Col>
                          <Col md={2} className='mb-md-0 mb-1'>
                            <Label
                              className='form-label'
                              for={`Shop-qmMonthlyPercentage-${ii}`}
                            >
                              Monthly %
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`Shop-qmMonthlyPercentage-${ii}`}
                              placeholder='12'
                              value={
                                store.projectData.floors[props.i].shops[ii]
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
                              for={`Shop-qmMonthlyDuration-${ii}`}
                            >
                              Duration (Month)
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`Shop-qmMonthlyDuration-${ii}`}
                              placeholder='1'
                              value={
                                store.projectData.floors[props.i].shops[ii]
                                  .qmMonthlyDuration
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'shops',
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
                                value={[
                                  [
                                    [
                                      [
                                        store.projectData.floors[props.i]
                                          .priceShops *
                                          store.projectData.floors[props.i]
                                            .shops[ii].width *
                                          store.projectData.floors[props.i]
                                            .shops[ii].length
                                      ]
                                    ] *
                                      [
                                        store.projectData.floors[props.i].shops[
                                          ii
                                        ].qmMonthlyPercentage / 100
                                      ]
                                  ] /
                                    store.projectData.floors[props.i].shops[ii]
                                      .qmMonthlyDuration
                                ].toLocaleString(undefined, {
                                  maximumFractionDigits: 2
                                })}
                                placeholder='0'
                                id={`Shop-QM_MonthlyInstallment-${ii}`}
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
                              for={`Shop-qmQuarterPercentage-${ii}`}
                            >
                              Quarter %
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`Shop-qmQuarterPercentage-${ii}`}
                              placeholder='12'
                              value={
                                store.projectData.floors[props.i].shops[ii]
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
                              for={`Shop-qmQuarterDuration-${ii}`}
                            >
                              Dur (Quarters)
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`Shop-qmQuarterDuration-${ii}`}
                              placeholder='1'
                              value={
                                store.projectData.floors[props.i].shops[ii]
                                  .qmQuarterDuration
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'shops',
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
                                value={[
                                  [
                                    [
                                      [
                                        store.projectData.floors[props.i]
                                          .priceShops *
                                          store.projectData.floors[props.i]
                                            .shops[ii].width *
                                          store.projectData.floors[props.i]
                                            .shops[ii].length
                                      ]
                                    ] *
                                      [
                                        store.projectData.floors[props.i].shops[
                                          ii
                                        ].qmQuarterPercentage / 100
                                      ]
                                  ] /
                                    store.projectData.floors[props.i].shops[ii]
                                      .qmQuarterDuration
                                ].toLocaleString(undefined, {
                                  maximumFractionDigits: 2
                                })}
                                placeholder='0'
                                id={`Shop-QM_QuarterInstallment-${ii}`}
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
                                id={`shops-amPlan-${ii}`}
                                name='icon-primary'
                                checked={
                                  store.projectData.floors[props.i].shops[ii]
                                    .amPlan
                                }
                                onChange={e => {
                                  dispatch(
                                    updateFloorInnerProperties([
                                      e.target.checked,
                                      'floors',
                                      props.i,
                                      'shops',
                                      ii,
                                      'amPlan'
                                    ])
                                  )
                                }}
                              />
                              <CustomLabel htmlFor={`shops-amPlan-${ii}`} />
                            </div>
                          </Col>
                        </Row>

                        <Row className='justify-content-between align-items-center'>
                          <Col md={4} className='mb-md-0 mb-1'>
                            <CardHeader className='align-items-center'>
                              <CardTitle>Month and Bi-Annually Plan</CardTitle>
                            </CardHeader>
                          </Col>
                          <Col md={2} className='mb-md-0 mb-1'>
                            <Label
                              className='form-label'
                              for={`Shop-amMonthlyPercentage-${ii}`}
                            >
                              Monthly %
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`Shop-amMonthlyPercentage-${ii}`}
                              placeholder='12'
                              value={
                                store.projectData.floors[props.i].shops[ii]
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
                              for={`Shop-amMonthlyDuration-${ii}`}
                            >
                              Duration (Month)
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`Shop-amMonthlyDuration-${ii}`}
                              placeholder='1'
                              value={
                                store.projectData.floors[props.i].shops[ii]
                                  .amMonthlyDuration
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'shops',
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
                                value={[
                                  [
                                    [
                                      [
                                        store.projectData.floors[props.i]
                                          .priceShops *
                                          store.projectData.floors[props.i]
                                            .shops[ii].width *
                                          store.projectData.floors[props.i]
                                            .shops[ii].length
                                      ]
                                    ] *
                                      [
                                        store.projectData.floors[props.i].shops[
                                          ii
                                        ].amMonthlyPercentage / 100
                                      ]
                                  ] /
                                    store.projectData.floors[props.i].shops[ii]
                                      .amMonthlyDuration
                                ].toLocaleString(undefined, {
                                  maximumFractionDigits: 2
                                })}
                                placeholder='0'
                                id={`Shop-AM_MonthlyInstallment-${ii}`}
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
                              for={`Shop-amBiAnuallyPercentage-${ii}`}
                            >
                              Monthly %
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`Shop-amBiAnuallyPercentage-${ii}`}
                              placeholder='12'
                              value={
                                store.projectData.floors[props.i].shops[ii]
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
                              for={`Shop-amBiAnuallyDuration-${ii}`}
                            >
                              Dur (Bi Annual)
                            </Label>
                            <Input
                              className='form-control'
                              type='number'
                              id={`Shop-amBiAnuallyDuration-${ii}`}
                              placeholder='1'
                              value={
                                store.projectData.floors[props.i].shops[ii]
                                  .amBiAnuallyDuration
                              }
                              onChange={e => {
                                dispatch(
                                  updateFloorInnerProperties([
                                    e.target.value,
                                    'floors',
                                    props.i,
                                    'shops',
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
                                defaultValue='0.00'
                                value={[
                                  [
                                    [
                                      [
                                        store.projectData.floors[props.i]
                                          .priceShops *
                                          store.projectData.floors[props.i]
                                            .shops[ii].width *
                                          store.projectData.floors[props.i]
                                            .shops[ii].length
                                      ]
                                    ] *
                                      [
                                        store.projectData.floors[props.i].shops[
                                          ii
                                        ].amBiAnuallyPercentage / 100
                                      ]
                                  ] /
                                    store.projectData.floors[props.i].shops[ii]
                                      .amBiAnuallyDuration
                                ].toLocaleString(undefined, {
                                  maximumFractionDigits: 2
                                })}
                                placeholder='0'
                                id={`Shop-AM_BiAnuallyInstallment-${ii}`}
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
export default noShops
