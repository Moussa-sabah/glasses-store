

import { productActions } from '../slices/ProductSlice'
import { authActions } from '../slices/AuthSlice'
import Request from '../../request/Request'
import { toast } from 'react-toastify'


export function getOneProduct(id) {

  return async (dispatch) => {
    try {
      const { data } = await Request.get(`/api/product/${id}`)
      dispatch(productActions.setProduct(data))
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

}

export function getRecentAddProducts() {

  return async (dispatch) => {
    try {
      const { data } = await Request.get('/api/product/recent-add/home')
      dispatch(productActions.setRecentAdded(data))
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

}

export function getAllProductsByNavbarChoise(navbarChoise) {

  return async (dispatch) => {
    try {
      const { data } = await Request.get(`/api/product?navbarChoise=${navbarChoise}`)
      dispatch(productActions.setAllProductsByNavbarChoise(data))
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

}

export function getAllProductsByNavbarChoiseAndCategory(navbarChoise, category) {

  return async (dispatch) => {
    try {
      const { data } = await Request.get(`/api/product?navbarChoise=${navbarChoise}&category=${category}`)
      dispatch(productActions.setAllProductsByNavbarChoiseAndCategory(data))
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}

export function getProductsByBarnds(brand) {

  return async (dispatch) => {
    try {
      const { data } = await Request.get(`/api/product?brand=${brand}`)
      dispatch(productActions.setProductsByBrands(data))
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}

export function getProductsByBarndAndCategory(brand, category) {

  return async (dispatch) => {
    try {
      const { data } = await Request.get(`/api/product?brand=${brand}&category=${category}`)
      dispatch(productActions.setProductsByBrandAndCategory(data))
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}


export function ToggleProductToFavorites(id) {

  return async (dispatch, getState) => {
    try {
      await Request.put(`/api/product/add-favorites/${id}`, {}, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token
        }
      })

    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}

export function getAllFavorites() {

  return async (dispatch, getState) => {
    try {
      const { data } = await Request.get(`/api/product/favorites/favorites-products`, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token
        }
      })
      dispatch(authActions.setAllFavorites(data))
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}


export function addReviewToProduct(review) {

  return async (dispatch, getState) => {
    try {
      const { data } = await Request.post(`/api/product-review`, review, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token
        }
      })
      dispatch(productActions.addReview(data))
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}

export function getAllReviewsOfProduct(productId) {

  return async (dispatch) => {
    try {
      const { data } = await Request.get(`/api/product-review/reviews/${productId}`)
      dispatch(productActions.setProductReviews(data))
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}

export function updateReviewOfProduct(review, id) {

  return async (dispatch, getState) => {
    try {
      const { data } = await Request.put(`/api/product-review/${id}`, review, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token
        }
      })
      dispatch(productActions.updateProductReview(data))
      toast.success('Yout review has been updated succssefully')
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}

export function deleteReviewOfProduct(id) {

  return async (dispatch, getState) => {
    try {
      const { data } = await Request.delete(`/api/product-review/${id}`, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token
        }
      })
      dispatch(productActions.deleteProductReview(data))
      toast.success('Yout review has been deleted succssefully')
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}

export function getOneReviewOfProduct(id) {

  return async (dispatch, getState) => {
    try {
      const { data } = await Request.get(`/api/product-review/${id}`)
      dispatch(productActions.setOneProductReview(data))
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}

export function getProductsOfCart() {

  return async (dispatch, getState) => {
    try {
      const { data } = await Request.get(`api/product/cart/cart-products`, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token
        }
      })
      dispatch(authActions.setCart(data.allCartProduct))
      dispatch(authActions.setUserCart(data.userCart))
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}


export function ToggleProductToCart(id) {

  return async (dispatch, getState) => {
    try {
      await Request.put(`/api/product/add-cart/${id}`, {}, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token
        }
      })

    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}

export function deleteProductFromCart(id) {

  return async (dispatch, getState) => {
    try {
      const { data } = await Request.put(`/api/product/delete-from-cart/${id}`, {}, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token
        }
      })
      toast.success(data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}

export function createProduct(formData) {
  return async (dispatch, getState) => {
    try {
      await Request.post('/api/product', formData, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token,
          'Content-Type': 'multipart/form-data'
        }
      })

    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}


export function getAllProducts() {

  return async (dispatch) => {
    try {
      const { data } = await Request.get(`/api/product`)
      dispatch(productActions.setProducts(data))
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}


export function deleteProduct(id) {

  return async (dispatch, getState) => {
    try {
      const { data } = await Request.delete(`/api/product/${id}`, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token
        }
      })
      dispatch(productActions.deleteProduct(data.id))
      toast.success(data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}


export function updateProduct(product, id) {

  return async (dispatch, getState) => {
    try {
      const { data } = await Request.put(`/api/product/${id}`, product, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token
        }
      })
      dispatch(productActions.updateProduct(data))
      toast.success('Product has been updated successfully')
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}


export function updateProductImage(formData, id) {

  return async (dispatch, getState) => {
    try {
      const { data } = await Request.put(`/api/product/update-image/${id}`, formData, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token,
          'Content-Type': 'multipart/form-data'
        }
      })
      dispatch(productActions.updateProduct(data))
      toast.success('Product image has been updated successfully')
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}


export function addMoreOfProductToCart(id) {

  return async (dispatch, getState) => {
    try {
      const { data } = await Request.put(`/api/product/add-more-cart/${id}`, {}, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token
        }
      })

    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}

export function reduceProductFromCart(id) {

  return async (dispatch, getState) => {
    try {
      const { data } = await Request.put(`/api/product/reduce-from-cart/${id}`, {}, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token
        }
      })

    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}
