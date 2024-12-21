import { Component, signal } from '@angular/core';
import { Folder } from '@features/tabs/models/Tab';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  folders = signal<Folder[]>([
    {
      id: 0,
      name: 'Folder 1',
      expanded: false,
      subfolders: [],
      files: []
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
      files: []
    }, {
      id: 11,
      name: 'Folder 3',
      expanded: false,
      subfolders: [],
      files: []
    }]);

  toggleFolder(folder: Folder): void {
    if (folder.subfolders.length === 0) { return; }

    folder.expanded = !folder.expanded;
    this.folders.set([...this.folders()]);
  }

  handleKeydown(event: KeyboardEvent, folder: Folder): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.toggleFolder(folder);
    }
  }
}
