import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { store } from './store.js'
import App from './App.jsx'
import './index.css'

const root = createRoot(document.getElementById('root'))

const renderApp = () =>
  root.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
  )

renderApp()
store.subscribe(() => console.log(store.getState()))
