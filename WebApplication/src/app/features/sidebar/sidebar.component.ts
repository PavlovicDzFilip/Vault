import { Component, inject, OnInit } from '@angular/core';
import { NotesService } from '../../../generated/openapi/notes/notes.service';
import { NoteListItem } from '../../../generated/openapi/api.schemas';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  readonly #client = inject(NotesService)

  protected notes: NoteListItem[]=[]
  
  ngOnInit(): void {
    this.#client.getAll()
      .subscribe(notes=> {
        console.log(notes)
        this.notes = notes;
      })
  }
}
