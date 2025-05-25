import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from "../../context/AuthContext";
import LogOutBtn from '../auth/LogOutBtn';
import AdminContext from '../../context/AdminContext';

const Navbar = () => {
  const { loggedIn } = useContext(AuthContext);
  const {isAdmin} = useContext(AdminContext)
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
          {isAdmin === true && (
            <>
              <Link to="/admin">Admin</Link>
            </> 
          )}
        </>
      )}

    </div>
  )
}

export default Navbar
