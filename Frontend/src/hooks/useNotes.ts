import { useEffect, useState } from 'react';
import API from '../api/Api.ts';
import {
  ErrorResult,
  LoadingResult,
  SuccessfulNoteListItemResult,
} from '../utils/RequestResult.ts';

type NotesRequestResult = SuccessfulNoteListItemResult[] | LoadingResult | ErrorResult;

type UseNotes = () => {
  result: NotesRequestResult;
};

export const useNotes: UseNotes = () => {
  const [result, setResult] = useState<NotesRequestResult>(new LoadingResult());

  useEffect(() => {
    const loadNote = async () => {
      setResult(new LoadingResult());
      try {
        const loadedNoteListItems = await API.notes.getAll();
        if (!ignore) {
          const noteListItems = loadedNoteListItems.map(noteListItem => new SuccessfulNoteListItemResult(noteListItem));
          setResult(noteListItems);
        }
      } catch (error) {
        setResult(
          error instanceof Error ? error.message : 'Something went wrong',
        );
      }
    };

    let ignore = false;

    loadNote();

    return () => {
      ignore = true;
    };
  }, []);

  return { result };
};
