export type NoteListItem = {
    id: string;
    title: string;
}
export type Note = {
    id: string;
    title: string;
    content: string;
    modifiedAt: string;
}

export interface IRequestService {
    get<T>(path: string): Promise<T>;
}

class NullRequestService implements IRequestService {
    // @ts-ignore
    get<T>(path: string): Promise<T> {
        throw new Error("Method not implemented.");
    }
}

let service : IRequestService = new NullRequestService();

export const initializeApi = (requestService: IRequestService) => {
    service = requestService;
}
const API = {
    notes: {
        getAll (): Promise<NoteListItem[]>  {
            return service.get<NoteListItem[]>('/Notes');
        },
        get(id: string): Promise<Note> {
          return service.get<Note>('/Notes/' + id);
        }
    }
};

export class RequestService implements IRequestService {
    constructor(private readonly baseUrl: string) {    }

    async get<T>(path: string): Promise<T> {
        const result = await fetch(this.baseUrl + path, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
        });
        
        return result.json();
    }
}

export default API;
