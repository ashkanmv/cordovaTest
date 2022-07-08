import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private AccountingUrl = environment.BaseURL + '/api/v1/Accounting';


  constructor(
    private http: HttpClient
  ) {

  }

  PostpassChanged(userid: string, currentpassword: string, newpassword: string) {
    let params = new HttpParams();
    params = params.append('userid', userid);
    params = params.append('currentpassword', currentpassword);
    params = params.append('&newpassword', newpassword);
    return this.http.get(this.AccountingUrl, { params })
  }

}
