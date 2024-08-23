import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CryptocurrencyPrices } from '../../../../shared/data/widgets/chart';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-cryptocurrency-prices',
  standalone: true,
  imports: [CommonModule,NgApexchartsModule],
  templateUrl: './cryptocurrency-prices.component.html',
  styleUrl: './cryptocurrency-prices.component.scss'
})
export class CryptocurrencyPricesComponent {

  public CryptocurrencyPricesChart = CryptocurrencyPrices;

}
