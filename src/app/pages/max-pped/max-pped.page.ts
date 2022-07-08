import { Component, OnInit, ViewChild } from '@angular/core';
import { Data, Router } from '@angular/router';

import { IonDatetime, LoadingController, NavController } from '@ionic/angular';
import { ThemeColors, Language } from 'src/app/shared/common';
import { LanguageService } from 'src/app/shared/language.service';
import { SharedService } from 'src/app/shared/shared.service';
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
  // old rys
  user_id;
  isVisible = undefined;
  Load_Detail = [
    {
      RouteCode: '',
      VisitorName: '',
    },
  ];

  public get language(): Language {
    return this.languageService.language;
  }
  public get isOnline() {
    return this.sharedService.isOnline;
  }
  public get backgroundColor(): ThemeColors { return this.sharedService.themeColor; }

  constructor(
    private router: Router,
    private navController: NavController,
    private languageService: LanguageService,
    private storageService: StorageService,
    private srPpedService: MaxPpedService,
    private loadingCtrl: LoadingController,
    public sharedService: SharedService
  ) {
  }

  ngOnInit() {
    this.storageService.get('user_id').then((user_id) => {
      this.userId = Number(user_id);
      this.get_dc();
      this.get_dcN();
    });
  }

  dateChanged(segment: 'per-route' | 'per-customer') {
    if (segment == 'per-customer') this.selectedDC();
    else this.selectedDCN();
  }

  refresh() {
    this.selectedDCN();
    this.selectedDC();
  }

  async get_dc() {
    const loading = await this.loadingCtrl.create({
      message: this.language.Loading,
    });
    await loading.present();
    this.srPpedService.getUserDc(this.userId).subscribe((dcs: Data[]) => {
      this.dc = dcs;
      for (var i = 0; i < this.dc.length; i++) {
        this.dropdownList.push({
          id: i,
          itemName: this.dc[i].City,
          group: this.language.Max_PPED.group,
        });
      }
      this.selectedItems = this.dropdownList.map((_) => _.itemName);

      loading.dismiss();
      this.selectedDC();
    });
  }

  create_total_model1(model) {
    var changeObjKey = [];
    model.forEach((element) => {
      changeObjKey.push({
        RouteCode: element.RouteCode,
        Cluster: element.Cluster,
        VisitorName: element.VisitorName,
        CustomerNumber: element.CustomerNumber,
        StoreName: element.StoreName,
        Sale: element.Sale,
        PPED: element.PPED,
        Percentage: element.Percentage,
      });
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
      index: 0,
    };
    this.srpped1.push(keys);
    this.virtual_rows1.push(v_row);
    let index = 1;
    for (var i = 0; i < model.length; i++) {
      let ch = model[i];
      this.user_list.push(Object.keys(ch).map((key) => ch[key]));
      let temp = Object.keys(ch).map((key) => ch[key]);
      for (var j = 1; j < temp.length; j++) {
        if (temp[j] != null) {
          temp[j] = temp[j];
        }
      }
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
      temp.splice(1, 2);
      this.srpped1.push(temp);
    }
  }

  async get_dcN() {
    const loading = await this.loadingCtrl.create({
      message: this.language.Loading,
    });
    await loading.present();
    this.srPpedService.getUserDc(this.userId).subscribe((dcs: Data[]) => {
      this.dcN = dcs;
      for (var i = 0; i < this.dcN.length; i++)
        this.dropdownListN.push({
          id: i,
          itemName: this.dc[i].City,
          group: this.language.Max_PPED.group,
        });
      this.selectedItemsN = this.dropdownListN.map((_) => _.itemName);
      loading.dismiss();
      this.selectedDCN();
    });
  }

  async selectedDCN() {
    const loading = await this.loadingCtrl.create({
      message: this.language.Loading,
    });
    await loading.present();

    if (!this.selectedItemsN.length) {
      this.create_total_model2('Empty');
      loading.dismiss();
      return;
    }

    this.srPpedService
      .getSrPpedPerRoute(
        this.selectedItemsN.join(),
        this.selected_fromdateN.slice(0, this.selected_fromdateN.length - 6),
        this.selected_todateN.slice(0, this.selected_todateN.length - 6)
      )
      .subscribe((srsales: Data[]) => {
        if (srsales.length) this.create_total_model2(srsales);
        else this.create_total_model2('Empty');
        loading.dismiss();
      });
  }

  async selectedDC() {
    const loading = await this.loadingCtrl.create({
      message: this.language.Loading,
    });
    await loading.present();

    if (!this.selectedItems.length) {
      // this.create_total_model1('Empty');
      loading.dismiss();
      return;
    }

    this.srPpedService
      .getSrPpedPerCustomer(
        this.selectedItems.join(),
        this.selected_fromdate.slice(0, this.selected_fromdate.length - 6),
        this.selected_todate.slice(0, this.selected_todate.length - 6)
      )
      .subscribe((srsales: Data[]) => {
        if (srsales.length != 0) this.create_total_model1(srsales);
        // else this.create_total_model1('Empty');
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
      index: 0,
    };
    this.srpped2.push(keys);
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
      this.srpped2.push(temp);
      let v_row1 = {
        type: 'a',
        show: true,
        index: index,
      };
      index++;
      this.srpped2.push(temp);
      this.virtual_rows2.push(v_row1);
      let v_row2 = {
        type: 'b',
        show: false,
        index: index,
      };
      index++;
      this.virtual_rows2.push(v_row2);
    }
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.target.value;
  }
  // old rys
  Show_Load_Detail(row, index) {
    if (this.isVisible == index) {
      this.isVisible = undefined;
      return;
    }
    this.Load_Detail = [
      {
        RouteCode: 'RouteCode : ' + row.RouteCode,
        VisitorName: ' VisitorName : ' + row.VisitorName,
      },
    ];
    this.isVisible = index;
  }
  //   row_clickCustomer(CustomerNumber) {
  //     this.storageService
  //       .set('Customer_Number', CustomerNumber)
  //       .then((Customer_Number) => {
  //         this.navController.push(CustomerHistoryPage);
  //       });
  //   }

  row_clickCustomer(customerCode) {
    this.router.navigate(['/customer-history'], {
      queryParams: { customerNumber: customerCode },
    });
  }
  async row_click2(row) {
    if (row.type == 'a') {
      if (this.virtual_rows2[row.index + 1].show) {
        this.virtual_rows2[row.index + 1].show = false;
      } else {
        this.virtual_rows2[row.index + 1].show = true;
      }
      const loading = await this.loadingCtrl.create({
        message: this.language.Loading,
      });
      await loading.present();

      this.srPpedService
        .getSrPpedPerRouteDetail(
          this.selectedItemsN.join(),
          this.selected_fromdateN,
          this.selected_todateN,
          this.srpped2[row.index][0]
        )
        .subscribe((customer_histories) => {
          this.create_model2(customer_histories, row.index + 1);
          loading.dismiss();
        });
    }
  }

  selected_ch2 = [];
  srpped3 = [];
  create_model2(model, index) {
    //this.loading.present();
    this.selected_ch2[index] = [];
    if (model[0]) {
      let keys = Object.keys(model[0]);
      this.srpped3.push(keys);
      this.selected_ch2[index].push(keys);
      for (var i = 0; i < model.length; i++) {
        let ch = model[i];
        let temp = Object.keys(ch).map((key) => ch[key]);
        for (var j = 1; j < temp.length; j++) {
          if (temp[j] != null) {
            //temp[j] = parseFloat(temp[j]).toFixed(2);
            temp[j] = temp[j];
          }
        }
        this.selected_ch2[index].push(temp);
      }
    }
    //this.loading.dismiss();
  }
}
