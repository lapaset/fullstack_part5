import React, { useState, useEffect } from 'react'
import UserView from './components/UserView'
import LoginForm from './components/LoginForm'
import ErrorField from './components/ErrorField'
import NotificationField from './components/NotificationField'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      console.log('user set at restart:', user)
    }
  }, [])

  const displayError = message => {
    setNotification(null)
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const displayNotification = message => {
    setErrorMessage(null)
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const refreshBlogs = async () => {
    try {
      const blogs = await blogService.getAll()
      setBlogs( blogs )

    } catch (exception) {
      setErrorMessage('could not fetch blogs') 
    }
  }

  const handleLogin = async userObject => {
    try {
      const user = await loginService.login(userObject)

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      displayNotification(`Logged in as ${user.username}`)

    } catch {
      displayError('Invalid username or password')
    }
  }
  
  const handleLogout = async event => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    displayNotification('Logged out')
  }

  const createFormRef = React.createRef()

  const addBlog = async (blogObject) => {
    createFormRef.current.toggleVisibility()
    try {
      await blogService.createBlog(blogObject)
      displayNotification(`A new blog ${blogObject.title} by ${blogObject.author} added`)

    } catch (exception) {
      const error = exception.response.data.error

      if (error.includes('`title` is required') && error.includes('`url` is required'))
        displayError('title and url are missing')
      else if (error.includes('`title` is required'))
        displayError('title is missing')
      else if (error.includes('`url` is required'))
        displayError('url is missing')
      else
        displayError(error)
    }
    
    refreshBlogs()
  }

  const addLike = async (id, blogObject) => {
    try {
      await blogService.updateBlog(id, blogObject)
    } catch (exception) {
      setErrorMessage('failed to like')
      console.log(exception)
    }

    refreshBlogs()
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.deleteBlog(id)
    } catch (exception) {
      setErrorMessage('failed to delete blog')
      console.log(exception)
    }

    refreshBlogs()
  }

  return (
    <main>
      <h1>Bloglist</h1>

      <ErrorField
        message={errorMessage}
      />

      <NotificationField
        message={notification}
      />

      {user === null
        ? <LoginForm
            handleLogin={handleLogin}
          />
        : <UserView
            user={user}
            handleLogout={handleLogout}
            blogs={blogs}
            createBlog={addBlog}
            createFormRef={createFormRef}
            addLike={addLike}
            deleteBlog={deleteBlog}   
          />
      }

    </main>
  )
}

export default App