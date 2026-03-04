import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'

const UserList = () => {
  const users = useSelector((state) => state.users)
  return (
    <>
      <h3>Users</h3>
      <Table striped>
        <thead>
          <tr>
            <td>username</td>
            <td>blogs created</td>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default UserList
