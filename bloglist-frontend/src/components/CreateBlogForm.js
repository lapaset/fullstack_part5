import React, { useState } from 'react'
import InputField from './InputField'

const CreateBlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreate = event => {
      event.preventDefault()
  
      createBlog({
        title: title,
        author: author,
        url: url
      })
      setTitle('')
      setAuthor('')
      setUrl('')
    }

    const handleTitleChange = ({ target }) => setTitle(target.value)
    const handleAuthorChange = ({ target }) => setAuthor(target.value)
    const handleUrlChange = ({ target }) => setUrl(target.value)
  
    return (
      <form onSubmit={handleCreate} className="createBlogForm">
        <h2>Create new</h2>
        <InputField
          id="title"
          type="text"
          name="Title"
          value={title}
          onChange={handleTitleChange} 
        />
        <InputField
          id="author"
          type="text"
          name="Author"
          value={author}
          onChange={handleAuthorChange}
        />
        <InputField
          id="url"
          type="text"
          name="Url"
          value={url}
          onChange={handleUrlChange}
        />  
        <button id="create-blog-button" type="submit">create</button>
      </form>
)}

export default CreateBlogForm