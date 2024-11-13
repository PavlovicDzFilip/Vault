import {ReactElement, useEffect, useState} from 'react';
import API, {Note} from "../../../Api.ts";

export type NoteProps = {
    id: string;
};

export const NoteCard = ({id}: NoteProps): ReactElement => {

    const [note, setNote] = useState<Note | null>(null);

    useEffect(() => {
        const loadNote = async () => {
            const loadedNote = await API.notes.get(id);
            if (!ignore) {
                setNote(loadedNote);
            }
        }

        let ignore = false;

        loadNote();
        return () => {
            ignore = true;
        }
    }, [id]);
    
    if(note === null) {
        return (<div>loading</div>);
    }

    return (
        <>
            <div>Title: {note.title}</div>
            <div>Content: {note.content}</div>
            <div>Modified At: {note.modifiedAt}</div>
        </>
    );
};
