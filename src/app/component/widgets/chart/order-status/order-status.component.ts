import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import * as  Progresschart from '../../../../shared/data/widgets/chart';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-order-status',
  standalone: true,
  imports: [CommonModule,NgApexchartsModule],
  templateUrl: './order-status.component.html',
  styleUrl: './order-status.component.scss'
})
export class OrderStatusComponent {

  public orderstatus1 = Progresschart.Progress1;
  public orderstatus2 = Progresschart.Progress2;
  public orderstatus3 = Progresschart.Progress3;
  public orderstatus4 = Progresschart.Progress4;
  public orderstatus5 = Progresschart.Progress5;

}
