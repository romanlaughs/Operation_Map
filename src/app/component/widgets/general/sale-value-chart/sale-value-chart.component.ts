import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { saleValue } from '../../../../shared/data/widgets/general/general-chart';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-sale-value-chart',
  standalone: true,
  imports: [CommonModule,NgApexchartsModule],
  templateUrl: './sale-value-chart.component.html',
  styleUrl: './sale-value-chart.component.scss'
})
export class SaleValueChartComponent {

  public salevalueChart = saleValue;

}
