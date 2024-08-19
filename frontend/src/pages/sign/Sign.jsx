

import React from 'react'
import './Sign.css'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../../redux/apiCalls/AuthApiCall';
import swal from 'sweetalert'


export default function Sign() {


  const dispatch = useDispatch()
  const { registerMessage } = useSelector(state => state.auth)

  const [signType, setSignType] = useState('in');

  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const LoginHandlerSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
  }

  const registerHandlerSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ userName, email, password }))
  }



  return (

    <section className='sign-page'>
      <div className='sign-page-all-components'>

        <div className='page-titles'>
          <h1 className={signType === 'in' ? 'on' : ''} onClick={() => { setSignType('in') }}>Sign in</h1>
          <h1 className={signType === 'up' ? 'on' : ''} onClick={() => { setSignType('up') }}>I'm new</h1>
        </div>


        {signType === 'in' ?

          <form onSubmit={LoginHandlerSubmit} className='sign-form' action="">
            <p className='form-title'>
              sign in with
            </p>
            <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" name="" id="" placeholder='Email' />
            <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder='Password' />
            <div className='Keep-me'>
              <input className='checkbox' type="checkbox" />
              <p className='keep-text'>Keep me signed in</p>
            </div>
            <button className='sign-btn'>Sign in</button>
          </form>

          :

          <form onSubmit={registerHandlerSubmit} className='sign-form' action="">
            <p className='form-title'>
              sign up with
            </p>
            <input value={userName} onChange={(e) => { setUserName(e.target.value) }} type="text" name="" id="" placeholder='Username' />
            <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" name="" id="" placeholder='Email' />
            <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder='Password' />


            <button className='sign-btn'>Sign up</button>

          </form>}


        {signType === 'in' && <Link to='/forgot-password'>Forgot your password?</Link>}

      </div>
    </section>
  )
}
