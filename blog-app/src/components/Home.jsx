import { useRef } from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import BlogList from './BlogList'

const Home = () => {
  const blogFormRef = useRef()
  return (
    <div>
      <Togglable buttonLabel='Create new note' ref={blogFormRef}>
        <BlogForm ref={blogFormRef} />
      </Togglable>
      <h2>Blog list</h2>
      <BlogList />
    </div>
  )
}

export default Home
