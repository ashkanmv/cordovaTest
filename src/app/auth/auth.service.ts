import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = environment.BaseURL + '/api/v1/users/getbyuuid';
  private loginUrlByID = environment.BaseURL + '/api/v1/users/getbyid';

  constructor(private http: HttpClient) { }

  getAccess(username: string, password: string, uuid: string) {
    if (uuid == undefined) {
      uuid = 'Non'
      console.log('Non_UUid')
    }

    let params = new HttpParams();
    params = params.append('username', username);
    params = params.append('password', password);
    params = params.append('uuid', uuid);
    return this.http.get(this.loginUrl, { params })
  }
  getAccessByID(User_id: string) {
    let params = new HttpParams();
    params = params.append('user_id', User_id);
    return this.http.get(this.loginUrlByID, { params })
  }
  
  // private handleError(error: any) {
  //   // In a real world app, we might use a remote logging infrastructure
  //   // We'd also dig deeper into the error to get a better message
  //   let errMsg = (error.message) ? error.message :
  //     error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  //   console.error(errMsg); // log to console instead
  //   return Observable.throw(errMsg);
  // }

  // private extractData(res: Response) {
  //     let body = res.json();
  //     return body || {};
  // }

}
