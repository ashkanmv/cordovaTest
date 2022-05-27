import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  userLogUrl : string;
  constructor(private http : HttpClient) { }

  post_user_log(user_log: any){
    // if (Device.uuid == null || Device.uuid == undefined)
    // {
    //  // global.BaseURL = 'http://172.22.17.96:8002';
    //   environment.BaseURL = 'http://77.104.65.168:8002';
    // }
    this.userLogUrl = environment.BaseURL+'/api/v1/userlogs';
    return this.http.post(this.userLogUrl, user_log);
}
}
