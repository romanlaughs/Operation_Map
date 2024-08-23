import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { stockValue } from '../../../../shared/data/widgets/general/general-chart';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-stock-value-chart',
  standalone: true,
  imports: [CommonModule,NgApexchartsModule],
  templateUrl: './stock-value-chart.component.html',
  styleUrl: './stock-value-chart.component.scss'
})
export class StockValueChartComponent {

  public stockChart = stockValue;

}
