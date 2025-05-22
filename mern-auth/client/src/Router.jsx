import React from 'react'
import Register from "./components/auth/Register";
import Login from "./components/auth/Login"
import Chat from "./components/chat/Chat"
import Navbar from "./components/layout/Navbar"

import {BrowserRouter, Routes, Route } from 'react-router-dom';
const Router = () => {
  return (
    <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
            <Route>
                <Route path="/register" element={<Register></Register>} />
                <Route path="/chat" element={<Chat></Chat>} />
                <Route path="/" element={<Login></Login>} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default Router
