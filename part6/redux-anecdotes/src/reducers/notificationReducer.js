const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return {
        message: action.data.message,
        timeInstance: action.data.timeInstance
      }
    case 'HIDE_NOTIFICATION':
      return {}

    default:
      return state
  }
}

export const setNotification = (message, time) => {
  return dispatch => {
    const timeInstance = setTimeout(() => {
      dispatch({ type: 'HIDE_NOTIFICATION' })
    }, time * 1000)
    dispatch({
      type: 'SHOW_NOTIFICATION',
      data: {
        message,
        timeInstance
      },
    })
  }
}

export const showNotification = (message) => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: message,
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION'
  }
}

export default reducer