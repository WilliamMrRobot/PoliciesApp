import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Utils, getParameters } from '../utils/globalUtils';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DashboardService {
  public url: string;
  public result: any;
  public resultk: any;

  constructor(public http: HttpClient) {
    this.url = Utils.url;
  }

  getHeaders(token): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
    return headers;
  }

  getDataDashboard(url, token, _area, _dialer): Observable<any> {
    const obj = { area: _area, dialer: _dialer };
    const searchParams = getParameters(obj);
    const headers = this.getHeaders(token);
    return this.requestGet(url, searchParams, headers);
  }

  getUser(url, token): Observable<any> {
    const headers = this.getHeaders(token);
    return this.http.get<any>(Utils.url + url, { headers: headers });
  }

  saveRequestPut(url, token, data): Observable<any> {
    const headers = this.getHeaders(token);

    return this.http.put(this.url + url, data, { headers: headers });
  }

  saveRequest(url, token, data): Observable<any> {
    const headers = this.getHeaders(token);

    return this.http.post(this.url + url, data, { headers: headers });
  }

  getObjectsList(url, token): Observable<any> {
    const searchParams = '';
    const headers = this.getHeaders(token);
    return this.requestGet(url, searchParams, headers);
  }

  getDataMasterByMsisdn(url, token, _area, _msisdn): Observable<any> {
    const obj = { area: _area, filter: _msisdn };
    const searchParams = getParameters(obj);
    const headers = this.getHeaders(token);
    return this.requestGet(url, searchParams, headers);
  }

  getDataParams(url, token, _area): Observable<any> {
    const obj = { area: _area };
    const searchParams = getParameters(obj);
    const headers = this.getHeaders(token);
    return this.requestGet(url, searchParams, headers);
  }

  private requestGet(url, searchParams, headers): Observable<any> {
    return this.http.get(this.url + url + searchParams, { headers: headers });
  }

  addDialer(url, token, data, area, dialerName): Observable<any> {
    const dataToSend = {};
    dataToSend['dialerName'] = dialerName;
    dataToSend['dialerData'] = data;
    dataToSend['dialerArea'] = area;
    const json = JSON.stringify(dataToSend);

    const params = json;

    // Establecemos cabeceras
    const headers = this.getHeaders(token);

    return this.http.post(this.url + url, params, { headers: headers });
  }

  dialerScheduleCall(
    url,
    token,
    msisdn,
    datetime,
    agentPhone,
  ): Observable<any> {
    const dataToSend = {};
    dataToSend['msisdn'] = msisdn;
    dataToSend['datetime'] = datetime;
    dataToSend['agentPhone'] = agentPhone;

    const json = JSON.stringify(dataToSend);

    const params = json;

    // Establecemos cabeceras
    const headers = this.getHeaders(token);

    return this.http.post(this.url + url, params, { headers: headers });
  }

  saveMaster(url, token, data): Observable<any> {
    const headers = this.getHeaders(token);

    return this.http.post(this.url + url + data._id, data, {
      headers: headers,
    });
  }

  associateHotelsApplication(url, token, data): Observable<any> {
    const headers = this.getHeaders(token);

    return this.http.post(this.url + url, data, { headers: headers });
  }

  desAssociateHotelsApplication(url, token): Observable<any> {
    const headers = this.getHeaders(token);

    return this.http.post(this.url + url, {}, { headers: headers });
  }

  saveContent(url, token, data): Observable<any> {
    const headers = this.getHeaders(token);

    return this.http.put(this.url + url + data._id, data, { headers: headers });
  }

  private requestDelete(url, token, idToDelete): Observable<any> {
    const headers = this.getHeaders(token);
    return this.http.delete(this.url + url + idToDelete, { headers: headers });
  }

  public deleteSome(url, token, obj) {
    const idToDelete = obj._id;
    return this.requestDelete(url, token, idToDelete);
  }

  savePromotion(url, token, data): Observable<any> {
    const headers = this.getHeaders(token);

    return this.http.post(this.url + url, data, { headers: headers });
  }

  saveOrUpdateHotel(url, token, data): Observable<any> {
    const headers = this.getHeaders(token);

    return this.http.post(this.url + url, data, { headers: headers });
  }

  showSpinner() {
    const el = document.getElementById('nb-global-spinner');
    if (el) {
      el.style['display'] = 'inline';
      el.style['opacity'] = '0.5';
    }
  }

  hideSpinner() {
    const el = document.getElementById('nb-global-spinner');
    if (el) {
      el.style['display'] = 'none';
    }
  }
}
