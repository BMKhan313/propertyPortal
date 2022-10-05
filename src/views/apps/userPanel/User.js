import React from 'react'
import Body from './Components/Body'
import Header from './Components/Header'
import SectionDivider from './Components/SectionDivider'
import './User.css'

const User = () => {
  return (
    <div className='user__panel'>
      <Header />
      <SectionDivider />
      <Body />
    </div>
  )
}

export default User