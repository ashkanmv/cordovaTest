import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Languages } from 'src/app/shared/common';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireService {
  private questionUrl = environment.BaseURL + '/api/v1/questions';
  private answerUrl = environment.BaseURL + '/api/v1/answers';
  private customerUrl = environment.BaseURL + '/api/v1/questions/findshop';
  private customerbynum = environment.BaseURL + '/api/v1/customers/bynumber'; //2AF-960327
  private cityUrl = environment.BaseURL + '/api/v1/cities';
  private routeUrl = environment.BaseURL + '/api/v1/routes';
  private customerUrlR = environment.BaseURL + '/api/v1/customers';
  private routedaily = environment.BaseURL + '/api/v1/routes/routedaily';
  private byrouteidstep =
    environment.BaseURL + '/api/v1/customers/byrouteidstep';
  private questioncatbyuserid =
    environment.BaseURL + '/api/v1/questions/questioncatbyuserid';
  private questionbycat =
    environment.BaseURL + '/api/v1/questions/questionbycat';
  private questioncitybyuser =
    environment.BaseURL + '/api/v1/cities/questioncitybyuser';
  private routebyuser = environment.BaseURL + '/api/v1/routes/routebyuser';
  private routedailybyuser =
    environment.BaseURL + '/api/v1/routes/routedailybyuser';

  constructor(private http: HttpClient) {}

  getQuestions(language: string) {
    let params = new HttpParams();
    params = params.append('language', language);
    return this.http.get(this.questionUrl, { params });
  }
  getQuestionsByCat(language: string, Category: string) {
    let params = new HttpParams();
    params = params.append('language', language);
    params = params.append('CatID', Category);
    return this.http.get(this.questionbycat, { params });
  }
  getAnswers() {
    return this.http.get(this.answerUrl);
  }

  getCities() {
    return this.http.get(this.cityUrl);
  }

  getCityByUserId(userid: string) {
    let params = new HttpParams();
    params = params.append('userid', userid);
    return this.http.get(this.questioncitybyuser, { params });
  }
  getRouteByUserId(city: string, userid: string) {
    let params = new HttpParams();
    params = params.append('city', city);
    params = params.append('userid', userid);
    return this.http.get(this.routebyuser, { params });
  }
  getRoutesByCity(city: string) {
    let params = new HttpParams();
    params = params.append('city', city);
    return this.http.get(this.routeUrl, { params });
  }

  getCustomersByRoute(route: string) {
    let params = new HttpParams();
    params = params.append('route', route);
    return this.http.get(this.customerUrlR, { params });
  }
  getCustomersByRouteIdStep(routeid: string) {
    let params = new HttpParams();
    params = params.append('RouteID', routeid);
    return this.http.get(this.byrouteidstep, { params });
  }
  getQuestionCatsByUserId(userid: string) {
    let params = new HttpParams();
    params = params.append('UserID', userid);
    return this.http.get(this.questioncatbyuserid, { params });
  }

  routedailySelectByRoute(route: string) {
    let params = new HttpParams();
    params = params.append('route', route);
    return this.http.get(this.routedaily, { params });
  }

  routedailySelectByRouteByUser(route: string, userid: string) {
    let params = new HttpParams();
    params = params.append('route', route);
    params = params.append('userid', userid);
    return this.http.get(this.routedailybyuser, { params });
  }
  getCustomers(lat: any, lng: any) {
    let params = new HttpParams();
    params = params.append('lat', lat);
    params = params.append('lng', lng);
    return this.http.get(this.customerUrl, { params });
  }
  getCustomersByNumber(number: string) {
    let params = new HttpParams();
    params = params.append('number', number);
    return this.http.get(this.customerbynum, { params });
  }
  // private handleError(error: any) {
  //   // In a real world app, we might use a remote logging infrastructure
  //   // We'd also dig deeper into the error to get a better message
  //   let errMsg = error.message
  //     ? error.message
  //     : error.status
  //     ? `${error.status} - ${error.statusText}`
  //     : 'Server error';
  //   console.error(errMsg); // log to console instead
  //   return Observable.throw(errMsg);
  // }
}
