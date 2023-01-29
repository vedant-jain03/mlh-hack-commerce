import React from 'react'
import LogoutButton from './Logout'
import LoginButton from './Login'
import Profile from './Profile'
import { useAuth0 } from '@auth0/auth0-react'
import logo from '../img/logo.png'

function Navbar() {
  const { isAuthenticated } = useAuth0();
  return (
    <div className='navbar'>
      <div className="left">
        <span>KitchenCart</span>
      </div>
      <div className="right"
      style={{"display":"flex", "alignItems":"center"}}>
      { isAuthenticated ? <><Profile /><LogoutButton/></> : <LoginButton />}
      </div>
    </div>
  )
}

export default Navbar