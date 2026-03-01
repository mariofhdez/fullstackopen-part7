import { useSelector } from 'react-redux'
import Blog from './Blog'

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
            <Blog
              key={b.id}
              blog={b}
            />
          ))}
    </>
  )
}

export default BlogList