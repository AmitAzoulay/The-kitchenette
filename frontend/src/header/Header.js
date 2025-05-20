import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';


const Header = () => {
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")
    const navigate = useNavigate()

    const handleLogout = async (e) => {
        e.preventDefault();
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        navigate("/login")
    }
    return (
        <Navbar bg={token ? "primary" : "dark"} variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="" >
                    {token ? "Loggen-in" : "Not-Loggedin"}
                </Navbar.Brand>
                <Nav className="me-auto">
                    {token ? (
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
                    {role === 'admin' ? (
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
