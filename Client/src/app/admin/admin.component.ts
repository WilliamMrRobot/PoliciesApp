import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from './admin.menu';

@Component({
  selector: 'ngx-admin',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class AdminComponent implements OnInit {
  menu = MENU_ITEMS;

  ngOnInit() {
    const el = document.getElementById('nb-global-spinner');
    if (el) {
      el.style['display'] = 'none';
    }
  }
}
