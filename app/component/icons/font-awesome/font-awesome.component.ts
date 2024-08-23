import { Component } from '@angular/core';
import { allIcon } from '../../../shared/data/icons/thimify';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-font-awesome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './font-awesome.component.html',
  styleUrl: './font-awesome.component.scss'
})
export class FontAwesomeComponent {

  
  public detail: boolean = false;
  public icon: string;
  public val: string;

  public allIconData = allIcon.fontawesome

  toggleWithInfo(icon: string) {
    this.detail = true;
    this.icon = icon;
    this.val = '<i class="fa fa-' + icon + '"></i>';
  }

  copyText(val: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = '<i class="fa fa-' + val + '"></i>';
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

  }

}
