


import React, { useState } from 'react'
import './CreateProduct.css'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct } from '../../redux/apiCalls/ProductApiCall'


export default function CreateProduct() {
const dispatch = useDispatch()

  const { allBrands } = useSelector(state => state.brand)
  const { allNavbarChoises } = useSelector(state => state.navbarChoise)


  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [oldPrice, setOldPrice] = useState(0);
  const [newPrice, setNewPrice] = useState(null);
  const [image, setImage] = useState(null)
  const [navbarIndex, setNavbarIndex] = useState(0)
  const [categoryIndex, setCategoryIndex] = useState(0)


  let oneNavbarChoise = allNavbarChoises ? allNavbarChoises[navbarIndex] : ''
  let oneCategory = oneNavbarChoise ? oneNavbarChoise.categories[categoryIndex] : ''

  let NavbarChoiseTitle = oneNavbarChoise?.title
  let CategoryTitle = oneCategory?.title



  const crearteProductHandler = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('brand', brand)
    formData.append('oldPrice', oldPrice)
    formData.append('newPrice', newPrice)
    formData.append('image', image)
    formData.append('navbarChoise', NavbarChoiseTitle)
    formData.append('category', CategoryTitle)
    dispatch(createProduct(formData))
  }


  return (

    <div className='create-product'>

      <form onSubmit={crearteProductHandler} className='create-product-form' action="">
        <h1 className='title'>Create new product</h1>
        <input onChange={(e) => { setTitle(e.target.value) }} className='title-input' type="text" placeholder='title' />
        <div className='brand-select'>
          <label htmlFor="">Brand</label>
          <select defaultValue={'DEFAULT'} onChange={(e) => { setBrand(e.target.value) }}>
            <option selected disabled>choose brand</option>
            {allBrands?.map((item) => {
              return <option value={item.title} key={item._id} >{item.title}</option>
            })}
          </select>
        </div>
        <div className='price-inputs'>
          <input onChange={(e) => { setOldPrice(e.target.value) }} type="number" placeholder='old price' />
          <input onChange={(e) => { setNewPrice(e.target.value) }} type="number" placeholder='new price' />
        </div>
        <div className='category-options'>
          <div>
            <label htmlFor="">Navbar choise</label>
            <select defaultValue={'DEFAULT'} onChange={(e) => { setNavbarIndex(e.target.value); setCategoryIndex(0) }}>
              {allNavbarChoises?.map((item, index) => {
                return <option value={index} key={item._id}>{item.title}</option>
              })}
            </select>
          </div>
          <div>
            <label htmlFor="">Category</label>
            <select defaultValue={'DEFAULT'} onChange={(e) => { setCategoryIndex(e.target.value) }}>
              {oneNavbarChoise?.categories?.map((item, index) => {
                return <option value={index} key={item._id}>{item.title}</option>
              })}
            </select>
          </div>

        </div>
        <label className='uplade-image-label' htmlFor="image"><i className="bi bi-image"></i>upload image</label>
        <input onChange={(e) => { setImage(e.target.files[0]) }} style={{ display: 'none' }} type="file" id='image' />

        <button className='create-btn'>Create</button>
      </form>
    </div>
  )
}
