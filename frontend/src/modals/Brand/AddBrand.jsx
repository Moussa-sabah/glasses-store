





import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNavbarChoise } from '../../redux/apiCalls/navbarChoiseApiCall'
import { createBrand } from '../../redux/apiCalls/BrandApiCall'



export default function AddBrand({ setAddBrandModal }) {


  const dispatch = useDispatch()

  const [title, setTitle] = useState('')

  const createHandler = (e) => {
    e.preventDefault()
    dispatch(createBrand({ title }))
    setAddBrandModal(false)
  }



  return (
    <div className='edit-navbarChoise'>
      <form onSubmit={createHandler} className='edit-navbarChoise-form'>
        <i onClick={() => { setAddBrandModal(false) }} className="bi bi-x-lg close-editNavbarChioseModal"></i>
        <h2 className='edit-navbarChoise-title'>add brand</h2>
        <div className='label-input'>
          <label className='edit-navbarChoise-label' htmlFor="">title</label>
          <input value={title} onChange={(e) => { setTitle(e.target.value) }} className='edit-navbarChoise-input' type="text" name="" id="" />
        </div>
        <button className='edit-navbarChoise-btn'>Add</button>
      </form>
    </div>
  )
}
