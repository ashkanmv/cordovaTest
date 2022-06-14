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
  IsDetailsShowing = true;
  // mock data
  public loadingTruckData: Array<any> = [
    {
      route: 1100,
      load: 4,
      sale: 6,
      PPED: 43,
      remain: 0,
    },
    {
      route: 1103,
      load: 7,
      sale: 0,
      PPED: 3,
      remain: 3,
    },
    {
      route: 1104,
      load: 3,
      sale: 2,
      PPED: 4,
      remain: 2,
    },
    {
      route: 1105,
      load: 1,
      sale: 8,
      PPED: 35,
      remain: 31,
    },
  ];
  //
  // --detail
  public routeVisitorDetailData: Array<any> = [
    {
      Name: ' Lola Jahan',
      Number: 205645654,
      Address: 'Tehran_Zafar ',
    },
    {
      Name: 'Jahan Zafaru',
      Number: 657546456,
      Address: 'Tehran_Zafar',
    },
    {
      Name: 'Jahanan Esfahani',
      Number: 46784784,
      Address: 'Tehran_Zafar',
    },
    {
      Name: 'Hanie Jahanian',
      Number: 85674867845,
      Address: 'Tehran_Zafar',
    },
  ];
  //delete later
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
