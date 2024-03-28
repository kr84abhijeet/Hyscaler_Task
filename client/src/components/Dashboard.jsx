import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Dashboard = () => {
    const [message,setMessage] = useState()
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3001/dashboard')
        .then(res => {
            if(res.data.valid){
                setMessage(res.data.message)

            }
            else{
                navigate('/')

            }
        })
        .catch(res => console.log(err))

    })
  return (
    <h2>Dashboard {message}</h2>
  )
}

export default Dashboard
