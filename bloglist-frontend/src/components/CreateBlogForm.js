import React, { useState } from 'react'
import InputField from './InputField'

const CreateBlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreate = async event => {
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
    <form onSubmit={handleCreate}>
      <h2>Create new</h2>
      <InputField
        type="text"
        name="Title"
        value={title}
        onChange={handleTitleChange} 
      />
      <InputField
        type="text"
        name="Author"
        value={author}
        onChange={handleAuthorChange}
      />
      <InputField
        type="text"
        name="Url"
        value={url}
        onChange={handleUrlChange}
      />  
      <button type="submit">create</button>
    </form>
)}

export default CreateBlogForm