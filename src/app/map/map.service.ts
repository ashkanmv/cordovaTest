import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MapService {
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
    params.append('route_code', route_code);
    params.append('time_first', time_first);
    params.append('time_end', time_end);

    return this.http.get(this.vehicleUrl, { params }).subscribe();
  }

  getShopPointByRouteName(route_code: string, selected_date: string) {
    let params = new HttpParams();
    params.append('route_code', route_code);
    params.append('date', selected_date);

    return this.http.get(this.shopPointUrl, { params }).subscribe();
  }

  getInvoiced(cust_codes: string, selected_date: string) {
    let params = new HttpParams();
    params.append('cust_codes', cust_codes);
    params.append('date', selected_date);
    return this.http.get(this.invoicedUrl, { params }).subscribe();
  }

  getOutOfPlan(inv_code: number, selected_date: string) {
    let params = new HttpParams();
    params.append('inv_code', inv_code);
    params.append('date', selected_date);
    return this.http.get(this.invoicedUrl, { params }).subscribe();
  }
  getVisit_NotBuy(routecode: number, selected_date: string) {
    let params = new HttpParams();
    params.append('routecode', routecode);
    params.append('date', selected_date);
    return this.http.get(this.visitednotbuy, { params }).subscribe();
  }

  getSrInfo(route_code: number, date: string, userId: string) {
    let params = new HttpParams();
    params.append('route_code', route_code);
    params.append('date', date);
    params.append('useriD', userId);
    return this.http.get(this.srinfoUrl, { params }).subscribe();
  }

  getDc() {
    return this.http.get(this.dcUrl).subscribe();
  }

  getSr(city: string) {
    let params = new HttpParams();
    params.append('city', city);
    return this.http.get(this.srUrl, { params }).subscribe();
  }

  getUserCildren(user: string) {
    let params = new HttpParams();
    params.append('user', user);
    return this.http.get(this.UserCildren, { params }).subscribe();
  }

  getSrRoute(user: string, date: string) {
    let params = new HttpParams();
    params.append('user', user);
    params.append('date', date);
    return this.http.get(this.SrRoute, { params }).subscribe();
  }

  getVPByRouteTime(route_name: string, time_first: string, time_end: string) {
    let params = new HttpParams();
    params.append('route_name', route_name);
    params.append('time_first', time_first);
    params.append('time_end', time_end);
    return this.http.get(this.visitorPointUrl, { params }).subscribe();
  }
  getVPByRouteTimeUser(
    routecode: string,
    time_first: string,
    time_end: string,
    userId: string
  ) {
    let params = new HttpParams();
    params.append('routecode', routecode);
    params.append('time_first', time_first);
    params.append('time_end', time_end);
    params.append('useriD', userId);
    return this.http.get(this.visitorPointUrlUser, { params }).subscribe();
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
