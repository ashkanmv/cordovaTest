import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MapService } from 'src/app/map/map.service';
import { LoadingController, PopoverController } from '@ionic/angular';
import { ThemeColors, GetAllChildrenUserResponse, GetSalesmenLocationResponse, Language, Marker } from 'src/app/shared/common';
import { LanguageService } from 'src/app/shared/language.service';
import { PersianCalendarService } from 'src/app/shared/persian-calendar.service';
import { StorageService } from 'src/app/shared/storage.service';
import { Subscription } from 'rxjs';
import { SalesmenLocationService } from './salesmen-location.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-salesmen-location',
  templateUrl: './salesmen-location.page.html',
  styleUrls: ['./salesmen-location.page.scss'],
})
export class SalesmenLocationPage implements OnInit {
  showSr = true;
  showRsm = true;
  showAsm = true;
  showSsv = true;
  accessTime = false;
  accessRsm = false;
  accessAsm = false;
  accessSsv = false;
  accessSr = false;
  myUserType;
  userId;
  myUserID;
  markers: Marker[] = [];
  dateNow = new Date();
  show = false;
  form: FormGroup;
  rsms: GetAllChildrenUserResponse[] = [];
  asms: GetAllChildrenUserResponse[] = [];
  ssvs: GetAllChildrenUserResponse[] = [];
  srs: GetAllChildrenUserResponse[] = [];
  selectedRsm: number[] = [];
  selectedAsm: number[] = [];
  selectedSsv: number[] = [];
  selectedSr: number[] = [];
  rsmMarkers: Marker[] = [];
  asmMarkers: Marker[] = [];
  ssvMarkers: Marker[] = [];
  srMarkers: Marker[] = [];
  adminMarkers: Marker[] = [];
  userIds = [];
  mapInitSubscription: Subscription;
  showMap = false;
  selectedDate = new Date().toISOString();
  loadings: LoadingController[] = [];
  public get language(): Language { return this.languageService.language; }
  public get isOnline() { return this.sharedService.isOnline; }
  public get backgroundColor(): ThemeColors { return this.sharedService.themeColor; }

  constructor(
    public popoverctrl: PopoverController,
    private persianCalendarService: PersianCalendarService,
    private storageService: StorageService,
    private mapService: MapService,
    private languageService: LanguageService,
    private salesmenService: SalesmenLocationService,
    public sharedService: SharedService,
    private loadingCtrl: LoadingController
  ) {
    // this.mapInitSubscription = this.mapService.mapInitialized.subscribe((initialized: boolean) => {
    //   if (initialized && (this.rsmMarkers.length || this.asmMarkers.length || this.ssvMarkers.length || this.srMarkers.length || this.adminMarkers.length))
    //     this.markers = this.checkMarkers()
    // })
  }

  ionViewDidEnter() {
    this.showMap = true;
  }


  ngOnInit() {
    this.getUserId();
    this.checkAccess();
  }

  ionViewWillLeave() {
    this.removeAllLoadings()
    this.showMap = false;
    if (this.mapInitSubscription) this.mapInitSubscription.unsubscribe();
  }

  getUserId() {
    this.storageService.get('user_id').then((user_id) => {
      if (user_id) {
        this.userId = user_id;
        this.myUserID = user_id;
      }
    });
  }

  checkAccess() {
    this.storageService.get('access').then((access) => {
      if (access) this.accessHandler(JSON.parse(access));
    });
  }

  accessHandler(accessJson: { name: string }[]) {
    var flg = false;
    accessJson.forEach((access) => {
      if (access.name == 'gps_dc') {
        // this.access_dc = true;
      } else if (access.name == 'gps_time') {
        this.accessTime = true;
      } else if (access.name == 'gps_rsm') {
        this.accessRsm = true;
        if (flg == false) {
          this.myUserType = 'rsm';
          this.loadRsms(true, [this.myUserID]);
          flg = true;
        }
      } else if (access.name == 'gps_asm') {
        this.accessAsm = true;
        if (flg == false) {
          this.myUserType = 'asm';
          this.loadAsms(true, [this.myUserID]);
          flg = true;
        }
      } else if (access.name == 'gps_ssv') {
        this.accessSsv = true;
        if (flg == false) {
          this.myUserType = 'ssv';
          this.loadSsvs(true, [this.myUserID]);
          flg = true;
        }
      } else if (access.name == 'gps_sr') {
        this.accessSr = true;
        if (flg == false) {
          this.myUserType = 'sr';
          this.loadSrs(true, [this.myUserID]);
          flg = true;
        }
      }
    });
  }

  async loadRsms(byParentUserId: boolean, ids: number[]) {
    const key = 'rsm';
    if (!ids.length) {
      this.sharedService.toast('danger', this.language.Salesmen_Location.NoValueSelected);
      this.removeAllLoadings();
      return
    }
    this.loadings[key] = await this.loadingCtrl.create({
      message: this.language.Loading,
      id: key
    })
    await this.loadings[key].present();

    this.salesmenService.getallChildrenUser(byParentUserId ? ids.join() : ' ', key, byParentUserId ? ' ' : ids.join()).subscribe(res => {
      this.selectedRsm = [];
      this.rsms = res;
      this.rsms.forEach((v) => {
        v.group = this.language.Salesmen_Location.Group
        this.selectedRsm.push(v.id);
      });
      this.rsmMarkers = [];
      this.getSalesmenLocation(this.selectedRsm.join(), key)
      this.loadAsms(true, this.selectedRsm);
    });
  }

  async loadAsms(byParentUserId: boolean, ids: number[]) {
    const key = 'asm';
    if (!ids.length) {
      this.sharedService.toast('danger', this.language.Salesmen_Location.NoValueSelected);
      this.removeAllLoadings();
      return
    }
    this.loadings[key] = await this.loadingCtrl.create({
      message: this.language.Loading,
      id: key
    })
    await this.loadings[key].present();

    this.salesmenService.getallChildrenUser(byParentUserId ? ids.join() : ' ', key, byParentUserId ? ' ' : ids.join())
      .subscribe(res => {
        this.selectedAsm = [];
        if (byParentUserId)
          this.asms = res;
        if (this.asms.length)
          this.asms.forEach((v) => {
            v.group = this.language.Salesmen_Location.Group;
            this.selectedAsm.push(v.id);
          });
        this.getSalesmenLocation(this.selectedAsm.join(), key)
        this.loadSsvs(true, this.selectedAsm)
      })
  }

  async loadSsvs(byParentUserId: boolean, ids: number[]) {
    const key = 'ssv';
    if (!ids.length) {
      this.sharedService.toast('danger', this.language.Salesmen_Location.NoValueSelected);
      this.removeAllLoadings();
      return
    }
    this.loadings[key] = await this.loadingCtrl.create({
      message: this.language.Loading,
      id: key
    })
    await this.loadings[key].present();

    this.salesmenService.getallChildrenUser(byParentUserId ? ids.join() : ' ', key, byParentUserId ? ' ' : ids.join())
      .subscribe(res => {
        this.selectedSsv = [];
        if (byParentUserId)
          this.ssvs = res;
        if (this.ssvs.length)
          this.ssvs.forEach((v) => {
            v.group = this.language.Salesmen_Location.Group;
            this.selectedSsv.push(v.id);
          });
        this.getSalesmenLocation(this.selectedSsv.join(), key)
        this.loadSrs(true, this.selectedSsv);
      })
  }

  async loadSrs(byParentUserId: boolean, ids: number[]) {
    const key = 'sr';
    if (!ids.length) {
      this.sharedService.toast('danger', this.language.Salesmen_Location.NoValueSelected);
      this.removeAllLoadings();
      return
    }
    this.loadings[key] = await this.loadingCtrl.create({
      message: this.language.Loading,
      id: key
    })
    await this.loadings[key].present();

    this.salesmenService.getallChildrenUser(byParentUserId ? ids.join() : ' ', key, byParentUserId ? ' ' : ids.join())
      .subscribe(res => {
        this.selectedSr = [];
        if (byParentUserId)
          this.srs = res;
        if (res.length)
          res.forEach((v) => {
            v.group = this.language.Salesmen_Location.Group;
            this.selectedSr.push(v.id);
          });
        this.getSalesmenLocation(this.selectedSr.join(), key)
      })
  }

  dateChanged() {
    if (this.selectedSr.length)
      this.loadSrs(false, this.selectedSr)
  }

  showDataChanged() {
    this.markers = this.checkMarkers();
  }

  getSalesmenLocation(userIds: string, userType: 'rsm' | 'asm' | 'ssv' | 'sr' | 'admin') {
    if (!userIds.length)
      return
    this.salesmenService
      .getSalesmenLocation(
        userIds,
        this.persianCalendarService.getVPTodayFormat(new Date(this.selectedDate)),
        1
      )
      .subscribe(res => this.setMarkersOnMap(res, userType));
  }

  setMarkersOnMap(users: GetSalesmenLocationResponse[], userType: 'rsm' | 'asm' | 'ssv' | 'sr' | 'admin') {
    if (!users.length) {
      this.loadings[userType]?.dismiss();
      delete this.loadings[userType];
      return
    }

    let markers: Marker[] = [];
    users.forEach(user => {
      markers.push({
        latitude: user.lat,
        longitude: user.lng,
        icon: this.selectIcon(userType),
        description: `<div> <h1> ${user.Name} </h1> </div>`
      });
    })

    switch (userType) {
      case 'rsm':
        this.rsmMarkers = markers;
        this.loadings[userType]?.dismiss();
        delete this.loadings[userType];
        break;
      case 'asm':
        this.asmMarkers = markers;
        this.loadings[userType]?.dismiss();
        delete this.loadings[userType];
        break;
      case 'ssv':
        this.ssvMarkers = markers;
        this.loadings[userType]?.dismiss();
        delete this.loadings[userType];
        break;
      case 'sr':
        this.srMarkers = markers;
        this.loadings[userType]?.dismiss();
        delete this.loadings[userType];
        break;
      case 'admin':
        this.adminMarkers = markers;
        this.loadings[userType]?.dismiss();
        delete this.loadings[userType];
        break;
    }
    this.markers = this.checkMarkers();
  }

  checkMarkers() {
    this.mapService.clearMarkers.next(true);
    let markers: Marker[] = [];
    if (this.rsmMarkers && this.showRsm) markers.push(...this.rsmMarkers)
    if (this.asmMarkers && this.showAsm) markers.push(...this.asmMarkers)
    if (this.ssvMarkers && this.showSsv) markers.push(...this.ssvMarkers)
    if (this.srMarkers && this.showSr) markers.push(...this.srMarkers)
    return markers;
  }

  selectIcon(key: 'rsm' | 'asm' | 'ssv' | 'sr' | 'admin') {
    switch (key) {
      case 'rsm':
        return this.mapService.salesMenRsmIcon;

      case 'asm':
        return this.mapService.salesMenAsmIcon;

      case 'ssv':
        return this.mapService.salesMenSsvIcon;

      case 'sr':
        return this.mapService.salesMenSrIcon;

      case 'admin':
        return this.mapService.salesManSdIcon;
    }
  }

  removeAllLoadings() {
    for (const key in this.loadings)
      this.loadings[key].dismiss()
    this.loadings = [];
  }
}
