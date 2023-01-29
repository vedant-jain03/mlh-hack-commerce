import React from 'react'
import LogoutButton from './Logout'
import LoginButton from './Login'
import Profile from './Profile'
import { useAuth0 } from '@auth0/auth0-react'

function Navbar() {
  const { isAuthenticated } = useAuth0();
  return (
    <div className='navbar'>
      <div className="left">
        <span>KitchenCart</span>
      </div>
      <div className="right"
      style={{"display":"flex", "alignItems":"center"}}>
      { isAuthenticated ? <><Profile /><LogoutButton/></> : null}
      </div>
    </div>
  )
}

export default Navbar