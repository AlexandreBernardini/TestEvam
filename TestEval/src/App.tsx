import React from 'react';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import NoteDetail from './components/NoteDetail';
import useNoteStore from './store';

interface Note {
  id: string;
  title: string;
  score: number;
  comment: string;
  date: string;
}

const App: React.FC = () => {
  const notes = useNoteStore((state) => state.notes);
  const selectedNote = useNoteStore((state) => state.selectedNote);
  const addNote = useNoteStore((state) => state.addNote);
  const updateNote = useNoteStore((state) => state.updateNote);
  const deleteNote = useNoteStore((state) => state.deleteNote);
  const selectNote = useNoteStore((state) => state.selectNote);

  const handleSubmit = (note: Note) => {
    if (selectedNote) {
      updateNote(note);
    } else {
      addNote(note);
    }
  };

  return (
    <div>
      <NoteForm onSubmit={handleSubmit} initialNote={selectedNote ?? undefined} data-testid="note-form" />
      <NoteList onSelectNote={selectNote} data-testid="note-list" />
      {selectedNote && (
        <NoteDetail
          onDelete={deleteNote}
          onEdit={() => selectNote(selectedNote)}
          data-testid="note-detail"
        />
      )}
    </div>
  );
};

export default App;
