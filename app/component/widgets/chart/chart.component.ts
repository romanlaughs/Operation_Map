import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import *as chartData from '../../../shared/data/widgets/chart';
import { CommonWidgetsChartComponent } from './common-widgets-chart/common-widgets-chart.component';
import { CryptAnnotationsComponent } from './crypt-annotations/crypt-annotations.component';
import { CryptocurrencyPricesComponent } from './cryptocurrency-prices/cryptocurrency-prices.component';
import { FinanceComponent } from './finance/finance.component';
import { LiveProductsComponent } from './live-products/live-products.component';
import { MonthlyHistoryComponent } from './monthly-history/monthly-history.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { OrderStatus2Component } from './order-status2/order-status2.component';
import { SkillStatusComponent } from './skill-status/skill-status.component';
import { StockMarketComponent } from './stock-market/stock-market.component';
import { TrunOverComponent } from './trun-over/trun-over.component';
import { UsesComponent } from './uses/uses.component';
import { MonthlySalesComponent } from './monthly-sales/monthly-sales.component';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, CommonWidgetsChartComponent, CryptAnnotationsComponent, CryptocurrencyPricesComponent
    , FinanceComponent, LiveProductsComponent, MonthlyHistoryComponent, OrderStatusComponent, OrderStatus2Component,
    MonthlySalesComponent, SkillStatusComponent, StockMarketComponent, TrunOverComponent, UsesComponent],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {

  public chart1 = chartData.widgetChart
  public chart2 = chartData.widgetChart2
  public chart3 = chartData.widgetChart3

}
