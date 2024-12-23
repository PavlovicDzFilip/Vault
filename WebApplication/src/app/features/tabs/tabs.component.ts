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
  }, {
    id: 1,
    name: 'Note name 2',
  }, {
    id: 2,
    name: 'Note name 3',
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

  createNote() {
    const newTab = {
      id: this.tabs().length,
      name: `Note name ${this.tabs().length + 1}`,
    };

    this.tabs.set([...this.tabs(), newTab]);
    this.activeTabIndex.set(this.tabs().length - 1);
  }
}
