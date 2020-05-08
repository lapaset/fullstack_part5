import React from 'react'
import Blog from './Blog'

const ListOfBlogs = ({ blogs }) => (
  <main>
    <h2>Blogs</h2>
    <ul>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </ul>
  </main>
)

export default ListOfBlogs