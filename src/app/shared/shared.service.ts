import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PredefinedColors } from '@ionic/core';
import { BackgroundColors } from './common';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  isOnline = true;
  private _fontSize: number = 16;
  public get fontSize(): number { return this._fontSize; }
  set fontSize(v: number) {
    if (v)
      this._fontSize = v;
  }

  private _boldFontWeight: boolean = false;
  public get boldFontWeight(): boolean { return this._boldFontWeight; }
  set boldFontWeight(v: boolean) { this._boldFontWeight = v; }

  private _backgroundColor: BackgroundColors = BackgroundColors.blue;
  public get backgroundColor(): BackgroundColors { return this._backgroundColor; }
  set backgroundColor(v: BackgroundColors) { this._backgroundColor = v; }

  constructor(private toastCtrl: ToastController) { }

  toast(color: PredefinedColors, message: string) {
    this.toastCtrl
      .create({
        message: message,
        color: color,
        duration: 3000,
      })
      .then((toastEl) => toastEl.present());
  }

  handleBackgroundColor() {
    switch (this.backgroundColor) {
      case BackgroundColors.blue:
        return "#0095EB"
      case BackgroundColors.green:
        return "#55c595"
      case BackgroundColors.purple:
        return "#7495fe"
      case BackgroundColors.red:
        return "#fe7376"
      case BackgroundColors.yellow:
        return "#facb01"
    }
  }
  handleColor() {
    return 'var(--ion-color-light)';
  }
}
