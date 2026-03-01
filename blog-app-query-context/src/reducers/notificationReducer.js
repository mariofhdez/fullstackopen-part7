const notificationReducer = (state = { message: null, type: null }, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return { ...action.payload }
    case 'REMOVE_MESSAGE':
      return { message: null, type: null }
    default:
      return state
  }
}

export default notificationReducer
