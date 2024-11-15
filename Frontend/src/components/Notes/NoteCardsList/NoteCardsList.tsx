import { ReactElement } from 'react';
import { Card, Flex } from "@radix-ui/themes";
import { NoteListItem } from '../../../api/Api.ts';
import { NoteCard } from './NoteCard/NoteCard.tsx';

type NoteCardsListProps = {
  notes: NoteListItem[],
  onClick: (id: string) => void,
}

export const NoteCardsList = ({ notes, onClick }: NoteCardsListProps): ReactElement => (
  <Card>
    <Flex direction="column" gap="6">
      {notes.map((note) => (
        <div onClick={() => onClick(note.id)}>
          <NoteCard key={note.id} title={note.title}/>
        </div>
      ))}
    </Flex>
  </Card>
);
