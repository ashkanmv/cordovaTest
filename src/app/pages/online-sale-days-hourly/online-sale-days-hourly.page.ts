import { Component, OnInit, ViewChild } from '@angular/core';
import { Language } from 'src/app/shared/common';
import { LanguageService } from 'src/app/shared/language.service';
import { IonDatetime, LoadingController } from '@ionic/angular';
import { StorageService } from 'src/app/shared/storage.service';
import { SrSalesHourlyCityService } from './sr-sales-hourly-city.service';
import { Data } from '@angular/router';
import { format, parseISO, getDate, getMonth, getYear } from 'date-fns';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-online-sale-days-hourly',
  templateUrl: './online-sale-days-hourly.page.html',
  styleUrls: ['./online-sale-days-hourly.page.scss'],
})
export class OnlineSaleDaysHourlyPage implements OnInit {
  showPerInvoiceDate = false;
  selected_date = new Date().toISOString();
  selected_dateN = new Date().toISOString();
  srsales1 = [];
  user_list = [];
  user_list2 = [];
  dc = [];
  dcN: any = [];
  today;
  sr1;
  srsales2 = [];
  virtual_rows1 = [];
  virtual_rows2 = [];
  categories1 = [];
  selected_ch1 = [];
  selected_ch2 = [];
  type1 = 'sales';
  hide = true;
  categories = [];
  user_id;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  dropdownListN = [];
  selectedItemsN = [];
  dropdownSettingsN = {};
  // @ViewChild('perInvoicesDate') dateTime: IonDatetime;
  public get language(): Language {
    return this.languageService.language;
  }
  public get selectedLanguage(): Language {
    return this.languageService.language;
  }

  dateNow = new Date();
  selectedSegment: string = 'per-kilo';

  nestedTableIsShowingRow_1: boolean = false;

  public get isOnline() {
    return this.sharedService.isOnline;
  }
  constructor(
    private languageService: LanguageService,
    private storageService: StorageService,
    private loadingCtrl: LoadingController,
    private SrSalesHourlyService: SrSalesHourlyCityService,
    private sharedService: SharedService
  ) { }



  segmentChanged(event: any) {
    this.selectedSegment = event.target.value;
  }


  ngOnInit() {
    this.storageService.get('user_id').then((user_id) => {
      this.user_id = Number(user_id);
      this.get_dc();
      this.get_dcN();
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
          for (var i = 0; i < this.dc.length; i++)
            this.dropdownList.push({
              id: i,
              itemName: this.dc[i].City,
              group: this.language.Online_Sale_Days_Hourly.group,
            });
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

  async get_dcN() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.SrSalesHourlyService.getUserDc(this.user_id).subscribe(
      (dcs: Data[]) => {
        this.dcN = dcs;
        for (var i = 0; i < this.dcN.length; i++) {
          this.dropdownListN.push({
            id: i,
            itemName: this.dc[i].City,
            group: this.language.Online_Sale_Days_Hourly.group,
          });
        }
        this.selectedItemsN = this.dropdownListN.map((_) => _.itemName);
        loading.dismiss();
        this.dcSelectN();
      }
    );
  }

  async dcSelect() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    if (!this.selectedItems.length) {
      this.create_total_model1('Empty');
      loading.dismiss();
      return;
    }

    this.SrSalesHourlyService.getSrSalesUsers(
      this.user_id,
      this.selectedItems.join(),
      this.selected_date.slice(0, this.selected_date.length - 6)
    ).subscribe((srsales: Data[]) => {
      if (srsales.length != 0) this.create_total_model1(srsales);
      else this.create_total_model1('Empty');
      loading.dismiss();
    });
  }

  async dcSelectN() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();

    if (!this.selectedItemsN.length) {
      this.create_total_model1('Empty');
      loading.dismiss();
      return;
    }

    this.SrSalesHourlyService.getsrsalesuserscityhourlyqty(
      this.user_id,
      this.selectedItemsN.join(),
      this.selected_dateN.slice(0, this.selected_dateN.length - 6)
    ).subscribe((srsales: Data[]) => {
      if (srsales.length) this.create_total_model2(srsales);
      else this.create_total_model2('Empty');

      loading.dismiss();
    });
  }

  dateChanged(changed: 'per-kilo' | 'per-invoices') {
    if (changed == 'per-kilo') this.dcSelect();
    else this.dcSelectN();
  }

  refresh() {
    this.dcSelect();
    this.dcSelectN();
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

  create_total_model2(model) {
    this.srsales2 = [];
    this.virtual_rows2 = [];
    this.user_list2 = [];
    let keys = Object.keys(model[0]);
    keys.splice(1, 1);
    let v_row = {
      type: 'h',
      show: true,
      index: 0,
    };
    this.srsales2.push(keys);
    this.virtual_rows2.push(v_row);
    let index = 1;
    for (var i = 0; i < model.length; i++) {
      let ch = model[i];
      let temp = Object.keys(ch).map((key) => ch[key]);
      for (var j = 1; j < temp.length; j++) {
        if (temp[j] != null) {
          temp[j] = temp[j];
        }
      }
      this.user_list2.push(temp);
      this.srsales2.push(temp);
      let v_row1 = {
        type: 'a',
        show: true,
        index: index,
      };
      index++;
      this.virtual_rows2.push(v_row1);
      let v_row2 = {
        type: 'b',
        show: false,
        index: index,
      };
      index++;
      this.virtual_rows2.push(v_row2);
      this.user_list2.push(temp);
      this.srsales2.push(temp.splice(1, 1));
    }
  }
  row_click1(row, index) {
    if (row.type == 'a') {
      if (this.virtual_rows1[row.index + 1].show) {
        this.virtual_rows1[row.index + 1].show = false;
      } else {
        this.virtual_rows1[row.index + 1].show = true;
      }
      var arr = [{ V_Name: this.user_list[row.index - 1][0] + ' => ' + this.srsales1[(row.index + 1)][0] }];
      this.create_model1(arr, row.index + 1);
    }
  }

  create_model1(model, index) {
    this.selected_ch1[index] = [];
    if (model[0]) {
      for (var i = 0; i < model.length; i++) {
        let ch = model[i];
        let temp = Object.keys(ch).map(key => ch[key]);
        for (var j = 1; j < temp.length; j++) {
          if (temp[j] != null) {
            temp[j] = temp[j];
          }
        }
        this.selected_ch1[index].push(temp);
      }
    }
  }

  row_click2(row) {
    if (row.type == 'a') {
      if (this.virtual_rows2[row.index + 1].show) {
        this.virtual_rows2[row.index + 1].show = false;
      } else {
        this.virtual_rows2[row.index + 1].show = true;
      }
      var arr = [{ V_Name: this.user_list2[row.index - 1][0] + " => " + this.srsales1[row.index + 1][0] }];
      this.create_model2(arr, row.index + 1);
    }
  }

  create_model2(model, index) {
    this.selected_ch2[index] = [];
    if (model[0]) {
      for (var i = 0; i < model.length; i++) {
        let ch = model[i];
        let temp = Object.keys(ch).map(key => ch[key]);
        for (var j = 1; j < temp.length; j++)
          if (temp[j] != null) temp[j] = temp[j];

        this.selected_ch2[index].push(temp);
      }
    }
  }

}
