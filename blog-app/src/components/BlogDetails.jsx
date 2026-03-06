import { useDispatch, useSelector } from 'react-redux'
import { Link, useMatch } from 'react-router-dom'

import blogService from '../services/blog'
import { useEffect, useState } from 'react'

const BlogDetails = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [comment, setComment] = useState('')
  const [blog, setBlog] = useState(null)

  const blogMatch = useMatch('/blogs/:id')
  const id = blogMatch.params.id

  useEffect(()=> {
    blogService.getById(id).then((res) => {
      setBlog(res)
    })
  },[dispatch])

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

  const likeBlog = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog)
      setBlog(updatedBlog)
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

  const handleComment = async (e) => {
    e.preventDefault()
    try {
      const savedComment = await blogService.addComment(id, {
        content: comment
      })
      console.log(savedComment);
      setBlog(savedComment)
      setComment('')

      dispatch({
        type: 'SET_MESSAGE',
        payload: {
          message: `You comment '${blog.title}' by ${blog.author}`,
          type: 'success',
        },
      })
      setTimeout(() => {
        dispatch({
          type: 'REMOVE_MESSAGE',
        })
      }, 5000)
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'SET_MESSAGE',
        payload: {
          message: `The comment was not added`,
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

  if (!blog) return null

  return (
    <div className='blog'>
      <h3>
        {blog.title} - <em>{blog.author}</em>
      </h3>

      <Link>{blog.url}</Link>
      <p>
        {blog.likes} likes{' '}
        <button onClick={() => likeBlog({ ...blog, likes: blog.likes + 1 })}>
          like
        </button>
      </p>
      <p>{blog.user ? `added by ${blog.user.name}` : ''}</p>
      <button style={showWhenIsSameUser()} onClick={() => deleteBlog(blog)}>
        Remove
      </button>
      <div>
        <h4>comments</h4>
        <form onSubmit={handleComment}>
          <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
          <button type="submit">add comment</button>
        </form>
        {blog.comments.length === 0 ? 'no comments yet':
        blog.comments.map(c => (
          <li key={c.id}>{c.content}</li>
        ))}
      </div>
    </div>
  )
}

export default BlogDetails
