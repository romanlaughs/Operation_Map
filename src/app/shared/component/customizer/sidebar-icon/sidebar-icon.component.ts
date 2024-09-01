import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LayoutService } from '../../../services/layout.service';

@Component({
  selector: 'app-sidebar-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-icon.component.html',
  styleUrl: './sidebar-icon.component.scss'
})
export class SidebarIconComponent {

  public icon: string = "iconcolor-sidebar";

  constructor(public layoutService: LayoutService) { }

  svgIcon(val: string) {
    this.icon = val;
    this.layoutService.config.settings.icon = val;
    if (val == "iconcolor-sidebar") {
      document.getElementsByTagName("page-sub-header")[0]?.setAttribute("icon", val);
    } else {
      document.getElementsByTagName("page-sub-header")[0]?.setAttribute("icon", val);
    }
  }

}
