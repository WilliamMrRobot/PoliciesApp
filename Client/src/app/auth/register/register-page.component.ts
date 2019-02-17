import { UtilitiesService } from './../../services/utilities.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  providers: [UtilitiesService],
})
export class RegisterPageComponent implements OnInit {
  emailReg = '';
  passwordReg = '';
  password2Reg = '';

  public registerStatus = true;

  constructor(
    private api: ApiService,
    private utilities: UtilitiesService,
    private viewContainer: ViewContainerRef,
  ) {}

  ngOnInit() {}

  showError() {
    this.utilities.openSimpleModal(
      'Error',
      'Error, please try later',
      this.viewContainer,
    );
  }

  tryRegister() {
    if (this.passwordReg !== this.password2Reg) {
      this.utilities.openSimpleModal(
        'Error',
        'Error, Password and confirm password does not match',
        this.viewContainer,
      );
      return false;
    }

    this.api.register(this.emailReg, this.passwordReg).subscribe(
      result => {
        this.registerStatus = false;
      },
      error => {
        this.showError();
      },
    );
  }

  validateUser(user) {
    this.api.checkUser(user).subscribe(
      result => {
        if (result === true) {
          this.utilities.openSimpleModal(
            'Attention',
            'The user already exists',
            this.viewContainer,
          );
          this.emailReg = '';
        }
      },
      error => {
        this.showError();
      },
    );
    console.log(user);
  }
}
