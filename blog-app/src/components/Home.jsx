import { useRef } from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import BlogList from './BlogList'

const Home = () => {
  const blogFormRef = useRef()
  return (
    <div>
      <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
        <BlogForm ref={blogFormRef} />
      </Togglable>
      <div className='my-3 border-bottom'></div>
      <h2>Blog list</h2>
      <BlogList />
    </div>
  )
}

export default Home
