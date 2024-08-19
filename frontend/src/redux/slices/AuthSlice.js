

import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({

  name: 'auth',

  initialState: {
    user: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    registerMessage: null,
    allFavorites: null,
    cart: null,
    isEmailVerified: false,
    allUsers: null,
    oneUser: null,
    userCart:null
  },

  reducers: {
    login(state, action) {
      state.user = action.payload
    },
    logout(state) {
      state.user = null
    },
    registerMessage(state, action) {
      state.registerMessage = action.payload
    },
    setAllFavorites(state, action) {
      state.allFavorites = action.payload
    },
    setCart(state, action) {
      state.cart = action.payload
    },
    setUserCart(state,action){
      state.userCart = action.payload
    },
    setVerificationEmail(state) {
      state.isEmailVerified = true
    },
    setAllUsers(state, action) {
      state.allUsers = action.payload
    },
    setOneUser(state, action) {
      state.oneUser = action.payload
    },
    updateUser(state, action) {
      state.oneUser = action.payload
    },
    updateUserPhoto(state, action) {
      state.oneUser.image = action.payload
    },
  }
}


)



const authReducer = AuthSlice.reducer
const authActions = AuthSlice.actions


export { authReducer, authActions }
