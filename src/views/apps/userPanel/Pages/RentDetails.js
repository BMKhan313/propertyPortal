import React from 'react'
import Body from '../Components/RentDetails/Body'
import Filter from '../Components/RentDetails/Filter'
import Header from '../Components/RentDetails/Header'

const RentDetails = ({city}) => {
  // console.log('city haris',city)
  return (
    <div>
        {/* <Header /> */}
        <Filter />
        <Body city={city}/>
    </div>
  )
}

export default RentDetails