import React from 'react'
import InputField from './InputField'

const LoginForm = ({ username, password, handleLogin, handlePasswordChange, handleUsernameChange }) => (
  <form onSubmit={handleLogin}>
    <h2>Log in</h2>
    <InputField
      type="text"
      name="Username"
      value={username}
      onChange={handleUsernameChange}
    />
    <InputField
      type="password"
      name="Password"
      value={password}
      onChange={handlePasswordChange}
    />
    <button type="submit">login</button>
  </form>
)

export default LoginForm