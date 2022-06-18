import { Component, OnInit, ViewChild } from '@angular/core';
import { Data } from '@angular/router';

import { IonDatetime, LoadingController } from '@ionic/angular';
import { Language } from 'src/app/shared/common';
import { LanguageService } from 'src/app/shared/language.service';
import { StorageService } from 'src/app/shared/storage.service';
import { MaxPpedService } from './max-pped.service';

@Component({
  selector: 'app-max-pped',
  templateUrl: './max-pped.page.html',
  styleUrls: ['./max-pped.page.scss'],
})
export class MaxPPEDPage implements OnInit {
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;
  dateNow = new Date();
  selectedSegment: string = 'per-customer';
  selected_fromdate = new Date().toISOString();
  selected_fromdateN = new Date().toISOString();
  selected_todate = new Date().toISOString();
  selected_todateN = new Date().toISOString();
  userId;
  dc = [];
  dcN = [];
  dropdownList = [];
  selectedItems = [];
  dropdownListN = [];
  selectedItemsN = [];
  virtual_rows1 = [];
  virtual_rows2 = [];
  ctrl: any = {};
  srpped1 = [];
  srpped2 = [];
  user_list = [];
  nestedTableIsShowingRow_1: boolean = false;
  nestedTableIsShowingRow_2: boolean = false;
  nestedTableIsShowingRow_3: boolean = false;
  nestedTableIsShowingRow_4: boolean = false;
  public get language(): Language {
    return this.languageService.language;
  }

  constructor(private languageService: LanguageService,
    private storageService: StorageService,
    private srPpedService: MaxPpedService,
    private loadingCtrl: LoadingController
  ) { }

  public routeData: Array<any> = [
    {
      route: 1131,
      city: 'Tehran',
      visitorName: 'Behnam Ezadi',
      sale: 3.12,
      PPED: 19,
      percentage: 782,
    },
    {
      route: 1132,
      city: 'Tabriz',
      visitorName: 'Behnaz Azadi',
      sale: 4.12,
      PPED: 9,
      percentage: 7.82,
    },
    {
      route: 1133,
      city: 'Esfahan',
      visitorName: 'Behzad Azari',
      sale: 3.12,
      PPED: 19,
      percentage: 782,
    },
    {
      route: 1134,
      city: 'Amol',
      visitorName: 'Behrooz Ezraee',
      sale: 3.12,
      PPED: 19,
      percentage: 782,
    },
  ];

  ngOnInit() {
    this.storageService.get('user_id').then(user_id => {
      this.userId = Number(user_id);
      this.get_dc();
      this.get_dcN();
    })
  }

  dateChanged(segment: 'per-route' | 'per-customer') {
    if (segment == 'per-customer')
      this.selectedDCN();
    else this.selectedDC()
  }

  refresh() {
    this.selectedDCN();
    this.selectedDC()
  }

  async get_dc() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.srPpedService.getUserDc(this.userId)
      .subscribe(
        (dcs: Data[]) => {
          this.dc = dcs;
          for (var i = 0; i < this.dc.length; i++) {
            this.dropdownList.push({ "id": i, "itemName": this.dc[i].City, 'group': this.language.Max_PPED.group });
          }
          this.selectedItems = this.dropdownList.map(_ => _.itemName);

          loading.dismiss();
          this.selectedDC()
        });
  }

  create_total_model1(model) {
    var changeObjKey = [];
    model.forEach(element => {
      changeObjKey.push({
        RouteCode: element.RouteCode,
        Cluster: element.Cluster,
        VisitorName: element.VisitorName,
        CustomerNumber: element.CustomerNumber,
        StoreName: element.StoreName,
        Sale: element.Sale,
        PPED: element.PPED,
        Percentage: element.Percentage
      })
    });
    this.ctrl.data = changeObjKey;
    this.srpped1 = [];
    this.virtual_rows1 = [];
    this.user_list = [];
    let keys = Object.keys(model[0]);
    keys.splice(1, 2);
    let v_row = {
      type: 'h',
      show: true,
      index: 0
    }
    this.srpped1.push(keys);
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
      temp.splice(1, 2);
      this.srpped1.push(temp);
    }
  }

  async get_dcN() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.srPpedService.getUserDc(this.userId)
      .subscribe(
        (dcs: Data[]) => {
          this.dcN = dcs;
          for (var i = 0; i < this.dcN.length; i++)
            this.dropdownListN.push({ "id": i, "itemName": this.dc[i].City, 'group': this.language.Max_PPED.group });
          this.selectedItemsN = this.dropdownListN.map(_ => _.itemName);
          loading.dismiss();
          this.selectedDCN();
        });
  }

  async selectedDCN() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();

    if (!this.selectedItemsN.length) {
      this.create_total_model1("Empty");
      loading.dismiss();
      return
    }

    this.srPpedService.getSrPpedPerRoute(this.selectedItemsN.join(), this.selected_fromdateN, this.selected_todateN)
      .subscribe(
        (srsales: Data[]) => {
          if (srsales.length)
            this.create_total_model2(srsales);
          else
            this.create_total_model1("Empty");
          loading.dismiss();
        });
  }

  async selectedDC() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();

    if (!this.selectedItems.length) {
      this.create_total_model1("Empty");
      loading.dismiss();
      return
    }

    this.srPpedService.getSrPpedPerCustomer(this.selectedItems.join(), this.selected_fromdate, this.selected_todate)
      .subscribe(
        (srsales: Data[]) => {
          if (srsales.length != 0)
            this.create_total_model1(srsales);
          else
            this.create_total_model1("Empty");
          loading.dismiss();
        });
  }

  create_total_model2(model) {
    this.srpped2 = [];
    this.virtual_rows2 = [];
    let keys = Object.keys(model[0]);
    let v_row = {
      type: 'h',
      show: true,
      index: 0
    }
    this.srpped2.push(keys);
    this.virtual_rows2.push(v_row);
    let index = 1;
    for (var i = 0; i < model.length; i++) {
      let ch = model[i];
      let temp = Object.keys(ch).map(key => ch[key]);
      for (var j = 1; j < temp.length; j++) {
        if (temp[j] != null) {
          temp[j] = temp[j];
        }

      }
      this.srpped2.push(temp);
      let v_row1 = {
        type: 'a',
        show: true,
        index: index
      }
      index++;
      this.srpped2.push(temp);
      this.virtual_rows2.push(v_row1);
      let v_row2 = {
        type: 'b',
        show: false,
        index: index
      }
      index++;
      this.virtual_rows2.push(v_row2);
    }

  }

  segmentChanged(event: any) {
    this.selectedSegment = event.target.value;
  }

  toggleNestedTabelRow_1() {
    this.nestedTableIsShowingRow_1 = !this.nestedTableIsShowingRow_1;
  }
  toggleNestedTabelRow_2() {
    this.nestedTableIsShowingRow_2 = !this.nestedTableIsShowingRow_2;
  }
  toggleNestedTabelRow_3() {
    this.nestedTableIsShowingRow_3 = !this.nestedTableIsShowingRow_3;
  }
  toggleNestedTabelRow_4() {
    this.nestedTableIsShowingRow_4 = !this.nestedTableIsShowingRow_4;
  }
}
