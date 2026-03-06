import { Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Navigation = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      window.localStorage.clear()
      navigate('/login')

      dispatch({
        type: 'REMOVE_USER',
      })
    } catch (error) {
      console.error('Error', error.message)
    }
  }
  return (
    <Navbar expand='lg' bg='info' variant='dark'>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='me-auto'>
          <span className='navbar-brand mb-0 px-4 h1 brand'>Blog-App</span>
          <Nav.Link as='span'>
            <Link style={{ padding: 5 }} to='/'>
              blogs
            </Link>
          </Nav.Link>
          <Nav.Link as='span'>
            <Link style={{ padding: 5 }} to='/users'>
              users
            </Link>
          </Nav.Link>
          <Nav.Link as='span'>
            {user.name ? (
              <em style={{ padding: 5 }}>{user.name} logged in</em>
            ) : (
              ''
            )}
          </Nav.Link>
          <Nav.Link as='span'>
            {user.name ? (
              <button className='btn btn-light' onClick={handleLogout}>
                Log out
              </button>
            ) : (
              ''
            )}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation
