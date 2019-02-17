import { Component, ViewContainerRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'app-forgot-page',
  templateUrl: './forgot-page.component.html',
  styleUrls: ['./forgot-page.component.scss'],
  providers: [UtilitiesService],
})
export class ForgotPageComponent {
  email = '';
  param = '';

  constructor(
    private api: ApiService,
    private utilities: UtilitiesService,
    private viewContainer: ViewContainerRef,
    private router: Router,
  ) {}

  tryRecover() {
    this.api.recover(this.email).subscribe(
      r => {
        if (r.response) {
          alert('Please, Check your inbox messages.');
          let urlDest = '/auth/login';
          this.router.navigateByUrl(urlDest);
        } else {
          this.utilities.openSimpleModal(
            'Error',
            'Error, please try later',
            this.viewContainer,
          );
        }
      },
      r => {
        this.utilities.openSimpleModal(
          'Error',
          'Error, please try later',
          this.viewContainer,
        );
      },
    );
  }
}
