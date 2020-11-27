import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import './App.css'
import noteService from './services/notes'
import Notification from './components/Notification'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [notify, setNotify] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then((initialNotes) => {
        setNotes(initialNotes)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }

    noteService
      .create(noteObject)
      .then((returnedNote) => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
        console.log('success', returnedNote)
      })
      .catch((err) => {
        console.log('Error Occurred: ', err.response.data.error)
        setNotify(err.response.data.error)
        setTimeout(() => {
          setNotify(null)
        }, 5000)
      })
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
      })
      .catch(() => {
        setNotify(`Note: \"${changedNote.content}\" has already been deleted`)
        setTimeout(() => {
          setNotify(null)
        }, 5000)
        setNotes(notes.filter((n) => n.id !== id))
      })
  }

  const handleDelete = (e, id) => {
    e.preventDefault()
    noteService.deleteNote(id).then((message) => {
      console.log(message)
    })
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={notify} />
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
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App
