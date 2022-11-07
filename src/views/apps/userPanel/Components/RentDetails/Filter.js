import { Button, Col, Input, Label, Row} from 'reactstrap'
import React, { useState } from 'react'
import '../../User.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import {Box, Typography} from '@mui/material'
import Modal from '@mui/material/Modal'
import Slider from '@mui/material/Slider'
import store, { getAreaRanges, getDownPaymentAmount } from '../../../adminPortal/redux/addNewProject/store'
import { useDispatch, useSelector } from 'react-redux'
import { getPriceRangesFromFilter,getValuesFromUserFilter } from '../../../adminPortal/redux/addNewProject/store'

const style = {
  position: 'absolute',
  top: '50%',
  left: '60%',
  transform: 'translate(-60%, -40%)',
  width: 380,
  bgcolor: 'background.paper',
  border: '2px solid #0000ff80',
  boxShadow: 24,
  p: 4,
  borderRadius: 3
}

const marks = [
    {
      value: 0,
      label: '0'
    },
    {
      value: 200000,
      label: '2 lac'
    },
    {
      value: 400000,
      label: '4 lac'
    },
    {
      value: 600000,
      label: '6 lac'
    },
    {
        value: 800000,
        label: '8 lac'
    },
    {
        value: 1000000,
        label: '10 lac'
    }
  ]

  const areaMarks = [
    {
      value: 0,
      label: '0'
    },
    {
      value: 300,
      label: '300'
    },
    {
      value: 600,
      label: '600'
    },
    {
      value: 900,
      label: '900'
    },
    {
        value: 1200,
        label: '1200'
    },
    {
        value: 1500,
        label: '1500'
    },{
      value: 1800,
      label: '1800'
  },{
    value: 2100,
    label: '2100'
},{
  value: 2400,
  label: '2400'
},{
  value: 2700,
  label: '2700'
},{
  value: 3000,
  label: '3000'
},{
  value: 3300,
  label: '3300'
}
  ]

  function valuetext(value) {
    return `${value}`
  }

  function valueAreaText(value) {
    return `${value}`
  }

const Filter = () => {

  const store = useSelector(state => state.addNewProject)
  const dispatch = useDispatch()

  const [plotPrice, setPlotPrice] = useState([0,1000000])
  const [areaRange, setAreaRange] = useState(3300)
  const [downPaymentAmount, setDownPaymentAmount] = useState(0)
  // const [maxPrice, setMaxPrice] = useState(6000)

    const [openArea, setOpenArea] = useState(false)
    const [openPrice, setOpenPrice] = useState(false)
    const [openDownPayment, setOpenDownPayment] = useState(false)
    const [openSizeRange, setOpenSizeRange] = useState(false)
   
    const handleOpenArea = () => setOpenArea(true)
    const handleCloseArea = () => setOpenArea(false)

    const handleOpenPrice = () => setOpenPrice(true)
    const handleClosePrice = () => setOpenPrice(false)

    const handleOpenDownPaymentAmount = () => setOpenDownPayment(true)
    const handleCloseDownPaymentAmount = () => setOpenDownPayment(false)

    const handleOpenSizeRange = () => setOpenSizeRange(true)
    const handleCloseSizeRange = () => setOpenSizeRange(false)
    // console.log('my plot price',plotPrice)
    // console.log('value text',valuetext)

   const handlePriceChange = (event, newValue) =>{
    //  console.log(newValue)
     setPlotPrice(newValue);
      dispatch(
         getPriceRangesFromFilter({
            priceLowRange: newValue[0],
            priceHighRange: newValue[1]
           })
      )

      // console.log('pricerange...bmk',store.userPanel.priceRanges.priceHighRange)
    }
  // area change handling
   const handleAreaChange = (event,newValue) => {
          setAreaRange(newValue);

          dispatch(
            getAreaRanges({
              areaRange: newValue
            }),
            // console.log(areaRange)
          )
   }
   const handleDownPaymentChange = (e) => {
        setDownPaymentAmount(e.target.value);
        // console.log('hello...',downPaymentAmount)
        dispatch(
          getDownPaymentAmount({
            downPaymentAmount: e.target.value
          }),
          // console.log(areaRange)
        )
   }

  return (
    <div className='rent__details__filter'>
        {/* <div className='rent__details__title'>Properties for Rent in Islamabad</div> */}

        <Box  className="mt-1 mb-1 col-md-6">
            {/* <Button outline style={{height: 'max-content', padding: 6, paddingLeft: 9, paddingRight: 9}}
            onClick={handleOpenArea}
            >
                Area
                <ArrowDropDownIcon />
            
            </Button> */}

            <Button outline style={{height: 'max-content', padding: 6, paddingLeft: 9, paddingRight: 9}} className="mx-1"
            onClick={handleOpenPrice}
            >
                Price Range
                <ArrowDropDownIcon />
            </Button>

            <Button outline style={{height: 'max-content', padding: 6, paddingLeft: 9, paddingRight: 9}}
            onClick={handleOpenSizeRange}
            >
                Area Range
                <ArrowDropDownIcon />
            </Button>

            <Button outline style={{height: 'max-content', padding: 6, paddingLeft: 9, paddingRight: 9}} className="mx-1"
            onClick={handleOpenDownPaymentAmount}
            >
                Down Payment Amount
                <ArrowDropDownIcon />
            </Button>
        </Box>

        {/* Area Modal */}
        <Modal
        open={openArea}
        onClose={handleCloseArea}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          <Label>Enter Area Name</Label>
          <Input type="text" />

          <Row className="d-flex">
            <Col md={3} className="mt-1">
                <Button color='primary' onClick={handleCloseArea}>Submit</Button>
            </Col>
          </Row>
        </Box>
      </Modal>

      {/* Price Modal */}
      {/* className="form-group col-md-3" style={{
  marginTop:-40
}} */}

      <Modal
        open={openPrice}
        onClose={handleClosePrice}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="col-md-6"
        >
        <Box sx={style} >
          <Label >Choose your price Range(PKR)</Label>
            <Slider
            aria-label="Always visible"
            defaultValue={1000000}
            value={plotPrice}
            // value={maxPrice}
            max={1000000}
            getAriaValueText={valuetext}
            step={200000}
            marks={marks}
            onChange={ handlePriceChange }            
            />

            <Row className='d-flex justify-content-around mt-2'>
            <Col md={6}>
                <Label>From</Label>
                <Input type="text" placeholder='From' value={plotPrice[0]}/>
            </Col>

            <Col md={6}>
              <Label>To</Label>
                <Input type="text" placeholder='To' value={plotPrice[1]}/>
            </Col>
            
            </Row>

          {/* <Row className="d-flex">
            <Col md={3} className="mt-1">
                <Button color='primary' onClick={handleClosePrice} >Apply</Button>
            </Col>
          </Row> */}
        </Box>
      </Modal>
      {/* Size Range Modal */}
      <Modal
        open={openSizeRange}
        onClose={handleCloseSizeRange}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          <Label>Choose Size Range(Sq.Ft)</Label>
            <Slider
            aria-label="Always visible"
            defaultValue={0}
            value={areaRange}
            max={3300}
            getAriaValueText={valueAreaText}
            step={300}
            marks={areaMarks}
            onChange={handleAreaChange}
            />

            <Row className='d-flex justify-content-around mt-2'>
            <Col md={4}>
                <Input type="text" placeholder='From' value={0}/>
            </Col>

            <Col md={4}>
                <Input type="text" placeholder='To' value={areaRange}/>
            </Col>
            
            </Row>

        </Box>
      </Modal>

      {/* downpayment Modal */}
      <Modal
        open={openDownPayment}
        onClose={handleCloseDownPaymentAmount}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          <Label>Enter DownPayment Amount</Label>
          <Input type="number" onChange={handleDownPaymentChange} />

          <Row className="d-flex">
            <Col md={3} className="mt-1">
                <Button color='primary' onClick={handleCloseDownPaymentAmount}>Apply Filter</Button>
            </Col>
          </Row>
        </Box>
      </Modal>

      
    </div>
  )
}

export default Filter



