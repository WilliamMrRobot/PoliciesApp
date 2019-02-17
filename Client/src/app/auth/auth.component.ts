import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './auth-menu';

@Component({
  selector: 'ngx-auth',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AuthComponent implements OnInit {

  ngOnInit() {
    const el = document.getElementById('nb-global-spinner');
    if (el) {
      el.style['display'] = 'none';
    }
  }

  menu = MENU_ITEMS;
}

// <ngx-sample-layout>
    //   <nb-menu [items]="menu"></nb-menu>
    //   <router-outlet></router-outlet>
    // </ngx-sample-layout>