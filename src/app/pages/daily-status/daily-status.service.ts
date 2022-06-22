import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DailyStatusService {
  private dcUserUrl = environment.BaseURL + '/api/v1/gps/dcByUser';
  private CommuteCity = environment.BaseURL + '/api/v1/srsale/commutecity';
  private Commutedetail = environment.BaseURL + '/api/v1/srsale/commutedetail';
  private CommuteCity_T = environment.BaseURL + '/api/v1/srsale/commutecitytablet'

  constructor(private http: HttpClient) { }

  getUserDc(userid: string) {
    let params = new HttpParams();
    params = params.append('userid', userid);
    return this.http.get<{City : string}[]>(this.dcUserUrl, { params })
  }

  getCommutecity(userid: string, date: string, city: string) {
    let params = new HttpParams();
    params = params.append('userid', userid);
    params = params.append('date', date);
    params = params.append('city', city);
    return this.http.get(this.CommuteCity, { params })
  }

  //details
  getCommuteDetail(city: any, invcode: string) {
    let params = new HttpParams();
    params = params.append('invcode', invcode);
    params = params.append('city', city);
    return this.http.get(this.Commutedetail, { params })
  }

  //Tablet
  getCommutecity_T(userid: string, date: string, city: string) {
    let params = new HttpParams();
    params = params.append('userid', userid);
    params = params.append('date', date);
    params = params.append('city', city);
    return this.http.get(this.CommuteCity_T, { params })
  }
}
