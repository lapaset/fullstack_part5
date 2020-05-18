import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, addLike, deleteBlog, user }) => {

  const handleLike = () => {
    addLike(blog.id, {
      likes: ++blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      user: blog.user,
    })
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`))
    deleteBlog(blog.id)
  }

  const removeButton = () => (
    <button id="remove-blog-button" onClick={handleDelete}>remove</button>
  )

  return (
  <li className="blog">
    <span className="blogDefaults">{blog.title} {blog.author}</span>

    <Togglable
      buttonId="show-blog-details-button"
      buttonLabel="view"
      closeButtonLabel="hide">
        <p>
          {blog.url}<br />
          <span id='likes'>likes: {blog.likes}</span>
          <button
            id="like-button"
            onClick={handleLike}
            className="likeButton">
              like
          </button><br />
          {blog.user.name}<br />
          
          {user.username === blog.user.username && removeButton()}
        </p>
    </Togglable>
  </li>
)}

export default Blog

