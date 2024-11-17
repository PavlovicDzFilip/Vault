import {useEffect, useState} from 'react';
import API, {Note,} from '../api/Api.ts';
import {ErrorResult, LoadingResult, RequestResult, SuccessfulResult} from '../utils/RequestResult.ts';

export const useSingleNote = (id: string) => {
    const [result, setResult] = useState<RequestResult<Note>>(new LoadingResult());

    useEffect(() => {
        let ignore = false;
        const loadNote = async () => {
            setResult(new LoadingResult());
            let newResult: RequestResult<Note>;
            try {
                const data = await API.notes.get(id);
                newResult = new SuccessfulResult(data);
            } catch (error) {
                newResult = ErrorResult.Create(error);
            }

            if (!ignore) {
                setResult(newResult);
            }
        };

        loadNote();
        return () => {
            ignore = true;
        };
    }, []);

    return result;
};
