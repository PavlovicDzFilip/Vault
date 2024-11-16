import { ReactElement } from 'react';
import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";

export type NoteProps = {
  title: string;
  modifiedAt?: string;
  onDeleteNote: () => Promise<void>;
};

export const NoteCard = ({ title, modifiedAt, onDeleteNote }: NoteProps): ReactElement => {
  return (
    <Card style={{ height: "100%" }}>
      <Flex gap="3" align="center">
        <Heading as="h2" size="4" weight="bold">
          {title}
        </Heading>
        {modifiedAt && <Text as="span" color="gray" size="1">Modified At:{modifiedAt}</Text>}
        <Button color='red' size='1' radius='full' onClick={onDeleteNote}>
          <Text size='1'>X</Text>
        </Button>
      </Flex>
    </Card>
  );
}
