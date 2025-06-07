import React, { createContext, useEffect, useState } from 'react'
import axios from '../axios'

const AdminContext = createContext()


const AdminContextProvider = (props) => {
    const [isAdmin, setIsAdmin] = useState(undefined)

    async function getIsAdmin(props) {
        try {
            const isAdminRes = await axios.get(`/user/isAdmin`, { withCredentials: true })
            setIsAdmin(isAdminRes.data)
        } catch (err) {
            console.log("Internal error, serve might be down")
        }

    }
    useEffect(() => {
        getIsAdmin()
    }, [])

    return (
        <AdminContext.Provider value={{ isAdmin, getIsAdmin }}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContext
export { AdminContextProvider }
