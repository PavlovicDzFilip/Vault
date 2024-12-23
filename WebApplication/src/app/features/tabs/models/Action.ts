export interface Action {
  id: number;
  label: string;
  icon: string;
  action: ActionType;
}

export enum ActionType {
  SAVE = 'SAVE',
  UNDO = 'UNDO',
  REDO = 'REDO',
  TOGGLE_THEME = 'TOGGLE_THEME',
  AI = 'AI',
}
