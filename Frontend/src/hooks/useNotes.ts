import {useEffect, useState} from 'react';
import API, {NoteListItem} from '../api/Api.ts';
import {
    ErrorResult,
    LoadingResult,
    RequestResult, SuccessfulResult,
} from '../utils/RequestResult.ts';

export const useNotes = (): RequestResult<NoteListItem[]> => {
    const [result, setResult] = useState<RequestResult<NoteListItem[]>>(new LoadingResult());

    useEffect(() => {
        let ignore = false;
        const loadNotes = async () => {
            setResult(new LoadingResult());
            let newResult :RequestResult<NoteListItem[]>;
            try {
                const data = await API.notes.getAll();
                newResult = new SuccessfulResult(data);
            } catch (error) {
                newResult = ErrorResult.Create(error);
            }
            
            if(!ignore){
                setResult(newResult);
            }
        };

        loadNotes();
        return () => {
            ignore = true;
        };
    }, []);

    return result;
};
