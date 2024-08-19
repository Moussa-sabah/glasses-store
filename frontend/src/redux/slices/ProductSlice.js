
import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({

  name: 'product',

  initialState: {
    product: null,
    products: null,
    recentAdded: null,
    productReviews: null,
    oneProductReview: null,
    number:1
  },

  reducers: {
    setProduct(state, action) {
      state.product = action.payload
    },
    setProducts(state, action) {
      state.products = action.payload
    },
    deleteProduct(state, action) {
      state.products = state.products.filter(p => p._id !== action.payload)
    },
    updateProduct(state, action) {
    state.products=  state.products.map((p)=> p._id === action.payload._id?action.payload:p)
    },
    setRecentAdded(state, action) {
      state.recentAdded = action.payload
    },
    setAllProductsByNavbarChoise(state, action) {
      state.products = action.payload
    },
    setAllProductsByNavbarChoiseAndCategory(state, action) {
      state.products = action.payload
    },
    setProductsByBrands(state, action) {
      state.products = action.payload
    },
    setProductsByBrandAndCategory(state, action) {
      state.products = action.payload
    },
    addReview(state, action) {
      state.product.reviews.push(action.payload)
    },
    setProductReviews(state, action) {
      state.productReviews = action.payload
    },
    setOneProductReview(state, action) {
      state.oneProductReview = action.payload
    },
    updateProductReview(state, action) {
      state.productReviews = action.payload
    },
    deleteProductReview(state, action) {
      state.productReviews = action.payload
    },
    setNumber(state,action){
      state.number = action.payload
    }
  }

})


const productReducer = ProductSlice.reducer
const productActions = ProductSlice.actions


export { productActions, productReducer }