import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Tab } from './models/Tab';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-tabs',
  imports: [NgClass],
  templateUrl: './tabs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  tabs = signal<Tab[]>([{
    id: 0,
    name: 'Note name 1',
    icon: 'set/path/to/icon',
  }, {
    id: 1,
    name: 'Note name 2',
    icon: 'set/path/to/icon',
  }, {
    id: 2,
    name: 'Note name 3',
    icon: 'path/to/icon',
  }]);

  activeTabIndex = signal<number>(0);

  setActiveTab(index: number) {
    this.activeTabIndex.set(index);
  }

  removeTab(tab: number) {
    console.log(tab);
    // Remove the tab
    this.tabs.set(this.tabs().filter(t => t.id !== tab));
  }
}
