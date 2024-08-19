

import React, { useState } from 'react'
import './EditAccount.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../redux/apiCalls/AuthApiCall'

export default function EditAccount({ setEditAccountModal }) {

  const dispatch = useDispatch()
  const { oneUser } = useSelector(state => state.auth)
  const [userName, setUserName] = useState(oneUser?.userName)

  const updateAccountHandler = () => {
    dispatch(updateUser({ userName }, oneUser._id))
    setEditAccountModal(false)
  }
  return (
    <div className='edit-account'>
      <form onSubmit={updateAccountHandler} className='edit-name-form'>
        <i onClick={() => { setEditAccountModal(false) }} className="bi bi-x-lg close-editNavbarChioseModal"></i>
        <h2 className='edit-name-title'>Edit Account</h2>
        <div className='label-input'>
          <label className='edit-name-label' htmlFor="">Name</label>
          <input value={userName} onChange={(e) => { setUserName(e.target.value) }} className='edit-name-input' type="text" name="" id="" />
        </div>
        <button className='update-account-btn'>update</button>
      </form>
    </div>
  )
}
