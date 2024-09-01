import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-common-widgets-chart',
  standalone: true,
  imports: [CommonModule,NgApexchartsModule],
  templateUrl: './common-widgets-chart.component.html',
  styleUrl: './common-widgets-chart.component.scss'
})
export class CommonWidgetsChartComponent {

  @Input() data :any

}
