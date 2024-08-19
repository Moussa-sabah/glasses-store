


import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './EditProduct.css'
import { updateProduct, updateProductImage } from '../../redux/apiCalls/ProductApiCall';

export default function EditProduct({ setEditModal }) {

  const dispacth = useDispatch()


  const { allBrands } = useSelector(state => state.brand)
  const { allNavbarChoises } = useSelector(state => state.navbarChoise)
  const { product } = useSelector(state => state.products)

  const [title, setTitle] = useState(product?.title);
  const [brand, setBrand] = useState(product?.brand);
  const [oldPrice, setOldPrice] = useState(product?.oldPrcie);
  const [newPrice, setNewPrice] = useState(product?.newPrice);
  const [image, setImage] = useState(null)
  const [navbarIndex, setNavbarIndex] = useState()
  const [categoryIndex, setCategoryIndex] = useState()




  let oneNavbarChoise = allNavbarChoises ? allNavbarChoises[navbarIndex] : ''
  let oneCategory = oneNavbarChoise ? oneNavbarChoise.categories[categoryIndex] : ''


  let NavbarChoiseTitle = oneNavbarChoise?.title
  let CategoryTitle = oneCategory?.title


  let navbarChoise = oneNavbarChoise ? NavbarChoiseTitle : product?.navbarChoise
  let category = oneCategory ? CategoryTitle : product?.category

  const updateProductHandler = (e) => {
    e.preventDefault()
    dispacth(updateProduct({ title, brand, oldPrice, newPrice, navbarChoise, category }, product?._id))
    setEditModal(false)
  }

  const updateImageHandler = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('image', image)
    dispacth(updateProductImage(formData, product._id))
  }

  return (


    <div className='editProduct-modal'>
      <div className='edit-product-forms'>
        <i onClick={() => { setEditModal(false) }} class="bi bi-x-lg close-editModal"></i>
        <form onSubmit={updateProductHandler} className='edit-product-form' action="">
          <h1 className='title'>Update product</h1>
          <input value={title} onChange={(e) => { setTitle(e.target.value) }} className='title-input' type="text" placeholder='title' />
          <div className='brand-select'>
            <label htmlFor="">Brand</label>
            <select defaultValue={''} onChange={(e) => { setBrand(e.target.value) }}>
              <option value="" disabled selected >choose brand</option>
              {allBrands?.map((item) => {
                return <option value={item.title} key={item._id} >{item.title}</option>
              })}
            </select>
          </div>
          <div className='price-inputs'>
            <div>
              <label htmlFor="">Old price</label>
              <input value={oldPrice} onChange={(e) => { setOldPrice(e.target.value) }} type="number" />
            </div>
            <div>
              <label htmlFor="">New price</label>
              <input value={newPrice} onChange={(e) => { setNewPrice(e.target.value) }} type="number" placeholder='new price' />
            </div>

          </div>
          <div className='category-options'>
            <div>
              <label htmlFor="">Navbar choise</label>

              <select onChange={(e) => { setNavbarIndex(e.target.value); setCategoryIndex(0) }}>
                <option value="" disabled selected >choose </option>
                {allNavbarChoises?.map((item, index) => {
                  return <option value={index} key={item._id}>{item.title}</option>
                })}
              </select>
            </div>
            <div>
              <label htmlFor="">Category</label>

              <select defaultValue={'DEFAULT'} onChange={(e) => { setCategoryIndex(e.target.value) }}>
                <option value="" disabled selected >choose </option>
                {oneNavbarChoise?.categories?.map((item, index) => {
                  return <option value={index} key={item._id}>{item.title}</option>
                })}
              </select>
            </div>

          </div>
          <button className='create-btn'>Update</button>
        </form>
        <form onSubmit={updateImageHandler} className='update-image-form' action="">
          <label className='uplade-image-label' htmlFor="image"><i className="bi bi-image"></i>upload image </label>
          <input onChange={(e) => { setImage(e.target.files[0]) }} style={{ display: 'none' }} type="file" id='image' />
          <button className='update-image-btn'>update image</button>
        </form>
      </div>
    </div>
  )
}
