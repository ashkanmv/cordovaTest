import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoadingTruckStatusService {

  private LoadTruckCity = environment.BaseURL + '/api/v1/srsale/loadtruckcity'//2AF-960329     
  private LoadTruckdetail = environment.BaseURL + '/api/v1/srsale/loadtruckdetail'
  private dcUserUrl = environment.BaseURL + '/api/v1/gps/dcByUser';//2AF-960329  

  constructor(private http: HttpClient) { }


  getUserDc(userid: string) {
    let params = new HttpParams();
    params = params.append('userid', userid);
    return this.http.get<{City : string}[]>(this.dcUserUrl, { params })
  }

  getLoadTruckCity(userid: string, date: string, city: string) {
    let params = new HttpParams();
    params = params.append('userid', userid);
    params = params.append('date', date);
    params = params.append('city', city);

    return this.http.get(this.LoadTruckCity, { params })
  }

  getLoadTruckDetail(Date: any, invcode: string) {
    let params = new HttpParams();
    params = params.append('date', Date);
    params = params.append('routecode', invcode);

    return this.http.get(this.LoadTruckdetail, { params })
  }

}
