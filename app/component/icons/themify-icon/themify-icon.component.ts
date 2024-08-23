import { Component } from '@angular/core';
import { allIcon } from '../../../shared/data/icons/thimify';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-themify-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './themify-icon.component.html',
  styleUrl: './themify-icon.component.scss'
})
export class ThemifyIconComponent {

  public detail: boolean = false;
  public icon: string;
  public val: string;
  public allIconData = allIcon.themify

  toggleWithInfo(icon: string) {
    this.detail = true;
    this.icon = icon;
    this.val = '<i class="' + icon + '"></i>';
  }

  copyText(val: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = '<i class="' + val + '"></i>';
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

  }

}
