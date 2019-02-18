import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from './client.menu';

@Component({
  selector: 'ngx-client',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class ClientComponent implements OnInit {
  menu = MENU_ITEMS;

  ngOnInit() {
    const el = document.getElementById('nb-global-spinner');
    if (el) {
      el.style['display'] = 'none';
    }
  }
}
