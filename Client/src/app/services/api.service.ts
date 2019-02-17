import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ObservableLike } from 'rxjs';
import { LoginResultModel } from '../auth/login/LoginResultModel';
import { Utils } from '../utils/globalUtils';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResultModel> {
    var userData =
      'username=' + email + '&password=' + password + '&grant_type=password';
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post<LoginResultModel>(
      'http://localhost:58195/token',
      userData,
      { headers: reqHeader },
    );
  }

  // TODO: Implementar correctamente este método
  register(email: string, password: string): Observable<any> {
    return this.http.post<any>(Utils.url + 'Account/Register', {
      email: email,
      password: password,
      confirmPassword: password,
    });
  }

  checkUser(user: String): Observable<any> {
    return this.http.get<any>(Utils.url + 'user-check-user/' + user);
  }

  recover(email: string): Observable<any> {
    return this.http.post<any>(Utils.url + 'recover', { email });
  }

  changepwd(auth: any): Observable<any> {
    return this.http.post<any>(Utils.url + 'changepwd', { auth });
  }
}
