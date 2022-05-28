import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BackgroundGeolocation } from '@awesome-cordova-plugins/background-geolocation/ngx';
import { HighchartsChartModule } from 'highcharts-angular';
import { GlobalInterceptorService } from './global-interceptor.service';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    HighchartsChartModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    BackgroundGeolocation,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalInterceptorService,
      multi: true,
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
