import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, LoadingController } from '@ionic/angular';
import { Language } from 'src/app/shared/common';
import { LanguageService } from 'src/app/shared/language.service';
import { SharedService } from 'src/app/shared/shared.service';
import { StorageService } from 'src/app/shared/storage.service';
import { DailyStatusService } from './daily-status.service';

@Component({
  selector: 'app-daily-status',
  templateUrl: './daily-status.page.html',
  styleUrls: ['./daily-status.page.scss'],
})
export class DailyStatusPage implements OnInit {
  tabletDate;
  truckDate;
  userId;
  truckDropDown = [];
  selectedTruckDc = [];
  tabletDropDown = [];
  selectedTabletDc = [];
  commutes = [];
  virtual_rows = [];
  commutes_t = [];
  virtual_rows_t = [];
  // old rys
  selected_dc_t ;
  selected_ch_t = [];
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;

  
  selectedSegment: string = 'tablet';
  

  public get language(): Language { return this.languageService.language; }
  public get isOnline(){
    return this.sharedService.isOnline;
  }

  constructor(private languageService: LanguageService,
    private storageServiec: StorageService,
    private loadingCtrl: LoadingController,
    private dailySalesService: DailyStatusService,
    private dailyStatusService : DailyStatusService,
    private sharedService : SharedService) { }
  segmentChanged(event: any) {
    this.selectedSegment = event.target.value;
  }

  confirm() {
    this.datetime.confirm();
  }

  reset() {
    this.datetime.reset();
  }
  ngOnInit() {
    this.storageServiec.get('user_id').then(userId => {
      this.userId = userId;
      this.get_dc();
      this.get_dc_t();
    })
    this.tabletDate = new Date()
    this.tabletDate.setDate(this.tabletDate.getDate() - 1);
    this.tabletDate = this.tabletDate.toISOString()

    this.truckDate = new Date()
    this.truckDate.setDate(this.truckDate.getDate() - 1);
    this.truckDate = this.truckDate.toISOString();
  }

  async get_dc() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.dailySalesService.getUserDc(this.userId).subscribe(dcs => {
      dcs.forEach((dc, i) => {
        this.truckDropDown.push({
          id: i,
          itemName: dc.City,
          group: this.language.DailyStatus.group
        })
        this.selectedTruckDc.push(dc.City);
      });
      loading.dismiss();
      this.getCommutecity();
    });
  }

  async getCommutecity() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.dailySalesService.getCommutecity(this.userId, this.truckDate, this.selectedTruckDc.join())
      .subscribe(
        (SrSales: any) => {
          if (SrSales.length)
            this.create_total_model1(SrSales);
          else
            this.create_total_model1('Empty');

            loading.dismiss()
        });
  }

  create_total_model1(model) {
    this.commutes = [];
    this.virtual_rows = [];
    let keys = Object.keys(model[0]);
    let v_row = {
      type: 'h',
      show: true,
      index: 0
    }
    this.commutes.push(keys);
    this.virtual_rows.push(v_row);
    let index = 1;
    for (var i = 0; i < model.length; i++) {
      let ch = model[i];
      let temp = Object.keys(ch).map(key => ch[key]);
      for (var j = 1; j < temp.length; j++) {
        if (temp[j] != null) {
          temp[j] = temp[j];
        }

      }
      this.commutes.push(temp);
      let v_row1 = {
        type: 'a',
        show: true,
        index: index
      }
      index++;
      this.commutes.push(temp);
      this.virtual_rows.push(v_row1);
      let v_row2 = {
        type: 'b',
        show: false,
        index: index
      }
      index++;
      this.virtual_rows.push(v_row2);
    }
  }

  async get_dc_t() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.dailySalesService.getUserDc(this.userId).subscribe(dcs => {
      dcs.forEach((dc, i) => {
        this.tabletDropDown.push({
          id: i,
          itemName: dc.City,
          group: this.language.DailyStatus.group
        })
        this.selectedTabletDc.push(dc.City);
      });
      loading.dismiss();
      this.getCommutecityT();
    });
  }

  async getCommutecityT() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.dailySalesService.getCommutecity_T(this.userId, this.tabletDate, this.selectedTabletDc.join())
      .subscribe((SrSales: any) => {
        if (SrSales.length)
          this.create_total_model_t(SrSales);
        else
          this.create_total_model_t('Empty');

          loading.dismiss()
      });
  }

  async create_total_model_t(model) {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.commutes_t = [];
    this.virtual_rows_t = [];
    let keys = Object.keys(model[0]);
    let v_row = {
      type: 'h',
      show: true,
      index: 0
    }
    this.commutes_t.push(keys);
    this.virtual_rows_t.push(v_row);
    let index = 1;
    for (var i = 0; i < model.length; i++) {
      let ch = model[i];
      let temp = Object.keys(ch).map(key => ch[key]);
      for (var j = 1; j < temp.length; j++) {
        if (temp[j] != null) {
          temp[j] = temp[j];
        }

      }
      this.commutes_t.push(temp);
      let v_row1 = {
        type: 'a',
        show: true,
        index: index
      }
      index++;
      this.commutes_t.push(temp);
      this.virtual_rows_t.push(v_row1);
      let v_row2 = {
        type: 'b',
        show: false,
        index: index
      }
      index++;
      this.virtual_rows_t.push(v_row2);
    }
    loading.dismiss();
  }
  // old rys
  row_click_t(row) {
    if (row.type == 'a') {
      if (this.virtual_rows_t[row.index + 1].show) {
        this.virtual_rows_t[row.index + 1].show = false;
      } else {
        this.virtual_rows_t[row.index + 1].show = true;
      }
        this.dailyStatusService.getCommuteDetail(this.selectedTabletDc, this.commutes_t[row.index][0])
          .subscribe(
          customer_histories => {
            this.create_model_t(customer_histories, row.index + 1);
          });
    }
  }

  create_model_t(model, index) {
    this.selected_ch_t[index] = [];
    if (model[0]) {
      let keys = Object.keys(model[0]);
      this.commutes_t.push(keys)
      for (var i = 0; i < model.length; i++) {
        let ch = model[i];
        let temp = Object.keys(ch).map(key => ch[key]);
        for (var j = 1; j < temp.length; j++) {
          if (temp[j] != null) {
            temp[j] = temp[j];
          }
        }
        this.selected_ch_t[index].push(temp);
      }
    }
  }
}
