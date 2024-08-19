







import React, { useState } from 'react'
import './AddReview.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateReviewOfProduct } from '../../redux/apiCalls/ProductApiCall';




export default function EditReview({ setEditReviewModal, reviewId }) {

  const { oneProductReview } = useSelector(state => state.products)
  const dispatch = useDispatch()
  const [reviewTitle, setTitle] = useState(oneProductReview?.reviewTitle);
  const [reviewText, setText] = useState(oneProductReview?.reviewText);


  const updateReviewhandler = (e) => {
    e.preventDefault()
    dispatch(updateReviewOfProduct({ reviewTitle, reviewText }, reviewId))
    setEditReviewModal(false)
  }


  return (
    <div className='add-Review-Modal'>

      <form onSubmit={updateReviewhandler} className='modal-form' action="">
        <i onClick={() => { setEditReviewModal(false) }} className="bi bi-x close-icon"></i>
        <h1 className='modal-form-title'>Edit Your Review</h1>
        <input value={reviewTitle} onChange={(e) => { setTitle(e.target.value) }} className='modal-from-input' type="text" name="" id="" placeholder='review title' />
        <input value={reviewText} onChange={(e) => { setText(e.target.value) }} className='modal-from-input' type="text" placeholder='review text' />
        <button className='modal-form-btn'>Submit</button>
      </form>

    </div>
  )
}
