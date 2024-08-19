
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getProductsByBarnds } from '../../redux/apiCalls/ProductApiCall'
import ProductsList from '../../components/product/ProductsList'

export default function ProductsByBrands() {

  const dispatch = useDispatch()
  const { oneBrand } = useSelector(state => state.brand)
  const { products } = useSelector(state => state.products)
  const { brand } = useParams()

  useEffect(() => {

    dispatch(getProductsByBarnds(brand))
    // eslint-disable-next-line
  }, [brand])


  return (

    <section className='products-page'>
      <div className='categories'>
        {oneBrand?.categories?.map((item) => {
          return <Link to={`/products/brands/${oneBrand?.title}/${item?.title}`} key={item?._id} className='categories-link'>{item?.title}</Link>
        })}
      </div>
      <img className='products-page-image' src="https://allurerage.com/wp-content/uploads/2023/03/eyeglasses.jpeg" alt="" />
      <div className='categryType-and-products'>
        <h1 className='category-title'>{oneBrand?.title}</h1>
        <ProductsList products={products} />
      </div>

    </section>
  )
}
