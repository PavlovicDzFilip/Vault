import { Component } from '@angular/core';

import { EditorComponent } from '@features/editor/editor.component';
import { TabsComponent } from '@features/tabs/tabs.component';
import { SidebarComponent } from '@features/sidebar/sidebar.component';
import { ToolbarComponent } from '@features/toolbar/toolbar.component';

@Component({
  selector: 'app-layout',
  imports: [EditorComponent, TabsComponent, SidebarComponent, ToolbarComponent],
  templateUrl: './layout.component.html'
})
export class LayoutComponent {

}
