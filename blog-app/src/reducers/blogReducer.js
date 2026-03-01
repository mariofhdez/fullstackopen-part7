const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return state.concat(action.payload)
    case 'SET_BLOGS':
      return action.payload
    case 'VOTE_BLOG': {
      const votedBlog = action.payload
      return state.map((b) => b.id !== votedBlog.id ? b : votedBlog)
    }
    case 'DELETE_BLOG':
        return state.filter((b) => b.id !== action.payload.id)
    default:
      return state
  }
}

export default blogReducer
