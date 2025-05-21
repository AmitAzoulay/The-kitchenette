import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Button, Form, FormControl} from 'react-bootstrap'
import "./styles/Register.css"

const Register = () => {
        const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        name: '',
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
            const response = await fetch("http://localhost:4000/user/register", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(formData)
            })
            const result = await response.json()
            console.log(result)
            navigate("/login")
        } catch(err) {
            console.log(err.message)
        } finally {
            setFormData({
                email:"",
                name:"",
                password:""
            })
        }
    }
  return (
    <div className='center-form'>
            <Form onSubmit={handleSubmit}>
                <h1>Signup</h1>
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
                <Form.Group controlId='formBasicUser'>
                    <Form.Label>
                        Name
                    </Form.Label>
                    <FormControl
                        type="text"
                        name="name"
                        placeholder='Enter Name'
                        value={formData.name}
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
                    Signup
                </Button>
            </Form>
        </div>
  )
}

export default Register
