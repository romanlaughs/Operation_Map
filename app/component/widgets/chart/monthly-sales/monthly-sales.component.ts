import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MonthlySales } from '../../../../shared/data/widgets/chart';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-monthly-sales',
  standalone: true,
  imports: [CommonModule,NgApexchartsModule],
  templateUrl: './monthly-sales.component.html',
  styleUrl: './monthly-sales.component.scss'
})
export class MonthlySalesComponent {

  public MonthlySalesChart = MonthlySales;

}
