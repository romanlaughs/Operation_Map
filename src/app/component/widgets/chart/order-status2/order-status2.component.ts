import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { orderstatus } from '../../../../shared/data/widgets/chart';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-order-status2',
  standalone: true,
  imports: [CommonModule,NgApexchartsModule],
  templateUrl: './order-status2.component.html',
  styleUrl: './order-status2.component.scss'
})
export class OrderStatus2Component {

  public orderStatusData = orderstatus;

}
