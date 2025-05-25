import React, { useContext, useEffect } from 'react'
import AdminContext from '../../context/AdminContext'
import AuthContext from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Admin = () => {
    const navigate = useNavigate()
    const {isAdmin} = useContext(AdminContext)
    const {loggedIn} = useContext(AuthContext)
    useEffect(() => {
        const preventAdminBypass = async () => {
          if(!loggedIn) {
            navigate("/")
          }
          else if(!isAdmin) {
            navigate("/chat")
          }
        }
        preventAdminBypass()
    
      }, [isAdmin,loggedIn,navigate]);
  return (
    <div>
      <h1>Admin</h1>
    </div>
  )
}

export default Admin
