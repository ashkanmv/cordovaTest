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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEditNotificationComponent } from './pages/notifications/add-edit-notification/add-edit-notification.component';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { FileTransfer } from '@awesome-cordova-plugins/file-transfer/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { SharedModule } from './shared/shared.module';
import { Autostart } from '@ionic-native/autostart/ngx';

@NgModule({
  declarations: [AppComponent, AddEditNotificationComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    HighchartsChartModule,
    IonicStorageModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    BackgroundGeolocation,
    Camera,
    FileTransfer,
    File,
    Device,
    Autostart,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalInterceptorService,
      multi: true,
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
