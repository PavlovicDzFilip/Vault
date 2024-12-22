import { Component, inject, OnInit, signal } from '@angular/core';
import { Folder } from '@features/tabs/models/Tab';
import { NoteListItem } from '@api/api.schemas';
import { NotesService } from '@api/notes/notes.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  folders = signal<Folder[]>([
    {
      id: 0,
      name: 'Folder 1',
      expanded: false,
      subfolders: [],
      files: [],
    },
    {
      id: 1,
      name: 'Folder 2',
      expanded: false,
      subfolders: [
        {
          id: 6,
          name: 'Folder 3',
          expanded: false,
          subfolders: [],
          files: [],
        },
        {
          id: 7,
          name: 'Folder 5',
          expanded: false,
          subfolders: [],
          files: [],
        },
      ],
      files: [],
    }, {
      id: 11,
      name: 'Folder 3',
      expanded: false,
      subfolders: [],
      files: [],
    }]);
  notes = signal<NoteListItem[]>([]);

  #notesService = inject(NotesService);

  toggleFolder(folder: Folder): void {
    if (folder.subfolders.length === 0) {
      return;
    }

    folder.expanded = !folder.expanded;
    this.folders.set([...this.folders()]);
  }

  handleKeydown(event: KeyboardEvent, folder: Folder): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.toggleFolder(folder);
    }
  }

  ngOnInit() {
    this.#notesService.getAll()
      .subscribe(notes => {
        this.notes.set(notes);
      })
  }
}
