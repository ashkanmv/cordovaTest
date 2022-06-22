import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodayPlannedService {
  private TRoutesCity = environment.BaseURL + '/api/v1/srsale/troutescity';
  private dcUserUrl = environment.BaseURL + '/api/v1/gps/dcByUser';
  private clusterUrl = environment.BaseURL + '/api/v1/customers/cluster';

  constructor(private http: HttpClient) { }

  getTRoutesCity(userid: string, date: string, city: string, cluster: string) {
    let params = new HttpParams();
    params = params.append('userid', userid);
    params = params.append('date', date);
    params = params.append('city', city);
    params = params.append('cluster', cluster);
    return this.http.get(this.TRoutesCity,{params});
  }

  getCluster() {
    return this.http.get<{CustomerType : string}[]>(this.clusterUrl);
  }

  getUserDc(userid: string) {
    let params = new HttpParams();
    params = params.append('userid', userid);
    return this.http.get<{City : string}[]>(this.dcUserUrl,{params})
  }
}
