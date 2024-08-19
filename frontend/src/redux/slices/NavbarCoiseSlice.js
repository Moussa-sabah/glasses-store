

import { createSlice } from "@reduxjs/toolkit";

const NavbarChoiseSlice = createSlice({
  name: 'navbar',
  initialState: {
    allNavbarChoises: null,
    oneNavbarChoise: null,
    oneCategory: null

  },
  reducers: {
    setAllNavbarChoises(state, action) {
      state.allNavbarChoises = action.payload
    },
    setOneNavbarChoise(state, action) {
      state.oneNavbarChoise = action.payload
    },
    createNavbarChoise(state, action) {
      state.allNavbarChoises.push(action.payload)
    },
    updateNavbarChoise(state, action) {
      state.allNavbarChoises =
        state.allNavbarChoises.map(n => n._id === action.payload._id ? action.payload : n)
    },
    deleteNavbarChoise(state, action) {
      state.allNavbarChoises = state.allNavbarChoises.filter(n => n._d !== action.payload.id)
    },
    setOneCategory(state, action) {
      state.oneCategory = action.payload
    },
    updateCategory(state, action) {
      state.oneNavbarChoise.categories =
        state.oneNavbarChoise.categories.map(c => c._id === action.payload._id ? action.payload : c)
    },
    createCategory(state, action) {
      state.oneNavbarChoise.categories.push(action.payload)
    },
    deleteCategory(state, action) {
      state.oneNavbarChoise.categories =
        state.oneNavbarChoise.categories.filter(c => c._id !== action.payload.id)
    }
  }
})


const navbarChosieReducer = NavbarChoiseSlice.reducer
const navbarChoiseActions = NavbarChoiseSlice.actions


export { navbarChoiseActions, navbarChosieReducer }