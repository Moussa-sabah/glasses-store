


import React, { useState } from 'react'
import './Reviews.css'
import { useDispatch, useSelector } from 'react-redux'
import EditReview from '../../modals/Review/EditReviewOfWeb'
import { deleteReviewOfWeb, getOneReviewOfWeb } from '../../redux/apiCalls/ReviewsOfWebApiCall'
import swal from 'sweetalert'

export default function ReviewItem({ review, reviewUser }) {

  const dispatch = useDispatch()

  const [editReviewModal, setEditReviewModal] = useState(false);
  const { user } = useSelector(state => state.auth)
  const { oneUser } = useSelector(state => state.auth)

  const OpenToEditReviewModal = () => {
    dispatch(getOneReviewOfWeb(review._id))
    setTimeout(() => {
      setEditReviewModal(true)
    }, 1000);

  }

  const deleteReview = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((isOk) => {
        if (isOk) {
          dispatch(deleteReviewOfWeb(review?._id))
        }

      });
  }


  return (
    <div className='comment-item'>
      <div className='user-info-and-title'>
        <img className='user-image' src={oneUser?._id === reviewUser ? oneUser?.image?.url : review?.user?.image?.url} alt="" />
        <div className='user-name-and-title'>
          <p className='user-name'>{review?.user?.userName}</p>
          <p className='comment-title'>{review?.reviewTitle}</p>
        </div>
      </div>
      <p className='comment'>{review?.reviewText}</p>
      {(oneUser?._id === reviewUser || review?.user?._id === user?.id) &&
        <div className='edit-delete'>
          <i onClick={OpenToEditReviewModal} className="bi bi-pencil-square"></i>
          <i onClick={deleteReview} className="bi bi-trash-fill delete-comment-icon"></i>
        </div>}


      {editReviewModal ? <EditReview setEditReviewModal={setEditReviewModal} reviewId={review._id} /> : null}
    </div>
  )
}
