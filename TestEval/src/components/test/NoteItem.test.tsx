import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NoteItem from '../NoteItem';

interface Note {
    id: string;
    title: string;
    score: number;
    comment: string;
    date: string;
}

// test sur le rendu de NoteItem avec la bonne couleur de fond pour les différentes notes
test('renders NoteItem with correct background color for different scores', () => {
    const testCases: { note: Note; expectedClass: string }[] = [
        {
            note: {
                id: '1',
                title: 'Test Note Red',
                score: 5,
                comment: 'This is a test comment for red',
                date: new Date().toISOString(),
            },
            expectedClass: 'bg-red',
        },
        {
            note: {
                id: '2',
                title: 'Test Note Orange',
                score: 9,
                comment: 'This is a test comment for orange',
                date: new Date().toISOString(),
            },
            expectedClass: 'bg-orange',
        },
        {
            note: {
                id: '3',
                title: 'Test Note Yellow',
                score: 12,
                comment: 'This is a test comment for yellow',
                date: new Date().toISOString(),
            },
            expectedClass: 'bg-yellow',
        },
        {
            note: {
                id: '4',
                title: 'Test Note Green',
                score: 15,
                comment: 'This is a test comment for green',
                date: new Date().toISOString(),
            },
            expectedClass: 'bg-green',
        },
    ];

    testCases.forEach(({ note, expectedClass }) => {
        render(<NoteItem note={note} onClick={() => {}} />);
        const noteItem = screen.getByText(note.title).parentElement;
        expect(noteItem).toHaveClass(expectedClass);
    });
});
/*
test('renders NoteItem with correct note details', () => {
    const note = {
        id: '1',
        title: 'Test Note',
        score: 15,
        comment: 'This is a test comment',
        date: new Date().toISOString(),
    };

    render(<NoteItem note={note} onClick={() => {}} />);

    expect(screen.getByText(note.title)).toBeInTheDocument();
    expect(screen.getByText(new Date(note.date).toLocaleDateString())).toBeInTheDocument();
    expect(screen.getByText(`${note.score}/20`)).toBeInTheDocument();
    expect(screen.getByText('This is a test comment...')).toBeInTheDocument();
});*/
