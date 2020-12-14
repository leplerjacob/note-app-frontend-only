import React from 'react'

const Note = ({ note, toggledImportance, deleteNote }) => {
  const label = note.important ? 'make not important' : 'make important'

  return (
    <div>
      <li className="note">
        {note.content}
        <button onClick={toggledImportance}>{label}</button>
        <button onClick={deleteNote}>Delete</button>
      </li>
    </div>
  )
}

export default Note
