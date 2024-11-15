import { Note, NoteListItem } from '../api/Api.ts';

// TODO Update these classes
export class SuccessfulNoteListItemResult {
  constructor(private readonly noteListItem: NoteListItem) {
    this.noteListItem = noteListItem;
  }

  getNoteListItem() {
    return this.noteListItem;
  }
}

export class SuccessfulNoteResult {
  constructor(private readonly note: Note) {
    this.note = note;
  }

  getNote() {
    return this.note;
  }
}

export class LoadingResult {
}

export class ErrorResult {
  constructor(private readonly errorMessage: string) {
    this.errorMessage = errorMessage;
  }

  getErrorMessage() {
    return this.errorMessage;
  }
}
