import React, { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import './App.css'
import noteService from './services/notes'
import Notification from './components/Notification'
import loginService from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/Login'
import NoteForm from './components/NoteForm'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [notify, setNotify] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const noteFormRef = useRef()

  useEffect(() => {
    noteService
      .getAll()
      .then((initialNotes) => {
        setNotes(initialNotes)
      })
      .catch((err) => {
        console.log(err)
      })
    setTimeout(() => {
      window.localStorage.clear()
    }, 10000)
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then((returnedNote) => {
        setNotes(notes.concat(returnedNote))
        console.log('success', returnedNote)
      })
      .catch((err) => {
        const error = err.response.date.error
        console.log('Error Occurred: ', error)
      })
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
      })
      .catch(() => {
        setNotes(notes.filter((n) => n.id !== id))
      })
  }

  const handleDelete = (e, id) => {
    e.preventDefault()
    noteService.deleteNote(id).then((message) => {
      console.log(message)
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setNotify({ message: 'Log in successful', type: true })
      setTimeout(() => {
        setNotify(null)
      }, 5000)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (err) {
      setNotify({ message: 'Wrong Credentials', type: false })
      setTimeout(() => {
        setNotify(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }

  return (
    <div>
      <h1>Notes</h1>
      {notify && <Notification props={notify} />}

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <Togglable buttonLabel={'new note'} ref={noteFormRef}>
            <NoteForm createNote={addNote} />
          </Togglable>
        </div>
      )}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggledImportance={() => toggleImportanceOf(note.id)}
            deleteNote={(e) => handleDelete(e, note.id)}
          />
        ))}
      </ul>
    </div>
  )
}

export default App
