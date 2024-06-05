import { render, screen, fireEvent } from '@testing-library/react';
import { test, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import NoteForm from '../NoteForm';
import useNoteStore from '../../store';

beforeEach(() => {
  useNoteStore.setState({ selectedNote: null, notes: [] });
});

test('renders NoteForm and submits new note', () => {
  const addNote = vi.fn();
  useNoteStore.setState({ addNote });

  render(<NoteForm />);

  fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Note' } });
  fireEvent.change(screen.getByLabelText(/score/i), { target: { value: '15' } });
  fireEvent.change(screen.getByLabelText(/comment/i), { target: { value: 'This is a new note' } });
  fireEvent.click(screen.getByText(/save note/i));

  expect(addNote).toHaveBeenCalledTimes(1);
  expect(addNote).toHaveBeenCalledWith(expect.objectContaining({
    title: 'New Note',
    score: 15,
    comment: 'This is a new note',
  }));
});

test('renders NoteForm and does not submit note with score above 20', () => {
  render(<NoteForm />);

  fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Note' } });
  fireEvent.change(screen.getByLabelText(/score/i), { target: { value: '25' } });
  fireEvent.change(screen.getByLabelText(/comment/i), { target: { value: 'This is a new note' } });
  fireEvent.click(screen.getByText(/save note/i));

  const addNote = useNoteStore.getState().addNote;

  expect(addNote).not.toHaveBeenCalled();
  expect(screen.getByText('Score must be between 0 and 20')).toBeInTheDocument();
});

test('renders NoteForm and does not submit a note with a score less than 0', () => {
  render(<NoteForm />);

  fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Note' } });
  fireEvent.change(screen.getByLabelText(/score/i), { target: { value: '-3' } });
  fireEvent.change(screen.getByLabelText(/comment/i), { target: { value: 'This is a new note' } });
  fireEvent.click(screen.getByText(/save note/i));

  const addNote = useNoteStore.getState().addNote;

  expect(addNote).not.toHaveBeenCalled();
  expect(screen.getByText('Score must be between 0 and 20')).toBeInTheDocument();
});