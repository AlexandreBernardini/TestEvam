import React, { useState, useEffect } from 'react';
import useNoteStore from '../store';

const NoteForm: React.FC = () => {
  const selectedNote = useNoteStore((state) => state.selectedNote);
  const addNote = useNoteStore((state) => state.addNote);
  const updateNote = useNoteStore((state) => state.updateNote);
  const [title, setTitle] = useState(selectedNote?.title || '');
  const [score, setScore] = useState(selectedNote?.score.toString() || '');
  const [comment, setComment] = useState(selectedNote?.comment || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setScore(selectedNote.score.toString());
      setComment(selectedNote.comment);
    }
  }, [selectedNote]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedScore = parseFloat(score);
    if (parsedScore < 0 || parsedScore > 20) {
      setError('Score must be between 0 and 20');
      return;
    }
    const newNote = {
      id: selectedNote?.id || Date.now().toString(),
      title,
      score: parsedScore,
      comment,
      date: selectedNote?.date || new Date().toISOString(),
    };
    if (selectedNote) {
      updateNote(newNote);
    } else {
      addNote(newNote);
    }
    setTitle('');
    setScore('');
    setComment('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} data-testid="note-form">
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="score">Score:</label>
        <input
          type="number"
          id="score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <button type="submit">Save Note</button>
    </form>
  );
};

export default NoteForm;
