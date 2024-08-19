



import { createSlice } from "@reduxjs/toolkit";

const BrandSlice = createSlice({
  name: 'brand',
  
  initialState: {
    allBrands: null,
    oneBrand: null,
    oneBrandCategory: null
  },

  reducers: {
    setAllBrands(state, action) {
      state.allBrands = action.payload
    },
    setOneBrand(state, action) {
      state.oneBrand = action.payload
    },
    // updateBrand(state, action) {
    //   state.allBrands = state.allBrands.map(b => b._id === action.payload._id ? action.payload : b)
    // },
    // addNewBrand(state, action) {
    //   state.allBrands.push(action.payload)
    // },
    // deleteBrand(state, action) {
    //   state.allBrands = state.allBrands.filter(b => b._id !== action.payload.id)
    // },
    setOneBrandCategory(state, action) {
      state.oneBrandCategory = action.payload
    },
    // addNewBrandCategory(state, action) {
    //   state.oneBrand.categories.push(action.payload)
    // },
    // updateBrandCategory(state, action) {
    //   state.oneBrand.categories = state.oneBrand.categories.map(c => c._id === action.payload._id ? action.payload : c)
    // },

  }
})


const brandReducer = BrandSlice.reducer
const brandActions = BrandSlice.actions


export { brandActions, brandReducer }