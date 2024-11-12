import { ReactElement } from 'react';
import { NoteCard, NoteProps } from '../NoteCard/NoteCard.tsx';

type NotesListProps = {
  notes: NoteProps[];
};

export const NoteCardsList = ({ notes }: NotesListProps): ReactElement => {
  return (
    <>
      {notes.map((note) => (
        <NoteCard key={note.title} title={note.title} content={note.content} />
      ))}
    </>
  );
};
