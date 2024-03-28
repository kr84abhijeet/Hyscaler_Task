import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Navbar.css'

const Navbar = () => {
  return (
    <nav className='navbar'>
        <div className='navbar-left'>
            <Link to="/ "className='navbar-brand'>Employee Dashboard</Link>
        </div>
        <div className='navbar-right'>
            <Link to ="/sales" className='navbar-link'>Sales</Link>
            <Link to ="/" className='navbar-link'>Dashboard</Link>
            
            <Link to ="/holidaypackage" className='navbar-link'>Holiday Package</Link>
            <Link to ="/register" className='navbar-link'>Register Employee</Link>
            <Link to ="/login" className='navbar-link'>Login</Link>
            <Link to ="/contact" className='navbar-link'>Contact US</Link>
        </div>
    </nav>
  )
}

export default Navbar
