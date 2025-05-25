import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from "../../context/AuthContext";
import AdminContext from '../../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import {Container, Nav, Navbar } from 'react-bootstrap'
import axios from 'axios';

const NavbarHeader = () => {
  const navigate = useNavigate()
  const { loggedIn } = useContext(AuthContext)
  const {isAdmin} = useContext(AdminContext)
  const { getLoggedIn } = useContext(AuthContext)
  const {getIsAdmin} = useContext(AdminContext)
  async function logout() {
        await axios.get("http://localhost:4000/user/logout");
        await getIsAdmin()
        await getLoggedIn();
        navigate("/")
    }
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {loggedIn === false && (
              <>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                <Nav.Link as={Link} to="/">Log In</Nav.Link>
              </>
            )}
            {loggedIn === true && (
              <>
                <Nav.Link as={Link} to="/chat">Chat</Nav.Link>
                {isAdmin === true && (
                  <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
                )}
                <Nav.Link onClick={logout}>
                            Log Out
                        </Nav.Link  >
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarHeader
