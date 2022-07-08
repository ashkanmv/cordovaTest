import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpEventType,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { SharedService } from './shared/shared.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalInterceptorService implements HttpInterceptor {
  constructor(private loadingCtrl: LoadingController,
    private sharedService: SharedService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap(() => this.sharedService.isOnline = true), catchError((x) => this.handleError(x)));
    // .pipe(
    //   map((event) => {
    //     if (event.type === HttpEventType.Response) {
    //       return JSON.parse(event.body);
    //     }
    //   })
    // );
  }

  private handleError(err: HttpErrorResponse): Observable<any> {
    this.sharedService.isOnline = false;
    this.loadingCtrl.dismiss();
    return throwError(err);
  }
}
