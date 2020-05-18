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

const UserView = ({ user, handleLogout, blogs, createBlog, createFormRef, addLike, deleteBlog }) => {

    const createForm = () => (
      <Togglable
        buttonId={'new-note-button'}
        buttonLabel={'new note'} 
        closeButtonLabel={'cancel'}
        ref={createFormRef} >
          <CreateBlogForm
            createBlog={createBlog} />
      </Togglable>
    )

    return (
    <div>
      <UserHeader
        user={user}
        handleLogout={handleLogout} />

      {createForm()}
      
      <ListOfBlogs
        id="user-blogs"
        blogs={blogs}
        addLike={addLike}
        deleteBlog={deleteBlog}
        user={user} />
    </div>
)}

export default UserView