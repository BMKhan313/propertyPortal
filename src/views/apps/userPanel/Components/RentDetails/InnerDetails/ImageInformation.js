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
import { Link } from 'react-router-dom'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import Modal from '@mui/material/Modal'
import InnerPictureModel from './InnerPictureModel'

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
  imageInfo:{
    // [theme.breakpoints.up(560)]:{
    //   width: '5%'
    // }
  },
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
    // position: 'absolute',
     marginBottom: '10px',
    //  position: 'relative',
     [theme.breakpoints.down("md")]: {
      width: '40%'
    },
  },
  captchaText:{
    // width: '110px',
    // height: '30px',
    // position: 'relative',
    paddingLeft: '15px',
    paddingTop: '7px',
    [theme.breakpoints.down("md")]: {
      paddingLeft: 9,
      paddingTop: 5,
      width: 100
    },
    [theme.breakpoints.down(360)]: {
      paddingLeft: 5,
      paddingTop: 5,
      width: 90
    }
    // float: 'left',
    // marginRight: '10px'
  },
  refreshBtn:{
    // width: '26px',
    // height: '22px',
    // position: 'relative',
    marginTop: '10px',
    cursor: 'pointer',
    [theme.breakpoints.down("md")]: {
     marginTop: 7,
     width: 14
    },
    [theme.breakpoints.down(360)]: {
     marginTop: 7,
     width: 10
    }
    // float: 'left'
  },
  captcha_img:{
    // marginLeft: '10px'
    // [theme.breakpoints.down(360)]: {
    //   width: '50%'
    //  }
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


const ImageInformation = () => {

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const classes = useStyles()
    const [value, setValue] = useState()
    // const cross = 1
    return (  
        
          <ImgInfo className={classes.imageInfo}>
         <Enquiry style={{display: 'flex', padding: 'none'}}>
           <ContactMailIcon style={{width: '15px', height: '15px', marginRight: '5px'}}/>
           Make An enquiry
          {/* {cross ? <Box className={classes.cross} style={{right: 0}} >X</Box> : '' } */}
          </Enquiry>
          
          <Form>
         <Box className={classes.inputBox} >
           <label className={classes.label}>NAME*</label>
         <input
         className={classes.input}
         id="outlined-number"
         label="Name"
         type="text"
       />
         </Box>
         
        <Box className={classes.inputBox}>
        <label className={classes.label}>EMAIL*</label>
       <input
        className={classes.input}
         id="outlined-number"
         label="Email"
         type="number"
         variant="filled"
         
       />
       </Box>
       <Box className={classes.inputBox}>
       <label className={classes.label}>PHONE*</label>
       <PhoneInput
       //  className={classes.input}
        style={{width: '80%', marginBottom: '5px'}}
       international
       countryCallingCodeEditable={false}
       defaultCountry="PK"
       value={value}
       onChange={setValue}
       />
     
       </Box>
       <Box className={classes.inputBox}>
       <label className={classes.label}>MESSAGE*</label>
         <TextField
          className={classes.input}
         id="outlined-multiline-static"
         rows={4}
         defaultValue=""
         placeholder="Write your messaege here"
         // variant="standard"
       />
       </Box>
       <Box className={classes.inputBox} style={{display: 'flex', flexDirection: 'column', marginBottom: '16px', padding: '5px 10px 0px'}}>
       <label className={classes.label}>SECURITY CODE*</label>
       <Box style={{display: 'flex'}}>
       <input
        className={classes.input}
         id="outlined-number"
         label="Number"
         type="text"
         variant="filled"
         style={{
           width: '40%',
           height: '30px',
           backgroundColor: '#fff',
           paddingLeft: '5px',
           margin: '5px 0 0',
           borderRadius: '5px'
         }}
       />
       <Box className={classes.captchaBox} style={{}}>
      <Box className={classes.captchaText}>
      <img src="https://www.zameen.com/captcha?id=0.03753086588452326" alt="captchaPic" />
      </Box>
      <Box className={classes.refreshBtn}>
      <img className={classes.captcha_img} src="https://www.zameen.com/zameen/images/refresh.png" alt="Refresh" />
      </Box>
       </Box>
       
       </Box>
       </Box>
       <span className={classes.agent_agree}>By submitting this form, I agree to {' '}
        <a href="https://www.zameen.com/terms.html" style={{textDecoration: 'underline'}}> Terms of Use</a>.
        </span>

        <Box style={{display: 'flex', flexDirection: 'row'}}>
        <Box className={classes.callBtn} onClick={handleOpen}>
          <PhoneIcon style={{marginRight: '5px', width:16}} />CALL
          { /* modal */ } 
  
  <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box className={classes.modal}>
    <Box style={{display: 'flex', flexDirection: 'column'}}>
    <Box  component="h4" style={{marginBottom: 5, alignItems: 'center'}}>
      Contact Details
      <Box className={classes.cross} onClick={() => setOpen(false)}>X</Box>
    </Box>
    <Box>
     <ul style={{listStyle: 'none', marginTop: '10px'}}>
       <li className={classes.modalList}>
         <label>mobile</label>
         <a id="mobile" href="tel:+92-3104440107">+92-3104440107</a>
       </li>
       <li className={classes.modalList2}>
       <label>mobile</label>
         <a id="mobile" href="tel:+92-3104440107">+92-3104440107</a>
       </li>
     </ul>
    </Box>
    
    </Box>
  </Box>
</Modal>
     </Box>
        <Box className={classes.emailMsg}>
          <EmailOutlinedIcon style={{marginRight: 5, width: 16}} />EMAIL
         </Box>
        </Box>
          
         </Form>
       
        </ImgInfo>
        
    )
} 

export default ImageInformation