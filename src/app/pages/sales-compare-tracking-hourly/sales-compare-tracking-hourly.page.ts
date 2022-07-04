import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Language } from 'src/app/shared/common';
import { LanguageService } from 'src/app/shared/language.service';
import { SharedService } from 'src/app/shared/shared.service';
import { StorageService } from 'src/app/shared/storage.service';
import { SrSalesHourlyCityService } from '../online-sale-days-hourly/sr-sales-hourly-city.service';

@Component({
  selector: 'app-sales-compare-tracking-hourly',
  templateUrl: './sales-compare-tracking-hourly.page.html',
  styleUrls: ['./sales-compare-tracking-hourly.page.scss'],
})
export class SalesCompareTrackingHourlyPage implements OnInit {
  selected_date = new Date().toISOString();
  selected_dateN = new Date().toISOString();
  user_id;
  dc = [];
  dropdownList = [];
  selectedItems = [];
  virtual_rows1 = [];
  srsales1 = [];
  user_list = [];
  // old rys
  selected_ch1 = [];

  public get language(): Language {
    return this.languageService.language;
  }
  public get selectedLanguage(): Language {
    return this.languageService.language;
  }
  public get isOnline() {
    return this.sharedService.isOnline;
  }

  constructor(
    private languageService: LanguageService,
    private storageService: StorageService,
    private loadingCtrl: LoadingController,
    private SrSalesHourlyService: SrSalesHourlyCityService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.storageService.get('user_id').then((user_id) => {
      this.user_id = Number(user_id);
      this.get_dc();
    });
  }

  async get_dc() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    try {
      this.SrSalesHourlyService.getUserDc(this.user_id).subscribe(
        (dcs: Data[]) => {
          this.dc = dcs;
          for (var i = 0; i < this.dc.length; i++) {
            this.dropdownList.push({
              id: i,
              itemName: this.dc[i].City,
              group: this.language.Sales_Compare_Tracking_Hourly.group,
            });
          }
          this.selectedItems = this.dropdownList.map((_) => _.itemName);
          loading.dismiss();
          this.dcSelect();
        }
      );
    } catch (error) {
      alert(error);
      loading.dismiss();
    }
  }

  async dcSelect() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.SrSalesHourlyService.getSupervisorCompareTrackingYearHourly(
      this.user_id,
      this.selectedItems.join(),
      this.selected_date
    ).subscribe((SrSales: Data[]) => {
      if (SrSales.length != 0) this.create_total_model1(SrSales);
      else this.create_total_model1('Empty');
      loading.dismiss();
    });
  }

  create_total_model1(model) {
    this.srsales1 = [];
    this.virtual_rows1 = [];
    this.user_list = [];
    let keys = Object.keys(model[0]);
    keys.splice(1, 1);
    let v_row = {
      type: 'h',
      show: true,
      index: 0,
    };
    this.srsales1.push(keys);
    this.virtual_rows1.push(v_row);
    let index = 1;
    for (var i = 0; i < model.length; i++) {
      let ch = model[i];
      let temp = Object.keys(ch).map((key) => ch[key]);
      for (var j = 1; j < temp.length; j++) {
        if (temp[j] != null) {
          temp[j] = temp[j];
        }
      }
      this.user_list.push(temp);
      this.srsales1.push(temp);
      let v_row1 = {
        type: 'a',
        show: true,
        index: index,
      };
      index++;
      this.virtual_rows1.push(v_row1);
      let v_row2 = {
        type: 'b',
        show: false,
        index: index,
      };
      index++;
      this.virtual_rows1.push(v_row2);
      this.user_list.push(temp);
      this.srsales1.push(temp.splice(1, 1));
    }
  }
  // old rys

  row_click1(row, index) {
    if (row.type == 'a') {
      if (this.virtual_rows1[row.index + 1].show) {
        this.virtual_rows1[row.index + 1].show = false;
      } else {
        this.virtual_rows1[row.index + 1].show = true;
      }

      var arr = [
        {
          V_Name:
            this.user_list[row.index - 1][0] +
            ' => ' +
            this.srsales1[row.index + 1][0],
        },
      ];
      this.create_model1(arr, row.index + 1);
    }
  }
  create_model1(model, index) {
    this.selected_ch1[index] = [];
    if (model[0]) {
      for (var i = 0; i < model.length; i++) {
        let ch = model[i];
        let temp = Object.keys(ch).map((key) => ch[key]);
        for (var j = 1; j < temp.length; j++) {
          if (temp[j] != null) {
            temp[j] = temp[j];
          }
        }
        this.selected_ch1[index].push(temp);
      }
    }
  }
}
