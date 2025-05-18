import React from 'react';
import {Button, Form, FormControl} from 'react-bootstrap'
import "./Login.css"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const handleInputchange = (event) => {
        const {name, value} = event.target
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:4000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(formData)
            })
            const result = await response.json()
            
            if(result.message === "Invalid creds") {
                alert("Invalid creds... Try again")
            }
            else{
                localStorage.setItem("token", result.token)
                navigate("/dashboard")
            }
        } catch(err) {
            console.log(err.message)
        } finally {
            setFormData({
                email:"",
                password:""
            })
        }
    }

    return (
        <div className='center-form'>
                <Form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <Form.Group controlId='formBasicEmail'>
                        <Form.Label>
                            Email address
                        </Form.Label>
                        <FormControl
                            type="text"
                            name="email"
                            placeholder='Enter email'
                            value={formData.email}
                            onChange={handleInputchange}
                        />
                    </Form.Group>
                    <Form.Group controlId='formBasicPassword'>
                        <Form.Label>
                            Password
                        </Form.Label>
                        <FormControl
                            type="text"
                            name="password"
                            placeholder='Enter password'
                            value={formData.password}
                            onChange={handleInputchange}
                        />
                    </Form.Group>
                    <Button variant='dark' type='submit' className='w-100'>
                        Login
                    </Button>
                </Form>
            </div>

    );
};

export default Login
