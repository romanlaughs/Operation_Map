import { CommonModule } from '@angular/common';
import { Component, TemplateRef } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customizer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customizer.component.html',
  styleUrl: './customizer.component.scss',
})
export class CustomizerComponent {
  constructor(
    private modalService: NgbModal,
    public layoutService: LayoutService
  ) {}

  openModal(popup: TemplateRef<NgbModal>) {
    this.modalService.open(popup, {
      backdropClass: 'dark-modal',
      centered: true,
    });
  }

  Customizer(val: string) {
    this.layoutService.customizer = val;
  }
}
