const blogReducer = (state = [], action) => {
    switch(action.type){
        case 'NEW_BLOG':
            return state.concat(action.payload)
        case 'SET_BLOGS':
            return action.payload
        default:
            return state
    }
}

export default blogReducer