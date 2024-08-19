

import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/AuthSlice";
import { productReducer } from './slices/ProductSlice';
import { navbarChosieReducer } from './slices/NavbarCoiseSlice'
import { brandReducer } from "./slices/BrandSlice";
import { reviewsOfWebReducer } from "./slices/ReviewsOfWebSlice";
import { passwordReducer } from "./slices/PasswordSlice";



const Store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    navbarChoise: navbarChosieReducer,
    brand: brandReducer,
    reviewsOfWeb: reviewsOfWebReducer,
    password: passwordReducer,


  }
})


export default Store