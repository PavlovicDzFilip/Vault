import { useEffect, useState } from 'react';
import API from '../api/Api.ts';
import {
  SuccessfulNoteResult,
  LoadingResult,
  ErrorResult,
} from '../utils/RequestResult.ts';

type SingleNoteRequestResult = SuccessfulNoteResult | LoadingResult | ErrorResult;

type UseSingleNote = (params: { id: string }) => {
  result: SingleNoteRequestResult;
};

export const useSingleNote: UseSingleNote = ({ id }) => {
  const [result, setResult] = useState<SingleNoteRequestResult>(new LoadingResult());

  useEffect(() => {
    const loadNote = async () => {
      setResult(new LoadingResult());
      try {
        const loadedNote = await API.notes.get(id);
        if (!ignore) {
          setResult(new SuccessfulNoteResult(loadedNote));
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
  }, [id]);

  return { result };
};
