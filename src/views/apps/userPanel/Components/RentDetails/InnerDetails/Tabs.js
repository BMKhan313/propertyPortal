import * as React from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'
import { useTheme } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { makeStyles } from '@material-ui/core/styles'
import Carousel from "react-multi-carousel"
import { innerSliderPic } from '../../../assets/Data'
import { Box, Button, styled, Typography, Grid, Input, Divider } from '@mui/material'
import ImageInformation from './ImageInformation'
import GoogleMap from './GoogleMap'
// import VR360 from '../InnerDetails/VR-360/VR360'

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

const useStyles = makeStyles(theme => ({ 
  tabs:{
           backgroundColor: '#ffffff',
           color: '#000',
           height: 40,
           diplay: 'flex',
           justifyContent: 'center',
           alignItems: 'center',
           fontSize: 15,
          //  [theme.breakpoints.down(560)]:{
          //   width: '10%'
          //  }
  },
  tabsText:{
       borderRight: '1px solid #A3A3A3',
    },
    img:{
      height: '450px',
      width: '97%'
    },
    imgParent:{
        height: '450px',
        //  [theme.breakpoints.down(560)]: {
        //    width: '100%'
        //  }
    },
    carousal:{
      // [theme.breakpoints.down(560)]: {
      //      width: '100%'
      //    }
    },
    container:{
      // backgroundColor: '#000',
      // border: '2px solid black',
       width: '70%',
       [theme.breakpoints.down(560)]:{
        width: '100%'
       }
    }

}))

function TabPanel(props) {
  const { children, value, index, ...other } = props
  const classes = makeStyles()
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}

export default function FullWidthTabs() {
  const classes = useStyles()
  const theme = useTheme()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index) => {
    setValue(index)
  }

  return (
    <Box className={classes.container} 
    style={{ backgroundColor: value === 2 ? "#fff" : '#000'}} >
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
          className={classes.tabs}
        >
          <Tab label="photos" {...a11yProps(0)} className={classes.tabsText}/>
           
          <Tab label="Videos" {...a11yProps(1)} className={classes.tabsText}/>
          <Tab label="Map" {...a11yProps(2)} className={classes.tabsText}/>
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction} >
        <Carousel
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
          className={classes.carousal}
        >
           {
          innerSliderPic.map((image, index) => (
            <Grid item lg={12} md={12} sm={12} xs={12} className={classes.imgParent} >
              <img key={index} src={image.url} alt="property" className={classes.img} />
             </Grid>
             
          ))
        }
       
        </Carousel>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction} style={{color: '#fff'}}>
          videos
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction} style={{color: '#fff', width: '100%', height: '600px'}}>
        <GoogleMap  />
        </TabPanel>
      </SwipeableViews>
      
      
    </Box>
  )
}
