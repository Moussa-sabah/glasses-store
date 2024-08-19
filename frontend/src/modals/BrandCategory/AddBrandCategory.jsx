


import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createCategory } from '../../redux/apiCalls/navbarChoiseApiCall'
import { createBrandCategory } from '../../redux/apiCalls/BrandApiCall'

export default function AddBrandCategory({ setAddBrandCategoryModal, brand }) {

  const dispatch = useDispatch()
  const [title, setTitle] = useState('')


  const createHandler = (e) => {
    e.preventDefault()
    dispatch(createBrandCategory({ title, brand }))
    setAddBrandCategoryModal(false)
  }

  return (
    <div className='add-category'>
      <form onSubmit={createHandler} className='add-category-form'>
        <i onClick={() => { setAddBrandCategoryModal(false) }} className="bi bi-x-lg close-addNavbarChioseModal"></i>
        <h2 className='add-category-title'>add brand category</h2>
        <div className='label-input'>
          <label className='add-category-label' htmlFor="">title</label>
          <input value={title} onChange={(e) => { setTitle(e.target.value) }} className='add-category-input' type="text" name="" id="" />
        </div>
        <button className='add-category-btn'>add</button>
      </form>
    </div>
  )
}
