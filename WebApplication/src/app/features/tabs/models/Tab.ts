export interface Tab {
  id: number;
  name: string;
  icon: string;
  note?: {
    id: number;
    name: string;
    md: string;
    html: string;
    rawText: string;
  }
}

export interface Folder {
  id: number;
  name: string;
  expanded: boolean;
  subfolders: Folder[];
  files: File[];
}


export interface File {
  id: number;
  name: string;
}
