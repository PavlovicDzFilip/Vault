import { ReactElement } from 'react';
import { Button, Card, Heading, Text } from "@radix-ui/themes";

export type NoteProps = {
  title: string;
  modifiedAt?: string;
  onDeleteNote: () => Promise<void>;
};

export const NoteCard = ({ title, modifiedAt, onDeleteNote }: NoteProps): ReactElement => {
  return (
    <>
      <Card>
        <Heading as="h2" size="4" weight="bold">
          {title}
        </Heading>
        {modifiedAt && <Text as="span" color="gray" size="1">Modified At:{modifiedAt}</Text>}
        <Button onClick={onDeleteNote}>X</Button>
      </Card>
    </>
  );
}
