import React from 'react'
import Blog from './Blog'

const ListOfBlogs = ({ blogs, addLike }) => (
  <main>
    <h2>Blogs</h2>
    <ul>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(b =>
          <Blog
            key={b.id}
            blog={b}
            addLike={addLike} />
        )}
    </ul>
  </main>
)

export default ListOfBlogs