import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnswerLogService {
  private answerlogUrl = environment.BaseURL + '/api/v1/answerlogs';
  constructor(private http: HttpClient) {}

  postAnswerlog(
    rows: any,
    city: string,
    route: string,
    routedaily: string,
    category: string
  ) {
    let params = new HttpParams();
    params = params.append('city', city);
    params = params.append('route', route);
    params = params.append('routedaily', routedaily);
    params = params.append('category_id', category);
    return this.http.post(this.answerlogUrl, rows, { params });
  }

  patchAnswerlog(
    rows: any,
    ids: string,
    city: string,
    route: string,
    routedaily: string,
    category: string
  ) {
    let params = new HttpParams();
    params = params.append('ids', ids);
    params = params.append('city', city);
    params = params.append('route', route);
    params = params.append('routedaily', routedaily);
    params = params.append('category_id', category);
    return this.http.patch(this.answerlogUrl, rows, { params });
  }

  getAnswerlog(
    user_id: any,
    customer_code: any,
    time_first: string,
    time_end: string
  ) {
    let params = new HttpParams();
    params = params.append('user_id', user_id);
    params = params.append('customer_code', customer_code);
    params = params.append('time_first', time_first);
    params = params.append('time_end', time_end);
    return this.http.get(this.answerlogUrl, { params });
  }
}
