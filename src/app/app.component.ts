import { Component, OnInit } from '@angular/core';
import {
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationEvents,
  BackgroundGeolocationResponse,
} from '@awesome-cordova-plugins/background-geolocation/ngx';
import { Platform } from '@ionic/angular';
import { LanguageService } from './shared/language.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  startApp = false;
  constructor(
    private plt: Platform,
    private backgroundGeolocation: BackgroundGeolocation,
    private languageService: LanguageService
  ) {}
  ngOnInit(): void {
    this.loadLanguage();
  }

  loadLanguage() {
    this.languageService.loadLanguage().subscribe(() => {
      console.log('ash');
      
      this.startApp = true;
      this.plt.ready().then(() => {
        console.log('ready');
        if (this.plt.is('cordova')) this.config();
      }).catch((error) => {
        console.log(error);
      });
    });
  }

  config() {
    this.backgroundGeolocation.configure(config).then(() => {
      this.backgroundGeolocation
        .on(BackgroundGeolocationEvents.location)
        .subscribe((location: BackgroundGeolocationResponse) => {
          console.log(location);

          // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
          // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
          // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
          this.backgroundGeolocation.finish(); // FOR IOS ONLY
        });
    });

    // start recording location
    this.backgroundGeolocation.start();

    // If you wish to turn OFF background-tracking, call the #stop method.
    // this.backgroundGeolocation.stop();
  }
}

const config: BackgroundGeolocationConfig = {
  desiredAccuracy: 10,
  stationaryRadius: 20,
  distanceFilter: 30,
  debug: true, //  enable this hear sounds for background-geolocation life-cycle.
  stopOnTerminate: false, // enable this to clear background location settings when the app terminates
};
