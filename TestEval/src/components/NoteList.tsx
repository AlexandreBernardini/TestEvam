import React, { useState } from 'react';
import NoteItem from './NoteItem';
import useNoteStore from '../store';


interface Note {
    id: string;
    title: string;
    score: number;
    comment: string;
    date: string;
  }

interface NoteListProps {
  onSelectNote: (note: Note) => void;
  'data-testid'?: string;
}

const NoteList: React.FC<NoteListProps> = ({ onSelectNote, 'data-testid': testId }) => {
  const notes = useNoteStore((state) => state.notes);
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: string } | null>(null);

  const sortedNotes = React.useMemo(() => {
    let sortableNotes = [...notes];
    if (sortConfig !== null) {
      sortableNotes.sort((a, b) => {
        if (a[sortConfig.key as keyof Note] < b[sortConfig.key as keyof Note]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key as keyof Note] > b[sortConfig.key as keyof Note]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableNotes;
  }, [notes, sortConfig]);

  const requestSort = (key: string) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div data-testid={testId}>
      <button onClick={() => requestSort('date')}>Sort by Date</button>
      <button onClick={() => requestSort('score')}>Sort by Score</button>
      {sortedNotes.map((note) => (
        <NoteItem key={note.id} note={note} onClick={() => onSelectNote(note)} />
      ))}
    </div>
  );
};

export default NoteList;
