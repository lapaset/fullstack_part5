import React from 'react'

const LoginForm = ({ username, password, handleLogin, handlePasswordChange, handleUsernameChange }) => (
  <form onClick={handleLogin}>
    <h2>Log in</h2>
    <div>
      username: 
      <input type="text" name="Username" value={username}
        onChange={handleUsernameChange}
      />
    </div>
    <div>
      password: 
      <input type="password" name="Password" value={password}
        onChange={handlePasswordChange}
      />
    </div>
    <button type="submit">login</button>
  </form>
)

export default LoginForm