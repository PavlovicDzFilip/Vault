import {ReactElement, useEffect, useState} from 'react';
import {Box, Button, Card, Flex, Heading, Spinner, Text, TextArea} from "@radix-ui/themes";
import API, {Note} from "../../../api/Api.ts";
import {ErrorResult, LoadingResult, SuccessfulResult} from "../../../utils/RequestResult.ts";
import {useSingleNote} from "../../../hooks/useSingleNote.ts";

export type NoteProps = {
  id: string;
};

export const SingleNote = ({ id }: NoteProps): ReactElement => {
  const result  = useSingleNote(id);
  const [currentNote, setCurrentNote] = useState<Note>({
    id: '',
    title: '',
    content: '',
    modifiedAt: ''
  });

  useEffect(() => {
    if (result instanceof SuccessfulResult) {
      setCurrentNote(result.data);
    }
  }, [result]);

  const handleNoteContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentNote({
      ...currentNote,
      content: event.target.value
    });
  };

  const handleNoteTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentNote({
      ...currentNote,
      title: event.target.value
    });
  };

  const handleAddNote = async () => {
    try {
      const newNote = await API.notes.post(currentNote);
      console.log('newNote', newNote);
      setCurrentNote({
        ...currentNote,
        title: '',
        content: '',
        modifiedAt: ''
      });
    } catch (error) {
      console.error('Error creating note', error);
    }
  }

  const handleCancelNote = () => {
    setCurrentNote({
      id: '',
      title: '',
      content: '',
      modifiedAt: ''
    })
  }

  // TODO Create separate components for these conditions
  let noteContent =
    <Box minWidth="300px" height="100%">
      <Heading as="h1" size="6" weight="bold">
        {/* TODO Update this message */}
        {currentNote.title ? currentNote.title : "Add a note..."}
      </Heading>
      <Box style={{ minHeight: '22px' }}>
        {/* TODO Format the Date properly */}
        <Text as="span" color="gray" size="1">{currentNote.modifiedAt}</Text>
      </Box>
      <Text as="div" color="gray" size="5">
        {currentNote.content}
      </Text>
    </Box>;

  if (result instanceof ErrorResult) {
    noteContent = <div>{result.errorMessage}</div>;
  }

  if (result instanceof LoadingResult) {
    noteContent = <Spinner/>;
  }

  return (
    <Card style={{ height: "100%" }}>
      <Flex gap="4">
        <Flex direction="column" gap="3">
          <Box maxWidth="420px">
            <TextArea placeholder="Add a title…" value={currentNote.title} onChange={handleNoteTitleChange}/>
          </Box>
          <Box maxWidth="420px">
            <TextArea style={{ "minHeight": "300px" }} resize='vertical' placeholder="Add a note…"
                      value={currentNote.content}
                      onChange={handleNoteContentChange}/>
          </Box>
        </Flex>
        <Flex direction="column" gap="3">
          <Card>
            {noteContent}
          </Card>
        </Flex>
      </Flex>
      <Box>
        <Flex gap="3" style={{ position: "absolute", bottom: "12px", right: "12px" }}>
          <Button color='gray' onClick={handleAddNote}>Add Note</Button>
          <Button color='gray' onClick={handleCancelNote}>Cancel</Button>
        </Flex>
      </Box>
    </Card>
  );
};
