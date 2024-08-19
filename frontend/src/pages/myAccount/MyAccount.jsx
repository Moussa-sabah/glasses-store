

import React, { useEffect, useState } from 'react'
import './MyAccount.css'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOneUser, updateUserPhoto } from '../../redux/apiCalls/AuthApiCall'
import EditAccount from '../../modals/Account/EditAccount'
import WebReviewList from '../../components/reviews/WebReviewsList'
import ProductReviewList from '../../components/reviews/ProductReviewsList'


export default function MyAccount() {

  const dispatch = useDispatch()
  const { oneUser } = useSelector(state => state.auth)
  const { id } = useParams()
  const [editAccountModal, setEditAccountModal] = useState(false)
  const [image, setImage] = useState(null)
  useEffect(() => {
    dispatch(getOneUser(id))
    // eslint-disable-next-line
  }, [oneUser])

  const updatePhotoHandler = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('image', image)
    dispatch(updateUserPhoto(formData))
  }

  return (
    <div className='myAccount'>
      <div className='photo-section'>
        <img className='photo-section-image' src={image ? URL.createObjectURL(image) : oneUser?.image.url} alt="" />
        <form onSubmit={updatePhotoHandler} className=''>
          <label className='photo-section-label' htmlFor="photo">Choose photo</label>
          <button className='update-image-btn'>Update</button>
          <input onChange={(e) => { setImage(e.target.files[0]) }} className='photo-section-input' type="file" name="" id="photo" />
        </form>
      </div>
      <div className='personal-information'>
        <div>
          <label htmlFor="">Name:</label>
          <p>{oneUser?.userName}</p>
        </div>
        <div>
          <label htmlFor="">Email:</label>
          <p>{oneUser?.email}</p>
        </div>
        <div>
          <label htmlFor="">Date Joined:</label>
          <p>{new Date(oneUser?.createdAt).toDateString()}</p>
        </div>
        <button onClick={() => { setEditAccountModal(true) }} className='edit-account-btn'>Edit Your Name</button>
      </div>

      <div className='all-user-web-reviews'>
        <h2 className='all-user-web-reviews-title'>Your Web Revirews</h2>
        <WebReviewList allReviews={oneUser?.webReviews} />
      </div>
      <div className='all-user-web-reviews'>
        <h2 className='all-user-web-reviews-title'>Your Web Revirews</h2>
        <ProductReviewList allReviews={oneUser?.productsReviews} />
      </div>
      {editAccountModal && <EditAccount setEditAccountModal={setEditAccountModal} />}
    </div>
  )
}
