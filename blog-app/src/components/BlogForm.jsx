import { useState } from 'react'
import { useDispatch } from 'react-redux'

import blogService from '../services/blog'

const BlogForm = ({ref}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const addBlog = async (e) => {
    e.preventDefault()
    try {
      const savedBlog = await blogService.create({
        title: title,
        author: author,
        url: url,
      })
      dispatch({
        type: 'NEW_BLOG',
        payload: savedBlog,
      })
      ref.current.toggleVisibility()

      setTitle('')
      setAuthor('')
      setUrl('')

      dispatch({
        type: 'SET_MESSAGE',
        payload: {
          message: `a new blog ${savedBlog.title} by ${savedBlog.author} was added`,
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
          message: `The blog ${title} by ${author} was not added`,
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

  return (
    <div className='container'>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div className='input-group mb-3'>
          <label className='input-group-text' for='title'>Title:</label>
          <input
            className='form-control'
            id='title'
            type='text'
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder='Title'
          />
        </div>
        <div className='input-group mb-3'>
          <span className='input-group-text'>Author:</span>
          <input
            className='form-control'
            type='text'
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            placeholder='Author'
          />
        </div>
        <div className='input-group mb-3'>
          <span className='input-group-text'>URL:</span>
          <input
            className='form-control'
            type='text'
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder='Url'
          />
        </div>
        <button className='btn btn-success' type='submit'>Save</button>
      </form>
    </div>
  )
}

export default BlogForm
