
import React, { useState } from 'react'
import './EditNavbarChiose.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateNavbarChoise } from '../../redux/apiCalls/navbarChoiseApiCall'

export default function EditNavbarChoise({ setEditNavbarChoiseModal }) {

  const dispatch = useDispatch()
  const { oneNavbarChoise } = useSelector(state => state.navbarChoise)
  const [title, setTitle] = useState(oneNavbarChoise?.title)

  const updateHandler = (e) => {
    e.preventDefault()
    dispatch(updateNavbarChoise({ title }, oneNavbarChoise._id))
  }

  return (
    <div className='edit-navbarChoise'>
      <form onSubmit={updateHandler} className='edit-navbarChoise-form'>
        <i onClick={() => { setEditNavbarChoiseModal(false) }} className="bi bi-x-lg close-editNavbarChioseModal"></i>
        <h2 className='edit-navbarChoise-title'>edit navbar chiose</h2>
        <div className='label-input'>
          <label className='edit-navbarChoise-label' htmlFor="">title</label>
          <input value={title} onChange={(e) => { setTitle(e.target.value) }} className='edit-navbarChoise-input' type="text" name="" id="" />
        </div>
        <button className='edit-navbarChoise-btn'>update</button>
      </form>
    </div>
  )
}
