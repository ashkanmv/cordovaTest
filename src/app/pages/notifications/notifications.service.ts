import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from 'src/app/shared/common';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  uploadUrl = "http://77.104.65.168:8002/api/v1/news";

  private newsUrl = environment.BaseURL + '/api/v1/news';

  constructor(private http: HttpClient) { }

  deleteNews(id: any) {
    let params = new HttpParams();
    params = params.append('id', id);

    return this.http.delete(this.newsUrl, { params });
  }

  getNews(skip: number, limit: number) {
    let params = new HttpParams();
    params = params.append('skip', skip);
    params = params.append('limit', limit);

    return this.http.get<News[]>(this.newsUrl, { params })
  }

  postNews(news: any) {
    console.log(news);
    return
    
    return this.http.post(this.newsUrl, { body: news })
  }

  patchNews(news: any) {
    console.log(news);
    return
    return this.http.patch(this.newsUrl, { body: news })
  }

}
