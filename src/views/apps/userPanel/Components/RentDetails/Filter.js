import { Button, Col, Input, Label, Row} from 'reactstrap'
import React, { useState } from 'react'
import '../../User.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Slider from '@mui/material/Slider'

const style = {
  position: 'absolute',
  top: '35%',
  left: '20%',
  transform: 'translate(-50%, -50%)',
  width: 400,
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
      value: 20000,
      label: '20,000'
    },
    {
      value: 40000,
      label: '40,000'
    },
    {
      value: 60000,
      label: '60,000'
    },
    {
        value: 80000,
        label: '80,000'
    },
    {
        value: 100000,
        label: '1,00,000'
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

      <Modal
        open={openPrice}
        onClose={handleClosePrice}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          <Label>Choose your price Range(PKR)</Label>
            <Slider
            aria-label="Always visible"
            defaultValue={20000}
            max={100000}
            getAriaValueText={valuetext}
            step={20000}
            marks={marks}
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
                <Button color='primary' onClick={handleClosePrice}>Apply</Button>
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