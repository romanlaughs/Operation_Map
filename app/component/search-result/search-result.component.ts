import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AllComponent } from './all/all.component';
import { ImagesComponent } from './images/images.component';
import { VideosComponent } from './videos/videos.component';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [CommonModule,AllComponent,ImagesComponent,VideosComponent],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss'
})
export class SearchResultComponent {

  public openTab: string = "All";

  public tabbed(val: string) {
    this.openTab = val
  }


}
