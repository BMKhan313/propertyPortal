import { Button, Col, Input, Label, Row} from 'reactstrap'
import React, { useState } from 'react'
import '../../User.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import {Box, Typography} from '@mui/material'
import Modal from '@mui/material/Modal'
import Slider from '@mui/material/Slider'

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

  const smarks = [
    {
      value: 0,
      label: '0'
    },
    {
      value: 200,
      label: '200'
    },
    {
      value: 400,
      label: '400'
    },
    {
      value: 600,
      label: '600'
    },
    {
        value: 800,
        label: '800'
    },
    {
        value: 1000,
        label: '1000'
    }
  ]

  function valuetext(value) {
    return `${value}`
  }

  function valueStext(value) {
    return `${value}`
  }

const Filter = () => {
  const [plotPrice, setPlotPrice] = useState([200000,400000])
  // const [maxPrice, setMaxPrice] = useState(6000)

    const [openArea, setOpenArea] = useState(false)
    const [openPrice, setOpenPrice] = useState(false)
    const [openBedroom, setOpenBedroom] = useState(false)
    const [openSizeRange, setOpenSizeRange] = useState(false)

    const handleOpenArea = () => setOpenArea(true)
    const handleCloseArea = () => setOpenArea(false)

    const handleOpenPrice = () => setOpenPrice(true)
    const handleClosePrice = () => setOpenPrice(false)

    const handleOpenBedroom = () => setOpenBedroom(true)
    const handleCloseBedroom = () => setOpenBedroom(false)

    const handleOpenSizeRange = () => setOpenSizeRange(true)
    const handleCloseSizeRange = () => setOpenSizeRange(false)
    
   const handlePriceChange = (event, newValue) =>{
      setPlotPrice(newValue);
      // setMaxPrice(newValue)
    }

  return (
    <div className='rent__details__filter'>
        {/* <div className='rent__details__title'>Properties for Rent in Islamabad</div> */}

        <Col md={8} className="mt-1 mb-1">
            <Button outline style={{height: 'max-content', padding: 6, paddingLeft: 9, paddingRight: 9}}
            onClick={handleOpenArea}
            >
                Area
                <ArrowDropDownIcon />
            
            </Button>

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
            onClick={handleOpenBedroom}
            >
                Bedrooms
                <ArrowDropDownIcon />
            </Button>
        </Col>

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
            // defaultValue={200000}
            value={plotPrice}
            // value={maxPrice}
            max={1000000}
            getAriaValueText={valuetext}
            step={200000}
            marks={marks}
            onChange={handlePriceChange}
            
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

          <Row className="d-flex">
            <Col md={3} className="mt-1">
                <Button color='primary' onClick={handleClosePrice} >Apply</Button>
            </Col>
          </Row>
        </Box>
      </Modal>

      {/* Bedrooms Modal */}
      <Modal
        open={openBedroom}
        onClose={handleCloseBedroom}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          <Label>Enter Number of Bedrooms</Label>
          <Input type="text" />

          <Row className="d-flex">
            <Col md={3} className="mt-1">
                <Button color='primary' onClick={handleCloseBedroom}>Submit</Button>
            </Col>
          </Row>
        </Box>
      </Modal>

      {/* Size Range Modal */}
      <Modal
        open={openSizeRange}
        onClose={handleOpenSizeRange}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          <Label>Choose Size Range(Sq.Ft)</Label>
            <Slider
            aria-label="Always visible"
            defaultValue={200}
            max={1000}
            getAriaValueText={valueStext}
            step={200}
            marks={smarks}
            />

            <Row className='d-flex justify-content-around mt-2'>
            <Col md={4}>
                <Input type="text" placeholder='From' />
            </Col>

            <Col md={4}>
                <Input type="text" placeholder='To' />
            </Col>
            
            </Row>

          <Row className="d-flex">
            <Col md={3} className="mt-1">
                <Button color='primary' onClick={handleCloseSizeRange}>Apply</Button>
            </Col>
          </Row>
        </Box>
      </Modal>
    </div>
  )
}

export default Filter



