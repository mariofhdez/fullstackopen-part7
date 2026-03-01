import { useReducer } from 'react'
import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blog'
import loginService from './services/login'

import notificationReducer from './reducers/notificationReducer'
import LoginForm from './components/LoginForm'

function App() {
  const blogFormRef = useRef()
  const [message, messageDispatch] = useReducer(notificationReducer, {
    message: null,
    type: null,
  })
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)

  const blogsToShow = (blogs) => {
    const sortedBlogList = blogs.sort((a, b) => {
      if (a.likes > b.likes) return -1
      if (a.likes < b.likes) return 1
      else return 0
    })
    setBlogs(sortedBlogList)
  }

  useEffect(() => {
    blogService.getAll().then((res) => {
      blogsToShow(res)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      console.log(user)
      setUser(user)
    } catch (error) {
      console.log(error)
      messageDispatch({
        type: 'SET_MESSAGE',
        payload: {
          message: error.response.data.error,
          type: 'error',
        },
      })
      setTimeout(() => {
        messageDispatch({
          type: 'REMOVE_MESSAGE',
        })
      }, 5000)
    }
  }

  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      window.localStorage.clear()

      setUser(null)
    } catch (error) {
      console.error('Error', error.message)
    }
  }

  const addBlog = async (blogObject) => {
    try {
      const savedBlog = await blogService.create(blogObject)
      blogsToShow(blogs.concat(savedBlog))
      blogFormRef.current.toggleVisibility()

      messageDispatch({
        type: 'SET_MESSAGE',
        payload: {
          message: `a new blog ${blogObject.title} by ${blogObject.author} was added`,
          type: 'success',
        },
      })
      setTimeout(() => {
        messageDispatch({
          type: 'REMOVE_MESSAGE',
        })
      }, 5000)
    } catch (error) {
      console.log(error)
      messageDispatch({
        type: 'SET_MESSAGE',
        payload: {
          message: `The blog ${blogObject.title} by ${blogObject.author} was not added`,
          type: 'error',
        },
      })
      setTimeout(() => {
        messageDispatch({
          type: 'REMOVE_MESSAGE',
        })
      }, 5000)
    }
  }

  const likeBlog = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog)
      const blogList = blogs.map((b) =>
        b.id === updatedBlog.id ? updatedBlog : b,
      )
      blogsToShow(blogList)

      messageDispatch({
        type: 'SET_MESSAGE',
        payload: {
          message: `You liked '${blog.title}' by ${blog.author}`,
          type: 'success',
        },
      })
      setTimeout(() => {
        messageDispatch({
          type: 'REMOVE_MESSAGE',
        })
      }, 5000)
    } catch (error) {
      console.log(error)
      messageDispatch({
        type: 'SET_MESSAGE',
        payload: {
          message: `Like to the blog ${blog.title} is not registered`,
          type: 'error',
        },
      })
      setTimeout(() => {
        messageDispatch({
          type: 'REMOVE_MESSAGE',
        })
      }, 5000)
    }
  }

  const deleteBlog = async (blog) => {
    try {
      if (!confirm(`Remove blog '${blog.title}' by ${blog.author}?`)) {
        throw new Error()
      } else {
        await blogService.remove(blog.id)
        const blogList = blogs.filter((b) => b.id !== blog.id)
        blogsToShow(blogList)

        messageDispatch({
          type: 'SET_MESSAGE',
          payload: {
            message: 'The deletion was completed successfully',
            type: 'success',
          },
        })
        setTimeout(() => {
          messageDispatch({
            type: 'REMOVE_MESSAGE',
          })
        }, 5000)
      }
    } catch (error) {
      console.log(error)
      messageDispatch({
        type: 'SET_MESSAGE',
        payload: {
          message: 'The blog delete process is not completed',
          type: 'error',
        },
      })
      setTimeout(() => {
        messageDispatch({
          type: 'REMOVE_MESSAGE',
        })
      }, 5000)
    }
  }

  return (
    <>
      <h1>Blog App</h1>
      <Notification message={message.message} type={message.type} />
      {user === null ? (
        <LoginForm login={handleLogin} />
      ) : (
        <div>
          <div>
            <p>{user.name}</p>
            <button onClick={handleLogout}>Log out</button>
          </div>
          <Togglable buttonLabel='Create new note' ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <h2>Blog list</h2>
          {blogs.map((b) => (
            <Blog
              key={b.id}
              blog={b}
              handleLike={likeBlog}
              handleRemove={deleteBlog}
              user={user}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default App
