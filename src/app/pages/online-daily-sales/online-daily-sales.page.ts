import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { getSrSalesUsersResponse } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';
import { StorageService } from 'src/app/shared/storage.service';
import { SrSaleService } from './sr-sale.service';

@Component({
  selector: 'app-online-daily-sales',
  templateUrl: './online-daily-sales.page.html',
  styleUrls: ['./online-daily-sales.page.scss'],
})
export class OnlineDailySalesPage implements OnInit {
  IsDetailsShowing = true;
  IsDCDDetailsShowing = false;
  selectedSegment: string = 'DSD';
  userId: string;
  today = new Date();
  cities: { City: string }[] = [];
  selected_dcN;
  dropdownListN: any[] = [];
  selected_dc: any[] = [];
  dropdownList: any[] = [];
  showSelect = false;
  ctrl: any = {};
  srsales1 = [];
  virtual_rows1 = [];
  user_list = [];
  srsales2 = [];
  virtual_rows2 = [];
  selected_ch2 = [];
  isVisible = undefined;
  Load_Detail = [
    {
      Id: '',
      Driver: '',
    },
  ];

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private storageSevice: StorageService,
    private srSalesService: SrSaleService,
    private SharedService: SharedService,
    private platform: Platform,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.selected_dcN = [];
    this.today = new Date(this.today.setDate(this.today.getDate() - 2));
    this.loadingCtrl
      .create({
        message: 'Please wait...',
      })
      .then((loadingEl) => {
        this.storageSevice.get('user_id').then((userId) => {
          if (userId) {
            this.userId = userId;
            this.srSalesService.getUserDc(userId).subscribe((cities) => {
              cities.forEach((city, index) => {
                this.selected_dcN.push(city.City);
                this.dropdownListN.push({ id: index, itemName: city.City });
                this.selected_dc.push(city.City);
                this.dropdownList.push({ id: index, itemName: city.City });
              });
              this.showSelect = true;
              loadingEl.dismiss();
              this.getSrSalesUsersNDSD();
              this.getSrSalesUsers();
            });
          }
        });
      });
  }

  getSrSalesUsersNDSD() {
    this.srSalesService
      .getSrSalesUsersNDSD(this.selected_dcN.join(), this.today.toISOString())
      .subscribe((res: Data[]) => {
        if (res.length) this.createTotalNonDsdModal(res);
      });
  }

  async getSrSalesUsers() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.srSalesService
      .getSrSalesUsers(
        this.userId,
        this.selected_dc.join(),
        this.today.toISOString()
      )
      .subscribe((res) => {
        if (res.length) this.createDsdModal(res);
        loading.dismiss();
      });
  }

  createDsdModal(model: getSrSalesUsersResponse[]) {
    var changeObjKey = [];
    model.forEach((element) => {
      changeObjKey.push({
        Route: element.Route,
        Visitor: element.Visitor,
        Driver: element.Driver,
        Pln: element.Pln,
        Inv: element.Inv,
        Per: element['%'],
        OOR: element.OOR,
        Total: element.Total,
        NotINV: element.NotINV,
        Sale: element.Sale,
        PPED: element.PPED,
      });
    });
    this.ctrl.data = changeObjKey;
    this.srsales1 = [];
    this.virtual_rows1 = [];
    this.user_list = [];
    let keys = Object.keys(model[0]);
    keys.splice(1, 2);
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
      this.srsales1.push(temp);
    }
  }

  createTotalNonDsdModal(model) {
    this.srsales2 = [];
    this.virtual_rows2 = [];
    let keys = Object.keys(model[0]);
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
        if (temp[j] != null) temp[j] = temp[j];
      }
      this.srsales2.push(temp);
      let v_row1 = {
        type: 'a',
        show: true,
        index: index,
      };
      index++;
      this.srsales2.push(temp);
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

  Show_Load_Detail(row, index) {
    if (this.isVisible == index) {
      this.isVisible = undefined;
      return;
    }
    this.Load_Detail = [
      {
        Id: row.Route + ' => ' + row.Visitor,
        Driver: ' Driver : ' + row.Driver,
      },
    ];
    this.isVisible = index;
  }

  row_click2(row) {
    if (row.type == 'a') {
      if (this.virtual_rows2[row.index + 1].show) {
        this.virtual_rows2[row.index + 1].show = false;
      } else {
        this.virtual_rows2[row.index + 1].show = true;
      }
      this.srSalesService
        .getSrSalesNDSDDetail(
          this.selected_dcN,
          this.today.toISOString(),
          this.srsales2[row.index][0]
        )
        .subscribe((customer_histories) => {
          this.createNonDsdModal(customer_histories, row.index + 1);
        });
    }
  }

  createNonDsdModal(model, index) {
    this.selected_ch2[index] = [];
    if (model[0]) {
      let keys = Object.keys(model[0]);
      this.srsales2.push(keys);
      for (var i = 0; i < model.length; i++) {
        let ch = model[i];
        let temp = Object.keys(ch).map((key) => ch[key]);
        for (var j = 1; j < temp.length; j++) {
          if (temp[j] != null) {
            temp[j] = temp[j];
          }
        }
        this.selected_ch2[index].push(temp);
      }
    }
  }

  refresh() {
    this.dsdChanged();
    this.nonDsdChanged();
  }

  dsdChanged() {
    console.log(this.selected_dc);
  }

  nonDsdChanged() {
    console.log(this.selected_dcN);
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.target.value;
  }

  tableDetails(item) {
    console.log(item);
    return typeof item == 'number' ? true : false;
  }
  //

  async showAlert() {
    if (!this.dropdownList.length) {
      this.SharedService.toast('danger', 'کافه مورد نظر را انتخاب کنید');
      return;
    }
    this.prepareInput();
    let buttons = [
      {
        text: 'همه',
        cssClass: 'all-none-button',
        handler: () => {
          alert.inputs = alert.inputs.map((checkbox) => {
            checkbox.checked = true;
            return checkbox;
          });

          return false;
        },
      },
      {
        text: 'هیچکدام',
        cssClass: 'all-none-button',
        handler: () => {
          alert.inputs = alert.inputs.map((checkbox) => {
            checkbox.checked = false;
            return checkbox;
          });
          return false;
        },
      },
      {
        text: 'باشه',
        handler: (data) => {
          console.log(data);
        },
      },
      {
        text: 'بیخیال',
        role: 'cancel',
      },
    ];

    // adjust button order in four button layout for ios
    if (this.platform.is('ios')) {
      const okButton = { ...buttons[2] };
      const cancelButton = { ...buttons[3] };
      buttons = [buttons[0], buttons[1], cancelButton, okButton];
    }

    const alert = await this.alertCtrl.create({
      header: 'انتخاب کاربر',
      inputs: this.input,
      cssClass: 'four-button-alert',
      buttons: [...buttons],
    });

    await alert.present();
  }

  input = [];
  prepareInput() {
    if (!this.dropdownList.length) {
      this.SharedService.toast('danger', 'کافه مورد نظر را انتخاب کنید');
      return;
    }
    this.input = [];
    this.dropdownList.forEach((u) =>
      this.input.push({
        label: u.itemName,
        type: 'checkbox',
        value: u.id,
        checked: false,
      })
    );

    this.loadingCtrl.dismiss();
  }
}
