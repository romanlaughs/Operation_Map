import { Component } from '@angular/core';
import { allIcon } from '../../../shared/data/icons/thimify';
import { CommonModule } from '@angular/common';
import { FeathericonComponent } from '../../../shared/component/feathericon/feathericon.component';

@Component({
  selector: 'app-feathers-icon',
  standalone: true,
  imports: [CommonModule,FeathericonComponent],
  templateUrl: './feather-icon.component.html',
  styleUrl: './feather-icon.component.scss'
})

export class FeathersIconComponent {

  public detail: boolean = false;
  public flag: string;
  public val: string;
  public icon: string;
  public allIconData = allIcon.feather

  toggleWithInfo(icon: string) {
    this.detail = true;
    this.icon = icon;
    this.val = '<app-feather-icon [icon]="' + icon + '"></app-feather-icon>';
  }
  
  copyText(val: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = '<app-feather-icon [icon]="' + val + '"></app-feather-icon>>';
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
