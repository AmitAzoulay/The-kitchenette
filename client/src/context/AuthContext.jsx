import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';

const AuthContext = createContext()

const AuthContextProvider = (props) => {
    const [loggedIn, setLoggedIn] = useState(undefined)

    async function getLoggedIn(props) {
        const loggedInRes = await axios.get("http://localhost:4000/user/loggedIn",{withCredentials: true})
        setLoggedIn(loggedInRes.data)
    }

    useEffect(() => {
        getLoggedIn()
    },[])
    return (
        <AuthContext.Provider value={{loggedIn,getLoggedIn}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext
export {AuthContextProvider}