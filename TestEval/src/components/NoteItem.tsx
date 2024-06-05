import React from 'react';

interface Note {
  id: string;
  title: string;
  score: number;
  comment: string;
  date: string;
}

interface NoteItemProps {
  note: Note;
  onClick: () => void;
}

const getBackgroundColor = (score: number) => {
  if (score < 8) return 'red';
  if (score < 10) return 'orange';
  if (score < 13) return 'yellow';
  return 'green';
};

const NoteItem: React.FC<NoteItemProps> = ({ note, onClick }) => {
  return (
    <div
      data-testid={`note-item-${note.id}`}
      style={{ backgroundColor: getBackgroundColor(note.score), padding: '10px', marginBottom: '10px', borderRadius: '5px' }}
      onClick={onClick}
    >
      <h3>{note.title}</h3>
      <p>{new Date(note.date).toLocaleDateString()}</p>
      <p>{note.score}/20</p>
      <p>{note.comment.slice(0, 20)}...</p>
    </div>
  );
};

export default NoteItem;
