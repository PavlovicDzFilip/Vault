import { ReactElement } from 'react';
import { Card, Text, Heading } from "@radix-ui/themes";
import { useSingleNote } from '../../../hooks/useSingleNote.ts';
import {
  LoadingResult,
  ErrorResult,
} from '../../../utils/RequestResult.ts';

export type NoteProps = {
  id: string;
};

export const Note = ({ id }: NoteProps): ReactElement => {
  const { result } = useSingleNote({ id });

  if (result instanceof ErrorResult) {
    return <div>{result.getErrorMessage()}</div>;
  }

  if (result instanceof LoadingResult) {
    return <div>loading</div>;
  }

  const { title, content, modifiedAt } = result.getNote();

  return (
    <Card>
      <Heading as="h1" size="6" weight="bold">
        {title}
      </Heading>
      <Text as="span" color="gray" size="1">Modified At:{modifiedAt}</Text>
      <Text as="div" color="gray" size="5">
        {content}
      </Text>
    </Card>
  );

};
