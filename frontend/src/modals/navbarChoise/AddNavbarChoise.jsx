


import React, { useState } from 'react'
import './EditNavbarChiose.css'
import { useDispatch } from 'react-redux'
import { createNavbarChoise } from '../../redux/apiCalls/navbarChoiseApiCall'



export default function AddNavbarChoise({setAddNavbarChoiseModal}) {

    
  const dispatch = useDispatch()
  
  const [title, setTitle] = useState('')

  const createHandler = (e) => {
    e.preventDefault()
    dispatch(createNavbarChoise({title}))
    setAddNavbarChoiseModal(false)
  }




  return (
    <div className='edit-navbarChoise'>
    <form onSubmit={createHandler} className='edit-navbarChoise-form'>
      <i onClick={() => { setAddNavbarChoiseModal(false) }} className="bi bi-x-lg close-editNavbarChioseModal"></i>
      <h2 className='edit-navbarChoise-title'>add navbar chiose</h2>
      <div className='label-input'>
        <label className='edit-navbarChoise-label' htmlFor="">title</label>
        <input value={title} onChange={(e) => { setTitle(e.target.value) }} className='edit-navbarChoise-input' type="text" name="" id="" />
      </div>
      <button className='edit-navbarChoise-btn'>Add</button>
    </form>
  </div>
  )
}
