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
      console.log('logged in', user)
    } catch {
      console.log('login error')
    }
  }
  
  const handleLogout = async event => {
    event.preventDefault()

    console.log('log out:', username, password)

    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const handleCreate = async event => {
    event.preventDefault()

    try {
      const blogObject = {
        title: title,
        author: author,
        url: url
      }

      blogService.setToken(user.token)
      console.log('create new', title, author, url, user)
      await blogService.createBlog(blogObject)
      
      try {
        const blogs = await blogService.getAll()
        setBlogs( blogs )
      } catch (exception) {
        setErrorMessage('could not fetch blogs')
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      }
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      console.log('error creating new blog:', exception)
    }
  }

  const handleUsernameChange = ({ target }) => setUsername(target.value)
  const handlePasswordChange = ({ target }) => setPassword(target.value)

  const handleTitleChange = ({ target }) => setTitle(target.value)
  const handleAuthorChange = ({ target }) => setAuthor(target.value)
  const handleUrlChange = ({ target }) => setUrl(target.value)

  return (
    <main>
      <h1>Bloglist</h1>

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