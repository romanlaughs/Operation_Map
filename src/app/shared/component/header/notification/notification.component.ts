import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClickOutsideDirective } from '../../../directives/outside.directive';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule,RouterModule,ClickOutsideDirective],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {

  public notifications: boolean = false;

  notification() {
    this.notifications = !this.notifications
  }

  clickOutside():void { 
    this.notifications = false;
  }

}
