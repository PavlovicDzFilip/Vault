import {ReactElement, useEffect, useState} from 'react';
import {NoteCard} from '../NoteCard/NoteCard.tsx';
import API, {NoteListItem} from "../../../Api.ts";

export const NoteCardsList = (): ReactElement => {
    const [notes, setNotes] = useState<NoteListItem[]>([]);

    useEffect(() => {
        const loadNotes = async () => {
            const loadedNotes = await API.notes.getAll();
            if (!ignore) {
                setNotes(loadedNotes);
            }
        }

        let ignore = false;

        loadNotes();
        return () => {
            ignore = true;
        }
    }, []);

    return (
        <>
            {notes.map((note) => (
                <NoteCard key={note.id} id={note.id}/>
            ))}
        </>
    );
};
