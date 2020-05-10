import React from 'react'
import ListOfBlogs from './ListOfBlogs'
import InputField from './InputField'

const UserHeader = ({ user, handleLogout }) => (
  <header>
    Logged in as {user.name}
    <button onClick={handleLogout}>Log out</button>
  </header>
)

const CreateBlogForm = ({ handleCreate, title, handleTitleChange,
  author, handleAuthorChange, url, handleUrlChange }) => (
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
    <button type="submit">Create</button>
  </form>
)

const UserView = ({ user, handleLogout, blogs, handleCreate, title,
  handleTitleChange, author, handleAuthorChange, url, handleUrlChange }) => (
  <div>
    <UserHeader
      user={user}
      handleLogout={handleLogout}
    />

    <CreateBlogForm
      handleCreate={handleCreate}
      title={title}
      handleTitleChange={handleTitleChange}
      author={author}
      handleAuthorChange={handleAuthorChange}
      url={url}
      handleUrlChange={handleUrlChange}
    />

    <ListOfBlogs
      blogs={blogs}
    />
  </div>
)

export default UserView