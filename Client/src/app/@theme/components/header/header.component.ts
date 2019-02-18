import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { CONST, Utils } from '../../../utils/globalUtils';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @Input()
  position = 'normal';
  private userName = '';
  private userArea = '';
  public user = { name: '', picture: '' };
  userMenu = [];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private analyticsService: AnalyticsService,
  ) {}

  ngOnInit() {
    this.validateUserData();
  }

  validateUserData() {
    this.userName = localStorage.getItem(CONST.USER);
    this.userArea = localStorage.getItem(CONST.USERROLES);
    if (this.user.name === '') {
      this.user.name = this.userName;
      this.user.picture = `assets/images/${this.userArea}.png`;
    }

    this.userMenu = [{ title: 'Log out', link: '/auth/logout' }];
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
