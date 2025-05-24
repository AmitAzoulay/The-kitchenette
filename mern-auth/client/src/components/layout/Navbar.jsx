import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from "../../context/AuthContext";
import LogOutBtn from '../auth/LogOutBtn';

const Navbar = () => {
  const { loggedIn } = useContext(AuthContext);
  console.log(loggedIn)
  return (
    <div>
      {loggedIn === false && (
        <>
          <Link to="/register">Register</Link>
          <Link to="/">Log in</Link>
        </>
      )}
      {loggedIn === true && (
        <>
          <Link to="/chat">chat</Link>
          <LogOutBtn />
        </>
      )}

    </div>
  )
}

export default Navbar
