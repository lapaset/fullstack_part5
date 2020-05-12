import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, addLike }) => {

  const handleLike = event => {
    addLike(blog.id, {
      likes: ++blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      user: blog.user,
    })
  }

  return (
  <li className="blog">
    {blog.title} {blog.author}

    <Togglable buttonLabel="view" closeButtonLabel="hide">
      <p>
        {blog.url}<br />
        {blog.likes}
        <button onClick={handleLike}>like</button><br />
        {blog.user.name}<br />
      </p>
    </Togglable>
  </li>
)}

export default Blog
