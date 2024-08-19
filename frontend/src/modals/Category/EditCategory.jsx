

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateCategory } from '../../redux/apiCalls/navbarChoiseApiCall'
import './EditCategory.css'

export default function EditCategory({ setEditCategoryModal }) {


  const dispatch = useDispatch()
  const { oneCategory } = useSelector(state => state.navbarChoise)
  const [title, setTitle] = useState(oneCategory?.title)

  const updateHandler = (e) => {
    e.preventDefault()
    dispatch(updateCategory({ title }, oneCategory._id))
    setEditCategoryModal(false)
  }


  return (
    <div className='edit-category'>
      <form onSubmit={updateHandler} className='edit-category-form'>
        <i onClick={() => { setEditCategoryModal(false) }} className="bi bi-x-lg close-editNavbarChioseModal"></i>
        <h2 className='edit-category-title'>edit category</h2>
        <div className='label-input'>
          <label className='edit-category-label' htmlFor="">title</label>
          <input value={title} onChange={(e) => { setTitle(e.target.value) }} className='edit-category-input' type="text" name="" id="" />
        </div>
        <button className='edit-category-btn'>update</button>
      </form>
    </div>
  )
}
