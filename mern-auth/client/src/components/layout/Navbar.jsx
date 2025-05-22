import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <Link to="/">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/chat">chat</Link>
    </div>
  )
}

export default Navbar
