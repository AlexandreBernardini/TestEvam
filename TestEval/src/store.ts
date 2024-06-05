import create from 'zustand';

interface Note {
  id: string;
  title: string;
  score: number;
  comment: string;
  date: string;
}

interface NoteStore {
  notes: Note[];
  selectedNote: Note | null;
  addNote: (note: Note) => void;
  updateNote: (note: Note) => void;
  deleteNote: (id: string) => void;
  selectNote: (note: Note) => void;
}

const useNoteStore = create<NoteStore>((set) => ({
  notes: [],
  selectedNote: null,
  addNote: (note) =>
    set((state) => ({
      notes: [...state.notes, note],
    })),
  updateNote: (note) =>
    set((state) => ({
      notes: state.notes.map((n) => (n.id === note.id ? note : n)),
    })),
  deleteNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
      selectedNote: null,
    })),
  selectNote: (note) =>
    set(() => ({
      selectedNote: note,
    })),
}));

export default useNoteStore;
