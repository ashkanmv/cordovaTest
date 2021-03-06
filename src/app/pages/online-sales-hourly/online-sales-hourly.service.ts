import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OnlineSalesHourlyService {


  private channelUrl = environment.BaseURL + '/api/v1/channels';
  private categoryUrl = environment.BaseURL + '/api/v1/categories';
  private skuUrl = environment.BaseURL + '/api/v1/skus';
  private srsales = environment.BaseURL + '/api/v1/srsale/srsalesv2'
  private srsalesuserscityhourly = environment.BaseURL + '/api/v1/srsale/srsalesusercityhourly'
  private srsalesuserscityhourlyqty = environment.BaseURL + '/api/v1/srsale/srsalesusercityhourlyqty'
  private srsalesn = environment.BaseURL + '/api/v1/srsale/srsalesn'
  private srsalesdNetail = environment.BaseURL + '/api/v1/srsale/srsalesndetail'
  private todayUrl = environment.BaseURL + '/api/v1/today';
  private dcUrl = environment.BaseURL + '/api/v1/gps/dc';
  private dcUserUrl = environment.BaseURL + '/api/v1/gps/dcByUser';

  constructor(
    private http: HttpClient
  ) {

  }

  getToday() {
    return this.http.get(this.todayUrl)
  }

  getDc() {
    return this.http.get(this.dcUrl)
  }
  getUserDc(userid: string) {
    let params = new HttpParams();
    params = params.append('userid', userid);
    return this.http.get<{City : string}[]>(this.dcUserUrl, { params })
  }

  getChannels() {
    return this.http.get(this.channelUrl)
  }

  getCategories() {
    return this.http.get(this.categoryUrl)
  }

  getSkusByCategory(category: any) {
    let params = new HttpParams();
    params = params.append('category', category);
    return this.http.get(this.skuUrl, { params })
  }

  //sr
  getSrSales(city: string, date: string) {
    let params = new HttpParams();
    params = params.append('city', city);
    params = params.append('date', date);
    return this.http.get(this.srsales, { params });
  }

  //srUser
  getSrSalesUsers(userid: string, city: string, date: string) {
    let params = new HttpParams();
    params = params.append('userid', userid);
    params = params.append('city', city);
    params = params.append('date', date);
    return this.http.get(this.srsalesuserscityhourly, { params })
  }

  //srUserN-DSD
  getsrsalesuserscityhourlyqty(userid: string, city: string, date: string) {
    let params = new HttpParams();
    params = params.append('userid', userid);
    params = params.append('city', city);
    params = params.append('date', date);
    return this.http.get(this.srsalesuserscityhourlyqty, { params })
  }

  //N-DSDdetails
  getSrSalesNDSDDetail(city: string, date: string, channel: string) {
    let params = new HttpParams();
    params = params.append('channel', channel);
    params = params.append('city', city);
    params = params.append('date', date);
    return this.http.get(this.srsalesdNetail, { params })
  }

}
