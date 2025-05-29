import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';

const AdminContext = createContext()


const AdminContextProvider = (props) => {
    const [isAdmin, setIsAdmin] = useState(undefined)

     async function getIsAdmin(props) {
        const isAdminRes = await axios.get("http://localhost:4000/user/isAdmin",{withCredentials: true})
        setIsAdmin(isAdminRes.data)
    }
    useEffect(() => {
        getIsAdmin()
    },[])

    return (
         <AdminContext.Provider value={{isAdmin,getIsAdmin}}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContext
export {AdminContextProvider}
