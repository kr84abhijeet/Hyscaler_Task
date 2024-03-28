import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function HolidayPackage() {
    const [name,setName] = useState('')
    const [duration,setDuration] = useState('')
    const [imageUrl,setImageUrl] = useState('')


    
    const navigate = useNavigate()
    const handleSubmit= (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/holiday/add',{name,duration ,image})
        .then(res => {
            console.log(res)

        })
        .catch(err => console.log(err))

    }
  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
        <div className="bg-white p-3 rounded w-25">
            <h2>Holiday Package</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="pacakge">
                        <strong>package Name</strong>
                    </label>
                    <input 
                    type="text"
                    placeholder="Enter your Destination"
                    autoComplete="off"
                    name="email"
                    className="form-control rounded-0"
                    onChange={(e)=> setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="duration">
                        <strong>Add Package Duration</strong>
                    </label>
                    <input
                    type="email"
                    placeholder="Add Duration"
                    autoComplete="off"
                    name="email"
                    className="form-control rounded-0" 
                    onChange={(e)=> setDuration(e.target.value)}
                    />

                </div>
                <div className="mb-3">
                    <label htmlFor="image">
                        <strong>Package Image</strong>
                    </label>
                    <input
                    type="text"
                    placeholder="Add an image"
                    name="email"
                    className="form-control rounded-0"
                    onChange={(e)=> setImageUrl(e.target.value)}
                    />

                </div>
                <button type="submit" className="btn btn-success w-100 rounded-0">
                    ADD DETAILS
                </button>
            </form>
            
        </div>

    </div>
  )
}

export default HolidayPackage

