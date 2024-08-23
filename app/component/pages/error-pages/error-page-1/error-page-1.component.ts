import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-error-page-1',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './error-page-1.component.html',
  styleUrl: './error-page-1.component.scss'
})
export class ErrorPage1Component {

}
