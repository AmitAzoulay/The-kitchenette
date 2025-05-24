import React, { useContext } from 'react'
import Register from "./components/auth/Register";
import Login from "./components/auth/Login"
import Chat from "./components/chat/Chat"
import Navbar from "./components/layout/Navbar"

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthContext from './context/AuthContext';
const Router = () => {

  const { loggedIn } = useContext(AuthContext)
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route>
          {
            loggedIn === false && <>
              <Route path="/register" element={<Register></Register>} />
              <Route path="/" element={<Login></Login>} />
            </>
          }

          <Route path="/chat" element={<Chat></Chat>} />




        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
