import React, { useContext, useEffect, useState } from 'react'
import AdminContext from '../../context/AdminContext'
import AuthContext from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import {Table,Button } from 'react-bootstrap'

const Admin = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState([]);
    const {isAdmin} = useContext(AdminContext)
    const {loggedIn} = useContext(AuthContext)
    
    useEffect(() => {

        const fetchUsers = async () => {
            try {
                const usersRes = await fetch("http://localhost:4000/user/getUsers",{
                    credentials: "include",
                })
                console.log(usersRes)
                if (!usersRes.ok) navigate("/")
                const data = await usersRes.json()
                setUsers(data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchUsers()
            
        

      }, [isAdmin,loggedIn,navigate]);

      async function deleteUser(email) {
        try {
            const deleteRes = await fetch(`http://localhost:4000/user/delete/${email}`, {
                method: 'DELETE',
                credentials: "include",
            })
            if (deleteRes.ok) {
                setUsers(users.filter(user => user.email !== email))
            }
        } catch (err) {
            alert(err)
        }   
    }
  return (
    
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                <th>#</th>
                <th>Display Name</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                <tr key={user._id || index} style={{ color: user.isAdmin ? 'red' : 'black' }}>
                    <td>{index + 1}</td>
                    <td>{user.displayName}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                    <td>
                    <Button 
                        variant="danger" 
                        size="sm" 
                        onClick={() => deleteUser(user.email)}
                    >
                        Delete
                    </Button>
                    </td>
                </tr>
                ))}
            </tbody>
        </Table>
    
  )
}

export default Admin
