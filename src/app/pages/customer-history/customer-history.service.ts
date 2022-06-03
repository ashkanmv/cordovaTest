import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerHistoryService {
  constructor(private http: HttpClient) {}

  private cityUrl = environment.BaseURL + '/api/v1/cities';
  private routeUrl = environment.BaseURL + '/api/v1/routes'; // URL to web api
  private customerUrl = environment.BaseURL + '/api/v1/customers';
  private customerbynum = environment.BaseURL + '/api/v1/customers/bynumber'; //2AF-960127
  private ppedUrl = environment.BaseURL + '/api/v1/customerhistories/pped';
  private salesUrl = environment.BaseURL + '/api/v1/customerhistories/sales';
  private samplesUrl =
    environment.BaseURL + '/api/v1/customerhistories/samples';
  private kgppedUrl = environment.BaseURL + '/api/v1/customerhistories/kgpped';
  private kgsalesUrl =
    environment.BaseURL + '/api/v1/customerhistories/kgsales';
  private kgsamplesUrl =
    environment.BaseURL + '/api/v1/customerhistories/kgsamples';
  private avgUrl = environment.BaseURL + '/api/v1/avgs';
  private todayUrl = environment.BaseURL + '/api/v1/today';
  private customersearch = environment.BaseURL+'/api/v1/customers/search';
  
  getToday() {
    return this.http.get(this.todayUrl);
  }

  getAvgs() {
    return this.http.get(this.avgUrl);
  }

  getCities() {
    return this.http.get(this.cityUrl);
  }

  getRoutesByCity(city: string) {
    let params = new HttpParams();
    params = params.append('city', city);
    return this.http.get(this.routeUrl, { params });
  }

  getCustomersByRoute(route: string) {
    let params = new HttpParams();
    params = params.append('route', route);
    return this.http.get(this.customerUrl, { params });
  }
  getCustomersByNumber(number: string) {
    let params = new HttpParams();
    params = params.append('number', number);
    return this.http.get(this.customerbynum, { params });
  }
  getPpedByCustomer(customer_id: string) {
    let params = new HttpParams();
    params = params.append('customer_id', customer_id);
    return this.http.get(this.ppedUrl, { params });
  }

  getSalesByCustomer(customer_id: Number) {
    let params = new HttpParams();
    params = params.append('customer_id', customer_id.toString());
    return this.http.get(this.salesUrl, { params });
  }

  getSamplesByCustomer(customer_id: string) {
    let params = new HttpParams();
    params = params.append('customer_id', customer_id);
    return this.http.get(this.samplesUrl, { params });
  }

  getkgPpedByCustomer(customer_id: string) {
    let params = new HttpParams();
    params = params.append('customer_id', customer_id);
    return this.http.get(this.kgppedUrl, { params });
  }

  getkgSalesByCustomer(customer_id: string) {
    let params = new HttpParams();
    params = params.append('customer_id', customer_id);
    return this.http.get(this.kgsalesUrl, { params });
  }

  getkgSamplesByCustomer(customer_id: string) {
    let params = new HttpParams();
    params = params.append('customer_id', customer_id);
    return this.http.get(this.kgsamplesUrl, { params });
  }

  //details
  getPpedByCustomerCategory(customer_id: string, category: string) {
    let params = new HttpParams();
    params = params.append('customer_id', customer_id);
    params = params.append('category', category);
    return this.http.get(this.ppedUrl, { params });
  }

  getSalesByCustomerCategory(customer_id: string, category: string) {
    let params = new HttpParams();
    params = params.append('customer_id', customer_id);
    params = params.append('category', category);
    return this.http.get(this.salesUrl, { params });
  }

  getSamplesByCustomerCategory(customer_id: string, category: string) {
    let params = new HttpParams();
    params = params.append('customer_id', customer_id);
    params = params.append('category', category);
    return this.http.get(this.samplesUrl, { params });
  }

  getkgPpedByCustomerCategory(customer_id: string, category: string) {
    let params = new HttpParams();
    params = params.append('customer_id', customer_id);
    params = params.append('category', category);
    return this.http.get(this.kgppedUrl, { params });
  }

  getkgSalesByCustomerCategory(customer_id: string, category: string) {
    let params = new HttpParams();
    params = params.append('customer_id', customer_id);
    params = params.append('category', category);
    return this.http.get(this.kgsalesUrl, { params });
  }

  getkgSamplesByCustomerCategory(customer_id: string, category: string) {
    let params = new HttpParams();
    params = params.append('customer_id', customer_id);
    params = params.append('category', category);
    return this.http.get(this.kgsamplesUrl, { params });
  }


  getCustomerSearch(searchtext: string) { 
    let params = new HttpParams();
    params = params.append('searchtext', searchtext);
    return this.http.get<any[]>(this.customersearch, {params});
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
