

import React from 'react'
import './Join.css'

export default function Join() {
  return (
    <div className='join'>
      <h1>Join The Exclusive Club</h1>
      <p>See our latest collections & exclusive offers before the crowd!</p>
      <div className='input-and-submit'>
        <input type="email" placeholder='Email' />
        <i className="bi bi-caret-right-fill"></i>
      </div>
      <p className='confirm'>By subscribing, I confirm that I am over 16 years of age and agree that my personal data can be used by Luxottica Group S.p.A to send me news, special offers, and other marketing communication as part of the Eyebuydirect Loyalty Program. For more information, see our Notice of Financial Incentives, Privacy Policy, and Terms & Conditions.</p>
    </div>
  )
}
