

import React, { useEffect, useState } from 'react'
import './Favorites.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllFavorites, ToggleProductToFavorites } from '../../redux/apiCalls/ProductApiCall'
export default function Favorites() {


  const { allFavorites } = useSelector(state => state.auth)
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()


  useEffect(() => {
    if (user) {
      dispatch(getAllFavorites())
    }
    // eslint-disable-next-line
  }, [allFavorites]);

  return (
    <div className='favorites-page'>
      <div className='all-components'>
        <h1 className='favorites-page-title'>My wishlist</h1>
        <div className='all-favorites-products'>
          {allFavorites?.map((item) => {
            return <div className='favorite-product'>
              <i onClick={() => { dispatch(ToggleProductToFavorites(item._id)) }} className="bi bi-x delete-favorite"></i>
              <img className='favorites-product-image' src={item?.image.url} alt="" />
              <p className='favorites-product-name'>{item?.title}</p>
              <p className='favorites-product-brand'>{item?.brand}</p>
              <div className="product-prices">
                <p className="product-price oldPrice">${item?.oldPrice}</p>
                <p className="product-price">${item?.newPrice}</p>
              </div>
              <div className='product-reviews'>
                <p className='number-of-reviews'>2000 reviews</p>
              </div>
              <Link to='/product-details' className='more-details-link'>More details</Link>
            </div>
          })}

        </div>
      </div>
    </div>
  )
}
