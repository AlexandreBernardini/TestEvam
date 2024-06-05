import React from 'react';
import useNoteStore from '../store';

const NoteDetail: React.FC = () => {
  const note = useNoteStore((state) => state.selectedNote);
  const deleteNote = useNoteStore((state) => state.deleteNote);
  const selectNote = useNoteStore((state) => state.selectNote);

  if (!note) return null;

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteNote(note.id);
    }
  };

  return (
    <div data-testid="note-detail">
      <h2>{note.title}</h2>
      <p>{note.score}/20</p>
      <p>{note.comment}</p>
      <p>{new Date(note.date).toLocaleDateString()}</p>
      <button onClick={() => selectNote(note)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default NoteDetail;
