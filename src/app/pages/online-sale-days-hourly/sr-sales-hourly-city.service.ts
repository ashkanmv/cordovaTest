import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SrSalesHourlyCityService {
  private channelUrl = environment.BaseURL + '/api/v1/channels';
  private categoryUrl = environment.BaseURL + '/api/v1/categories';
  private skuUrl = environment.BaseURL + '/api/v1/skus';
  private srsales = environment.BaseURL + '/api/v1/srsale/srsalesv2'
  private srsalesuserscityhourly = environment.BaseURL + '/api/v1/srsale/srsalesusercityhourlysd'
  private srsalesusercityhourlycity = environment.BaseURL + '/api/v1/srsale/srsalesusercityhourlycity'
  private srsalesusercityhourlydate = environment.BaseURL + '/api/v1/srsale/srsalesusercityhourlydate'
  private srsalesuserscityhourlyqty = environment.BaseURL + '/api/v1/srsale/srsalesusercityhourlyqtysd'
  private supervisorcomparetrackingyearhourly =environment.BaseURL+'/api/v1/srsale/supervisorcomparetrackingyearhourly'
  private srsalesn = environment.BaseURL + '/api/v1/srsale/srsalesn'
  private srsalesdNetail = environment.BaseURL + '/api/v1/srsale/srsalesndetail'
  private todayUrl = environment.BaseURL + '/api/v1/today';
  private dcUrl = environment.BaseURL + '/api/v1/gps/dc';
  private dcUserUrl = environment.BaseURL + '/api/v1/gps/dcByUser';

  constructor(private http: HttpClient) { }

  getToday() {
    return this.http.get(this.todayUrl);
  }

  getDc() {
    return this.http.get(this.dcUrl);
  }
  getUserDc(userid: string) {
    let params = new HttpParams();
    params = params.append('userid', userid);
    return this.http.get<{City : string}[]>(this.dcUserUrl, { params });
  }

  getChannels() {
    return this.http.get(this.channelUrl);
  }

  getCategories() {
    return this.http.get(this.categoryUrl);
  }

  getSkusByCategory(category: any) {
    let params = new HttpParams();
    params = params.append('category', category);
    return this.http.get(this.skuUrl, { params });
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
  getsrsalesuserscityhourlycity(userid: string, city: string, date: string) {
    let params = new HttpParams();
    params = params.append('userid', userid);
    params = params.append('city', city);
    params = params.append('date', date);
    return this.http.get(this.srsalesusercityhourlycity, { params });
  }

  getsrsalesuserscityhourlydate(userid: string, city: string, fromdate: string, todate: string) {
    let params = new HttpParams();
    params = params.append('userid', userid);
    params = params.append('city', city);
    params = params.append('fromdate', fromdate);
    params = params.append('todate', todate);
    return this.http.get(this.srsalesusercityhourlydate, { params });
  }

  //N-DSDdetails
  getSrSalesNDSDDetail(city: string, date: string, channel: string) {
    let params = new HttpParams();
    params = params.append('city', city);
    params = params.append('channel', channel);
    params = params.append('date', date);

    return this.http.get(this.srsalesdNetail, { params });
  }

  //srUserN-DSD
  getsrsalesuserscityhourlyqty(userid: string, city: string, date: string) {
    let params = new HttpParams();
    params = params.append('city', city);
    params = params.append('userid', userid);
    params = params.append('date', date);

    return this.http.get(this.srsalesuserscityhourlyqty, { params })
  }

  //srUser
  getSupervisorCompareTrackingYearHourly(userid: string, city: string, date: string) {
    let params = new HttpParams();
    params = params.append('city', city);
    params = params.append('userid', userid);
    params = params.append('date', date);

    return this.http.get(this.supervisorcomparetrackingyearhourly, { params })
  }

}
