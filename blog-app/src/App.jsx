import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route, Routes, useMatch } from 'react-router-dom'

import blogService from './services/blog'
import userService from './services/user'

import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import Home from './components/Home'
import Notification from './components/Notification'
import User from './components/User'
import BlogDetails from './components/BlogDetails'

function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    blogService.getAll().then((res) => {
      dispatch({
        type: 'SET_BLOGS',
        payload: res,
      })
    })
  }, [dispatch])

  useEffect(() => {
    userService.getAll().then((res) => {
      dispatch({
        type: 'GET_USERS',
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

  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch ? blogs.find(b => b.id === blogMatch.params.id): null

  return (
    <div className='container'>
      <h1>Blog App</h1>
      <Notification />
      <div>
        <Link style={{ padding: 5 }} to='/'>
          home
        </Link>
        <Link style={{ padding: 5 }} to='/users'>
          users
        </Link>
        <p>{user.name ? `${user.name} logged in`: ''}</p>
        <button onClick={handleLogout}>Log out</button>
      </div>

      <Routes>
        <Route path='/users/:id' element={<User />} />
        <Route path='/users' element={<UserList />} />
        <Route path='/blogs/:id/' element={<BlogDetails blog={blog} />} />
        <Route
          path='/'
          element={
            user.username === null ? (
              <LoginForm />
            ) : (
              <Home logout={handleLogout} />
            )
          }
        />
      </Routes>
    </div>
  )
}

export default App
