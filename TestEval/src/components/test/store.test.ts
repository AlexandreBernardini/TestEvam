import useNoteStore from '../../store';
import { expect, describe, beforeEach, it } from 'vitest';

interface Note {
  id: string;
  title: string;
  score: number;
  comment: string;
  date: string;
}

describe('NoteStore', () => {
  beforeEach(() => {
    // Reset the state before each test
    const { setState } = useNoteStore;
    setState({ notes: [], selectedNote: null });
  });

  it('should add a note', () => {
    const { addNote, notes } = useNoteStore.getState();
    const note: Note = { id: '1', title: 'Test Note', score: 15, comment: 'Test comment', date: new Date().toISOString() };
    
    addNote(note);
    
    expect(notes.length).toBe(1);
    expect(notes[0]).toEqual(note);
  });

  it('should update a note', () => {
    const { addNote, updateNote, notes } = useNoteStore.getState();
    const note: Note = { id: '1', title: 'Test Note', score: 15, comment: 'Test comment', date: new Date().toISOString() };
    
    addNote(note);
    
    const updatedNote: Note = { ...note, title: 'Updated Note' };
    updateNote(updatedNote);
    
    expect(notes.length).toBe(1);
    expect(notes[0].title).toBe('Updated Note');
  });

  it('should delete a note', () => {
    const { addNote, deleteNote, notes } = useNoteStore.getState();
    const note: Note = { id: '1', title: 'Test Note', score: 15, comment: 'Test comment', date: new Date().toISOString() };
    
    addNote(note);
    
    deleteNote(note.id);
    
    expect(notes.length).toBe(0);
  });

  it('should select a note', () => {
    const { addNote, selectNote, selectedNote } = useNoteStore.getState();
    const note: Note = { id: '1', title: 'Test Note', score: 15, comment: 'Test comment', date: new Date().toISOString() };
    
    addNote(note);
    
    selectNote(note);
    
    expect(selectedNote).toEqual(note);
  });
});
