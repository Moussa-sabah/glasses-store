

import { navbarChoiseActions } from '../slices/NavbarCoiseSlice'
import Request from '../../request/Request'
import { toast } from 'react-toastify'

export function getAllNavbarChoises() {
  return async (dispatch) => {
    try {
      const { data } = await Request.get('/api/navbar-choise')
      dispatch(navbarChoiseActions.setAllNavbarChoises(data))
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}


export function getOneNavbarChoise(id) {
  return async (dispatch) => {
    try {
      const { data } = await Request.get(`/api/navbar-choise/${id}`)
      dispatch(navbarChoiseActions.setOneNavbarChoise(data))
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}


export function createNavbarChoise(navbarChoise) {
  return async (dispatch, getState) => {
    try {
      const { data } = await Request.post(`/api/navbar-choise`, navbarChoise, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token,
        }
      })
      dispatch(navbarChoiseActions.createNavbarChoise(data))
      toast.success('Navbar choise created successfully')
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}

export function updateNavbarChoise(newTitle, id) {
  return async (dispatch, getState) => {
    try {
      const { data } = await Request.put(`/api/navbar-choise/${id}`, newTitle, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token,
        }
      })
      dispatch(navbarChoiseActions.updateNavbarChoise(data))
      toast.success('Navbar choise has been updated successfully')
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}

export function deleteNavbarChoise(id) {
  return async (dispatch, getState) => {
    try {
      const { data } = await Request.delete(`/api/navbar-choise/${id}`, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token,
        }
      })
      dispatch(navbarChoiseActions.deleteNavbarChoise(data))
      toast.success(data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}


export function createCategory(category) {
  return async (dispatch, getState) => {
    try {
      const { data } = await Request.post(`/api/category`, category, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token,
        }
      })
      dispatch(navbarChoiseActions.createCategory(data))
      toast.success('Category created successfully')
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}

export function getOneCategory(id) {
  return async (dispatch) => {
    try {
      const { data } = await Request.get(`/api/category/${id}`)
      dispatch(navbarChoiseActions.setOneCategory(data))
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}

export function updateCategory(newTitle, id) {
  return async (dispatch, getState) => {
    try {
      const { data } = await Request.put(`/api/category/${id}`, newTitle, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token,
        }
      })
      dispatch(navbarChoiseActions.updateCategory(data))
      toast.success('Category updated')
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}

export function deleteCategory(id) {
  return async (dispatch, getState) => {
    try {
      const { data } = await Request.delete(`/api/category/${id}`, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token,
        }
      })
      dispatch(navbarChoiseActions.deleteCategory(data))
      toast.success(data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}

