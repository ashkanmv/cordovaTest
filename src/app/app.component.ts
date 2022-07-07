import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BackgroundColors } from './shared/common';
import { GeoLocationService } from './shared/geo-location.service';
import { LanguageService } from './shared/language.service';
import { SharedService } from './shared/shared.service';
import { StorageService } from './shared/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  startApp = false;
  language: boolean;

  public get backgroundColor(): BackgroundColors { return this.sharedService.backgroundColor; }
  constructor(
    private plt: Platform,
    private languageService: LanguageService,
    private storageService: StorageService,
    private geoLocationService: GeoLocationService,
    public sharedService : SharedService,
  ) { }
  ngOnInit(): void {
    this.languageService.selectedLanguage == 'FR' ? this.language = true : this.language = false;
    this.loadLanguage();
  }

  loadLanguage() {
    this.languageService.loadLanguage().subscribe(() => {
      this.startApp = true;
      this.plt
        .ready()
        .then(() => {
          if (this.plt.is('cordova')) this.startTracking();
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  languageChanged() {
    if (this.language)
      localStorage.setItem('selectedLanguage', 'FR')
    else localStorage.setItem('selectedLanguage', 'EN')

  }

  startTracking() {
    this.storageService.get('start_tracking_url').then(url => this.geoLocationService.startTracking(url))
  }

  fontSize(){
    return this.sharedService.fontSize.toString() + 'px';
  }

  isBold(){
    return this.sharedService.boldFontWeight == false ? 'normal' : 'bold' 
  }
}