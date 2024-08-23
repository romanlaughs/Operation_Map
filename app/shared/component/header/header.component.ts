import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Menu, NavmenuService } from '../../services/navmenu.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { CartComponent } from './cart/cart.component';
import { LanguageComponent } from './language/language.component';
import { NotificationComponent } from './notification/notification.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { ThemeComponent } from './theme/theme.component';
import { FeathericonComponent } from '../feathericon/feathericon.component';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule,BookmarkComponent,CartComponent,LanguageComponent
  ,NotificationComponent,ProfileComponent,SearchComponent,ThemeComponent,FeathericonComponent,SvgIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  public elem: any
  public menuItems: Menu[] = [];
  public item: Menu[] = [];
  public open = false;
  public searchResult: boolean = false;
  public searchResultEmpty: boolean = false;
  public text: string = '';
  public show = false;

  constructor(public navmenu: NavmenuService, @Inject(DOCUMENT) private document: any) {
    this.navmenu.item.subscribe((menuItems: Menu[]) =>
      this.item = menuItems
    );
  }

  ngOnInit(): void {
    this.elem = document.documentElement;
  }

  toggleFullScreen() {
    this.navmenu.fullScreen = !this.navmenu.fullScreen;
    if (this.navmenu.fullScreen) {
      if (this.elem.requestFullscreen) {
        this.elem.requestFullscreen();
      } else if (this.elem.mozRequestFullScreen) {
        /* Firefox */
        this.elem.mozRequestFullScreen();
      } else if (this.elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.elem.webkitRequestFullscreen();
      } else if (this.elem.msRequestFullscreen) {
        /* IE/Edge */
        this.elem.msRequestFullscreen();
      }
    } else {
      if (!this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }

  openMenu() {
    this.navmenu.closeSidebar = !this.navmenu.closeSidebar;
  }

  languageToggle() {
    this.navmenu.language = !this.navmenu.language;
  }

  openSearch() {
    this.show = true;
  }

  closeSearch() {
    this.show = false;
  }

  searchTerm(term: any) {
    term ? this.addFix() : this.removeFix();
    if (!term) return this.menuItems = [];
    let items: Menu[] = [];
    term = term.toLowerCase();
    this.item.forEach((data) => {
      if (data.title?.toLowerCase().includes(term) && data.type === 'link') {
        items.push(data);
      }
      data.children?.filter(subItems => {
        if (subItems.title?.toLowerCase().includes(term) && subItems.type === 'link') {
          subItems.icon = data.icon
          items.push(subItems);
        }
        subItems.children?.filter(suSubItems => {
          if (suSubItems.title?.toLowerCase().includes(term)) {
            suSubItems.icon = data.icon
            items.push(suSubItems);
          }
        })
        return
      })
      this.checkSearchResultEmpty(items)
      this.menuItems = items
    })
    return
  }

  checkSearchResultEmpty(items: Menu[]) {
    if (!items.length)
      this.searchResultEmpty = true;
    else
      this.searchResultEmpty = false;
  }

  addFix() {
    this.searchResult = true;
  }

  removeFix() {
    document.body.classList.remove('offcanvas')
    this.searchResult = false;
    this.text = "";
  }

  clickOutside(): void {
    this.show = false;
    this.open = false;
    this.searchResult = false;
    this.searchResultEmpty = false;
    this.navmenu.language = false;
    document.body.classList.remove('offcanvas')
  }

}
