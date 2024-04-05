import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Registration() {
    const [name,setName] = useState()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const navigate = useNavigate()
    const handleSubmit= (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/register',{name,email,password})
        .then(res => {
            alert('Registration successfully!');
            navigate('/login')

        })
        .catch(err => console.log(err))

    }
  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
        <div className="bg-white p-3 rounded w-25">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Name</strong>
                    </label>
                    <input 
                    type="text"
                    placeholder="Enter your name"
                    autoComplete="off"
                    name="email"
                    className="form-control rounded-0"
                    onChange={(e)=> setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Email</strong>
                    </label>
                    <input
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="off"
                    name="email"
                    className="form-control rounded-0" 
                    onChange={(e)=> setEmail(e.target.value)}
                    />

                </div>
                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Password</strong>
                    </label>
                    <input
                    type="password"
                    placeholder="Enter your password"
                    name="email"
                    className="form-control rounded-0"
                    onChange={(e)=> setPassword(e.target.value)}
                    />

                </div>
                <button type="submit" className="btn btn-success w-100 rounded-0">
                    Register
                </button>
            </form>
            <p>Already Have an Account</p>
            <button className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
            <Link to ="/login" className='form-control rounded-0'><strong>Login</strong></Link>
            </button>
        </div>

    </div>
  )
}

export default Registration
