import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, PRIMARY_OUTLET, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { map } from 'rxjs';
import { NavmenuService } from '../../services/navmenu.service';
import { FeathericonComponent } from '../feathericon/feathericon.component';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule,FeathericonComponent],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {

  public breadcrumbs: { parentBreadcrumb?: string | null; childBreadcrumb?: string; } | undefined;
  public title: string = '';
  public des:string = '';

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router , public navmenu:NavmenuService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }))
      .pipe(filter(route => route.outlet === PRIMARY_OUTLET))
      .subscribe(route => {
        let title = route.snapshot.data['title'];
        let des = route.snapshot.data['des'];
        let parent = route.parent?.snapshot.data['breadcrumb'];
        let child = route.snapshot.data['breadcrumb'];
        this.breadcrumbs = {};
        this.title = title;
        this.des = des;
        this.breadcrumbs = {
          "parentBreadcrumb": parent,
          "childBreadcrumb": child
          
        }
      });
  }

}
