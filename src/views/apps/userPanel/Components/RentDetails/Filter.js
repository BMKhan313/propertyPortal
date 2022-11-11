import { Button, Col, Input, Label, Row} from 'reactstrap'
import React, { useState,useEffect } from 'react'
import '../../User.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import {Box, Typography} from '@mui/material'
import Modal from '@mui/material/Modal'
import { ArrowLeft, ArrowRight, Plus, Minus, Check, X } from 'react-feather'
import Slider from '@mui/material/Slider'
import { useDispatch, useSelector } from 'react-redux'
import { getPriceRangesFromFilter,getValuesFromUserFilter,getAreaRanges, getDownPaymentAmount, getStatus, getInstallmentPerMonth, getProjectDuration } from '../../../adminPortal/redux/addNewProject/store'

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
  const projectDurationMarks = [
    {
      value: 0,
      label: '0y'
    },
    {
      value: 1,
      label: '1y'
    },
    {
      value: 2,
      label: '2y'
    },
    {
      value: 3,
      label: '3y'
    },
    {
      value: 4,
      label: '4y'
    },
    {
        value: 5,
        label: '5y'
    },
    {
        value: 6,
        label: '6y'
    },
    {
      value: 7,
      label: '7y'
    },
    {
      value: 8,
      label: '8y'
    },
    {
      value: 9,
      label: '9y'
    },
    {
      value: 10,
      label: '10y'
    }

]
  const installmentPerMonthMarks = [
    {
      value: 0,
      label: '0'
    },
    {
      value: 200000,
      label: '2lac'
    },
    {
      value: 400000,
      label: '4lac'
    },
    {
      value: 600000,
      label: '6lac'
    },
    {
        value: 800000,
        label: '8lac'
    },
    {
        value: 1000000,
        label: '10lac'
    },{
      value: 1200000,
      label: '12lac'
  },{
    value: 1400000,
    label: '14lac'
},{
  value: 1600000,
  label: '16lac'
},{
  value: 1800000,
  label: '18lac'
},{
  value: 2000000,
  label: '2lac'
}
  ]

  function valuetext(value) {
    return `${value}`
  }

  function valueAreaText(value) {
    return `${value}`
  }
  
  const CustomLabel = ({ htmlFor }) => {
    return (
      <Label className='form-check-label' htmlFor={htmlFor} >
        <span className='switch-icon-left'>
          <Check size={10} />
        </span>
        <span className='switch-icon-right'>
          <X size={10} />
        </span>
      </Label>
    )
  }

const Filter = () => {
    
  useEffect(() => {

    dispatch(
      getAreaRanges({
        areaRange: 33000000
      })
    ),

    dispatch(
      getPriceRangesFromFilter({
         priceLowRange: 0,
         priceHighRange: 1000000000
        })
   )

   dispatch(
    getDownPaymentAmount({
      downPaymentAmount: 100000000
    }),
    // console.log(areaRange)
  )
  dispatch(
    getStatus({
      approvalStatus: true
    }),
    // console.log(areaRange)
  )
  dispatch(
    getInstallmentPerMonth({
      installmentPerMonth: 50000000000
    }),
    // console.log(areaRange)
  )
  dispatch(
    getProjectDuration({
      projectDuration: 500
    }),
    // console.log(areaRange)
  )
  }, [])

  const store = useSelector(state => state.addNewProject)
  const dispatch = useDispatch()
  console.log('project duration',store.userPanel.projectDuration)
  const [plotPrice, setPlotPrice] = useState([0,1000000])
  const [areaRange, setAreaRange] = useState(3300)
  const [downPaymentAmount, setDownPaymentAmount] = useState(0)
  const [approvalStatus, setApprovalStatus] = useState(true)
  const [installmentPerMonth, setInstallmentPerMonth] = useState(0)
  const [projectDuration, setProjectDuration] = useState(10)
  // const [maxPrice, setMaxPrice] = useState(6000)

    const [openArea, setOpenArea] = useState(false)
    const [openPrice, setOpenPrice] = useState(false)
    const [openDownPayment, setOpenDownPayment] = useState(false)
    const [openSizeRange, setOpenSizeRange] = useState(false)
    const  [openInstallmentPerMonth, setOpenInstallmentPerMonth] = useState(false)
    const [openProjectDuration, setOpenProjectDuration] = useState(false)

    const handleOpenArea = () => setOpenArea(true)
    const handleCloseArea = () => setOpenArea(false)

    const handleOpenPrice = () => setOpenPrice(true)
    const handleClosePrice = () => setOpenPrice(false)

    const handleOpenDownPaymentAmount = () => setOpenDownPayment(true)
    const handleCloseDownPaymentAmount = () => setOpenDownPayment(false)

    const handleOpenSizeRange = () => setOpenSizeRange(true)
    const handleCloseSizeRange = () => setOpenSizeRange(false)

    const handleOpenInstallmentPerMonth = () => setOpenInstallmentPerMonth(true)
    const handleCloseInstallmentPerMonth = () => setOpenInstallmentPerMonth(false)
    
    const handleOpenProjectDuration = () => setOpenProjectDuration(true)
    const handleCloseProjectDuration = () => setOpenProjectDuration(false)

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
   const handleApprovalStatus =(e)=>{
           setApprovalStatus(e.target.checked);
           dispatch(
            getStatus({
              approvalStatus: e.target.checked
            }),
            console.log(approvalStatus)
          )
   }

   const handleInstallmentPerMonth = (e) => {
           setInstallmentPerMonth(e.target.value)
           dispatch(
            getInstallmentPerMonth({
              installmentPerMonth: e.target.value
            }),
          )
   }
   const handleProjectDuration = (e) => {
    setProjectDuration(e.target.value)
    dispatch(
     getProjectDuration({
       projectDuration: e.target.value
     }),
   )
}

  return (
    <div className='rent__details__filter '>
        {/* <div className='rent__details__title'>Properties for Rent in Islamabad</div> */}
        <Box className='' >
        <Box  className='row ' style={{}}>
            {/* <Button outline style={{height: 'max-content', padding: 8,color:'white', margin: 4, paddingLeft: 9, paddingRight: 9}}
            onClick={handleOpenArea}
            >
                Area
                <ArrowDropDownIcon />
            
            </Button> */}

            <Button className=' col-md-3 col-sm-5 col-lg-2 col-10'  outline style={{borderStyle: 'none' ,height: 'max-content',fontSize: 12, padding: 8, margin: 4, }} 
            onClick={handleOpenPrice}
            >
                Price Range
                {/* <ArrowDropDownIcon /> */}
            </Button>

            <Button className=' col-md-3 col-sm-5 col-lg-2 col-10 '   outline style={{height: 'max-content',fontSize: 12, padding: 8, margin: 4, }}
            onClick={handleOpenSizeRange}
            >
                Area Range
            </Button>

            <Button className=' col-md-3 col-sm-5 col-lg-2 col-10'   outline style={{height: 'max-content',fontSize: 12, padding: 8, margin: 4, }}
            onClick={handleOpenDownPaymentAmount}
            >Down Payment Amount
            </Button>
            <Button className=' col-md-3 col-sm-5 col-lg-2 col-10'   outline style={{height: 'max-content',fontSize: 12, padding: 8, margin: 4, }}
            onClick={handleOpenInstallmentPerMonth}
            >
                installment Per Month
            </Button>

             {/* project duration */}
             <Button className=' col-md-3 col-sm-5 col-lg-2 col-10'   outline style={{height: 'max-content',fontSize: 12, padding: 8, margin: 4, }}
            onClick={handleOpenProjectDuration}
            > Project Duration
            </Button>

            {/* approval status */}
            <Button outline style={{ height: 'max-content', fontSize: 12,  margin: 4, }} className=' col-md-3 col-sm-5 col-lg-2 col-10' >
                    <Box className='' style={{}}>
                        <Typography className='' style={{marginRight: 10}}>Approved</Typography> 
                      <Box className='form-switch form-check-primary'>
                        <Input
                          style={{cursor: 'pointer', }}
                          type='switch'
                          id='icon-primary2'
                          name='icon-primary2'
                          checked={
                            store.userPanel.approvalStatus
                          }
                          onChange={handleApprovalStatus}
                        />
                        {/* <CustomLabel htmlFor='icon-primary2' /> */}
                      </Box>
                    </Box>
            </Button>
                 
          </Box>
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
            defaultValue={3300}
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
      {/* project duration */}
      <Modal
        open={openProjectDuration}
        onClose={handleCloseProjectDuration}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          <Label>Choose Project Duration Range (in Years)</Label>
            <Slider
            aria-label="Always visible"
            defaultValue={10}
            value={projectDuration}
            max={10}
            // getAriaValueText={valueAreaText}
            step={1}
            marks={projectDurationMarks}
            onChange={handleProjectDuration}
            />

            <Row className='d-flex justify-content-around mt-2'>
            <Col md={4}>
                <Input type="text" placeholder='From' value={1}/>
            </Col>

            <Col md={4}>
                <Input type="text" placeholder='To' value={projectDuration}/>
            </Col>
            
            </Row>

        </Box>
      </Modal>
      {/* insallment per month */}
      {/* <Modal
        open={openInstallmentPerMonth}
        onClose={handleCloseInstallmentPerMonth}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          <Label>Enter installment per month</Label>
          <Input type="number" onChange={handleInstallmentPerMonth} />

          <Row className="d-flex">
            <Col md={3} className="mt-1">
                <Button color='primary' onClick={handleCloseInstallmentPerMonth}>Apply Filter</Button>
            </Col>
          </Row>
        </Box>
      </Modal> */}
      <Modal
        open={openInstallmentPerMonth}
        onClose={handleCloseInstallmentPerMonth}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          <Label>Choose insallment Per Month Range</Label>
            <Slider
            aria-label="Always visible"
            defaultValue={2000000}
            value={installmentPerMonth}
            max={2000000}
            // getAriaValueText={valueAreaText}
            step={200000}
            marks={installmentPerMonthMarks}
            onChange={handleInstallmentPerMonth}
            />

            <Row className='d-flex justify-content-around mt-2'>
            <Col md={4}>
                <Input type="text" placeholder='From' value={0}/>
            </Col>

            <Col md={5}>
                <Input type="text" placeholder='To' value={installmentPerMonth}/>
            </Col>
            
            </Row>

        </Box>
      </Modal>
      
    </div>
  )
}

export default Filter



