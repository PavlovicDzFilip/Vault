import {ReactElement} from 'react';
import {Callout, Card, Flex} from "@radix-ui/themes";
import API, {NoteListItem} from '../../../api/Api.ts';
import {NoteCard} from './NoteCard/NoteCard.tsx';
import {InfoCircledIcon} from "@radix-ui/react-icons";

type NoteCardsListProps = {
    notes: NoteListItem[],
    onClick: (id: string) => void,
}

export const NoteCardsList = ({notes, onClick}: NoteCardsListProps): ReactElement => {
    const handleDeleteNote = async (id: string) => {
        await API.notes.delete(id);
    }

    return (
        <Card style={{height: "100%"}}>
            <Flex direction="column" gap="6" height="100%">
                {!notes.length &&
                    <Card style={{height: "100%"}}>
                        <Callout.Root>
                            <Flex gap='4' align='center'>
                                <Callout.Icon>
                                    <InfoCircledIcon/>
                                </Callout.Icon>
                                <Callout.Text>
                                    Nothing to show.<br/>Add your first note!
                                </Callout.Text>
                            </Flex>
                        </Callout.Root>
                    </Card>
                }

                {notes.map((note) => (
                    <div key={note.id} onClick={() => onClick(note.id)}>
                        <NoteCard title={note.title} onDeleteNote={() => handleDeleteNote(note.id)}/>
                    </div>
                ))}
            </Flex>
        </Card>
    );
}
