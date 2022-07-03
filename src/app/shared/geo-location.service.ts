import { Injectable } from '@angular/core';
import {
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationEvents,
  BackgroundGeolocationResponse,
} from '@awesome-cordova-plugins/background-geolocation/ngx';
import { environment } from 'src/environments/environment';
import { LoginResponse } from './common';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {
  private config: BackgroundGeolocationConfig = {
    desiredAccuracy: 0,
    stationaryRadius: 50,
    distanceFilter: 15,
    debug: true,
    stopOnTerminate: false,
    startOnBoot: true,
    interval: 10000,
    locationProvider: 0,
    url: ""
  };

  constructor(private geolocation: BackgroundGeolocation) { }

  startTracking(url: string) {
    this.config.url = url;
    this.geolocation.configure(this.config).then(() => {
      this.geolocation
        .on(BackgroundGeolocationEvents.location)
        .subscribe((location: BackgroundGeolocationResponse) => {
          console.log(location);
          this.geolocation.finish();
        });
    });

    this.geolocation.start();
  }

  getCurrentLocation(): Promise<BackgroundGeolocationResponse> {
    return new Promise(resolve => {
      this.geolocation.getCurrentLocation().then(position => {
        resolve(position)
      }, () => '')
    })
  }

  stopTracking() {
    this.geolocation.stop();
  }
}
