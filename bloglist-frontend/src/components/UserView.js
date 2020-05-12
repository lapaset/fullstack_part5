import React from 'react'
import ListOfBlogs from './ListOfBlogs'
import CreateBlogForm from './CreateBlogForm'
import Togglable from './Togglable'

const UserHeader = ({ user, handleLogout }) => (
  <header>
    Logged in as {user.name}
    <button onClick={handleLogout}>Log out</button>
  </header>
)

const UserView = ({ user, handleLogout, blogs, createBlog }) => {
  
    const createForm = () => (
      <Togglable buttonLabel={'new note'}>
        <CreateBlogForm
          createBlog={createBlog}
        />
      </Togglable>
    )

    return (
    <div>
      <UserHeader
        user={user}
        handleLogout={handleLogout}
      />

      {createForm()}
      
      <ListOfBlogs
        blogs={blogs}
      />
    </div>
)}

export default UserView