

import { createSlice } from "@reduxjs/toolkit";

const ReviewsOfWebSlice = createSlice({
  name: 'reviews',

  initialState: {
    allReviews: null,
    oneReview: null
  },

  reducers: {
    setAllReviews(state, action) {
      state.allReviews = action.payload
    },
    addReviews(state, action) {
      state.allReviews.push(action.payload)
    },
    setOneReview(state, action) {
      state.oneReview = action.payload
    },
    updateReview(state, action) {
      state.allReviews = action.payload
    },
    deleteReview(state, action) {
      state.allReviews = action.payload
    }
  }
})


const reviewsOfWebReducer = ReviewsOfWebSlice.reducer
const reviewsOfWebActions = ReviewsOfWebSlice.actions


export { reviewsOfWebActions, reviewsOfWebReducer }