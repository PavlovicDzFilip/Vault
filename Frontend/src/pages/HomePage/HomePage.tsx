import { ReactElement, useEffect, useState } from 'react';
import { NoteCardsList } from '../../components/Notes/NoteCardsList/NoteCardsList.tsx';
import { Note } from "../../components/Notes/Note/Note.tsx";
import { useNotes } from "../../hooks/useNotes.ts";
import { ErrorResult, LoadingResult } from "../../utils/RequestResult.ts";
import { Flex } from "@radix-ui/themes";

export const HomePage = (): ReactElement => {
  const [noteId, setNoteId] = useState<string>('');
  const { result } = useNotes();

  useEffect(() => {
    if (!noteId && Array.isArray(result) && result.length > 0) {
      setNoteId(result[0].getNoteListItem().id);
    }
  }, [result]);

  let cardListContent = <>Add a note.</>;

  if (result instanceof ErrorResult) {
    cardListContent = <div>{result.getErrorMessage()}</div>;
  }

  if (result instanceof LoadingResult) {
    cardListContent = <div>loading</div>;
  }

  if (Array.isArray(result)) {
    const noteListItems = result.map(item => item.getNoteListItem())
    cardListContent = <NoteCardsList notes={noteListItems} onClick={setNoteId}/>;
  }

  return <Flex>
    {cardListContent}
    <Note id={noteId}/>
  </Flex>;
};
