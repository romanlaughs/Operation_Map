import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { monthlyHistoryData } from '../../../../shared/data/widgets/chart';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-monthly-history',
  standalone: true,
  imports: [CommonModule,NgApexchartsModule],
  templateUrl: './monthly-history.component.html',
  styleUrl: './monthly-history.component.scss'
})
export class MonthlyHistoryComponent {

  public MonthlyHistoryData = monthlyHistoryData;

}
