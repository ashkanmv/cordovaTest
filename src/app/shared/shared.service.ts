import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PredefinedColors } from '@ionic/core';
import { ColorSchemes, ThemeColors } from './common';
import { LanguageService } from './language.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  disableSplitPane = false;
  isOnline = false;
  private _fontSize: number = 16;
  public get fontSize(): number { return this._fontSize; }
  set fontSize(v: number) {
    if (v) {
      this.storageService.set(this.storageService.FontSize_Key, v);
      this._fontSize = v;
    }
  }

  private _boldFontWeight: boolean = false;
  public get boldFontWeight(): boolean { return this._boldFontWeight; }
  set boldFontWeight(v: boolean) {
    this.storageService.set(this.storageService.Bold_Key, v);
    this._boldFontWeight = v;
  }

  private _themeColor: ThemeColors = ThemeColors.blue;
  public get themeColor(): ThemeColors { return this._themeColor; }
  set themeColor(v: ThemeColors) {
    this.storageService.set(this.storageService.ThemeColor_Key, v);
    this._themeColor = v;
  }

  private _colorScheme: ColorSchemes = ColorSchemes.light;
  public get colorScheme(): ColorSchemes { return this._colorScheme; }
  set colorScheme(v: ColorSchemes) {
    this.storageService.set(this.storageService.ColorSchemes_Key, v);
    this._colorScheme = v;
    if (v == ColorSchemes.dark)
      document.body.classList.add("dark");
    else
      document.body.classList.remove("dark");
  }

  constructor(private toastCtrl: ToastController, private languageService: LanguageService,
    private storageService: StorageService) { }

  toast(color: PredefinedColors, message: string) {
    this.toastCtrl
      .create({
        message: message,
        color: color,
        duration: 3000,
      })
      .then((toastEl) => toastEl.present());
  }

  handleThemeColor() {
    switch (this.themeColor) {
      case ThemeColors.blue:
        return "#0095EB"
      case ThemeColors.green:
        return "#55c595"
      case ThemeColors.purple:
        return "#7495fe"
      case ThemeColors.red:
        return "#fe7376"
      case ThemeColors.yellow:
        return "#facb01"
    }
  }
  handleColor() {
    return 'var(--ion-color-light)';
  }
  get_direction() {
    return this.languageService.selectedLanguage == 'FR' ? 'rtl' : 'ltr';
  }
}
