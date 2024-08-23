import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-error-page-2',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './error-page-2.component.html',
  styleUrl: './error-page-2.component.scss'
})
export class ErrorPage2Component {

}
