



import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateCategory } from '../../redux/apiCalls/navbarChoiseApiCall'
import { updateBrandCategory } from '../../redux/apiCalls/BrandApiCall'


export default function EditBrandCategory({ setEditBrandCategoryModal }) {


  const dispatch = useDispatch()
  const { oneBrandCategory } = useSelector(state => state.brand)
  const [title, setTitle] = useState(oneBrandCategory?.title)

  const updateHandler = (e) => {
    e.preventDefault()
    dispatch(updateBrandCategory({ title }, oneBrandCategory._id))
    setEditBrandCategoryModal(false)
  }


  return (
    <div className='edit-category'>
      <form onSubmit={updateHandler} className='edit-category-form'>
        <i onClick={() => { setEditBrandCategoryModal(false) }} className="bi bi-x-lg close-editNavbarChioseModal"></i>
        <h2 className='edit-category-title'>edit brand category</h2>
        <div className='label-input'>
          <label className='edit-category-label' htmlFor="">title</label>
          <input value={title} onChange={(e) => { setTitle(e.target.value) }} className='edit-category-input' type="text" name="" id="" />
        </div>
        <button className='edit-category-btn'>update</button>
      </form>
    </div>
  )
}
