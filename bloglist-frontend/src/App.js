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

  const handleUsernameChange = ({ target }) => setUsername(target.value)
  const handlePasswordChange = ({ target }) => setPassword(target.value)

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
          />
      }

    </main>
  )
}

export default App