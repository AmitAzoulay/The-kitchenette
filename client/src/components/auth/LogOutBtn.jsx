import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import AdminContext from '../../context/AdminContext';
import { Nav } from 'react-bootstrap';
const LogOutBtn = () => {
    const navigate = useNavigate()
    const { getLoggedIn } = useContext(AuthContext);
    const {getIsAdmin} = useContext(AdminContext)

    async function logout() {
        await axios.get("http://localhost:4000/user/logout");
        await getIsAdmin()
        await getLoggedIn();
        navigate("/")
    }
    return (
        <Nav.Link onClick={logout}>
            Log Out
        </Nav.Link  >
    )
}

export default LogOutBtn
