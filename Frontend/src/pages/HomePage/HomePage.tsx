import { ReactElement, useEffect, useState } from 'react';
import { Flex, Card, Callout, Container, Spinner } from "@radix-ui/themes";
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { NoteCardsList } from '../../components/Notes/NoteCardsList/NoteCardsList.tsx';
import { SingleNote } from "../../components/Notes/SingleNote/SingleNote.tsx";
import { useNotes } from "../../hooks/useNotes.ts";
import { ErrorResult, LoadingResult } from "../../utils/RequestResult.ts";

export const HomePage = (): ReactElement => {
  const [noteId, setNoteId] = useState<string>('');
  const { result } = useNotes();

  useEffect(() => {
    // Set default `noteId`
    // TODO Update this logic
    if (!noteId && Array.isArray(result) && result.length > 0) {
      setNoteId(result[0].getNoteListItem().id);
    }
  }, [noteId, result]);

  // TODO Extract this logic into a separate component
  // let cardListContent = <Card></Card>;
  let cardListContent =
    <Card>
      <Callout.Root>
        <Flex gap='4' align='center'>
          <Callout.Icon>
            <InfoCircledIcon/>
          </Callout.Icon>
          <Callout.Text>
            Nothing to show.<br/>Add your first note to get started!
          </Callout.Text>
        </Flex>
      </Callout.Root>
    </Card>
  ;

  if (result instanceof ErrorResult) {
    cardListContent = <div>{result.getErrorMessage()}</div>;
  }

  if (result instanceof LoadingResult) {
    cardListContent = <Spinner />;
  } 

  if (Array.isArray(result) && result.length > 0) {
    const noteListItems = result.map(item => item.getNoteListItem())
    cardListContent = <NoteCardsList notes={noteListItems} onClick={setNoteId}/>;
  }

  // TODO Update the ways of applying styles
  return (
    <Flex style={{
      backgroundColor: '#f0f0f0',
      width: '100vw',
      height: '100vh',
    }} align='center' justify='center'>
      <Card style={{
        width: '60%',
      }}>
        <Flex gap='5' width='100%' align='center' justify='center'>
          <Flex flexGrow='0'>
            <Container width='100%'>
              {cardListContent}
            </Container>
          </Flex>
          <Flex flexGrow='1'>
            <Container width='100%'>
              <SingleNote id={noteId}/>
            </Container>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};
