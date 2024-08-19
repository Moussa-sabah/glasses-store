



import React from 'react'
import ProductsList from '../../components/product/ProductsList'
import './Products.css'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllProductsByNavbarChoiseAndCategory } from '../../redux/apiCalls/ProductApiCall'

export default function ProductsByNavbarChosieAndCategory() {

  const dispatch = useDispatch()
  const { products } = useSelector(state => state.products)
  const { oneNavbarChoise } = useSelector(state => state.navbarChoise)
  const { navbarChoise, category } = useParams()

  useEffect(() => {
    dispatch(getAllProductsByNavbarChoiseAndCategory(navbarChoise, category))
    // eslint-disable-next-line
  }, [navbarChoise, category]);

  return (

    <section className='products-page'>
      <div className='categories'>
        {oneNavbarChoise?.categories?.map((item) => {
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
