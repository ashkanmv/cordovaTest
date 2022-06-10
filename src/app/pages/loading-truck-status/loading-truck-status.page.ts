import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime } from '@ionic/angular';
import { Language } from 'src/app/shared/common';
import { LanguageService } from 'src/app/shared/language.service';

@Component({
  selector: 'app-loading-truck-status',
  templateUrl: './loading-truck-status.page.html',
  styleUrls: ['./loading-truck-status.page.scss'],
})
export class LoadingTruckStatusPage implements OnInit {
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;

  dateNow = new Date();

  public get language(): Language {
    return this.languageService.language;
  }

  constructor(private languageService: LanguageService) {}

  confirm() {
    // this.datetime.nativeEl.confirm();
    this.datetime.confirm();
  }

  reset() {
    // this.datetime.nativeEl.reset();
    this.datetime.reset();
  }
  ngOnInit() {}
  // ---Select All-----------------------------------------
  // async showAlert() {
  //   let buttons = [
  //     {
  //       text: 'همه',
  //       cssClass: 'all-none-button',
  //       handler: () => {
  //         alert.inputs = alert.inputs.map((checkbox) => {
  //           checkbox.checked = true;
  //           return checkbox;
  //         });

  //         return false;
  //       },
  //     },
  //     {
  //       text: 'هیچکدام',
  //       cssClass: 'all-none-button',
  //       handler: () => {
  //         alert.inputs = alert.inputs.map((checkbox) => {
  //           checkbox.checked = false;
  //           return checkbox;
  //         });
  //         return false;
  //       },
  //     },
  //   ];

  //   // // adjust button order in four button layout for ios
  //   // if (this.platform.is('ios')) {
  //   //   const okButton = { ...buttons[2] };
  //   //   const cancelButton = { ...buttons[3] };
  //   //   buttons = [buttons[0], buttons[1], cancelButton, okButton];
  //   // }

  //   // const alert = await this.alertCtrl.create({
  //   //   header: 'انتخاب کاربر',
  //   //   inputs: this.input,
  //   //   cssClass: 'four-button-alert',
  //   //   buttons: [...buttons]
  //   // });

  //   // await alert.present();
  // }
  // -------------------------------------------------------------------
}
