import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import * as commonchat from '../../../../shared/data/widgets/general/general-chart';
import { commonDetails } from '../../../../shared/data/widgets/general/general';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-customers-details',
  standalone: true,
  imports: [CommonModule,NgApexchartsModule],
  templateUrl: './customers-details.component.html',
  styleUrl: './customers-details.component.scss'
})
export class CustomersDetailsComponent {

  public commonitem = commonDetails;
  public profitcharts = commonchat.DataChart;
  public oderchats = commonchat.OrderDatachart;



}
