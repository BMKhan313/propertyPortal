import React, { useState } from 'react'
import '../../../User.css'
import { Row, Col } from 'reactstrap'
import KitchenIcon from '@mui/icons-material/Kitchen'
import TvIcon from '@mui/icons-material/Tv'
import LocalParkingIcon from '@mui/icons-material/LocalParking'
import WaterIcon from '@mui/icons-material/Water'
import TungstenIcon from '@mui/icons-material/Tungsten'
import PropaneTankIcon from '@mui/icons-material/PropaneTank'
import SecurityIcon from '@mui/icons-material/Security'
import { innerSliderPic } from '../../../assets/Data'
import { Box, Button, styled, Typography, Grid, Input, Alert } from '@mui/material'
import Carousel from "react-multi-carousel"
import 'react-multi-carousel/lib/styles.css'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@material-ui/core/styles'
import GoogleMap from './GoogleMap'
import { Link } from 'react-router-dom'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import Modal from '@mui/material/Modal'
import InnerPictureModel from './InnerPictureModel'
import ImageInformation from './ImageInformation'

const responsive = {

  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
}

const Image = styled('img')({
   width: '100%',
  //  height: '30%',
})
const Wrapper = styled(Grid)(({theme}) => ({
    display: 'flex',
    color: '#222222',
    [theme.breakpoints.down('sm')]: {
      // flexDirection: 'column',
      // width: '100%',
      // display: 'none'
    }
  })) 
  

const ImgInfo = styled(Box)(({theme}) => ({
  background: '#ffffff',
  width: '28%',
  // flex: 1,
  border: '1px solid #ffffff',
  [theme.breakpoints.down('md')] :{
    flexDirection: 'column',
    width: '100%'
   }
}))  

const MySlider = styled(Carousel)(({theme}) => ({
   width: '68%',
   [theme.breakpoints.down('md')] :{
    width: '100%'
   }

}))
const image = styled('img')(({theme}) => ({
  border: '1px solid black',
  [theme.breakpoints.down('md')] :{
    width: '90%',
   } 
}))
const Enquiry = styled(Box)`
   font-weight: bold;
   margin-bottom: 20px;
// margin-top: 5px;
    // font-family: "Lato", sans-serif;
    text-align: center;
    padding: 15px 30px 12px 16px;
    color: #414141;
    font-size: 15px;
    text-transform: uppercase;
    border-top: 1px solid #E9E9E9;
    border-bottom: 1px solid #E9E9E9;
    align-items: center;
    justify-content: center
    
`
const Form = styled(Box)`
   display: flex;
   flex-direction: column;
   padding: 0 20px 0 20px;
`
const useStyles = makeStyles(theme => ({
  inputBox:{
    backgroundColor: '#F8F8F8',
    marginBottom: '7px',
    borderRadius: '4px',
    padding: '5px 10px 0',
    boxSizing: 'border-box',
    position: 'relative',
    cursor: 'pointer',
     // border: '1px solid black',
    // borderRadius: '8px',
    
  },
  label:{
    fontSize: '9px',
    textTransform: 'uppercase',
    fontWeight: '700px',
    color: '#444444'
  },
  input:{
    backgroundColor: '#F8F8F8',
    outline: 0,
    width: '100%',
    border: 'none',
      
  },
  captchaBox: {
     display: 'flex',
    //  width: '60%',
     marginBottom: '10px',
    //  position: 'relative',
     [theme.breakpoints.down("md")]: {
      width: '40%'
    },
  },
  captchaText:{
    // width: '110px',
    // height: '30px',
    paddingLeft: '15px',
    paddingTop: '7px',
    [theme.breakpoints.down("md")]: {
      paddingLeft: 10,
      paddingTop: 5,
    },
    // float: 'left',
    // marginRight: '10px'
  },
  refreshBtn:{
    // width: '26px',
    // height: '22px',
    marginTop: '10px',
    cursor: 'pointer',
    [theme.breakpoints.down("md")]: {
     marginTop: 7,
    },
    // float: 'left'
  },
  captcha_img:{
    // marginLeft: '10px'
  },
  agent_agree:{
    paddingLeft: 0,
    marginBottom: '15px',
    // display: 'block',
    // paddingLeft: '20px',
    lineHeight: 'normal'
  },
  callBtn:{
    display: 'flex',
    color: '#33A137',
    border: '1px solid #33A137',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '13px',
    height: '40px',
    borderRadius: 4,
    marginRight: 10,
    padding: 20,
    "&:hover": {
      backgroundColor: '#F8F8F8'
    },
    width: '50%',
    
  },
  emailMsg: {
    display: 'flex',
    color: '#fff',
    border: '1px solid #33A137',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#33A137',
    width: '50%',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '13px',
    height: '40px',
    borderRadius: 4,
    marginRight: 10,
    padding: 20,
    "&:hover": {
      backgroundColor: '#007500'
    }
  },
  modal:{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    backgroundColor: '#fff',
    border: '1px solid #fff',
    borderRadius: 6,
    boxShadow: 24,
    // height: 120,
    padding: 15,
    p: 4,
    fontSize: 14,
    color: '#222222',
    [theme.breakpoints.down("xs")]: {
      width: '80%',
     },
     [theme.breakpoints.up("sm")]: {
      width: '50%'
     },
     [theme.breakpoints.up("md")]: {
      width: '30%'
     }

  },
  modalList:{
    padding: 10,
    borderBottom: '1px solid #dddfe0',
    fontSize: 14,
    overflow: 'auto',
    direction: 'ltr'
  },
  modalList2:{
    padding: 10,
    fontSize: 14,
    overflow: 'auto',
    direction: 'ltr'
  },
  cross:{
    right: 0,
    float: 'right',
    backgroundColor: '#e3e3e3',
    borderRadius: 4,
    cursor: 'pointer',
    padding: '0px 3px', 
  } 

}))


const InnerBody = () => {
  // const [open, setOpen] = useState(false)
  // const handleOpen = () => setOpen(true)
  // const handleClose = () => setOpen(false)
  const [innerModal, setInnerModal] = useState(false)
//  const [value, setValue] = useState(0)
  const classes = useStyles()
  const url = "http://thesfb.live/Propertyportalfrontend/panorama/"
  return (
    <div className='rent__inner__details__body'>
      <div className='rent__inner__details__body__title'>
        856 Sq. Ft Flat
      </div>
      <div className='rent__inner__details__body__price__title'>
        PKR 55,999
      </div>

      <Wrapper item lg={12} md={12} sm={12} xs={12} container>
        <MySlider
          responsive={responsive}
          swipeable={true}
          draggable={false}
          infinite={true}
          autoPlay={false}
          autoPlaySpeed={4000}
          keyBoardControl={true}
          slidesToSlide={1}
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          
        >
           {
          innerSliderPic.map((image, index) => (
            <Grid item lg={12} md={12} sm={12} xs={12} onClick={() => setInnerModal(true) } >
              <Image key={index} src={image.url} alt="property" className={classes.image} />
             </Grid>
          ))
        }
         
        </MySlider>
        <ImageInformation   />
      </Wrapper>
       <Box>
        <Typography variant="h4"><a href={url}>360 View</a> </Typography>
       </Box>
      <div className='inner__rent__details__about__title'>
        About Property
       
      </div>

      <div className='inner__rent__details__about__par'>
        A luxurious 850 sq. ft. apartment for rent in E-11/2,    Islamabad. It comprises of 2 bedrooms, 2 washrooms, spacious TV lounge, balcony and car parking space. Key lifestyle and convenience around this property includes beautiful parks, commercial area, Restaurants and food outlets, medical care/ hospital, gym, health/sports centre within 1-2 KMs. Margalla Road can be used for daily commute.
      </div>

      <div className="inner__rent__details__about__key">
        Key Features
      </div>

      <div className='inner__rent__details__about__list'>
        <ul>
          <li>6 Bedrooms</li>
          <li>3 Washrooms</li>
          <li>2 Kitchen</li>
          <li>Balcony</li>
          <li>Parking</li>
        </ul>
      </div>

      <div className='inner__rent__details__about__title'>
        Quality Features
      </div>

      <div className="inner__rent__details__quality__features">
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: 6 }}>
          <Col md={3}>
            <KitchenIcon />Luxury Kitchen
          </Col>

          <Col md={3}>
            <TvIcon /> Tv Lounge
          </Col>

          <Col md={3}>
            <LocalParkingIcon /> Parking
          </Col>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', padding: 6 }}>
          <Col md={3}>
            <WaterIcon /> Water
          </Col>

          <Col md={3}>
            <TungstenIcon />   Electricity
          </Col>

          <Col md={3}>
            <PropaneTankIcon /> Gas
          </Col>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', padding: 6 }}>
          <Col md={3}>
            <KitchenIcon /> Luxury Kitchen
          </Col>

          <Col md={3}>
            <SecurityIcon /> Security

          </Col>

          <Col md={3}>

          </Col>
        </div>
      </div>
      <InnerPictureModel innerModal={innerModal} />
    </div>
  )
}

export default InnerBody
// export ImgInfo