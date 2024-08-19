

import React from 'react'
import ProductsList from '../../components/product/ProductsList'
import './Products.css'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductsByNavbarChoise } from '../../redux/apiCalls/ProductApiCall'
import { useEffect } from 'react'

export default function ProductsByNavbarChosie({ id }) {


  const dispatch = useDispatch()
  const { oneNavbarChoise } = useSelector(state => state.navbarChoise)
  const { products } = useSelector(state => state.products)
  const { navbarChoise } = useParams()
  useEffect(() => {

      dispatch(getAllProductsByNavbarChoise(navbarChoise))

    // eslint-disable-next-line
  }, [navbarChoise]);


  
  return (

    <section className='products-page'>
      <div className='categories'>
        {oneNavbarChoise?.categories.map((item) => {
          return <Link to={`/products/${oneNavbarChoise.title}/${item.title}`} key={item._id} className='categories-link'>{item.title}</Link>
        })}
      </div>
      <img className='products-page-image' src="https://allurerage.com/wp-content/uploads/2023/03/eyeglasses.jpeg" alt="" />
      <div className='categryType-and-products'>
        <h1 className='category-title'>Eyeglasses</h1>
        <ProductsList products={products} />
      </div>

    </section>

  )
}
