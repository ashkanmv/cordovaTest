import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MaxPpedService {
  private channelUrl = environment.BaseURL + '/api/v1/channels';
  private categoryUrl = environment.BaseURL + '/api/v1/categories';
  private skuUrl = environment.BaseURL + '/api/v1/skus';
  private srppedPerCustomer =
    environment.BaseURL + '/api/v1/srpped/srppedPerCustomer';
  private srppedPerRoute =
    environment.BaseURL + '/api/v1/srpped/srppedPerRoute';
  private srppedPerRouteCustomers =
    environment.BaseURL + '/api/v1/srpped/srppedPerRouteCustomers';
  private todayUrl = environment.BaseURL + '/api/v1/today';
  private dcUrl = environment.BaseURL + '/api/v1/gps/dc';
  private dcUserUrl = environment.BaseURL + '/api/v1/gps/dcByUser';

  constructor(private http: HttpClient) {}

  getUserDc(userid: string) {
    let params = new HttpParams();
    params = params.append('userid', userid);

    return this.http.get(this.dcUserUrl, { params });
  }
  getSrPpedPerCustomer(city: string, fromdate: string, todate: string) {
    let params = new HttpParams();
    params = params.append('city', city);
    params = params.append('fromdate', fromdate);
    params = params.append('todate', todate);

    return this.http.get(this.srppedPerCustomer, { params });
  }

  //srUserN-DSD
  getSrPpedPerRoute(city: string, fromdate: string, todate: string) {
    let params = new HttpParams();
    params = params.append('city', city);
    params = params.append('fromdate', fromdate);
    params = params.append('todate', todate);

    return this.http.get(this.srppedPerRoute, { params });
  }

  getSrPpedPerRouteDetail(
    city: string,
    fromdate: string,
    todate: string,
    routecode: string
  ) {
    let params = new HttpParams();
    params = params.append('city', city);
    params = params.append('fromdate', fromdate);
    params = params.append('todate', todate);
    params = params.append('routecode', routecode);

    return this.http.get(this.srppedPerRouteCustomers, { params });
  }
}
