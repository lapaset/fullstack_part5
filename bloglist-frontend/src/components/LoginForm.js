import React, { useState } from 'react'
import InputField from './InputField'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = ({ target }) => setUsername(target.value)
  const handlePasswordChange = ({ target }) => setPassword(target.value)
  
  const handleSubmit = event => {
    event.preventDefault()
    handleLogin({
      username, password,
    })
    setUsername('')
    setPassword('')
  }

  return (
  <form onSubmit={handleSubmit}>
    <h2>Log in</h2>
    <InputField
      id="username"
      type="text"
      name="Username"
      value={username}
      onChange={handleUsernameChange}
    />
    <InputField
      id="password"
      type="password"
      name="Password"
      value={password}
      onChange={handlePasswordChange}
    />
    <button id="login-button" type="submit">login</button>
  </form>
)}

export default LoginForm