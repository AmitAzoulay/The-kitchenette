import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';

const AuthContext = createContext()

const AuthContextProvider = () => {
    const [loggedIn, setLoggedIn] = useState(undefined)

    async function getLoggedIn() {
        const loggedInRes = await axios.get("http://localhost:4000/user/loggedIn")
        setLoggedIn(loggedInRes.data)
    }

    useEffect(() => {
        getLoggedIn()
    },[])
    return (
        <AuthContext.Provider value={{loggedIn,getLoggedIn}}>
            aaaaaa
        </AuthContext.Provider>
    )
}

export default AuthContext
export {AuthContextProvider}