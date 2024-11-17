import {ReactElement, useState} from 'react';
import {Card, Flex, Spinner} from "@radix-ui/themes";
import {NoteCardsList} from '../../components/Notes/NoteCardsList/NoteCardsList.tsx';
import {SingleNote} from "../../components/Notes/SingleNote/SingleNote.tsx";
import {useNotes} from "../../hooks/useNotes.ts";
import {ErrorResult, LoadingResult, SuccessfulResult} from "../../utils/RequestResult.ts";

export const HomePage = (): ReactElement => {
    const [noteId, setNoteId] = useState<string>('');
    const getNotesResult = useNotes();

    return (
        <Flex style={{
            backgroundColor: '#f0f0f0',
            width: '100vw',
            height: '100vh',
        }} align='center' justify='center'>
            <Card style={{
                maxWidth: '60%',
                maxHeight: '70%',
            }}>
                <Flex gap='3' width='100%' style={{height: "500px"}} align='center' justify='center'>
                    {getNotesResult instanceof ErrorResult && <div>{getNotesResult.errorMessage}</div>}
                    {getNotesResult instanceof LoadingResult && <Spinner/>}
                    {getNotesResult instanceof SuccessfulResult &&
                        <NoteCardsList notes={getNotesResult.data} onClick={setNoteId}/>}
                    <SingleNote id={noteId}/>
                </Flex>
            </Card>
        </Flex>
    );
};
