import { Component, signal } from '@angular/core';
import { ActionType } from '@features/tabs/models/Action';

@Component({
  selector: 'app-toolbar',
  imports: [],
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent {
  toolbarItems = signal([
    {
      id: 0,
      label: 'Save',
      icon: 'redo-icon',
      action: ActionType.SAVE,
    },
    {
      id: 1,
      label: 'Undo',
      icon: 'save-icon',
      action: ActionType.UNDO,
    },
    {
      id: 2,
      label: 'Redo',
      icon: 'theme-icon',
      action: ActionType.REDO,
    },
    {
      id: 3,
      label: 'Toggle Theme',
      icon: 'undo-icon',
      action: ActionType.TOGGLE_THEME
    }
  ]);

  executeAction(action: ActionType): void {
    switch (action) {
      case 'SAVE':
        this.#saveState();
        break;
      case 'UNDO':
        this.#undo();
        break;
      case 'REDO':
        this.#redo();
        break;
      case 'TOGGLE_THEME':
        this.#toggleTheme();
        break;
    }
  }

  #saveState() {
    console.log('Save current state clicked');
  }

  #undo() {
    console.log('Undo action clicked');
  }

  #redo() {
    console.log('Redo action clicked');
  }

  #toggleTheme() {
    console.log('Theme toggled');
  }
}
