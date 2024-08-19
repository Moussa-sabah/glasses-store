


import { passwordActions } from '../slices/PasswordSlice'
import Request from '../../request/Request'
import { toast } from 'react-toastify'

export function sendResetPasswordLink(email) {
  return async () => {
    try {
      const { data } = await Request.post('/api/auth/send-reset-passwprd-link', email)
      toast.success(data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}

export function getResetPasswordPage(userId, token) {
  return async (dispatch) => {
    try {
      await Request.get(`/api/auth/reset-password/${userId}/${token}`)
    } catch (error) {
      toast.error(error.response.data.message)
      dispatch(passwordActions.setIsError())
    }
  }
}


export function resetPassword(user, password) {
  return async () => {
    try {
    const { data } = await Request.post(`/api/auth/reset-password/${user.userId}/${user.token}`, password)
      toast.success(data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
}

