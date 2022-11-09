import React, { Component } from 'react'
// import { Button, Col, Row } from 'reactstrap'
import '../../User.css'
import { rentHouses } from '../../Data/rentHouses'
import { homes } from '../../Data/homesData'
import BedIcon from '@mui/icons-material/Bed'
import BathtubIcon from '@mui/icons-material/Bathtub'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { ArrowBack, ArrowCircleLeft, ArrowCircleRight } from "@mui/icons-material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Box, styled, Typography, Button, Divider } from '@mui/material';
import { identity } from '@fullcalendar/core';
// import store from '../../../adminPortal/redux/addNewProject/store'


const Image = styled('img')({
  // width: 100,
  borderRadius: 10,
  height: 170
})
const MainComponent = styled(Box)`
    margin-top: 10px;
    background: #FFFFFF; 
    `
const Text = styled(Typography)`
    font-size: 14px;
    margin-top: 5px;
  `
 

const Body = ({city,residentialType}) => {
   

  const [category, setCategory] = useState('');
  const [newLaunchedRates, setNewLaunchedRates] = useState('');
  const history = useHistory();
  const [selected, setSelected] = React.useState([]);
  const isItemSelected = (id) => !!selected.find((el) => el === id);
  
  const handleClick =
    (id) =>
      ({ getItemById, scrollToItem }) => {
        const itemSelected = isItemSelected(id);
        setSelected((currentSelected) =>
          itemSelected
            ? currentSelected.filter((el) => el !== id)
            : currentSelected.concat(id)
        );
      };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div style={{ margin: '0px 5%' }}>
      <div>
        
        {/*  */}
        <Box className="form-row col-md-6 col-sm-12"

          style={{
            backgroundColor: '#F0F0F0',
            // width: '92%',
            // height: 70,
            marginLeft: 50,
            marginRight: 15,
            borderRadius: 5,
            padding: 10,
            display: 'flex',
            alignItems: 'start'
          }}>
          <div className="form-group col-md-6" style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'start',
            alignItems: 'center'
          }}>

            <Box>
            <Box className='' style={{marginBottom: 8, marginLeft: 5}}> {`${ city[0]?.city} > ${residentialType}  `} </Box>
              <HomeOutlinedIcon style={{
                color: 'black',
                size: "medium",
                marginLeft: 8
              }}
                sx={{ fontSize: 30, color: 'white' }} />
              <Box component="span" style={{
                fontFamily: 'sans-serif',
                fontWeight: 'bold'
              }}>Results:</Box>
              <Box component="span" style={{
                marginBottom: 15,
                padding: 5,
                fontFamily: 'sans-serif',
                color: '#fa2549'
              }}>{residentialType?.length}</Box>
              
            </Box>
             
          </div>

        </Box>
              <div></div>

        <div>
          <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} disableScroll >

            {city.map((data, id) => (

              <Card
                res_Type={data.residentialType}
                residentialType={residentialType}
                itemId={id} // NOTE: itemId is required for track items
                // title='Property Name will be here...'
                key={id}
                image={data.image}
                // countRent={data.countRent}
                // countSale={data.countSale}
                city={data.city}
                location={data.location}
                priceLowRange={data.priceLowRange}
                priceHighRange={data.priceHighRange}
                area={data.area}
                downPaymentAmount={data.downPaymentAmount}
                approvalStatus={data.approvalStatus}
                installmentPerMonth={data.installmentPerMonth}
                projectDuration = {data.projectDuration}
                onClick={handleClick(id)}
                selected={isItemSelected(id)}
                history={history}
              />

            ))}

          </ScrollMenu>
        </div>
      </div>
    </div>
  )
}

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);

  return (
    <ArrowCircleLeft style={{
      color: '#ffc107',
      cursor: 'pointer',
      marginTop: 210
    }} sx={{ fontSize: 40, color: 'white' }} disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
      Left
    </ArrowCircleLeft>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  return (
    <ArrowCircleRight style={{
      color: '#ffc107',
      cursor: 'pointer',
      marginTop: 210
    }} sx={{ fontSize: 40, color: 'white' }} disabled={isLastItemVisible} onClick={() => scrollNext()}>
      Right
    </ArrowCircleRight>
  );
}

function Card({ onClick, selected, title, itemId, history,downPaymentAmount
  ,installmentPerMonth,approvalStatus, city,area, location, image, res_Type , 
  residentialType, priceLowRange, priceHighRange, projectDuration }) {
  const store = useSelector(state => state.addNewProject)
  const dispatch = useDispatch()
  const visibility = React.useContext(VisibilityContext);
  //  console.log('priceLowrange, priceHighrange', priceLowRange,priceHighRange)
  //  console.log('store wala: priceLowrange, priceHighrange', store.userPanel)
  // console.log('pricehighrange from store',store.userPanel.priceRanges.priceHighRange)
  return (
    <div className="card col-md-4 col-sm-8" style={{
      cursor: 'pointer',
      width: 220,
      // height: 400,
      margin: '15px 10px',
      display: residentialType === '' ? 
      (((residentialType === res_Type || residentialType === '' ) && 
     (priceLowRange >= store.userPanel?.priceRanges.priceLowRange && priceHighRange <= store.userPanel?.priceRanges.priceHighRange) &&
      (area >= 0 && area <= store.userPanel.areaRange) && 
      (downPaymentAmount >= 0 && downPaymentAmount <= store.userPanel.downPaymentAmount) &&
      (approvalStatus === store.userPanel.approvalStatus) && 
      (installmentPerMonth >= 0 && installmentPerMonth <= store.userPanel.installmentPerMonth) && 
       (projectDuration >= 1  && projectDuration <= store.userPanel.projectDuration )) ? '' : 'none')
      : 
     (((residentialType === res_Type || residentialType === 'AllResidentialTypes') && 
     (priceLowRange >= store.userPanel?.priceRanges.priceLowRange && priceHighRange <= store.userPanel?.priceRanges.priceHighRange) &&
      (area >= 0 && area <= store.userPanel.areaRange) && 
      (downPaymentAmount >= 0 && downPaymentAmount <= store.userPanel.downPaymentAmount) &&
      (approvalStatus === store.userPanel.approvalStatus) && 
      (installmentPerMonth >= 0 && installmentPerMonth <= store.userPanel.installmentPerMonth) && 
       (projectDuration >= 1  && projectDuration <= store.userPanel.projectDuration ) ) ? '' : 'none')
    }}>
      <Image onClick={() => {
        console.log('Clicked')
        history.push({
          pathname: '/viewProjects',
          search: `data`,
          state: { params: '' }
        })
      }} className="card-img-top" src={`${image}`} alt="Card image cap" />
      {/* <div className="card-body">
        <h5 className="card-title" >{city}</h5>
     </div> */}
      <div className="card-footer" style={{padding: 10}}>
        <small className="text-muted">
          <div style={{
            display: 'flex',
            flexDirection: 'row'
          }}>
            <div style={{display: 'flex'}}>
              <HomeOutlinedIcon style={{
                color: 'black',
                size: "medium",
                margin: 2
              }} sx={{ fontSize: 40, color: 'white' }} />
              <span style={{
                fontSize: 14,
                // marginTop: 40,
                padding: 2,
                textAlign: 'center',
                color: 'black',
                fontFamily: 'sans-serif'
              }}>
                {/* <p>OnRent {countRent}</p>
                <p>{location}</p> */}
                <p style={{margin: 0}}>{city}</p>
                <p style={{margin: 0}}>{location}</p>
                <ul style={{listStyleType: 'none',fontFamily: 'cursive',fontSize:11, display: 'flex',flexDirection:'column', justifyContent: 'start'}}>
                  <li>Area: {area}sq.Ft</li>
                  <li>MinPrice: {priceLowRange}(PKR)</li>
                  <li>MaxPrice: {priceHighRange}(PKR)</li>
                </ul>
              </span>
           
            </div>

          </div>

        </small>
      </div>
    </div>
  );
}

export default Body