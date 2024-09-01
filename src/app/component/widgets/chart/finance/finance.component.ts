import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Finance } from '../../../../shared/data/widgets/chart';
import { NgApexchartsModule } from 'ng-apexcharts';


@Component({
  selector: 'app-finance',
  standalone: true,
  imports: [CommonModule,NgApexchartsModule],
  templateUrl: './finance.component.html',
  styleUrl: './finance.component.scss'
})
export class FinanceComponent {

  public financesData = Finance;

}
