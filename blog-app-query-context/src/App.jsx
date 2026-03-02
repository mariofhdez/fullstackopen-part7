import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRef, useReducer, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blog'

import notificationReducer from './reducers/notificationReducer'
import LoginForm from './components/LoginForm'
import userReducer from './reducers/userReducer'
import LoggedUserContext from './LoggedUserContext'

function App() {
  const queryClient = useQueryClient()
  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
    }
  })
  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.map(b => b.id !== updatedBlog.id ? b : updatedBlog))
    }
  })
  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (_, id) => {
      queryClient.setQueryData(['blogs'], (old =[]) => old.filter(b => b.id !== id))
    }
  })
  const blogFormRef = useRef()
  const [message, messageDispatch] = useReducer(notificationReducer, {
    message: null,
    type: null,
  })
  const [user, userDispatch] = useReducer(userReducer, null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      userDispatch({ type: 'SET_USER', payload: user })
    }
  }, [])

  const blogsQuery = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => await blogService.getAll(),
    refetchOnWindowFocus: false,
  })

  console.log(JSON.parse(JSON.stringify(blogsQuery)))

  if (blogsQuery.isLoading) {
    return <div>loading data...</div>
  }

  const blogsToShow = (blogs) => {
    const sortedBlogList = blogs.sort((a, b) => {
      if (a.likes > b.likes) return -1
      if (a.likes < b.likes) return 1
      else return 0
    })
    return sortedBlogList
  }

  const blogs = blogsToShow(blogsQuery.data)

  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      window.localStorage.clear()

      userDispatch({ type: 'REMOVE_USER' })
    } catch (error) {
      console.error('Error', error.message)
    }
  }

  const addBlog = async (blogObject) => {
    try {
      newBlogMutation.mutate(blogObject)
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
      updateBlogMutation.mutate(blog)

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
        deleteBlogMutation.mutate(blog.id)

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
    <LoggedUserContext.Provider value={{user, userDispatch}}>
      <h1>Blog App</h1>
      <Notification message={message.message} type={message.type} />
      {(user === null || user === 'undefined') ? (
        <LoginForm messageDispatch={messageDispatch} />
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
    </LoggedUserContext.Provider>
  )
}

export default App
