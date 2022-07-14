import { Component, enableProdMode, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Autostart } from '@ionic-native/autostart/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ThemeColors } from './shared/common';
import { Language } from './shared/common';
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

  public get disableSplitPane(): boolean { return this.sharedService.disableSplitPane; }
  public get backgroundColor(): ThemeColors { return this.sharedService.themeColor; }
  public get selectedLanguage(): Language { return this.languageService.language; }
  constructor(
    private loadingCtrl: LoadingController,
    private plt: Platform,
    private router: Router,
    private languageService: LanguageService,
    private storageService: StorageService,
    public sharedService: SharedService,
    private utilService: UtilService,
    private autoStart: Autostart
  ) { }
  ngOnInit(): void {
    enableProdMode();
    this.languageService.selectedLanguage == 'FR' ? this.language = true : this.language = false;
    this.loadLanguage();
  }

  loadLanguage() {
    this.languageService.loadLanguage().subscribe(() => {
      this.startApp = true;
      this.plt
        .ready()
        .then(() => {
          if (this.plt.is('cordova')) {
            this.setUiCustomization();
            this.enableAutoStart();
          }
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
    this.languageService.languageChanged.next(true);
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

  enableAutoStart() {
    this.autoStart.enable();
  }

  async logout() {
    const loading = await this.loadingCtrl.create({
      message: this.selectedLanguage.Loading,
    });
    await loading.present();
    this.storageService.set('RememberUser', false);
    this.storageService.get('user_id').then((user_id) => {
      if (!user_id) return;

      let json_user_id = JSON.parse(user_id);
      let user_log = {
        user_id: json_user_id,
        task: 'logout',
        version: environment.Version
      }
      this.utilService.post_user_log(user_log).subscribe();
    });
    loading.dismiss();
    this.router.navigate(['/login']);
  }
}