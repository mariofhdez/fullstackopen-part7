import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import blogService from './services/blog'

import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'

function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((res) => {
      dispatch({
        type: 'SET_BLOGS',
        payload: res,
      })
    })
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON && loggedUserJSON !== 'undefined') {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'SET_USER',
        payload: user,
      })
    }
  }, [])

  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      window.localStorage.clear()

      dispatch({
        type: 'REMOVE_USER',
      })
    } catch (error) {
      console.error('Error', error.message)
    }
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel='Create new note' ref={blogFormRef}>
        <BlogForm ref={blogFormRef} />
      </Togglable>
    )
  }

  return (
    <>
      <h1>Blog App</h1>
      <Notification />
      {user.username === null ? (
        <LoginForm />
      ) : (
        <div>
          <div>
            <p>{user.name}</p>
            <button onClick={handleLogout}>Log out</button>
          </div>
          {blogForm()}
          <h2>Blog list</h2>
          <BlogList />
        </div>
      )}
    </>
  )
}

export default App
