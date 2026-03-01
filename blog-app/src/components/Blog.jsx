import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import blogService from '../services/blog'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const showWhenIsSameUser = () => {
    if (user !== undefined && blog.user) {
      if (user.name === blog.user.name) {
        return { display: '' }
      } else {
        return { display: 'none' }
      }
    } else {
      return { display: 'none' }
    }
  }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const likeBlog = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog)
      dispatch({
        type: 'VOTE_BLOG',
        payload: updatedBlog,
      })

      dispatch({
        type: 'SET_MESSAGE',
        payload: {
          message: `You liked '${blog.title}' by ${blog.author}`,
          type: 'success',
        },
      })
      setTimeout(() => {
        dispatch({
          type: 'REMOVE_MESSAGE',
        })
      }, 5000)
    } catch (error) {
      console.log(error)
      dispatch({
        type: 'SET_MESSAGE',
        payload: {
          message: `Like to the blog ${blog.title} is not registered`,
          type: 'error',
        },
      })
      setTimeout(() => {
        dispatch({
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
        dispatch({
          type: 'DELETE_BLOG',
          payload: blog,
        })

        dispatch({
          type: 'SET_MESSAGE',
          payload: {
            message: 'The deletion was completed successfully',
            type: 'success',
          },
        })
        setTimeout(() => {
          dispatch({
            type: 'REMOVE_MESSAGE',
          })
        }, 5000)
      }
    } catch (error) {
      console.log(error)
      dispatch({
        type: 'SET_MESSAGE',
        payload: {
          message: 'The blog delete process is not completed',
          type: 'error',
        },
      })
      setTimeout(() => {
        dispatch({
          type: 'REMOVE_MESSAGE',
        })
      }, 5000)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className='blog'>
      <div className='blogHeader'>
        <p>
          <span>{blog.title}</span> - {blog.author}{' '}
          <button onClick={toggleVisibility}>
            {visible ? 'hide' : 'view'}
          </button>
        </p>
      </div>
      <div style={showWhenVisible} className='blogDetails'>
        <p>{blog.url}</p>
        <p>
          Likes: {blog.likes}{' '}
          <button onClick={() => likeBlog({ ...blog, likes: blog.likes + 1 })}>
            like
          </button>
        </p>
        <p>{blog.user ? blog.user.name : ''}</p>
        <button style={showWhenIsSameUser()} onClick={() => deleteBlog(blog)}>
          Remove
        </button>
      </div>
    </div>
  )
}

export default Blog
