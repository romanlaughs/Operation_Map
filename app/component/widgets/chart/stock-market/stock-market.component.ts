import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StockMarket } from '../../../../shared/data/widgets/chart';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-stock-market',
  standalone: true,
  imports: [CommonModule,NgApexchartsModule],
  templateUrl: './stock-market.component.html',
  styleUrl: './stock-market.component.scss'
})
export class StockMarketComponent {

  public stockMarkeData = StockMarket;

}
