import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from './dashboard.menu';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class DashboardComponent implements OnInit {
  menu = MENU_ITEMS;

  ngOnInit() {
    const el = document.getElementById('nb-global-spinner');
    if (el) {
      el.style['display'] = 'none';
    }
  }
}
