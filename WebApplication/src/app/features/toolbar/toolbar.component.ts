import { Component, signal } from '@angular/core';
import { ActionType } from '@features/tabs/models/Action';

@Component({
  selector: 'app-toolbar',
  imports: [],
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent {
  protected toolbarItems = signal([
    {
      id: 0,
      label: 'Save',
      icon: 'save-icon',
      action: ActionType.SAVE,
    },
    {
      id: 1,
      label: 'Undo',
      icon: 'undo-icon',
      action: ActionType.UNDO,
    },
    {
      id: 2,
      label: 'Redo',
      icon: 'redo-icon',
      action: ActionType.REDO,
    },
    {
      id: 3,
      label: 'Toggle Theme',
      icon: 'theme-icon',
      action: ActionType.TOGGLE_THEME
    },
    {
      id: 4,
      label: 'AI Help',
      icon: 'ai-icon',
      action: ActionType.AI
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
      case 'AI':
        this.#sendPrompt();
        break;

      default:
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

  #sendPrompt() {
    console.log('AI prompt sent');
  }
}
