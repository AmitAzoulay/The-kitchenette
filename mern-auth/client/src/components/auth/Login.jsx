import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';


const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { getLoggedIn } = useContext(AuthContext)
    async function login(e) {
        e.preventDefault()
        try {
            const loginData = {
                email,
                password,
            }

            const response = await axios.post("http://localhost:4000/user/login", loginData)
            if (response.status === 200) {
                await getLoggedIn()
                navigate("/chat")
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={login}>
                <input
                    type='text'
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <input
                    type='text'
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login
