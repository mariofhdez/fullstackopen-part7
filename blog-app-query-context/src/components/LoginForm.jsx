import { useContext, useState } from "react"
import loginService from '../services/login'
import blogService from '../services/blog'
import LoggedUserContext from "../LoggedUserContext"

  const LoginForm = ({messageDispatch}) => {
    const { userDispatch } = useContext(LoggedUserContext)
      const [username, setUsername] = useState('')
      const [password, setPassword] = useState('')

      const handleLogin = async(e) => {
        e.preventDefault()


    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      console.log(user)
      setUsername('')
      setPassword('')
      userDispatch({ type: 'SET_USER', payload: user })
    } catch (error) {
      console.log(error)
      messageDispatch({
        type: 'SET_MESSAGE',
        payload: {
          message: error.response.data.error,
          type: 'error',
        },
      })
      setTimeout(() => {
        messageDispatch({
          type: 'REMOVE_MESSAGE',
        })
      }, 5000)
    }
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