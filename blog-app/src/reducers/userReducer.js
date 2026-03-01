const userReducer = (state = {token: null, username: null, name: null}, action) => {
  switch (action.type) {
    case 'SET_USER': {
      return action.payload
    }
    case 'REMOVE_USER':
      return {token: null, username: null, name: null}
    default:
      return state
  }
}

export default userReducer
