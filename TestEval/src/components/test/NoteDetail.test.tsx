import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NoteDetail from '../NoteDetail';
import { test, expect, vi, beforeEach } from 'vitest';
import useNoteStore from '../../store';

interface Note {
  id: string;
  title: string;
  score: number;
  comment: string;
  date: string;
}

const note: Note = {
  id: '1',
  title: 'Test Note',
  score: 15,
  comment: 'This is a test comment',
  date: new Date().toISOString(),
};

beforeEach(() => {
  useNoteStore.setState({ selectedNote: note, notes: [note] });
});

test('calls deleteNote with correct ID when delete button is clicked', () => {
  const deleteNote = vi.fn();
  useNoteStore.setState({ deleteNote });

  render(<NoteDetail />);

  vi.spyOn(window, 'confirm').mockImplementation(() => true);

  fireEvent.click(screen.getByText(/delete/i));

  expect(deleteNote).toHaveBeenCalledTimes(1);
  expect(deleteNote).toHaveBeenCalledWith(note.id);

  vi.spyOn(window, 'confirm').mockRestore();
});

test('renders NoteDetail with correct title, comment, and score', () => {
  render(<NoteDetail />);

  expect(screen.getByText(note.title)).toBeInTheDocument();
  expect(screen.getByText(`${note.score}/20`)).toBeInTheDocument();
  expect(screen.getByText(note.comment)).toBeInTheDocument();
  expect(screen.getByText(new Date(note.date).toLocaleDateString())).toBeInTheDocument();
});
