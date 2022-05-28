import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PredefinedColors } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private toastCtrl: ToastController) { }

  toast(color: PredefinedColors, message: string) {
    this.toastCtrl.create({
      message: message,
      color: color,
      duration: 3000
    }).then(toastEl => toastEl.present());
  }
}