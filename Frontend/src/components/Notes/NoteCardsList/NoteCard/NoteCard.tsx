import { ReactElement } from 'react';
import { Card, Heading, Text } from "@radix-ui/themes";

export type NoteProps = {
  title: string;
  modifiedAt?: string;
};

export const NoteCard = ({ title, modifiedAt }: NoteProps): ReactElement => (
  <>
    <Card>
      <Heading as="h2" size="4" weight="bold">
        {title}
      </Heading>
      {modifiedAt && <Text as="span" color="gray" size="1">Modified At:{modifiedAt}</Text>}
    </Card>
  </>
);
