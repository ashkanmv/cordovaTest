import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ThemeColors } from './shared/common';
import { Language } from './shared/common';
import { GeoLocationService } from './shared/geo-location.service';
import { LanguageService } from './shared/language.service';
import { SharedService } from './shared/shared.service';
import { StorageService } from './shared/storage.service';
import { UtilService } from './shared/util.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  startApp = false;
  language: boolean;

  public get backgroundColor(): ThemeColors { return this.sharedService.themeColor; }
  public get selectedLanguage(): Language { return this.languageService.language; }
  constructor(
    private plt: Platform,
    private languageService: LanguageService,
    private storageService: StorageService,
    private geoLocationService: GeoLocationService,
    public sharedService: SharedService,
    private utilService: UtilService
  ) { }
  ngOnInit(): void {
    this.languageService.selectedLanguage == 'FR' ? this.language = true : this.language = false;
    this.loadLanguage();
    this.setUiCustomization();
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

  fontSize() {
    return this.sharedService.fontSize.toString() + 'px';
  }

  isBold() {
    return this.sharedService.boldFontWeight == false ? 'normal' : 'bold'
  }

  setUiCustomization() {
    this.storageService.get(this.storageService.boldKey).then((isBold: boolean) => {
      if (isBold == undefined) {
        this.storageService.set(this.storageService.boldKey, false);
        this.sharedService.boldFontWeight = false;
      } else if (isBold == false) this.sharedService.boldFontWeight = false;
      else if (isBold == true) this.sharedService.boldFontWeight = true;
    })

    this.storageService.get(this.storageService.fontSizeKey).then((fontSize: number) => {
      if (fontSize == undefined) {
        this.storageService.set(this.storageService.fontSizeKey, 16);
        this.sharedService.fontSize = 16;
      } else if (fontSize) this.sharedService.fontSize = fontSize;
    })

    this.storageService.get(this.storageService.themeColorKey).then((theme: ThemeColors) => {
      if (theme == undefined) {
        this.storageService.set(this.storageService.themeColorKey, ThemeColors.blue);
        this.sharedService.themeColor = ThemeColors.blue;
      } else if (theme) this.sharedService.themeColor = theme;
    })
  }

  get_direction() {
    let lang = this.utilService.get_lang();
    if (lang == 'en') {
      return 'ltr';
    } else {
      return 'rtl';
    }
  }
}