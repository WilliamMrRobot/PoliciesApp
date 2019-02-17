import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CONST } from '../../utils/globalUtils';

@Component({
  selector: 'app-logout-page',
  templateUrl: './logout-page.component.html',
  styleUrls: ['./logout-page.component.scss'],
})
export class LogoutPageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    localStorage.removeItem(CONST.TOKEN);

    localStorage.removeItem(CONST.ID_LOCAL_STORAGE);
    localStorage.removeItem(CONST.USER);

    this.router.navigateByUrl('/logout');
  }
}
