import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  private contactUsUrl = environment.BaseURL + '/api/v1/contactus';

  constructor(private http: HttpClient) { }

  postContactUs(text: any) {
    let body = JSON.stringify(text);

    return this.http.post(this.contactUsUrl, body);
  }
}
