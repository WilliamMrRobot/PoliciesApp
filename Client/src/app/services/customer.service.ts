import { Injectable } from '@angular/core';
import { CONST } from '../utils/globalUtils';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  setToken(
    token: string,
    expires_in: string,
    token_type: string,
    username: string,
  ): void {
    localStorage.setItem(CONST.TOKEN, token);
    localStorage.setItem(CONST.USER, username);
    localStorage.setItem(CONST.EXPIRES_IN, expires_in);
    localStorage.setItem(CONST.TOKEN_TYPE, token_type);
  }

  isLogged() {
    return this.getToken() != null;
  }

  public getToken() {
    return localStorage.getItem(CONST.TOKEN);
  }

  public getName() {
    return localStorage.getItem(CONST.USER);
  }

  public getPhoto() {
    return localStorage.getItem(CONST.PHOTO);
  }

  public getId() {
    return localStorage.getItem(CONST.ID);
  }
}
