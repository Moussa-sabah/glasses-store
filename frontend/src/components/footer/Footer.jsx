


import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <div className='Footer'>
      <div className='follow-us'>
        <h3>Follow Us</h3>
        <div className='follow-us-links'>
          <a href=""><i className="bi bi-facebook"></i></a>
          <a href=""><i className="bi bi-youtube"></i></a>
          <a href=""><i className="bi bi-twitter"></i></a>
          <a href=""><i className="bi bi-instagram"></i></a>
          <a href=""><i className="bi bi-tiktok"></i></a>
        </div>
      </div>

      <p className='copyright'>© 2006-2024 GlassesWeb.com</p>
    </div>
  )
}
