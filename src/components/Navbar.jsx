import React from 'react'
import LogoutButton from './Logout'

function Navbar() {
  return (
    <div className='navbar'>
      <div className="left">
        <span>KitchenCart</span>
      </div>
      <div className="right">
        <span style={{marginRight: '10px'}}>Vedant Jain</span>
        <LogoutButton />
      </div>
    </div>
  )
}

export default Navbar