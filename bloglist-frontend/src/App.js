import React, { useState, useEffect } from 'react'
import UserView from './components/UserView'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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
      console.log('user set at restart:', user)
    }
  }, [])

  const displayError = message => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const displayNotification = message => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async event => {
    event.preventDefault()
    console.log('login:', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      displayNotification(`Logged in as ${user.username}`)

    } catch {
      displayError('Invalid username or password')
    }
  }
  
  const handleLogout = async event => {
    event.preventDefault()
    console.log('log out:', username, password)

    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    displayNotification('Logged out')
  }

  const handleCreate = async event => {
    event.preventDefault()

    try {
      const blogObject = {
        title: title,
        author: author,
        url: url
      }
      console.log('create new', title, author, url, user)
      blogService.setToken(user.token)

      await blogService.createBlog(blogObject)
      displayNotification(`A new blog ${title} by ${author} added`)

      setTitle('')
      setAuthor('')
      setUrl('')

    } catch (exception) {
      const error = exception.response.data.error
      console.log(error)

      if (error.includes('`title` is required') && error.includes('`url` is required'))
        displayError('title and url are missing')
      else if (error.includes('`title` is required'))
        displayError('title is missing')
      else if (error.includes('`url` is required'))
        displayError('url is missing')
      else
        displayError(error)
    }

    try {
      const blogs = await blogService.getAll()
      setBlogs( blogs )

    } catch (exception) {
      setErrorMessage('could not fetch blogs') 
    }
  }

  const handleUsernameChange = ({ target }) => setUsername(target.value)
  const handlePasswordChange = ({ target }) => setPassword(target.value)

  const handleTitleChange = ({ target }) => setTitle(target.value)
  const handleAuthorChange = ({ target }) => setAuthor(target.value)
  const handleUrlChange = ({ target }) => setUrl(target.value)

  const ErrorField = ({ message }) => {
    return message === null
      ? null
      : <div className="errorField">
          Error: {message}
        </div>
  }

  const NotificationField = ({ message }) => {
    return message === null
      ? null
      : <div className="notificationField">
          {message}
      </div>
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
            username={username}
            password={password}
            handleLogin={handleLogin}
            handlePasswordChange={handlePasswordChange}
            handleUsernameChange={handleUsernameChange}
          />
        : <UserView
            user={user}
            handleLogout={handleLogout}
            blogs={blogs}
            handleCreate={handleCreate}
            title={title}
            handleTitleChange={handleTitleChange}
            author={author}
            handleAuthorChange={handleAuthorChange}
            url={url}
            handleUrlChange={handleUrlChange}
          />
      }

    </main>
  )
}

export default App