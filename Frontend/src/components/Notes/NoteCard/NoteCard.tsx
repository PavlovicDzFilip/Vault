import { ReactElement } from 'react';
import { useNote } from '../../../hooks/useNote.ts';

export type NoteProps = {
  id: string;
};

export const NoteCard = ({ id }: NoteProps): ReactElement => {
  const { note, status, error } = useNote({ id });

  if (status === 'error' && error !== null) {
    return (<div>{error}</div>);
  }

  if (status === 'loading' || note === null) {
    return (<div>loading</div>);
  }

  const { title, content, modifiedAt } = note;

  return (
    <>
      <div>Title: {title}</div>
      <div>Content: {content}</div>
      <div>Modified At: {modifiedAt}</div>
    </>
  );
};
