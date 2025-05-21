import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";

const Header = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['token', 'role']);
    console.log("jjjjjjjjj")
    console.log(cookies)
    const navigate = useNavigate()

    const handleLogout = async (e) => {
        e.preventDefault();
        removeCookie("token")
        removeCookie("role")
        navigate("/login")
    }
    return (
        <Navbar bg={cookies.token ? "primary" : "dark"} variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="" >
                    {cookies.token ? "Loggen-in" : "Not-Loggedin"}
                </Navbar.Brand>
                <Nav className="me-auto">
                    {cookies.token ? (
                        <>
                            <Nav.Link as={Link} to="/dashboard" className='nav-link'>dashboard</Nav.Link>
                            <Nav.Link as={Link} onClick={handleLogout} className='nav-link'>logout</Nav.Link>
                        </>
                    ) : (
                        <>
                            <Nav.Link as={Link} to="/register" className='nav-link'>Signup</Nav.Link>
                            <Nav.Link as={Link} to="/login" className='nav-link'> Login</Nav.Link>
                        </>
                    )}
                    {cookies.role === 'admin' ? (
                        <>
                            <Nav.Link as={Link} to="/admin" className='nav-link'> Admin</Nav.Link>
                        </>
                    ) : (
                        <>
                        </>
                    )}


                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header; 
