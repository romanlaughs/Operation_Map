import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TopDefaultCardComponent } from './top-default-card/top-default-card.component';
import { DashboardBiddingComponent } from './bids/bids.component';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [CommonModule, TopDefaultCardComponent, DashboardBiddingComponent],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss',
})
export class DefaultComponent {}
