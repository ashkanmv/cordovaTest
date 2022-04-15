import { Component } from '@angular/core';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationResponse } from '@awesome-cordova-plugins/background-geolocation/ngx';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private plt : Platform,private backgroundGeolocation : BackgroundGeolocation) {
    this.plt.ready().then(()=>{
      console.log('ready');
      this.config();
    }).catch(error=>{
      console.log(error);
    }).finally(()=>{
      console.log('fin');
      this.config();
    })
  }


  config(){
    this.backgroundGeolocation.configure(config)
    .then(() => {
  
      this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) => {
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