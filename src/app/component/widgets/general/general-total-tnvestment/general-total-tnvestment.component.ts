import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InvestmentChart } from '../../../../shared/data/widgets/general/general-chart';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-general-total-tnvestment',
  standalone: true,
  imports: [CommonModule,NgApexchartsModule,ClickOutsideDirective],
  templateUrl: './general-total-tnvestment.component.html',
  styleUrl: './general-total-tnvestment.component.scss'
})
export class GeneralTotalTnvestmentComponent {

  public InvestmentChart = InvestmentChart;

  public show: boolean = false;

  open() {
    this.show = !this.show
  }

  clickOutside(): void {
    this.show = false
  }

}
