import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-error-page-3',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './error-page-3.component.html',
  styleUrl: './error-page-3.component.scss'
})
export class ErrorPage3Component {

}
