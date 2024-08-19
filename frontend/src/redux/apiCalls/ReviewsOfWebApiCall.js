

import { reviewsOfWebActions } from '../slices/ReviewsOfWebSlice'
import Request from '../../request/Request'
import { toast } from 'react-toastify'

export function getAllReviewsOfWeb() {

  return async (dispatch) => {
    try {
      const { data } = await Request.get('/api/web-review')
      dispatch(reviewsOfWebActions.setAllReviews(data))
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

}

export function createReviewOfWeb({ reviewTitle, reviewText }) {

  return async (dispatch, getState) => {
    try {
      const { data } = await Request.post('/api/web-review', { reviewTitle, reviewText }, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token
        }
      })
      dispatch(reviewsOfWebActions.addReviews(data))
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

}


export function updateReviewOfWeb(review, id) {

  return async (dispatch, getState) => {
    try {
      const { data } = await Request.put(`/api/web-review/${id}`, review, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token
        }
      })
      dispatch(reviewsOfWebActions.updateReview(data))
      toast.success('Your review has been updated successfully')

    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

}


export function getOneReviewOfWeb(id) {

  return async (dispatch) => {
    try {
      const { data } = await Request.get(`/api/web-review/${id}`)
      dispatch(reviewsOfWebActions.setOneReview(data))
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

}

export function deleteReviewOfWeb(id) {

  return async (dispatch, getState) => {
    try {
      const { data } = await Request.delete(`/api/web-review/${id}`, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token
        }
      })
      dispatch(reviewsOfWebActions.deleteReview(data))
      toast.success('Your review has been deleted successfully')

    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

}


