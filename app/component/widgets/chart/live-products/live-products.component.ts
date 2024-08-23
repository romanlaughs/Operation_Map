import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LiveProducts } from '../../../../shared/data/widgets/chart';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-live-products',
  standalone: true,
  imports: [CommonModule,NgApexchartsModule],
  templateUrl: './live-products.component.html',
  styleUrl: './live-products.component.scss'
})
export class LiveProductsComponent {

  public LiveProductChart = LiveProducts;

}
