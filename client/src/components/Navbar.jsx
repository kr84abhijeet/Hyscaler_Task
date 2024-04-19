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
            
            <Link to ="/" className='navbar-link'>Dashboard</Link>
            <Link to ="/sales" className='navbar-link'>SalesForm</Link>
            <Link to ="/uimatrix" className='navbar-link'>IncentiveMatrix</Link>
            <Link to ="/calculate" className='navbar-link'>Calculate</Link>
            <Link to ="/create" className='navbar-link'>CreateIncentive</Link>
            
            
            <Link to ="/holiday-package" className='navbar-link'>Holiday Package</Link>
            <Link to ="/packages" className='navbar-link'>Holiday Package List</Link>
            <Link to ="/register" className='navbar-link'>Register Employee</Link>
            <Link to ="/login" className='navbar-link'>Login</Link>
            <Link to ="/send-mail" className='navbar-link'>Notification</Link>
        </div>
    </nav>
  )
}

export default Navbar
