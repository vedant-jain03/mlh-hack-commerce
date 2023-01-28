import React from 'react'

function Navbar() {
  return (
    <div className='navbar'>
      <div className="left">
        <span>KitchenCart</span>
      </div>
      <div className="right">
        <span style={{marginRight: '10px'}}>Vedant Jain</span>
        <button>Logout</button>
      </div>
    </div>
  )
}

export default Navbar