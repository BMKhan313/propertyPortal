import { Box, Button, styled, Typography, Grid, Input } from '@mui/material'
import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@mui/material/Modal'
import Tabs from './Tabs'
import ImageInformation from './ImageInformation'

const useStyles = makeStyles(theme => ({ 
    modal:{
        position: 'absolute',
        top: '1%',
        bottom: '2%',
        // transform: 'translate(1%, 1%)',
        width: '85%',
        // height: 620,
        margin: '0px 120px',
        // marginLeft: 30,
        backgroundColor: '#fff',
        border: '1px solid #fff',
        borderRadius: 6,
        boxShadow: 24,
        // height: 120,
        // padding: 15,
        p: 4,
        fontSize: 14,
        color: '#222222',
        display: 'flex',
        flexDirection: 'row-reverse',
        // position: "absolute", 
        overflowY: "auto",
        // maxHeight: "90%",
        [theme.breakpoints.down(560)] : {
          // display: 'flex',
          // flexDirection: 'column'
          width: '90%',
          marginLeft: '10px',
          // right: '10%',
          flexDirection:'column-reverse'
        },
        [theme.breakpoints.down(380)]:{
          
        }
    },
    
    ImageInformation:{
      // [theme.breakpoints.down(380)] : {
      //  width: '10%'
      // }
    },
    container:{
      [theme.breakpoints.down(560)] : {
        // width: '100%',
        // height: '900px',
        // marginTop: '190px'

       }
     },
     tabs:{
      // [theme.breakpoints.down(560)] : {
      //   width: '90%'
      //  }
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

const InnerPictureModel = ({ innerModal }) => {

    // const [open, setOpen] = useState(false)
    // const handleOpen = () => setOpen(true)
    // const handleClose = () => setOpen(false)
    const classes = useStyles()

  return (
    <Box  >
      
    <Modal
   open={innerModal}
   onClose={innerModal}
   aria-labelledby="modal-modal-title"
   aria-describedby="modal-modal-description"
   className={classes.container}
   >
   
   <Box className={classes.modal} >
   <ImageInformation className={classes.ImageInformation}/>
   <Tabs className={classes.tabs}/>
   
   </Box>
   
 </Modal>
 </Box>
  )
}

export default InnerPictureModel