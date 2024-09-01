import { Component } from '@angular/core';
import { allIcon } from '../../../shared/data/icons/thimify';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ico-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ico-icon.component.html',
  styleUrl: './ico-icon.component.scss'
})
export class IcoIconComponent {

  public detail: boolean = false;
  public icon: string;
  public val: string;
  public allIconData = allIcon.ico

  toggleWithInfo(icon: string) {
    this.detail = true;
    this.icon = icon;
    this.val = '<i class="icofont icofont-' + icon + '"></i>';
  }

  copyText(val: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = '<i class="icofont icofont-' + val + '"></i>';
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
