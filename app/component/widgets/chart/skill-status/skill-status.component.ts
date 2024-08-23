import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SkillStatus } from './../../../../shared/data/widgets/chart';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-skill-status',
  standalone: true,
  imports: [CommonModule,NgApexchartsModule],
  templateUrl: './skill-status.component.html',
  styleUrl: './skill-status.component.scss'
})
export class SkillStatusComponent {

  public skillstauschart = SkillStatus;
  
}
