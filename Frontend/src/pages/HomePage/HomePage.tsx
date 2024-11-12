import { ReactElement } from 'react';
import { NoteProps } from '../../components/Notes/NoteCard/NoteCard.tsx';
import { NoteCardsList } from '../../components/Notes/NoteCardsList/NoteCardsList.tsx';

// TODO export fetching the data to a Custom Hook
const DUMMY_NOTES: NoteProps[] = [
  {
    title: 'Note 1',
    content: 'This is note 1',
  },
  {
    title: 'Note 2',
    content: 'This is note 2',
  },
  {
    title: 'Note 3',
    content: 'This is note 3',
  },
];

export const HomePage = (): ReactElement => {
  return <NoteCardsList notes={DUMMY_NOTES} />;
};
