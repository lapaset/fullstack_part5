import React, { useState } from 'react'
import InputField from './InputField'

const CreateBlogForm = ({ handleCreate, title, handleTitleChange,
  author, handleAuthorChange, url, handleUrlChange }) => {
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