import React, { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const handleChange = ({ target }) => {
    setNewNote(target.value)
  }

  const addNote = (e) => {
    e.preventDefault()

    createNote({
      content: newNote,
      date: new Date().toISOString(),
      // important: Math.random() < 0.5,
      important: false,
    })

    setNewNote('')
  }

  return (
    <div className='formDiv'>
      <h2>Create a new note</h2>
      <form onSubmit={addNote}>
        <input id="new-note" value={newNote} onChange={handleChange} />
        <button id="submit-note-button" type="submit">save</button>
      </form>
    </div>
  )
}

export default NoteForm
