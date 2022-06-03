import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { getUserCildrenResponse } from '../shared/common';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  geoapifyAPIKey = '5908d42d2c0344b2af400a77ab03ed10';
  private vehicleUrl = environment.BaseURL + '/api/v1/vehicles';
  private shopPointUrl = environment.BaseURL + '/api/v1/shoppoints';
  private invoicedUrl = environment.BaseURL + '/api/v1/invoiceds';
  private visitednotbuy =
    environment.BaseURL + '/api/v1/shoppoints/visitednotbuy';
  private dcUrl = environment.BaseURL + '/api/v1/gps/dc';
  private srUrl = environment.BaseURL + '/api/v1/gps/sr';
  private srinfoUrl = environment.BaseURL + '/api/v1/gps/srinfo';
  private visitorPointUrl = environment.BaseURL + '/api/v1/visitorpoints';
  private visitorPointUrlUser =
    environment.BaseURL + '/api/v1/visitorpoints/byid';
  private UserCildren = environment.BaseURL + '/api/v1/users/getchildren';
  private SrRoute = environment.BaseURL + '/api/v1/routes/getsrroute';

  constructor(private http: HttpClient) {}

  getVehicleByRouteTime(
    route_code: string,
    time_first: string,
    time_end: string
  ) {
    let params = new HttpParams();
    params = params.append('route_code', route_code);
    params = params.append('time_first', time_first);
    params = params.append('time_end', time_end);

    return this.http.get(this.vehicleUrl, { params });
  }

  getShopPointByRouteName(route_code: string, selected_date: string) {
    let params = new HttpParams();
    params = params.append('route_code', route_code);
    params = params.append('date', selected_date);

    return this.http.get(this.shopPointUrl, { params });
  }

  getInvoiced(cust_codes: string, selected_date: string) {
    let params = new HttpParams();
    params = params.append('cust_codes', cust_codes);
    params = params.append('date', selected_date);
    return this.http.get(this.invoicedUrl, { params });
  }

  getOutOfPlan(inv_code: number, selected_date: string) {
    let params = new HttpParams();
    params = params.append('inv_code', inv_code);
    params = params.append('date', selected_date);
    return this.http.get(this.invoicedUrl, { params });
  }
  getVisit_NotBuy(routecode: number, selected_date: string) {
    let params = new HttpParams();
    params = params.append('routecode', routecode);
    params = params.append('date', selected_date);
    return this.http.get(this.visitednotbuy, { params });
  }

  getSrInfo(route_code: number, date: string, userId: string) {
    let params = new HttpParams();
    params = params.append('route_code', route_code);
    params = params.append('date', date);
    params = params.append('useriD', userId);
    return this.http.get(this.srinfoUrl, { params });
  }

  getDc() {
    return this.http.get(this.dcUrl);
  }

  getSr(city: string) {
    let params = new HttpParams();
    params = params.append('city', city);
    return this.http.get(this.srUrl, { params });
  }

  getUserCildren(user: string) {
    let params = new HttpParams();
    params = params.append('user', user);
    return this.http.get<getUserCildrenResponse[]>(this.UserCildren, { params });
  }

  getSrRoute(user: string, date: string) {
    let params = new HttpParams();
    params = params.append('user', user);
    params = params.append('date', date);
    return this.http.get(this.SrRoute, { params });
  }

  getVPByRouteTime(route_name: string, time_first: string, time_end: string) {
    let params = new HttpParams();
    params = params.append('route_name', route_name);
    params = params.append('time_first', time_first);
    params = params.append('time_end', time_end);
    return this.http.get(this.visitorPointUrl, { params });
  }
  getVPByRouteTimeUser(
    routecode: string,
    time_first: string,
    time_end: string,
    userId: string
  ) {
    let params = new HttpParams();
    params = params.append('routecode', routecode);
    params = params.append('time_first', time_first);
    params = params.append('time_end', time_end);
    params = params.append('useriD', userId);
    return this.http.get(this.visitorPointUrlUser, { params });
  }

  // private handleError(error: any) {
  //   // In a real world app, we might use a remote logging infrastructure
  //   // We'd also dig deeper into the error to get a better message
  //   let errMsg = error.message
  //     ? error.message
  //     : error.status
  //     ? `${error.status} - ${error.statusText}`
  //     : 'Server error';
  //   console.error(errMsg); // log to console instead
  //   return Observable.throw(errMsg);
  // }
}
