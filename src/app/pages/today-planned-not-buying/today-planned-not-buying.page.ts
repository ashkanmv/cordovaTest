import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ThemeColors, Language } from 'src/app/shared/common';
import { LanguageService } from 'src/app/shared/language.service';
import { SharedService } from 'src/app/shared/shared.service';
import { StorageService } from 'src/app/shared/storage.service';
import { TodayPlannedService } from './today-planned.service';

@Component({
  selector: 'app-today-planned-not-buying',
  templateUrl: './today-planned-not-buying.page.html',
  styleUrls: ['./today-planned-not-buying.page.scss'],
})
export class TodayPlannedNotBuyingPage implements OnInit {
  loadings: LoadingController[] = [];
  selectedDate = new Date().toISOString();
  userId;
  clusters = [];
  selectedCluster = [];
  clustersList = [];
  dcs: { City: string }[] = [];
  selectedDc = [];
  dcList = [];
  ctrl: any={};
  groupbyedData = [];
  virtual_rows1 = [];
  troutes1 = [];
  isVisible = undefined;


  public get language(): Language { return this.languageService.language;}

  public get isOnline(){return this.sharedService.isOnline;}

  public get backgroundColor(): ThemeColors { return this.sharedService.themeColor; }

  constructor(
    private loadingCtrl: LoadingController,
    private storageService: StorageService,
    private todayPlannedService: TodayPlannedService,
    private languageService: LanguageService,
    public sharedService: SharedService
  ) { }

  ngOnInit() {
    this.storageService.get('user_id').then(userId => {
      this.userId = userId;
      this.getDc();
      this.getCluster();
    })
  }

  ionViewWillLeave() {
    this.removeAllLoadings();
  }

  async getDc() {
    const key = 'getDc';
    await this.presentLoading(key);
    this.todayPlannedService.getUserDc(this.userId).subscribe(res => {
      this.dcs = res;
      this.dcs.forEach((dc, i) => {
        this.selectedDc.push(dc.City);
        this.dcList.push({ "id": i, "itemName": dc.City, group: this.language.Today_Planned_Not_Buying.group });
      });
      this.dismissLoading(key);
      this.checkClusterAndDcsHasValue();
    })
  }

  async getCluster() {
    const key = 'getCluster';
    await this.presentLoading(key);
    this.todayPlannedService.getCluster().subscribe((clusters: any) => {
      this.clusters = clusters;
      this.clusters.forEach((cluster, i) => {
        this.selectedCluster.push(cluster.CustomerType);
        this.clustersList.push({ "id": i, "itemName": cluster.CustomerType, group: this.language.Today_Planned_Not_Buying.group });
      });
      this.dismissLoading(key);
      this.checkClusterAndDcsHasValue();
    })
  }

  checkClusterAndDcsHasValue() {
    if (!this.clusters.length || !this.dcs.length)
      return
    this.getTRoutesCity();
  }

  async getTRoutesCity() {
    const key = 'getTRoutesCity';
    await this.presentLoading(key);
    this.todayPlannedService.getTRoutesCity(this.userId, this.selectedDate.slice(0, this.selectedDate.length - 6), this.selectedDc.join(), this.selectedCluster.join())
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
    this.troutes1 = [];
    this.virtual_rows1 = [];
    this.groupbyedData = [{
      Route: '',
      Visitor: '',
      Others: [{}]
    }];
    let keys = Object.keys(model[0]);

    this.groupbyedData.pop();
    for (var h = 0; h < model.length; h++) {
      if (this.groupbyedData.length == 0) {
        this.groupbyedData.push({
          Route: model[h].Route, Visitor: model[h].Visitor, Others: [{
            CustName: model[h].CustName,
            CustID: model[h].CustID,
            CustomerID: model[h].CustomerID,
            Address: model[h].Address
          }]
        });
      }
      else {
        var indexRoute = this.groupbyedData.findIndex(x => x.Route == model[h].Route);
        if (indexRoute > -1) {
          this.groupbyedData[indexRoute].Others.push({
            CustName: model[h].CustName?.toString(), CustID: model[h].CustID,
            CustomerID: model[h].CustomerID, Address: model[h].Address
          });
        }
        else {
          this.groupbyedData.push({
            Route: model[h].Route, Visitor: model[h].Visitor, Others: [{
              CustName: model[h].CustName,
              CustID: model[h].CustID,
              CustomerID: model[h].CustomerID,
              Address: model[h].Address
            }]
          });
        }

      }
    }


    this.ctrl.data = this.groupbyedData;
    let v_row = {
      type: 'h',
      show: true,
      index: 0
    }
    this.troutes1.push(keys.splice(0, 2));
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

      temp.splice(2, 4);
      this.troutes1.push(temp);
    }
  }

  Show_Load_Detail(row , index)
  {
    if(this.isVisible == index)
    {
      this.isVisible = undefined;
      return;
    }
      this.isVisible=index;
    
  }

  refresh(){
    this.checkClusterAndDcsHasValue();
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
