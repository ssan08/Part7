import React, { useState } from 'react'
import { useField } from './hooks'
import {
  BrowserRouter as Router,
  Switch, Route, Link, Redirect
} from "react-router-dom"

const Menu = (props) => {

  const padding = {
    paddingRight: 5
  }
  return (

    <Router>
      <div>
        <Link style={padding} to="/">anecdotes</Link>
        <Link style={padding} to="/create">createNew</Link>
        <Link style={padding} to="/about">about</Link>
      </div>
      <Switch>
        <Route path="/create">
          {!props.notif ? <CreateNew addNew={props.addNew} /> : <Redirect to="/" />}
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={props.anecdotes} />
        </Route>
      </Switch>

    </Router>

  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>

    <ul>
      {anecdotes.map(anecdote => <AnecdoteDetail key={anecdote.id} anecdote={anecdote} />)}
    </ul>
  </div>
)

const AnecdoteDetail = ({ anecdote }) => {
  const padding = {
    paddingRight: 5
  }
  var x = `/${anecdote.id}`
  return (
    <Router>
      <div>
        <Link style={padding} to={x} >{anecdote.content}</Link>
      </div>
      <Switch>
        <Route path={x}>
          <h2> {anecdote.content} by {anecdote.author}</h2>
          <p>has {anecdote.votes} votes</p>
          <p>for more info see {anecdote.info} </p>
        </Route>
      </Switch>

    </Router>
  )
}
const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
    Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
    such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {


  const content = useField('content')
  const author = useField('author')
  const url = useField('info')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: url.value,
      votes: 0
    })
  }

  const reset = () => {
    content.type.reset()
    author.type.reset()
    url.type.reset()

  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input  {...content} />
        </div>
        <div>
          author
          <input  {...author} />
        </div>
        <div>
          url for more info
          <input  {...url} />
        </div>
        <button type="submit ">create</button> <button type="button"  onClick={() => reset()}>reset</button>
      </form> 
    </div>
  )

}

const App = () => {

  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')



  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote ${anecdote.content} created!`)

  }

  const Notification = (props) => {
    setTimeout(function () { setNotification('') }, 10000)
    return (
      <div>
        <Router>
          <Route path="/" />
        </Router>
        <p> {props.notif}</p>
      </div>
    )
  }


  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }


  return (
    <div>
      <h1>Software anecdotes</h1>
      <Notification notif={notification} />
      <Menu anecdotes={anecdotes} addNew={addNew} notif={notification} />
      <Footer />
    </div>
  )
}

export default App;
