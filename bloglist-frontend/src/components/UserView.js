import React from 'react'
import ListOfBlogs from './ListOfBlogs'

const UserHeader = ({ user, handleLogout }) => (
  <header>
    Logged in as {user.name}
    <button onClick={handleLogout}>Log out</button>
  </header>
)

const UserView = ({ user, handleLogout, blogs }) => (
  <div>
    <UserHeader
      user={user}
      handleLogout={handleLogout}
    />
    <ListOfBlogs
      blogs={blogs}
    />
  </div>
)

export default UserView