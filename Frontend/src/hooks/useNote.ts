import { useEffect, useState } from 'react';
import API, { Note } from '../api/Api.ts';

type Status = 'idle' | 'loading' | 'success' | 'error';
type UserNote = (params: { id: string }) => {
  note: Note | null;
  status: Status;
  // TODO Update the error type
  error: string | null;
}

export const useNote: UserNote = ({ id }) => {
  const [note, setNote] = useState<Note | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNote = async () => {
      setStatus('loading');
      try {
        const loadedNote = await API.notes.get(id);
        if (!ignore) {
          setNote(loadedNote);
          setStatus('success');
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Something went wrong');
        setStatus('error');
      }
    };

    // ? What is the purpose of this variable?
    let ignore = false;

    loadNote();

    return () => {
      ignore = true;
    };
  }, [id]);

  return { note, status, error };
};
