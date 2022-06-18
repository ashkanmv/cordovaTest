import { Component, OnInit, ViewChild } from '@angular/core';
import { Language } from 'src/app/shared/common';
import { LanguageService } from 'src/app/shared/language.service';
import { IonDatetime, LoadingController } from '@ionic/angular';
import { StorageService } from 'src/app/shared/storage.service';
import { SrSalesHourlyCityService } from './sr-sales-hourly-city.service';
import { Data } from '@angular/router';
import { format, parseISO, getDate, getMonth, getYear } from 'date-fns';


@Component({
  selector: 'app-online-sale-days-hourly',
  templateUrl: './online-sale-days-hourly.page.html',
  styleUrls: ['./online-sale-days-hourly.page.scss'],
})
export class OnlineSaleDaysHourlyPage implements OnInit {
  showPerInvoiceDate = false;
  selected_date = new Date().toISOString();
  selected_dateN = new Date().toISOString();
  selected_fromdateN = new Date().toISOString();
  selected_todateN = new Date().toISOString();
  srsales1 = [];
  user_list = [];
  user_list2 = [];
  dc = [];
  dcN: any = [];
  selected_dc: any = [];
  selected_dcN: any = [];
  today;
  sr1
  srsales2 = [];
  virtual_rows1 = [];
  virtual_rows2 = [];
  categories1 = [];
  selected_ch1 = [];
  selected_ch2 = [];
  type1 = "sales";
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

  constructor(private languageService: LanguageService,
    private storageService: StorageService,
    private loadingCtrl: LoadingController,
    private SrSalesHourlyService: SrSalesHourlyCityService) { }

  // mock  invoices data
  public invoicesData: Array<any> = [
    {
      route: 1101,
      zeroToNine: 34,
      nineToTwelve: 3,
      twelveToFifteen: 7.2,
      fifteenToEighteen: 62,
      EighteenToTwentyOne: 8.2,
      TwentyOnToTwentyFour: 85.2,
      total: 782,
    },
    {
      route: 1102,
      zeroToNine: 3,
      nineToTwelve: 5,
      twelveToFifteen: 27,
      fifteenToEighteen: 2,
      EighteenToTwentyOne: 82,
      TwentyOnToTwentyFour: 92,
      total: 782,
    },
    {
      route: 1103,
      zeroToNine: 14,
      nineToTwelve: 9,
      twelveToFifteen: 72,
      fifteenToEighteen: 2,
      EighteenToTwentyOne: 82,
      TwentyOnToTwentyFour: 8,
      total: 782,
    },
    {
      route: 1104,
      zeroToNine: 24,
      nineToTwelve: 3,
      twelveToFifteen: 92,
      fifteenToEighteen: 2,
      EighteenToTwentyOne: 52,
      TwentyOnToTwentyFour: 2,
      total: 782,
    },
  ];

  segmentChanged(event: any) {
    // console.log(event.target.value);
    this.selectedSegment = event.target.value;
  }

  toggleNestedTabelRow_1() {
    this.nestedTableIsShowingRow_1 = !this.nestedTableIsShowingRow_1;
  }

  ngOnInit() {
    this.storageService.get('user_id').then(user_id => {
      this.user_id = Number(user_id);
      this.get_dc();
      this.get_dcN();
    })
  }

  distance_select() {
    this.dcSelect();
    this.dcSelectN();
  }

  async get_dcN() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.SrSalesHourlyService.getUserDc(this.user_id)
      .subscribe(
        dcs => {
          this.dcN = dcs;
          for (var i = 0; i < this.dcN.length; i++) {
            this.selected_dcN.push(this.dcN[i].City);
            this.dropdownListN.push({ "id": i, "itemName": this.dc[i].City , "group" : this.language.Online_Sale_Days_Hourly.group });
          }
          this.selectedItemsN = this.dropdownListN;
          loading.dismiss()
          this.after_get_Dcn();
        });
  }

  async after_get_Dcn() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.SrSalesHourlyService.getsrsalesuserscityhourlydate(this.user_id, this.selected_dcN.join(), this.selected_fromdateN, this.selected_todateN)
      .subscribe(
        (SrSales: Data[]) => {
          if (SrSales.length) {
            this.create_total_model2(SrSales);
          } else {
            this.create_total_model2('Empty');
          }
          loading.dismiss()
        });
  }

  async dcSelect() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.SrSalesHourlyService.getsrsalesuserscityhourlycity(this.user_id, this.selected_dc, this.selected_date)
      .subscribe(
        (srsales: Data[]) => {
          if (srsales.length) {
            this.create_total_model1(srsales);
          } else {
            this.create_total_model1('Empty');
          }
          loading.dismiss();
        });

  }

  async get_dc() {
    try {
      const loading = await this.loadingCtrl.create({
        message: 'Please wait...',
      });
      await loading.present();
      this.SrSalesHourlyService.getUserDc(this.user_id)
        .subscribe(
          (dcs: Data[]) => {
            this.dc = dcs;
            for (var i = 0; i < this.dc.length; i++) {
              this.selected_dc.push(this.dc[i].City);
              this.dropdownList.push({ "id": i, "itemName": this.dc[i].City , "group" : 'dc' });
            }
            this.selectedItems = this.dropdownList;
            loading.dismiss();
            this.after_get_Dc();
          });
    } catch (error) {
      alert(error);
    }
  }

  async dcSelectN() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();

    this.SrSalesHourlyService.getsrsalesuserscityhourlydate(this.user_id, this.selected_dcN, this.selected_fromdateN, this.selected_todateN)
      .subscribe(
        (srsales: Data[]) => {
          if (srsales.length) {
            this.create_total_model2(srsales);
          } else {
            this.create_total_model2('Empty');
          }
          loading.dismiss();
        });
  }

  async SelectedDCN() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.selected_dcN = [];
    for (var i = 0; i < this.selectedItemsN.length; i++) {
      this.selected_dcN.push(this.selectedItemsN[i].itemName);
    }

    if (this.selectedItemsN.length) {
      this.SrSalesHourlyService.getsrsalesuserscityhourlydate(this.user_id, this.selected_dcN, this.selected_fromdateN, this.selected_todateN)
        .subscribe(
          (srsales: Data[]) => {
            if (srsales.length)
              this.create_total_model2(srsales);

            loading.dismiss();
          });
    }
    else {
      this.create_total_model1("Empty");
      loading.dismiss();
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
      index: 0
    }
    this.srsales2.push(keys);
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
      this.user_list2.push(temp);
      this.srsales2.push(temp);
      let v_row1 = {
        type: 'a',
        show: true,
        index: index
      }
      index++;
      this.virtual_rows2.push(v_row1);
      let v_row2 = {
        type: 'b',
        show: false,
        index: index
      }
      index++;
      this.virtual_rows2.push(v_row2);
      this.user_list2.push(temp);
      this.srsales2.push(temp.splice(1, 1));
    }
  }

  after_get_Dc() {
    this.SrSalesHourlyService.getsrsalesuserscityhourlycity(this.user_id, this.selected_dc.join(), this.selected_date)
      .subscribe(
        (SrSales: Data[]) => {
          if (SrSales.length) {
            this.create_total_model1(SrSales);
          } else {
            this.create_total_model1('Empty');
          }
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
      index: 0
    }
    this.srsales1.push(keys);
    this.virtual_rows1.push(v_row);
    let index = 1;
    for (var i = 0; i < model.length; i++) {
      let ch = model[i];
      let temp = Object.keys(ch).map(key => ch[key]);
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
      this.user_list.push(temp);
      this.srsales1.push(temp.splice(1, 1));
    }
  }

  dateChanged(changed: 'per-kilo' | 'per-invoices') {
    if (changed == 'per-kilo')
      this.dcSelect();
    else
      this.dcSelectN();
  }

  refresh() {
    this.dcSelect();
    this.dcSelectN();
  }

  formatDate(value: string) {
    return format(parseISO(value), 'MMM dd yyyy');
  }

  onClick(){
    console.log(this.selected_dc);
    
  }

}
