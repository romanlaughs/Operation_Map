import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

export interface Menu {
  headTitle1?: string;
  level?: number;
  badge?: boolean;
  path?: string;
  des?: boolean;
  color?: string;
  line?: boolean;
  title?: string;
  icon?: string;
  type?: string;
  active?: boolean;
  id?: number;
  bookmark?: boolean;
  children?: Menu[];
  horizontalList?: boolean;
  items?: Menu[];
}

@Injectable({
  providedIn: 'root',
})
export class NavmenuService {
  public language: boolean = false;
  public isShow: boolean = false;
  public closeSidebar: boolean = false;
  public fullScreen: any;

  constructor() {}

  MENUITEMS: Menu[] = [
    {
      id: 1,
      level: 1,
      path: '/dashboard/default',
      des: true,
      title: 'Home',
      type: 'link',
      icon: 'Home',
    },
    {
      id: 2,
      level: 1,
      title: 'Projects',
      icon: 'Info-circle',
      type: 'sub',
      active: false,
      horizontalList: true,
      children: [
        { path: '/project/list', title: 'Project List', type: 'link' },
        { path: '/project/bids', title: 'Project Bids', type: 'link' },
        { path: '/project/create', title: 'Create New', type: 'link' },
        { path: '/project/archive', title: 'Project Archive', type: 'link' },
      ],
    },
    {
      id: 3,
      level: 1,
      title: 'Subcontractors',
      icon: 'Info-circle',
      type: 'sub',
      active: false,
      horizontalList: true,
      children: [
        { path: '/subcontractors/list', title: 'Subcontractors', type: 'link' },
        {
          path: '/subcontractors/create',
          title: 'New Subcontractor',
          type: 'link',
        },
      ],
    },
  ];

  item = new BehaviorSubject<Menu[]>(this.MENUITEMS);
}
