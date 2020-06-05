import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import loginService from '../services/login'
import Togglable from './Togglable'
import Blog from '../components/Blog'
import setNotification from '../reducers/notificationReducer'
import Notification from '../components/Notification'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"
import styled from 'styled-components'


const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
`

const BlogForm = () => {
  const [listU, setListU] = useState([])
  const padding = {
    paddingRight: 5
  }
  const dispatch = useDispatch()
  const user = useSelector(({ blogs, user, notifications }) => user)
  const clearLS = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setTimeout(function () {
      document.location.reload()
    }, 2000)

  }

  function Users() {
    loginService.getAll().then(u =>
      setListU(u)
    )
  }
  const User = () => {
    return (
      <div>
        <h3>Name blogs created</h3>

        {listU.map(user =>
          <UserV key={user.id} user={user} />
        )}

      </div>
    )
  }


  const UserV = ({ user }) => {
    const padding = {
      paddingRight: 5
    }
    var x = `/${user.id}`

    return (

      <Router>
        <div className="container">
          <Table striped>
            <tbody>
              <tr>
                <td>
                  <Link style={padding} to={x} >
                    {user.name}
                  </Link></td>
                <td>{user.blogs.length}</td>

              </tr>
            </tbody>
          </Table>
        </div>
        <Switch>
          <Route path={x}>
            <h2> added blogs</h2>
            {user.blogs.map((b, i) =>
              <p key={i}> {b.title} </p>
            )}
          </Route>
        </Switch>

      </Router>

    )
  }



  const addBlog = async (event) => {

    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    const content = {
      title: title,
      author: author,
      url: url
    }
    dispatch(createBlog(content))
    setNotification(`A new blog ${title} by ${author} added`, 5)
  }
  return (

    <div>
      <Notification />
      <Router>
        <div>
          <Navigation>
            <Link style={padding} to="/blogs">blogs</Link>
            <Link style={padding} to="/users">users</Link>
            <p>{user.name} logged in <button id="logout-button" onClick={() => clearLS()}>log out</button> </p>
          </Navigation>
        </div>
        <Switch>
          <Route path="/users">
            <h2>Users</h2>
            <button onClick={() => Users()}> viewUsers</button>
            <User />
          </Route>
          <Route path="/blogs">
            <Blog />
          </Route>

        </Switch>

      </Router>

      <Togglable buttonLabel='new Blog'>
        <h2>create new</h2>
        <form onSubmit={addBlog}>
          <div>
            title
          <input

              name="title"

            />
          </div>
          <div>
            author
          <input

              name="author"

            />
          </div>
          <div>
            url
          <input

              name="url"

            />
          </div>
          <button id="create" type="submit">create</button>
        </form>
      </Togglable>
    </div>
  )
}

export default BlogForm