import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetSalesmenLocationResponse, GetUserChildrenResponse } from 'src/app/shared/common';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TraceSalesmanService {

  private UserChildren = environment.BaseURL + '/api/v1/users/getchildren';
  private salesmenlocation = environment.BaseURL + '/api/v1/visitorpoints/salesmenlocation';
  constructor(private http: HttpClient) { }

  getUserChildren(user: string) {
    let params = new HttpParams();
    params = params.append('user', user);

    return this.http.get<GetUserChildrenResponse[]>(this.UserChildren, { params })
  }

  getSalesmenLocation(user_ids: any, date: string, IsLastLocation: number) {
    let params = new HttpParams();
    params = params.append('user_id', user_ids);
    params = params.append('datetime', date);
    params = params.append('IsLastLocation', IsLastLocation);

    return this.http.get<GetSalesmenLocationResponse[]>(this.salesmenlocation, { params })
  }
}
