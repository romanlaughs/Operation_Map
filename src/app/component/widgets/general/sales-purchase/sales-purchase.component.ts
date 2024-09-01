import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { commonData } from '../../../../shared/data/widgets/general/general';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-sales-purchase',
  standalone: true,
  imports: [CommonModule,NgApexchartsModule],
  templateUrl: './sales-purchase.component.html',
  styleUrl: './sales-purchase.component.scss'
})
export class SalesPurchaseComponent {

  public commonData = commonData;

}
