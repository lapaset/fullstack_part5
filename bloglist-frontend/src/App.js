import React, { useState, useEffect } from 'react'
import ListOfBlogs from './components/ListOfBlogs'
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

  const handleLogin = async event => {
    event.preventDefault()

    console.log('login:', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      setUser(user)
      setUsername('')
      setPassword('')
      console.log('logged in', user)
    } catch {
      console.log('login error')
    }
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
        : <ListOfBlogs
            blogs={blogs}
          />
      }

    </main>
  )
}

export default App