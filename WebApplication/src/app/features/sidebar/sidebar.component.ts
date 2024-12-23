import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Folder, File } from '@features/tabs/models/Tab';
import { DraggableDirective } from './directives/draggable.directive';
import { Router } from '@angular/router';
import { NoteListItem } from '@api/api.schemas';

@Component({
  selector: 'app-sidebar',
  imports: [NgTemplateOutlet, DraggableDirective],
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  readonly #router = inject(Router);

  protected sidebarWidth = signal<number>(180);
  protected folders = signal<Folder[]>([]);
  protected notes = signal<NoteListItem[]>([]);

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

  openFile(file: File): void {
    console.log('call action from service to open this file ->', file);
    this.#router.navigate([file.id.toString()]);
  }

  onDragging(event: MouseEvent): void {
    if (event.clientX < 150 || event.clientX > 300) {
      return;
    }

    this.sidebarWidth.set(event.clientX);
  }
}
