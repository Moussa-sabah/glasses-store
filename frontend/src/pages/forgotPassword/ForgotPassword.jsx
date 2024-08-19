

import React, { useState } from 'react'
import './ForgotPassword.css'
import { useDispatch } from 'react-redux'
import { sendResetPasswordLink } from '../../redux/apiCalls/PasswordApiCall'

export default function ForgotPassword() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(sendResetPasswordLink({email}))
  }
  console.log(email)
  return (
    <div className='forgotPassword'>
      <h1 className='forgotPassword-title'>Forgot Password</h1>
      <p className='forgotPassword-text'>Enter your email address and we'll send you a link to create a new one.</p>
      <form onSubmit={submitHandler} className='forgotPassword-form'>
        <input value={email} onChange={(e) => { setEmail(e.target.value) }} className='forgotPassword-input' type="email" placeholder='Email' />
        <button className='forgotPassword-btn'>Submit</button>
      </form>
    </div>
  )
}
