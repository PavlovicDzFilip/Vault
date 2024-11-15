import { ReactElement } from 'react';
import { Card, Flex } from "@radix-ui/themes";
import API, { NoteListItem } from '../../../api/Api.ts';
import { NoteCard } from './NoteCard/NoteCard.tsx';

type NoteCardsListProps = {
  notes: NoteListItem[],
  onClick: (id: string) => void,
}

export const NoteCardsList = ({ notes, onClick }: NoteCardsListProps): ReactElement => {
  const handleDeleteNote = async (id: string) => {
    await API.notes.delete(id);
  }

  return (
    <Card>
      <Flex direction="column" gap="6">
        {notes.map((note) => (
          <div key={note.id}  onClick={() => onClick(note.id)}>
            <NoteCard title={note.title} onDeleteNote={() => handleDeleteNote(note.id)}/>
          </div>
        ))}
      </Flex>
    </Card>
  );
}
