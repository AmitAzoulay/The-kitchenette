import React, { createContext, useEffect, useState } from 'react'
import axios from '../axios';

const AuthContext = createContext()

const AuthContextProvider = (props) => {
    const [loggedIn, setLoggedIn] = useState(undefined)

    async function getLoggedIn(props) {
        try {
            const loggedInRes = await axios.get(`/user/loggedIn`, { withCredentials: true })
            setLoggedIn(loggedInRes.data)
        } catch (err) {
            console.log("Internal error, serve might be down")
        }

    }

    useEffect(() => {
        getLoggedIn()
    }, [])
    return (
        <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext
export { AuthContextProvider }