import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { uses } from '../../../../shared/data/widgets/chart';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-uses',
  standalone: true,
  imports: [CommonModule,NgApexchartsModule],
  templateUrl: './uses.component.html',
  styleUrl: './uses.component.scss'
})
export class UsesComponent {

  public userData = uses;

}
