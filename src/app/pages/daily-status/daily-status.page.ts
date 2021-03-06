import { Component, OnInit } from '@angular/core';
import {  LoadingController } from '@ionic/angular';
import { ThemeColors, Language } from 'src/app/shared/common';
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
  loadings: LoadingController[] = [];
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
  selected_dc_t;
  selected_dc;
  selected_ch1 = [];
  selected_ch_t = [];


  selectedSegment: string = 'tablet';


  public get language(): Language { return this.languageService.language; }
  public get isOnline() { return this.sharedService.isOnline; }
  public get backgroundColor(): ThemeColors { return this.sharedService.themeColor; }

  constructor(private languageService: LanguageService,
    private storageServiec: StorageService,
    private loadingCtrl: LoadingController,
    private dailySalesService: DailyStatusService,
    public sharedService: SharedService) { }
  segmentChanged(event: any) {
    this.selectedSegment = event.target.value;
  }

  ngOnInit() {
    this.storageServiec.get('user_id').then(userId => {
      this.userId = userId;
      this.get_dc();
      this.get_dc_t();
    })
    this.tabletDate = new Date().toISOString();
    // this.tabletDate.setDate(this.tabletDate.getDate() - 1);
    // this.tabletDate = this.tabletDate.toISOString()

    this.truckDate = new Date().toISOString();
    // this.truckDate.setDate(this.truckDate.getDate() - 1);
    // this.truckDate = this.truckDate.toISOString();
  }

  ionViewWillLeave() {
    this.removeAllLoadings();
  }

  async get_dc() {
    const key = 'get_dc';
    await this.presentLoading(key);
    this.dailySalesService.getUserDc(this.userId).subscribe(dcs => {
      dcs.forEach((dc, i) => {
        this.truckDropDown.push({
          id: i,
          itemName: dc.City,
          group: this.language.DailyStatus.group
        })
        this.selectedTruckDc.push(dc.City);
      });
      this.dismissLoading(key);
      this.getCommutecity(this.truckDate);
    });
  }

  async getCommutecity(truckDate: string) {
    const key = 'getCommutecity';
    await this.presentLoading(key);
    this.dailySalesService.getCommutecity(this.userId, truckDate, this.selectedTruckDc.join())
      .subscribe(
        (SrSales: any) => {
          if (SrSales.length)
            this.create_total_model1(SrSales);
          else
            this.create_total_model1('Empty');

          this.dismissLoading(key);
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
    const key = 'get_dc_t';
    await this.presentLoading(key);
    this.dailySalesService.getUserDc(this.userId).subscribe(dcs => {
      dcs.forEach((dc, i) => {
        this.tabletDropDown.push({
          id: i,
          itemName: dc.City,
          group: this.language.DailyStatus.group
        })
        this.selectedTabletDc.push(dc.City);
      });
      this.dismissLoading(key);
      this.getCommutecityT(this.tabletDate);
    });
  }

  async getCommutecityT(tabletDate: string) {
    const key = 'getCommutecityT';
    await this.presentLoading(key);
    this.dailySalesService.getCommutecity_T(this.userId, tabletDate, this.selectedTabletDc.join())
      .subscribe((SrSales: any) => {
        if (SrSales.length)
          this.create_total_model_t(SrSales);
        else
          this.create_total_model_t('Empty');

        this.dismissLoading(key);
      });
  }

  async create_total_model_t(model) {
    const key = 'create_total_model_t';
    await this.presentLoading(key);
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
    this.dismissLoading(key);
  }

  tabletDateChanged(selectedDate: string) {
    this.getCommutecityT(selectedDate.slice(0, selectedDate.length - 6));
  }

  truckDateChanged(selectedDate: string) {
    this.getCommutecity(selectedDate.slice(0, selectedDate.length - 6));
  }

  refresh() {
    this.tabletDateChanged(this.tabletDate);
    this.truckDateChanged(this.truckDate);
  }

  async presentLoading(key: string) {
    this.loadings[key] = await this.loadingCtrl.create({
      message: this.language.Loading,
    });
    await this.loadings[key].present();
  }

  dismissLoading(key: string) {
    this.loadings[key]?.dismiss();
    delete this.loadings[key];
  }

  removeAllLoadings() {
    for (const key in this.loadings)
      this.loadings[key].dismiss()
    this.loadings = [];
  }
}
