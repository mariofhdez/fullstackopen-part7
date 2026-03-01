import { useState } from "react"

  const LoginForm = ({login}) => {
      const [username, setUsername] = useState('')
      const [password, setPassword] = useState('')

      const handleLogin = (e) => {
        e.preventDefault()
        login(username, password)
        setUsername('')
        setPassword('')
      }
    return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className='textField'>
          <p>Username</p>
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className='textField'>
          <p>Password</p>
          <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </>
  )}

  export default LoginForm