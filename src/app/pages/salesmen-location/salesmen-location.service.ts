import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetAllChildrenUserResponse, GetSalesmenLocationResponse } from 'src/app/shared/common';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesmenLocationService {
  private salesmenlocation =
    environment.BaseURL + '/api/v1/visitorpoints/salesmenlocation';
  private allChildrenUser =
    environment.BaseURL + '/api/v1/users/getallchildren';

  constructor(private http: HttpClient) { }

  getallChildrenUser(
    ParentUserID: any,
    UserType: 'rsm' | 'asm' | 'ssv' | 'sr' | 'admin',
    UserIDs: string
  ) {
    if (UserIDs == undefined) {
      UserIDs = ' ';
    }
    if (ParentUserID.length == 0) {
      ParentUserID = ' ';
    }

    let params = new HttpParams();
    params = params.append('ParentUserID', ParentUserID);
    params = params.append('UserType', UserType);
    params = params.append('UserIDs', UserIDs);

    return this.http.get<GetAllChildrenUserResponse[]>(this.allChildrenUser, { params });
  }

  getSalesmenLocation(user_ids: any, date: string, IsLastLocation: number) {
    let params = new HttpParams();
    params = params.append('user_id', user_ids);
    params = params.append('datetime', date);
    params = params.append('IsLastLocation', IsLastLocation);

    return this.http.get<GetSalesmenLocationResponse[]>(this.salesmenlocation, { params });
  }
}
