


import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { logoutUser } from '../../redux/apiCalls/AuthApiCall'
import { Link } from 'react-router-dom'

export default function HeaderRight() {

  const dispatch = useDispatch()
  const { allFavorites } = useSelector(state => state.auth)
  const { cart } = useSelector(state => state.auth)
  const { user } = useSelector(state => state.auth)
  const [userModal, setUserModal] = useState(false)

  const logoutHandlerSubmit = (e) => {
    e.preventDefault()
    dispatch(logoutUser())
    setUserModal(false)
  }


  const getUserModal = () => {
    if (userModal) {
      setUserModal(false)
    }
    else {
      setUserModal(true)
    }
  }

  return (

    <div className="header-right">
      {!user && <Link to='/passport' className='header-right-signin'>Sign In</Link>}

      {user && <div className='userName-logout-account'>
        {userModal && <div className='userModal'>
          <Link to={`/my-account/${user?.id}`} onClick={() => { setUserModal(false) }} className='account-link'>My Account</Link>
          <button onClick={logoutHandlerSubmit} className='logout-btn'>Logout</button>
        </div>
        }
        <Link onClick={getUserModal} className='userName'>{user?.userName}</Link>
      </div>}
      <div style={{ display: 'flex', "gap": '20px' }}>  <div className='favorites-componenets'>
        {allFavorites?.length > 0 && <p className='favorites-number'>{allFavorites?.length}</p>}
        <Link to='/favorites' className='header-right-link'><i className="bi bi-suit-heart"></i></Link>
      </div>
        <div className='cart-componenets'>
          {cart?.length > 0 && <p className='cart-number'>{cart?.length}</p>}
          <Link to='/cart' className='header-right-link'><i className="bi bi-cart3"></i></Link>
        </div></div>
    </div>
  )
}
