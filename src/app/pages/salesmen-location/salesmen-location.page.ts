import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { MapService } from 'src/app/map/map.service';
import { IonDatetime, PopoverController } from '@ionic/angular';
import { GetAllChildrenUserResponse, GetSalesmenLocationResponse, Language, Marker } from 'src/app/shared/common';
import { PopoverComponent } from 'src/app/shared/components/popover/popover.component';
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
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;
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
  public get language(): Language {
    return this.languageService.language;
  }
  public get isOnline(){
    return this.sharedService.isOnline;
  }
  constructor(
    private router: Router,
    public popoverctrl: PopoverController,
    private persianCalendarService: PersianCalendarService,
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private mapService: MapService,
    private languageService: LanguageService,
    private salesmenService: SalesmenLocationService,
    private sharedService: SharedService
  ) {
    this.mapInitSubscription = this.mapService.mapInitialized.subscribe((initialized: boolean) => {
      if (initialized && (this.rsmMarkers.length || this.asmMarkers.length || this.ssvMarkers.length || this.srMarkers.length || this.adminMarkers.length))
        this.markers = [...this.rsmMarkers, ...this.asmMarkers, ...this.ssvMarkers, ...this.srMarkers, ...this.adminMarkers];
    })
  }

  ionViewDidEnter() {
    this.showMap = true;
  }


  ngOnInit() {
    this.getUserId();
    this.loadForm();
    this.checkAccess();
  }

  ionViewWillLeave() {
    this.showMap = false;
    if (this.mapInitSubscription) this.mapInitSubscription.unsubscribe();
  }

  getUserId() {
    this.storageService.get('user_id').then((user_id) => {
      if (user_id) {
        this.patchValue('userId', user_id);
        this.patchValue('myUserID', user_id);
      }
    });
  }

  loadForm() {
    this.form = this.formBuilder.group({
      DC: [null],
      Route: [null],
      Customer: [null],
      type: ['sales'],
      kgqty: ['qty'],
      showPointSd: [true],
      showPointRsm: [true],
      showPointAsm: [true],
      showPointSsv: [true],
      showPointSr: [true],
      showTruck: [true],
      showSr: [true],
      showRsm: [true],
      showAsm: [true],
      showSsv: [true],
      accessTime: [false],
      accessRsm: [false],
      accessAsm: [false],
      accessSsv: [false],
      accessSr: [false],
      myUserType: [null],
      userId: [null],
      myUserID: [null],
      formDate: [new Date().toISOString()],
      srTime: [this.persianCalendarService.getVPTodayFormat(new Date())],
      truckTime: [this.persianCalendarService.getTodayFormat(new Date())],
    });
  }

  get f() {
    return this.form.controls;
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
        this.patchValue('accessTime', true);
      } else if (access.name == 'gps_rsm') {
        this.patchValue('accessRsm', true);
        if (flg == false) {
          this.patchValue('myUserType', 'rsm');
          this.loadRsms(true, [this.f.myUserID.value]);
          flg = true;
        }
      } else if (access.name == 'gps_asm') {
        this.patchValue('accessAsm', true);
        if (flg == false) {
          this.patchValue('myUserType', 'asm');
          this.loadAsms(true, [this.f.myUserID.value]);
          flg = true;
        }
      } else if (access.name == 'gps_ssv') {
        this.patchValue('accessSsv', true);
        if (flg == false) {
          this.patchValue('myUserType', 'ssv');
          this.loadSsvs(true, [this.f.myUserID.value]);
          flg = true;
        }
      } else if (access.name == 'gps_sr') {
        this.patchValue('accessSr', true);
        if (flg == false) {
          this.patchValue('myUserType', 'sr');
          this.loadSrs(true, [this.f.myUserID.value]);
          flg = true;
        }
      }
    });
  }

  rsmRadioChanged(event) {
    if (event.detail.value) { // true

    } else { // false

    }
  }

  loadRsms(byParentUserId: boolean, ids: number[]) {
    if (!ids.length) {
      this.sharedService.toast('danger', this.language.Salesmen_Location.NoValueSelected);
      return
    }
    this.salesmenService.getallChildrenUser(byParentUserId ? ids.join() : ' ', 'rsm', byParentUserId ? ' ' : ids.join()).subscribe(res => {
      this.selectedRsm = [];
      this.rsms = res;
      this.rsms.forEach((v) => {
        v.group = this.language.Salesmen_Location.Group
        this.selectedRsm.push(v.id);
      });
      this.rsmMarkers = [];
      this.getSalesmenLocation(this.selectedRsm.join(), 'rsm')
      this.loadAsms(true, this.selectedRsm);
    });
  }

  loadAsms(byParentUserId: boolean, ids: number[]) {
    if (!ids.length) {
      this.sharedService.toast('danger', this.language.Salesmen_Location.NoValueSelected);
      return
    }
    this.salesmenService.getallChildrenUser(byParentUserId ? ids.join() : ' ', 'asm', byParentUserId ? ' ' : ids.join())
      .subscribe(res => {
        this.selectedAsm = [];
        if (byParentUserId)
          this.asms = res;
        if (this.asms.length)
          this.asms.forEach((v) => {
            v.group = this.language.Salesmen_Location.Group;
            this.selectedAsm.push(v.id);
          });
        this.getSalesmenLocation(this.selectedAsm.join(), 'asm')
        this.loadSsvs(true, this.selectedAsm)
      })
  }

  loadSsvs(byParentUserId: boolean, ids: number[]) {
    if (!ids.length) {
      this.sharedService.toast('danger', this.language.Salesmen_Location.NoValueSelected);
      return
    }
    this.salesmenService.getallChildrenUser(byParentUserId ? ids.join() : ' ', 'ssv', byParentUserId ? ' ' : ids.join())
      .subscribe(res => {
        this.selectedSsv = [];
        if (byParentUserId)
          this.ssvs = res;
        if (this.ssvs.length)
          this.ssvs.forEach((v) => {
            v.group = this.language.Salesmen_Location.Group;
            this.selectedSsv.push(v.id);
          });
        // this.showSsv = true;
        this.getSalesmenLocation(this.selectedSsv.join(), 'ssv')
        this.loadSrs(true, this.selectedSsv);
      })
  }

  loadSrs(byParentUserId: boolean, ids: number[]) {
    if (!ids.length) {
      this.sharedService.toast('danger', this.language.Salesmen_Location.NoValueSelected);
      return
    }
    this.salesmenService.getallChildrenUser(byParentUserId ? ids.join() : ' ', 'sr', byParentUserId ? ' ' : ids.join())
      .subscribe(res => {
        this.selectedSr = [];
        if (byParentUserId)
          this.srs = res;
        if (res.length)
          res.forEach((v) => {
            v.group = this.language.Salesmen_Location.Group;
            this.selectedSr.push(v.id);
          });
        this.getSalesmenLocation(this.selectedSr.join(), 'sr')
      })
  }

  dateChanged() {
    // this.patchValue('selectedDate', date.slice(0, date.length - 6));
    if (this.selectedSr.length)
      this.loadSrs(false, this.selectedSr)
  }

  patchValue(controller: string, value: any) {
    this.form.patchValue({ [controller]: value });
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
    if (!users.length)
      return

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
        break;
      case 'asm':
        this.asmMarkers = markers;
        break;
      case 'ssv':
        this.ssvMarkers = markers;
        break;
      case 'sr':
        this.srMarkers = markers;
        break;
      case 'admin':
        this.adminMarkers = markers;
        break;
    }
    this.mapService.clearMarkers.next(true);
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
}
