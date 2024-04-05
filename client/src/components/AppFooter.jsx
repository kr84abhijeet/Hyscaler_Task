import React from 'react'
import '../css/AppFooter.css'

const AppFooter = () => {
  return (
    <div className='footer'>
      <div className="footer-wrapper"></div>
        <div className="footer-faded-text">Hyscaler</div>
        <div className="link-wrapper">
          <div><a href="">Sales</a></div>
          <div><a href="/holiday-package">Holiday Package</a></div>
          <div><a href="/dashboard">Dashboard</a></div>
          <div><a href="/holiday-package">Holiday Package</a></div>
          <div><a href="/">Sales</a></div>
          <div><a href="/login">User</a></div>
          <div><a href="/send-mail">Contact Me</a></div>
          
      </div>
    </div>
  )
}

export default AppFooter
