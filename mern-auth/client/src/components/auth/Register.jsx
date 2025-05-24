import React, { useState } from 'react';
import axios from 'axios';
import "./styles/Register.css"

const Register = () => {
    const [email, setEmail] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [password, setPassword] = useState("")

    async function register(e) {
        e.preventDefault()
        try {
            const registerData = {
                email,
                displayName,
                password,
            }

            await axios.post("http://localhost:4000/user/register", registerData)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={register}>
                <input
                    type='text'
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <input
                    type='text'
                    placeholder='Display Name'
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                />
                <input
                    type='text'
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <button type='submit'>Register</button>
            </form>
        </div>
    )
}

export default Register
