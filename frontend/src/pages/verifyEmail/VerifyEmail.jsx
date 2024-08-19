

import React, { useEffect } from 'react'
import './VerifyEmail.css'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { verificationEmail } from '../../redux/apiCalls/AuthApiCall'

export default function VerifyEmail() {

  const dispatch = useDispatch()
  const { isEmailVerified } = useSelector(state => state.auth)
  const { userId, token } = useParams()

  useEffect(() => {
    dispatch(verificationEmail(userId, token))
    // eslint-disable-next-line
  }, [userId, token]);

  return (
    <div className='verifyEmail'>
      {isEmailVerified ? <>  <i class="bi bi-patch-check verifyEmail-successIcon"></i>
        <h1 className='verifyEmail-successText'>Your email is verified successfully, please log in </h1>
        <Link to='/passport' className='verifyEmail-loginLink'>Go to login page</Link></>
        :
        <h1 className='verifyEmail-notFoundText'>Not found</h1>
      }
    </div>
  )
}


