import usersService from '../services/users'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'USERS_INIT':
    return action.data.users
  default:
    return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    try {
      const users = await usersService.getAll()
      dispatch({
        type: 'USERS_INIT',
        data: { users },
      })
    } catch (e) {
      console.log(e)
    }

  }
}

export default reducer