import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, LoadingController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { Language } from 'src/app/shared/common';
import { LanguageService } from 'src/app/shared/language.service';
import { StorageService } from 'src/app/shared/storage.service';
import { LoadingTruckStatusService } from './loading-truck-status.service';

@Component({
  selector: 'app-loading-truck-status',
  templateUrl: './loading-truck-status.page.html',
  styleUrls: ['./loading-truck-status.page.scss'],
})
export class LoadingTruckStatusPage implements OnInit {
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;
  userId;
  selected_date = new Date().toISOString();
  IsDetailsShowing = true;
  selectedItems = [];
  dropdownList = [];
  ctrl: any = {};
  loadtruck1 = [];
  virtual_rows1 = [];
  user_list = [];
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

  public get language(): Language {
    return this.languageService.language;
  }

  constructor(
    private languageService: LanguageService,
    private storageService: StorageService,
    private loadingTruckService: LoadingTruckStatusService,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.storageService.get('user_id').then((user_id) => {
      if (user_id !== undefined && user_id !== null) {
        this.userId = Number(user_id);
        this.get_dc();
      }
    });
  }

  async get_dc() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.loadingTruckService.getUserDc(this.userId)
      .subscribe(
        dcs => {
          dcs.forEach((dc, i) => {
            this.selectedItems.push(dc.City);
            this.dropdownList.push({ "id": i, "itemName": dc.City, "group": this.language.Loading_Truck_Status.Group });
          });
          loading.dismiss();
          this.getLoadTruckCity()
        });
  }

  async getLoadTruckCity() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();

    if (!this.selectedItems.length) {
      this.create_total_model1("Empty");
      loading.dismiss();
      return
    }

    this.loadingTruckService.getLoadTruckCity(this.userId, this.selected_date, this.selectedItems.join())
      .subscribe(
        (SrSales: any) => {
          if (SrSales.length != 0)
            this.create_total_model1(SrSales);
          else
            this.create_total_model1('Empty');

          loading.dismiss();
        });
  }

  create_total_model1(model) {
    this.ctrl.data = model;
    this.loadtruck1 = [];
    this.virtual_rows1 = [];
    this.user_list = [];
    let keys = Object.keys(model[0]);
    keys.splice(1, 1);
    let v_row = {
      type: 'h',
      show: true,
      index: 0
    }
    this.loadtruck1.push(keys);
    this.virtual_rows1.push(v_row);
    let index = 1;
    for (var i = 0; i < model.length; i++) {
      let ch = model[i];
      this.user_list.push(Object.keys(ch).map(key => ch[key]));
      let temp = Object.keys(ch).map(key => ch[key]);
      for (var j = 1; j < temp.length; j++) {
        if (temp[j] != null) {
          temp[j] = temp[j];
        }
      }
      temp.splice(1, 1);
      this.loadtruck1.push(temp);
      let v_row1 = {
        type: 'a',
        show: true,
        index: index
      }
      index++;
      this.virtual_rows1.push(v_row1);
      let v_row2 = {
        type: 'b',
        show: false,
        index: index
      }
      index++;
      this.virtual_rows1.push(v_row2);
    }
  }

  dateChanged(value: string) {

  }
}
