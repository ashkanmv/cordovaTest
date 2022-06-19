import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { getSales1ByChannelResponse } from 'src/app/shared/common';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScoreCardService {

  private channelUrl = environment.BaseURL + '/api/v1/channels';
  private categoryUrl = environment.BaseURL + '/api/v1/categories';
  private skuUrl = environment.BaseURL + '/api/v1/skus';
  private pped1Url = environment.BaseURL + '/api/v1/scorecard/pped1';
  private sales1Url = environment.BaseURL + '/api/v1/scorecard/sales1';
  private pped2Url = environment.BaseURL + '/api/v1/scorecard/pped2';
  private sales2Url = environment.BaseURL + '/api/v1/scorecard/sales2';
  private pped3Url = environment.BaseURL + '/api/v1/scorecard/pped3';
  private sales3Url = environment.BaseURL + '/api/v1/scorecard/sales3';
  private pped4Url = environment.BaseURL + '/api/v1/scorecard/pped4';
  private sales4Url = environment.BaseURL + '/api/v1/scorecard/sales4';
  private todayUrl = environment.BaseURL + '/api/v1/today';

  constructor(
    private http: HttpClient
  ) {

  }

  getToday() {
    return this.http.get<{ ToDay: string }[]>(this.todayUrl).pipe(map(event => event[0].ToDay))
  }


  getChannels() {
    return this.http.get<{ GPSChannel: string, order: number }[]>(this.channelUrl)
  }

  getCategories() {
    return this.http.get<{Cat:string}[]>(this.categoryUrl)
  }

  getSkusByCategory(category: any) {
    let params = new HttpParams();
    params = params.append('category', category);

    return this.http.get<{CAT: string,SKU: string}[]>(this.skuUrl, { params })
  }

  getPped1ByChannel(channel: any) {
    let params = new HttpParams();
    params = params.append('channel', channel);

    return this.http.get(this.pped1Url, { params })
  }

  getSales1ByChannel(channel: any) {
    let params = new HttpParams();
    params = params.append('channel', channel);

    return this.http.get<getSales1ByChannelResponse[]>(this.sales1Url, { params })
  }

  //details
  getPped1ByChannelCategory(channel: any, category: string) {
    let params = new HttpParams();
    params = params.append('category', category);
    params = params.append('channel', channel);

    return this.http.get(this.pped1Url, { params })
  }

  getSales1ByChannelCategory(channel: any, category: string) {
    let params = new HttpParams();
    params = params.append('category', category);
    params = params.append('channel', channel);

    return this.http.get(this.sales1Url, { params })
  }

  //sc2
  getPped2ByCatSku(category: string, sku: string) {
    let params = new HttpParams();
    params = params.append('category', category);
    params = params.append('sku', sku);

    return this.http.get(this.pped2Url, { params })
  }

  getSales2ByCatSku(category: string, sku: string) {
    let params = new HttpParams();
    params = params.append('category', category);
    params = params.append('sku', sku);
    return this.http.get(this.sales2Url, { params })
  }

  //sc3
  getPped3ByChannel(channel: string) {
    let params = new HttpParams();
    params = params.append('channel', channel);

    return this.http.get(this.pped3Url, { params })
  }

  getSales3ByChannel(channel: string) {
    let params = new HttpParams();
    params = params.append('channel', channel);

    return this.http.get(this.sales3Url, { params })
  }
  getPped3ByChannelCategory(channel: string, category: string) {
    let params = new HttpParams();
    params = params.append('channel', channel);
    params = params.append('category', category);

    return this.http.get(this.pped3Url, { params })
  }

  getSales3ByChannelCategory(channel: string, category: string) {
    let params = new HttpParams();
    params = params.append('channel', channel);
    params = params.append('category', category);

    return this.http.get(this.sales3Url, { params })
  }

  //sc4
  getPped4ByCatSku(category: string, sku: string) {
    let params = new HttpParams();
    params = params.append('sku', sku);
    params = params.append('category', category);

    return this.http.get(this.pped4Url, { params })
  }

  getSales4ByCatSku(category: string, sku: string) {
    let params = new HttpParams();
    params = params.append('sku', sku);
    params = params.append('category', category);

    return this.http.get(this.sales4Url, { params })
  }





}
