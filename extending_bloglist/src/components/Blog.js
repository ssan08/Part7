import React, { useState } from 'react'
import blogService from '../services/blogs'
import { useSelector, useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"



const ShowBlog = (props) => {
  const [comment, setComment] = useState([])
  const padding = {
    paddingRight: 5
  }

  const dispatch = useDispatch()


  function removeBlog(id) {
    if (window.confirm(`Remove blog ${props.blog.title} by ${props.blog.author}?`)) {
      dispatch({
        type: 'REMOVE',
        id: id,
        content: ''

      })
      window.alert(`${props.blog.title} by ${props.blog.author} deleted`);
      setTimeout(function () {
        document.location.reload()
      }, 2000)
    }

  }

  function likes() {

    var like = props.blog.likes + 1
    var uBlog = {
      author: props.blog.author,
      title: props.blog.title,
      likes: like,
      url: props.blog.url
    }

    dispatch({
      type: 'LIKE',
      id: props.blog.id,
      content: uBlog

    })
    setTimeout(function () {
      document.location.reload()
    }, 2000)
  }

  const addComment = async (event) => {

    event.preventDefault()
    const comment = event.target.comment.value

    event.target.comment.value = ''

    dispatch({
      type: 'COMMENT',
      id: props.blog.id,
      content: {
        comment: comment
      }
    })

  }
   function viewComment() {
    blogService.getComments(props.blog.id).then(c=>
      setComment(c))

  }

  const Comment = () => {
    if (comment){
      return (
        <div>
         {comment.map((comment, i) =>
           <p key={i}>{comment.comment} </p>
        )}
     </div>
    )
    }
    else {
      return (
        <p></p>
      )
    }

  }


  var x = `/blogs/${props.blog.id}`
  const user = useSelector(({ blogs, user, notifications }) => user)
  return (
    <Router>
      <div>
        <Link style={padding} to={x} >{props.blog.title} {props.blog.author}</Link> 
        <button id="like-button" onClick={() => removeBlog(props.blog.id)}>delete</button> 
      </div>
      <Switch>
        <Route path={x}>
          <h2>{props.blog.title} {props.blog.author}</h2>
          <p> {props.blog.url}</p>
          <p>{props.blog.likes} likes <button id="like-button" onClick={() => likes()}>like</button> </p>
          <p>added by {user.username} </p>
          <h3>Comments</h3>
          <div>
          <button onClick = {() => viewComment()}> viewComments</button>
          <Comment />
          </div>
          <form onSubmit={addComment}>
            <div>
              <input
                name="comment"
              />
            </div>
            <button type="submit">add comment</button>
          </form>
        </Route>
      </Switch>

    </Router>
  )
}


const Blog = () => {

  
  const blog = useSelector(({ blogs, user, notifications }) => blogs)

  

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }





  return (

    <div style={blogStyle}>
      {blog.map(blog =>
        <ShowBlog key={blog.id} blog={blog} />
      )}
    </div>
  )



}

export default Blog 
