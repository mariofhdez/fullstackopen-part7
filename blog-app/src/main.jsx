import { createRoot } from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'

import notificationReducer from './reducers/notificationReducer.js'
import blogReducer from './reducers/blogReducer.js'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer
})

export const store = createStore(reducer)

const root = createRoot(document.getElementById('root'))

const renderApp = () => root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

renderApp()
store.subscribe(renderApp)
console.log(store.getState());