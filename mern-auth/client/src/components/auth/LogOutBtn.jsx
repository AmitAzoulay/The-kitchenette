import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';


const LogOutBtn = () => {
    const navigate = useNavigate()
    const { getLoggedIn } = useContext(AuthContext);

    async function logout() {
        await axios.get("http://localhost:4000/user/logout");
        await getLoggedIn();
        navigate("/")
    }
    return (
        <button onClick={logout}>
            Log Out
        </button>
    )
}

export default LogOutBtn
