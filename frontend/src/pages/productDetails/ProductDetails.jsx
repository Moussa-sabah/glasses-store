

import React, { useEffect } from 'react'
import './ProductDetails.css'
import { Link, useParams } from 'react-router-dom'
import ReviewsList from '../../components/reviews/ProductReviewsList'
import { useState } from 'react'
import AddReview from '../../modals/Review/AddReviewOfProduct'
import { useDispatch, useSelector } from 'react-redux'
import { getAllReviewsOfProduct, getOneProduct, getProductsOfCart, ToggleProductToCart } from '../../redux/apiCalls/ProductApiCall'

export default function ProductDetails() {

  const dispatch = useDispatch()
  const { product } = useSelector(state => state.products)
  const [addReviewModal, setAddReviewModal] = useState(false);
  const { productReviews } = useSelector(state => state.products)
  const { cart } = useSelector(state => state.auth)
  const { id } = useParams()

  useEffect(() => {
    dispatch(getOneProduct(id))
    dispatch(getAllReviewsOfProduct(id))
    dispatch(getProductsOfCart())
    // eslint-disable-next-line
  }, [productReviews])



  return (



    <section className='product-details'>

      <div className='product-details-all-components'>
        <p className='product-details-category'>eyeglasses - men - name</p>
        <div className='product'>
          <div className='product-details-left'>
            <img className='main-image' src={product?.image.url} alt="" />
            <div className='more-images'>
              {[1, 2, 3, 4, 5].map((item) => {
                return <img key={item} src={product?.image.url} alt="" />
              })}

            </div>
          </div>
          <div className='product-details-right'>
            <h2 className='product-name'>name</h2>
            <p className='product-brand'>brand</p>
            <div className='product-reviews'>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <p className='number-of-reviews'>2000 reviews</p>
            </div>
            <div className='price-info'>
              <p className='product-price'>$60</p>
              <hr />
              <p className='tow-days-delivery'>
                <input className='checkbox' type="checkbox" />
                2-Day Delivery (get it by tomorrow) $19
              </p>
            </div>
            <div className='cart-favoriteIcon'>
              <Link onClick={() => { dispatch(ToggleProductToCart(product?._id)) }} className='cart-link'>
                {cart?.find(c => c?._id === product?._id) ? 'Added' : 'Add To Cart'}
              </Link>
              <i className="bi bi-suit-heart-fill heart-link"></i>
            </div>
          </div>
        </div>
        <div className="reviews">
          <h1 className="reviews-title">The reviews are in!</h1>
          <ReviewsList allReviews={productReviews} />
          <div className="add-review">
            <button onClick={() => { setAddReviewModal(true) }} className="add-review-btn">Click to add review</button>
          </div>
        </div>
      </div>
      {addReviewModal ? <AddReview setAddReviewModal={setAddReviewModal} product={product?._id} /> : null}
    </section>
  )
}
