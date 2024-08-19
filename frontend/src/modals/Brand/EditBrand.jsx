



import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { updateNavbarChoise } from '../../redux/apiCalls/navbarChoiseApiCall'
import { updateBrand } from '../../redux/apiCalls/BrandApiCall'

export default function EditBrand({ setEditBrandModal }) {

  const dispatch = useDispatch()
  const { oneBrand } = useSelector(state => state.brand)
  const [title, setTitle] = useState(oneBrand?.title)

  const updateHandler = (e) => {
    e.preventDefault()
    dispatch(updateBrand({ title }, oneBrand._id))
  }

  return (
    <div className='edit-navbarChoise'>
      <form onSubmit={updateHandler} className='edit-navbarChoise-form'>
        <i onClick={() => { setEditBrandModal(false) }} className="bi bi-x-lg close-editNavbarChioseModal"></i>
        <h2 className='edit-navbarChoise-title'>edit brand</h2>
        <div className='label-input'>
          <label className='edit-navbarChoise-label' htmlFor="">title</label>
          <input value={title} onChange={(e) => { setTitle(e.target.value) }} className='edit-navbarChoise-input' type="text" name="" id="" />
        </div>
        <button className='edit-navbarChoise-btn'>update</button>
      </form>
    </div>
  )
}
