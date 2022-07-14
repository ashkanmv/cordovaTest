import { Component, OnInit, ViewChild } from '@angular/core';
import { IonDatetime, LoadingController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { ThemeColors, Language } from 'src/app/shared/common';
import { LanguageService } from 'src/app/shared/language.service';
import { SharedService } from 'src/app/shared/shared.service';
import { StorageService } from 'src/app/shared/storage.service';
import { UtilService } from 'src/app/shared/util.service';
import { LoadingTruckStatusService } from './loading-truck-status.service';

@Component({
  selector: 'app-loading-truck-status',
  templateUrl: './loading-truck-status.page.html',
  styleUrls: ['./loading-truck-status.page.scss'],
})
export class LoadingTruckStatusPage implements OnInit {
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;
  loadings: LoadingController[] = [];
  userId;
  selected_date = new Date().toISOString();
  IsDetailsShowing = true;
  selectedItems = [];
  dropdownList = [];
  ctrl: any = {};
  loadtruck1 = [];
  virtual_rows1 = [];
  user_list = [];
  isVisible=undefined;
  DriverName;
  server;

  public get language(): Language {
    return this.languageService.language;
  }
  public get backgroundColor(): ThemeColors { return this.sharedService.themeColor; }


  constructor(
    private languageService: LanguageService,
    private storageService: StorageService,
    private loadingTruckService: LoadingTruckStatusService,
    private loadingCtrl: LoadingController,
    private UtilService: UtilService,
    public sharedService: SharedService
  ) { }

  

  ngOnInit() {
    this.storageService.get('user_id').then((user_id) => {
      if (user_id !== undefined && user_id !== null) {
        this.userId = Number(user_id);
        this.get_dc();
      }
    });
  }

  ionViewWillLeave() {
    this.removeAllLoadings()
  }

  async get_dc() {
    const key = 'get_dc';
    this.presentLoading(key);
    this.loadingTruckService.getUserDc(this.userId)
      .subscribe(
        dcs => {
          dcs.forEach((dc, i) => {
            this.selectedItems.push(dc.City);
            this.dropdownList.push({ "id": i, "itemName": dc.City, "group": this.language.Loading_Truck_Status.Group });
          });
          this.dismissLoading(key);
          this.getLoadTruckCity()
        });
  }

  async getLoadTruckCity() {
    const key = 'getLoadTruckCity';
    this.presentLoading(key);

    if (!this.selectedItems.length) {
      this.create_total_model1("Empty");
      this.dismissLoading(key);
      return
    }

    this.loadingTruckService.getLoadTruckCity(this.userId, this.selected_date.slice(0, this.selected_date.length - 6), this.selectedItems.join())
      .subscribe(
        (SrSales: any) => {
          if (SrSales.length != 0)
            this.create_total_model1(SrSales);
          else
            this.create_total_model1('Empty');

          this.dismissLoading(key);
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

  Load_Detail: any =[{
    Cat:'',
    SKU:'',
    Load:0,
    Sale:0,
    PPED:0,
    Remain:0,

  }];

  set_server_status(vale) {
    this.server = vale;
    this.UtilService.set_server(vale);
  }

  Show_Load_Detail(row , index)
  {
    if(this.isVisible==index)
    {
      this.isVisible=undefined;
      return;
    }
    this.loadingTruckService.getLoadTruckDetail(this.selected_date.slice(0, this.selected_date.length - 6), row.Route)
    .subscribe(
    customer_histories => {
      this.set_server_status(true);
      this.Load_Detail=customer_histories;
      this.DriverName = this.user_list[index][0] + ' => ' + this.user_list[index][1];
      this.isVisible=index;
      this.set_server_status(true);
    },
    error => {
      this.set_server_status(false);
      console.log(error);
    }); 
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
