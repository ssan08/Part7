import React, { useState, useEffect } from 'react'
import setNotification from './reducers/notificationReducer'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { getBlogs } from './reducers/blogReducer'
import { getUser } from './reducers/loginReducer'
import loginService from './services/login'
import { Form } from 'react-bootstrap'
import styled from 'styled-components'

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Input = styled.input`
  margin: 0.25em;
`

const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`

const Footer = styled.div`
  background: Chocolate;
  padding: 1em;
  margin-top: 1em;
`


const App = () => {
  const [user, setUser] = useState(null)

  const LoginForm = () => {
    const dispatch = useDispatch()
    const handleLogin = async (event) => {
      event.preventDefault()
      const username = event.target.username.value
      const password = event.target.password.value
      event.target.username.value = ''
      event.target.password.value = ''


      try {
        const user1 = await loginService.login({
          username, password,
        })
        //   setBlogsU(data(blogs, user))
        // blogService.setToken(user.token)
        dispatch(getUser(user1))
        dispatch(getBlogs(user1))
        setUser(user1)
        dispatch({
          type: 'LOGIN',
          id: '',
          content: user1
        })
      } catch (exception) {
        setNotification('Wrong Credentials', 5)
      }




    }

    return (

      <div>

        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>username:</Form.Label>
            <div>
              <Input name="username" />
            </div>
            <Form.Label>password:</Form.Label>
            <div>
              <Input type="password" name="password" />
            </div>
            <Button variant="primary" type="submit">
              login
          </Button>
          </Form.Group>
        </Form>

      </div>
    )
  }



  const dispatch = useDispatch()



  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(getUser(user))
      dispatch(getBlogs(user))
      setUser(user)

    }
  }, [dispatch])


  if (user === null) {
    return (
      <Page>
        <div className="container">
          <h2>Log in to application</h2>
          <Notification />
          <LoginForm />
        </div>
        <Footer>
        <em>Blog List application</em>
      </Footer>
      </Page>
    )
  }

  else {
    return (
      <Page>
        <div className="container">
          <h2>blogs</h2>
          <BlogForm />
        </div>
      </Page>
    )

  }


}

export default App