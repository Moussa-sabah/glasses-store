

import React, { useEffect, useState } from 'react'
import './ForgotPassword.css'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getResetPasswordPage, resetPassword } from '../../redux/apiCalls/PasswordApiCall'
import { useNavigate } from 'react-router-dom'

export default function ResetPassword() {
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userId, token } = useParams()
  const [password, setPassword] = useState('')
  const { isError } = useSelector(state => state.password)

  useEffect(() => {
    dispatch(getResetPasswordPage(userId, token))
    // eslint-disable-next-line
  }, [userId, token]);

  const resetHandler = (e) => {
    e.preventDefault()
    dispatch(resetPassword({ userId, token }, { password }))
    navigate('/passport')
  }


  return (
    <div className='forgotPassword'>
      {isError ? <><h1>Not found</h1></>
        : <>
          <h1 className='forgotPassword-title'>Reset Password</h1>
          <p className='forgotPassword-text'>Enter your new password</p>
          <form onSubmit={resetHandler} className='forgotPassword-form'>
            <input onChange={(e) => { setPassword(e.target.value) }} className='forgotPassword-input' type="password" placeholder='Password' />
            <button className='forgotPassword-btn'>Reset</button>
          </form></>}
    </div>
  )
}
