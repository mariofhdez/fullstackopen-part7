const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER': {
      console.log(action.payload)
      return { ...action.payload }
    }
    case 'REMOVE_USER':
      return null
    default:
      return state
  }
}

export default userReducer
