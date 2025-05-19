import { React } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const token = localStorage.getItem("token")
  const [user, setUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
    const fetchUsers = async (e) => {
      try {
        const response = await fetch("http://localhost:4000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (response.ok) {
          const result = await response.json()
          setUsers(result)
        } else {
          navigate("/login")
        }
      } catch (err) {
        console.log(err)
        navigate("/login")
      }
    }
    fetchUsers()
  }, [token, navigate])


  return (
    <div>Dashboard Page</div>
  );
};

export default Dashboard;