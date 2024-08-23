import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '../../../../shared/data/project/user';

@Component({
  selector: 'app-top-default-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-default-card.component.html',
  styleUrl: './top-default-card.component.scss',
})
export class TopDefaultCardComponent {
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
  };
  public time = new Date();
  public intervalId: any;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
