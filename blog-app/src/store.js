import { createStore, combineReducers } from 'redux'

import notificationReducer from './reducers/notificationReducer.js'
import blogReducer from './reducers/blogReducer.js'
import userReducer from './reducers/userReducer.js'
import usersReducer from './reducers/usersReducer.js'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: userReducer,
  users: usersReducer
})

export const store = createStore(reducer)