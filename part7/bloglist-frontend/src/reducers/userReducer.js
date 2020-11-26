import userService from '../services/user'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const reducer = (state = null, action) => {
  switch(action.type) {
  case 'USER_LOGIN':
    return action.data
  case 'USER_LOGOUT':
    return null
  default:
    return state
  }
}

export const initializeUser = () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'USER_LOGIN',
        data: user,
      })
    }
  }
}

export const userLogin = (userObject) => {
  return async dispatch => {
    try {
      const user = await userService.login(userObject)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({
        type: 'USER_LOGIN',
        data: user
      })
    } catch (e) {
      dispatch(setNotification('error', 'wrong username or password', 5))
    }
  }
}

export const userLogout = () => {
  return async dispatch => {
    try {
      window.localStorage.removeItem('loggedBlogAppUser')
      dispatch({
        type: 'USER_LOGOUT'
      })
    } catch (e) {
      dispatch(setNotification('error', e, 5))
    }
  }
}

export default reducer