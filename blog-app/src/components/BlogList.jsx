import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
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
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} - {blog.author}
          </Link>
        </p>
      </div>
    </div>
  )
}

const BlogList = () => {
  const blogs = useSelector((state) => {
    const sortedBlogList = state.blogs.sort((a, b) => {
      if (a.likes > b.likes) return -1
      if (a.likes < b.likes) return 1
      else return 0
    })
    return sortedBlogList
  })

  return (
    <>
      {blogs.map((b) => (
        <Blog key={b.id} blog={b} />
      ))}
    </>
  )
}

export default BlogList
