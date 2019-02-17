import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CustomerService } from '../../services/customer.service';
import { UtilitiesService } from '../../services/utilities.service';
import { Router } from '@angular/router';
import { CONST } from '../../utils/globalUtils';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [ApiService, CustomerService, UtilitiesService],
})
export class LoginPageComponent implements OnInit {
  email = '';
  password = '';
  param = '';

  constructor(
    private api: ApiService,
    private customer: CustomerService,
    private router: Router,
    private utilities: UtilitiesService,
    private viewContainer: ViewContainerRef,
  ) {}

  ngOnInit() {
    const el = document.getElementById('nb-global-spinner');
    if (el) {
      el.style['display'] = 'none';
    }
  }

  showError() {
    this.utilities.openSimpleModal(
      'Error',
      'Error, please try later',
      this.viewContainer,
    );
  }

  tryLogin() {
    this.api.login(this.email, this.password).subscribe(
      r => {
        if (r.access_token) {
          this.customer.setToken(
            r.access_token,
            String(r.expires_in),
            r.token_type,
            r.userName,
            r.userId,
            r.roles,
          );
          const urlDestArr = this.router.url.split('=');

          let urlDest = 'client';
          if (r.roles.includes(CONST.ADMIN)) {
            urlDest = 'admin';
          }
          if (urlDestArr.length > 1) {
            urlDest = urlDestArr[1].replace(/%2F/gi, '/');
          }
          this.router.navigateByUrl(urlDest);
        }
      },
      r => {
        this.showError();
      },
    );
  }
}
