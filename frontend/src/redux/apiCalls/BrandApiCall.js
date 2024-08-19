

import { brandActions } from '../slices/BrandSlice'
import request from '../../request/Request'
import { toast } from 'react-toastify'

export function getAllBrands() {
  return async (dispatch) => {
    try {
      const { data } = await request.get('/api/brand')
      dispatch(brandActions.setAllBrands(data))
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}


export function getOneBrand(id) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/brand/${id}`)
      dispatch(brandActions.setOneBrand(data))
    } catch (error) {

    }
  }
}

export function createBrand(brand) {
  return async (dispatch, getState) => {
    try {
      await request.post('/api/brand', brand, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token,
        }
      })
      toast.success('Brand added successfully')
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}


export function updateBrand(brand, id) {
  return async (dispatch, getState) => {
    try {
      await request.put(`/api/brand/${id}`, brand, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token,
        }
      })

      toast.success('Brand updated successfully')
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}

export function deleteBrand(id) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/brand/${id}`, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token,
        }
      })
      toast.success(data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}

export function getOneBrandCategory(id) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/categoriesOfBrands/${id}`)
      dispatch(brandActions.setOneBrandCategory(data))
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}

export function createBrandCategory(category) {
  return async (dispatch, getState) => {
    try {
    await request.post(`/api/categoriesOfBrands`, category, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token,
        }
      })
      // dispatch(brandActions.addNewBrandCategory(data))
      toast.success('Category added successfully')
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}


export function updateBrandCategory(category, id) {
  return async (dispatch, getState) => {
    try {
      await request.put(`/api/categoriesOfBrands/${id}`, category, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token,
        }
      })
      toast.success('Category updated successfully')
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}

export function deleteBrandCategory(id) {
  return async (dispatch,getState) => {
    try {
    const {data} =  await request.delete(`/api/categoriesOfBrands/${id}`,{
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token,
        }
      })
      toast.success(data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}
