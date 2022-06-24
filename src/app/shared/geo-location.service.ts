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
    // debug: true,
    stopOnTerminate: false,
    startOnBoot: true,
    interval: 10000,
    locationProvider: 0,
    url: ""
  };

  constructor(private geolocation: BackgroundGeolocation) { }

  // configuration() {
  //   this.geolocation.configure(this.config).then(() => {
  //     this.geolocation
  //       .on(BackgroundGeolocationEvents.location)
  //       .subscribe((location: BackgroundGeolocationResponse) => {
  //         console.log(location);

  //         // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
  //         // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
  //         // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
  //         this.geolocation.finish(); // FOR IOS ONLY
  //       });
  //   });

  //   // start recording location
  //   this.geolocation.start();

  //   // If you wish to turn OFF background-tracking, call the #stop method.
  //   // this.geolocation.stop();
  // }

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
