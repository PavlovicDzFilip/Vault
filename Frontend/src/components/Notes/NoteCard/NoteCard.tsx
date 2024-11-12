import { ReactElement } from 'react';

// TODO Get this type from the Backend
export type NoteProps = {
  title: string;
  content: string;
};

export const NoteCard = ({ title, content }: NoteProps): ReactElement => {
  return (
    <>
      <div>Title: {title}</div>
      <div>Content: {content}</div>
    </>
  );
};
