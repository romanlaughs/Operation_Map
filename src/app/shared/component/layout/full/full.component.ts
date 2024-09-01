import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-full',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './full.component.html',
  styleUrl: './full.component.scss'
})
export class FullComponent {

}
