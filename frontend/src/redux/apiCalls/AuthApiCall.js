


import { authActions } from '../slices/AuthSlice'
import requset from '../../request/Request'
import { toast } from 'react-toastify'
export function loginUser(user) {

  return async (dispatch) => {
    try {
      const { data } = await requset.post('/api/auth/login', user)
      dispatch(authActions.login(data))
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

}


export function logoutUser() {
  return async (dispatch) => {
    try {
      localStorage.removeItem('userInfo')
      dispatch(authActions.logout())
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}


export function registerUser(user) {

  return async (dispatch) => {

    try {
      const { data } = await requset.post('/api/auth/register', user)
      toast.success(data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}

export function verificationEmail(userId, token) {

  return async (dispatch) => {

    try {
      await requset.get(`/api/auth/${userId}/verify/${token}`)
      dispatch(authActions.setVerificationEmail())
    } catch (error) {
      console.log(error)
    }
  }
}


export function getAllUsers() {

  return async (dispatch, getState) => {
    try {
      const { data } = await requset.get(`/api/users`, {
        headers: {
          Authorization: 'Bearer ' + getState().auth.user.token
        }
      })
      dispatch(authActions.setAllUsers(data))
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}

export function getOneUser(id) {

  return async (dispatch) => {
    try {
      const { data } = await requset.get(`/api/users/user/${id}`)
      dispatch(authActions.setOneUser(data))
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}

export function updateUser(user, id) {

  return async (dispatch, getState) => {
    try {
      const { data } = await requset.put(`/api/users/user/${id}`, user,
        {
          headers: {
            Authorization: 'Bearer ' + getState().auth.user.token
          }
        }
      )
      dispatch(authActions.updateUser(data))
      toast.success("User updated successfully")
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}


export function updateUserPhoto(image) {

  return async (dispatch, getState) => {
    try {
      const { data } = await requset.post(`/api/users/photo/updatePhoto`, image,
        {
          headers: {
            Authorization: 'Bearer ' + getState().auth.user.token,
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      dispatch(authActions.updateUserPhoto(data.image))
      toast.success(data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}



export function deleteUser(id) {

  return async (dispatch, getState) => {
    try {
      const { data } = await requset.delete(`/api/users/user/${id}`, {
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
