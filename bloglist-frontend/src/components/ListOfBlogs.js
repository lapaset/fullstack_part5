import React from 'react'
import Blog from './Blog'

const ListOfBlogs = ({ blogs }) => (
  <div>
    <h2>Blogs</h2>
    <ul>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </ul>
  </div>
)

export default ListOfBlogs