import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createStore } from 'redux'

const notificationReducer = ( state = {message: null, type: null}, action ) => {
  switch(action.type){
    case 'SET_MESSAGE':
      return {...action.payload}
    case 'REMOVE_MESSAGE':
      return {message: null, type: null}
    default:
      return state
  }
}

export const store = createStore(notificationReducer)

const root = createRoot(document.getElementById('root'))

const renderApp = () => root.render(
    <App />
)

renderApp()
store.subscribe(renderApp)