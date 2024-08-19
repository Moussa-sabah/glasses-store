

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createCategory } from '../../redux/apiCalls/navbarChoiseApiCall'
import './AddCategory.css'

export default function AddCategory({ setAddCategoryModal, navbarChoise }) {

  const dispatch = useDispatch()
  const [title, setTitle] = useState('')


  const createHandler = (e) => {
    e.preventDefault()
    dispatch(createCategory({ title, navbarChoise }))
    setAddCategoryModal(false)
  }


  return (
    <div className='add-category'>
      <form onSubmit={createHandler} className='add-category-form'>
        <i onClick={() => { setAddCategoryModal(false) }} className="bi bi-x-lg close-addNavbarChioseModal"></i>
        <h2 className='add-category-title'>add category</h2>
        <div className='label-input'>
          <label className='add-category-label' htmlFor="">title</label>
          <input value={title} onChange={(e) => { setTitle(e.target.value) }} className='add-category-input' type="text" name="" id="" />
        </div>
        <button className='add-category-btn'>add</button>
      </form>
    </div>
  )
}
