import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CryptoAnnotations } from '../../../../shared/data/widgets/chart';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-crypt-annotations',
  standalone: true,
  imports: [CommonModule,NgApexchartsModule],
  templateUrl: './crypt-annotations.component.html',
  styleUrl: './crypt-annotations.component.scss'
})
export class CryptAnnotationsComponent {

  public CryptoannotationsChart = CryptoAnnotations;

}
