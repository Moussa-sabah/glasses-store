

import React, { useState } from 'react'

import './AddReview.css'
import { useDispatch } from 'react-redux'
import { createReviewOfWeb } from '../../redux/apiCalls/ReviewsOfWebApiCall';

export default function AddReview({ setAddReviewModal }) {

  const dispatch = useDispatch()
  const [reviewTitle, setTitle] = useState();
  const [reviewText, setText] = useState();

  const addReview = (e) => {
    e.preventDefault()
    dispatch(createReviewOfWeb({ reviewTitle, reviewText }))
    setAddReviewModal(false) 
  }

  return (
    <div className='add-Review-Modal'>

      <form onSubmit={addReview} className='modal-form' action="">
        <i onClick={() => { setAddReviewModal(false) }} className="bi bi-x close-icon"></i>
        <h1 className='modal-form-title'>Add Review</h1>
        <input value={reviewTitle} onChange={(e) => { setTitle(e.target.value) }} className='modal-from-input' type="text" name="" id="" placeholder='review title' />
        <input value={reviewText} onChange={(e) => { setText(e.target.value) }} className='modal-from-input' type="text" placeholder='review text' />
        <button className='modal-form-btn'>Submit</button>
      </form>

    </div>
  )
}
