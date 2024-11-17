export type NoteListItem = {
  id: string;
  title: string;
};
export type Note = {
  id: string;
  title: string;
  content: string;
  modifiedAt: string;
};

export interface IRequestService {
  get<T>(path: string): Promise<T>;

  post<T>(path: string, body: T): Promise<T>;

  delete(path: string): Promise<void>;
}

class NullRequestService implements IRequestService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  get<T>(path: string): Promise<T> {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  post<T>(path: string, body: T): Promise<T> {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  delete(path: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

let service: IRequestService = new NullRequestService();

export const initializeApi = (requestService: IRequestService) => {
  service = requestService;
};
const API = {
  notes: {
    getAll(): Promise<NoteListItem[]> {
      return service.get<NoteListItem[]>('/api/Notes');
    },
    get(id: string): Promise<Note> {
      return service.get<Note>('/api/Notes/' + id);
    },
    post(note: Note): Promise<Note> {
      return service.post<Note>('/api/Notes', note);
    },
    delete: (id: string): Promise<void> => {
      return service.delete('/api/Notes/' + id);
    },
  },
};

export class RequestService implements IRequestService {
  constructor(private readonly baseUrl: string) {
  }

  async get<T>(path: string): Promise<T> {
    const result = await fetch(this.baseUrl + path, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
    });

    return result.json();
  }

  async post<T>(path: string, body: T): Promise<T> {
    const result = await fetch(this.baseUrl + path, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    return result.json();
  }

  async delete(path: string): Promise<void> {
    await fetch(this.baseUrl + path, {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
    });
  }
}

export default API;
